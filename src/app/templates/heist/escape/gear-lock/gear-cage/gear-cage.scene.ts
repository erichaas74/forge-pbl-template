import * as T from 'three';
import { DioramaViewer } from '../../locks/diorama-viewer';
import { TimingCageSound } from '../../locks/timing-cage/timing-cage.sound';
import {
  evaluateGearLock,
  gearFeedback,
  type GearLockDefinition,
  type ReleaseModule,
} from '../gear-lock.domain';
import type { GearSceneCallbacks, GearSceneHandle, GearView } from '../gear-lock.scene';
import { loadFoxPack, type FoxPack } from './gear-cage.foxes';
import { gearCageLayout } from './gear-cage.layout';
import { createGearDiorama, positionCompound } from './gear-cage.model';
import { compoundLayout, GearCageSequence } from './gear-cage.motion';
import { positionGearRelease } from './gear-cage.release';

const captions: Record<ReleaseModule, string> = {
  drive: 'Follow the markers: drive → shared axle A → output B.',
  ball: 'The output drum lifts the catch. The ball rolls down the rail.',
  hammer: 'The ball swings the hammer and knocks the retaining peg free.',
  weight: 'The counterweight drops and pulls the domino cord.',
  domino: 'One falling domino tips the next. Watch the final release cord.',
  gate: 'The bolt slides clear. The cage door swings open.',
};

