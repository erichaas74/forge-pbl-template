import {
  formatPiece,
  scaleOffset,
  type BalanceLockDefinition,
  type BalancePiece,
  type BalanceSide,
} from './balance-lock.domain';
import { balancePinTargets } from './balance-lock.motion';
import {
  escapeSvg,
  lockArtwork,
  lockGeometry,
  scaleArtwork,
  scaleGeometry,
  weightArtwork,
} from './balance-lock.art';

export interface BalanceView {
  readonly active: number;
  readonly placements: readonly number[];
  readonly selected: number | null;
  readonly sealed: readonly number[];
  readonly completed: boolean;
  readonly reducedMotion: boolean;
  readonly paused: boolean;
  readonly attempt: number;
}
export interface BalanceSceneCallbacks {
  select(index: number): void;
  place(index: number, side: BalanceSide): void;
  ready(): void;
  failed(): void;
  focus?(index: number): void;
}
export interface BalanceSceneHandle {
  destroy(): void;
}
export type MountBalanceScene = typeof mountBalanceScene;
let instance = 0;

/** The renderer only animates snapshots and emits placement intents. Math/state stay outside it. */
export function mountBalanceScene(
  parent: HTMLElement,
  lock: BalanceLockDefinition,
  snapshot: () => BalanceView,
  callbacks: BalanceSceneCallbacks,
): BalanceSceneHandle {
  const id = `hanging-balance-${++instance}`,
    root = document.createElement('div');
  root.dataset['balanceScene'] = '';
  root.innerHTML = `<style>
    [data-balance-scene]{container-type:inline-size;position:relative;background:radial-gradient(ellipse at 30% 20%,#31433d 0%,#172c31 36%,#071820 90%);color:#f3e8cd;font-family:Arial,sans-serif}
    [data-balance-scene] *{box-sizing:border-box}
    [data-balance-scene] .bs-layout{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:1px;background:#53625d66}
    [data-balance-scene] .bs-panel{min-width:0;background:linear-gradient(145deg,#203638ef,#0a1d25f5);padding:12px 12px 4px;overflow:hidden}
    [data-balance-scene] .bs-panel:last-child{background:radial-gradient(ellipse at 50% 50%,#35434a,#0c1b23 78%)}
    [data-balance-scene] .bs-caption{display:flex;align-items:center;justify-content:space-between;gap:8px;min-height:29px;border-bottom:1px solid #c5ac6b33;margin-bottom:4px;color:#d4c5a1;font-size:10px;letter-spacing:1.7px}
    [data-balance-scene] .bs-caption span:last-child{letter-spacing:.5px;color:#a8c7c0;font-size:10px;text-align:right}
    [data-balance-scene] svg{display:block;width:100%;overflow:visible;touch-action:pan-y;user-select:none}
    [data-balance-scene] [data-weight]{cursor:grab;touch-action:none}
    [data-balance-scene] [data-weight].is-selected{filter:drop-shadow(0 0 4px #b7ffe0)}
    [data-balance-scene] [data-weight].is-dragging{cursor:grabbing}
    [data-balance-scene] .bs-hint{min-height:34px;margin:5px 0 3px;font-size:11px;line-height:1.5;color:#c1cbc1;text-align:center}
    @container(max-width:680px){[data-balance-scene] .bs-layout{grid-template-columns:minmax(0,1fr)}[data-balance-scene] .bs-panel{padding:10px 12px 4px}}
  </style><div class="bs-layout">
    <section class="bs-panel" aria-label="Selected scale working view"><div class="bs-caption"><span data-focus-label>FOCUSED SCALE</span><span data-focus-state></span></div>
      <svg data-scale-view role="img" aria-label="Interactive balance scale. Drag weights onto either pan, or select a weight and tap a pan."></svg>
      <p class="bs-hint">Drag a weight, or select it and tap a pan. Return it to the tray to remove it.</p></section>
    <section class="bs-panel" aria-label="Rope suspended three pin master lock"><div class="bs-caption"><span>HANGING PIN ASSEMBLY</span><span data-alignment></span></div>
      <svg data-lock-view role="img" aria-label="Each scale suspends a brass pin. All middle cutouts must align with the steel master bolt."></svg>
      <p class="bs-hint" data-lock-hint>Every scale must balance. The master bolt opens automatically.</p></section>
  </div>`;
  parent.appendChild(root);
  const scaleSvg = root.querySelector<SVGSVGElement>('[data-scale-view]')!;
  const lockSvg = root.querySelector<SVGSVGElement>('[data-lock-view]')!;
  const focusLabel = root.querySelector<HTMLElement>('[data-focus-label]')!;
  const focusState = root.querySelector<HTMLElement>('[data-focus-state]')!;
  const alignment = root.querySelector<HTMLElement>('[data-alignment]')!;
  const lockHint = root.querySelector<HTMLElement>('[data-lock-hint]')!;
  let scaleWidth = 0,
    lockWidth = 0,
    active = -1,
    lastPlacements: readonly number[] | undefined;
  let targets = balancePinTargets(lock, snapshot().placements),
    motion = targets.map((t) => t.offset);
  let release = 0,
    frame = 0,
    lastTime = performance.now(),
    disposed = false;
  type Block = { element: SVGGElement; index: number; fixed?: 1 | 2; piece: BalancePiece };
  let blocks: Block[] = [];
  let drag:
    | {
        index: number;
        pointer: number;
        x: number;
        y: number;
        startX: number;
        startY: number;
        moved: boolean;
      }
    | undefined;
  const attr = (el: Element | null, name: string, value: string | number) =>
    el?.setAttribute(name, String(value));

  function build() {
    const nextScale = Math.max(240, Math.floor(scaleSvg.getBoundingClientRect().width));
    const nextLock = Math.max(240, Math.floor(lockSvg.getBoundingClientRect().width));
    if (nextScale === scaleWidth && nextLock === lockWidth) return;
    scaleWidth = nextScale;
    lockWidth = nextLock;
    scaleSvg.setAttribute('viewBox', `0 0 ${scaleWidth} 438`);
    scaleSvg.style.height = '438px';
    lockSvg.setAttribute('viewBox', `0 0 ${lockWidth} 462`);
    lockSvg.style.height = '462px';
    scaleSvg.innerHTML = scaleArtwork(scaleWidth, id + '-scale');
    lockSvg.innerHTML = lockArtwork(lockWidth, lock.scales.length, id + '-lock');
    active = -1;
    lastPlacements = undefined;
    drag = undefined;
  }
  function rebuildBlocks(s: BalanceView) {
    active = s.active;
    drag = undefined;
    const scale = lock.scales[active],
      offset = scaleOffset(lock, active);
    const definitions = [
      ...scale.left.map((piece) => ({ piece, index: -1, fixed: 1 as const })),
      ...scale.right.map((piece) => ({ piece, index: -1, fixed: 2 as const })),
      ...scale.pieces.map((piece, i) => ({ piece, index: offset + i, fixed: undefined })),
    ];
    const layer = scaleSvg.querySelector('[data-pieces]')!;
    layer.innerHTML = definitions
      .map(
        (b) =>
          `<g ${b.fixed ? '' : `data-weight="${b.index}"`} aria-label="${escapeSvg(formatPiece(b.piece))}">${weightArtwork(formatPiece(b.piece), id + '-scale', !!b.fixed, scaleWidth < 330 ? 46 : 55)}</g>`,
      )
      .join('');
    blocks = definitions.map((b, i) => ({ ...b, element: layer.children[i] as SVGGElement }));
    focusLabel.textContent = `SCALE ${active + 1} · WORKING VIEW`;
  }
  function updateLabels(s: BalanceView) {
    const reading = targets[s.active].reading;
    attr(
      scaleSvg,
      'aria-label',
      `Scale ${s.active + 1}: ${reading.equation}. ${reading.feedback} Drag weights, or select one and tap a pan.`,
    );
    scaleSvg.querySelector('[data-total="1"]')!.textContent = String(
      Number(reading.left.toFixed(4)),
    );
    scaleSvg.querySelector('[data-total="2"]')!.textContent = String(
      Number(reading.right.toFixed(4)),
    );
    const count = targets.filter((t) => t.aligned).length;
    alignment.textContent = `${count} / ${targets.length} ALIGNED`;
    focusState.textContent = targets[s.active].aligned
      ? 'PIN ALIGNED'
      : targets[s.active].offset < 0
        ? 'PIN TOO HIGH'
        : 'PIN TOO LOW';
    attr(
      lockSvg,
      'aria-label',
      `${count} of ${targets.length} pins aligned. ${targets.map((t, i) => `Pin ${i + 1} ${t.aligned ? 'aligned' : t.offset < 0 ? 'too high' : 'too low'}`).join('. ')}.`,
    );
  }
  function draw(s: BalanceView) {
    const a = scaleGeometry(scaleWidth),
      dy = motion[s.active];
    attr(
      scaleSvg.querySelector('[data-beam]'),
      'transform',
      `rotate(${(Math.atan2(dy, a.half) * 180) / Math.PI} ${a.center} ${a.beamY})`,
    );
    const pans = [0, a.panY - dy, a.panY + dy],
      radius = Math.min(64, scaleWidth * 0.155);
    for (const side of [1, 2] as const) {
      const x = side === 1 ? a.left : a.right,
        top = a.beamY + (side === 1 ? -dy : dy);
      attr(
        scaleSvg.querySelector(`[data-pan="${side}"]`),
        'transform',
        `translate(${x} ${pans[side]})`,
      );
      const path = `M${x} ${top}L${x - radius + 9} ${pans[side]}M${x} ${top}L${x + radius - 9} ${pans[side]}`;
      scaleSvg.querySelectorAll(`[data-chain="${side}"] path`).forEach((p) => attr(p, 'd', path));
      const highlighted =
        drag && Math.abs(drag.x - x) < radius + 20 && Math.abs(drag.y - pans[side]) < 70;
      attr(
        scaleSvg.querySelector(`[data-drop="${side}"]`),
        'stroke',
        highlighted ? '#b5f8d8' : s.selected !== null ? '#7cb9a177' : 'transparent',
      );
    }
    const counts = [0, 0, 0],
      offset = scaleOffset(lock, s.active),
      columns = Math.min(lock.scales[s.active].pieces.length, scaleWidth < 390 ? 4 : 5);
    for (const b of blocks) {
      const side = b.fixed ?? s.placements[b.index] ?? 0,
        slot = counts[side]++;
      let x: number,
        y: number,
        size = 1;
      if (side === 0) {
        const index = b.index - offset;
        x = 22 + ((scaleWidth - 44) / columns) * ((index % columns) + 0.5);
        y = 352 + Math.floor(index / columns) * 57;
      } else {
        const members = blocks.filter(
          (other) => (other.fixed ?? s.placements[other.index]) === side,
        ).length;
        const spacing = members <= 2 ? (scaleWidth < 330 ? 47 : 57) : scaleWidth < 330 ? 38 : 43;
        size = members > 2 ? 0.74 : scaleWidth < 330 ? 0.82 : 1;
        x =
          (side === 1 ? a.left : a.right) + ((slot % 3) - (Math.min(members, 3) - 1) / 2) * spacing;
        y = pans[side] - 24 - Math.floor(slot / 3) * 43;
      }
      if (drag?.index === b.index && !b.fixed && drag.moved) {
        x = drag.x;
        y = drag.y;
        size = 1;
      }
      attr(b.element, 'transform', `translate(${x} ${y}) scale(${size})`);
      b.element.classList.toggle('is-selected', !b.fixed && s.selected === b.index);
      b.element.classList.toggle('is-dragging', !b.fixed && drag?.index === b.index);
    }
    const geometry = lockGeometry(lockWidth, lock.scales.length);
    geometry.pins.forEach((x, i) => {
      const d = motion[i],
        left = 55 - d,
        right = 55 + d;
      attr(
        lockSvg.querySelector(`[data-mini-beam="${i}"]`),
        'transform',
        `matrix(1 ${d / 21} 0 1 0 ${(-(x - 19) * d) / 21})`,
      );
      attr(
        lockSvg.querySelector(`[data-mini-ropes="${i}"]`),
        'd',
        `M${x - 40} ${left}V${left + 29}M${x + 2} ${right}V${right + 29}`,
      );
      attr(lockSvg.querySelector(`[data-mini-left="${i}"]`), 'cy', left + 29);
      attr(lockSvg.querySelector(`[data-mini-right="${i}"]`), 'cy', right + 29);
      // Fixed rope length: the right pan and its pin move by the same displacement.
      const rope = `M${x + 2} ${right + 32}L${x} ${right + 37}V${geometry.axis + d - 106}`;
      attr(lockSvg.querySelector(`[data-rope="${i}"]`), 'd', rope);
      attr(lockSvg.querySelector(`[data-rope-light="${i}"]`), 'd', rope);
      attr(lockSvg.querySelector(`[data-upper-rope="${i}"]`), 'd', rope);
      attr(lockSvg.querySelector(`[data-upper-rope-light="${i}"]`), 'd', rope);
      attr(
        lockSvg.querySelector(`[data-pin="${i}"]`),
        'transform',
        `translate(0 ${geometry.axis + d})`,
      );
      attr(
        lockSvg.querySelector(`[data-track="${i}"]`),
        'stroke',
        i === s.active ? '#f2d79c' : targets[i].aligned ? '#91cdb6' : '#3b474e',
      );
      attr(lockSvg.querySelector(`[data-overview="${i}"]`), 'opacity', i === s.active ? 1 : 0.66);
    });
    attr(lockSvg.querySelector('[data-bolt]'), 'transform', `translate(${-release * 64} 0)`);
    const all = targets.every((t) => t.aligned);
    attr(lockSvg.querySelector('[data-axis]'), 'stroke', all ? '#a2f5c6' : '#f5a891');
    const label = lockSvg.querySelector('[data-lock-state]')!;
    const message =
      release > 0.98
        ? 'MASTER BOLT OPEN'
        : all
          ? 'PINS ALIGNING · AUTO RELEASE'
          : 'MASTER BOLT LOCKED';
    if (label.textContent !== message) label.textContent = message;
    attr(label, 'fill', release > 0.98 ? '#a2f5c6' : '#d6c9aa');
    const hint =
      release > 0.98
        ? 'The bolt has cleared the latch. All scales remain available to inspect.'
        : 'Every scale must balance. The master bolt opens automatically.';
    if (lockHint.textContent !== hint) lockHint.textContent = hint;
    root.dataset['released'] = String(release > 0.98);
  }
  function tick(now: number) {
    if (disposed) return;
    const s = snapshot(),
      dt = Math.min((now - lastTime) / 1000, 0.05);
    lastTime = now;
    if (active !== s.active) {
      rebuildBlocks(s);
      lastPlacements = undefined;
    }
    if (lastPlacements !== s.placements) {
      targets = balancePinTargets(lock, s.placements);
      lastPlacements = s.placements;
      updateLabels(s);
    }
    if (!s.paused) {
      motion = motion.map((n, i) =>
        s.reducedMotion ? targets[i].offset : n + (targets[i].offset - n) * Math.min(1, dt * 10),
      );
      const settled = targets.every((t) => t.aligned) && motion.every((n) => Math.abs(n) < 0.25);
      const target = settled ? 1 : 0;
      release = s.reducedMotion
        ? target
        : Math.max(0, Math.min(1, release + ((target ? 1 : -1) * dt) / 0.65));
    }
    draw(s);
    frame = requestAnimationFrame(tick);
  }
  function point(event: PointerEvent) {
    const bounds = scaleSvg.getBoundingClientRect();
    return {
      x: ((event.clientX - bounds.left) * scaleWidth) / Math.max(bounds.width, 1),
      y: ((event.clientY - bounds.top) * 438) / Math.max(bounds.height, 1),
    };
  }
  function down(event: PointerEvent) {
    const s = snapshot();
    if (s.paused || s.completed || !(event.target instanceof Element)) return;
    const focus = event.target.closest('[data-focus]');
    if (focus) {
      callbacks.focus?.(Number(focus.getAttribute('data-focus')));
      return;
    }
    const weight = event.target.closest('[data-weight]');
    if (weight) {
      const index = Number(weight.getAttribute('data-weight')),
        p = point(event);
      callbacks.select(index);
      drag = { index, pointer: event.pointerId, ...p, startX: p.x, startY: p.y, moved: false };
      root.setPointerCapture?.(event.pointerId);
      event.preventDefault();
      return;
    }
    const pan = event.target.closest('[data-drop]');
    if (pan && s.selected !== null)
      callbacks.place(s.selected, Number(pan.getAttribute('data-drop')) as BalanceSide);
  }
  function move(event: PointerEvent) {
    if (!drag || drag.pointer !== event.pointerId || snapshot().paused) return;
    const p = point(event);
    drag.x = p.x;
    drag.y = p.y;
    drag.moved ||= Math.hypot(p.x - drag.startX, p.y - drag.startY) > 5;
    if (drag.moved) event.preventDefault();
  }
  function up(event: PointerEvent) {
    if (!drag || drag.pointer !== event.pointerId) return;
    const current = drag;
    drag = undefined;
    if (current.moved && !snapshot().paused && !snapshot().completed) {
      const p = point(event),
        a = scaleGeometry(scaleWidth),
        d = motion[snapshot().active],
        radius = Math.min(64, scaleWidth * 0.155) + 24;
      const side: BalanceSide =
        Math.abs(p.x - a.left) < radius && Math.abs(p.y - (a.panY - d)) < 75
          ? 1
          : Math.abs(p.x - a.right) < radius && Math.abs(p.y - (a.panY + d)) < 75
            ? 2
            : 0;
      callbacks.place(current.index, side);
    }
    if (root.hasPointerCapture?.(event.pointerId)) root.releasePointerCapture(event.pointerId);
  }
  const cancel = () => {
    drag = undefined;
  };
  root.addEventListener('pointerdown', down);
  root.addEventListener('pointermove', move);
  root.addEventListener('pointerup', up);
  root.addEventListener('pointercancel', cancel);
  const resize = new ResizeObserver(build);
  resize.observe(root);
  build();
  rebuildBlocks(snapshot());
  updateLabels(snapshot());
  draw(snapshot());
  callbacks.ready();
  frame = requestAnimationFrame(tick);
  return {
    destroy() {
      disposed = true;
      cancelAnimationFrame(frame);
      resize.disconnect();
      root.removeEventListener('pointerdown', down);
      root.removeEventListener('pointermove', move);
      root.removeEventListener('pointerup', up);
      root.removeEventListener('pointercancel', cancel);
      root.remove();
    },
  };
}
