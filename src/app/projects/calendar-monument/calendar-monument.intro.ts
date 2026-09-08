import type { ProjectIntroConfig } from '../../shared/project-intro/project-intro.models';
const image = '/simulations/solar-monument/jewel-circle-cover.png';
const alt =
  'Illustration of a jeweled stone circle, pierced standing stones and a bronze crystal on a carved turquoise-and-gold calendar court.';
const practiceImage = '/simulations/solar-monument/monument.svg';
const practiceAlt = 'A block tower with three seasonal shadow markers and Sun paths above it.';
export const calendarMonumentIntro: ProjectIntroConfig = {
  capabilityId: 'project.intro',
  schemaVersion: '1.0',
  projectId: 'calendar-monument',
  version: '1.0.0',
  theme: 'observatory',
  image,
  imageAlt: alt,
  kicker: 'A calendar made of sunlight',
  headline: 'Can a shadow tell time—and the season?',
  story:
    'Start with a post and a moving shadow. Build a sundial, play a whole day, and mark the shadow tip. Then change the season: why does the same dial make different shadows? Your final project is a solar calendar, with standing stones, holes and colored jewels that mark the year.',
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
    media: { image: practiceImage, alt: practiceAlt },
    dialogue: [],
    prompt: 'What happens to the shadow as the Sun gets lower?',
    revealButton: 'Explore the prediction',
    choices: [
      {
        id: 'longer',
        label: 'It grows longer',
        detail: 'Light reaches the ground at a shallower angle.',
        image: practiceImage,
        imageAlt: practiceAlt,
        badge: 'PREDICTION',
        result: {
          title: 'A longer reach',
          text: 'For a vertical tower on level ground, lowering the Sun lengthens the shadow while the Sun stays above the horizon.',
          evidence: 'Keep the tower height fixed and change the Sun altitude in the lab.',
          surprise: 'ONE CHANGE, A NEW SHADOW',
          media: { image: practiceImage, alt: practiceAlt },
        },
      },
      {
        id: 'same',
        label: 'It stays the same',
        detail: 'The tower itself has not changed.',
        image: practiceImage,
        imageAlt: practiceAlt,
        badge: 'PREDICTION',
        result: {
          title: 'Height is only one part',
          text: 'The tower stays the same, but the light’s angle changes. A fair test can reveal what this does to the shadow.',
          evidence: 'Change only the Sun altitude, then compare the shadow lengths.',
          surprise: 'TEST THE LIGHT ANGLE',
          media: { image: practiceImage, alt: practiceAlt },
        },
      },
    ],
    mission: {
      title: 'From Sundial to Sun Monument',
      invitation: 'Turn a pattern in the sky into a design you can test.',
      image,
      imageAlt: alt,
      deliverable:
        'A solar-calendar monument with stone openings and colored jewels, plus a matching 3D test of both equinoxes and both solstices.',
      steps: [
        'Build a sundial and mark one day.',
        'Change seasons, explain the tilt, and mark the equinoxes and solstices.',
        'Build a solar-calendar monument and test its seasonal light alignments.',
      ],
      finishButton: 'Build my first sundial',
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
    prompt: 'How will your solar calendar mark the year?',
    options: [
      {
        id: 'shadow',
        label: 'Land a shadow on a marker',
        detail: 'Arrange standing stones and measured seasonal targets.',
      },
      {
        id: 'window',
        label: 'Land colored light on a marker',
        detail: 'Use holes and colored jewels in a stone gate.',
      },
    ],
    reasonPrompt: 'Why might that design work?',
    reasonHint: 'Connect your idea to the Sun’s angle.',
    questionPrompt: 'What do you need to find out?',
    questionHint: 'Ask something your research or simulation can investigate.',
  },
  mission: [
    'Build a sundial, play a day, then investigate its changing seasonal shadows.',
    'Explain Earth’s tilt and make your sundial mark the four special dates.',
    'Finally, build a solar calendar like a stone circle with jeweled openings, and test its light and shadow at all four special dates.',
  ],
  action: 'Start with a sundial',
  finalExample: {
    button: 'Explore a solar calendar',
    format: 'Interactive 3D seasonal demonstration',
    title: 'The Jewel Circle Solar Calendar',
    introduction:
      'Explore a carved stone circle with a bronze crystal, pierced standing stones and five colored jewels. Amber, blue and ruby roof openings light three seasonal sunstones. Test all four special dates on the same monument.',
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
        studentWork:
          'Eight gates surround a bronze crystal on a stepped base. Four outer standing stones have round windows; emerald and violet jewels fill two. Three roof jewels align with seasonal sunstones. Our measured base points to true north.',
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
