import { describe, expect, it } from 'vitest';
import { museumProvisioningStatements } from './museum-provisioning';

describe('teacher-authored museum roster provisioning', () => {
  const scope = {
    tenantId: 'school',
    classId: 'science',
    projectId: 'plant-structures',
    projectVersion: '1.0',
    museumId: 'spring',
  };
  const room = { roomId: 'room-a', label: 'Leaf structures', layoutId: 'classic-museum-room-v1' };
  const assignment = {
    room,
    teamId: 'leaf-team',
    curatorName: 'Leaf curators',
    actorIds: ['student-one', 'student-two'],
  };
  it('creates bounded parameterized records and starts with the class museum closed', () => {
    const statements = museumProvisioningStatements({ scope, rooms: [assignment] });
    expect(statements).toHaveLength(4);
    expect(statements[0].sql).toContain('VALUES (?, 0, 0)');
    expect(JSON.parse(statements[1].parameters[0] as string)).toEqual([
      'school',
      'science',
      'plant-structures',
      '1.0',
      'spring',
    ]);
  });
  it('rejects duplicate room or actor assignments before any database writes', () => {
    expect(() => museumProvisioningStatements({ scope, rooms: [assignment, assignment] })).toThrow(
      'INVALID_MUSEUM_ROSTER',
    );
    expect(() =>
      museumProvisioningStatements({
        scope,
        rooms: [
          assignment,
          { ...assignment, room: { ...room, roomId: 'room-b' }, teamId: 'other-team' },
        ],
      }),
    ).toThrow('INVALID_MUSEUM_ROSTER');
    expect(() =>
      museumProvisioningStatements({
        scope,
        rooms: [{ ...assignment, room: { ...room, layoutId: 'unknown-layout' } }],
      }),
    ).toThrow('INVALID_MUSEUM_ROSTER');
  });
});
