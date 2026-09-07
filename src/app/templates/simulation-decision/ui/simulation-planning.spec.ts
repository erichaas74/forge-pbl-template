import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { frontierTradingConfig as frontierTradingProjectConfig } from '../../../projects/frontier-trading/frontier-trading.config';
import { SimulationDecisionRuntimeService } from '../runtime/simulation-decision-runtime.service';
import { MemorySimulationDecisionPersistenceAdapter } from '../runtime/simulation-decision.persistence';
import {
  SIMULATION_DECISION_CONFIG,
  SIMULATION_DECISION_PERSISTENCE,
} from '../runtime/simulation-decision.tokens';
import { SimulationMarketViewComponent } from './pages/market-view.component';
import { SimulationRouteMapComponent } from './pages/route-map.component';

const config = {
  ...frontierTradingProjectConfig,
  choiceProgression: undefined,
  routeForecastChallenge: undefined,
};

describe('market and route planning regressions', () => {
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
    expect(runtime.startCompany('Test Traders', 'compass', 'prairie-wagon')).toBe(true);
  });
  function market() {
    const fixture = TestBed.createComponent(SimulationMarketViewComponent);
    const component = fixture.componentInstance;
    component.inspectStall(component.scene()!.stalls[0]!);
    fixture.detectChanges();
    return { fixture, component };
  }

  it('keeps the trade draft, merchant, route, comparison and route-specific reasoning across component destruction', () => {
    const { fixture, component } = market();
    component.select('flour', 'buy', 2);
    component.saveSelection();
    const stall = component.selectedStallId();
    fixture.destroy();
    runtime.navigate('route');
    const routeFixture = TestBed.createComponent(SimulationRouteMapComponent);
    const route = routeFixture.componentInstance;
    route.selectRoute('route-northern');
    route.toggleCompare('route-northern');
    route.setRationale('This route has a lower supply cost.');
    routeFixture.destroy();
    runtime.navigate('market');
    const returned = TestBed.createComponent(SimulationMarketViewComponent);
    expect(returned.componentInstance.draft()).toEqual([
      { goodId: 'flour', direction: 'buy', quantity: 2 },
    ]);
    expect(returned.componentInstance.selectedStallId()).toBe(stall);
    expect(returned.componentInstance.editing()).toBe(true);
    returned.destroy();
    const returnedRoute = TestBed.createComponent(SimulationRouteMapComponent).componentInstance;
    expect(returnedRoute.selectedRouteId()).toBe('route-northern');
    expect(returnedRoute.compareIds()).toEqual(['route-northern']);
    expect(returnedRoute.rationale()).toBe('This route has a lower supply cost.');
    returnedRoute.selectRoute('route-river');
    expect(returnedRoute.rationale()).toBe('');
  });

  it('uses the entire candidate plan for both cash and cargo previews', () => {
    const { component } = market();
    component.select('flour', 'buy');
    component.saveSelection();
    component.select('coffee', 'buy');
    expect(component.selectedLinePreview().cashAfterCents).toBe(10424);
    expect(component.selectedLinePreview().cargoAfter).toBe(4);
    component.saveSelection();
    expect(component.selectedLinePreview()).toEqual(component.draftPreview());
    expect(runtime.cash()).toBe(16000);
    expect(runtime.usedCargo()).toBe(0);
  });

  it('accumulates repeated one-unit drops instead of replacing the line', () => {
    const { component } = market();
    for (let i = 0; i < 2; i++) {
      component.beginDrag('flour', 'buy');
      component.dropAtWagon(new Event('drop') as DragEvent);
    }
    expect(component.draft()).toEqual([{ goodId: 'flour', direction: 'buy', quantity: 2 }]);
  });

  it('updates quantities explicitly without adding them twice', () => {
    const { component } = market();
    component.select('flour', 'buy', 2);
    component.saveSelection();
    expect(component.editing()).toBe(true);
    component.quantity.set(3);
    component.saveSelection();
    expect(component.draft()[0]?.quantity).toBe(3);
    component.select('flour', 'buy');
    component.saveSelection();
    expect(component.draft()[0]?.quantity).toBe(4);
  });

  for (const quantity of [0, -1, 1.5, Number.NaN]) {
    it(`rejects invalid quantity ${quantity} even when that good is already drafted`, () => {
      const { component } = market();
      component.select('flour', 'buy');
      component.saveSelection();
      component.select('flour', 'buy', quantity);
      expect(component.selectedLinePreview().valid).toBe(false);
      component.saveSelection();
      expect(component.draft()[0]?.quantity).toBe(1);
    });
  }

  it('does not accept a combined plan that exceeds cash', () => {
    const { component } = market();
    component.select('flour', 'buy', 5);
    component.saveSelection();
    component.select('coffee', 'buy', 2);
    expect(component.selectedLinePreview().valid).toBe(false);
    component.saveSelection();
    expect(component.draft()).toHaveLength(1);
  });

  it('edits proposed cargo without attempting to sell unowned goods', () => {
    const { component } = market();
    component.select('flour', 'buy');
    component.saveSelection();
    const crate = component.visualCargo()[0]!;
    expect(crate.proposedQuantity).toBeGreaterThan(0);
    component.cargoClick(crate.goodId, crate.proposedQuantity > 0);
    expect(component.direction()).toBe('buy');
    expect(component.editing()).toBe(true);
  });

  it('preserves the intended cargo good when opening a merchant from Cargo', () => {
    expect(
      runtime.commitTrade([
        { goodId: 'coffee', direction: 'buy', quantity: 1, studentTotalCents: 3_332 },
      ]),
    ).toBe(true);
    runtime.planMarketTrade('coffee', 'sell');
    const component = TestBed.createComponent(SimulationMarketViewComponent).componentInstance;
    expect(component.selectedGoodId()).toBe('coffee');
    expect(component.direction()).toBe('sell');
    expect(component.activeGood()?.id).toBe('coffee');
  });

  it('rejects a cargo drop onto a merchant who does not trade it', () => {
    runtime.commitTrade([
      { goodId: 'coffee', direction: 'buy', quantity: 1, studentTotalCents: 3_332 },
    ]);
    const { component } = market();
    component.beginDrag('coffee', 'sell');
    component.dropAtMerchant(new Event('drop') as DragEvent, component.scene()!.stalls[1]!);
    expect(component.draft()).toEqual([]);
    expect(runtime.errors()[0]).toContain('does not trade');
  });

  it('shows discovered goods without exposing unexplored categories', () => {
    const { component } = market();
    component.showAll.set(true);
    expect(component.visibleGoods().some((good) => good.category === 'Equipment')).toBe(false);
    component.inspectStall(component.scene()!.stalls[1]!);
    component.showAll.set(true);
    expect(component.visibleGoods().some((good) => good.category === 'Equipment')).toBe(true);
    expect(component.visibleGoods().some((good) => good.category === 'Food')).toBe(true);
  });

  it('prevents duplicate confirmation and records a complete receipt', () => {
    const { component } = market();
    component.select('flour', 'buy');
    component.saveSelection();
    component.select('coffee', 'buy');
    component.saveSelection();
    component.reviewOpen.set(true);
    component.confirmTrade();
    expect(runtime.cash()).toBe(16000);
    for (const line of component.draft()) {
      component.setMathAnswer(line, component.expectedLineTotal(line) / 100);
    }
    component.confirmTrade();
    expect(runtime.cash()).toBe(10424);
    expect(component.receiptLines()).toHaveLength(2);
    component.pinReceipt();
    expect(runtime.state().evidence.at(-1)?.summary).toContain('Flour');
    expect(runtime.state().evidence.at(-1)?.summary).toContain('Coffee');
    component.confirmTrade();
    expect(runtime.cash()).toBe(10424);
    expect(runtime.state().ledger).toHaveLength(4);
  });

  it('keeps plans separate by location and clears them when restarting', () => {
    const { component } = market();
    component.select('flour', 'buy');
    component.saveSelection();
    expect(runtime.planning.at('fort-bridger').draft()).toEqual([]);
    runtime.restart();
    expect(runtime.planning.at(config.startingLocationId).draft()).toEqual([]);
  });

  it('keeps projected selling prices visible for every route and previews one without committing it', () => {
    const fixture = TestBed.createComponent(SimulationRouteMapComponent);
    fixture.detectChanges();
    const route = fixture.componentInstance;
    const element = fixture.nativeElement as HTMLElement;

    expect(route.routeOptions()).toHaveLength(config.routes.length);
    expect(element.querySelectorAll('[data-market-kind="sell"]')).toHaveLength(
      Object.keys(route.destinationMarkets()).length,
    );
    for (const option of route.routeOptions()) {
      const prices = route.routePriceProjections(option);
      expect(prices).toHaveLength(config.goods.length);
      expect(prices.every((price) => price.sellPriceCents > 0)).toBe(true);
    }

    route.previewRoute('route-river');
    fixture.detectChanges();
    expect(route.highlightedRoute()?.id).toBe('route-river');
    expect(route.selectedRouteId()).toBe('');
    expect(element.querySelector('.route-prediction')?.textContent).toContain(
      'Fast water, drifting clouds, and damp roads',
    );
  });

  it('includes drafted trades in the route budget and requires their review before departure', () => {
    const { component } = market();
    component.select('flour', 'buy');
    component.saveSelection();
    const route = TestBed.createComponent(SimulationRouteMapComponent).componentInstance;
    route.selectRoute('route-northern');
    expect(route.plannedTrade().cashAfterCents).toBe(13756);
    expect(route.canDepart()).toBe(false);
    component.clearDraft();
    expect(route.canDepart()).toBe(true);
  });

  it('starts travel at zero progress without an artificial day counter', () => {
    const fixture = TestBed.createComponent(SimulationRouteMapComponent);
    const route = fixture.componentInstance;
    route.selectRoute('route-northern');
    route.setRationale('This route has the lowest supply cost.');
    route.openReview();
    route.commit();
    expect(runtime.state().currentDay).toBe(1);
    expect(runtime.state().activeTravel?.progressDays).toBe(0);
    expect(route.progress()).toBe(0);
    expect(runtime.cash()).toBe(14200);
    fixture.destroy();
  });

  it('updates the map marker from official progress', () => {
    const route = TestBed.createComponent(SimulationRouteMapComponent).componentInstance;
    runtime.commitRoute('route-northern', 'This route protects the supply budget.');
    runtime.advanceTravel();
    expect(route.progress()).toBe(1 / 3);
  });

  for (const status of ['paused_by_teacher', 'submitted', 'season_complete'] as const) {
    it(`disables trade previews and departure while ${status}`, () => {
      const { component } = market();
      runtime.state.update((state) => ({ ...state, status }));
      expect(component.selectedLinePreview().valid).toBe(false);
      const route = TestBed.createComponent(SimulationRouteMapComponent).componentInstance;
      route.selectRoute('route-northern');
      expect(route.canDepart()).toBe(false);
    });
  }
});
