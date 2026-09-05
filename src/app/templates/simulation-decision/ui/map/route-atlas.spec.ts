import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { frontierTradingConfig as frontierTradingProjectConfig } from '../../../../projects/frontier-trading/frontier-trading.config';
import { SimulationDecisionRuntimeService } from '../../runtime/simulation-decision-runtime.service';
import { MemorySimulationDecisionPersistenceAdapter } from '../../runtime/simulation-decision.persistence';
import {
  SIMULATION_DECISION_CONFIG,
  SIMULATION_DECISION_PERSISTENCE,
} from '../../runtime/simulation-decision.tokens';
import { SimulationRouteMapComponent } from '../pages/route-map.component';
import { RouteAtlasComponent } from './route-atlas.component';
import { FULL_MAP, boundedMapView, fitMapBounds, mapViewBox } from './map-viewport';

const frontierTradingConfig = {
  ...frontierTradingProjectConfig,
  choiceProgression: undefined,
  routeForecastChallenge: undefined,
};

describe('route atlas navigation', () => {
  let runtime: SimulationDecisionRuntimeService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SimulationRouteMapComponent],
      providers: [
        SimulationDecisionRuntimeService,
        { provide: SIMULATION_DECISION_CONFIG, useValue: frontierTradingConfig },
        {
          provide: SIMULATION_DECISION_PERSISTENCE,
          useFactory: () => new MemorySimulationDecisionPersistenceAdapter(),
        },
      ],
    });
    runtime = TestBed.inject(SimulationDecisionRuntimeService);
    runtime.startCompany('Map explorers', 'compass', 'prairie-wagon');
  });
  function setup() {
    const fixture = TestBed.createComponent(SimulationRouteMapComponent);
    fixture.detectChanges();
    const atlas = fixture.debugElement.query(By.directive(RouteAtlasComponent))
      .componentInstance as RouteAtlasComponent;
    const element: HTMLElement = fixture.nativeElement;
    return { fixture, atlas, element, route: fixture.componentInstance };
  }

  it('zooms and pans with the keyboard without changing official simulation state', () => {
    const { fixture, atlas, element } = setup();
    const state = runtime.state();
    const canvas = element.querySelector('svg')!;
    canvas.dispatchEvent(new KeyboardEvent('keydown', { key: '+', bubbles: true }));
    fixture.detectChanges();
    expect(atlas.view().zoom).toBe(1.25);
    canvas.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    expect(atlas.view().x).toBeGreaterThan(50);
    canvas.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
    fixture.detectChanges();
    expect(canvas.getAttribute('viewBox')).toBe('0 0 100 80');
    expect(runtime.state()).toBe(state);
  });

  it('lets the keyboard inspect an incompatible destination without enabling departure', () => {
    const { fixture, element, route } = setup();
    const marker = element.querySelector('[data-map-stop][aria-label^="South Pass Camp"]')!;
    marker.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    fixture.detectChanges();
    expect(route.selectedRouteId()).toBe('route-south-pass');
    expect(route.plannerOpen()).toBe(true);
    expect(marker.getAttribute('aria-pressed')).toBe('true');
    expect(route.canDepart()).toBe(false);
    expect(element.querySelector('.trip-card')?.textContent).toContain('cannot use this terrain');
    expect(element.querySelector('.trip-card')?.hasAttribute('inert')).toBe(false);
    expect(element.querySelectorAll('.checkpoint')).toHaveLength(
      route.selectedRoute()!.estimatedDays - 1,
    );
    route.closePlanner();
    fixture.detectChanges();
    expect(element.querySelector('.trip-card')?.hasAttribute('inert')).toBe(true);
    expect(runtime.state().routeHistory).toHaveLength(0);
  });

  it('reveals a destination reached by keyboard focus outside the zoomed viewport', () => {
    const { atlas, element } = setup();
    atlas.view.set(boundedMapView({ x: 20, y: 55, zoom: 3 }));
    const destination = frontierTradingConfig.locations.find(
      (location) => location.id === 'miners-camp',
    )!;
    element
      .querySelector('[data-map-stop][aria-label^="Miner"]')!
      .dispatchEvent(new FocusEvent('focus'));
    const view = atlas.view();
    expect(destination.mapX).toBeGreaterThanOrEqual(view.x - 50 / view.zoom);
    expect(destination.mapX).toBeLessThanOrEqual(view.x + 50 / view.zoom);
    expect(destination.mapY).toBeGreaterThanOrEqual(view.y - 40 / view.zoom);
    expect(destination.mapY).toBeLessThanOrEqual(view.y + 40 / view.zoom);
  });

  it('keeps scenery and motion switches separate from game progress', () => {
    const { fixture, element } = setup();
    const before = runtime.state();
    const buttons = Array.from(element.querySelectorAll('button'));
    buttons.find((button) => button.textContent?.trim() === 'Scenery')!.click();
    buttons.find((button) => button.textContent?.trim() === 'Motion on')!.click();
    fixture.detectChanges();
    expect(element.querySelector('.landscape')?.classList.contains('hidden')).toBe(true);
    expect(element.querySelector('.atlas')?.classList.contains('still')).toBe(true);
    expect(runtime.state()).toBe(before);
  });

  it('shows the departure point and only the committed trail as active during travel', () => {
    runtime.commitRoute('route-northern', 'The lower supply cost keeps cash available.');
    const { atlas, route, element } = setup();
    expect(atlas.label(frontierTradingConfig.locations[0]!)).toBe('Departure');
    expect(route.mapTravel()?.progress).toBe(0);
    expect(route.atlasTrails().find((trail) => trail.route.id === 'route-northern')?.state).toBe(
      'traveling',
    );
    expect(route.atlasTrails().filter((trail) => trail.state === 'available')).toHaveLength(0);
    expect(element.querySelector('.trip-card')?.textContent).toContain(
      '0 of 3 travel days completed',
    );
  });

  it('can save arrival evidence after saving a departure snapshot', () => {
    runtime.commitRoute('route-northern', 'The lower supply cost keeps cash available.');
    const { route } = setup();
    route.pinHistory(route.journeyHistory()[0]!);
    runtime.state.update((state) => ({
      ...state,
      activeTravel: undefined,
      currentLocationId: 'fort-bridger',
      currentDay: 4,
      routeHistory: state.routeHistory.map((entry) => ({ ...entry, dayArrived: 4 })),
    }));
    route.pinHistory(route.journeyHistory()[0]!);
    const snapshots = runtime
      .state()
      .evidence.filter((item) => item.id.startsWith('evidence-journey-'));
    expect(snapshots).toHaveLength(2);
    expect(snapshots[0]?.summary).toContain('still traveling');
    expect(snapshots[1]?.summary).toContain('arrived day 4');
  });

  it('shows completed history from its departure snapshot and pins that evidence only once', () => {
    runtime.commitRoute('route-northern', 'The lower supply cost keeps cash available.');
    runtime.state.update((state) => ({
      ...state,
      activeTravel: undefined,
      currentLocationId: 'fort-bridger',
      currentDay: 5,
      routeHistory: state.routeHistory.map((entry) => ({
        ...entry,
        dayArrived: 5,
        knownInfoSnapshot: { ...entry.knownInfoSnapshot, supplyCostCents: 999 },
      })),
    }));
    const { fixture, route, element } = setup();
    route.selectRoute('route-northern');
    fixture.detectChanges();
    expect(route.historyOpen()).toBe(true);
    expect(route.atlasTrails().find((trail) => trail.route.id === 'route-northern')?.state).toBe(
      'completed',
    );
    expect(element.querySelector('.journey-record')?.textContent).toContain('$9.99');
    expect(element.querySelector('.journey-record')?.textContent).toContain('4 days');
    const entry = route.journeyHistory()[0]!;
    route.pinHistory(entry);
    route.pinHistory(entry);
    expect(
      runtime.state().evidence.filter((item) => item.id === route.historyEvidenceId(entry)),
    ).toHaveLength(1);
    expect(runtime.state().evidence.at(-1)?.summary).toContain('$9.99');
  });
});

