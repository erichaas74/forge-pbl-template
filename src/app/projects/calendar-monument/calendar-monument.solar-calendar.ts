import type { BlockDesign, DesignBlock, DesignCheck } from '../../shared/engineering/block-design';

/** Original classroom design inspired by stone circles, not a reconstruction of Stonehenge. */
const gate = (id: string, x: number, z: number, rotation = 0): DesignBlock[] => {
  const angle = (rotation * Math.PI) / 180;
  return [
    ...[-1, 1].map((side) => ({
      id: `${id}-post-${side < 0 ? 'left' : 'right'}`,
      x: x + side * 0.36 * Math.cos(angle),
      y: 0,
      z: z - side * 0.36 * Math.sin(angle),
      width: 0.2,
      height: 1,
      depth: 0.3,
      rotation,
    })),
    { id: `${id}-lintel`, x, y: 1, z, width: 0.96, height: 0.08, depth: 0.5, rotation },
  ];
};

const jeweledGate = (id: string, x: number, z: number, color: 'amber' | 'blue' | 'red') =>
  gate(id, x, z).map((block, i): DesignBlock =>
    i === 2
      ? {
          ...block,
          aperture: { axis: 'y', diameter: color === 'blue' ? 0.18 : 0.32, insert: 'jewel', color },
        }
      : block,
  );

export const solarCalendarStonework: readonly DesignBlock[] = [
  ...jeweledGate('amber-gate', -1.3, 0.6, 'amber'),
  ...jeweledGate('blue-gate', 0, 1.3, 'blue'),
  ...jeweledGate('ruby-gate', 1.3, 0.6, 'red'),
  ...gate('west-gate', -1.9, -0.45, 90),
  ...gate('northwest-gate', -1.25, -1.5, 135),
  ...gate('north-gate', 0, -1.95),
  ...gate('northeast-gate', 1.25, -1.5, 225),
  ...gate('east-gate', 1.9, -0.45, 90),
];

/** New learners receive the stonework; they must locate and test their own seasonal markers. */
export const solarCalendarStarter: BlockDesign = { blocks: solarCalendarStonework, targets: [] };

/** Fixed, measured markers for Colorado Springs, 2026, at local solar noon. */
export const solarCalendarDesign: BlockDesign = {
  blocks: [
    ...solarCalendarStonework,
    {
      id: 'sunkeeper-base',
      x: 0,
      y: 0,
      z: -0.5,
      width: 0.9,
      height: 0.12,
      depth: 0.9,
      rotation: 0,
    },
    {
      id: 'sunkeeper-step',
      x: 0,
      y: 0.12,
      z: -0.5,
      width: 0.68,
      height: 0.12,
      depth: 0.68,
      rotation: 0,
    },
    ...[
      { id: 'emerald', x: -2.25, z: 1.55, rotation: 45, color: 'green', insert: 'jewel' },
      { id: 'violet', x: 2.25, z: 1.55, rotation: 315, color: 'violet', insert: 'jewel' },
      { id: 'west-eye', x: -2.25, z: -1.55, rotation: 135, color: 'clear', insert: 'open' },
      { id: 'east-eye', x: 2.25, z: -1.55, rotation: 225, color: 'clear', insert: 'open' },
    ].flatMap((stone): DesignBlock[] => [
      {
        id: stone.id + '-foot',
        x: stone.x,
        y: 0,
        z: stone.z,
        width: 0.72,
        height: 0.12,
        depth: 0.52,
        rotation: stone.rotation,
      },
      {
        id: stone.id + '-window',
        x: stone.x,
        y: 0.12,
        z: stone.z,
        width: 0.55,
        height: 1.4,
        depth: 0.24,
        rotation: stone.rotation,
        aperture: {
          axis: 'z',
          diameter: 0.34,
          insert: stone.insert as 'jewel' | 'open',
          color: stone.color as 'green' | 'violet' | 'clear',
        },
      },
    ]),
  ],
  displayObject: {
    model: 'crystal',
    material: 'bronze',
    x: 0,
    y: 0.24,
    z: -0.5,
    width: 0.54,
    height: 1.45,
    rotation: 45,
  },
  targets: [
    { id: 'june', label: 'June · amber light', x: -1.3, z: 0.315 },
    { id: 'equinox', label: 'Equinoxes · blue light', x: 0, z: 0.463 },
    { id: 'december', label: 'December · ruby light', x: 1.3, z: -1.371 },
  ],
};

export const solarCalendarChecks: readonly DesignCheck[] = [
  { scenarioId: 'march', targetId: 'equinox', expectedValue: 'blue light' },
  { scenarioId: 'june', targetId: 'june', expectedValue: 'amber light' },
  { scenarioId: 'sept', targetId: 'equinox', expectedValue: 'blue light' },
  { scenarioId: 'dec', targetId: 'december', expectedValue: 'red light' },
];

export const solarCalendarSite = {
  latitude: 38.83,
  longitude: -104.82,
  zone: 'America/Denver',
  localDate: '2026-03-20',
};
