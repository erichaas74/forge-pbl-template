import { ExhibitAccessPolicy } from '../core/exhibit-access-policy';
import { cloneHallState, withRevision } from '../core/exhibit-state';
import type {
  ExhibitActor,
  ExhibitHallState,
  ExhibitMutationResult,
  HallPhase,
} from '../domain/exhibit-types';

export class LiveFocusService {
  constructor(private readonly policy = new ExhibitAccessPolicy()) {}

  setPhase(
    state: ExhibitHallState,
    actor: ExhibitActor,
    hallPhase: HallPhase,
    now: string,
  ): ExhibitMutationResult {
    if (!this.policy.canControlHall(actor, state)) return teacherOnly(state);
    const sessionPhase =
      hallPhase === 'closed_readable'
        ? 'closed'
        : hallPhase === 'live_opening'
          ? 'standing'
          : 'walk';
    return {
      ok: true,
      state: withRevision({
        ...cloneHallState(state),
        hallPhase,
        openingSession: {
          ...state.openingSession,
          phase: sessionPhase,
          revision: state.openingSession.revision + 1,
          openedAt: state.openingSession.openedAt || now,
          closedAt: hallPhase === 'closed_readable' ? now : undefined,
        },
      }),
      announcement:
        hallPhase === 'live_opening'
          ? 'The live opening has started.'
          : hallPhase === 'closed_readable'
            ? 'The opening is closed. Exhibits remain readable.'
            : 'The class is released for an independent gallery walk.',
    };
  }

  point(
    state: ExhibitHallState,
    actor: ExhibitActor,
    hangingId: string,
    expectedRevision?: number,
  ): ExhibitMutationResult {
    if (!this.policy.canControlHall(actor, state)) return teacherOnly(state);
    if (expectedRevision !== undefined && expectedRevision !== state.openingSession.revision) {
      return { ok: false, state, error: 'The live session changed. Reload the newest focus.' };
    }
    const hanging = state.hangings.find((item) => item.id === hangingId);
    if (hanging === undefined) return { ok: false, state, error: 'That exhibit is not published.' };
    const snapshot = state.snapshots.find((item) => item.id === hanging.currentSnapshotId);
    const title = snapshot?.accessibleData.title ?? 'the selected exhibit';
    return {
      ok: true,
      state: withRevision({
        ...cloneHallState(state),
        hallPhase: 'live_opening',
        openingSession: {
          ...state.openingSession,
          phase: 'standing',
          currentHangingId: hangingId,
          revision: state.openingSession.revision + 1,
        },
      }),
      entityId: hangingId,
      announcement: `The class is now standing at ${title}.`,
    };
  }

  setNavigationMode(
    state: ExhibitHallState,
    actor: ExhibitActor,
    navigationMode: 'independent' | 'teacher_follow',
  ): ExhibitMutationResult {
    if (!this.policy.canControlHall(actor, state)) return teacherOnly(state);
    return {
      ok: true,
      state: withRevision({
        ...cloneHallState(state),
        hall: {
          ...state.hall,
          controls: { ...state.hall.controls, navigationMode },
        },
        openingSession: {
          ...state.openingSession,
          navigationMode,
          revision: state.openingSession.revision + 1,
        },
      }),
      announcement:
        navigationMode === 'teacher_follow'
          ? 'Teacher-follow mode is on.'
          : 'Independent gallery navigation is on.',
    };
  }

  toggleControl(
    state: ExhibitHallState,
    actor: ExhibitActor,
    control: 'submissionLocked' | 'peerResponsesEnabled' | 'familyViewEnabled',
  ): ExhibitMutationResult {
    if (!this.policy.canControlHall(actor, state)) return teacherOnly(state);
    if (control === 'familyViewEnabled' && state.hallPhase !== 'closed_readable') {
      return { ok: false, state, error: 'Close the opening before enabling family view.' };
    }
    const value = !state.hall.controls[control];
    const next = cloneHallState(state);
    return {
      ok: true,
      state: withRevision({
        ...next,
        hall: { ...next.hall, controls: { ...next.hall.controls, [control]: value } },
        openingSession:
          control === 'peerResponsesEnabled'
            ? {
                ...next.openingSession,
                peerResponsesEnabled: value,
                revision: next.openingSession.revision + 1,
              }
            : next.openingSession,
      }),
      announcement: `${controlLabel(control)} ${value ? 'enabled' : 'disabled'}.`,
    };
  }
}

function teacherOnly(state: ExhibitHallState): ExhibitMutationResult {
  return { ok: false, state, error: 'Only the teacher can change hall controls.' };
}

function controlLabel(control: string): string {
  if (control === 'submissionLocked') return 'Submission lock';
  if (control === 'familyViewEnabled') return 'Family view';
  return 'Question cards';
}
