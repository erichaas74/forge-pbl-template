import type { ProjectPackageLocation } from '../core/packages/project-package-contracts';

export const simpleSimulationDecisionLocation: ProjectPackageLocation = {
  tenantId: 'tenant-school-1',
  projectId: 'project-simple-decision',
  projectVersion: '1.0.0',
  reference: 'fixtures/project-simple-decision',
};

export const simpleSimulationDecisionPackage: Readonly<Record<string, unknown>> = {
  'project.json': {
    id: 'project-simple-decision',
    schemaVersion: '1.0',
    title: 'Simple Decision Fixture',
    template: { id: 'simulation-decision', version: '1.1' },
    projectType: 'simulation-decision',
    status: 'draft',
    simulationConfigRef: 'simulation.json',
    capabilities: ['simulationDecision', 'markets', 'routes', 'scenarioEvents', 'strategyReport'],
  },
  'simulation.json': {
    id: 'simulation-simple-decision',
    schemaVersion: '1.0',
    title: 'Simple Decision',
    subtitle: 'Package fixture',
    gradeLabel: 'Grade 5 Mathematics',
    mission: 'Make one evidence-based trading decision.',
    startingCashCents: 10_000,
    reserveTargetCents: 2_000,
    profitTargetCents: 1_000,
    startingLocationId: 'location-start',
    maxSeasonDays: 5,
    emblems: [{ id: 'circle', label: 'Circle', symbol: 'O' }],
    transports: [
      {
        id: 'transport-cart',
        schemaVersion: '1.0',
        name: 'Cart',
        icon: 'C',
        costCents: 1_000,
        cargoCapacity: 10,
        travelSpeed: 1,
        description: 'A small cart.',
        vulnerability: 'Low capacity.',
        compatibleTerrain: ['road'],
      },
    ],
    goods: [
      {
        id: 'good-grain',
        schemaVersion: '1.0',
        name: 'Grain',
        icon: 'G',
        category: 'Food',
        baseBuyPriceCents: 500,
        unitCargo: 1,
        description: 'A test good.',
      },
    ],
    locations: [
      {
        id: 'location-start',
        schemaVersion: '1.0',
        name: 'Start',
        shortName: 'Start',
        kind: 'post',
        mapX: 10,
        mapY: 20,
        context: 'The starting market.',
      },
      {
        id: 'location-end',
        schemaVersion: '1.0',
        name: 'End',
        shortName: 'End',
        kind: 'town',
        mapX: 80,
        mapY: 20,
        context: 'The destination market.',
      },
    ],
    world: {
      travelAnimationMs: 0,
      locations: [
        {
          locationId: 'location-start',
          environment: 'plains',
          weather: 'Clear',
          arrivalText: 'Ready to trade.',
          stalls: [],
        },
        {
          locationId: 'location-end',
          environment: 'fort',
          weather: 'Clear',
          arrivalText: 'Ready to sell.',
          stalls: [],
        },
      ],
    },
  },
  'markets.json': {
    schemaVersion: '1.0',
    items: [
      {
        id: 'market-start',
        schemaVersion: '1.0',
        locationId: 'location-start',
        name: 'Start Market',
        statusText: 'Open',
        goods: [
          {
            goodId: 'good-grain',
            availableQuantity: 10,
            buyMultiplierBps: 10_000,
            sellMultiplierBps: 9_000,
            trend: 'same',
            note: 'Stable',
          },
        ],
      },
    ],
  },
  'routes.json': {
    schemaVersion: '1.0',
    items: [
      {
        id: 'route-start-end',
        schemaVersion: '1.0',
        fromLocationId: 'location-start',
        toLocationId: 'location-end',
        name: 'Main Road',
        distanceMiles: 10,
        estimatedDays: 1,
        terrain: ['road'],
        risk: 'low',
        supplyCostCents: 100,
        demandClue: 'Grain is needed.',
        path: 'M10 20 L80 20',
      },
    ],
  },
  'events.json': {
    schemaVersion: '1.0',
    items: [
      {
        id: 'event-clear-road',
        schemaVersion: '1.0',
        type: 'positive',
        title: 'Clear Road',
        icon: '+',
        story: 'The road is clear.',
        facts: ['Travel can continue.'],
        choices: [
          {
            id: 'continue',
            label: 'Continue',
            description: 'Keep moving.',
            cashChangeCents: 0,
            dayChange: 0,
            riskLabel: 'Low risk',
            outcome: 'The cart continues.',
          },
        ],
      },
    ],
  },
  'reports.json': {
    schemaVersion: '1.0',
    items: [
      {
        id: 'report-decision',
        schemaVersion: '1.0',
        title: 'Decision',
        prompt: 'Explain the decision.',
        evidenceMinimum: 1,
      },
    ],
  },
};
