import * as T from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { BalanceMetalwork } from '../../balance-lock/balance-lock.3d-materials';
import type { FractionGear } from '../machine.models';
import type { MachineCallbacks, MachineView } from '../machine-surface';
import type { MachineSceneHandle } from '../machine.scene';
import { machineReading } from '../machine.rules';
import { TimingCageSound } from '../timing-cage/timing-cage.sound';
import {
  COG_CENTER,
  COG_RADIUS,
  createFractionDiorama,
  positionFractionDiorama,
} from './fraction-cage.model';
import {
  FractionCageSequence,
  RABBIT_ESCAPE_DURATION,
  sectorFits,
  sectorSize,
} from './fraction-cage.motion';
import { fractionCageLayout } from './fraction-cage.layout';

export function mountFractionCage(
  parent: HTMLElement,
  d: FractionGear,
  snapshot: () => MachineView,
  cb: MachineCallbacks,
): MachineSceneHandle {
  const root = document.createElement('div');
  root.setAttribute('data-fraction-cage', '');
  root.innerHTML = fractionCageLayout(d);
  parent.append(root);
  const q = <E extends HTMLElement>(selector: string) => root.querySelector<E>(selector)!;
  const action = (name: string) => q<HTMLButtonElement>(`[data-action=${name}]`);
  const viewport = q<HTMLDivElement>('.fc-viewport'),
    options = q('.fc-settings');
  q('[data-clue]').textContent = d.hint;
  const art = new BalanceMetalwork(),
    sound = new TimingCageSound();
  let renderer: T.WebGLRenderer;
  try {
    renderer = new T.WebGLRenderer({ antialias: true, powerPreference: 'low-power' });
  } catch (error) {
    root.remove();
    art.dispose();
    sound.destroy();
    throw error;
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.35));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = T.PCFSoftShadowMap;
  renderer.outputColorSpace = T.SRGBColorSpace;
  renderer.toneMapping = T.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.04;
  renderer.setClearColor(0x1e393b);
  const canvas = renderer.domElement;
  canvas.setAttribute('role', 'img');
  viewport.append(canvas);
  const scene = new T.Scene(),
    camera = new T.OrthographicCamera(-9, 9, 5, -5, 0.1, 80);
  const room = new RoomEnvironment(),
    pmrem = new T.PMREMGenerator(renderer),
    environment = pmrem.fromScene(room, 0.025);
  scene.environment = environment.texture;
  scene.environmentIntensity = 0.65;
  room.dispose();
  pmrem.dispose();
  scene.add(new T.HemisphereLight(0xe5f3ec, 0x384c3c, 1.35));
  const sun = new T.DirectionalLight(0xffdfa4, 3.1);
  sun.position.set(-5, 11, 9);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, {
    left: -10,
    right: 10,
    top: 9,
    bottom: -7,
    near: 0.1,
    far: 40,
  });
  sun.shadow.bias = -0.0003;
  sun.shadow.normalBias = 0.025;
  scene.add(sun);
  const fill = new T.DirectionalLight(0x9fcfce, 1.5);
  fill.position.set(7, 6, -2);
  scene.add(fill);
  const stage = createFractionDiorama(art, d);
  scene.add(stage.root);
  const sequence = new FractionCageSequence(d, snapshot());
  const ray = new T.Raycaster(),
    plane = new T.Plane(new T.Vector3(0, 0, 1), -COG_CENTER.z);
  const labels = ['COMPLETE THE COG', 'LIFTING WINCH', `${stage.rabbits.length} RABBITS`].map(
    (text) => {
      const label = document.createElement('div');
      label.className = 'fc-label';
      label.textContent = text;
      viewport.append(label);
      return label;
    },
  );
  let gone = false,
    frame = 0,
    last = performance.now(),
    age = 0,
    changedAt = -1;
  let selected: number | null = null,
    candidate = 0,
    lastAnswer = '',
    message = '',
    messageUntil = 0;
  let motion = snapshot().reducedMotion,
    expanded = false,
    oldOverflow = '',
    oldFocus: HTMLElement | null = null;
  let focus: 'all' | 'cog' | 'cage' = viewport.clientWidth < 620 ? 'cog' : 'all';
  let center = new T.Vector3(0, 3.1, 1),
    worldWidth = 19,
    previousRelease = 0;
  let drag:
    | { id: number; index: number; startX: number; startY: number; moved: boolean; over: boolean }
    | undefined;
  const view = (): MachineView => ({
    ...snapshot(),
    reducedMotion: motion || snapshot().reducedMotion,
  });
  const offsets = (): readonly number[] => {
    const a = view().answer;
    return a.kind === 'fraction-gear' ? a.offsets : d.pieces.map(() => -1);
  };
  const operable = () => !gone && !view().paused && !view().testing && !view().completed;
  const notify = (text: string) => {
    message = text;
    messageUntil = age + 3;
  };
  const putText = (element: HTMLElement, text: string) => {
    if (element.textContent !== text) element.textContent = text;
  };
  function select(index: number) {
    if (!operable()) return;
    selected = index;
    cb.select(index);
    candidate = Math.max(0, offsets()[index]);
    if (viewport.clientWidth < 620) setFocus('cog');
  }
  function seat() {
    if (!operable() || selected === null) return;
    if (!sectorFits(d, offsets(), selected, candidate)) {
      notify('That sector overlaps. Rotate it to a clear space.');
      sound.play('latch');
      return;
    }
    cb.input({ type: 'piece', index: selected, offset: candidate });
    sound.play('tick');
    notify('Seated. Choose another sector or adjust this one.');
  }
  function setFocus(next: typeof focus) {
    focus = next;
    root
      .querySelectorAll<HTMLButtonElement>('[data-focus]')
      .forEach((b) => b.setAttribute('aria-pressed', String(b.dataset['focus'] === focus)));
  }
  function cameraPose(blend: number) {
    const aspect = Math.max(0.3, viewport.clientWidth / Math.max(1, viewport.clientHeight));
    const target =
      focus === 'cog'
        ? new T.Vector3(-4.4, 3.4, 0.5)
        : focus === 'cage'
          ? new T.Vector3(4.4, 2.9, 2.1)
          : new T.Vector3(0, 3.1, 1.1);
    const width = focus === 'all' ? 19 : focus === 'cog' ? 8.1 : 8.5;
    center.lerp(target, blend);
    worldWidth += (width - worldWidth) * blend;
    const height = Math.max(focus === 'all' ? 9.3 : 8, worldWidth / aspect);
    camera.left = (-height * aspect) / 2;
    camera.right = (height * aspect) / 2;
    camera.top = height / 2;
    camera.bottom = -height / 2;
    camera.position.copy(center).add(new T.Vector3(0.35, 6.0, 23));
    camera.lookAt(center);
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld();
  }
  function resize() {
    if (gone || !viewport.clientWidth || !viewport.clientHeight) return;
    renderer.setSize(viewport.clientWidth, viewport.clientHeight, false);
    cameraPose(1);
  }
  function expand(value: boolean) {
    expanded = value;
    if (value) {
      oldOverflow = document.body.style.overflow;
      oldFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      document.body.style.overflow = 'hidden';
      root.setAttribute('role', 'dialog');
      root.setAttribute('aria-modal', 'true');
      root.setAttribute('aria-label', 'Expanded rabbit workshop');
    } else {
      document.body.style.overflow = oldOverflow;
      root.removeAttribute('role');
      root.removeAttribute('aria-modal');
      root.removeAttribute('aria-label');
    }
    root.classList.toggle('fc-expanded', value);
    action('expand').textContent = value ? 'Close' : 'Expand';
    action('expand').setAttribute(
      'aria-label',
      value ? 'Close expanded rabbit workshop' : 'Expand rabbit workshop',
    );
    resize();
    if (value) action('expand').focus();
    else oldFocus?.focus({ preventScroll: true });
  }
  function onClick(event: MouseEvent) {
    const b = (event.target as Element).closest<HTMLButtonElement>('button');
    if (!b || !root.contains(b)) return;
    sound.unlock();
    const name = b.dataset['action'],
      next = b.dataset['focus'];
    if (b.dataset['piece'] !== undefined) select(Number(b.dataset['piece']));
    if (name === 'options') {
      options.hidden = !options.hidden;
      b.setAttribute('aria-expanded', String(!options.hidden));
    }
    if (name === 'expand') expand(!expanded);
    if (next === 'all' || next === 'cog' || next === 'cage') setFocus(next);
    if (name === 'pause') cb.pause?.();
    if (name === 'replay' && !view().paused && !view().testing) cb.replay?.();
    if (!operable()) return;
    if (name === 'left' || name === 'right')
      candidate = (candidate + (name === 'right' ? 1 : -1) + d.slots) % d.slots;
    if (name === 'seat') seat();
    if (name === 'lift' && selected !== null) {
      cb.input({ type: 'piece', index: selected, offset: -1 });
      sound.play('tick');
      notify('Lifted back into the tray.');
    }
    if (name === 'reset') {
      cb.input({ type: 'reset' });
      selected = null;
      options.hidden = true;
      action('options').setAttribute('aria-expanded', 'false');
      notify('Empty cog. Try a new combination.');
    }
  }
  function onChange(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.matches('[data-notch]') && operable())
      candidate = Math.max(0, Math.min(d.slots - 1, Number(input.value)));
    if (input.matches('[data-motion]')) motion = input.checked;
    if (input.matches('[data-sound]')) {
      sound.enabled = input.checked;
      if (input.checked) sound.unlock();
      else sound.suspend();
    }
  }
  function onKey(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      if (drag) {
        if (root.hasPointerCapture(drag.id)) root.releasePointerCapture(drag.id);
        drag = undefined;
        return;
      }
      if (!options.hidden) {
        options.hidden = true;
        action('options').setAttribute('aria-expanded', 'false');
        action('options').focus();
      } else if (expanded) expand(false);
    }
    if (expanded && e.key === 'Tab') {
      const list = Array.from(
        root.querySelectorAll<HTMLElement>('button:not(:disabled),select:not(:disabled),input'),
      ).filter((el) => el.getClientRects().length);
      const first = list[0],
        end = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        end?.focus();
      } else if (!e.shiftKey && document.activeElement === end) {
        e.preventDefault();
        first?.focus();
      }
    }
  }
  function point(e: PointerEvent): T.Vector3 | undefined {
    const rect = canvas.getBoundingClientRect();
    if (
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom
    )
      return;
    ray.setFromCamera(
      new T.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        1 - ((e.clientY - rect.top) / rect.height) * 2,
      ),
      camera,
    );
    const result = ray.ray.intersectPlane(plane, new T.Vector3());
    return result ?? undefined;
  }
  function notch(p: T.Vector3): number {
    const angle = Math.PI / 2 - Math.atan2(p.y - COG_CENTER.y, p.x - COG_CENTER.x);
    return (Math.round((angle * d.slots) / (Math.PI * 2)) + d.slots) % d.slots;
  }
  function onDown(e: PointerEvent) {
    if (!operable() || e.button !== 0) return;
    const b = (e.target as Element).closest<HTMLButtonElement>('[data-piece]');
    let index = b ? Number(b.dataset['piece']) : null;
    if (!b && e.target === canvas) {
      const p = point(e);
      if (!p || p.distanceTo(COG_CENTER) > COG_RADIUS + 0.2) return;
      const n = notch(p);
      index = offsets().findIndex(
        (start, i) => start >= 0 && (n - start + d.slots) % d.slots < sectorSize(d, i),
      );
      if (index < 0) {
        if (selected !== null) {
          candidate = n;
          seat();
        }
        return;
      }
    }
    if (index === null) return;
    e.preventDefault();
    sound.unlock();
    select(index);
    root.setPointerCapture(e.pointerId);
    drag = {
      id: e.pointerId,
      index,
      startX: e.clientX,
      startY: e.clientY,
      moved: false,
      over: false,
    };
  }
  function onMove(e: PointerEvent) {
    if (!drag || drag.id !== e.pointerId || !operable()) return;
    if (Math.hypot(e.clientX - drag.startX, e.clientY - drag.startY) > 7) drag.moved = true;
    const p = point(e);
    drag.over = !!p && p.distanceTo(COG_CENTER) < COG_RADIUS + 0.5;
    if (p && drag.over) candidate = notch(p);
  }
  function onUp(e: PointerEvent) {
    if (!drag || drag.id !== e.pointerId) return;
    const drop = drag.moved && drag.over && e.type !== 'pointercancel';
    drag = undefined;
    if (root.hasPointerCapture(e.pointerId)) root.releasePointerCapture(e.pointerId);
    if (drop) seat();
  }
  function label(el: HTMLElement, p: T.Vector3) {
    p.project(camera);
    const w = viewport.clientWidth,
      h = viewport.clientHeight,
      x = ((p.x + 1) * w) / 2,
      y = ((1 - p.y) * h) / 2;
    el.hidden = x < 20 || x > w - 20 || y < 65 || y > h - 56;
    el.style.left = `${Math.max(70, Math.min(w - 70, x))}px`;
    el.style.top = `${y}px`;
  }
  function render(now: number) {
    if (gone) return;
    frame = requestAnimationFrame(render);
    const v = view(),
      dt = v.paused || document.hidden ? 0 : Math.min(0.25, (now - last) / 1000);
    last = now;
    if (v.paused || document.hidden || !sound.enabled) sound.suspend();
    else sound.resume();
    if (document.hidden) return;
    age += dt;
    const a = offsets(),
      key = JSON.stringify(a),
      reading = machineReading(d, v.answer);
    if (key !== lastAnswer) {
      lastAnswer = key;
      changedAt = age;
    }
    const settled = age - changedAt > 0.3 || v.reducedMotion;
    const result = sequence.update(v, dt, settled);
    if (result.engage) cb.engage?.();
    if (result.finished) cb.finished();
    const release = reading.solved ? sequence.time : 0;
    const escaped = positionFractionDiorama(
      art,
      stage,
      d,
      a,
      release,
      v.reducedMotion ? 0 : age,
      v.reducedMotion,
    );
    if (release > 0.9 && previousRelease <= 0.9 && focus === 'cog')
      setFocus(viewport.clientWidth < 620 ? 'cage' : 'all');
    if (release === 0 && previousRelease > 0 && viewport.clientWidth < 620) setFocus('cog');
    if (dt > 0 && !v.reducedMotion)
      for (const [time, cue] of [
        [0.12, 'latch'],
        [0.7, 'door'],
        [10.8, 'free'],
      ] as const)
        if (release >= time && previousRelease < time) sound.play(cue);
    previousRelease = release;
    cameraPose(v.reducedMotion ? 1 : dt === 0 ? 0 : 1 - Math.exp(-dt * 5));
    const can = operable(),
      fits = selected !== null && sectorFits(d, a, selected, candidate);
    stage.ghosts.forEach((ghost, i) => {
      ghost.visible =
        selected === i && can && !reading.solved && (a[i] !== candidate || !!drag?.moved);
      ghost.rotation.z = (-candidate * Math.PI * 2) / d.slots;
      (ghost.material as T.MeshStandardMaterial).color.setHex(fits ? 0x9aefc2 : 0xff8771);
    });
    root.querySelectorAll<HTMLButtonElement>('[data-piece]').forEach((b, i) => {
      b.disabled = !can;
      b.setAttribute('aria-pressed', String(selected === i));
      putText(q(`[data-piece-state="${i}"]`), a[i] >= 0 ? 'ON COG' : 'IN TRAY');
    });
    for (const name of ['left', 'right', 'seat'])
      action(name).disabled = !can || selected === null || reading.solved;
    action('lift').disabled = !can || selected === null || a[selected] < 0;
    q<HTMLSelectElement>('[data-notch]').disabled = !can || selected === null || reading.solved;
    q<HTMLSelectElement>('[data-notch]').value = String(candidate);
    action('reset').disabled = !can;
    action('replay').hidden = !reading.solved;
    action('replay').disabled = v.paused || v.testing;
    putText(action('pause'), v.paused ? 'Resume' : 'Pause');
    action('pause').setAttribute('aria-pressed', String(v.paused));
    const total = a.reduce((n, offset, i) => n + (offset >= 0 ? sectorSize(d, i) : 0), 0);
    putText(q('[data-total]'), `${total}/${d.slots} of a whole`);
    putText(
      q('[data-state]'),
      release > 0 ? `${escaped}/${stage.rabbits.length} safely out` : `${d.slots}-notch cog`,
    );
    let feedback =
      selected === null
        ? 'Select a fraction sector, then place it on the cog.'
        : `${d.pieces[selected].numerator}/${d.pieces[selected].denominator} · start notch ${candidate}. ${fits ? 'Clear fit. Seat it here.' : 'Overlap — rotate to a clear space.'}`;
    if (age < messageUntil) feedback = message;
    if (reading.solved)
      feedback =
        release >= RABBIT_ESCAPE_DURATION
          ? 'All rabbits are safely through. Replay or try another whole.'
          : release < 0.65
            ? 'One whole. The drive engages.'
            : release < 2.7
              ? 'The winch is lifting the grille.'
              : 'A clear doorway. Here come the rabbits!';
    if (v.paused) feedback = 'Paused. Resume to continue.';
    putText(q('.fc-feedback'), feedback);
    q('.fc-feedback').dataset['blocked'] = String(selected !== null && !fits && !reading.solved);
    label(labels[0], new T.Vector3(-4.75, 6.08, 1.1));
    label(labels[1], new T.Vector3(-1.55, 2.3, 1.8));
    label(labels[2], new T.Vector3(4.5, 6.45, 1.6));
    canvas.setAttribute(
      'aria-label',
      `Fraction cog: ${reading.equation}. ${escaped} of ${stage.rabbits.length} rabbits outside. ${release >= 2.7 ? 'Cage grille raised.' : 'Cage closed.'}`,
    );
    root.dataset['release'] = String(Math.round(release * 100) / 100);
    root.dataset['escaped'] = String(escaped);
    root.dataset['offsets'] = a.join(',');
    renderer.render(scene, camera);
    root.dataset['drawCalls'] = String(renderer.info.render.calls);
  }
  root.addEventListener('click', onClick);
  root.addEventListener('change', onChange);
  root.addEventListener('keydown', onKey);
  root.addEventListener('pointerdown', onDown);
  root.addEventListener('pointermove', onMove);
  root.addEventListener('pointerup', onUp);
  root.addEventListener('pointercancel', onUp);
  canvas.addEventListener('webglcontextlost', onLost);
  function onLost(event: Event) {
    event.preventDefault();
    dispose();
    cb.failed();
  }
  const observer = new ResizeObserver(resize);
  observer.observe(viewport);
  q<HTMLInputElement>('[data-motion]').checked = motion;
  setFocus(focus);
  resize();
  cb.ready();
  frame = requestAnimationFrame(render);
  function dispose() {
    if (gone) return;
    if (expanded) expand(false);
    gone = true;
    cancelAnimationFrame(frame);
    observer.disconnect();
    root.removeEventListener('click', onClick);
    root.removeEventListener('change', onChange);
    root.removeEventListener('keydown', onKey);
    root.removeEventListener('pointerdown', onDown);
    root.removeEventListener('pointermove', onMove);
    root.removeEventListener('pointerup', onUp);
    root.removeEventListener('pointercancel', onUp);
    canvas.removeEventListener('webglcontextlost', onLost);
    sound.destroy();
    environment.dispose();
    sun.shadow.dispose();
    art.dispose();
    renderer.dispose();
    root.remove();
  }
  return { destroy: dispose };
}
