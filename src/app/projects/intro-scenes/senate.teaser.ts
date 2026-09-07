import type { DecisionSceneConfig } from '../../shared/project-intro/decision-scene.models';
const chamber = {
  image: '/debate-studio/roman-senate-chamber.png',
  alt: 'An illustrated Roman Senate chamber with a central speaking floor.',
};
export const senateTeaser: DecisionSceneConfig = {
  type: 'decision-scene',
  id: 'senate-seat-invitation',
  version: '1.1.0',
  interaction: 'council',
  replayLabel: 'Replay my Senate summons',
  kicker: 'The Fate of the Republic · You have been summoned',
  headline: 'Two senators. Two big claims. One empty seat: yours.',
  invitation:
    'Rome is at a turning point. Hear both senators, question their claims, and prepare to take the floor.',
  sceneLabel: 'THE SENATE IS IN SESSION',
  sceneCaption:
    'These fictional senators introduce the debate. Their dialogue is a dramatization, not a quotation from an ancient source.',
  media: chamber,
  speeches: [
    {
      id: 'lucius',
      speaker: 'Senator Lucius',
      title: 'The case for strong leadership',
      summary:
        'Consider the promise of decisive leadership. How should a leader be held accountable?',
      video: '/debate-studio/openings/opening-Senator%20Lucius.mp4',
    },
    {
      id: 'cassius',
      speaker: 'Senator Cassius',
      title: 'The case for the Republic',
      summary: 'Consider the role of shared power. How can the Senate act effectively in a crisis?',
      video: '/debate-studio/openings/opening-Senator%20Cassius.mp4',
    },
  ],
  dialogue: [],
  prompt: 'Interrupt with a question worth answering.',
  revealButton: 'Take me to my Senate seat',
  choices: [
    {
      id: 'challenge-leader',
      thinking: {
        prompt: 'What would you ask Lucius?',
        starter: 'My question for the senator…',
        guide:
          'Ask about a weakness or missing limit in the strong-leader proposal. Write your own question; you do not need to choose a side yet.',
      },
      label: 'Challenge the strong-leader claim',
      detail: '“Who would stop that leader from abusing power?”',
      imageAlt: 'Senator Lucius in a white toga with a red stripe.',
      badge: 'QUESTION LUCIUS',
      result: {
        title: 'The hand gestures stop. The thinking starts.',
        text: 'You tested the missing limit in Lucius’s argument. His next job is to support his claim with evidence. Your question opens an investigation; it does not settle the debate.',
        evidence:
          'Question raised: how could decisive leadership remain accountable? Look for historical evidence about both power and its limits.',
        surprise: 'EXCELLENTLY INCONVENIENT.',
        media: chamber,
      },
    },
    {
      id: 'challenge-senate',
      thinking: {
        prompt: 'What would you ask Cassius?',
        starter: 'My question for the senator…',
        guide:
          'Ask how shared government would work during a crisis. Write your own question; you do not need to choose a side yet.',
      },
      label: 'Challenge the Senate’s promise',
      detail: '“What if the Senate cannot agree during a crisis?”',
      imageAlt: 'Senator Cassius in a purple and cream robe.',
      badge: 'QUESTION CASSIUS',
      result: {
        title: 'A strong question reaches both sides.',
        text: 'You asked Cassius to explain how his proposal would actually work. Supporting limits on power is a starting claim. Showing how institutions can respond to a crisis needs evidence too.',
        evidence:
          'Question raised: how could collective government act effectively during a crisis? Compare evidence for institutional strengths and weaknesses.',
        surprise: 'THE CHAMBER IS LISTENING.',
        media: chamber,
      },
    },
  ],
  mission: {
    title: 'Now make a case that can survive a challenge.',
    invitation:
      'Investigate Caesar and the Republic. Choose a position you can defend, build a speech from sources, and respond to the strongest argument against you.',
    image: chamber.image,
    imageAlt: 'Senate seating surrounding a space for the student’s address.',
    deliverable: 'Your Senate address',
    steps: [
      'Build your claim with historical evidence.',
      'Prepare for a fair but difficult challenge.',
      'Deliver your address, rebut, and reflect.',
    ],
    finishButton: 'I’ll take the floor',
  },
};
