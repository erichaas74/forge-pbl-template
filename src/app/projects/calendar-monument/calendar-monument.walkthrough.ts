import type {
  DesignWalkthroughSetup,
  DesignWalkthroughTask,
} from '../../shared/engineering/design-walkthrough';

const view = (season: string, extra: DesignWalkthroughSetup = {}): DesignWalkthroughSetup => ({
  latitude: 38.83,
  longitude: -104.82,
  year: 2026,
  season,
  rule: 'noon',
  camera: 'top',
  ...extra,
});
const mark = { label: 'Place a mark at the shadow tip', command: 'markDial' };
const length = { label: 'Distance from the post to its shadow tip', unit: 'cm' };
const record = { label: 'Save this observation', command: 'capture' };
const summer = view('june', {
  rule: 'morning',
  camera: 'target',
  targetId: 'summer-carving',
  blockId: 'summer-window',
});
const winter = view('dec', { rule: 'morning', camera: 'target', targetId: 'winter-carving' });

export const sundialWalkthrough: readonly DesignWalkthroughTask[] = [
  {
    id: 'post',
    title: 'Place your vertical post',
    instruction:
      'Use a level base and a 60 cm upright post. The model is set to Colorado Springs. Keep the post and location fixed for the whole investigation.',
    lookFor:
      'Find the post, its shadow, and the glowing ring at the shadow tip. North is marked on the base.',
    setup: view('june', { rule: 'clock', minutes: 540, camera: 'angle' }),
    actions: [{ label: 'Place the 60 cm post', command: 'post', value: 60 }],
  },
  {
    id: 'morning',
    title: 'Mark the morning shadow',
    instruction:
      'It is 9:00 a.m. Measure from the base of the post to the glowing shadow tip. Read the live measurement below, enter the distance, then place a mark.',
    lookFor: 'The shadow points away from the Sun. Your mark will stay in place when time changes.',
    setup: view('june', { rule: 'clock', minutes: 540 }),
    actions: [mark],
    response: length,
  },
  {
    id: 'noon',
    title: 'Mark the noon shadow',
    instruction:
      'The clock is now at solar noon, when the Sun is highest today. Measure the shadow again and place a second mark.',
    lookFor: 'Compare this shadow with the morning mark. Has it become longer or shorter?',
    setup: view('june'),
    actions: [mark],
    response: length,
  },
  {
    id: 'afternoon',
    title: 'Mark the afternoon shadow',
    instruction:
      'It is now 3:00 p.m. Measure the shadow and place your third mark. Save this observation to keep the sundial and all three marks in your notebook.',
    lookFor:
      'The shadow has changed direction as well as length. Earth’s daily turn produces this pattern.',
    setup: view('june', { rule: 'clock', minutes: 900 }),
    actions: [mark, record],
    response: length,
  },
];

export const seasonalWalkthrough: readonly DesignWalkthroughTask[] = [
  {
    id: 'summer-noon',
    title: 'Measure the summer noon shadow',
    instruction:
      'Keep the same post and marks. At the June solstice, measure the shadow at solar noon and record its length.',
    lookFor: 'Read the Sun’s height as well as the shadow length. A high Sun makes a short shadow.',
    setup: view('june'),
    actions: [record],
    response: length,
  },
  {
    id: 'winter-noon',
    title: 'Measure the winter noon shadow',
    instruction:
      'Only the date has changed: this is the December solstice at solar noon. Measure the same post’s shadow.',
    lookFor: 'The post did not move. Find the old summer mark inside the longer winter shadow.',
    setup: view('dec'),
    actions: [record],
    response: length,
  },
  {
    id: 'compare',
    title: 'Compare your two measurements',
    instruction:
      'Use your summer and winter measurements in the notes below. Choose the date with the longer noon shadow at Colorado Springs.',
    lookFor:
      'Both measurements used the same post, place, and solar noon. Date was the only change.',
    setup: view('dec'),
    response: {
      label: 'Which noon shadow was longer?',
      options: ['December solstice', 'June solstice', 'They were the same'],
    },
  },
];

export const tiltWalkthrough: readonly DesignWalkthroughTask[] = [
  {
    id: 'june-earth',
    title: 'Find the tilted axis in June',
    instruction:
      'Find Earth’s axis in the diagram. In June the northern half tilts toward the Sun. Compare the Sun’s height with your short summer shadow.',
    lookFor: 'The lit half faces the Sun. The axis is tilted about 23.4°.',
    setup: view('june', { earth: true, camera: 'angle' }),
  },
  {
    id: 'december-earth',
    title: 'Follow Earth to December',
    instruction:
      'Earth has moved to the opposite side of its orbit. Its axis still points the same way; now the northern half tilts away from the Sun.',
    lookFor:
      'The lower Sun matches the longer winter shadow you measured. Earth’s daily turn still makes day and night.',
    setup: view('dec', { earth: true, camera: 'angle' }),
    response: {
      label: 'What explains the longer winter noon shadow here?',
      options: [
        'The Sun is lower because this hemisphere tilts away from it.',
        'The post gets taller in winter.',
        'The Sun goes around Earth once a year.',
      ],
    },
  },
];

