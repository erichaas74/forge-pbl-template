import { TestBed } from '@angular/core/testing';
import { classExhibitHallConfig as config } from '../../../projects/class-exhibit-hall/class-exhibit-hall.config';
import { MemoryExhibitPersistenceAdapter } from '../persistence/exhibit-persistence';
import { ExhibitHallRuntimeService } from './exhibit-hall-runtime.service';
import { EXHIBIT_HALL_CONFIG, EXHIBIT_HALL_PERSISTENCE } from './exhibit-hall.tokens';

describe('Museum learner drafts', () => {
  const persistence = new MemoryExhibitPersistenceAdapter();
  function setup() {
    TestBed.configureTestingModule({
      providers: [
        ExhibitHallRuntimeService,
        { provide: EXHIBIT_HALL_CONFIG, useValue: config },
        { provide: EXHIBIT_HALL_PERSISTENCE, useValue: persistence },
      ],
    });
    return TestBed.inject(ExhibitHallRuntimeService);
  }
  beforeEach(() => persistence.clear(config.projectId, config.projectVersion));
  afterEach(() => TestBed.resetTestingModule());

  it('starts an authored draft without changing example objects or published snapshots', () => {
    const runtime = setup();
    const snapshots = structuredClone(runtime.state().snapshots);
    const example = structuredClone(runtime.composerDraft());
    expect(runtime.usingStarter()).toBe(true);
    runtime.startOwnDraft();
    expect(runtime.usingStarter()).toBe(false);
    expect(runtime.composerDraft().centralClaim).toBe('');
    expect(runtime.composerDraft().objects.map((object) => object.id)).toEqual(
      example.objects.map((object) => object.id),
    );
    expect(
      runtime
        .composerDraft()
        .objects.every((object) => !object.description && !object.evidenceConnection),
    ).toBe(true);
    expect(runtime.state().snapshots).toEqual(snapshots);
    expect(config.seedBoards.find((board) => board.teamId === config.viewer.teamId)?.data).toEqual(
      example,
    );
  });

  it('flushes on exit and restores the private draft, without restarting over authored work', () => {
    const runtime = setup();
    runtime.startOwnDraft();
    runtime.updateBoardTitle('Tools tell a story');
    runtime.updateBoardClaim('Materials reveal choices made by craftspeople.');
    TestBed.resetTestingModule();
    const restored = setup();
    expect(restored.composerDraft().title).toBe('Tools tell a story');
    expect(restored.composerDraft().centralClaim).toContain('craftspeople');
    expect(restored.usingStarter()).toBe(false);
    restored.startOwnDraft();
    expect(restored.composerDraft().title).toBe('Tools tell a story');
  });
});
