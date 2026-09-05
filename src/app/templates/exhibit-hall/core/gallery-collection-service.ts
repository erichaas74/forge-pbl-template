import type {
  ExhibitActor,
  ExhibitHallState,
  ExhibitTeam,
  HallLocationView,
} from '../domain/exhibit-types';
import { ExhibitAccessPolicy } from './exhibit-access-policy';

export class GalleryCollectionService {
  constructor(private readonly policy = new ExhibitAccessPolicy()) {}

  build(
    state: ExhibitHallState,
    teams: readonly ExhibitTeam[],
    actor: ExhibitActor,
  ): readonly HallLocationView[] {
    const teamByLocation = new Map(teams.map((team) => [team.locationId, team]));
    return state.hall.locationOrder.flatMap((locationId, position) => {
      const team = teamByLocation.get(locationId);
      if (team === undefined) return [];
      const hanging = state.hangings.find((item) => item.locationId === locationId);
      if (hanging === undefined) {
        return actor.role === 'family' ? [] : [{ locationId, position, team }];
      }
      if (!this.policy.canReadHanging(actor, state, hanging)) return [];
      const snapshot = state.snapshots.find((item) => item.id === hanging.currentSnapshotId);
      return [{ locationId, position, team, hanging, snapshot }];
    });
  }
}
