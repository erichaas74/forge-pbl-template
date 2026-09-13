import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
vi.mock('phaser', () => ({}));
import { frontierTradingConfig } from '../../../projects/frontier-trading/frontier-trading.config';
import { SimulationDecisionRuntimeService } from '../runtime/simulation-decision-runtime.service';
import { MemorySimulationDecisionPersistenceAdapter } from '../runtime/simulation-decision.persistence';
import {
  SIMULATION_DECISION_CONFIG,
  SIMULATION_DECISION_PERSISTENCE,
} from '../runtime/simulation-decision.tokens';
import { SimulationMarketViewComponent } from './pages/market-view.component';
import { SimulationRouteMapComponent } from './pages/route-map.component';
import { tradeWorldCanvas } from './map/trade-world.presentation';
import { RouteEconomyPanelComponent } from './map/route-economy-panel.component';
import { marketPrice } from '../domain/simulation-decision.engine';

const config = {
  ...frontierTradingConfig,
  tradeWorld: { ...frontierTradingConfig.tradeWorld!, timing: 'real-time' as const },
  choiceProgression: undefined,
  routeForecastChallenge: undefined,
};
describe('trade world UI integration', () => {
  let runtime: SimulationDecisionRuntimeService;
  beforeEach(() => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: true });
    HTMLElement.prototype.scrollIntoView = vi.fn();
    TestBed.configureTestingModule({
      imports: [SimulationMarketViewComponent, SimulationRouteMapComponent],
      providers: [
        SimulationDecisionRuntimeService,
        { provide: SIMULATION_DECISION_CONFIG, useValue: config },
        {
          provide: SIMULATION_DECISION_PERSISTENCE,
          useFactory: () => new MemorySimulationDecisionPersistenceAdapter(),
        },
      ],
    });
    runtime = TestBed.inject(SimulationDecisionRuntimeService);
    runtime.startCompany('Connected traders', 'compass', 'prairie-wagon');
  });

  it('shows live sidebar stock and prices without changing cargo or revealing projected trip answers', () => {
    const fixture = TestBed.createComponent(RouteEconomyPanelComponent);
    const panel = fixture.componentInstance;
    panel.chosenMarket.set('fort-laramie');
    fixture.detectChanges();
    const before = structuredClone(runtime.state());
    const oldStock = panel.prices().find((row) => row.id === 'dried-beans')!.stock;
    for (let i = 0; i < 3; i++) runtime.pulseWorld();
    fixture.detectChanges();
    const row = panel.prices().find((row) => row.id === 'dried-beans')!;
    expect(row.stock).toBe(oldStock + 6);
    expect(row.sell).toBe(marketPrice(config, 'fort-laramie', row.id, 'sell', runtime.state()));
    expect(runtime.state().inventory).toEqual(before.inventory);
    expect(runtime.state().ledger).toEqual(before.ledger);
    expect(fixture.nativeElement.textContent).toContain('Profit on goods sold');
    expect(fixture.nativeElement.textContent).toContain('Net profit & costs');
    expect(fixture.nativeElement.textContent).not.toContain('Expected trip profit');
  });

  it('keeps weather visibility and Phaser town artwork separate from runtime outcomes', () => {
    runtime.pulseWorld();
    const fixture = TestBed.createComponent(SimulationRouteMapComponent);
    fixture.detectChanges();
    const atlas = fixture.componentInstance.atlas()!;
    const before = structuredClone(runtime.state());
    expect(atlas.canvasSnapshot().towns).toHaveLength(config.locations.length);
    expect(atlas.canvasSnapshot().world?.conditions.length).toBeGreaterThan(0);
    atlas.showWeather.set(false);
    fixture.detectChanges();
    expect(atlas.canvasSnapshot().world?.conditions).toEqual([]);
    expect(runtime.state()).toEqual(before);
    atlas.basicMap.set(true);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('[data-map-stop]').length).toBe(
      config.locations.length,
    );
    expect(fixture.nativeElement.querySelectorAll('.freight-marker').length).toBe(4);
  });

  it('holds live prices while a merchant or route calculation is open and releases on leaving', () => {
    const shop = TestBed.createComponent(SimulationMarketViewComponent);
    shop.componentInstance.inspectStall(shop.componentInstance.scene()!.stalls[0]!);
    shop.detectChanges();
    expect(runtime.worldRunning()).toBe(false);
    expect(runtime.pulseWorld()).toBe(false);
    shop.destroy();
    expect(runtime.worldRunning()).toBe(true);
    const map = TestBed.createComponent(SimulationRouteMapComponent);
    map.componentInstance.selectRoute('route-northern');
    map.detectChanges();
    expect(runtime.worldRunning()).toBe(false);
    map.destroy();
    expect(runtime.worldRunning()).toBe(true);
  });

  it('keeps receipts at the executed price when subsequent world events change the quote', () => {
    const fixture = TestBed.createComponent(SimulationMarketViewComponent);
    const market = fixture.componentInstance;
    market.inspectStall(market.scene()!.stalls[0]!);
    market.select('flour', 'buy', 1);
    market.saveSelection();
    market.setMathAnswer(market.draft()[0]!, market.expectedLineTotal(market.draft()[0]!) / 100);
    market.reviewOpen.set(true);
    market.confirmTrade();
    const receipt = market.receiptLines()[0]!;
    const executed = receipt.totalCents;
    // Release the view's hold to exercise later news without discarding its displayed receipt.
    runtime.holdWorld('market-math', false);
    for (let i = 0; i < 7; i++) runtime.pulseWorld();
    expect(market.buyPrice('flour')).not.toBe(receipt.unitPriceCents);
    expect(market.receiptLines()[0]?.totalCents).toBe(executed);
    market.pinReceipt();
    expect(runtime.state().evidence.at(-1)?.summary).toContain(runtime.money(executed));
  });

  it('changes planning origin after a confirmed arrival without recreating the map', () => {
    const fixture = TestBed.createComponent(SimulationRouteMapComponent);
    const map = fixture.componentInstance;
    map.selectRoute('route-northern');
    map.setRationale('A short road to our next market.');
    expect(runtime.commitRoute('route-northern', map.rationale())).toBe(true);
    runtime.state.update((state) => ({
      ...state,
      activeTravel: { ...state.activeTravel!, eventIds: [] },
    }));
    for (let i = 0; i < 3; i++) runtime.advanceTravel('route');
    fixture.detectChanges();
    expect(runtime.state().currentLocationId).toBe('fort-bridger');
    expect(map.routeOptions().length).toBeGreaterThan(2);
    map.selectRoute('route-northern-return');
    map.setRationale('We can carry provisions back to Independence.');
    expect(runtime.planning.at('fort-bridger').routeId()).toBe('route-northern-return');
    expect(runtime.planning.at('independence-post').routeId()).toBe('route-northern');
    expect(map.selectedRoute()?.toLocationId).toBe('independence-post');
    expect(
      map.atlasTrails().find((trail) => trail.route.id === 'route-northern-return')?.state,
    ).toBe('available');
    expect(runtime.commitRoute('route-northern-return', map.rationale())).toBe(true);
    expect(runtime.state().routeHistory).toHaveLength(2);
  });

  it('projects freight at confirmed endpoints, reverses direction, and exposes no price commands', () => {
    for (let i = 0; i < 3; i++) runtime.pulseWorld();
    const before = structuredClone(runtime.state());
    const projection = tradeWorldCanvas(config, runtime.state(), true)!;
    expect(projection.freight[0]?.progress).toBe(1);
    expect(projection.freight[0]?.deliveries).toBe(1);
    expect(Object.keys(projection).sort()).toEqual(['conditions', 'freight', 'running', 'tick']);
    expect(runtime.state()).toEqual(before);
    runtime.pulseWorld();
    expect(tradeWorldCanvas(config, runtime.state(), false)?.freight[0]?.progress).toBeCloseTo(
      2 / 3,
    );
  });
});
