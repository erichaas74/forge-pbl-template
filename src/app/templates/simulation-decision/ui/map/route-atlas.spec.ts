import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, expect, it, vi } from 'vitest';
// jsdom has no graphics device; the real renderer is exercised by check-phaser-atlas.cjs.
vi.mock('phaser', () => ({}));
import { frontierTradingConfig as frontierTradingProjectConfig } from '../../../../projects/frontier-trading/frontier-trading.config';
import { SimulationDecisionRuntimeService } from '../../runtime/simulation-decision-runtime.service';
import { MemorySimulationDecisionPersistenceAdapter } from '../../runtime/simulation-decision.persistence';
import {
  SIMULATION_DECISION_CONFIG,
  SIMULATION_DECISION_PERSISTENCE,
} from '../../runtime/simulation-decision.tokens';
import { SimulationRouteMapComponent } from '../pages/route-map.component';
import { RouteAtlasComponent } from './route-atlas.component';
import { marketPrice } from '../../domain/simulation-decision.engine';
import {
  FULL_MAP,
  boundedMapView,
  fitMapBounds,
  mapViewBox,
  routePredictionPosition,
  zoomMapAt,
} from './map-viewport';

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
  function setup(showPrices = true) {
    const fixture = TestBed.createComponent(SimulationRouteMapComponent);
    fixture.detectChanges();
    const atlas = fixture.debugElement.query(By.directive(RouteAtlasComponent))
      .componentInstance as RouteAtlasComponent;
    const element: HTMLElement = fixture.nativeElement;
    atlas.showPrices.set(showPrices);
    fixture.detectChanges();
    return { fixture, atlas, element, route: fixture.componentInstance };
  }

  it('starts with a clear map and opens prices only when requested', () => {
    const { fixture, atlas, element } = setup(false);
    expect(element.querySelector('.town-market')).toBeNull();
    expect(atlas.externalControls()).toBe(true);
    expect(atlas.controls()).toBeDefined();
    expect(element.querySelector('.map-options')).toBeNull();
    expect(element.querySelector('[aria-label="Zoom in"], [aria-label="Zoom out"]')).toBeNull();
    expect(element.querySelector('[aria-label="Map zoom"]')).toBeNull();
    atlas.showPrices.set(true);
    fixture.detectChanges();
    expect(atlas.showPrices()).toBe(true);
    expect(element.querySelector('.town-market')).not.toBeNull();
    expect(runtime.state().routeHistory).toHaveLength(0);
  });

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

  it('scouts an open trail without moving the company or writing evidence and stops on selection changes', () => {
    const { fixture, atlas, route, element } = setup();
    route.chooseRoute('route-northern');
    fixture.detectChanges();
    atlas.canvasStatus.set('ready');
    atlas.reducedMotion.set(false);
    const before = runtime.state();
    atlas.scoutTrail();
    fixture.detectChanges();
    expect(atlas.previewRouteId()).toBe('route-northern');
    expect(atlas.canvasSnapshot().travel).toBeUndefined();
    expect(element.querySelector('.scout-notice')?.textContent).toContain('Preview only');
    expect(runtime.state()).toBe(before);
    route.chooseRoute('route-river');
    fixture.detectChanges();
    expect(atlas.previewRouteId()).toBe('');
    atlas.reducedMotion.set(true);
    atlas.scoutTrail();
    expect(atlas.previewRouteId()).toBe('');
  });

  it('zooms around the wheel pointer without changing saved state or browser shortcuts', () => {
    const { atlas, element } = setup();
    const state = runtime.state();
    const svg = element.querySelector('svg')!;
    Object.defineProperty(svg, 'getScreenCTM', { value: () => ({ a: 8, d: 4, e: 20, f: 10 }) });
    const wheel = new WheelEvent('wheel', {
      deltaY: -100,
      clientX: 500,
      clientY: 190,
      bubbles: true,
      cancelable: true,
    });
    svg.dispatchEvent(wheel);
    expect(wheel.defaultPrevented).toBe(true);
    const view = atlas.view();
    expect(view.zoom).toBeGreaterThan(1);
    expect((60 - view.x) * view.zoom).toBeCloseTo(10);
    expect((45 - view.y) * view.zoom).toBeCloseTo(5);
    const shortcut = new WheelEvent('wheel', {
      deltaY: -100,
      ctrlKey: true,
      bubbles: true,
      cancelable: true,
    });
    svg.dispatchEvent(shortcut);
    expect(shortcut.defaultPrevented).toBe(false);
    expect(atlas.view()).toBe(view);
    expect(runtime.state()).toBe(state);
  });

  it('reuses sampled geometry on runtime updates and retains camera position on resize', () => {
    const { fixture, atlas } = setup();
    const samples = atlas.routeSamples();
    const view = boundedMapView({ x: 45, y: 35, zoom: 2 });
    atlas.view.set(view);
    runtime.state.update((state) => ({ ...state, currentDay: state.currentDay + 1 }));
    fixture.detectChanges();
    expect(atlas.routeSamples()).toBe(samples);
    atlas.mapSize.set({ width: 1366, height: 768 });
    fixture.detectChanges();
    expect(atlas.canvasViewport().view).toBe(view);
    expect(atlas.routeSamples()).toBe(samples);
  });

  it('centers on the saved company position when SVG path measurement is unavailable', () => {
    runtime.commitRoute('route-northern', 'Protect the supply budget.');
    runtime.state.update((state) => ({
      ...state,
      activeTravel: { ...state.activeTravel!, progressDays: 1 },
    }));
    const { atlas } = setup();
    const point = atlas.canvasSnapshot().companyPosition;
    expect(() => atlas.centerOnCompany()).not.toThrow();
    expect(atlas.view()).toEqual(boundedMapView({ ...point, zoom: 1.75 }));
  });

  it('never scouts locked, inactive, incompatible, or committed trails', () => {
    const { fixture, atlas } = setup();
    atlas.canvasStatus.set('ready');
    for (const state of ['locked', 'inactive', 'unavailable', 'traveling', 'completed'] as const) {
      const trail = { route: frontierTradingConfig.routes[0]!, state, compared: false };
      const standalone = TestBed.createComponent(RouteAtlasComponent);
      standalone.componentRef.setInput('locations', frontierTradingConfig.locations);
      standalone.componentRef.setInput(
        'currentLocationId',
        frontierTradingConfig.startingLocationId,
      );
      standalone.componentRef.setInput('selectedRouteId', trail.route.id);
      standalone.componentRef.setInput('trails', [trail]);
      standalone.detectChanges();
      standalone.componentInstance.canvasStatus.set('ready');
      standalone.componentInstance.scoutTrail();
      expect(standalone.componentInstance.previewRouteId()).toBe('');
      standalone.destroy();
    }
    fixture.destroy();
  });

  it('advances a safe map day once, stays on the map, and requires the real event screen', () => {
    runtime.commitRoute('route-northern', 'Protect the supply budget.');
    runtime.state.update((state) => ({
      ...state,
      lastView: 'route',
      activeTravel: {
        ...state.activeTravel!,
        eventIds: [],
      },
    }));
    const { route } = setup();
    route.advanceMapDay();
    expect(runtime.state().activeTravel?.progressDays).toBe(1);
    expect(runtime.state().lastView).toBe('route');
    route.advanceMapDay();
    expect(runtime.state().activeTravel?.progressDays).toBe(1);
    route.dayMoving.set(false);
    const event = runtime.config.events[0]!.id;
    runtime.state.update((state) => ({
      ...state,
      activeTravel: {
        ...state.activeTravel!,
        eventIds: ['unused', event],
      },
    }));
    route.advanceMapDay();
    expect(runtime.state().pendingEventId).toBe(event);
    expect(runtime.state().lastView).toBe('events');
    expect(route.mapArrival()).toBe(false);
  });

  it('shows arrival only after the final saved day and keeps teacher pause authoritative', async () => {
    runtime.commitRoute('route-northern', 'Protect the supply budget.');
    runtime.state.update((state) => ({
      ...state,
      status: 'paused_by_teacher',
      activeTravel: {
        ...state.activeTravel!,
        progressDays: 2,
        eventIds: [],
      },
    }));
    const { fixture, route, element } = setup();
    route.advanceMapDay();
    expect(runtime.state().activeTravel?.progressDays).toBe(2);
    expect(route.mapArrival()).toBe(false);
    runtime.state.update((state) => ({ ...state, status: 'active' }));
    route.advanceMapDay();
    fixture.detectChanges();
    expect(runtime.state().activeTravel).toBeUndefined();
    expect(runtime.state().routeHistory.at(-1)?.dayArrived).toBeDefined();
    expect(runtime.state().lastView).toBe('route');
    expect(element.querySelector('.map-arrival')?.textContent).toContain('Sell your goods');
    await fixture.whenStable();
    expect(document.activeElement).toBe(element.querySelector('.map-arrival button'));
  });

  it('lets the keyboard inspect an incompatible destination without enabling departure', () => {
    const { fixture, element, route } = setup();
    const marker = element.querySelector('[data-map-stop][aria-label^="South Pass Camp"]')!;
    marker.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    fixture.detectChanges();
    expect(route.selectedRouteId()).toBe('');
    expect(route.predictionOpen()).toBe(true);
    expect(route.plannerOpen()).toBe(false);
    expect(marker.getAttribute('aria-pressed')).toBe('true');
    expect(route.canDepart()).toBe(false);
    expect(element.querySelector('.route-prediction')?.textContent).toContain('South Pass');
    route.chooseRoute('route-south-pass');
    fixture.detectChanges();
    expect(route.selectedRouteId()).toBe('route-south-pass');
    expect(route.plannerOpen()).toBe(true);
    expect(route.predictionOpen()).toBe(false);
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

  it('opens a prediction only on selection, without changing a saved plan', () => {
    const { fixture, route, element } = setup();
    const state = runtime.state();
    route.selectedRouteId.set('route-northern');
    expect(element.querySelector('.route-prediction')).toBeNull();
    element.querySelector('[data-map-trail]')!.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
    expect(route.predictionOpen()).toBe(false);
    expect(element.querySelector('.route-prediction')).toBeNull();
    const marker = element.querySelector('[data-map-stop][aria-label^="Green River"]')!;
    marker.dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();
    expect(route.predictionOpen()).toBe(false);
    element.querySelector<HTMLButtonElement>('[data-market-town="river-crossing"] button')!.click();
    fixture.detectChanges();
    expect(route.mapRouteId()).toBe(route.routeOptions()[1]!.id);
    expect(element.querySelector('.route-prediction')?.textContent).toContain(
      route.locationName(route.routeOptions()[1]!.toLocationId),
    );
    expect(route.plannerOpen()).toBe(false);
    expect(route.selectedRouteId()).toBe('route-northern');
    expect(runtime.state()).toBe(state);
  });

  it('starts on the map and leaves the map unobstructed when returning to a saved plan', () => {
    expect(runtime.state().lastView).toBe('route');
    runtime.planning.at(runtime.state().currentLocationId).routeId.set('route-northern');
    const { route, element } = setup();
    expect(route.selectedRouteId()).toBe('route-northern');
    expect(route.plannerOpen()).toBe(false);
    expect(route.predictionOpen()).toBe(false);
    expect(element.querySelector('.route-market-board')).toBeNull();
    expect(element.querySelector('.town-market')).not.toBeNull();
    expect(element.querySelector('.workspace-atlas')).not.toBeNull();
  });

  it('moves keyboard focus into the rendered prediction and then the selected trip planner', async () => {
    const { fixture, route, element } = setup();
    route.previewRoute('route-northern');
    await fixture.whenStable();
    expect(document.activeElement).toBe(element.querySelector('.route-prediction'));
    route.chooseRoute('route-northern');
    await fixture.whenStable();
    expect(document.activeElement).toBe(element.querySelector('.trip-card'));
  });

  it('removes the workspace key and scenery/motion controls while keeping the map artwork', () => {
    const { element } = setup();
    const before = runtime.state();
    expect(element.querySelector('.map-caption')).toBeNull();
    expect(element.querySelector('.legend')).toBeNull();
    expect(element.querySelector('.layer-controls')).toBeNull();
    expect(element.querySelector('image')?.getAttribute('href')).toBe(
      runtime.config.world.mapSceneAsset,
    );
    expect(runtime.state()).toBe(before);
  });

  it('keeps destination prices on the map and only travel information in the prediction', () => {
    const { fixture, route, element } = setup();
    route.previewRoute('route-northern');
    fixture.detectChanges();
    const prediction = element.querySelector('.route-prediction')!;
    expect(prediction.textContent).toContain('travel cost');
    expect(prediction.textContent).not.toMatch(/margin|Buy here|Sell there|Flour|Salt/);
    expect(prediction.querySelector('.prediction-prices')).toBeNull();
    expect(element.querySelector('[data-market-town="fort-bridger"]')?.textContent).toContain(
      'Flour',
    );
  });

  it('fits the whole map proportionally in workspace and standalone frames', () => {
    const { element, atlas } = setup();
    expect(element.querySelector('.route-map')?.getAttribute('preserveAspectRatio')).toBe(
      'xMidYMid meet',
    );
    expect(atlas.canvasViewport().stretch).toBe(false);
    expect(element.querySelector<HTMLElement>('.map-window')?.style.backgroundImage).toBe('');
    const standalone = TestBed.createComponent(RouteAtlasComponent);
    standalone.componentRef.setInput('locations', frontierTradingConfig.locations);
    standalone.componentRef.setInput('currentLocationId', frontierTradingConfig.startingLocationId);
    standalone.detectChanges();
    expect(
      standalone.nativeElement.querySelector('.route-map').getAttribute('preserveAspectRatio'),
    ).toBe('xMidYMid meet');
  });

  it('toggles one route-local prediction at a time from the travel-cost markers', async () => {
    const { fixture, route, atlas, element } = setup();
    const northern = element.querySelector('[data-route-cost="route-northern"]')!;
    const river = element.querySelector('[data-route-cost="route-river"]')!;
    northern.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await fixture.whenStable();
    expect(element.querySelectorAll('.route-prediction')).toHaveLength(1);
    expect(
      element.querySelector('.route-prediction-anchor')?.getAttribute('data-prediction-route'),
    ).toBe('route-northern');
    expect(northern.getAttribute('aria-expanded')).toBe('true');
    const firstX = atlas.predictionPosition()!.anchorX;
    route.highlightRoute('route-river');
    expect(route.highlightedRouteId()).toBe('route-northern');
    river.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await fixture.whenStable();
    expect(element.querySelectorAll('.route-prediction')).toHaveLength(1);
    expect(
      element.querySelector('.route-prediction-anchor')?.getAttribute('data-prediction-route'),
    ).toBe('route-river');
    expect(atlas.predictionPosition()!.anchorX).not.toBe(firstX);
    const beforeZoom = atlas.predictionPosition()!.anchorX;
    atlas.zoom(0.25);
    await fixture.whenStable();
    expect(atlas.predictionPosition()!.anchorX).not.toBe(beforeZoom);
    river.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await fixture.whenStable();
    expect(element.querySelector('.route-prediction')).toBeNull();
    expect(river.getAttribute('aria-expanded')).toBe('false');
    northern.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await fixture.whenStable();
    element
      .querySelector('.route-prediction')!
      .dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await fixture.whenStable();
    expect(element.querySelector('.route-prediction')).toBeNull();
    expect(document.activeElement).toBe(northern);
    expect(runtime.state().routeHistory).toHaveLength(0);
  });

  it('uses the rendered map frame rather than fallback dimensions for overlay placement', async () => {
    const original = HTMLElement.prototype.getBoundingClientRect;
    const measure = vi
      .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
      .mockImplementation(function (this: HTMLElement) {
        return this.classList.contains('map-window')
          ? new DOMRect(0, 0, 800, 400)
          : original.call(this);
      });
    try {
      const { fixture, atlas, route } = setup();
      await fixture.whenStable();
      expect(atlas.mapSize()).toEqual({ width: 800, height: 400 });
      route.previewRoute('route-northern');
      await fixture.whenStable();
      const point = atlas.routeMidpoints()['route-northern']!;
      expect(atlas.predictionPosition()!.anchorX).toBeCloseTo(150 + point.x * 5);
      expect(atlas.predictionPosition()!.anchorY).toBeCloseTo(point.y * 5);
    } finally {
      measure.mockRestore();
    }
  });

  it('pans each axis using its own scale when the map fills a rectangular workspace', () => {
    const { atlas, element } = setup();
    const svg = element.querySelector('svg')!;
    Object.defineProperty(svg, 'getScreenCTM', { value: () => ({ a: 8, d: 4 }) });
    Object.defineProperty(svg, 'setPointerCapture', { value: vi.fn() });
    atlas.view.set(boundedMapView({ x: 50, y: 40, zoom: 2 }));
    atlas.startPan({
      button: 0,
      target: svg,
      pointerId: 1,
      clientX: 0,
      clientY: 0,
    } as unknown as PointerEvent);
    atlas.movePan({ pointerId: 1, clientX: 16, clientY: 8 } as PointerEvent);
    expect(atlas.view().x).toBe(48);
    expect(atlas.view().y).toBe(38);
  });

  it('puts all projected selling prices beside each accessible destination', () => {
    const { route, element } = setup();
    const destinations = Object.entries(route.destinationMarkets());
    expect(element.querySelectorAll('[data-market-kind="sell"]')).toHaveLength(destinations.length);
    for (const [town, prices] of destinations) {
      const label = element.querySelector(`[data-market-town="${town}"]`)!;
      for (const price of prices) {
        expect(label.textContent).toContain(price.name);
        expect(label.textContent).toContain(price.price);
      }
    }
    const blocked = runtime.config.routes.find((route) => route.id === 'route-south-pass')!;
    expect(element.querySelector(`[data-market-town="${blocked.toLocationId}"]`)).toBeNull();
  });

  it('shows buying prices at the current fort and updates them on arrival', () => {
    const { fixture, route, element } = setup();
    for (const town of [runtime.state().currentLocationId, 'fort-bridger']) {
      runtime.state.update((state) => ({ ...state, currentLocationId: town }));
      fixture.detectChanges();
      const label = element.querySelector('[data-market-kind="buy"]')!;
      expect(element.querySelectorAll('[data-market-kind="buy"]')).toHaveLength(1);
      expect(label.getAttribute('data-market-town')).toBe(town);
      expect(label.textContent).toContain('You are here');
      expect(label.textContent).toContain('Buy here · price per unit');
      expect(label.querySelector('button')).toBeNull();
      expect(label.querySelectorAll('dl > div')).toHaveLength(route.currentMarketPrices().length);
      expect(route.currentMarketPrices().length).toBeGreaterThan(0);
      for (const price of route.currentMarketPrices()) {
        expect(price.price).toBe(
          runtime.money(marketPrice(runtime.config, town, price.goodId, 'buy')!),
        );
        expect(label.textContent).toContain(price.name);
        expect(label.textContent).toContain(price.price);
      }
      expect(route.predictionOpen()).toBe(false);
    }
  });

  it('shows the configured travel cost halfway along each open route', () => {
    const { route, element } = setup();
    const open = route
      .atlasTrails()
      .filter((trail) => ['available', 'unavailable'].includes(trail.state));
    const costs = element.querySelectorAll('.route-cost');
    expect(costs).toHaveLength(open.length);
    for (const trail of open) {
      const badge = Array.from(costs).find(
        (cost) =>
          cost.getAttribute('aria-label') ===
          `${trail.route.name}, travel cost ${runtime.money(trail.route.supplyCostCents)}`,
      )!;
      expect(badge.textContent).toContain(runtime.money(trail.route.supplyCostCents));
      expect(badge.querySelector('animateMotion')?.getAttribute('path')).toBe(trail.route.path);
      expect(badge.querySelector('animateMotion')?.getAttribute('keyPoints')).toBe('0.5;0.5');
    }
  });

  it('shows the departure point and only the committed trail as active during travel', () => {
    runtime.commitRoute('route-northern', 'The lower supply cost keeps cash available.');
    const { atlas, route, element } = setup();
    expect(element.querySelector('[data-market-kind="buy"]')).toBeNull();
    expect(route.currentMarketPrices()).toEqual([]);
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
  it('keeps a zoom anchor stationary and clamps zoom before adjusting the camera', () => {
    const point = { x: 60, y: 45 };
    const view = zoomMapAt(FULL_MAP, point, 2);
    expect((point.x - view.x) * view.zoom).toBe(10);
    expect((point.y - view.y) * view.zoom).toBe(5);
    expect(zoomMapAt(view, point, 0)).toEqual(FULL_MAP);
    expect(zoomMapAt(view, point, 99)).toEqual(zoomMapAt(view, point, 3));
  });
  it('keeps route-local predictions in the map frame and connects them to the route midpoint', () => {
    for (const width of [360, 1200]) {
      for (const point of [
        { x: 5, y: 5 },
        { x: 90, y: 75 },
      ]) {
        const box = routePredictionPosition(point, FULL_MAP, width, 450);
        expect(box.x).toBeGreaterThanOrEqual(0);
        expect(box.y).toBeGreaterThanOrEqual(0);
        expect(box.x + box.width).toBeLessThanOrEqual(width);
        expect(box.y + box.height).toBeLessThanOrEqual(450);
        const scale = Math.min(width / 100, 450 / 80);
        expect(box.anchorX).toBeCloseTo(width / 2 + (point.x - 50) * scale);
        expect(box.anchorY).toBeCloseTo(225 + (point.y - 40) * scale);
      }
    }
  });
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