/** Rendering and bounded input only. The component retains validation, trials and awards. */
export function mountGearCage(
  parent: HTMLElement,
  d: GearLockDefinition,
  snapshot: () => GearView,
  cb: GearSceneCallbacks,
): GearSceneHandle {
  const root = document.createElement('div');
  root.dataset['gearCage'] = '';
  root.innerHTML = gearCageLayout(d);
  parent.append(root);
  const sound = new TimingCageSound();
  let gone = false,
    frameId = 0,
    pack: FoxPack | undefined,
    viewer: DioramaViewer;
  const fail = () => {
    destroy();
    cb.failed();
  };
  try {
    viewer = new DioramaViewer(
      root,
      'fox',
      {
        all: { center: [0, 4.5, 1.5], width: 25, height: 12 },
        drive: { center: [-7.0, 3.6, 0.8], width: 10, height: 5.7 },
        relay: { center: [5.6, 6.8, 0.7], width: 12.4, height: 6.6 },
        cage: { center: [7, 2.3, 3.6], width: 10.5, height: 7.8 },
      },
      fail,
    );
  } catch {
    root.remove();
    sound.destroy();
    cb.failed();
    return { destroy() {} };
  }
  const stage = createGearDiorama(viewer.art, d);
  viewer.scene.add(stage.root);
  const sequence = new GearCageSequence(d, snapshot());
  const q = <E extends HTMLElement>(s: string) => root.querySelector<E>(s)!;
  const action = (name: string) => q<HTMLButtonElement>(`[data-action=${name}]`);
  const feedback = q('.gc-feedback'),
    output = q('[data-output]'),
    turns = q<HTMLSelectElement>('[data-turns]');
  const reducedInput = q<HTMLInputElement>('[data-motion]');
  reducedInput.checked = snapshot().reducedMotion;
  q<HTMLAnchorElement>('[data-credits]').href = d.presentation!.animal.credits;
  const labels = ['drive', 'a', 'b', 'pinion'].map((name) => {
    const element = document.createElement('span');
    element.className = 'gc-label';
    element.dataset['part'] = name;
    viewer.viewport.append(element);
    return element;
  });
  const ghost = document.createElement('span');
  ghost.className = 'gc-drag';
  ghost.hidden = true;
  ghost.setAttribute('aria-hidden', 'true');
  root.append(ghost);
  const glow = viewer.art.torus(
    stage.root,
    0,
    0,
    1.8,
    0.38,
    0.035,
    viewer.art.material({ color: 0xffd38d, emissive: 0xaa6e22, emissiveIntensity: 0.5 }),
  );
  glow.visible = false;
  let drag: { index: number; x: number; y: number; id: number; moved: boolean } | undefined;
  let crankDrag: { x: number; y: number; id: number; turned: boolean } | undefined;
  let suppressClick = false,
    previous = performance.now(),
    lastRun = -1,
    lastPhase = '',
    lastUi = '',
    lastFeedback = '';
  let suspended = false,
    lastEscaped = 0;
  const locked = () => {
    const v = snapshot();
    return !pack || v.running || v.completed || v.paused;
  };
  const screenPoint = (x: number, y: number, z: number) => {
    const p = new T.Vector3(x, y, z).project(viewer.camera),
      rect = viewer.canvas.getBoundingClientRect();
    return {
      x: rect.left + ((p.x + 1) * rect.width) / 2,
      y: rect.top + ((1 - p.y) * rect.height) / 2,
    };
  };
  const socketAt = (x: number, y: number): 0 | 1 | null => {
    const layout = compoundLayout(d, snapshot().answer),
      a = screenPoint(layout.aX, layout.y, 1.5),
      b = screenPoint(layout.bX, layout.y, 1.5);
    const da = Math.hypot(x - a.x, y - a.y),
      db = Math.hypot(x - b.x, y - b.y);
    const radius = Math.max(28, Math.min(68, Math.abs(a.x - b.x) * 0.48));
    return Math.min(da, db) < radius ? (da < db ? 0 : 1) : null;
  };
  const overCrank = (x: number, y: number) => {
    const l = compoundLayout(d, snapshot().answer),
      p = screenPoint(l.driveX, l.y, 1.52);
    return Math.hypot(x - p.x, y - p.y) < 34;
  };
  const place = (index: number, socket: -1 | 0 | 1) => {
    if (locked()) return;
    sound.unlock();
    cb.place(index, socket);
    sound.play('tick');
  };
  const start = () => {
    const v = snapshot();
    if (locked() || v.answer[0] < 0 || v.answer[1] < 0) return;
    sound.unlock();
    cb.test?.();
    action('pause').focus({ preventScroll: true });
  };
  const cancelPointer = () => {
    const id = drag?.id ?? crankDrag?.id;
    drag = undefined;
    crankDrag = undefined;
    ghost.hidden = true;
    glow.visible = false;
    if (id !== undefined && root.hasPointerCapture(id)) root.releasePointerCapture(id);
  };
  const pointerDown = (event: PointerEvent) => {
    suppressClick = false;
    if (locked() || event.button !== 0) return;
    const target = event.target as Element,
      cog = target.closest<HTMLElement>('[data-cog]');
    let index = cog ? Number(cog.dataset['cog']) : null;
    if (target === viewer.canvas) {
      if (overCrank(event.clientX, event.clientY)) {
        crankDrag = { x: event.clientX, y: event.clientY, id: event.pointerId, turned: false };
        root.setPointerCapture(event.pointerId);
        event.preventDefault();
        return;
      }
      const socket = socketAt(event.clientX, event.clientY),
        selected = snapshot().selected;
      if (socket !== null && selected !== null) {
        place(selected, socket);
        return;
      }
      if (socket !== null && snapshot().answer[socket] >= 0) index = snapshot().answer[socket];
    }
    if (index === null) return;
    cb.select(index);
    sound.unlock();
    drag = { index, x: event.clientX, y: event.clientY, id: event.pointerId, moved: false };
    root.setPointerCapture(event.pointerId);
  };
  const pointerMove = (event: PointerEvent) => {
    if (locked()) {
      cancelPointer();
      return;
    }
    if (
      crankDrag &&
      Math.hypot(event.clientX - crankDrag.x, event.clientY - crankDrag.y) > 14 &&
      !crankDrag.turned
    ) {
      crankDrag.turned = true;
      suppressClick = true;
      start();
      return;
    }
    if (!drag) return;
    drag.moved ||= Math.hypot(event.clientX - drag.x, event.clientY - drag.y) > 8;
    if (!drag.moved) return;
    event.preventDefault();
    ghost.hidden = false;
    ghost.textContent = `${d.gears[drag.index].teeth}`;
    const rect = root.getBoundingClientRect();
    ghost.style.left = `${event.clientX - rect.left}px`;
    ghost.style.top = `${event.clientY - rect.top}px`;
    const socket = socketAt(event.clientX, event.clientY),
      layout = compoundLayout(d, snapshot().answer);
    glow.visible = socket !== null;
    if (socket !== null) glow.position.set(socket === 0 ? layout.aX : layout.bX, layout.y, 1.83);
  };
  const pointerUp = (event: PointerEvent) => {
    if (crankDrag) {
      const turned = crankDrag.turned;
      cancelPointer();
      suppressClick = true;
      if (!turned) start();
      return;
    }
    if (drag?.moved && !locked()) {
      const target = document
        .elementFromPoint(event.clientX, event.clientY)
        ?.closest<HTMLElement>('[data-socket]');
      const socket = target
        ? (Number(target.dataset['socket']) as 0 | 1)
        : socketAt(event.clientX, event.clientY);
      if (socket !== null) place(drag.index, socket);
      else if (document.elementFromPoint(event.clientX, event.clientY)?.closest('.gc-tray'))
        place(drag.index, -1);
      suppressClick = true;
    }
    cancelPointer();
  };
  const click = (event: MouseEvent) => {
    if (suppressClick) {
      suppressClick = false;
      if (event.detail !== 0) return;
    }
    const button = (event.target as Element).closest<HTMLButtonElement>('button');
    if (!button || button.disabled) return;
    sound.unlock();
    if (button.dataset['focus']) {
      viewer.setFocus(button.dataset['focus']);
      return;
    }
    if (button.dataset['cog'] !== undefined) {
      if (!locked()) cb.select(Number(button.dataset['cog']));
      return;
    }
    if (button.dataset['socket'] !== undefined) {
      const index = snapshot().selected;
      if (index !== null) place(index, Number(button.dataset['socket']) as 0 | 1);
      return;
    }
    switch (button.dataset['action']) {
      case 'crank':
        start();
        break;
      case 'return': {
        const index = snapshot().selected;
        if (index !== null) place(index, -1);
        break;
      }
      case 'replay':
        cb.replay?.();
        action('pause').focus({ preventScroll: true });
        break;
      case 'reset':
        cb.reset?.();
        viewer.closeOptions();
        break;
      case 'pause':
        cancelPointer();
        cb.pause?.();
        break;
      case 'expand':
        viewer.expand(!viewer.expanded);
        break;
      case 'options': {
        const panel = q('[data-options]');
        panel.hidden = !panel.hidden;
        button.setAttribute('aria-expanded', String(!panel.hidden));
        break;
      }
    }
  };
  const change = (event: Event) => {
    if (event.target === turns && !locked()) cb.crank?.(Number(turns.value) - snapshot().answer[2]);
    if ((event.target as HTMLElement).matches('[data-sound]')) {
      sound.enabled = (event.target as HTMLInputElement).checked;
      if (!sound.enabled) sound.suspend();
      else sound.unlock();
    }
  };
  const key = (event: KeyboardEvent) => {
    if (event.key === 'Escape') cancelPointer();
  };
  root.addEventListener('click', click);
  root.addEventListener('change', change);
  root.addEventListener('keydown', key);
  root.addEventListener('pointerdown', pointerDown);
  root.addEventListener('pointermove', pointerMove);
  root.addEventListener('pointerup', pointerUp);
  root.addEventListener('pointercancel', cancelPointer);
  function tick(now: number): void {
    if (gone) return;
    const v = snapshot(),
      reduced = v.reducedMotion || reducedInput.checked;
    const paused = v.paused || document.hidden,
      dt = paused ? 0 : Math.min(0.1, Math.max(0, (now - previous) / 1000));
    previous = now;
    if (paused !== suspended) {
      suspended = paused;
      if (paused) {
        sound.suspend();
        cancelPointer();
      } else sound.resume();
    }
    const state = sequence.update({ ...v, reducedMotion: reduced }, pack ? dt : 0);
    const layout = positionCompound(viewer.art, stage, d, v.answer, state.motion);
    positionGearRelease(
      viewer.art,
      stage.release,
      state.frame.progress,
      state.motion.output,
      state.allowed,
    );
    const escaped = pack?.update(state.escape, dt, reduced) ?? 0;
    if (v.running) {
      if (lastRun !== v.runId) {
        lastRun = v.runId;
        lastPhase = '';
        viewer.setFocus('drive');
      }
      const phase = !v.passed ? 'drive' : state.escape > 0 ? 'foxes' : state.frame.active;
      if (phase !== lastPhase) {
        lastPhase = phase;
        if (phase === 'ball') viewer.setFocus('relay');
        if (phase === 'gate' || phase === 'foxes') viewer.setFocus('cage');
        if (phase !== 'foxes') cb.beat(phase);
        if (!paused)
          sound.play(
            phase === 'gate'
              ? 'door'
              : phase === 'foxes'
                ? 'free'
                : phase === 'drive'
                  ? 'tick'
                  : 'latch',
          );
      }
    }
    if (escaped > lastEscaped && !paused && v.running) sound.play('step');
    lastEscaped = escaped;
    output.textContent = `${state.motion.output.toFixed(2)} turns`;
    const solved = evaluateGearLock(d, v.answer),
      disabled = locked();
    const uiKey = JSON.stringify([
      v.answer,
      v.selected,
      v.running,
      v.paused,
      v.completed,
      !!pack,
      solved,
    ]);
    if (uiKey !== lastUi) {
      lastUi = uiKey;
      root.querySelectorAll<HTMLButtonElement>('[data-cog]').forEach((b, i) => {
        b.disabled = disabled;
        b.setAttribute('aria-pressed', String(v.selected === i));
        q(`[data-location="${i}"]`).textContent =
          v.answer[0] === i ? 'ON A' : v.answer[1] === i ? 'ON B' : 'IN TRAY';
      });
      for (const socket of [0, 1]) {
        const gear = d.gears[v.answer[socket]];
        q(`[data-${socket === 0 ? 'a' : 'b'}]`).textContent = gear
          ? `${gear.teeth} teeth fitted · tap to replace`
          : 'Choose a cog, then tap here';
        q<HTMLButtonElement>(`[data-socket="${socket}"]`).disabled =
          disabled || v.selected === null;
      }
      turns.disabled = disabled;
      turns.value = String(v.answer[2]);
      action('crank').disabled = disabled || v.answer[0] < 0 || v.answer[1] < 0;
      action('return').disabled = disabled || v.selected === null;
      action('reset').disabled = disabled;
      action('replay').hidden = !solved || !state.allowed;
      action('replay').disabled = !pack || v.running || v.paused;
      action('pause').textContent = v.paused ? 'Resume' : 'Pause';
    }
    const message = !pack
      ? `Preparing the workshop and its ${d.presentation!.foxes} foxes…`
      : v.paused
        ? 'Workshop paused.'
        : v.running
          ? state.escape > 0
            ? `The way is clear! ${escaped} / ${d.presentation!.foxes} foxes outside.`
            : captions[v.passed ? state.frame.active : 'drive']
          : escaped === d.presentation!.foxes
            ? `All ${d.presentation!.foxes} foxes are free! Replay their escape or try another gear train.`
            : sequence.time > 0
              ? gearFeedback(d, v.answer)
              : v.selected !== null
                ? `${d.gears[v.selected].teeth}-tooth cog selected. Tap A or B, or drag it onto an axle.`
                : 'Match both tooth-count clues, then set the turns and turn the crank.';
    if (message !== lastFeedback) {
      feedback.textContent = message;
      lastFeedback = message;
      feedback.dataset['wrong'] = String(!v.running && sequence.time > 0 && !solved);
    }
    root.dataset['answer'] = JSON.stringify(v.answer);
    root.dataset['release'] = String(state.frame.progress.gate);
    root.dataset['escaped'] = String(escaped);
    root.dataset['elapsed'] = sequence.time.toFixed(2);
    viewer.canvas.setAttribute(
      'aria-label',
      `Compound gear workshop. Input ${state.motion.drive.toFixed(1)} turns; axle A ${Math.abs(state.motion.axle).toFixed(2)}; output ${state.motion.output.toFixed(2)}. Cage ${state.frame.progress.gate === 1 ? 'open' : 'closed'}. ${escaped} foxes outside. Use the cog tray and crank controls below.`,
    );
    viewer.render(dt, reduced);
    const text =
      viewer.viewport.clientWidth < 600
        ? [`${d.driverTeeth} · DRIVE`, 'A', 'B', `${d.pinionTeeth} · PINION ON A`]
        : [
            `${d.driverTeeth} · FIXED DRIVE`,
            `A · ${d.gears[v.answer[0]]?.teeth ?? 'EMPTY'}`,
            `B · ${d.gears[v.answer[1]]?.teeth ?? 'EMPTY'}`,
            `${d.pinionTeeth} · SHARES AXLE A`,
          ];
    const points = [
      [layout.driveX, layout.y - layout.driveRadius - 0.58, 1.5],
      [layout.aX, layout.y - layout.aRadius - 0.58, 1.5],
      [layout.bX, layout.y - layout.bRadius - 0.58, 1.5],
      [layout.aX, layout.y + layout.aRadius + 0.55, 1.5],
    ];
    labels.forEach((label, i) => {
      label.textContent = text[i];
      viewer.label(label, new T.Vector3(...points[i]));
      label.hidden ||= viewer.focus !== 'drive';
    });
    root.dataset['drawCalls'] = String(viewer.renderer.info.render.calls);
    if (state.finish) cb.finished();
    frameId = requestAnimationFrame(tick);
  }
  void loadFoxPack(stage.release.animals, d.presentation!)
    .then((result) => {
      if (gone) result.destroy();
      else {
        pack = result;
        cb.ready();
      }
    })
    .catch(() => {
      if (!gone) fail();
    });
  frameId = requestAnimationFrame(tick);
  function destroy(): void {
    if (gone) return;
    gone = true;
    cancelAnimationFrame(frameId);
    cancelPointer();
    root.removeEventListener('click', click);
    root.removeEventListener('change', change);
    root.removeEventListener('keydown', key);
    root.removeEventListener('pointerdown', pointerDown);
    root.removeEventListener('pointermove', pointerMove);
    root.removeEventListener('pointerup', pointerUp);
    root.removeEventListener('pointercancel', cancelPointer);
    sound.destroy();
    pack?.destroy();
    viewer?.destroy();
    root.remove();
  }
  return { destroy };
}