export const calendarWalkthrough: readonly DesignWalkthroughTask[] = [
  ...(
    [
      [
        'march',
        'March equinox',
        'This is the first date mark. Place it exactly at the noon shadow tip.',
      ],
      [
        'june',
        'June solstice',
        'Find the shortest noon shadow of these four dates. Place its summer mark.',
      ],
      [
        'sept',
        'September equinox',
        'Look near the March mark. The two equinox shadow tips are close together.',
      ],
      [
        'dec',
        'December solstice',
        'Find the longest noon shadow of these four dates. Place its winter mark.',
      ],
    ] as const
  ).map(([season, label, instruction]) => ({
    id: season,
    title: 'Place the ' + label + ' mark',
    instruction,
    lookFor:
      'The post stays fixed and every date uses solar noon. Place a small stone at the glowing ring; the simulator records its measured position.',
    setup: view(season),
    actions: [mark],
    requiredTargetId: 'sundial-' + season,
  })),
  {
    id: 'read-calendar',
    title: 'Read your four date marks',
    instruction:
      'Compare the spacing of the four date marks, then save your finished sundial calendar. A mark can match nearby days too, so it does not identify one exact day on its own.',
    lookFor:
      'The solstices mark the two extremes. The equinox marks sit close together between them.',
    setup: view('sept'),
    actions: [record],
    response: {
      label: 'Which two date marks are closest?',
      options: ['March and September', 'June and December', 'March and December'],
    },
  },
];

export const monumentWalkthrough: readonly DesignWalkthroughTask[] = [
  {
    id: 'starter',
    title: 'Set out three stones',
    instruction:
      'Load the starting challenge: two outer stones with horizontal holes, and one fixed pillar with summer and winter rings. Your sundial stays saved. Loading the challenge keeps a backup of your current monument.',
    lookFor:
      'Each empty hole points toward the central pillar. Sunlight must pass through the hole before it can reach a ring.',
    setup: { ...summer, camera: 'angle' },
    sampleId: 'solstice-gates',
  },
  {
    id: 'summer-alignment',
    title: 'Move the summer window into line',
    instruction:
      'This is June, 30 minutes after sunrise. The summer window starts 40 cm too far south. Move only that window north in 5 cm steps. Stop when the light patch covers the summer ring.',
    lookFor:
      'Watch the live reading for the Summer carving. The central pillar, ring, and winter window stay fixed.',
    setup: summer,
    actions: [
      { label: 'Move window north · 5 cm', command: 'nudge', value: -0.05 },
      { label: 'Move window south · 5 cm', command: 'nudge', value: 0.05 },
      { label: 'View all three stones', command: 'shadowView' },
      { label: 'Inspect the rings', command: 'targetView' },
      record,
    ],
    response: {
      label: 'What reaches the summer ring now?',
      options: ['Sunlight through the horizontal hole', 'Shadow — I need to adjust the window'],
    },
  },
  {
    id: 'winter-alignment',
    title: 'Check the winter window',
    instruction:
      'The date has changed to December, again 30 minutes after sunrise. Keep every stone where it is. Check which ring receives sunlight now.',
    lookFor:
      'The winter window is already aligned. Its beam should reach the winter ring from a different direction.',
    setup: winter,
    actions: [record],
    response: {
      label: 'Which ring receives the winter beam?',
      options: ['Winter carving', 'Summer carving', 'Neither — the design needs adjustment'],
    },
  },
  {
    id: 'evidence',
    title: 'Save your solar calendar evidence',
    requiredEvidenceCount: 4,
    instruction:
      'Run the four-date check to record both solstices and both equinoxes. Then explain how a horizontal hole and a fixed mark let your monument show the time of year.',
    lookFor:
      'The solstice checks measure light at the pillar rings. The equinox checks use sunlight at the open center as a baseline. Review the measured results in your notebook.',
    setup: { ...summer, camera: 'angle' },
    actions: [{ label: 'Check & save all four dates', command: 'review-save' }],
    response: {
      label: 'Complete the explanation: My monument shows summer and winter because…',
      saveAs: 'exhibit',
    },
  },
];
