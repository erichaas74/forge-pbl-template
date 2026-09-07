import type { ProjectIntroConfig } from '../../shared/project-intro/project-intro.models';
const image = '/simulations/solar-monument/monument.svg';
const alt = 'A block tower with three seasonal shadow markers and Sun paths above it.';
export const calendarMonumentIntro: ProjectIntroConfig = {
  capabilityId: 'project.intro',
  schemaVersion: '1.0',
  projectId: 'calendar-monument',
  version: '1.0.0',
  theme: 'observatory',
  image,
  imageAlt: alt,
  kicker: 'A calendar made of sunlight',
  headline: 'Can your monument read the seasons?',
  story:
    'Your class has been asked to design a monument that marks time without a screen or clock. Your materials are simple blocks. Your measuring tool is a moving shadow.',
  hook: 'The same tower makes a different shadow in winter. How could you turn that pattern into a calendar?',
  role: 'Sky researcher and monument designer',
  teaser: {
    type: 'decision-scene',
    id: 'calendar-first-prediction',
    version: '1.0.0',
    interaction: 'artifact',
    headline: 'One tower. Two Sun angles.',
    replayLabel: 'Revisit my shadow prediction',
    kicker: 'A practice prediction',
    invitation:
      'Imagine a tower standing on level ground. The Sun starts high in the sky, then moves lower.',
    sceneLabel: 'SHADOW OBSERVATION',
    sceneCaption: 'Keep the tower height fixed. Only the Sun’s altitude changes.',
    media: { image, alt },
    dialogue: [],
    prompt: 'What happens to the shadow as the Sun gets lower?',
    revealButton: 'Explore the prediction',
    choices: [
      {
        id: 'longer',
        label: 'It grows longer',
        detail: 'Light reaches the ground at a shallower angle.',
        image,
        imageAlt: alt,
        badge: 'PREDICTION',
        result: {
          title: 'A longer reach',
          text: 'For a vertical tower on level ground, lowering the Sun lengthens the shadow while the Sun stays above the horizon.',
          evidence: 'Keep the tower height fixed and change the Sun altitude in the lab.',
          surprise: 'ONE CHANGE, A NEW SHADOW',
          media: { image, alt },
        },
      },
      {
        id: 'same',
        label: 'It stays the same',
        detail: 'The tower itself has not changed.',
        image,
        imageAlt: alt,
        badge: 'PREDICTION',
        result: {
          title: 'Height is only one part',
          text: 'The tower stays the same, but the light’s angle changes. A fair test can reveal what this does to the shadow.',
          evidence: 'Change only the Sun altitude, then compare the shadow lengths.',
          surprise: 'TEST THE LIGHT ANGLE',
          media: { image, alt },
        },
      },
    ],
    mission: {
      title: 'Build a Calendar Monument',
      invitation: 'Turn a pattern in the sky into a design you can test.',
      image,
      imageAlt: alt,
      deliverable: 'A physical block monument and a matching 3D demonstration of all four seasonal dates.',
      steps: [
        'Research Sun and Moon patterns.',
        'Build and test seasonal alignments.',
        'Explain your design with evidence.',
      ],
      finishButton: 'Open my research notebook',
    },
  },
  challenge: {
    title: 'Make a fair comparison',
    context: 'You want to compare June and December solar-noon shadows.',
    options: [
      {
        id: 'fixed',
        label: 'Keep the tower and location fixed',
        detail: 'Compare the dates at solar noon.',
        feedback: 'That lets you investigate how the seasonal Sun angle changes the shadow.',
      },
      {
        id: 'change',
        label: 'Change the tower height too',
        detail: 'Build a taller tower for December.',
        feedback:
          'Now two things changed. Keeping height fixed makes the seasonal comparison easier to explain.',
      },
    ],
    takeaway: 'Change one variable at a time, then use measurements to support your explanation.',
  },
  decision: {
    prompt: 'What will your first monument try to do?',
    options: [
      {
        id: 'shadow',
        label: 'Land a shadow on a marker',
        detail: 'Use a tower and measured ground targets.',
      },
      {
        id: 'window',
        label: 'Frame a patch of sunlight',
        detail: 'Use pillars and a lintel to make an opening.',
      },
    ],
    reasonPrompt: 'Why might that design work?',
    reasonHint: 'Connect your idea to the Sun’s angle.',
    questionPrompt: 'What do you need to find out?',
    questionHint: 'Ask something your research or simulation can investigate.',
  },
  mission: [
    'Research Earth’s tilt and Sun and Moon patterns.',
    'Build matching physical and digital block monuments.',
    'Test seasonal dates, revise, and exhibit your evidence.',
  ],
  action: 'Open the design studio',
  finalExample: {
    button: 'Explore a monument example',
    format: 'Interactive 3D seasonal demonstration',
    title: 'The Three-Marker Tower',
    introduction:
      'An illustrative student design for Colorado Springs uses a tower and three seasonal markers.',
    chapters: [
      {
        label: '01 · Research',
        title: 'Explain the sky pattern',
        studentWork:
          'Earth’s tilt changes solar-noon altitude at our location. The Moon follows a different monthly pattern.',
        evidence: 'Research notes and date-stamped observations.',
        teacherNote: 'Listen for a causal explanation connecting tilt, angle, and shadow.',
      },
      {
        label: '02 · Design',
        title: 'Build matching models',
        studentWork: 'Ten 10 cm blocks form a 1 m tower. A measured base points to true north.',
        evidence: 'Block list, coordinates, orientation, and target positions.',
        teacherNote: 'Check whether another team could reproduce the model.',
      },
      {
        label: '03 · Evidence',
        title: 'Demonstrate all four special dates',
        studentWork:
          'I show the Sun and shadow on the same 3D monument at each equinox and solstice, and compare the results with my target expectations.',
        evidence: 'Four seasonal comparisons and a documented revision.',
        teacherNote: 'Assess the evidence and uncertainty, not decorative complexity.',
      },
    ],
    lookFors: [
      'Accurate explanation of seasons',
      'Reproducible dimensions and orientation',
      'Evidence from tests and revisions',
    ],
  },
};
