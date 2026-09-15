import * as T from 'three';
import type { MachineDefinition, Point } from '../machine.models';
import type { MachineCallbacks, MachineView } from '../machine-surface';
import type { MachineSceneHandle } from '../machine.scene';
import { machineReading } from '../machine.rules';
import { DioramaViewer, type DioramaFocus } from '../diorama-viewer';
import { TimingCageSound } from '../timing-cage/timing-cage.sound';
import { bridgeCageLayout } from './bridge-cage.layout';
import { createBridgeDiorama, positionBridgeDiorama } from './bridge-cage.model';
import {
  bridgeAnswers,
  bridgeParts,
  BridgeSequence,
  BRIDGE_DURATION,
  carriageInput,
  carriagePoint,
} from './bridge-cage.motion';

export function mountBridgeCage(
  parent: HTMLElement,
  d: MachineDefinition,
  snapshot: () => MachineView,
  cb: MachineCallbacks,
): MachineSceneHandle {
  const root = document.createElement('div');
  root.dataset['bridgeCage'] = '';
  root.innerHTML = bridgeCageLayout;
  parent.append(root);
  const q = <E extends HTMLElement>(selector: string) => root.querySelector<E>(selector)!;
  const action = (name: string) => q<HTMLButtonElement>(`[data-action=${name}]`);
  const [coordinate, cable] = bridgeParts(d),
    sound = new TimingCageSound();
  let viewer: DioramaViewer,
    gone = false,
    frame = 0;
  const focuses: Record<string, DioramaFocus> = {
    all: { center: [0.5, 5, 1.9], width: 29, height: 13.4 },
    drive: { center: [-7.25, 6.5, 0.6], width: 10.8, height: 10.6 },
    cage: { center: [5.7, 3.5, 3.6], width: 19.5, height: 10.1 },
    following: { center: [0, 2.3, 3.5], width: 8.2, height: 7.1 },
    rabbits: { center: [11.8, 1.9, 3.6], width: 5.8, height: 5.0 },
  };
  try {
    viewer = new DioramaViewer(root, 'bridge', focuses, () => {
      destroy();
      cb.failed();
    });
  } catch {
    root.remove();
    sound.destroy();
    cb.failed();
    return { destroy() {} };
  }
  viewer.renderer.setClearColor(0x24494f);
  viewer.scene.environmentIntensity = 0.62;
  viewer.canvas.tabIndex = 0;
  const model = createBridgeDiorama(viewer.art, d);
  viewer.scene.add(model.root);
  const sequence = new BridgeSequence(d, snapshot()),
    reduced = q<HTMLInputElement>('[data-motion]');
  reduced.checked = snapshot().reducedMotion;
  const axes = {
    x: q<HTMLSelectElement>('[data-axis=x]'),
    y: q<HTMLSelectElement>('[data-axis=y]'),
  };
  for (const axis of Object.values(axes))
    for (let n = coordinate.min; n <= coordinate.max; n++) {
      const option = document.createElement('option');
      option.value = String(n);
      option.textContent = String(n);
      axis.append(option);
    }
  cable.cables.forEach((item, i) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset['cable'] = String(i);
    button.setAttribute('aria-label', `Fit ${item.label} cable`);
    button.setAttribute('aria-pressed', 'false');
    button.innerHTML =
      '<svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="17" fill="#203f43" stroke="#dfc285" stroke-width="3"/><circle cx="20" cy="20" r="11" fill="none" stroke="#ba9868" stroke-width="5"/><circle cx="20" cy="20" r="4" fill="#92a8a6"/></svg>';
    const label = document.createElement('span');
    label.textContent = item.label;
    button.append(label);
    q('[data-cables]').append(button);
  });
  let previous = performance.now(),
    age = 0,
    lastRelease = 0,
    ui = '',
    feedback = '',
    changedAt = -1,
    lastKey = JSON.stringify(bridgeAnswers(d, snapshot())),
    oldStage = snapshot().active,
    suspended = false;
  let drag: { id: number; point: Point; moved: boolean; x: number; y: number } | undefined;
  const view = (): MachineView => ({
    ...snapshot(),
    reducedMotion: reduced.checked || snapshot().reducedMotion,
  });
  const operable = () =>
    !gone && !snapshot().paused && !snapshot().testing && !snapshot().completed;
  const position = (): Point => {
    const a = bridgeAnswers(d, snapshot())[0];
    return a.kind === 'coordinate' ? a : { x: 0, y: 0 };
  };
  const commit = (p: Point) => {
    if (!operable() || snapshot().active !== 0) return;
    cb.input({ type: 'point', x: p.x, y: p.y });
    sound.play('tick');
  };
  const step = (axis: 'x' | 'y', delta: number) => {
    const p = position();
    commit({ ...p, [axis]: Math.max(coordinate.min, Math.min(coordinate.max, p[axis] + delta)) });
  };
  const cancel = () => {
    const id = drag?.id;
    drag = undefined;
    if (id !== undefined && root.hasPointerCapture(id)) root.releasePointerCapture(id);
  };
  const ray = new T.Raycaster(),
    plane = new T.Plane(new T.Vector3(0, 0, 1), -0.8);
  const pointer = (event: PointerEvent) => {
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
    if (
      !operable() ||
      snapshot().active !== 0 ||
      event.button !== 0 ||
      event.target !== viewer.canvas
    )
      return;
    const p = pointer(event),
      current = carriagePoint(coordinate, position());
    if (!p || p.distanceTo(new T.Vector3(...current)) > 0.8) return;
    event.preventDefault();
    sound.unlock();
    viewer.canvas.focus({ preventScroll: true });
    drag = {
      id: event.pointerId,
      point: position(),
      moved: false,
      x: event.clientX,
      y: event.clientY,
    };
    root.setPointerCapture(event.pointerId);
  };
  const move = (event: PointerEvent) => {
    if (!drag || drag.id !== event.pointerId) return;
    if (!operable()) {
      cancel();
      return;
    }
    const p = pointer(event);
    if (!p) return;
    drag.moved ||= Math.hypot(event.clientX - drag.x, event.clientY - drag.y) > 5;
    if (drag.moved) drag.point = carriageInput(coordinate, p.x, p.y);
  };
  const up = (event: PointerEvent) => {
    if (!drag || drag.id !== event.pointerId) return;
    const current = drag;
    cancel();
    if (current.moved) commit(current.point);
  };
  const start = () => {
    if (operable() && !drag) {
      cb.engage?.();
      action('pause').focus({ preventScroll: true });
    }
  };
  const click = (event: MouseEvent) => {
    const button = (event.target as Element).closest<HTMLButtonElement>('button');
    if (!button || button.disabled) return;
    sound.unlock();
    if (button.dataset['stage'] !== undefined) {
      cancel();
      cb.stage?.(Number(button.dataset['stage']));
      return;
    }
    if (button.dataset['cable'] !== undefined) {
      if (operable() && snapshot().active === 1) {
        cb.input({ type: 'cable', index: Number(button.dataset['cable']) });
        sound.play('tick');
      }
      return;
    }
    if (button.dataset['focus']) {
      cancel();
      viewer.setFocus(button.dataset['focus']);
      return;
    }
    switch (button.dataset['action']) {
      case 'xminus':
        step('x', -1);
        break;
      case 'xplus':
        step('x', 1);
        break;
      case 'yminus':
        step('y', -1);
        break;
      case 'yplus':
        step('y', 1);
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
        cancel();
        cb.pause?.();
        break;
      case 'expand':
        cancel();
        viewer.expand(!viewer.expanded);
        break;
      case 'reset':
        if (operable()) {
          cancel();
          cb.input({ type: 'reset' });
          viewer.closeOptions();
          viewer.setFocus('drive');
          action('options').focus();
        }
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
    if (event.target === axes.x || event.target === axes.y)
      commit({ x: Number(axes.x.value), y: Number(axes.y.value) });
    if ((event.target as HTMLElement).matches('[data-sound]')) {
      sound.enabled = (event.target as HTMLInputElement).checked;
      if (sound.enabled) sound.unlock();
      else sound.suspend();
    }
  };
  const key = (event: KeyboardEvent) => {
    if (event.key === 'Escape') cancel();
    if (event.target !== viewer.canvas || snapshot().active !== 0) return;
    const arrows: Record<string, readonly ['x' | 'y', number]> = {
      ArrowLeft: ['x', -1],
      ArrowRight: ['x', 1],
      ArrowUp: ['y', 1],
      ArrowDown: ['y', -1],
    };
    if (arrows[event.key]) {
      event.preventDefault();
      step(...arrows[event.key]);
    }
  };
  root.addEventListener('click', click);
  root.addEventListener('change', change);
  root.addEventListener('keydown', key);
  root.addEventListener('pointerdown', down);
  root.addEventListener('pointermove', move);
  root.addEventListener('pointerup', up);
  root.addEventListener('pointercancel', cancel);
  function tick(now: number) {
    if (gone) return;
    const v = view(),
      paused = v.paused || document.hidden,
      dt = paused ? 0 : Math.min(0.1, Math.max(0, (now - previous) / 1000));
    previous = now;
    age += dt;
    if (paused !== suspended) {
      suspended = paused;
      if (paused) {
        cancel();
        sound.suspend();
      } else sound.resume();
    }
    if (v.active !== oldStage) {
      oldStage = v.active;
      cancel();
      viewer.setFocus('drive');
    }
    const answers = bridgeAnswers(d, v),
      answerKey = JSON.stringify(answers);
    if (answerKey !== lastKey) {
      lastKey = answerKey;
      changedAt = age;
    }
    const settled = !drag && age - changedAt > 0.18,
      result = sequence.update(v, dt, settled);
    cb.settled(settled);
    if (result.engage) start();
    const release = result.all ? sequence.time : 0,
      shown = drag?.point ?? position();
    const state = positionBridgeDiorama(
      viewer.art,
      model,
      d,
      answers,
      v.active,
      release,
      v.reducedMotion ? 0 : age,
      drag?.point,
    );
    const rabbitXs = model.rabbits.map((rabbit) => rabbit.root.position.x);
    focuses['following'] = {
      center: [(Math.min(...rabbitXs) + Math.max(...rabbitXs)) / 2, 2.3, 3.5],
      width: 8.2,
      height: 7.1,
    };
    if (v.testing && release > 0.65 && lastRelease <= 0.65) viewer.setFocus('cage');
    if (v.testing && release > 4.3 && lastRelease <= 4.3 && viewer.viewport.clientWidth < 650)
      viewer.setFocus('following');
    if (
      v.testing &&
      release >= BRIDGE_DURATION &&
      lastRelease < BRIDGE_DURATION &&
      viewer.viewport.clientWidth < 650
    )
      viewer.setFocus('rabbits');
    if (release === 0 && lastRelease > 0) viewer.setFocus('drive');
    if (dt > 0 && !v.reducedMotion)
      for (const [time, cue] of [
        [0.6, 'latch'],
        [3.1, 'door'],
        [13.7, 'free'],
      ] as const)
        if (release >= time && lastRelease < time) sound.play(cue);
    lastRelease = release;
    const can = operable(),
      reading = machineReading(d.stages[v.active], v.answer);
    const uiKey = JSON.stringify([v.active, shown, answers, can, v.testing, v.paused, v.completed]);
    if (ui !== uiKey) {
      ui = uiKey;
      root.querySelectorAll<HTMLButtonElement>('[data-stage]').forEach((button, i) => {
        button.setAttribute('aria-pressed', String(i === v.active));
        button.disabled =
          v.testing ||
          v.paused ||
          (!v.freelySelectStages && i !== v.active && !(i === v.active + 1 && v.completed));
        q(`[data-status="${i}"]`).textContent = machineReading(d.stages[i], answers[i]).solved
          ? 'Aligned'
          : i === 0
            ? 'Position the carriage'
            : 'Fit a measured cable';
      });
      q('[data-clue]').textContent = d.stages[v.active].instruction;
      q('[data-hint]').textContent = d.stages[v.active].hint;
      q('[data-rails]').hidden = v.active !== 0;
      q('[data-cables]').hidden = v.active !== 1;
      for (const axis of ['x', 'y'] as const) {
        axes[axis].value = String(shown[axis]);
        axes[axis].disabled = !can;
      }
      for (const name of ['xminus', 'xplus', 'yminus', 'yplus', 'reset'])
        action(name).disabled = !can;
      action('xminus').disabled ||= shown.x <= coordinate.min;
      action('xplus').disabled ||= shown.x >= coordinate.max;
      action('yminus').disabled ||= shown.y <= coordinate.min;
      action('yplus').disabled ||= shown.y >= coordinate.max;
      root.querySelectorAll<HTMLButtonElement>('[data-cable]').forEach((button, i) => {
        button.disabled = !can;
        button.setAttribute(
          'aria-pressed',
          String(answers[1].kind === 'cable' && answers[1].cable === i),
        );
      });
      action('test').disabled = !can || reading.solved;
      action('test').hidden = reading.solved;
      action('replay').hidden = !result.all;
      action('replay').disabled = v.testing || v.paused;
      action('pause').textContent = v.paused ? 'Resume' : 'Pause';
      action('pause').setAttribute('aria-pressed', String(v.paused));
    }
    const message = v.paused
      ? 'Workshop paused.'
      : result.all
        ? release >= BRIDGE_DURATION
          ? `${state.escaped} rabbits across. The bridge and holding gate stay open.`
          : release < 0.75
            ? 'Both interlocks align. The bridge pin withdraws…'
            : release < 2.9
              ? 'The drum unwinds. Watch the bridge settle onto its far support.'
              : release < 4.3
                ? 'Bridge secured. Its linkage lifts the holding gate.'
                : `${state.escaped} / ${model.rabbits.length} rabbits across. Watch their staggered hops.`
        : reading.solved
          ? v.active === 0
            ? 'Anchor docked. Select Cable rig to finish the crossing.'
            : 'Cable taut. Align the Anchor rails to release the bridge.'
          : v.active === 0
            ? `Carriage (${shown.x}, ${shown.y}). Drag the brass handle or turn the X/Y controls.`
            : state.fitted.state === 'short'
              ? 'Too short: the hook cannot reach the final anchor.'
              : state.fitted.state === 'slack'
                ? 'Too long: the sag leaves the spring loose.'
                : 'Select a reel to fit its cable around the marked route.';
    if (message !== feedback) {
      feedback = message;
      q('.bc-feedback').textContent = message;
    }
    root.dataset['position'] = `${position().x},${position().y}`;
    root.dataset['previewPosition'] = `${shown.x},${shown.y}`;
    root.dataset['release'] = release.toFixed(2);
    root.dataset['escaped'] = String(state.escaped);
    root.dataset['cableFit'] = state.fitted.state;
    viewer.canvas.setAttribute(
      'aria-label',
      `Bridge workshop. Anchor (${shown.x}, ${shown.y}). Cable ${state.fitted.state}. Bridge ${state.release.deck === 1 ? 'down' : 'raised'}. Holding gate ${state.release.gate === 1 ? 'open' : 'closed'}. ${state.escaped} rabbits across. Arrow keys move the selected anchor; matching controls below.`,
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
    cancel();
    root.removeEventListener('click', click);
    root.removeEventListener('change', change);
    root.removeEventListener('keydown', key);
    root.removeEventListener('pointerdown', down);
    root.removeEventListener('pointermove', move);
    root.removeEventListener('pointerup', up);
    root.removeEventListener('pointercancel', cancel);
    sound.destroy();
    viewer?.destroy();
    root.remove();
  }
  return { destroy };
}
