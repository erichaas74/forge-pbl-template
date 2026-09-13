import type { TradeWorldDefinition } from '../../templates/simulation-decision/domain/trade-world.models';

/** Fictional practice scenarios, not reenactments of specific historical incidents. */
export const frontierTradeWorld: TradeWorldDefinition = {
  timing: 'turn-based',
  tickIntervalMs: 20000,
  eventEveryTicks: 3,
  events: [
    {
      id: 'winter-supply-storm',
      kind: 'winter-storm',
      title: 'Winter storm closes the high roads',
      description:
        'Snow blocks supply wagons. Fort and camp stores raise prices on warm cloth, food and lantern oil until the storm clears.',
      locationIds: ['fort-bridger', 'south-pass', 'miners-camp'],
      goodIds: ['cloth', 'flour', 'dried-beans', 'lantern-oil'],
      priceChangeBps: 3000,
      durationTicks: 4,
    },
    {
      id: 'green-river-flood',
      kind: 'flood',
      title: 'Floodwater disrupts river deliveries',
      description:
        'Flooded crossings delay freight. Rope, tools and preserved food become harder to find at the river and nearby fort.',
      locationIds: ['river-crossing', 'fort-laramie'],
      goodIds: ['rope', 'iron-tools', 'dried-beans', 'salt'],
      priceChangeBps: 2500,
      durationTicks: 5,
    },
    {
      id: 'crossing-passage-conflict',
      kind: 'conflict',
      title: 'Raid at a disputed crossing',
      description:
        'In this fictional scenario, a small Native war party attacks a freight wagon after a dispute over passage through Native land. Local Native traders seek safe passage for everyone. Delayed shipments raise supply prices.',
      locationIds: ['independence-post', 'fort-laramie'],
      goodIds: ['flour', 'cloth', 'rope'],
      priceChangeBps: 2000,
      durationTicks: 3,
    },
  ],
  shipments: [
    {
      id: 'valley-freight',
      name: 'Valley Freight',
      routeId: 'route-river-laramie',
      goodIds: ['rope', 'iron-tools', 'dried-beans', 'salt'],
      quantity: 6,
      travelTicks: 3,
      startOffset: 0,
      priceDropBps: 2000,
      reliefTicks: 4,
    },
    {
      id: 'fort-provisions',
      name: 'Fort Provisions',
      routeId: 'route-northern',
      goodIds: ['flour', 'cloth', 'lantern-oil'],
      quantity: 8,
      travelTicks: 4,
      startOffset: 1,
      priceDropBps: 2000,
      reliefTicks: 4,
    },
    {
      id: 'native-trade-caravan',
      name: 'Native Trade Caravan',
      routeId: 'route-bridger-pass',
      goodIds: ['cloth', 'dried-beans', 'salt'],
      quantity: 5,
      travelTicks: 3,
      startOffset: 1,
      priceDropBps: 1500,
      reliefTicks: 3,
    },
    {
      id: 'camp-supplies',
      name: 'Camp Supply Company',
      routeId: 'route-laramie-miners',
      goodIds: ['iron-tools', 'lantern-oil', 'flour'],
      quantity: 7,
      travelTicks: 5,
      startOffset: 0,
      priceDropBps: 2500,
      reliefTicks: 4,
    },
  ],
};
