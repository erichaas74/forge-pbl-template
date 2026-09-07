import type { DecisionSceneConfig } from '../../shared/project-intro/decision-scene.models';
const clip = (name: string, alt: string) => ({
  image: `/project-intros/voyage/${name}.svg`,
  alt,
  video: `/project-intros/voyage/${name}.webm`,
  captions: `/project-intros/voyage/${name}.vtt`,
  videoFallback: 'illustration-and-transcript' as const,
});
export const voyageTeaser: DecisionSceneConfig = {
  type: 'decision-scene',
  id: 'voyage-first-command',
  version: '1.1.0',
  interaction: 'navigation',
  replayLabel: 'Replay my first command',
  kicker: 'Race Around the World · Captain to the chart table',
  headline: 'The shortcut looks brilliant. The wind has other plans.',
  invitation:
    'Your crew is waiting for a course. The navigator has two routes. The cook has one question: “How many dinners should I plan?”',
  sceneLabel: 'PRACTICE WATERS · A FICTIONAL CHART',
  sceneCaption:
    'Watch the ship meet changing weather. The direct passage is shorter, but its wind reports are old. The wider route has a recent wind report and a known supply harbor. Choose your first command.',
  media: {
    ...clip(
      'departure',
      'An illustrated sailing ship leaves harbor as clouds gather over a fictional practice sea.',
    ),
    video: '/project-intros/voyage/intro-launch-video.mp4',
  },
  afterVideoMedia: {
    image: '/project-intros/voyage/practice-chart.svg',
    fit: 'contain',
    alt: 'Fictional practice chart. From Departure Bay in the northeast, the direct passage crosses uncertain winds to the destination in the southwest. The longer route stops at Supply Harbor in the southeast before reaching the same destination.',
  },
  dialogue: [],
  prompt: 'Captain, which course do we sail?',
  revealButton: 'Bring me the expedition chart',
  choices: [
    {
      id: 'direct',
      thinking: {
        prompt: 'What might happen on this route?',
        starter: 'Because of this clue, I predict…',
        guide:
          'Choose a chart clue. Predict how it could affect time or supplies before we reveal the voyage. A prediction can change when you learn more.',
        evidence: [
          {
            id: 'clue-1',
            text: 'The direct passage is shorter.',
          },
          {
            id: 'clue-2',
            text: 'Its wind report is old.',
          },
        ],
      },
      label: 'Try the direct passage',
      detail: 'Less distance. Older wind reports. Carry the uncertainty.',
      image: '/project-intros/voyage/direct.svg',
      imageAlt: 'A sailing ship facing tall waves and gray clouds.',
      badge: 'SHORTER · LESS CERTAIN',
      result: {
        title: 'Shorter on paper. Slower in these winds.',
        text: 'In this practice outcome, headwinds slow the ship. The crew uses two extra days of provisions. Your navigator points at the chart: “The line was short. Unfortunately, the ocean did not read it.”',
        evidence:
          'Practice consequence: shorter distance did not guarantee less sailing time. Older wind information left an important uncertainty.',
        surprise: 'THE OCEAN VOTED “NO.”',
        media: clip(
          'direct',
          'The ship rocks into headwinds and waves; a provisions counter shows two additional days used.',
        ),
        metrics: [
          { label: 'Unexpected time', value: '+2 days' },
          { label: 'Next concern', value: 'Supplies' },
        ],
      },
    },
    {
      id: 'harbor',
      thinking: {
        prompt: 'What might happen on this route?',
        starter: 'Because of this clue, I predict…',
        guide:
          'Choose a chart clue. Predict how it could affect time or supplies before we reveal the voyage. A prediction can change when you learn more.',
        evidence: [
          {
            id: 'clue-1',
            text: 'The harbor route adds distance.',
          },
          {
            id: 'clue-2',
            text: 'The harbor has a recent wind report.',
          },
        ],
      },
      label: 'Sail via the supply harbor',
      detail: 'More distance. A recent report. A place to ask and resupply.',
      image: '/project-intros/voyage/harbor.svg',
      imageAlt: 'A sailing ship near a sheltered harbor with a lighthouse.',
      badge: 'LONGER · MORE INFORMATION',
      result: {
        title: 'You reach shelter. Now there is another decision.',
        text: 'In this practice outcome, the recent report helps you reach harbor. The detour costs one day. Resupplying will require an agreement with people who live and trade there. Their needs matter too.',
        evidence:
          'Practice consequence: the detour added time and a chance to resupply. A harbor is a community, not a free supply box.',
        surprise: 'LANDFALL. START LISTENING.',
        media: clip(
          'harbor',
          'The ship reaches a sheltered harbor; the route adds one day and an invitation to negotiate for supplies.',
        ),
        metrics: [
          { label: 'Detour', value: '+1 day' },
          { label: 'Next step', value: 'Negotiate' },
        ],
      },
    },
  ],
  mission: {
    title: 'Your route will leave a line. Your reasons will tell its story.',
    invitation:
      'Start your expedition in Lisbon. Compare charts and sources, make consequential choices, and keep the explanations that turn a map into a captain’s account.',
    image: '/journey-replay/world-atlas-v1.png',
    imageAlt: 'An illustrated world atlas ready for an expedition route.',
    deliverable: 'Your voyage replay',
    steps: [
      'Plan a course and explain the evidence.',
      'Record choices, consequences, and changes of mind.',
      'Replay the journey and consider whose lives it affected.',
    ],
    finishButton: 'I’m ready for my first expedition',
  },
};
