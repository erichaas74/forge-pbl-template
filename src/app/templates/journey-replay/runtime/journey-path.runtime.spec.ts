import { TestBed } from '@angular/core/testing';
import { ageOfExplorationJourneyConfig as config } from '../../../projects/age-of-exploration-journey/age-of-exploration-journey.config';
import { JOURNEY_REPLAY_CONFIG, JOURNEY_REPLAY_ENROLLMENT } from './journey-replay.tokens';
import { JourneyPathRuntime } from './journey-path.runtime';
import {
  JOURNEY_PATH_PERSISTENCE,
  MemoryJourneyPathPersistence,
} from '../persistence/journey-path.persistence';
import { emptyJourneyPath } from '../core/journey-path.engine';

describe('local journey practice persistence', () => {
  const scope = {
    tenantId: 'tenant',
    classId: 'class',
    studentId: 'one',
    projectId: config.projectId,
    projectVersion: config.projectVersion,
  };
  it('isolates records by tenant, class, student and project version', () => {
    const adapter = new MemoryJourneyPathPersistence();
    adapter.save(scope, emptyJourneyPath(config.projectVersion));
    expect(adapter.load(scope)).toBeDefined();
    for (const field of ['tenantId', 'classId', 'studentId', 'projectId', 'projectVersion'])
      expect(adapter.load({ ...scope, [field]: 'different' })).toBeUndefined();
  });
  function setup(persistence: { load: () => unknown; save: ReturnType<typeof vi.fn> }) {
    TestBed.configureTestingModule({
      providers: [
        JourneyPathRuntime,
        { provide: JOURNEY_REPLAY_CONFIG, useValue: config },
        { provide: JOURNEY_REPLAY_ENROLLMENT, useValue: scope },
        { provide: JOURNEY_PATH_PERSISTENCE, useValue: persistence },
      ],
    });
    return TestBed.inject(JourneyPathRuntime);
  }
  it('keeps an unreadable original intact when new choices are made', () => {
    const persistence = { load: () => ({ broken: true }), save: vi.fn() };
    const runtime = setup(persistence);
    runtime.choose('departure-chart', 'route', config.experience!.nodes[0].choices[0].id);
    runtime.retrySave();
    expect(persistence.save).not.toHaveBeenCalled();
    expect(runtime.state().decisions).toHaveLength(1);
    expect(runtime.saved()).toBe(false);
    expect(runtime.error()).toContain('left intact');
  });
  it('keeps unsaved choices in memory and retries without charging twice', () => {
    const persistence = {
      load: () => undefined,
      save: vi.fn().mockImplementationOnce(() => {
        throw new Error('quota');
      }),
    };
    const runtime = setup(persistence);
    expect(
      runtime.choose('departure-chart', 'route', config.experience!.nodes[0].choices[0].id),
    ).toBe(true);
    expect(runtime.saved()).toBe(false);
    runtime.retrySave();
    expect(runtime.saved()).toBe(true);
    expect(runtime.state().decisions).toHaveLength(1);
    expect(runtime.state().revision).toBe(1);
  });
});
