import type {
  BlockDesign,
  DesignBlock,
  DesignCheck,
  DesignTarget,
} from '../../shared/engineering/block-design';

/** Fixed classroom geometry; independently checked against the bundled solar model. */
export const solsticeGateSite = {
  latitude: 38.83,
  longitude: -104.82,
  zone: 'America/Denver',
  localDate: '2026-06-21',
};
// Sun centre, 30 minutes after the model's sunrise event, Colorado Springs, 2026.
export const solsticeGateSun = {
  summer: { bearing: 63.28835276727858, altitude: 4.451833497848568 },
  winter: { bearing: 124.91145318850852, altitude: 4.283907546270092 },
};
const rounded = (n: number) => Math.round(n * 100000) / 100000;
const receiver = (season: 'summer' | 'winter'): DesignTarget => ({
  id: season + '-carving',
  label: season === 'summer' ? 'Summer carving' : 'Winter carving',
  x: -0.35,
  z: season === 'summer' ? -0.2 : 0.2,
  y: rounded(0.8 - 3 * Math.tan((solsticeGateSun[season].altitude * Math.PI) / 180)),
  normal: [1, 0, 0],
});
function gate(season: 'summer' | 'winter'): DesignBlock[] {
  const target = receiver(season),
    bearing = (solsticeGateSun[season].bearing * Math.PI) / 180;
  const rotation = 180 - solsticeGateSun[season].bearing;
  const x = rounded(target.x + 3 * Math.sin(bearing)),
    z = rounded(target.z - 3 * Math.cos(bearing));
  return [
    {
      id: season + '-window',
      label: season === 'summer' ? 'Summer window' : 'Winter window',
      x,
      z,
      y: 0,
      width: 1.4,
      height: 1.6,
      depth: 0.25,
      rotation,
      aperture: { axis: 'z', diameter: 0.18, insert: 'open', color: 'clear' },
    },
  ];
}
export const solsticeGatesDesign: BlockDesign = {
  blocks: [
    ...gate('summer'),
    ...gate('winter'),
    {
      id: 'receiving-pillar',
      label: 'Central receiving pillar',
      x: -0.5,
      y: 0,
      z: 0,
      width: 0.3,
      height: 1.2,
      depth: 0.8,
      rotation: 0,
    },
  ],
  targets: [
    receiver('summer'),
    receiver('winter'),
    { id: 'observer', label: 'Center · face east', x: 0, z: 0 },
  ],
};
/** First challenge: only the summer window needs moving; the receiver and marks stay fixed. */
export const solsticeGatesStarter: BlockDesign = {
  ...solsticeGatesDesign,
  blocks: solsticeGatesDesign.blocks.map((block) =>
    block.id === 'summer-window' ? { ...block, z: block.z + 0.4 } : block,
  ),
};
export const solsticeGatesChecks: readonly DesignCheck[] = [
  {
    scenarioId: 'march',
    targetId: 'observer',
    expectedValue: 'sunlight',
    settings: { observationRule: 'morning' },
  },
  {
    scenarioId: 'june',
    targetId: 'summer-carving',
    expectedValue: 'sunlight',
    settings: { observationRule: 'morning' },
  },
  {
    scenarioId: 'sept',
    targetId: 'observer',
    expectedValue: 'sunlight',
    settings: { observationRule: 'morning' },
  },
  {
    scenarioId: 'dec',
    targetId: 'winter-carving',
    expectedValue: 'sunlight',
    settings: { observationRule: 'morning' },
  },
];
