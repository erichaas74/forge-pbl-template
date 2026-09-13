import { TestBed } from '@angular/core/testing';
import { createLocalPreviewSession } from '../../../core/context/project-session-context';
import { studentMuseumConfig as config } from '../../../projects/class-exhibit-hall/student-museum.config';
import { ExhibitHallRuntimeService } from '../runtime/exhibit-hall-runtime.service';
import {
  EXHIBIT_HALL_CONFIG,
  EXHIBIT_HALL_PERSISTENCE,
  EXHIBIT_HALL_SESSION_CONTEXT,
  MUSEUM_PUBLICATION,
} from '../runtime/exhibit-hall.tokens';
import { MemoryExhibitPersistenceAdapter } from '../persistence/exhibit-persistence';
import { MuseumPublicationService } from './museum-publication.service';
import type { MuseumPublicationSession, PublishedMuseumRoom } from './museum-publication';
import { StudentRoomWorkspaceComponent } from './student-room-workspace.component';
import { LOAD_MUSEUM_SCENE } from './museum-scene.component';

describe('shared museum publication coordinator', () => {
  const host = createLocalPreviewSession(config.projectId, config.projectVersion, {
    authorityMode: 'serverAuthoritative',
    teamId: config.viewer.teamId,
  });
  const scope = {
    tenantId: host.tenantId,
    classId: host.classId!,
    projectId: config.projectId,
    projectVersion: config.projectVersion,
    museumId: config.projectInstanceId,
  };
  const session: MuseumPublicationSession = {
    scope,
    actorId: host.actorId,
    teamId: config.viewer.teamId,
    room: config.museum!.rooms[0],
    submissionLocked: false,
  };
  let storage: MemoryExhibitPersistenceAdapter;
  let adapter: {
    openSession: ReturnType<typeof vi.fn>;
    publish: ReturnType<typeof vi.fn>;
    loadCollection: ReturnType<typeof vi.fn>;
  };
  beforeEach(() => {
    storage = new MemoryExhibitPersistenceAdapter();
    adapter = {
      openSession: vi.fn().mockResolvedValue(session),
      publish: vi.fn(),
      loadCollection: vi.fn().mockResolvedValue([]),
    };
    TestBed.configureTestingModule({
      providers: [
        ExhibitHallRuntimeService,
        MuseumPublicationService,
        { provide: EXHIBIT_HALL_CONFIG, useValue: config },
        { provide: EXHIBIT_HALL_SESSION_CONTEXT, useValue: host },
        { provide: EXHIBIT_HALL_PERSISTENCE, useValue: storage },
        { provide: MUSEUM_PUBLICATION, useValue: adapter },
        {
          provide: LOAD_MUSEUM_SCENE,
          useValue: async () => () => ({
            update: vi.fn(),
            focusDisplay: vi.fn(),
            dispose: vi.fn(),
          }),
        },
      ],
    });
  });
  afterEach(() => {
    TestBed.resetTestingModule();
    vi.restoreAllMocks();
  });
  async function setup() {
    const runtime = TestBed.inject(ExhibitHallRuntimeService),
      publication = TestBed.inject(MuseumPublicationService);
    await vi.waitFor(() => expect(publication.ready()).toBe(true));
    return { runtime, publication };
  }
  function finish(runtime: ExhibitHallRuntimeService): PublishedMuseumRoom {
    runtime.updateBoardTitle('Objects and royal identity');
    runtime.updateBoardClaim('Look closely at how this portrait presents identity.');
    runtime.placeRoomObject('display-1', 'nefertiti');
    runtime.updateObject(
      'nefertiti',
      'description',
      'Look at the tall crown and carefully shaped face.',
    );
    runtime.updateObject(
      'nefertiti',
      'evidenceConnection',
      'The portrait invites questions about how royal identity was represented.',
    );
    return {
      id: 'published-one',
      room: session.room,
      position: 0,
      teamId: session.teamId,
      submittedAt: '2026-09-13T12:00:00.000Z',
      board: structuredClone(runtime.composerDraft()),
    };
  }
  it('does not treat local snapshots as an official submission or fetch the class while editing', async () => {
    const { runtime, publication } = await setup();
    expect(runtime.roomSubmitted()).toBe(false);
    expect(runtime.canEditRoom()).toBe(true);
    expect(adapter.loadCollection).not.toHaveBeenCalled();
    expect(publication.collection()).toEqual([]);
  });
  it('freezes edits while submitting and accepts the server receipt once', async () => {
    const { runtime, publication } = await setup();
    const published = finish(runtime);
    let resolve!: (value: MuseumPublicationSession) => void;
    adapter.openSession.mockImplementationOnce(
      () =>
        new Promise<MuseumPublicationSession>((done) => {
          resolve = done;
        }),
    );
    adapter.publish.mockResolvedValue(published);
    const first = publication.submit();
    runtime.updateBoardTitle('Unexpected edit');
    expect(runtime.composerDraft().title).toBe(published.board.title);
    expect(await publication.submit()).toBe(false);
    resolve(session);
    expect(await first).toBe(true);
    expect(runtime.roomSubmitted()).toBe(true);
    expect(runtime.canEditRoom()).toBe(false);
    expect(adapter.publish).toHaveBeenCalledTimes(1);
    expect(adapter.publish.mock.calls[0][0].content).not.toHaveProperty('sources');
    expect(runtime.state().lmsEvents).toHaveLength(0); // No pretend gradebook delivery from the browser.
  });
  it('keeps a failed publication as a draft and recovers a lost acknowledgment before retrying', async () => {
    const { runtime, publication } = await setup();
    const published = finish(runtime);
    adapter.publish.mockRejectedValue(new TypeError('Connection lost after commit'));
    expect(await publication.submit()).toBe(false);
    expect(runtime.roomSubmitted()).toBe(false);
    expect(runtime.canEditRoom()).toBe(true);
    expect(publication.error()).toContain('could not be reached');
    adapter.openSession.mockResolvedValue({ ...session, publishedRoom: published });
    expect(await publication.submit()).toBe(true);
    expect(adapter.publish).toHaveBeenCalledTimes(1);
    expect(runtime.composerDraft()).toEqual(published.board);
  });
  it('keeps confirmed submission read-only even when the local cache fails', async () => {
    const { runtime, publication } = await setup();
    adapter.publish.mockResolvedValue(finish(runtime));
    vi.spyOn(storage, 'save').mockImplementation(() => {
      throw new Error('Device full');
    });
    expect(await publication.submit()).toBe(true);
    expect(runtime.roomSubmitted()).toBe(true);
    expect(runtime.canEditRoom()).toBe(false);
    expect(runtime.saveState()).toBe('save_failed');
  });
  it('restores a submitted room from the server on another session', async () => {
    const { runtime } = await setup();
    const published = finish(runtime);
    adapter.openSession.mockResolvedValue({ ...session, publishedRoom: published });
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        ExhibitHallRuntimeService,
        MuseumPublicationService,
        { provide: EXHIBIT_HALL_CONFIG, useValue: config },
        { provide: EXHIBIT_HALL_SESSION_CONTEXT, useValue: host },
        { provide: EXHIBIT_HALL_PERSISTENCE, useValue: new MemoryExhibitPersistenceAdapter() },
        { provide: MUSEUM_PUBLICATION, useValue: adapter },
      ],
    });
    const restored = await setup();
    expect(restored.runtime.roomSubmitted()).toBe(true);
    expect(restored.runtime.composerDraft()).toEqual(published.board);
  });
  it('rejects a session for another actor before displaying a room', async () => {
    adapter.openSession.mockResolvedValue({ ...session, actorId: 'somebody-else' });
    const fixture = TestBed.createComponent(StudentRoomWorkspaceComponent);
    fixture.detectChanges();
    await vi.waitFor(() => expect(fixture.componentInstance.publication.status()).toBe('error'));
    fixture.detectChanges();
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('app-museum-scene')).toBeNull();
    expect(fixture.nativeElement.textContent).toContain('Reconnect to my room');
    expect(TestBed.inject(ExhibitHallRuntimeService).canEditRoom()).toBe(false);
  });
  it('loads only published collection data on demand and retains the last collection after an error', async () => {
    const { runtime, publication } = await setup();
    const published = finish(runtime);
    adapter.loadCollection.mockResolvedValue([published]);
    await publication.refreshCollection();
    expect(publication.collection()).toEqual([published]);
    adapter.loadCollection.mockRejectedValue(new TypeError('Offline'));
    await publication.refreshCollection();
    expect(publication.collection()).toEqual([published]);
    expect(publication.collectionError()).toBeDefined();
  });
  it('ignores a session response that arrives after the student leaves', async () => {
    let resolve!: (value: MuseumPublicationSession) => void;
    adapter.openSession.mockImplementationOnce(
      () =>
        new Promise<MuseumPublicationSession>((done) => {
          resolve = done;
        }),
    );
    const publication = TestBed.inject(MuseumPublicationService);
    TestBed.resetTestingModule();
    resolve(session);
    await Promise.resolve();
    await Promise.resolve();
    expect(publication.ready()).toBe(false);
    expect(adapter.publish).not.toHaveBeenCalled();
  });
  it('does not focus a destroyed student workspace when publication finishes late', async () => {
    const fixture = TestBed.createComponent(StudentRoomWorkspaceComponent);
    fixture.detectChanges();
    await vi.waitFor(() => expect(fixture.componentInstance.publication.ready()).toBe(true));
    let resolve!: (value: boolean) => void;
    vi.spyOn(fixture.componentInstance.publication, 'submit').mockImplementation(
      () =>
        new Promise<boolean>((done) => {
          resolve = done;
        }),
    );
    const pending = fixture.componentInstance.submit();
    fixture.destroy();
    resolve(false);
    await expect(pending).resolves.toBeUndefined();
  });
});
