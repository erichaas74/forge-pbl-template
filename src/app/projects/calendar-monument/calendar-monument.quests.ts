import type { EngineeringSessionQuest } from '../../templates/engineering-design/domain/engineering-preview.models';

/**
 * Level challenges for each weekly session: carvings, gems, win conditions and reveal animations only.
 * Shadow levels use carved animal and symbol medallions that fill with inlay when the shadow tip
 * reaches them; light levels wake gems only where real sunlight lands.
 * Questions, hints and explanations belong to the separate AI tutor.
 * Positions come from the bundled solar and optical model at Colorado Springs, 2026.
 * Verify with: node scripts/check-solar-quests.cjs
 */
const march = '2026-03-20';
const june = '2026-06-21';
const september = '2026-09-22';
const december = '2026-12-21';
const round = (value: number) => Math.round(value * 1000) / 1000;

interface CarvedMark {
  readonly id: string;
  readonly label: string;
  readonly symbol: string;
  readonly color: string;
  readonly x: number;
  readonly z: number;
  readonly size: number;
  readonly radius: number;
  readonly minutes?: number;
  readonly rule?: 'noon';
  readonly date?: string;
  readonly required?: boolean;
}

/** Shadow-tip positions of the 80 cm post on June 21: morning animals, the noon sun, evening animals. */
const hourMarks: readonly CarvedMark[] = [
  {
    id: 'rooster',
    label: 'Rooster',
    symbol: 'rooster',
    color: 'amber',
    x: -1.649,
    z: 0.305,
    size: 0.34,
    radius: 0.06,
    minutes: 480,
    required: false,
  },
  {
    id: 'rabbit',
    label: 'Rabbit',
    symbol: 'rabbit',
    color: 'amber',
    x: -1.057,
    z: 0.033,
    size: 0.32,
    radius: 0.07,
    minutes: 540,
  },
  {
    id: 'bee',
    label: 'Bee',
    symbol: 'bee',
    color: 'gold',
    x: -0.694,
    z: -0.101,
    size: 0.26,
    radius: 0.06,
    minutes: 600,
    required: false,
  },
  {
    id: 'butterfly',
    label: 'Butterfly',
    symbol: 'butterfly',
    color: 'emerald',
    x: -0.428,
    z: -0.172,
    size: 0.22,
    radius: 0.06,
    minutes: 660,
    required: false,
  },
  {
    id: 'sun',
    label: 'Sun',
    symbol: 'sun',
    color: 'gold',
    x: 0.003,
    z: -0.22,
    size: 0.18,
    radius: 0.07,
    rule: 'noon',
  },
  {
    id: 'turtle',
    label: 'Turtle',
    symbol: 'turtle',
    color: 'emerald',
    x: 0.197,
    z: -0.21,
    size: 0.18,
    radius: 0.05,
    minutes: 840,
    required: false,
  },
  {
    id: 'fox',
    label: 'Fox',
    symbol: 'fox',
    color: 'ruby',
    x: 0.417,
    z: -0.175,
    size: 0.2,
    radius: 0.07,
    minutes: 900,
  },
  {
    id: 'owl',
    label: 'Owl',
    symbol: 'owl',
    color: 'amethyst',
    x: 0.681,
    z: -0.105,
    size: 0.24,
    radius: 0.06,
    minutes: 960,
    required: false,
  },
];

/** A carved hour line from the post toward each medallion. */
const hourLine = (mark: CarvedMark) => {
  const distance = Math.hypot(mark.x, mark.z),
    inner = 0.09,
    outer = distance - mark.size / 2 - 0.01;
  return {
    kind: 'line',
    from: [round((mark.x * inner) / distance), round((mark.z * inner) / distance)],
    to: [round((mark.x * outer) / distance), round((mark.z * outer) / distance)],
    width: 0.012,
    color: mark.color,
  };
};

const animalClock: EngineeringSessionQuest = {
  id: 'animal-clock',
  title: 'The Animal Sun Clock',
  kind: 'shadow-tip',
  goal: 'Make the shadow tip touch the rabbit, the sun and the fox.',
  postHeight: 0.8,
  tolerance: 0.03,
  marks: hourMarks,
  carvings: [{ kind: 'plate', x: 0, z: 0, radius: 2.4, color: 'gold' }, ...hourMarks.map(hourLine)],
  controls: ['noon'],
  tools: ['post'],
  reveal: { style: 'daylapse', title: 'The Animal Sun Clock wakes!' },
};

