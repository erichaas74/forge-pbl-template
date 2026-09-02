export interface PhysicalTestDefinition {
  id: 'appearance' | 'solubility' | 'conductivity' | 'texture';
  title: string;
  instrument: string;
  scenePosition: string;
  prompt: string;
}

export interface ReactionTestDefinition {
  id: 'solution-a' | 'indicator-b';
  title: string;
  scenePosition: string;
  prompt: string;
}

export const physicalTests: readonly PhysicalTestDefinition[] = [
  {
    id: 'appearance',
    title: 'Optical scan',
    instrument: '6× magnifier',
    scenePosition: 'left top',
    prompt: 'Compare particle shape under equal lighting.',
  },
  {
    id: 'solubility',
    title: 'Water trial',
    instrument: '50 mL water cup',
    scenePosition: 'right top',
    prompt: 'Use equal mass, water volume, and mixing time.',
  },
  {
    id: 'conductivity',
    title: 'Probe trial',
    instrument: 'Calibrated probe',
    scenePosition: 'left bottom',
    prompt: 'Measure only after the same water trial.',
  },
  {
    id: 'texture',
    title: 'Surface scan',
    instrument: 'Non-contact scanner',
    scenePosition: 'right bottom',
    prompt: 'Compare particle size without touching the unknown.',
  },
];

export const physicalOutcomeTable: Readonly<Record<string, Record<string, unknown>>> = {
  'vial-a::appearance': {
    reading: 'Coarse clear-edged crystals',
    magnification: '6×',
    lighting: 'equal white light',
  },
  'vial-b::appearance': {
    reading: 'Smaller sparkling crystals',
    magnification: '6×',
    lighting: 'equal white light',
  },
  'vial-c::appearance': {
    reading: 'Fine white powder',
    magnification: '6×',
    lighting: 'equal white light',
  },
  'vial-d::appearance': {
    reading: 'Very fine white powder',
    magnification: '6×',
    lighting: 'equal white light',
  },
  'vial-a::solubility': {
    reading: 'Water clears after mixing',
    elapsedSeconds: 14,
    settledLayer: 'none at 60 s',
  },
  'vial-b::solubility': {
    reading: 'Water clears after mixing',
    elapsedSeconds: 19,
    settledLayer: 'none at 60 s',
  },
  'vial-c::solubility': {
    reading: 'Cloudy at first; mostly clear',
    elapsedSeconds: 11,
    settledLayer: 'none at 60 s',
  },
  'vial-d::solubility': {
    reading: 'Cloudy suspension remains',
    elapsedSeconds: 60,
    settledLayer: 'thin layer begins',
  },
  'vial-a::conductivity': {
    reading: 'Probe bar rises and lamp glows',
    millisiemens: 8.7,
    calibration: 'passed',
  },
  'vial-b::conductivity': {
    reading: 'Probe bar stays near baseline',
    millisiemens: 0.1,
    calibration: 'passed',
  },
  'vial-c::conductivity': {
    reading: 'Probe bar rises and lamp glows',
    millisiemens: 6.4,
    calibration: 'passed',
  },
  'vial-d::conductivity': {
    reading: 'Probe bar stays near baseline',
    millisiemens: 0.1,
    calibration: 'passed',
  },
  'vial-a::texture': {
    reading: 'Large angular grains',
    particleBand: '0.7–1.5 mm',
    contact: 'none',
  },
  'vial-b::texture': {
    reading: 'Small faceted grains',
    particleBand: '0.3–0.8 mm',
    contact: 'none',
  },
  'vial-c::texture': {
    reading: 'Fine, even particles',
    particleBand: '0.05–0.2 mm',
    contact: 'none',
  },
  'vial-d::texture': {
    reading: 'Very fine clustered particles',
    particleBand: '<0.1 mm',
    contact: 'none',
  },
};

