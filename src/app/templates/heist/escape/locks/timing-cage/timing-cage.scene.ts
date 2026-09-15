import * as T from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { BalanceMetalwork } from '../../balance-lock/balance-lock.3d-materials';
import type { TimingWheels } from '../machine.models';
import type { MachineCallbacks, MachineView } from '../machine-surface';
import type { MachineSceneHandle } from '../machine.scene';
import { machineReading } from '../machine.rules';
import { createTimingDiorama, positionTimingDiorama } from './timing-cage.model';
import { loadCageAnimal, type AnimatedCageAnimal } from './timing-cage.animal';
import { ESCAPE_DURATION, TimingCageSequence, cagePose, nextCrankStep } from './timing-cage.motion';
import { timingCageLayout } from './timing-cage.layout';
import { TimingCageSound } from './timing-cage.sound';

export function mountTimingCage(
  parent: HTMLElement,
  d: TimingWheels,
  snapshot: () => MachineView,
  cb: MachineCallbacks,
): MachineSceneHandle {
  const presentation = d.presentation;
  if (!presentation) throw new Error('Timing cage presentation required');
  const animalLabel = presentation.animal.label, animalName = animalLabel.toLowerCase();
  const root = document.createElement('div');
  root.setAttribute('data-timing-cage', '');
  root.innerHTML = timingCageLayout;
  parent.append(root);
  const q = <E extends HTMLElement>(selector: string) => root.querySelector<E>(selector)!;
  const viewport = q<HTMLDivElement>('.tc-viewport');
  const sound = new TimingCageSound();
  let renderer: T.WebGLRenderer;
  try {
    renderer = new T.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'low-power',
    });
  } catch (error) {
    root.remove();
    sound.destroy();
    throw error;
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.35));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = T.PCFSoftShadowMap;
  renderer.outputColorSpace = T.SRGBColorSpace;
  renderer.toneMapping = T.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.98;
  renderer.setClearColor(0x152b39);
  const canvas = renderer.domElement;
  viewport.append(canvas);
  canvas.setAttribute('role', 'img');
  canvas.setAttribute(
    'aria-label',
    'Overlapping timing discs linked to a cage with an animated fox. Use Crank +1 or drag the crank.',
  );
  const scene = new T.Scene();
  scene.fog = new T.Fog(0x152b39, 28, 53);
  const camera = new T.OrthographicCamera(-9, 9, 5, -5, 0.1, 80);
  const environment = new RoomEnvironment(),
    pmrem = new T.PMREMGenerator(renderer),
    env = pmrem.fromScene(environment, 0.025);
  scene.environment = env.texture;
  scene.environmentIntensity = 0.6;
  environment.dispose();
  pmrem.dispose();
  scene.add(new T.HemisphereLight(0xc8e4f4, 0x493e2d, 1.15));
  const key = new T.DirectionalLight(0xffdfab, 2.6);
  key.position.set(-6, 10, 8);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.left = -12;
  key.shadow.camera.right = 12;
  key.shadow.camera.top = 10;
  key.shadow.camera.bottom = -7;
  key.shadow.camera.near = 0.1;
  key.shadow.camera.far = 35;
  key.shadow.bias = -0.0003;
  key.shadow.normalBias = 0.027;
  scene.add(key);
  const moonlight = new T.DirectionalLight(0x8cbddd, 2.3);
  moonlight.position.set(6, 7, -4);
  scene.add(moonlight);
  const art = new BalanceMetalwork(),
    stage = createTimingDiorama(art, d);
  scene.add(stage.root);
  const sequence = new TimingCageSequence(d, snapshot());
  let animal: AnimatedCageAnimal | undefined,
    loaded = false,
    disposed = false,
    failed = false;
  let frame = 0,
    last = performance.now(),
    age = 0,
    previousRelease = 0;
  let currentTick =
    snapshot().answer.kind === 'timing-wheels' ? (snapshot().answer as { steps: number }).steps : 0;
  let
    expanded = false,
    previousOverflow = '',
    previousFocus: HTMLElement | null = null;
  let focus: 'all' | 'lock' | 'cage' = viewport.clientWidth < 600 ? 'lock' : 'all';
  let center = new T.Vector3(0, 2.75, 0.6),
    worldWidth = 18.2;
  const readout = q('.tc-readings');
  const wheelRows = d.periods.map((period, i) => {
    const element = document.createElement('div');
    element.className = 'tc-wheel';
    const title = document.createElement('b');
    title.textContent = `${String.fromCharCode(65 + i)} · ${period} ticks / turn`;
    const remainder = document.createElement('span');
    element.append(title, remainder);
    readout.append(element);
    return { element, remainder };
  });
  const labels = d.periods.map((period, i) => {
    const element = document.createElement('div');
    element.className = 'tc-label';
    element.textContent = `${String.fromCharCode(65 + i)} · ${period} ticks`;
    const sub = document.createElement('small');
    sub.textContent = d.phases[i] ? `starts +${d.phases[i]}` : 'starts at zero';
    element.append(sub);
    viewport.append(element);
    return element;
  });
  const cageLabel = document.createElement('div');
  cageLabel.className = 'tc-label';
  cageLabel.textContent = `${presentation.animal.label.toUpperCase()} · HOLDING CAGE`;
  viewport.append(cageLabel);
  const pinLabel = document.createElement('div');
  pinLabel.className = 'tc-label';
  pinLabel.textContent = 'SHARED RELEASE PIN';
  viewport.append(pinLabel);
  const action = (name: string) => q<HTMLButtonElement>(`[data-action=${name}]`);
  const raycaster = new T.Raycaster();
  const point = new T.Vector2();
  let dragging:
    | { id: number; x: number; y: number; angle: number; accumulated: number; moved: boolean }
    | undefined;
  const view = (): MachineView => ({
    ...snapshot(),
    reducedMotion: snapshot().reducedMotion,
  });
  function canOperate(): boolean {
    const v = view();
    return loaded && !failed && !v.paused && !v.testing && !v.completed;
  }
  function operate(delta: number): void {
    if (!canOperate()) return;
    const v = view();
    if (v.answer.kind !== 'timing-wheels') return;
    if (delta > 0 && machineReading(d, v.answer).solved) return;
    sound.unlock();
    const steps = nextCrankStep(d, v.answer.steps, delta);
    if (steps !== v.answer.steps) {
      sound.play('tick');
      cb.input({ type: 'steps', value: steps });
    }
  }
  function resize(): void {
    if (disposed) return;
    const w = viewport.clientWidth,
      h = viewport.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    updateCamera(1);
  }
  function updateCamera(blend: number): void {
    const aspect = Math.max(0.3, viewport.clientWidth / Math.max(1, viewport.clientHeight));
    const target =
      focus === 'lock'
        ? new T.Vector3(-4.2, 3, 0.8)
        : focus === 'cage'
          ? new T.Vector3(4.1, 2.3, 1.8)
          : new T.Vector3(0, 2.8, 0.7);
    const width = focus === 'lock' ? 8.2 : focus === 'cage' ? 8.8 : 18.2;
    center.lerp(target, blend);
    worldWidth += (width - worldWidth) * blend;
    const height = Math.max(focus === 'all' ? 8.8 : 7.2, worldWidth / aspect);
    camera.left = (-height * aspect) / 2;
    camera.right = (height * aspect) / 2;
    camera.top = height / 2;
    camera.bottom = -height / 2;
    camera.position.copy(center).add(new T.Vector3(0.6, 6.8, 23));
    camera.lookAt(center);
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld();
  }
  function setFocus(next: typeof focus): void {
    focus = next;
    root
      .querySelectorAll<HTMLButtonElement>('[data-focus]')
      .forEach((b) => b.setAttribute('aria-pressed', String(b.dataset['focus'] === focus)));
  }
  function setExpanded(value: boolean): void {
    expanded = value;
    if (value) {
      previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      root.setAttribute('role', 'dialog');
      root.setAttribute('aria-modal', 'true');
      root.setAttribute('aria-label', 'Expanded patrol workshop');
    } else {
      document.body.style.overflow = previousOverflow;
      root.removeAttribute('role');
      root.removeAttribute('aria-modal');
      root.removeAttribute('aria-label');
    }
    root.classList.toggle('tc-expanded', value);
    action('expand').textContent = value ? 'Close' : 'Expand';
    action('expand').setAttribute(
      'aria-label',
      value ? 'Close expanded patrol workshop' : 'Expand patrol workshop',
    );
    resize();
    if (!value) previousFocus?.focus({ preventScroll: true });
    else action('expand').focus();
  }
  function onClick(event: MouseEvent): void {
    const target = (event.target as HTMLElement).closest<HTMLButtonElement>('button');
    if (!target || !root.contains(target)) return;
    const name = target.dataset['action'];
    sound.unlock();
    if (name === 'advance') operate(1);
    if (name === 'rewind') operate(-1);
    if (name === 'reset' && canOperate()) {
      cb.input({ type: 'reset' });
    }
    if (name === 'replay' && !view().paused && !view().testing) cb.replay?.();
    if (name === 'pause') cb.pause?.();
    if (name === 'expand') setExpanded(!expanded);

    const next = target.dataset['focus'];
    if (next === 'all' || next === 'lock' || next === 'cage') setFocus(next);
  }
  function onKey(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      if (expanded) setExpanded(false);
      return;
    }
    if (expanded && event.key === 'Tab') {
      const list = Array.from(
        root.querySelectorAll<HTMLElement>('button:not(:disabled),input,a'),
      ).filter((e) => e.getClientRects().length);
      const first = list[0],
        final = list[list.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        final?.focus();
      } else if (!event.shiftKey && document.activeElement === final) {
        event.preventDefault();
        first?.focus();
      }
    }
  }
  function crankScreen(): T.Vector3 {
    return stage.crank.getWorldPosition(new T.Vector3()).project(camera);
  }
  function crankAngle(e: PointerEvent): number {
    const rect = canvas.getBoundingClientRect(),
      p = crankScreen();
    return Math.atan2(
      e.clientY - rect.top - ((1 - p.y) * rect.height) / 2,
      e.clientX - rect.left - ((p.x + 1) * rect.width) / 2,
    );
  }
  function pointerDown(e: PointerEvent): void {
    if (!canOperate()) return;
    const rect = canvas.getBoundingClientRect();
    point.set(
      ((e.clientX - rect.left) / rect.width) * 2 - 1,
      1 - ((e.clientY - rect.top) / rect.height) * 2,
    );
    raycaster.setFromCamera(point, camera);
    const p = crankScreen(),
      distance = Math.hypot(
        ((point.x - p.x) * rect.width) / 2,
        ((point.y - p.y) * rect.height) / 2,
      );
    if (!raycaster.intersectObject(stage.crank, true).length && distance > 34) return;
    e.preventDefault();
    canvas.setPointerCapture(e.pointerId);
    sound.unlock();
    dragging = {
      id: e.pointerId,
      x: e.clientX,
      y: e.clientY,
      angle: crankAngle(e),
      accumulated: 0,
      moved: false,
    };
  }
  function pointerMove(e: PointerEvent): void {
    if (!dragging || e.pointerId !== dragging.id || !canOperate()) return;
    const angle = crankAngle(e),
      delta = Math.atan2(Math.sin(angle - dragging.angle), Math.cos(angle - dragging.angle));
    dragging.angle = angle;
    dragging.accumulated += delta;
    if (Math.hypot(e.clientX - dragging.x, e.clientY - dragging.y) > 7) dragging.moved = true;
    if (Math.abs(dragging.accumulated) > Math.PI / 3) {
      operate(dragging.accumulated > 0 ? 1 : -1);
      dragging.accumulated = 0;
    }
  }
  function pointerUp(e: PointerEvent): void {
    if (!dragging || dragging.id !== e.pointerId) return;
    const moved = dragging.moved;
    dragging = undefined;
    if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
    if (e.type !== 'pointercancel' && !moved) operate(1);
  }
  function placeLabel(element: HTMLElement, point: T.Vector3): void {
    const projected = point.project(camera),
      w = viewport.clientWidth,
      h = viewport.clientHeight;
    const x = ((projected.x + 1) * w) / 2,
      y = ((1 - projected.y) * h) / 2;
    element.hidden = x < 15 || x > w - 15 || y < 45 || y > h - 35;
    element.style.left = `${Math.max(element.offsetWidth / 2 + 5, Math.min(w - element.offsetWidth / 2 - 5, x))}px`;
    element.style.top = `${y}px`;
    element.style.transform = 'translate(-50%,-50%)';
  }
  function text(element: HTMLElement, value: string): void {
    if (element.textContent !== value) element.textContent = value;
  }
  function render(now: number): void {
    if (disposed || failed) return;
    frame = requestAnimationFrame(render);
    const v = view(),
      dt = v.paused || document.hidden ? 0 : Math.min(0.25, (now - last) / 1000);
    last = now;
    if (v.paused || document.hidden) sound.suspend();
    else sound.resume();
    if (document.hidden) return;
    age += dt;
    const steps = v.answer.kind === 'timing-wheels' ? v.answer.steps : 0;
    if (!v.paused && dt > 0) {
      const delta = steps - currentTick;
      currentTick =
        v.reducedMotion || Math.abs(delta) < 0.008
          ? steps
          : currentTick + delta * (1 - Math.exp(-dt * 12));
    }
    const settled = Math.abs(steps - currentTick) < 0.009;
    const result = sequence.update(v, loaded ? dt : 0, settled);
    if (result.engage) cb.engage?.();
    if (result.finished) cb.finished();
    const release = v.passed || machineReading(d, v.answer).solved ? sequence.time : 0;
    root.dataset['release'] = String(Math.round(release * 100) / 100);
    root.dataset['tick'] = String(steps);
    root.dataset['settled'] = String(settled);
    positionTimingDiorama(stage, d, currentTick, release);
    if (!v.reducedMotion && dt > 0)
      stage.flames.forEach((flame, i) => {
        flame.scale.y = 1.7 + Math.sin(age * 7 + i) * 0.13;
      });
    if (release > 1.4 && previousRelease <= 1.4 && focus === 'lock')
      setFocus(viewport.clientWidth < 650 ? 'cage' : 'all');
    updateCamera(v.reducedMotion ? 1 : dt === 0 ? 0 : 1 - Math.exp(-dt * 4));
    animal?.update(release, dt, v.reducedMotion);
    if (dt > 0 && !v.reducedMotion) {
      for (const [time, cue] of [
        [0.15, 'latch'],
        [1.2, 'door'],
        [7.6, 'free'],
      ] as const)
        if (release >= time && previousRelease < time) sound.play(cue);
      if (
        release > 2.65 &&
        release < 7.35 &&
        Math.floor(release * 3.2) !== Math.floor(previousRelease * 3.2)
      )
        sound.play('step');
    }
    previousRelease = release;
    labels.forEach((label, i) => {
      const center = stage.wheelCenters[i].clone();
      center.y += d.periods.length === 2 ? 1.95 : 1.68;
      placeLabel(label, center);
      label.dataset['highlight'] = String(steps > 0 && (steps + d.phases[i]) % d.periods[i] === 0);
    });
    placeLabel(cageLabel, new T.Vector3(3.7, 4.7, 2.35));
    placeLabel(pinLabel, new T.Vector3(-4.25, 2.45, 2.5));
    const solved = machineReading(d, v.answer).solved,
      pose = cagePose(release);
    text(q('[data-count]'), String(steps).padStart(2, '0'));
    wheelRows.forEach(({ element, remainder }, i) => {
      const n = (steps + d.phases[i]) % d.periods[i];
      element.dataset['aligned'] = String(n === 0 && steps > 0);
      text(
        remainder,
        n === 0
          ? steps
            ? 'Hole aligned'
            : d.phases[i]
              ? `Offset +${d.phases[i]}`
              : 'At start'
          : `${d.periods[i] - n} to the opening`,
      );
    });
    action('advance').hidden = solved;
    action('replay').hidden = !solved;
    action('advance').disabled = !canOperate() || steps >= d.maxSteps;
    action('rewind').disabled = !canOperate() || steps === 0;
    action('reset').disabled = !canOperate();
    action('replay').disabled = !loaded || v.testing || v.paused;
    action('pause').textContent = v.paused ? 'Resume' : 'Pause';
    action('pause').setAttribute('aria-pressed', String(v.paused));
    const status = q('.tc-feedback');
    status.dataset['open'] = String(pose.animal === 1);
    text(
      status,
      v.paused
        ? 'Paused.'
        : !loaded
          ? 'Preparing the animated animal…'
          : release >= 7.35
            ? `Cage open. The ${animalName} is safely through.`
            : solved
              ? 'The shared pin fits. Watch the cage.'
              : steps === 0
                ? 'The first turn arms the latch. Click or turn the crank clockwise.'
                : `${wheelRows.filter((_, i) => (steps + d.phases[i]) % d.periods[i] === 0).length} of ${d.periods.length} holes aligned. Keep turning.`,
    );
    const caption = q('.tc-caption');
    caption.hidden = release <= 0 || (release >= ESCAPE_DURATION && focus === 'lock');
    text(
      caption,
      release >= 7.35
        ? `A clear path. A free ${animalName}.`
        : pose.animal > 0
          ? `The ${animalName} makes its escape…`
          : pose.door > 0
            ? 'The cage door swings open…'
            : 'The pin slips through. The latch releases.',
    );
    canvas.setAttribute(
      'aria-label',
      `Timing lock at tick ${steps}. ${pose.animal === 1 ? `Cage open; ${animalName} outside.` : pose.door > 0 ? 'Cage opening.' : `${animalLabel} waiting in closed cage.`}`,
    );
    renderer.render(scene, camera);
    root.dataset['drawCalls'] = String(renderer.info.render.calls);
  }
  function contextLost(event: Event): void {
    event.preventDefault();
    fail();
  }
  function fail(): void {
    if (disposed || failed) return;
    failed = true;
    cancelAnimationFrame(frame);
    sound.suspend();
    if (expanded) setExpanded(false);
    root.hidden = true;
    cb.failed();
  }
  root.addEventListener('click', onClick);
  root.addEventListener('keydown', onKey);
  canvas.addEventListener('pointerdown', pointerDown);
  canvas.addEventListener('pointermove', pointerMove);
  canvas.addEventListener('pointerup', pointerUp);
  canvas.addEventListener('pointercancel', pointerUp);
  canvas.addEventListener('webglcontextlost', contextLost);
  const observer = new ResizeObserver(resize);
  observer.observe(viewport);
  setFocus(focus);
  resize();
  frame = requestAnimationFrame(render);
  void loadCageAnimal(stage.animal, presentation.animal)
    .then((loadedAnimal) => {
      if (disposed || failed) {
        loadedAnimal.destroy();
        return;
      }
      animal = loadedAnimal;
      loaded = true;
      cb.ready();
    })
    .catch(fail);
  return {
    destroy() {
      if (disposed) return;
      if (expanded) setExpanded(false);
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      sound.destroy();
      animal?.destroy();
      root.removeEventListener('click', onClick);
        root.removeEventListener('keydown', onKey);
      canvas.removeEventListener('pointerdown', pointerDown);
      canvas.removeEventListener('pointermove', pointerMove);
      canvas.removeEventListener('pointerup', pointerUp);
      canvas.removeEventListener('pointercancel', pointerUp);
      canvas.removeEventListener('webglcontextlost', contextLost);
      art.dispose();
      env.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      root.remove();
    },
  };
}
