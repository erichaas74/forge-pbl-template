import { CapabilityRegistry, EventRegistry } from '../../../core/registries/specialized-registries';
import type { RuntimeEvent } from '../../../core/events/runtime-event';
import {
  INVENTION_EVENTS,
  type InventionAction,
  type InventionProject,
  type InventionSession,
  type InventionState,
  type PressProof,
  type PressSettings,
} from './invention.models';

export const inventionEvents = new EventRegistry();
for (const id of Object.values(INVENTION_EVENTS))
  inventionEvents.register({ id, version: '1.0.0', status: 'extension' });
export const inventionCapabilities = new CapabilityRegistry();
inventionCapabilities.register({
  id: 'invention-repair.printing-press',
  version: '1.0.0',
  status: 'extension',
  renderer: 'invention-workspace',
  eventsProduced: Object.values(INVENTION_EVENTS),
});

export function initialInventionState(): InventionState {
  return {
    version: 0,
    trials: [],
    samples: [],
    preparation: { inked: false, paperLoaded: false },
    flow: { strokes: 0, sheets: 0, finished: 0, delivered: 0, inspected: [], supplied: 0 },
    events: [],
  };
}
export function validPressSettings(
  value: unknown,
  project: InventionProject,
  session: InventionSession,
): value is PressSettings {
  if (!value || typeof value !== 'object') return false;
  const s = value as PressSettings;
  return (
    Array.isArray(s.type) &&
    s.type.length === session.target.length &&
    [...s.type].sort().join('') === [...session.target].sort().join('') &&
    project.inventionRescue.inks.some((i) => i.id === s.ink) &&
    Number.isInteger(s.pressure) &&
    s.pressure >= 0 &&
    s.pressure <= 2 &&
    Array.isArray(s.packing) &&
    s.packing.length === 3 &&
    s.packing.every((n) => Number.isInteger(n) && n >= 0 && n <= 2)
  );
}
/** A qualitative teaching model. Coefficients are not measurements of a historical press. */
export function pullProof(
  project: InventionProject,
  session: InventionSession,
  settings: PressSettings,
  id: number,
): PressProof {
  const ink = project.inventionRescue.inks.find((i) => i.id === settings.ink)!;
  const pressure = [0.38, 1, 1.08][settings.pressure];
  const coverage = settings.packing.map((p) =>
    Math.min(1, ink.adhesion * pressure * [0.32, 1, 0.7][p]),
  );
  const spread = Math.min(
    1,
    ink.spread + (settings.pressure === 2 ? 0.42 : 0) + (settings.packing.includes(2) ? 0.25 : 0),
  );
  const text = [...settings.type].reverse().join('');
  const fault =
    text !== session.target
      ? 'type'
      : ink.adhesion < 0.8 || ink.spread > 0.2
        ? 'ink'
        : settings.pressure !== 1
          ? 'pressure'
          : settings.packing.some((p) => p !== 1)
            ? 'packing'
            : 'none';
  return {
    id,
    settings: structuredClone(settings),
    text,
    coverage,
    spread,
    usable: fault === 'none',
    fault,
  };
}
export function consecutiveGoodProofs(state: InventionState): number {
  let count = 0;
  for (let i = state.trials.length - 1; i >= 0 && state.trials[i].usable; i--) count++;
  return count;
}
export function batchReady(state: InventionState, session: InventionSession): boolean {
  return consecutiveGoodProofs(state) >= session.batchSize;
}
export function applyInventionAction(
  project: InventionProject,
  session: InventionSession,
  state: InventionState,
  action: InventionAction,
  event: RuntimeEvent,
): { state: InventionState; message: string } {
  const unchanged = (message: string) => ({ state, message });
  if (
    state.events.some(
      (e) =>
        e.id === event.id || (!!event.clientEventId && e.clientEventId === event.clientEventId),
    )
  )
    return unchanged('This action is already in the notebook.');
  if (
    !inventionEvents.has(event.eventType) ||
    event.eventType !== INVENTION_EVENTS[action.type] ||
    event.projectId !== project.projectId ||
    event.sourceId !== session.id
  )
    return unchanged('INVALID_INVENTION_EVENT');
  if (state.events.length >= 400)
    return unchanged(
      'This session’s notebook is full. Export it from the task box before starting a fresh attempt.',
    );
  let next = state;
  let message = '';
  if (action.type === 'prepare') {
    if (session.mode !== 'reference' || !['ink', 'paper'].includes(action.part))
      return unchanged('PREPARATION_UNAVAILABLE');
    if (action.part === 'ink' && state.preparation.paperLoaded)
      return unchanged('The sheet covers the type. Lift it before applying ink.');
    next = {
      ...state,
      preparation:
        action.part === 'ink'
          ? { ...state.preparation, inked: true }
          : { ...state.preparation, paperLoaded: !state.preparation.paperLoaded },
    };
    message =
      action.part === 'ink'
        ? 'Ink now coats the raised type. Place a sheet over it.'
        : next.preparation.paperLoaded
          ? 'Paper is in place. Pull the press to test the impression.'
          : 'The sheet is lifted. The type is exposed again.';
  } else if (action.type === 'proof') {
    if (session.mode === 'courtyard' || !validPressSettings(action.settings, project, session))
      return unchanged('INVALID_PRESS_SETTINGS');
    if (session.mode === 'reference' && !state.preparation.paperLoaded)
      return unchanged('The press bed has no sheet. Ink the type and place paper over it.');
    const uninked = session.mode === 'reference' && !state.preparation.inked;
    const trial = pullProof(project, session, action.settings, (state.trials.at(-1)?.id ?? 0) + 1);
    const proof: PressProof = uninked
      ? { ...trial, coverage: [0, 0, 0], usable: false, fault: 'ink' }
      : trial;
    next = {
      ...state,
      preparation: { inked: false, paperLoaded: false },
      trials: [...state.trials, proof].slice(-60),
    };
    message = uninked
      ? 'A blank sheet. Pressure cannot print letters without ink on the type.'
      : proof.usable
        ? 'Clean impression. Compare it with your earlier sheets.'
        : {
            type: 'The impression differs from the reference. Inspect the order of the type.',
            ink: 'The ink leaves an uneven or spreading impression. Compare your material tests.',
            pressure: 'The impression is too faint or spreads under pressure.',
            packing: 'One region prints differently. Inspect support beneath the forme.',
            none: '',
          }[proof.fault];
  } else if (action.type === 'sample') {
    if (session.mode !== 'ink') return unchanged('MATERIAL_TEST_UNAVAILABLE');
    const ink = project.inventionRescue.inks.find((i) => i.id === action.ink);
    if (!ink || !['paper', 'metal'].includes(action.surface))
      return unchanged('INVALID_MATERIAL_SAMPLE');
    const sample = {
      ink: ink.id,
      surface: action.surface,
      adhesion: action.surface === 'metal' ? ink.adhesion : ink.paperAdhesion,
      spread: ink.spread,
    };
    next = { ...state, samples: [...state.samples, sample].slice(-18) };
    message = `${ink.name} on ${action.surface}: ${sample.adhesion < 0.5 ? 'broken coverage' : sample.spread > 0.2 ? 'spreading edges' : 'even coverage'}.`;
  } else if (action.type === 'flow') {
    if (
      !['courtyard', 'return'].includes(session.mode) ||
      !['scribe', 'binder', 'courier', 'patron'].includes(action.station)
    )
      return unchanged('INVALID_WORKSHOP_STATION');
    let flow = {
      ...state.flow,
      inspected: [...new Set([...state.flow.inspected, action.station])],
    };
    const available =
      session.mode === 'return' && batchReady(state, session)
        ? state.trials.filter((t) => t.usable).length
        : 0;
    if (available > flow.supplied)
      flow = { ...flow, sheets: flow.sheets + available - flow.supplied, supplied: available };
    if (action.station === 'scribe') {
      const strokes = flow.strokes + 1;
      flow = { ...flow, strokes, sheets: flow.sheets + (strokes % 3 === 0 ? 1 : 0) };
      message =
        strokes % 3 === 0
          ? 'A hand-copied sample is ready for the binder.'
          : 'The scribe is still copying. Watch the page fill.';
    } else if (action.station === 'binder') {
      if (flow.sheets > 0) {
        flow = { ...flow, sheets: flow.sheets - 1, finished: flow.finished + 1 };
        message = 'A sample copy is finished and ready to send.';
      } else message = 'The binder has covers, but no pages. Follow the missing supply.';
    } else if (action.station === 'courier') {
      if (flow.finished > 0) {
        flow = { ...flow, finished: flow.finished - 1, delivered: flow.delivered + 1 };
        message = 'The messenger leaves with a copy. Another commission still waits.';
      } else message = 'The messenger cannot leave with an unfinished copy.';
    } else
      message =
        'This patron can pay for a copy. The waiting reader still cannot. Printing alone does not remove that barrier.';
    next = { ...state, flow };
  }
  return {
    state: { ...next, version: state.version + 1, events: [...state.events, event] },
    message,
  };
}