/** Solar-noon shadow tips of the 80 cm post through the year. */
const seasonMarks: readonly CarvedMark[] = [
  {
    id: 'june-sunflower',
    label: 'Sunflower',
    symbol: 'sunflower',
    color: 'gold',
    x: 0.003,
    z: -0.22,
    size: 0.18,
    radius: 0.07,
    rule: 'noon',
    date: june,
  },
  {
    id: 'equinox-leaf',
    label: 'Leaf',
    symbol: 'leaf',
    color: 'emerald',
    x: 0.004,
    z: -0.642,
    size: 0.26,
    radius: 0.07,
    rule: 'noon',
    date: march,
  },
  {
    id: 'mystery-owl',
    label: 'Mystery owl',
    symbol: 'owl',
    color: 'amethyst',
    x: 0,
    z: -1.1,
    size: 0.28,
    radius: 0.07,
  },
  {
    id: 'december-snowflake',
    label: 'Snowflake',
    symbol: 'snowflake',
    color: 'sapphire',
    x: 0.007,
    z: -1.522,
    size: 0.3,
    radius: 0.07,
    rule: 'noon',
    date: december,
  },
];

const seasonLine: EngineeringSessionQuest = {
  id: 'season-line',
  title: 'The Season Line',
  kind: 'shadow-tip',
  goal: 'Make the solar-noon shadow tip touch all four season symbols.',
  postHeight: 0.8,
  tolerance: 0.03,
  marks: seasonMarks,
  carvings: [
    { kind: 'plate', x: 0, z: 0, radius: 2.2, color: 'gold' },
    { kind: 'line', from: [0, -0.1], to: [0, -1.72], width: 0.03, color: 'gold' },
  ],
  controls: ['seasons', 'days', 'noon'],
  tools: ['post'],
  reveal: { style: 'year', from: march, title: 'The Season Line comes alive!' },
};

const keptGates = [
  { blockId: 'receiving-pillar', x: -0.5, z: 0 },
  { blockId: 'summer-window', aperture: true },
  { blockId: 'winter-window', aperture: true },
];

const summerBeam: EngineeringSessionQuest = {
  id: 'summer-beam',
  title: 'Catch the Summer Beam',
  kind: 'light',
  goal: 'Light the gold gem 30 minutes after sunrise on June 21.',
  gems: [
    {
      id: 'summer-sun-gem',
      label: 'Summer sun gem',
      color: 'gold',
      targetId: 'summer-carving',
      light: 'sunlight',
      date: june,
      rule: 'morning',
      within: 20,
    },
  ],
  keep: keptGates,
  carvings: [
    { kind: 'line', from: [-0.35, -0.2], to: [2.33, -1.55], width: 0.04, color: 'gold' },
    { kind: 'rays', x: -0.5, z: 0, radius: 0.9, inner: 0.55, count: 16, color: 'amber' },
  ],
  controls: ['days'],
  tools: ['build'],
  reveal: { style: 'beam', title: 'The summer beam strikes!' },
};

const winterWindow: EngineeringSessionQuest = {
  id: 'winter-window',
  title: 'Winter Light',
  kind: 'edge',
  goal: 'Light the sapphire on December 21, then find the first and last mornings it glows.',
  gems: [
    {
      id: 'winter-sapphire',
      label: 'winter sapphire',
      color: 'sapphire',
      targetId: 'winter-carving',
      light: 'sunlight',
      date: december,
      rule: 'morning',
      window: 30,
    },
  ],
  keep: keptGates,
  carvings: [
    { kind: 'line', from: [-0.35, 0.2], to: [1.37, 2.66], width: 0.04, color: 'sapphire' },
    { kind: 'rays', x: -0.5, z: 0, radius: 0.9, inner: 0.55, count: 16, color: 'sapphire' },
  ],
  controls: ['days'],
  reveal: { style: 'beam', title: 'The winter window is found!' },
};

const rainbowPetals: EngineeringSessionQuest = {
  id: 'rainbow-petals',
  title: 'The Rainbow Petals',
  kind: 'light',
  together: true,
  goal: 'Light all three petals at the same moment on March 20.',
  gems: [
    {
      id: 'ruby-petal',
      label: 'Ruby petal',
      color: 'ruby',
      x: -0.508,
      z: -0.646,
      light: 'red light',
      date: march,
    },
    {
      id: 'sapphire-petal',
      label: 'Sapphire petal',
      color: 'sapphire',
      x: 0.242,
      z: -0.646,
      light: 'blue light',
      date: march,
    },
    {
      id: 'amber-petal',
      label: 'Amber petal',
      color: 'amber',
      x: 0.992,
      z: -0.646,
      light: 'amber light',
      date: march,
    },
  ],
  carvings: [
    { kind: 'ring', x: -0.508, z: -0.646, radius: 0.2, color: 'ruby' },
    { kind: 'ring', x: 0.242, z: -0.646, radius: 0.2, color: 'sapphire' },
    { kind: 'ring', x: 0.992, z: -0.646, radius: 0.2, color: 'amber' },
    { kind: 'line', from: [-0.9, -0.646], to: [1.4, -0.646], width: 0.02, color: 'gold' },
  ],
  controls: ['noon'],
  reveal: { style: 'bloom', title: 'The Rainbow Petals bloom!' },
};