describe('map bounds', () => {
  it('keeps the view inside the illustrated world at zoom limits and extreme pan positions', () => {
    for (const zoom of [0.1, 1, 1.5, 3, 99]) {
      for (const edge of [-1000, 1000]) {
        const view = boundedMapView({ x: edge, y: edge, zoom });
        expect(view.zoom).toBeGreaterThanOrEqual(1);
        expect(view.zoom).toBeLessThanOrEqual(3);
        expect(view.x - 50 / view.zoom).toBeGreaterThanOrEqual(-0.00001);
        expect(view.x + 50 / view.zoom).toBeLessThanOrEqual(100.00001);
        expect(view.y - 40 / view.zoom).toBeGreaterThanOrEqual(-0.00001);
        expect(view.y + 40 / view.zoom).toBeLessThanOrEqual(80.00001);
      }
    }
    expect(mapViewBox(FULL_MAP)).toBe('0 0 100 80');
  });
  it('fits the entire selected curve bounds with room for destination markers', () => {
    const bounds = { x: 14, y: 25, width: 24, height: 37 };
    const view = fitMapBounds(bounds);
    expect(view.zoom).toBeGreaterThan(1);
    expect(view.x - 50 / view.zoom).toBeLessThanOrEqual(bounds.x - 4);
    expect(view.x + 50 / view.zoom).toBeGreaterThanOrEqual(bounds.x + bounds.width + 4);
    expect(view.y - 40 / view.zoom).toBeLessThanOrEqual(bounds.y - 4);
    expect(view.y + 40 / view.zoom).toBeGreaterThanOrEqual(bounds.y + bounds.height + 4);
  });
});
