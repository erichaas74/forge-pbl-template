import type { DecisionSceneConfig } from '../../shared/project-intro/decision-scene.models';

export const bostonAftermathScene = {
  image: '/history-live/boston-tea-party-aftermath-v1.png',
  alt: 'An imagined Boston waterfront after the Tea Party: a protester gestures to a crowd, a Loyalist holds official papers, a merchant points toward ruined tea with a ledger, and a woman and a Black dockworker watch the argument beside intact sailing ships.',
  fit: 'contain' as const,
};
const historicalContext = {
  label: 'Read the National Park Service account',
  url: 'https://www.nps.gov/articles/000/boston-tea-party-in-real-time.htm',
};

export const newsroomTeaser: DecisionSceneConfig = {
  type: 'decision-scene',
  id: 'newsroom-breaking-assignment',
  version: '1.1.0',
  interaction: 'dispatch',
  replayLabel: 'Return to the Boston waterfront',
  kicker: 'History Live · A story is breaking',
  headline: 'The tea is gone. The argument is just beginning.',
  invitation:
    'Boston, December 1773. Tea floats in the harbor. Voices rise on the wharf. Some defend resistance. Others demand order or fear for their work. You have arrived to report. What is the story here?',
  sceneLabel: 'BOSTON HARBOR · AFTER THE TEA PARTY',
  sceneCaption:
    'Imagined scene, AI-generated illustration. These characters and their confrontation are fictional; investigate historical sources to find out what happened.',
  media: bostonAftermathScene,
  dialogue: [],
  prompt: 'Who will you question first?',
  revealButton: 'Follow this lead',
  choices: [
    {
      id: 'protesters',
      label: 'The protester',
      detail: 'A stand for liberty. Who supports it?',
      image: bostonAftermathScene.image,
      imageAlt: 'The protester gesturing toward the waterfront crowd.',
      badge: 'RESISTANCE',
      thinking: {
        prompt: 'What would you ask the protester?',
        starter: 'I want to find out why…',
        guide:
          'Start with a detail you notice. Write a question a historical source could help answer. The illustration gives you a lead, not proof.',
        evidence: [
          {
            id: 'clue-1',
            text: 'A protester gestures toward the harbor as people cheer behind him.',
          },
          { id: 'clue-2', text: 'Other people in the same crowd look worried or argue back.' },
        ],
      },
      result: {
        title: 'A protest can unite people—and divide them.',
        text: 'Resistance to Parliament helped bring people together. But support for resisting the Tea Act did not mean everyone approved of destroying tea. Your story could ask where people drew that line.',
        evidence:
          'Compare a defense of the protest with an account that objects to the destruction. Whose views does each source represent?',
        surprise: 'WHOSE LIBERTY? WHO AGREES?',
        media: bostonAftermathScene,
        source: historicalContext,
      },
    },
    {
      id: 'officials',
      label: 'The Loyalist',
      detail: 'A demand for order. Whose authority?',
      image: bostonAftermathScene.image,
      imageAlt: 'A Loyalist civilian holds papers and argues with an open hand.',
      badge: 'LAW & LOYALTY',
      thinking: {
        prompt: 'What would you ask the Loyalist?',
        starter: 'Before accepting this argument, I would ask…',
        guide:
          'A source can value order and still leave questions unanswered. Ask for evidence about authority, rights, or the risks of resistance.',
        evidence: [
          {
            id: 'clue-1',
            text: 'A neatly dressed man holds official-looking papers as he argues.',
          },
          { id: 'clue-2', text: 'The protester beside him appears unconvinced.' },
        ],
      },
      result: {
        title: 'Order sounds different depending on who has power.',
        text: 'Some people saw the destruction as unlawful and feared its consequences. Others questioned Parliament’s right to tax them without representation. Investigate what each side meant by lawful authority.',
        evidence:
          'Compare official demands with colonial objections. A document tells you what its author argued; it does not settle the argument.',
        surprise: 'WHO MAKES THE RULES?',
        media: bostonAftermathScene,
        source: historicalContext,
      },
    },
    {
      id: 'merchants',
      label: 'The merchant',
      detail: 'Ruined cargo. Who bears the cost?',
      image: bostonAftermathScene.image,
      imageAlt: 'A merchant holds a ledger and points toward the damaged tea chests.',
      badge: 'TRADE & MONEY',
      thinking: {
        prompt: 'What would you ask the merchant?',
        starter: 'To understand who gains or loses, I would ask…',
        guide:
          'Do not assume every merchant wanted the same thing. Look for who owned the tea, who carried it, and who could sell it.',
        evidence: [
          {
            id: 'clue-1',
            text: 'A merchant points toward ruined tea while holding an open ledger.',
          },
          { id: 'clue-2', text: 'The merchant ships are still intact behind the crowd.' },
        ],
      },
      result: {
        title: 'Follow the tea. Then follow the money.',
        text: 'The tea trade connected the East India Company, selected sellers, shipowners, and other merchants. Their interests were not identical. Your report could investigate who benefited from the Tea Act and who faced losses.',
        evidence:
          'Check trade rules, ownership records, and merchants’ accounts before deciding who paid the price. A worried face cannot establish a financial loss.',
        surprise: 'WHO GAINS? WHO PAYS?',
        media: bostonAftermathScene,
        source: historicalContext,
      },
    },
    {
      id: 'townspeople',
      label: 'The waterfront workers',
      detail: 'A divided town. What happens to daily life?',
      image: bostonAftermathScene.image,
      imageAlt: 'A working woman and a Black dockworker watch the crowd and the harbor.',
      badge: 'EVERYDAY LIVES',
      thinking: {
        prompt: 'What would you ask the waterfront workers?',
        starter: 'A voice I want to hear is… My question is…',
        guide:
          'Ask whose work, safety, or rights might be affected. Do not infer a person’s beliefs or legal status from their appearance.',
        evidence: [
          { id: 'clue-1', text: 'Two workers look between the arguing crowd and the harbor.' },
          { id: 'clue-2', text: 'The loudest speakers are not the only people in the scene.' },
        ],
      },
      result: {
        title: 'The quietest people may have the biggest story.',
        text: 'Political arguments reach beyond their leaders. Ask how the crisis affected work and everyday life, and whose concerns survive in the sources. These imagined workers invite questions; they cannot speak for a whole community.',
        evidence:
          'Seek personal accounts and records of daily life. Name gaps when the people you want to hear from are missing from the record.',
        surprise: 'WHO IS MISSING FROM THE HEADLINE?',
        media: bostonAftermathScene,
        source: historicalContext,
      },
    },
  ],
  mission: {
    title: 'One crowded waterfront. More than one story.',
    invitation:
      'You found a lead. Now become a Revolutionary War correspondent: choose a network, investigate a story, and let the evidence shape the report you put on air.',
    image: '/history-live/assignment-newsroom.png',
    imageAlt: 'A newsroom assignment desk waiting for the student’s script.',
    deliverable: 'Your special report',
    steps: [
      'Choose a story and compare historical sources.',
      'Write, rehearse, and record your news package.',
      'Present it to the class with source credits.',
    ],
    finishButton: 'Give me the assignment',
  },
};
