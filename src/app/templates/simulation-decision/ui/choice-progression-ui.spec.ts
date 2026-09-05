import { TestBed } from '@angular/core/testing';
import { frontierTradingConfig } from '../../../projects/frontier-trading/frontier-trading.config';
import { SimulationDecisionRuntimeService } from '../runtime/simulation-decision-runtime.service';
import { MemorySimulationDecisionPersistenceAdapter } from '../runtime/simulation-decision.persistence';
import {
  SIMULATION_DECISION_CONFIG,
  SIMULATION_DECISION_PERSISTENCE,
} from '../runtime/simulation-decision.tokens';
import { SimulationMarketViewComponent } from './pages/market-view.component';
import { SimulationRouteMapComponent } from './pages/route-map.component';

describe('choice progression UI', () => {
  let runtime: SimulationDecisionRuntimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SimulationMarketViewComponent, SimulationRouteMapComponent],
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
    runtime.startCompany('Rank Testers', 'compass', 'mule-train');
  });

  it('shows the current rank and renders future routes as locked', () => {
    const fixture = TestBed.createComponent(SimulationRouteMapComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';

    expect(component.reachableRoutes()).toHaveLength(2);
    expect(component.atlasTrails().filter((trail) => trail.state === 'locked')).toHaveLength(3);
    expect(text).toContain('Starter Trader');
    expect(text).toContain('2 / 5 routes open');
    expect(text).toContain('Explore market stalls · 0 / 2');
  });

  it('updates Market and Route immediately after one accurate two-line manifest', () => {
    const scene = frontierTradingConfig.world.locations.find(
      (item) => item.locationId === runtime.state().currentLocationId,
    )!;
    for (const stall of scene.stalls.slice(0, 3)) runtime.inspectMarketStall(stall.id);
    runtime.commitTrade([
      { goodId: 'flour', direction: 'buy', quantity: 1, studentTotalCents: 2_244 },
      { goodId: 'salt', direction: 'buy', quantity: 1, studentTotalCents: 1_425 },
    ]);

    const marketFixture = TestBed.createComponent(SimulationMarketViewComponent);
    marketFixture.detectChanges();
    expect((marketFixture.nativeElement as HTMLElement).textContent).toContain('Frontier Trader');
    expect((marketFixture.nativeElement as HTMLElement).textContent).toContain(
      '10 / 10 supplies open',
    );

    const route = TestBed.createComponent(SimulationRouteMapComponent).componentInstance;
    expect(route.reachableRoutes()).toHaveLength(5);
    expect(route.atlasTrails().some((trail) => trail.state === 'locked')).toBe(false);
  });
});
