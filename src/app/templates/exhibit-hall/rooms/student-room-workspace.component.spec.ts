import { TestBed } from '@angular/core/testing';
import { studentMuseumConfig as config } from '../../../projects/class-exhibit-hall/student-museum.config';
import { createExhibitSample } from '../../../projects/completed-samples/exhibit.sample-data';
import { ExhibitHallPageComponent } from '../ui/exhibit-hall-page.component';
import { ExhibitHallRuntimeService } from '../runtime/exhibit-hall-runtime.service';
import { EXHIBIT_HALL_CONFIG, EXHIBIT_HALL_PERSISTENCE } from '../runtime/exhibit-hall.tokens';
import { MemoryExhibitPersistenceAdapter } from '../persistence/exhibit-persistence';
import { LOAD_MUSEUM_SCENE, MuseumSceneComponent } from './museum-scene.component';
import { MuseumWalkthroughComponent } from './museum-walkthrough.component';
import type {
  MuseumSceneContent,
  MuseumSceneFactory,
  MuseumScenePort,
} from './museum-scene-contracts';

describe('assigned student room UI', () => {
  const received: MuseumSceneContent[] = [];
  const disposed = vi.fn();
  const factory: MuseumSceneFactory = () => ({
    update: (content) => received.push(content),
    focusDisplay: vi.fn(),
    dispose: disposed,
  });
  beforeEach(() => {
    received.length = 0;
    disposed.mockClear();
  });
  afterEach(() => TestBed.resetTestingModule());
  it('creates only the assigned room, exposes fixed display controls, and preserves additions during preview', async () => {
    await TestBed.configureTestingModule({
      imports: [ExhibitHallPageComponent],
      providers: [
        ExhibitHallRuntimeService,
        { provide: EXHIBIT_HALL_CONFIG, useValue: config },
        { provide: EXHIBIT_HALL_PERSISTENCE, useValue: new MemoryExhibitPersistenceAdapter() },
        { provide: LOAD_MUSEUM_SCENE, useValue: async () => factory },
      ],
    }).compileComponents();
    const fixture = TestBed.createComponent(ExhibitHallPageComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    const click = (text: string) => {
      const button = [...element.querySelectorAll('button')].find((item) =>
        item.textContent?.includes(text),
      );
      expect(button).toBeDefined();
      button!.click();
      fixture.detectChanges();
    };
    expect(element.querySelectorAll('app-museum-scene')).toHaveLength(1);
    expect(element.querySelector('app-hall-corridor')).toBeNull();
    expect(element.querySelector('app-artifact-composer')).toBeNull();
    expect(element.querySelector('iframe')).toBeNull();
    expect(
      received.every(
        (content) => content.kind === 'room' && content.board.museumRoom?.roomId === 'alcove-01',
      ),
    ).toBe(true);
    expect(element.textContent).not.toMatch(/choose.*layout|wall color|MetaSteps/i);
    click('Display 1');
    click('Nefertiti');
    expect(element.querySelector<HTMLInputElement>('#artifact-title')?.value).toBe(
      'Nefertiti’s bust',
    );
    const input = element.querySelector<HTMLTextAreaElement>('#artifact-label')!;
    input.value = 'A royal portrait with a tall crown.';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    click('Preview as a visitor');
    expect(element.querySelector('textarea')).toBeNull();
    expect(element.textContent).toContain('A royal portrait with a tall crown.');
    click('Keep curating');
    expect(element.querySelector<HTMLTextAreaElement>('#artifact-label')?.value).toBe(
      'A royal portrait with a tall crown.',
    );
    click('Remove from display');
    expect(TestBed.inject(ExhibitHallRuntimeService).composerDraft().objects).toEqual([]);
    expect(element.querySelectorAll('app-museum-scene')).toHaveLength(1);
    fixture.destroy();
    expect(disposed).toHaveBeenCalledTimes(1);
  });
  it('includes only submitted rooms in the visitor directory and disposes the previous scene on entry', async () => {
    await TestBed.configureTestingModule({
      imports: [MuseumWalkthroughComponent],
      providers: [{ provide: LOAD_MUSEUM_SCENE, useValue: async () => factory }],
    }).compileComponents();
    const fixture = TestBed.createComponent(MuseumWalkthroughComponent);
    const locations = createExhibitSample();
    fixture.componentRef.setInput('locations', [
      ...locations.slice(0, 2),
      { ...locations[2], hanging: undefined, snapshot: undefined },
    ]);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(fixture.componentInstance.rooms()).toHaveLength(2);
    expect(received.at(-1)?.kind).toBe('lobby');
    fixture.componentInstance.enter(locations[0].locationId);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(disposed).toHaveBeenCalledTimes(1);
    expect(fixture.nativeElement.querySelectorAll('app-museum-scene')).toHaveLength(1);
    const content = received.at(-1)!;
    expect(content.kind).toBe('room');
    if (content.kind === 'room')
      expect(content.board.museumRoom?.roomId).toBe(locations[0].locationId);
    const firstDisplay = fixture.nativeElement.querySelector(
      'app-museum-room-presentation nav button:nth-child(2)',
    ) as HTMLButtonElement;
    firstDisplay.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('.artifact-label')).not.toBeNull();
    fixture.componentInstance.nextRoom();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('.artifact-label')).toBeNull();
    const next = received.at(-1)!;
    if (next.kind === 'room') expect(next.board.museumRoom?.roomId).toBe(locations[1].locationId);
    fixture.componentInstance.enter(locations[2].locationId);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(fixture.componentInstance.activeRoom()).toBeUndefined();
    expect(received.at(-1)?.kind).toBe('lobby');
  });
  it('does not fall back to sample rooms when the shared collection is empty', async () => {
    await TestBed.configureTestingModule({
      imports: [MuseumWalkthroughComponent],
      providers: [{ provide: LOAD_MUSEUM_SCENE, useValue: async () => factory }],
    }).compileComponents();
    const fixture = TestBed.createComponent(MuseumWalkthroughComponent);
    fixture.componentRef.setInput('locations', createExhibitSample());
    fixture.componentRef.setInput('publishedRooms', []);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(fixture.componentInstance.rooms()).toEqual([]);
    expect(fixture.nativeElement.textContent).toContain('0 SUBMITTED ROOMS');
    expect(fixture.nativeElement.querySelectorAll('app-museum-scene')).toHaveLength(1);
  });
  it('does not create a late-arriving renderer after the student leaves', async () => {
    let release!: (value: MuseumSceneFactory) => void;
    const load = new Promise<MuseumSceneFactory>((resolve) => {
      release = resolve;
    });
    const create = vi.fn<MuseumSceneFactory>((): MuseumScenePort => ({
      update: vi.fn(),
      focusDisplay: vi.fn(),
      dispose: vi.fn(),
    }));
    await TestBed.configureTestingModule({
      imports: [MuseumSceneComponent],
      providers: [{ provide: LOAD_MUSEUM_SCENE, useValue: () => load }],
    }).compileComponents();
    const fixture = TestBed.createComponent(MuseumSceneComponent);
    fixture.componentRef.setInput('content', { kind: 'lobby', doors: [] });
    fixture.detectChanges();
    fixture.destroy();
    release(create);
    await load;
    await Promise.resolve();
    expect(create).not.toHaveBeenCalled();
  });
});