const winterGallery: EngineeringSessionQuest = {
  id: 'winter-gallery',
  title: 'The Mixed-Up Winter Gallery',
  kind: 'light',
  together: true,
  goal: 'Light each gem with its own color at December solar noon.',
  gems: [
    {
      id: 'west-amber',
      label: 'Amber gem',
      color: 'amber',
      x: -0.743,
      z: -1.522,
      light: 'amber light',
      date: december,
    },
    {
      id: 'middle-sapphire',
      label: 'Sapphire gem',
      color: 'sapphire',
      x: 0.007,
      z: -1.522,
      light: 'blue light',
      date: december,
    },
    {
      id: 'east-ruby',
      label: 'Ruby gem',
      color: 'ruby',
      x: 0.757,
      z: -1.522,
      light: 'red light',
      date: december,
    },
  ],
  carvings: [
    { kind: 'ring', x: -0.743, z: -1.522, radius: 0.2, color: 'amber' },
    { kind: 'ring', x: 0.007, z: -1.522, radius: 0.2, color: 'sapphire' },
    { kind: 'ring', x: 0.757, z: -1.522, radius: 0.2, color: 'ruby' },
    { kind: 'line', from: [-1.1, -1.522], to: [1.1, -1.522], width: 0.02, color: 'gold' },
  ],
  controls: ['noon'],
  tools: ['build'],
  reveal: { style: 'bloom', title: 'The gallery glows!' },
};

const circleCarvings = [
  { kind: 'ring', x: 0, z: 0, radius: 2.6, width: 0.04, color: 'gold' },
  { kind: 'rays', x: 0, z: 0, radius: 2.55, inner: 2.35, count: 24, color: 'amber' },
];

const calendarStones: EngineeringSessionQuest = {
  id: 'calendar-stones',
  title: 'Carve the Calendar Stones',
  kind: 'markers',
  goal: 'Carve stones where the blue beam lands at March noon and the amber beam lands at June noon.',
  gems: [
    {
      id: 'equinox-sapphire',
      label: 'March sapphire stone',
      color: 'sapphire',
      date: march,
      rule: 'noon',
      light: 'blue light',
    },
    {
      id: 'june-topaz',
      label: 'June topaz stone',
      color: 'amber',
      date: june,
      rule: 'noon',
      light: 'amber light',
    },
  ],
  carvings: circleCarvings,
  controls: ['seasons', 'noon'],
  tools: ['markers'],
  reveal: { style: 'burst', title: 'The calendar stones awaken!' },
};

const yearOfLight: EngineeringSessionQuest = {
  id: 'year-of-light',
  title: 'A Year of Light',
  kind: 'markers',
  goal: 'Light a stone on all four seasonal dates. Add a stone for the ruby beam at December noon.',
  gems: [
    {
      id: 'equinox-sapphire',
      label: 'March sapphire stone',
      color: 'sapphire',
      date: march,
      rule: 'noon',
      light: 'blue light',
    },
    {
      id: 'june-topaz',
      label: 'June topaz stone',
      color: 'amber',
      date: june,
      rule: 'noon',
      light: 'amber light',
    },
    {
      id: 'september-sapphire',
      label: 'September sapphire stone',
      color: 'sapphire',
      date: september,
      rule: 'noon',
      light: 'blue light',
    },
    {
      id: 'december-ruby',
      label: 'December ruby stone',
      color: 'ruby',
      date: december,
      rule: 'noon',
      light: 'red light',
    },
  ],
  carvings: circleCarvings,
  controls: ['seasons', 'noon'],
  tools: ['markers'],
  reveal: { style: 'year', from: march, title: 'Your solar calendar works!' },
};

export const calendarMonumentQuests = {
  animalClock,
  seasonLine,
  summerBeam,
  winterWindow,
  rainbowPetals,
  winterGallery,
  calendarStones,
  yearOfLight,
} as const;