export const reactionTests: readonly ReactionTestDefinition[] = [
  {
    id: 'solution-a',
    title: 'Solution A',
    scenePosition: 'left center',
    prompt: 'Add 5 mL to equal 2 g samples in closed vessels.',
  },
  {
    id: 'indicator-b',
    title: 'Indicator B',
    scenePosition: 'right center',
    prompt: 'Add three drops under equal lighting.',
  },
];

export const reactionOutcomeTable: Readonly<Record<string, Record<string, unknown>>> = {
  'vial-a::solution-a': {
    gas: 'none visible',
    temperatureBefore: 22,
    temperatureAfter: 22,
    colorBefore: 'clear',
    colorAfter: 'clear',
  },
  'vial-b::solution-a': {
    gas: 'none visible',
    temperatureBefore: 22,
    temperatureAfter: 22,
    colorBefore: 'clear',
    colorAfter: 'clear',
  },
  'vial-c::solution-a': {
    gas: 'rapid bubbles for 18 s',
    temperatureBefore: 22,
    temperatureAfter: 19,
    colorBefore: 'clear',
    colorAfter: 'clear',
  },
  'vial-d::solution-a': {
    gas: 'none visible',
    temperatureBefore: 22,
    temperatureAfter: 22,
    colorBefore: 'cloudy',
    colorAfter: 'cloudy',
  },
  'vial-a::indicator-b': {
    gas: 'none visible',
    temperatureBefore: 22,
    temperatureAfter: 22,
    colorBefore: 'amber',
    colorAfter: 'amber',
  },
  'vial-b::indicator-b': {
    gas: 'none visible',
    temperatureBefore: 22,
    temperatureAfter: 22,
    colorBefore: 'amber',
    colorAfter: 'golden tan',
  },
  'vial-c::indicator-b': {
    gas: 'none visible',
    temperatureBefore: 22,
    temperatureAfter: 22,
    colorBefore: 'amber',
    colorAfter: 'light tan',
  },
  'vial-d::indicator-b': {
    gas: 'none visible',
    temperatureBefore: 22,
    temperatureAfter: 22,
    colorBefore: 'amber',
    colorAfter: 'dark blue-black',
  },
};

export const conservationTrials = [
  {
    id: 'closed',
    title: 'Closed chamber',
    system: 'sealed',
    beforeMass: 126.4,
    afterMass: 126.4,
    beforeParticles: 24,
    afterParticles: 24,
    observation: 'Gas remains inside the sealed chamber.',
  },
  {
    id: 'open',
    title: 'Open chamber',
    system: 'open',
    beforeMass: 124.8,
    afterMass: 123.5,
    beforeParticles: 24,
    afterParticles: 19,
    observation: 'Gas particles move beyond the measured container.',
  },
] as const;

export const recoveredLabels = [
  {
    id: 'salt',
    title: 'Table Salt',
    handling: 'Dry-goods shelf · sealed container',
  },
  {
    id: 'sugar',
    title: 'Sugar',
    handling: 'Dry-goods shelf · sealed container',
  },
  {
    id: 'baking-soda',
    title: 'Baking Soda',
    handling: 'Keep dry and clearly labeled',
  },
  { id: 'cornstarch', title: 'Cornstarch', handling: 'Keep dry and sealed' },
] as const;

export const shelfZones = [
  {
    id: 'crystal',
    title: 'Crystal shelf',
    note: 'For verified crystal materials',
  },
  {
    id: 'powder',
    title: 'Powder shelf',
    note: 'For verified powder materials',
  },
  {
    id: 'retest',
    title: 'Retest tray',
    note: 'For evidence that still disagrees',
  },
  {
    id: 'review',
    title: 'Teacher review',
    note: 'For unresolved identity or handling questions',
  },
] as const;

export const handlingRecommendations = [
  {
    id: 'normal',
    title: 'Normal lab precautions',
    note: 'Keep sealed, labeled, and teacher supervised.',
  },
  {
    id: 'contain',
    title: 'Contain for confirmation',
    note: 'Keep sealed until an adult confirms the evidence.',
  },
  {
    id: 'study',
    title: 'Collect another trial',
    note: 'Repeat a controlled test before deciding.',
  },
] as const;
