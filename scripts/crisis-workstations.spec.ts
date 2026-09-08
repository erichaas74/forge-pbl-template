import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { initialCrisisState } from '../src/app/templates/crisis-operations/domain/crisis-engine';
import { requireCrisisConfig } from '../src/app/templates/crisis-operations/domain/crisis-validation';
import { workstationReports } from '../src/app/templates/crisis-operations/domain/crisis-workstations';

const raw = JSON.parse(
  readFileSync(
    new URL('../public/projects/cascade-bay-crisis/project.json', import.meta.url),
    'utf8',
  ),
);
const config = requireCrisisConfig(raw);

describe('configurable crisis workstations', () => {
  it('accepts optional artwork surfaces and rejects unusable screen geometry', () => {
    const station = config.workstations![0];
    expect(Object.isFrozen(station.roomSurface!.screen[0])).toBe(true);
    const { roomSurface, ...legacy } = station;
    expect(
      requireCrisisConfig({ ...raw, workstations: [legacy] }).workstations![0].roomSurface,
    ).toBeUndefined();
    for (const surface of [
      null,
      { ...roomSurface, bounds: [0, 0, 0, 10] },
      { ...roomSurface, bounds: [95, 0, 20, 10] },
      { ...roomSurface, bounds: [0, 0, '20', 10] },
      {
        ...roomSurface,
        screen: [
          [1, 32],
          [80, 32],
          [80, 40],
          [1, 40],
        ],
      },
      {
        ...roomSurface,
        screen: [
          [1, 32],
          [10, 40],
          [10, 32],
          [1, 40],
        ],
      },
      {
        ...roomSurface,
        screen: [
          [1, 32],
          [1, 32],
          [10, 40],
          [1, 40],
        ],
      },
      {
        ...roomSurface,
        screen: [
          [1, 32],
          [10, 32],
          [10, 40],
        ],
      },
    ]) {
      expect(() =>
        requireCrisisConfig({ ...raw, workstations: [{ ...station, roomSurface: surface }] }),
      ).toThrow('INVALID_CRISIS_PACKAGE');
    }
  });
  it('validates optional conferences and freezes participant configuration', () => {
    const call = config.workstations![1].conference!;
    expect(Object.isFrozen(call.participants[0])).toBe(true);
    const station = {
      ...config.workstations![1],
      conference: { ...call, meetingUrl: 'https://example.com/meeting' },
    };
    expect(
      requireCrisisConfig({ ...raw, workstations: [station] }).workstations![0].conference!
        .meetingUrl,
    ).toBe('https://example.com/meeting');
    for (const meetingUrl of [
      'javascript:alert(1)',
      'http://example.com/call',
      'https://user:password@example.com/call',
      'not-a-url',
      42,
    ]) {
      expect(() =>
        requireCrisisConfig({
          ...raw,
          workstations: [{ ...station, conference: { ...call, meetingUrl } }],
        }),
      ).toThrow('INVALID_CRISIS_PACKAGE');
    }
  });
  it('rejects broken participant and source references', () => {
    const station = config.workstations![1],
      call = station.conference!,
      person = call.participants[0];
    for (const conference of [
      null,
      { ...call, participants: [] },
      { ...call, participants: [person, person] },
      { ...call, participants: [{ ...person, locationId: 'unknown' }] },
      { ...call, participants: [{ ...person, portrait: 'javascript:bad' }] },
      { ...call, participants: [{ ...person, evidenceIds: ['unknown'] }] },
    ]) {
      expect(() =>
        requireCrisisConfig({ ...raw, workstations: [{ ...station, conference }] }),
      ).toThrow('INVALID_CRISIS_PACKAGE');
    }
  });
  it('validates weather sequences against their released bulletin times', () => {
    const station = config.workstations![0],
      weather = station.weather!,
      frame = weather.frames[0];
    expect(Object.isFrozen(weather.frames[0])).toBe(true);
    for (const invalidWeather of [
      null,
      { ...weather, frames: [] },
      { ...weather, frames: [frame] },
      { ...weather, satelliteImage: '//external.example/image.png' },
      { ...weather, frames: [{ ...frame, minute: 500 }, ...weather.frames.slice(1)] },
      { ...weather, frames: [{ ...frame, intensity: 5 }, ...weather.frames.slice(1)] },
      { ...weather, frames: [frame, frame, ...weather.frames.slice(1)] },
    ]) {
      expect(() =>
        requireCrisisConfig({ ...raw, workstations: [{ ...station, weather: invalidWeather }] }),
      ).toThrow('INVALID_CRISIS_PACKAGE');
    }
  });
  it('rejects conflicting specialized experiences on a single desk', () => {
    expect(() =>
      requireCrisisConfig({
        ...raw,
        workstations: [
          { ...config.workstations![0], conference: config.workstations![1].conference },
        ],
      }),
    ).toThrow('INVALID_CRISIS_PACKAGE');
  });
  it('loads two immutable desks and keeps older packages compatible', () => {
    expect(config.workstations?.map((station) => station.side)).toEqual(['left', 'right']);
    expect(Object.isFrozen(config.workstations![0].roleIds)).toBe(true);
    const { workstations, ...legacy } = raw;
    expect(requireCrisisConfig(legacy).workstations).toBeUndefined();
    expect(requireCrisisConfig({ ...legacy, workstations: [] }).workstations).toEqual([]);
  });
  it('rejects malformed desks and unresolved specialties before rendering', () => {
    const station = config.workstations![0];
    for (const workstations of [
      null,
      {},
      [null],
      [station, station],
      [station, { ...station, id: 'other' }],
      [...config.workstations!, { ...station, id: 'third' }],
      [{ ...station, side: 'center' }],
      [{ ...station, name: ' ' }],
      [{ ...station, description: null }],
      [{ ...station, roleIds: [] }],
      [{ ...station, roleIds: ['unknown'] }],
      [{ ...station, roleIds: ['earth', 'earth'] }],
      [{ ...station, instrument: 'unknown' }],
    ])
      expect(() => requireCrisisConfig({ ...raw, workstations })).toThrow('INVALID_CRISIS_PACKAGE');
  });
  it('previews only released reports from the desk specialties without changing the operator', () => {
    const state = initialCrisisState(config);
    const before = JSON.stringify(state);
    const ids = workstationReports(config, state, config.workstations![0]).map(
      (report) => report.id,
    );
    expect(ids).toContain('gauge-01');
    expect(ids).toContain('elevation-01');
    expect(ids.filter((id) => id === 'field-01')).toHaveLength(1);
    expect(ids).not.toContain('resources-01');
    expect(ids).not.toContain('rain-02');
    expect(JSON.stringify(state)).toBe(before);
  });
  it('honors shared sources and conditional releases in desk previews', () => {
    const state = { ...initialCrisisState(config), stage: 2, sharedEvidenceIds: ['gauge-01'] };
    const reports = workstationReports(config, state, config.workstations![1]).map(
      (report) => report.id,
    );
    expect(reports).toContain('gauge-01');
    expect(reports).toContain('waiting-03');
    expect(reports).not.toContain('response-03');
  });
  it('accepts a different project with independently named and assigned desks', () => {
    const other = requireCrisisConfig({
      ...raw,
      projectId: 'orbital-incident',
      title: 'Orbital incident',
      workstations: [
        {
          id: 'comms',
          name: 'Communications',
          description: 'Review signals.',
          side: 'right',
          roleIds: ['command'],
          instrument: 'reports',
        },
        {
          id: 'systems',
          name: 'Life support',
          description: 'Review reserves.',
          side: 'left',
          roleIds: ['operations'],
          instrument: 'resources',
        },
      ],
    });
    expect(other.workstations![0].name).toBe('Communications');
    expect(
      workstationReports(other, initialCrisisState(other), other.workstations![1]).some(
        (report) => report.id === 'resources-01',
      ),
    ).toBe(true);
  });
});
