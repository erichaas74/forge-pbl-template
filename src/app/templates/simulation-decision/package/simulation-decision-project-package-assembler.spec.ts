import { InMemoryProjectPackageSource } from '../../../infrastructure/persistence/in-memory-project-package-source';
import {
  simpleSimulationDecisionLocation,
  simpleSimulationDecisionPackage,
} from '../../../testing/simple-simulation-decision-package.fixture';
import { LocalSimulationDecisionRuntime } from '../../../runtime/local-simulation-decision-runtime';

describe('simulation-decision project package', () => {
  it('loads optional trade-world data and rejects invalid bounds or references', async () => {
    const tradeWorld = {
      tickIntervalMs: 20000,
      eventEveryTicks: 3,
      events: [
        {
          id: 'grain-flood',
          kind: 'flood',
          title: 'Flooded fields',
          description: 'Grain supplies are delayed.',
          locationIds: ['location-start'],
          goodIds: ['good-grain'],
          priceChangeBps: 2000,
          durationTicks: 4,
        },
      ],
      shipments: [
        {
          id: 'grain-cart',
          name: 'Grain cart',
          routeId: 'route-start-end',
          goodIds: ['good-grain'],
          quantity: 3,
          travelTicks: 2,
          startOffset: 0,
          priceDropBps: 1000,
          reliefTicks: 3,
        },
      ],
    };
    async function load(world: unknown) {
      const files = structuredClone(simpleSimulationDecisionPackage);
      (files['simulation.json'] as Record<string, unknown>)['tradeWorld'] = world;
      return new LocalSimulationDecisionRuntime(
        new InMemoryProjectPackageSource({
          [simpleSimulationDecisionLocation.reference]: files,
        }),
      ).loadProject(simpleSimulationDecisionLocation);
    }
    const valid = await load(tradeWorld);
    expect(valid.issues).toEqual([]);
    expect(valid.graph?.config.tradeWorld).toEqual(tradeWorld);
    expect(Object.isFrozen(valid.graph?.config.tradeWorld)).toBe(true);
    const turnBased = await load({ ...tradeWorld, timing: 'turn-based' });
    expect(turnBased.issues).toEqual([]);
    expect(turnBased.graph?.config.tradeWorld?.timing).toBe('turn-based');
    const invalidTiming = await load({ ...tradeWorld, timing: 'each-frame' });
    expect(invalidTiming.graph).toBeUndefined();
    expect(invalidTiming.issues.map((issue) => issue.code)).toContain('INVALID_FILE_SHAPE');
    const badShape = await load({ ...tradeWorld, tickIntervalMs: 0 });
    expect(badShape.graph).toBeUndefined();
    expect(badShape.issues.map((issue) => issue.code)).toContain('INVALID_FILE_SHAPE');
    const badReference = await load({
      ...tradeWorld,
      shipments: [{ ...tradeWorld.shipments[0], routeId: 'missing-route' }],
    });
    expect(badReference.issues.map((issue) => issue.code)).toContain('INVALID_TRADE_WORLD');
  });

  it('assembles an immutable config and validates its references', async () => {
    const source = new InMemoryProjectPackageSource({
      [simpleSimulationDecisionLocation.reference]: simpleSimulationDecisionPackage,
    });
    const runtime = new LocalSimulationDecisionRuntime(source);

    const loaded = await runtime.loadProject(simpleSimulationDecisionLocation);

    expect(loaded.issues).toEqual([]);
    expect(loaded.graph?.config).toMatchObject({
      projectId: simpleSimulationDecisionLocation.projectId,
      projectVersion: simpleSimulationDecisionLocation.projectVersion,
      template: { id: 'simulation-decision', version: '1.1' },
      startingLocationId: 'location-start',
    });
    expect(loaded.graph?.marketsById.has('market-start')).toBe(true);
    expect(Object.isFrozen(loaded.graph)).toBe(true);
    expect(Object.isFrozen(loaded.graph?.config)).toBe(true);
  });

  it('reports invalid cross-file references', async () => {
    const files = structuredClone(simpleSimulationDecisionPackage);
    const markets = files['markets.json'] as {
      items: Array<{ goods: Array<{ goodId: string }> }>;
    };
    markets.items[0]!.goods[0]!.goodId = 'good-missing';
    const source = new InMemoryProjectPackageSource({
      [simpleSimulationDecisionLocation.reference]: files,
    });

    const loaded = await new LocalSimulationDecisionRuntime(source).loadProject(
      simpleSimulationDecisionLocation,
    );

    expect(loaded.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: 'REFERENCE_NOT_FOUND',
          relatedEntityIds: ['good-missing'],
        }),
      ]),
    );
  });

  it('does not treat a registered future capability contract as implemented', async () => {
    const files = structuredClone(simpleSimulationDecisionPackage);
    const manifest = files['project.json'] as { capabilities: string[] };
    manifest.capabilities.push('liveSession');
    const source = new InMemoryProjectPackageSource({
      [simpleSimulationDecisionLocation.reference]: files,
    });

    const loaded = await new LocalSimulationDecisionRuntime(source).loadProject(
      simpleSimulationDecisionLocation,
    );

    expect(loaded.issues.map((issue) => issue.code)).toEqual(
      expect.arrayContaining(['CAPABILITY_NOT_AVAILABLE', 'CAPABILITY_FILE_MISSING']),
    );
  });

  it('validates choice progression references and cumulative stages', async () => {
    const files = structuredClone(simpleSimulationDecisionPackage);
    const simulation = files['simulation.json'] as Record<string, unknown>;
    simulation['choiceProgression'] = {
      stages: [
        {
          id: 'starter',
          title: 'Starter',
          description: 'Starter choices',
          availableGoodIds: ['good-grain'],
          availableRouteIds: ['route-start-end'],
        },
        {
          id: 'expanded',
          title: 'Expanded',
          description: 'Expanded choices',
          requirements: { minimumDiscoveredStalls: 1 },
          availableGoodIds: ['good-missing'],
          availableRouteIds: ['route-start-end'],
        },
      ],
    };
    const source = new InMemoryProjectPackageSource({
      [simpleSimulationDecisionLocation.reference]: files,
    });

    const loaded = await new LocalSimulationDecisionRuntime(source).loadProject(
      simpleSimulationDecisionLocation,
    );

    expect(loaded.issues.map((issue) => issue.code)).toEqual(
      expect.arrayContaining(['REFERENCE_NOT_FOUND', 'PROGRESSION_CHOICES_REGRESS']),
    );
  });

  it('reports a malformed progression stage without entering reference validation', async () => {
    const files = structuredClone(simpleSimulationDecisionPackage);
    const simulation = files['simulation.json'] as Record<string, unknown>;
    simulation['choiceProgression'] = { stages: [{ id: 'missing-fields' }] };
    const source = new InMemoryProjectPackageSource({
      [simpleSimulationDecisionLocation.reference]: files,
    });

    const loaded = await new LocalSimulationDecisionRuntime(source).loadProject(
      simpleSimulationDecisionLocation,
    );

    expect(loaded.graph).toBeUndefined();
    expect(loaded.issues).toEqual(
      expect.arrayContaining([expect.objectContaining({ code: 'INVALID_FILE_SHAPE' })]),
    );
  });

  it('rejects malformed route forecast settings', async () => {
    const files = structuredClone(simpleSimulationDecisionPackage);
    const simulation = files['simulation.json'] as Record<string, unknown>;
    simulation['routeForecastChallenge'] = {
      requiredBeforeDeparture: 'yes',
      toleranceCents: -1,
    };
    const source = new InMemoryProjectPackageSource({
      [simpleSimulationDecisionLocation.reference]: files,
    });

    const loaded = await new LocalSimulationDecisionRuntime(source).loadProject(
      simpleSimulationDecisionLocation,
    );

    expect(loaded.graph).toBeUndefined();
    expect(loaded.issues).toEqual(
      expect.arrayContaining([expect.objectContaining({ code: 'INVALID_FILE_SHAPE' })]),
    );
  });

  it('loads valid transaction math and rejects malformed discount tiers', async () => {
    const validFiles = structuredClone(simpleSimulationDecisionPackage);
    const validSimulation = validFiles['simulation.json'] as Record<string, unknown>;
    validSimulation['transactionMath'] = {
      answerRequired: true,
      purchaseDiscountTiers: [
        { minimumQuantity: 3, discountPercent: 10 },
        { minimumQuantity: 7, discountPercent: 14 },
      ],
    };
    const valid = await new LocalSimulationDecisionRuntime(
      new InMemoryProjectPackageSource({
        [simpleSimulationDecisionLocation.reference]: validFiles,
      }),
    ).loadProject(simpleSimulationDecisionLocation);

    expect(valid.issues).toEqual([]);
    expect(valid.graph?.config.transactionMath?.purchaseDiscountTiers).toHaveLength(2);

    const invalidFiles = structuredClone(simpleSimulationDecisionPackage);
    const invalidSimulation = invalidFiles['simulation.json'] as Record<string, unknown>;
    invalidSimulation['transactionMath'] = {
      answerRequired: true,
      purchaseDiscountTiers: [{ minimumQuantity: 0, discountPercent: 120 }],
    };
    const invalid = await new LocalSimulationDecisionRuntime(
      new InMemoryProjectPackageSource({
        [simpleSimulationDecisionLocation.reference]: invalidFiles,
      }),
    ).loadProject(simpleSimulationDecisionLocation);

    expect(invalid.graph).toBeUndefined();
    expect(invalid.issues).toEqual(
      expect.arrayContaining([expect.objectContaining({ code: 'INVALID_FILE_SHAPE' })]),
    );
  });
});
