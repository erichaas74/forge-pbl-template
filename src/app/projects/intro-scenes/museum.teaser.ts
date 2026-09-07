import type { DecisionSceneConfig } from '../../shared/project-intro/decision-scene.models';
import { egyptianObjectModels } from '../class-exhibit-hall/egyptian-object-models';

const bust = egyptianObjectModels.find((object) => object.id === 'nefertiti')!.model!;
const coffin = egyptianObjectModels.find((object) => object.id === 'coffin')!.model!;
const temple = egyptianObjectModels.find((object) => object.id === 'temple')!.model!;

export const museumTeaser: DecisionSceneConfig = {
  type: 'decision-scene',
  id: 'museum-object-spotlight',
  version: '2.0.0',
  interaction: 'artifact',
  replayLabel: 'Replay the artifact spotlight',
  kicker: 'Objects That Changed Us · After hours at the museum',
  headline: 'The label says “old thing.” We’re going to need a better story.',
  invitation:
    'The gallery lights flicker on. A royal bust and a decorated coffin are waiting. Rotate a supplied 3D model and find a detail worth investigating.',
  sceneLabel: 'CURATOR ACCESS · ANCIENT EGYPT',
  transition: { style: 'spotlight', label: 'Spotlight on. Let’s uncover its story.' },
  sceneCaption:
    'A fictional museum assistant left you a note: “Please give one object a proper introduction.” Choose an object to examine its shape and read its source record.',
  media: { model: bust, alt: bust.alt },
  dialogue: [],
  prompt: 'Which object gets the spotlight?',
  revealButton: 'Show me my exhibit space',
  choices: [
    {
      id: 'nefertiti',
      thinking: {
        prompt: 'What can you see in this portrait?',
        starter: 'I notice…',
        guide:
          'Turn the object. Describe one shape, color, or detail you can actually see. Keep what you see separate from what you think it means.',
      },
      label: 'Spotlight Nefertiti’s bust',
      detail: 'A tall crown. A carefully shaped profile. How does a portrait communicate identity?',
      model: bust,
      imageAlt: bust.alt,
      badge: 'ROTATABLE 3D',
      result: {
        title: 'A royal image. A question about representation.',
        text: 'Rotate the bust to compare its face, crown, and profile. Describe a feature you can see before suggesting what it might communicate. A portrait presents a selected image of a person; it cannot tell us what every viewer thought.',
        evidence:
          'Object clue: the crown and profile invite questions about royal representation. This digital model is a starting point for observation, while the creator record helps establish what the model represents.',
        surprise: 'LOOK FROM ANOTHER ANGLE',
        media: { model: bust, alt: bust.alt },
        source: { label: 'View the supplied bust’s source and credit', url: bust.sourceUrl },
      },
    },
    {
      id: 'coffin',
      thinking: {
        prompt: 'What detail would you put on its label?',
        starter: 'I notice…',
        guide:
          'Turn the object and pick one visible detail. Describe it before guessing what it means. The source record can help you investigate next.',
      },
      label: 'Spotlight the decorated coffin',
      detail: 'An enclosure. Painted surfaces. What can form and decoration reveal?',
      model: coffin,
      imageAlt: coffin.alt,
      badge: 'ROTATABLE 3D',
      result: {
        title: 'An enclosure with a story to investigate.',
        text: 'The supplied museum model identifies this as the Coffin of Ankh-Khonsu. Rotate it and compare the enclosure’s shape with its decorated surfaces. These observations can guide research into funerary practice, craft, and belief.',
        evidence:
          'Interpretation needs context: one coffin cannot represent every burial. Use its museum model record to investigate the object before assigning meanings to individual images or inscriptions.',
        surprise: 'FORM. DECORATION. CONTEXT.',
        media: { model: coffin, alt: coffin.alt },
        source: { label: 'View the supplied coffin’s museum record', url: coffin.sourceUrl },
      },
    },
  ],
  mission: {
    title: 'This gallery has a space with your name on it.',
    invitation:
      'Turn objects into an exhibit people want to explore. You choose the story, investigate sources, design the display, and guide visitors through what the evidence can tell us.',
    model: temple,
    imageAlt: temple.alt,
    deliverable: 'Your museum wing',
    steps: [
      'Choose a question that connects your objects.',
      'Build labels that explain clues and cite sources.',
      'Lead a curator tour of your finished exhibit.',
    ],
    finishButton: 'Give me the curator’s pass',
  },
};
