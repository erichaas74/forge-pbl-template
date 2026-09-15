import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, expect, it, vi } from 'vitest';
vi.mock('phaser', () => ({}));
import { frontierTradingConfig } from '../../../projects/frontier-trading/frontier-trading.config';
import { SimulationDecisionRuntimeService } from '../runtime/simulation-decision-runtime.service';
import { MemorySimulationDecisionPersistenceAdapter } from '../runtime/simulation-decision.persistence';
import {
  SIMULATION_DECISION_CONFIG,
  SIMULATION_DECISION_PERSISTENCE,
} from '../runtime/simulation-decision.tokens';
import { SimulationDecisionShellComponent } from './simulation-decision-shell.component';
import { SimulationRouteMapComponent } from './pages/route-map.component';
import { SimulationMarketViewComponent } from './pages/market-view.component';

describe('simple student trading flow', () => {
  let runtime: SimulationDecisionRuntimeService;
  beforeEach(() => {
    TestBed.configureTestingModule({
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
    runtime.startCompany('Student Traders', 'compass', 'prairie-wagon');
  });
  function shopAndBuy() {
    const shops = runtime.config.world.locations.find(
      (scene) => scene.locationId === runtime.state().currentLocationId,
    )!.stalls;
    shops.slice(0, 3).forEach((shop) => runtime.inspectMarketStall(shop.id));
    expect(
      runtime.commitTrade([
        { goodId: 'flour', direction: 'buy', quantity: 1, studentTotalCents: 2244 },
        { goodId: 'salt', direction: 'buy', quantity: 1, studentTotalCents: 1425 },
      ]),
    ).toBe(true);
  }

  it('keeps task instruments on the canvas and secondary navigation in a closed tools menu', () => {
    const fixture = TestBed.createComponent(SimulationDecisionShellComponent);
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;
    const primary = Array.from(element.querySelectorAll('.project-tools > button'));
    expect(primary.map((button) => button.textContent?.trim())).toEqual(['⌁ Map', '▦ Shop']);
    expect(element.querySelector('.header-menu summary')?.textContent).toBe('Project');
    expect(element.querySelector('.header-menu')?.textContent).toContain('Teacher controls');
    expect(element.querySelector('.unified-project-header')).toBeNull();
    expect(element.querySelector<HTMLDetailsElement>('app-workspace-tools details')?.open).toBe(false);
    expect(element.querySelector('app-workspace-tools .project-tools')).not.toBeNull();
    expect(element.querySelector('.next-step')).toBeNull();
    expect(element.querySelector('.game-footer')).toBeNull();
    expect(element.querySelector('.next-action')?.getAttribute('aria-label')).toContain(
      'Next: Choose a town',
    );
    expect(element.querySelector('.field-controls .map-tools')).not.toBeNull();
    expect(element.querySelector('.map-card .map-tools')).toBeNull();
    expect(element.querySelector('.field-controls .world-menu')).not.toBeNull();
    expect(element.querySelector('.world-menu > summary')?.textContent).toContain('Turn 0');
    expect(element.querySelectorAll('.world-controls button')).toHaveLength(0);
    expect(element.querySelector('.world-brief')?.textContent).toContain(
      'Prices held until your next travel turn',
    );
    expect(element.querySelector('.route-sidebar app-route-economy-panel')).not.toBeNull();
    expect(element.querySelector('.town-market')).toBeNull();
    const prices = Array.from(element.querySelectorAll('.field-controls button')).find(
      (button) => button.textContent?.trim() === 'Show prices',
    ) as HTMLButtonElement;
    prices.click();
    fixture.detectChanges();
    expect(element.querySelector('.town-market')).not.toBeNull();
  });

  it('guides a chosen town through shop discovery, buying, and trip math using real progress', () => {
    const fixture = TestBed.createComponent(SimulationDecisionShellComponent);
    fixture.detectChanges();
    const shell = fixture.componentInstance;
    expect(shell.nextMission().actionView).toBe('route');
    runtime.planning.at(runtime.state().currentLocationId).routeId.set('route-northern');
    expect(shell.nextMission().title).toBe('Visit 2 shops');
    const shops = runtime.config.world.locations[0]!.stalls;
    shops.slice(0, 3).forEach((shop) => runtime.inspectMarketStall(shop.id));
    expect(shell.nextMission().title).toBe('Buy 2 kinds of goods');
    shopAndBuy();
    expect(shell.nextMission().title).toBe('Check your trip math');
  });

  it('opens the saved trip panel when the next-step action asks for math', async () => {
    runtime.planning.at(runtime.state().currentLocationId).routeId.set('route-northern');
    shopAndBuy();
    runtime.navigate('market');
    const fixture = TestBed.createComponent(SimulationDecisionShellComponent);
    fixture.detectChanges();
    fixture.componentInstance.runNextMission();
    await fixture.whenStable();
    const route = fixture.debugElement.query(By.directive(SimulationRouteMapComponent))
      .componentInstance as SimulationRouteMapComponent;
    expect(route.plannerOpen()).toBe(true);
    expect(fixture.nativeElement.querySelector('.trip-card').hasAttribute('inert')).toBe(false);
    expect(fixture.nativeElement.querySelector('.forecast-challenge')).not.toBeNull();
    expect(document.activeElement).toBe(
      fixture.nativeElement.querySelector('[aria-describedby="sales-forecast-help"]'),
    );
  });

  it('shows shopping before trip questions, then presents one math question at a time', async () => {
    const fixture = TestBed.createComponent(SimulationRouteMapComponent);
    fixture.detectChanges();
    const route = fixture.componentInstance;
    route.chooseRoute('route-northern');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.trip-card').textContent).toContain(
      'Go to the shops',
    );
    expect(fixture.nativeElement.querySelector('.forecast-challenge')).toBeNull();
    expect(fixture.nativeElement.querySelector('.trip-card textarea')).toBeNull();
    shopAndBuy();
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('[aria-describedby="sales-forecast-help"]'),
    ).not.toBeNull();
    expect(
      fixture.nativeElement.querySelector('[aria-describedby="profit-forecast-help"]'),
    ).toBeNull();
    route.continueForecast();
    expect(route.forecastStep()).toBe('sales');
    route.setForecastSalesRevenue(route.profitForecast()!.expectedSalesRevenueCents / 100);
    route.continueForecast();
    await fixture.whenStable();
    expect(
      fixture.nativeElement.querySelector('[aria-describedby="sales-forecast-help"]'),
    ).toBeNull();
    const profitInput = fixture.nativeElement.querySelector(
      '[aria-describedby="profit-forecast-help"]',
    );
    expect(document.activeElement).toBe(profitInput);
    expect(route.canDepart()).toBe(false);
    route.setForecastTripProfit(route.profitForecast()!.expectedTripProfitCents / 100);
    fixture.detectChanges();
    expect(route.canDepart()).toBe(true);
    expect(fixture.nativeElement.querySelector('.trip-card textarea')).not.toBeNull();
  });

  it('moves from quantity to a price check without buying anything early', () => {
    const fixture = TestBed.createComponent(SimulationMarketViewComponent);
    fixture.detectChanges();
    const market = fixture.componentInstance;
    market.inspectStall(runtime.config.world.locations[0]!.stalls[0]!);
    fixture.detectChanges();
    expect(market.activeGood()).toBeUndefined();
    expect(fixture.nativeElement.querySelector('.trade-builder')).toBeNull();
    expect(fixture.nativeElement.querySelector('#market-world-title')).toBeNull();
    expect(
      fixture.nativeElement.querySelector('#market-shop-counter header button'),
    ).not.toBeNull();
    market.select('flour', 'buy', 1);
    const cash = runtime.cash();
    market.saveSelection();
    expect(market.reviewOpen()).toBe(true);
    expect(runtime.cash()).toBe(cash);
    market.confirmTrade();
    expect(runtime.cash()).toBe(cash);
    const line = market.draft()[0]!;
    market.setMathAnswer(line, market.expectedLineTotal(line) / 100);
    market.confirmTrade();
    fixture.detectChanges();
    expect(runtime.cash()).toBe(cash - 2244);
    expect(market.activeGood()).toBeUndefined();
    expect(fixture.nativeElement.querySelector('.receipt')?.textContent).toContain('Bought 1');
  });
});
