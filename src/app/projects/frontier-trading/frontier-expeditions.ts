import type {
  ExpeditionCourse,
  ExpeditionHazard,
} from '../../templates/simulation-decision/domain/expedition-course.models';

const storm: ExpeditionHazard = {
  id: 'weather',
  kind: 'winter-storm',
  title: 'Storm on the trail',
  description: 'Rain lashes the wagon. Protect the load or spend time waiting for clear skies.',
  afterLeg: 0,
  day: 1,
  choices: [
    { id: 'cover', label: 'Buy waterproof covers', costCents: 1200, delayDays: 0, lossUnits: 0 },
    { id: 'shelter', label: 'Shelter for two days', costCents: 400, delayDays: 2, lossUnits: 0 },
    { id: 'push', label: 'Push through the rain', costCents: 0, delayDays: 0, lossUnits: 2 },
  ],
};
const attack: ExpeditionHazard = {
  id: 'attack',
  kind: 'conflict',
  title: 'Raiders block the road',
  description:
    'A raiding party threatens the cargo. Choose an escort, take the long way, or surrender two goods.',
  afterLeg: 1,
  day: 1,
  choices: [
    { id: 'escort', label: 'Hire a guard escort', costCents: 2000, delayDays: 0, lossUnits: 0 },
    { id: 'detour', label: 'Take a hidden detour', costCents: 800, delayDays: 2, lossUnits: 0 },
    { id: 'surrender', label: 'Surrender two goods', costCents: 0, delayDays: 0, lossUnits: 2 },
  ],
};
const flood: ExpeditionHazard = {
  id: 'flood',
  kind: 'flood',
  title: 'Flooded crossing',
  description:
    'Floodwater covers the crossing ahead. A ferry protects the cargo; waiting is slower; fording damages three goods.',
  afterLeg: 2,
  day: 1,
  choices: [
    { id: 'ferry', label: 'Pay for the ferry', costCents: 2800, delayDays: 0, lossUnits: 0 },
    { id: 'wait', label: 'Wait for the water to fall', costCents: 600, delayDays: 3, lossUnits: 0 },
    { id: 'ford', label: 'Ford the floodwater', costCents: 0, delayDays: 1, lossUnits: 3 },
  ],
};
const pair = (routeId: string, days: number, costCents: number) => [
  { routeId, days, costCents },
  { routeId: `${routeId}-return`, days, costCents },
];
export const frontierExpeditions: ExpeditionCourse = {
  capability: 'roundTripTrading',
  cycles: [
    {
      id: 'first-trip',
      title: 'The first round trip',
      budgetCents: 20000,
      capacity: 20,
      goodIds: ['flour', 'salt', 'dried-beans'],
      requiredLocationIds: ['fort-bridger'],
      legs: pair('route-northern', 1, 600),
      hazards: [],
    },
    {
      id: 'weather-trip',
      title: 'The longer supply run',
      budgetCents: 30000,
      capacity: 28,
      goodIds: ['flour', 'salt', 'cloth', 'rope'],
      requiredLocationIds: ['fort-laramie'],
      legs: [...pair('route-northern', 2, 900), ...pair('route-bridger-laramie', 3, 1400)],
      hazards: [storm],
    },
    {
      id: 'raider-trip',
      title: 'The high-country trade',
      budgetCents: 40000,
      capacity: 34,
      goodIds: ['flour', 'salt', 'cloth', 'iron-tools'],
      requiredLocationIds: ['miners-camp'],
      legs: [
        ...pair('route-northern', 2, 900),
        ...pair('route-bridger-pass', 3, 1400),
        ...pair('route-pass-miners', 3, 1800),
        ...pair('route-south-pass', 5, 2500),
      ],
      hazards: [storm, attack],
    },
    {
      id: 'flood-trip',
      title: 'The resilient trading company',
      budgetCents: 50000,
      capacity: 40,
      goodIds: ['flour', 'salt', 'rope', 'iron-tools', 'cloth'],
      requiredLocationIds: ['fort-laramie', 'miners-camp'],
      legs: [
        ...pair('route-northern', 2, 900),
        ...pair('route-bridger-river', 3, 1500),
        ...pair('route-river-laramie', 3, 1600),
        ...pair('route-laramie-miners', 4, 2200),
        ...pair('route-laramie', 5, 2300),
      ],
      hazards: [storm, attack, flood],
    },
  ],
};
