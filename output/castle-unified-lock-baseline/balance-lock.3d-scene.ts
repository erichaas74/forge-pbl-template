import * as T from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { BalanceMetalwork } from './balance-lock.3d-materials';
import { balanceStageLayout } from './balance-lock.3d-layout';
import {
  createBalanceStage,
  createBalanceWeights,
  positionBalanceStage,
  STATION,
} from './balance-lock.3d-model';
import { balancePinTargets } from './balance-lock.motion';
import {
  formatPiece,
  scaleOffset,
  type BalanceLockDefinition,
  type BalanceSide,
} from './balance-lock.domain';
import type {
  BalanceSceneCallbacks,
  BalanceView,
  BalanceSceneHandle,
} from './balance-lock.scene-contract';

/** One spacious station; the complete pin assembly is a separate inspection view. */
export function mountBalanceScene(
  parent: HTMLElement,
  lock: BalanceLockDefinition,
  snapshot: () => BalanceView,
  callbacks: BalanceSceneCallbacks,
): BalanceSceneHandle {
  const root = document.createElement('div');
  root.setAttribute('data-balance-3d', '');
  root.innerHTML = balanceStageLayout;
  parent.append(root);
  const viewport = root.querySelector<HTMLElement>('.b3d-viewport')!,
    tray = root.querySelector<HTMLElement>('.b3d-weights')!;
  let renderer: T.WebGLRenderer;
  try {
    renderer = new T.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
  } catch (error) {
    root.remove();
    throw error;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = T.PCFSoftShadowMap;
  renderer.toneMapping = T.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.outputColorSpace = T.SRGBColorSpace;
  renderer.setClearColor(0x0b151b, 0);
  const canvas = renderer.domElement;
  canvas.setAttribute('role', 'img');
  canvas.setAttribute('aria-label', 'Interactive 3D balance scale and hanging pin');
  viewport.prepend(canvas);
  const scene = new T.Scene(),
    camera = new T.OrthographicCamera(-4, 4, 3, -3, 0.1, 80);
  const environment = new RoomEnvironment(),
    pmrem = new T.PMREMGenerator(renderer),
    env = pmrem.fromScene(environment, 0.055);
  scene.environment = env.texture;
  scene.environmentIntensity = 1.05;
  environment.dispose();
  pmrem.dispose();
  scene.add(new T.HemisphereLight(0xd7e9ec, 0x23343c, 0.8));
  const key = new T.DirectionalLight(0xffe4bd, 2.6);
  key.position.set(-3.5, 7, 6);
  key.castShadow = true;
  key.shadow.mapSize.set(1536, 1536);
  Object.assign(key.shadow.camera, { left: -6, right: 6, top: 5, bottom: -5, near: 0.5, far: 25 });
  key.shadow.bias = -0.0005;
  key.shadow.normalBias = 0.025;
  scene.add(key);
  const rim = new T.DirectionalLight(0xc1e6ef, 1.8);
  rim.position.set(4, 3, -1);
  scene.add(rim);
  const art = new BalanceMetalwork(),
    stage = createBalanceStage(art, lock);
  scene.add(stage.working, stage.overview);
  const weightCache = new Map<number, ReturnType<typeof createBalanceWeights>>();
  let active = -1,
    mode: 'working' | 'overview' = 'working',
    placements: readonly number[] | undefined,
    selected: number | null | undefined;
  let targets = balancePinTargets(lock, snapshot().placements),
    offsets = targets.map((t) => t.offset),
    release = 0,
    frame = 0,
    lastTime = performance.now(),
    disposed = false,
    dirty = true,
    previousPaused = false,
    previousCompleted = false,
    contextUnavailable = false;
  let weights: ReturnType<typeof createBalanceWeights> = [];
  const raycaster = new T.Raycaster(),
    pointer = new T.Vector2();
  const dragLabel = document.createElement('div');
  dragLabel.className = 'b3d-drag';
  dragLabel.hidden = true;
  root.append(dragLabel);
  let drag:
    { pointer: number; index: number; startX: number; startY: number; moved: boolean } | undefined;
  const text = (selector: string, value: string) => {
    const element = root.querySelector(selector)!;
    if (element.textContent !== value) element.textContent = value;
  };
  function resize() {
    const width = Math.max(200, viewport.clientWidth),
      height = Math.max(280, viewport.clientHeight),
      aspect = width / height;
    const worldHeight = Math.max(
      5.6,
      (mode === 'working' ? 6.4 : lock.scales.length * 1.48 + 1.8) / aspect,
    );
    camera.left = (-worldHeight * aspect) / 2;
    camera.right = (worldHeight * aspect) / 2;
    camera.top = worldHeight / 2;
    camera.bottom = -worldHeight / 2;
    const center = mode === 'working' ? -1.2 : 0.2;
    camera.position.set(center + 1.4, 2.4, 17);
    camera.lookAt(center, 0.15, 0);
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    dirty = true;
  }
  function view(next: 'working' | 'overview') {
    mode = next;
    stage.working.visible = next === 'working';
    stage.overview.visible = next === 'overview';
    root.dataset['view'] = next;
    root
      .querySelectorAll<HTMLButtonElement>('[data-view]')
      .forEach((button) =>
        button.setAttribute('aria-pressed', String(button.dataset['view'] === next)),
      );
    resize();
    dirty = true;
  }
  function focus(s: BalanceView) {
    active = s.active;
    drag = undefined;
    dragLabel.hidden = true;
    weightCache.forEach((list) => list.forEach((weight) => (weight.root.visible = false)));
    if (!weightCache.has(active))
      weightCache.set(active, createBalanceWeights(art, lock, active, stage.working));
    weights = weightCache.get(active)!;
    tray.replaceChildren();
    const offset = scaleOffset(lock, active);
    lock.scales[active].pieces.forEach((piece, i) => {
      const button = document.createElement('button');
      button.className = 'b3d-weight';
      button.dataset['weight'] = String(offset + i);
      button.setAttribute('aria-label', `Weight ${formatPiece(piece)}, piece ${i + 1}`);
      const name = document.createElement('strong');
      name.textContent = formatPiece(piece);
      const location = document.createElement('small');
      button.append(name, location);
      tray.append(button);
    });
    text('[data-focus-label]', `STATION ${active + 1} / ${lock.scales.length}`);
    placements = undefined;
    selected = undefined;
    view('working');
  }
  function update(s: BalanceView) {
    targets = balancePinTargets(lock, s.placements);
    placements = s.placements;
    selected = s.selected;
    const target = targets[active];
    text('[data-equation]', target.reading.equation);
    text(
      '[data-reading]',
      target.aligned
        ? 'This pin is aligned.'
        : target.offset < 0
          ? 'Add mass to lower this pin.'
          : 'Remove mass to raise this pin.',
    );
    canvas.setAttribute(
      'aria-label',
      `3D scale ${active + 1}. ${target.reading.equation}. ${targets.filter((t) => t.aligned).length} of ${targets.length} pins aligned.`,
    );
    root.querySelectorAll<HTMLButtonElement>('.b3d-weight').forEach((button) => {
      const index = Number(button.dataset['weight']);
      button.setAttribute('aria-pressed', String(s.selected === index));
      button.disabled = s.paused || s.completed;
      button.querySelector('small')!.textContent =
        s.placements[index] === 1
          ? 'LEFT PAN'
          : s.placements[index] === 2
            ? 'RIGHT PAN'
            : 'IN TRAY';
    });
    root.querySelector<HTMLElement>('.b3d-placement')!.hidden = s.selected === null;
    root
      .querySelectorAll<HTMLButtonElement>('[data-place]')
      .forEach((button) => (button.disabled = s.paused || s.completed));
    dirty = true;
  }
  function positionWeights(s: BalanceView) {
    const bySide = [1, 2].map((side) =>
      weights.filter((weight) => (weight.fixed || s.placements[weight.index]) === side),
    );
    weights.forEach((weight) => {
      const side = weight.fixed || s.placements[weight.index] || 0;
      weight.root.visible = side !== 0;
      if (!side) return;
      const list = bySide[side - 1],
        index = list.indexOf(weight),
        count = Math.min(3, list.length),
        pan = stage.pans[side - 1];
      const size = list.length > 2 ? 0.67 : 0.9;
      weight.root.scale.setScalar(size);
      weight.root.position.set(
        pan.position.x + ((index % 3) - (count - 1) / 2) * (list.length === 2 ? 0.54 : 0.39),
        pan.position.y + 0.078 + Math.floor(index / 3) * 0.34,
        0.12,
      );
    });
  }
  function tick(now: number) {
    if (disposed || contextUnavailable) return;
    const s = snapshot(),
      dt = Math.max(0, Math.min(1, (now - lastTime) / 1000));
    lastTime = now;
    if (s.active !== active) focus(s);
    if (
      placements !== s.placements ||
      selected !== s.selected ||
      previousPaused !== s.paused ||
      previousCompleted !== s.completed
    )
      update(s);
    if (s.paused) cancel();
    previousPaused = s.paused;
    previousCompleted = s.completed;
    if (!s.paused) {
      const nextOffsets = offsets.map((value, i) =>
        s.reducedMotion
          ? targets[i].offset
          : value + (targets[i].offset - value) * (1 - Math.exp(-dt * 8)),
      );
      const settled =
        targets.every((target) => target.aligned) &&
        nextOffsets.every((value) => Math.abs(value) < 0.2);
      const nextRelease = s.reducedMotion
        ? Number(settled)
        : T.MathUtils.clamp(release + ((settled ? 1 : -1) * dt) / 0.8, 0, 1);
      dirty ||=
        Math.abs(release - nextRelease) > 0.0001 ||
        offsets.some((value, i) => Math.abs(value - nextOffsets[i]) > 0.0001);
      offsets = nextOffsets;
      release = nextRelease;
    }
    if (dirty) {
      positionBalanceStage(stage, art, offsets, active, release);
      positionWeights(s);
      text(
        '[data-lock-state]',
        release > 0.98
          ? 'MASTER BOLT OPEN'
          : `${targets.filter((t) => t.aligned).length} / ${targets.length} PINS ALIGNED · ${targets.every((t) => t.aligned) ? 'RELEASING' : 'LOCKED'}`,
      );
      root.dataset['released'] = String(release > 0.98);
      root.dataset['pinOffsets'] = offsets.map((v) => v.toFixed(2)).join(',');
      renderer.render(scene, camera);
      dirty = false;
    }
    frame = requestAnimationFrame(tick);
  }
  function hit(event: MouseEvent) {
    const bounds = canvas.getBoundingClientRect();
    pointer.set(
      ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
      (-(event.clientY - bounds.top) / bounds.height) * 2 + 1,
    );
    raycaster.setFromCamera(pointer, camera);
    if (
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom
    )
      return undefined;
    return raycaster
      .intersectObjects(stage.working.children, true)
      .find((entry) => entry.object.visible && visibleParent(entry.object));
  }
  function visibleParent(object: T.Object3D): boolean {
    return !object.parent || (object.parent.visible && visibleParent(object.parent));
  }
  function owner(object: T.Object3D | undefined, key: 'side' | 'weight'): number | undefined {
    while (object) {
      if (typeof object.userData[key] === 'number') return object.userData[key];
      object = object.parent ?? undefined;
    }
    return undefined;
  }
  function panAt(event: MouseEvent): BalanceSide {
    const intersect = hit(event),
      side = owner(intersect?.object, 'side');
    if (side) return side as BalanceSide;
    const point = new T.Vector3();
    if (
      mode === 'working' &&
      raycaster.ray.intersectPlane(new T.Plane(new T.Vector3(0, 0, 1), -0.1), point)
    ) {
      for (const [index, pan] of stage.pans.entries())
        if (Math.abs(point.x - pan.position.x) < 0.8 && Math.abs(point.y - pan.position.y) < 0.8)
          return (index + 1) as BalanceSide;
    }
    return 0;
  }
  function down(event: PointerEvent) {
    const s = snapshot();
    if (s.paused || s.completed || !(event.target instanceof Element)) return;
    const button = event.target.closest<HTMLElement>('[data-weight]');
    const index = button
      ? Number(button.dataset['weight'])
      : mode === 'working' && event.target === canvas
        ? owner(hit(event)?.object, 'weight')
        : undefined;
    if (index !== undefined) {
      if (mode === 'overview') view('working');
      // A click must finish before selection expands the placement controls.
      drag = {
        pointer: event.pointerId,
        index,
        startX: event.clientX,
        startY: event.clientY,
        moved: false,
      };
      dragLabel.textContent = formatPiece(
        lock.scales[active].pieces[index - scaleOffset(lock, active)],
      );
      root.setPointerCapture(event.pointerId);
      event.preventDefault();
    }
  }
  function move(event: PointerEvent) {
    if (!drag || drag.pointer !== event.pointerId || snapshot().paused) return;
    drag.moved ||= Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY) > 6;
    if (!drag.moved) return;
    event.preventDefault();
    const bounds = root.getBoundingClientRect();
    dragLabel.hidden = false;
    dragLabel.style.left = `${event.clientX - bounds.left}px`;
    dragLabel.style.top = `${event.clientY - bounds.top}px`;
  }
  function up(event: PointerEvent) {
    if (!drag || drag.pointer !== event.pointerId) return;
    const held = drag;
    drag = undefined;
    dragLabel.hidden = true;
    if (!snapshot().paused && !snapshot().completed) {
      if (held.moved) callbacks.place(held.index, panAt(event));
      else callbacks.select(held.index);
    }
    if (root.hasPointerCapture(event.pointerId)) root.releasePointerCapture(event.pointerId);
  }
  function cancel() {
    drag = undefined;
    dragLabel.hidden = true;
  }
  function click(event: MouseEvent) {
    if (!(event.target instanceof Element)) return;
    const viewButton = event.target.closest<HTMLElement>('[data-view]');
    if (viewButton) {
      cancel();
      view(viewButton.dataset['view'] as 'working' | 'overview');
    }
    const placeButton = event.target.closest<HTMLElement>('[data-place]');
    const s = snapshot();
    if (placeButton && s.selected !== null && !s.paused && !s.completed)
      callbacks.place(s.selected, Number(placeButton.dataset['place']) as BalanceSide);
    const weight = event.target.closest<HTMLElement>('[data-weight]');
    if (event.detail === 0 && weight && !s.paused && !s.completed) {
      cancel();
      callbacks.select(Number(weight.dataset['weight']));
    }
    if (
      event.target === canvas &&
      mode === 'working' &&
      s.selected !== null &&
      !s.paused &&
      !s.completed
    ) {
      const side = panAt(event);
      if (side) callbacks.place(s.selected, side);
    }
  }
  function contextLost(event: Event) {
    event.preventDefault();
    cancel();
    contextUnavailable = true;
    cancelAnimationFrame(frame);
    callbacks.failed();
  }
  root.addEventListener('pointerdown', down);
  root.addEventListener('pointermove', move);
  root.addEventListener('pointerup', up);
  root.addEventListener('pointercancel', cancel);
  root.addEventListener('click', click);
  canvas.addEventListener('webglcontextlost', contextLost);
  const observer = new ResizeObserver(resize);
  observer.observe(viewport);
  focus(snapshot());
  update(snapshot());
  positionBalanceStage(stage, art, offsets, active, release);
  positionWeights(snapshot());
  renderer.render(scene, camera);
  callbacks.ready();
  frame = requestAnimationFrame(tick);
  return {
    destroy() {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      root.removeEventListener('pointerdown', down);
      root.removeEventListener('pointermove', move);
      root.removeEventListener('pointerup', up);
      root.removeEventListener('pointercancel', cancel);
      root.removeEventListener('click', click);
      canvas.removeEventListener('webglcontextlost', contextLost);
      art.dispose();
      env.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      root.remove();
    },
  };
}
