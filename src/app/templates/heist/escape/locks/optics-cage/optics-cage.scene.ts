import * as T from 'three';
import type { Reflection } from '../machine.models';
import type { MachineCallbacks, MachineView } from '../machine-surface';
import type { MachineSceneHandle } from '../machine.scene';
import { machineReading } from '../machine.rules';
import { DioramaViewer, type DioramaFocus } from '../diorama-viewer';
import { TimingCageSound } from '../timing-cage/timing-cage.sound';
import { opticsCageLayout } from './optics-cage.layout';
import { createOpticsDiorama, positionOpticsDiorama } from './optics-cage.model';
import {
  opticsPoint,
  OpticsCageSequence,
  OWL_ESCAPE_DURATION,
  snapMirror,
} from './optics-cage.motion';

/** Transient drag previews stay local; only a released, snapped angle enters the session adapter. */
export function mountOpticsCage(
  parent: HTMLElement,
  d: Reflection,
  snapshot: () => MachineView,
  cb: MachineCallbacks,
): MachineSceneHandle {
  const root = document.createElement('div');
  root.dataset['opticsCage'] = '';
  root.innerHTML = opticsCageLayout(d);
  parent.append(root);
  const q = <E extends HTMLElement>(selector: string) => root.querySelector<E>(selector)!;
  const action = (name: string) => q<HTMLButtonElement>(`[data-action=${name}]`);
  const sound = new TimingCageSound();
  let viewer: DioramaViewer,
    gone = false,
    frame = 0;
  const fail = () => {
    destroy();
    cb.failed();
  };
  const focuses: Record<string, DioramaFocus> = {
    all: { center: [0, 5.1, 1.4], width: 26.3, height: 12.5 },
    drive: { center: [-5, 5.45, 0.6], width: 13.3, height: 11.7 },
    cage: { center: [6.7, 3.6, 3.0], width: 10.8, height: 8.2 },
  };
  d.mirrors.forEach((mirror, i) => {
    focuses[`mirror-${i}`] = { center: opticsPoint(mirror.center), width: 6, height: 6 };
  });
  try {
    viewer = new DioramaViewer(root, 'owl', focuses, fail);
  } catch {
    root.remove();
    sound.destroy();
    cb.failed();
    return { destroy() {} };
  }
  viewer.renderer.setClearColor(0x122238);
  const stage = createOpticsDiorama(viewer.art, d);
  viewer.scene.add(stage.root);
  const sequence = new OpticsCageSequence(d, snapshot());
  const control = q<HTMLSelectElement>('[data-angle-control]'),
    reducedInput = q<HTMLInputElement>('[data-motion]');
  reducedInput.checked = snapshot().reducedMotion;
  q('[data-clue]').textContent = d.hint;
  const ray = new T.Raycaster(),
    plane = new T.Plane(new T.Vector3(0, 0, 1), -0.72);
  let selected = 0,
    previous = performance.now(),
    age = 0,
    previousRelease = 0,
    ui = '',
    lastFeedback = '';
  let drag:
    | { id: number; index: number; angle: number; moved: boolean; startX: number; startY: number }
    | undefined;
  let lastAnswer = JSON.stringify(snapshot().answer),
    changedAt = -1,
    suspended = false;
  const view = (): MachineView => ({
    ...snapshot(),
    reducedMotion: reducedInput.checked || snapshot().reducedMotion,
  });
  const angles = () => {
    const a = snapshot().answer;
    return a.kind === 'reflection' ? a.angles : d.mirrors.map((m) => m.start);
  };
  const operable = () =>
    !gone && !snapshot().paused && !snapshot().testing && !snapshot().completed;
  const select = (index: number) => {
    if (!operable() || !d.mirrors[index]) return;
    selected = index;
    cb.select(index);
    if (viewer.viewport.clientWidth < 650) viewer.setFocus(`mirror-${index}`);
  };
  const commit = (angle: number) => {
    if (!operable()) return;
    cb.input({
      type: 'mirror',
      index: selected,
      angle: snapMirror(angle, d.mirrors[selected].step),
    });
    sound.play('tick');
  };
  const cancelPointer = () => {
    const id = drag?.id;
    drag = undefined;
    if (id !== undefined && root.hasPointerCapture(id)) root.releasePointerCapture(id);
  };
  const point = (event: PointerEvent) => {
    const rect = viewer.canvas.getBoundingClientRect();
    ray.setFromCamera(
      new T.Vector2(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        1 - ((event.clientY - rect.top) / rect.height) * 2,
      ),
      viewer.camera,
    );
    return ray.ray.intersectPlane(plane, new T.Vector3());
  };
  const down = (event: PointerEvent) => {
    if (!operable() || event.button !== 0 || event.target !== viewer.canvas) return;
    const p = point(event);
    if (!p) return;
    const distances = d.mirrors.map((m) => p.distanceTo(new T.Vector3(...opticsPoint(m.center))));
    const index = distances.indexOf(Math.min(...distances));
    if (distances[index] > 1.25) return;
    event.preventDefault();
    sound.unlock();
    // Keep the camera fixed during a drag, including on touch screens.
    selected = index;
    cb.select(index);
    drag = {
      id: event.pointerId,
      index,
      angle: angles()[index],
      moved: false,
      startX: event.clientX,
      startY: event.clientY,
    };
    root.setPointerCapture(event.pointerId);
  };
  const move = (event: PointerEvent) => {
    if (!drag || drag.id !== event.pointerId) return;
    if (!operable()) {
      cancelPointer();
      return;
    }
    const p = point(event);
    if (!p) return;
    drag.moved ||= Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY) > 5;
    const center = opticsPoint(d.mirrors[drag.index].center);
    if (drag.moved && Math.hypot(p.x - center[0], p.y - center[1]) > 0.15)
      drag.angle = snapMirror(
        (Math.atan2(center[1] - p.y, p.x - center[0]) * 180) / Math.PI,
        d.mirrors[drag.index].step,
      );
  };
  const up = (event: PointerEvent) => {
    if (!drag || drag.id !== event.pointerId) return;
    const current = drag;
    cancelPointer();
    if (current.moved) commit(current.angle);
  };
  const start = () => {
    if (!operable() || drag) return;
    cb.engage?.();
    action('pause').focus({ preventScroll: true });
  };
  const click = (event: MouseEvent) => {
    const button = (event.target as Element).closest<HTMLButtonElement>('button');
    if (!button || button.disabled) return;
    sound.unlock();
    if (button.dataset['mirror'] !== undefined) {
      select(Number(button.dataset['mirror']));
      return;
    }
    if (button.dataset['focus']) {
      cancelPointer();
      viewer.setFocus(button.dataset['focus']);
      return;
    }
    switch (button.dataset['action']) {
      case 'left':
        commit(angles()[selected] - d.mirrors[selected].step);
        break;
      case 'right':
        commit(angles()[selected] + d.mirrors[selected].step);
        break;
      case 'test':
        start();
        break;
      case 'replay':
        if (!snapshot().paused && !snapshot().testing) {
          cb.replay?.();
          action('pause').focus({ preventScroll: true });
        }
        break;
      case 'pause':
        cancelPointer();
        cb.pause?.();
        break;
      case 'reset':
        if (operable()) {
          cancelPointer();
          cb.input({ type: 'reset' });
          viewer.closeOptions();
          viewer.setFocus('drive');
          action('options').focus();
        }
        break;
      case 'expand':
        cancelPointer();
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
    if (event.target === control) commit(Number(control.value));
    if ((event.target as HTMLElement).matches('[data-sound]')) {
      sound.enabled = (event.target as HTMLInputElement).checked;
      if (sound.enabled) sound.unlock();
      else sound.suspend();
    }
  };
  const key = (event: KeyboardEvent) => {
    if (event.key === 'Escape') cancelPointer();
  };
  root.addEventListener('click', click);
  root.addEventListener('change', change);
  root.addEventListener('keydown', key);
  root.addEventListener('pointerdown', down);
  root.addEventListener('pointermove', move);
  root.addEventListener('pointerup', up);
  root.addEventListener('pointercancel', cancelPointer);
  function tick(now: number) {
    if (gone) return;
    const v = view(),
      paused = v.paused || document.hidden,
      dt = paused ? 0 : Math.min(0.1, Math.max(0, (now - previous) / 1000));
    previous = now;
    if (paused !== suspended) {
      suspended = paused;
      if (paused) {
        sound.suspend();
        cancelPointer();
      } else sound.resume();
    }
    age += dt;
    const key = JSON.stringify(v.answer);
    if (key !== lastAnswer) {
      lastAnswer = key;
      changedAt = age;
    }
    const settled = !drag && age - changedAt > 0.18,
      result = sequence.update(v, dt, settled);
    // Ready means the committed angle has settled, never a pointer's temporary preview.
    cb.settled(settled);
    if (result.engage) start();
    const reading = machineReading(d, v.answer),
      shown = [...angles()];
    if (drag) shown[drag.index] = drag.angle;
    const release = reading.solved ? sequence.time : 0;
    const state = positionOpticsDiorama(
      viewer.art,
      stage,
      d,
      shown,
      selected,
      release,
      v.reducedMotion ? 0 : age,
    );
    if (v.testing && release > 0.7 && previousRelease <= 0.7) viewer.setFocus('all');
    if (v.testing && release > 3.0 && previousRelease <= 3.0) viewer.setFocus('cage');
    if (release === 0 && previousRelease > 0) viewer.setFocus('drive');
    if (dt > 0 && !v.reducedMotion)
      for (const [time, cue] of [
        [0.7, 'latch'],
        [1.2, 'door'],
        [8.8, 'free'],
      ] as const)
        if (release >= time && previousRelease < time) sound.play(cue);
    previousRelease = release;
    const can = operable(),
      uiKey = JSON.stringify([shown, selected, can, v.testing, v.paused, reading.solved]);
    if (uiKey !== ui) {
      ui = uiKey;
      root.querySelectorAll<HTMLButtonElement>('button[data-mirror]').forEach((button, i) => {
        button.disabled = !can;
        button.setAttribute('aria-pressed', String(i === selected));
        q(`[data-angle="${i}"]`).textContent = `${shown[i]}°`;
      });
      if (control.dataset['mirror'] !== String(selected)) {
        control.dataset['mirror'] = String(selected);
        control.replaceChildren();
        for (let a = 0; a < 180; a += d.mirrors[selected].step) {
          const option = document.createElement('option');
          option.value = String(a);
          option.textContent = `${a}°`;
          control.append(option);
        }
      }
      control.value = String(shown[selected]);
      control.disabled = !can;
      q('[data-selected]').textContent = `Mirror ${selected + 1}`;
      for (const name of ['left', 'right', 'reset']) action(name).disabled = !can;
      action('test').disabled = !can || reading.solved;
      action('replay').hidden = !reading.solved;
      action('replay').disabled = v.testing || v.paused;
      action('pause').textContent = v.paused ? 'Resume' : 'Pause';
      action('pause').setAttribute('aria-pressed', String(v.paused));
    }
    const message = v.paused
      ? 'Workshop paused.'
      : reading.solved
        ? release >= OWL_ESCAPE_DURATION
          ? `${stage.owls.length} owls safely outside. Replay their flight or try another beam path.`
          : release < 0.7
            ? 'Receiver lit. The light holds steady…'
            : release < 2.7
              ? 'The catch slides free. The counterweight lifts the grille.'
              : `${state.escaped} / ${stage.owls.length} owls outside. Watch their wings unfold!`
        : state.trace.reason === 'blocked'
          ? 'The stone baffle stops the beam. Find a path around it.'
          : `Mirror ${selected + 1} · ${shown[selected]}°. ${state.trace.points.length > 2 ? 'Follow the reflected beam to the next mirror.' : 'Turn the brass handle to redirect the moonbeam.'}`;
    if (message !== lastFeedback) {
      lastFeedback = message;
      q('.oc-feedback').textContent = message;
      q('.oc-feedback').dataset['blocked'] = String(state.trace.reason === 'blocked');
    }
    root.dataset['angles'] = angles().join(',');
    root.dataset['previewAngles'] = shown.join(',');
    root.dataset['release'] = release.toFixed(2);
    root.dataset['escaped'] = String(state.escaped);
    root.dataset['beam'] = state.trace.reason;
    viewer.canvas.setAttribute(
      'aria-label',
      `Moonbeam workshop. ${shown.map((a, i) => `Mirror ${i + 1}: ${a} degrees`).join('; ')}. Beam ${state.trace.hit ? 'at receiver' : state.trace.reason}. Cage ${state.release.lift === 1 ? 'open' : 'closed'}. ${state.escaped} owls outside. Use the mirror and angle controls below.`,
    );
    if (!document.hidden) viewer.render(dt, v.reducedMotion);
    root.dataset['drawCalls'] = String(viewer.renderer.info.render.calls);
    if (result.finished) cb.finished();
    frame = requestAnimationFrame(tick);
  }
  cb.ready();
  frame = requestAnimationFrame(tick);
  function destroy() {
    if (gone) return;
    gone = true;
    cancelAnimationFrame(frame);
    cancelPointer();
    root.removeEventListener('click', click);
    root.removeEventListener('change', change);
    root.removeEventListener('keydown', key);
    root.removeEventListener('pointerdown', down);
    root.removeEventListener('pointermove', move);
    root.removeEventListener('pointerup', up);
    root.removeEventListener('pointercancel', cancelPointer);
    sound.destroy();
    viewer?.destroy();
    root.remove();
  }
  return { destroy };
}
