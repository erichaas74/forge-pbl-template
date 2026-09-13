import { TestBed } from '@angular/core/testing';
import { studentMuseumConfig as config } from '../../../projects/class-exhibit-hall/student-museum.config';
import { createLocalPreviewSession } from '../../../core/context/project-session-context';
import { ExhibitHallRuntimeService } from '../runtime/exhibit-hall-runtime.service';
import {
  EXHIBIT_HALL_CONFIG,
  EXHIBIT_HALL_PERSISTENCE,
  EXHIBIT_HALL_SESSION_CONTEXT,
} from '../runtime/exhibit-hall.tokens';
import { MemoryExhibitPersistenceAdapter } from '../persistence/exhibit-persistence';
import type { ExhibitProjectConfig, MuseumBoardSnapshotData } from '../domain/exhibit-types';

describe('student room draft and submission', () => {
  const persistence = new MemoryExhibitPersistenceAdapter();
  function setup(project: ExhibitProjectConfig = config, official = false) {
    TestBed.configureTestingModule({
      providers: [
        ExhibitHallRuntimeService,
        { provide: EXHIBIT_HALL_CONFIG, useValue: project },
        { provide: EXHIBIT_HALL_PERSISTENCE, useValue: persistence },
        {
          provide: EXHIBIT_HALL_SESSION_CONTEXT,
          useValue: createLocalPreviewSession(project.projectId, project.projectVersion, {
            authorityMode: official ? 'serverAuthoritative' : 'localDemo',
          }),
        },
      ],
    });
    return TestBed.inject(ExhibitHallRuntimeService);
  }
  function finish(runtime: ExhibitHallRuntimeService): void {
    runtime.updateBoardTitle('A face of power');
    runtime.updateBoardClaim('Royal portraits communicate identity through form.');
    runtime.placeRoomObject('display-1', 'nefertiti');
    runtime.updateObject(
      'nefertiti',
      'description',
      'Look at the tall crown and the carefully shaped face.',
    );
    runtime.updateObject(
      'nefertiti',
      'evidenceConnection',
      'The portrait presents an intentional image of royal identity.',
    );
  }
  beforeEach(() => {
    persistence.clear(config.projectId, config.projectVersion);
  });
  afterEach(() => {
    vi.restoreAllMocks();
    TestBed.resetTestingModule();
  });
  it('starts with only the assigned empty room and leaves classmates’ snapshots intact while editing', () => {
    const runtime = setup();
    const before = structuredClone(runtime.state().snapshots);
    expect(runtime.composerDraft().museumRoom?.roomId).toBe('alcove-01');
    expect(runtime.composerDraft().objects).toEqual([]);
    expect(runtime.roomSubmitted()).toBe(false);
    expect(runtime.state().snapshots).toHaveLength(3);
    finish(runtime);
    expect(runtime.state().snapshots).toEqual(before);
    expect(runtime.composerDraft().objects).toHaveLength(1);
  });
  it('restores the room contents after leaving and reloading', () => {
    let runtime = setup();
    finish(runtime);
    TestBed.resetTestingModule();
    runtime = setup();
    expect(runtime.composerDraft().title).toBe('A face of power');
    expect(runtime.composerDraft().museumRoom?.placements).toEqual([
      { slotId: 'display-1', objectId: 'nefertiti' },
    ]);
    expect(runtime.roomSubmitted()).toBe(false);
  });
  it('publishes once to the assigned location, freezes the submitted contents, and restores the result', () => {
    let runtime = setup();
    finish(runtime);
    expect(runtime.roomValidation().valid).toBe(true);
    expect(runtime.submitMuseumRoom()).toBe(true);
    const published = runtime
      .state()
      .snapshots.find((snapshot) => snapshot.artifactId === 'artifact-team-atlas')!;
    expect((published.visitorSafeData as MuseumBoardSnapshotData).museumRoom?.roomId).toBe(
      'alcove-01',
    );
    expect(
      runtime.state().hangings.find((item) => item.artifactId === 'artifact-team-atlas')
        ?.locationId,
    ).toBe('alcove-01');
    const original = structuredClone(published);
    runtime.updateBoardTitle('Changed');
    runtime.placeRoomObject('display-2', 'coffin');
    expect(runtime.composerDraft().title).toBe('A face of power');
    expect(runtime.submitMuseumRoom()).toBe(false);
    expect(runtime.state().snapshots).toHaveLength(4);
    expect(runtime.state().lmsEvents).toHaveLength(1);
    expect(published).toEqual(original);
    TestBed.resetTestingModule();
    runtime = setup();
    expect(runtime.roomSubmitted()).toBe(true);
    expect(runtime.canEditRoom()).toBe(false);
  });
  it('does not render a recovered draft assigned to another room', () => {
    const runtime = setup();
    finish(runtime);
    TestBed.resetTestingModule(); // Destroy the runtime to flush its debounced save before corrupting the recovered fixture.
    const saved = persistence.load(config.projectId, config.projectVersion)!;
    persistence.save(config.projectId, config.projectVersion, {
      ...saved,
      composerDraft: {
        ...saved.composerDraft!,
        museumRoom: { ...saved.composerDraft!.museumRoom!, roomId: 'alcove-02' },
      },
    });
    TestBed.resetTestingModule();
    const restored = setup();
    expect(restored.composerDraft().museumRoom?.roomId).toBe('alcove-01');
    expect(restored.composerDraft().objects).toEqual([]);
  });
  it('leaves invalid, locked, and foreign-room drafts unpublished', () => {
    const runtime = setup();
    expect(runtime.submitMuseumRoom()).toBe(false);
    finish(runtime);
    runtime.composerDraft.update((board) => ({
      ...board,
      museumRoom: { ...board.museumRoom!, roomId: 'alcove-02' },
    }));
    expect(runtime.submitMuseumRoom()).toBe(false);
    expect(runtime.roomSubmitted()).toBe(false);
    runtime.composerDraft.update((board) => ({
      ...board,
      museumRoom: { ...board.museumRoom!, roomId: 'alcove-01' },
    }));
    runtime.state.update((state) => ({
      ...state,
      hall: { ...state.hall, controls: { ...state.hall.controls, submissionLocked: true } },
    }));
    expect(runtime.submitMuseumRoom()).toBe(false);
    expect(runtime.canEditRoom()).toBe(false);
  });
  it('does not mark a room submitted when saving fails and allows a retry', () => {
    const runtime = setup();
    finish(runtime);
    const spy = vi.spyOn(persistence, 'save').mockImplementation(() => {
      throw new Error('Disk full');
    });
    expect(runtime.submitMuseumRoom()).toBe(false);
    expect(runtime.roomSubmitted()).toBe(false);
    expect(runtime.saveState()).toBe('save_failed');
    expect(runtime.state().lmsEvents).toHaveLength(0);
    spy.mockRestore();
    expect(runtime.submitMuseumRoom()).toBe(true);
  });
  it('does not claim official server submission through the local adapter', () => {
    const runtime = setup(config, true);
    finish(runtime);
    expect(runtime.submitMuseumRoom()).toBe(false);
    expect(runtime.error()).toContain('publishing connection');
    expect(runtime.roomSubmitted()).toBe(false);
  });
  it('does not offer a room when the assignment is missing', () => {
    const runtime = setup({ ...config, viewer: { ...config.viewer, teamId: 'not-assigned' } });
    expect(runtime.assignedRoom()).toBeUndefined();
    expect(runtime.canEditRoom()).toBe(false);
    runtime.placeRoomObject('display-1', 'nefertiti');
    expect(runtime.composerDraft().objects).toEqual([]);
  });
});
