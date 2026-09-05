import type {
  ExhibitActor,
  ExhibitArtifact,
  ExhibitHallState,
  HallHanging,
} from '../domain/exhibit-types';

export class ExhibitAccessPolicy {
  belongsToHall(actor: ExhibitActor, state: ExhibitHallState): boolean {
    return actor.role === 'family' || actor.courseSectionIds.includes(state.hall.courseSectionId);
  }

  canReadHanging(actor: ExhibitActor, state: ExhibitHallState, _hanging: HallHanging): boolean {
    if (!this.belongsToHall(actor, state)) return false;
    if (actor.role !== 'family') return state.hallPhase !== 'dark';
    return state.hall.controls.familyViewEnabled && state.hallPhase === 'closed_readable';
  }

  canPublishArtifact(
    actor: ExhibitActor,
    state: ExhibitHallState,
    artifact: ExhibitArtifact,
  ): boolean {
    if (!this.belongsToHall(actor, state) || state.hall.controls.submissionLocked) return false;
    return actor.role === 'teacher' || actor.teamIds.includes(artifact.ownerId);
  }

  canRespond(actor: ExhibitActor, state: ExhibitHallState, hanging: HallHanging): boolean {
    if (
      actor.role !== 'student' ||
      !this.belongsToHall(actor, state) ||
      !state.hall.controls.peerResponsesEnabled ||
      !state.openingSession.peerResponsesEnabled
    ) {
      return false;
    }
    const artifact = state.artifacts.find((item) => item.id === hanging.artifactId);
    return artifact !== undefined && !actor.teamIds.includes(artifact.ownerId);
  }

  canSubmitDefense(actor: ExhibitActor, state: ExhibitHallState): boolean {
    return actor.role === 'student' && this.belongsToHall(actor, state);
  }

  canControlHall(actor: ExhibitActor, state: ExhibitHallState): boolean {
    return actor.role === 'teacher' && this.belongsToHall(actor, state);
  }

  canModerateResponses(actor: ExhibitActor, state: ExhibitHallState): boolean {
    return this.canControlHall(actor, state);
  }

  canReadPrivateNotebook(actor: ExhibitActor, state: ExhibitHallState, teamId: string): boolean {
    return (
      this.belongsToHall(actor, state) &&
      (actor.role === 'teacher' || (actor.role === 'student' && actor.teamIds.includes(teamId)))
    );
  }
}
