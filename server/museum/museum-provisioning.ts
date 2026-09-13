import {
  boundedText,
  isMuseumAssignment,
  museumScopeKey,
} from '../../src/app/templates/exhibit-hall/rooms/museum-publication';
import { parseMuseumScope } from './museum-policy';
import type { MuseumPublicationScope } from '../../src/app/templates/exhibit-hall/rooms/museum-publication';
import type { MuseumRoomAssignment } from '../../src/app/templates/exhibit-hall/rooms/museum-room';

export interface MuseumProvisioningPlan {
  readonly scope: MuseumPublicationScope;
  readonly rooms: readonly {
    readonly room: MuseumRoomAssignment;
    readonly teamId: string;
    readonly curatorName: string;
    readonly actorIds: readonly string[];
  }[];
}
/** Administrative provisioning only. No HTTP endpoint exposes roster or assignment writes. */
export function museumProvisioningStatements(
  plan: MuseumProvisioningPlan,
): readonly { readonly sql: string; readonly parameters: readonly (string | number)[] }[] {
  const scope = parseMuseumScope(plan.scope),
    key = museumScopeKey(scope);
  if (!Array.isArray(plan.rooms) || !plan.rooms.length || plan.rooms.length > 500)
    throw new Error('INVALID_MUSEUM_ROSTER');
  const roomIds = new Set<string>(),
    teams = new Set<string>(),
    actors = new Set<string>();
  const statements: { sql: string; parameters: (string | number)[] }[] = [
    {
      sql: 'INSERT INTO museum_classes (scope_key, submission_locked, collection_open) VALUES (?, 0, 0)',
      parameters: [key],
    },
  ];
  for (const [position, assigned] of plan.rooms.entries()) {
    if (
      !isMuseumAssignment(assigned.room) ||
      !boundedText(assigned.teamId, 120) ||
      !boundedText(assigned.curatorName, 160) ||
      !Array.isArray(assigned.actorIds) ||
      !assigned.actorIds.length ||
      roomIds.has(assigned.room.roomId) ||
      teams.has(assigned.teamId)
    )
      throw new Error('INVALID_MUSEUM_ROSTER');
    roomIds.add(assigned.room.roomId);
    teams.add(assigned.teamId);
    statements.push({
      sql: 'INSERT INTO museum_assignments (scope_key, room_id, team_id, room_label, layout_id, position, curator_name) VALUES (?, ?, ?, ?, ?, ?, ?)',
      parameters: [
        key,
        assigned.room.roomId,
        assigned.teamId,
        assigned.room.label,
        assigned.room.layoutId,
        position,
        assigned.curatorName,
      ],
    });
    for (const actorId of assigned.actorIds) {
      if (!boundedText(actorId, 180) || actors.has(actorId))
        throw new Error('INVALID_MUSEUM_ROSTER');
      actors.add(actorId);
      statements.push({
        sql: 'INSERT INTO museum_memberships (scope_key, actor_id, team_id, role) VALUES (?, ?, ?, ?)',
        parameters: [key, actorId, assigned.teamId, 'student'],
      });
    }
  }
  return statements;
}
