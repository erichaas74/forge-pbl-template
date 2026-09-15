import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ageOfExplorationJourneyConfig as config } from '../../../projects/age-of-exploration-journey/age-of-exploration-journey.config';
import { JOURNEY_REPLAY_CONFIG, JOURNEY_REPLAY_ENROLLMENT } from '../runtime/journey-replay.tokens';
import {
  JOURNEY_PATH_PERSISTENCE,
  MemoryJourneyPathPersistence,
} from '../persistence/journey-path.persistence';
import { JourneyPathWorkspaceComponent } from './journey-path-workspace.component';
import { JOURNEY_WORLD_LOADER } from './game/journey-world.tokens';
import type { JourneyWorldMount } from './game/journey-world.contracts';

// Angular's test bundle may evaluate the lazy chunk; rendering is exercised in a real browser.
vi.mock('phaser', () => ({ Scene: class {} }));

describe('branching journey workspace', () => {
  async function setup(session = 1) {
    const params = new BehaviorSubject(convertToParamMap({ lesson: String(session) }));
    const navigate = vi.fn().mockResolvedValue(true);
    await TestBed.configureTestingModule({
      imports: [JourneyPathWorkspaceComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { queryParamMap: params } },
        { provide: Router, useValue: { navigate } },
        { provide: JOURNEY_REPLAY_CONFIG, useValue: config },
        {
          provide: JOURNEY_REPLAY_ENROLLMENT,
          useValue: { tenantId: 'ui', classId: 'review', studentId: 'navigator', mode: 'demo' },
        },
        { provide: JOURNEY_PATH_PERSISTENCE, useValue: new MemoryJourneyPathPersistence() },
        {
          provide: JOURNEY_WORLD_LOADER,
          useValue: () =>
            Promise.resolve<JourneyWorldMount>((_parent, _node, _view, callbacks) => {
              callbacks.ready();
              return { destroy: () => undefined };
            }),
        },
      ],
    }).compileComponents();
    const fixture = TestBed.createComponent(JourneyPathWorkspaceComponent);
    fixture.detectChanges();
    return {
      fixture,
      component: fixture.componentInstance,
      params,
      navigate,
      element: fixture.nativeElement as HTMLElement,
    };
  }
  beforeAll(() => {
    Element.prototype.scrollIntoView ??= () => undefined;
    Element.prototype.scrollTo ??= () => undefined;
  });
  it('renders the correct main activity for every directly entered session without recording work', async () => {
    const { fixture, component, params, element } = await setup();
    for (let session = 1; session <= 8; session++) {
      params.next(convertToParamMap({ lesson: String(session) }));
      fixture.detectChanges();
      expect(
        element.querySelector(
          session % 2 ? 'app-living-journey-map' : 'app-journey-location-scene',
        ),
      ).not.toBeNull();
      expect(element.querySelector('.activity input,.activity textarea,.activity form')).toBeNull();
      expect(component.runtime.state().decisions).toHaveLength(0);
      expect(element.querySelector('.activity')?.getAttribute('data-session')).toBe(
        String(session),
      );
    }
  });
  it('places collapsible tasks directly before AI Tutor and keeps options in that area', async () => {
    const { element } = await setup(2);
    expect(
      [...element.querySelectorAll('.planning-column > details')].map((item) => item.className),
    ).toEqual(['weekly-tasks', 'tutor']);
    expect(element.querySelector('.activity .choice')).toBeNull();
    expect(element.querySelectorAll('.tutor .choice').length).toBeGreaterThan(1);
    expect(element.querySelector('.connection')?.textContent).toContain('AI not connected');
  });
  it('selects a route, enters that landing, and returns to its next map', async () => {
    const { component, fixture, element } = await setup();
    (element.querySelectorAll('.choice')[1] as HTMLButtonElement).click();
    fixture.detectChanges();
    (element.querySelector('.continue') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(component.node().id).toBe('cape-verde-arrival');
    expect(component.runtime.state().decisions).toHaveLength(1);
    (element.querySelector('.continue') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(component.node().id).toBe('cape-verde-chart');
  });
  it('shows all alternate scenes with isolated consequences and exits preview on shared navigation', async () => {
    const { component, fixture, params } = await setup();
    const original = structuredClone(component.runtime.state());
    for (const scene of config.experience!.nodes) {
      component.previewScene(scene.id);
      fixture.detectChanges();
      expect(component.node().id).toBe(scene.id);
    }
    component.previewScene('cape-verde-arrival');
    fixture.detectChanges();
    const event = component.node().events[0];
    component.choose(event.id, event.choices[0]);
    expect(component.resources()['knowledge']).toBe(18);
    component.next();
    fixture.detectChanges();
    expect(component.before().resources['knowledge']).toBe(18);
    expect(component.runtime.state()).toEqual(original);
    params.next(convertToParamMap({ lesson: '8' }));
    fixture.detectChanges();
    expect(component.previewing()).toBe(false);
    expect(component.session()).toBe(8);
  });
  it('changes the scene immediately from an event option and preserves its inspection', async () => {
    const { component, fixture, element } = await setup(4);
    const event = component.node().events[0];
    component.activeEventId.set(event.id);
    fixture.detectChanges();
    expect(component.currentChoices()).toHaveLength(0);
    (element.querySelector('.event-options .choice') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(component.currentChoices()[0].effect).toBe('repair');
    expect(element.querySelector('.object-marker.resolved')).not.toBeNull();
    expect(component.activeEventId()).toBe(event.id);
    expect(element.querySelector('.choice-result')?.textContent).toContain(
      'Canvas covers the tear',
    );
  });
});
