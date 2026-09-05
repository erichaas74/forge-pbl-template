import type { ExhibitTemplateDefinition } from '../../domain/exhibit-types';

export const museumBoardTemplate: ExhibitTemplateDefinition = {
  templateId: 'museum-board',
  version: 3,
  rendererType: 'museum-board-v1',
  vocabulary: {
    artifactSingular: 'exhibit',
    artifactPlural: 'exhibits',
    composeAction: 'Build final exhibit',
    publishAction: 'Showcase exhibit',
    publishedState: 'Showcased',
    hallName: 'Class Exhibit Hall',
    peerResponseName: 'question card',
    presenterName: 'docent',
  },
  sourceAdapter: {
    type: 'notebook-slots',
    allowedSlotIds: [
      'exhibit-title',
      'central-claim',
      'selected-objects',
      'object-captions',
      'source-list',
      'team-credit',
      'immersive-gallery',
      'video-presentation',
    ],
  },
  requirements: [
    { fieldId: 'exhibit-title', required: true, maxWords: 12 },
    { fieldId: 'central-claim', required: true, maxWords: 60 },
    { fieldId: 'selected-objects', required: true, minItems: 2, maxItems: 5 },
    { fieldId: 'object-captions', required: true },
    { fieldId: 'source-list', required: true, minItems: 2 },
    { fieldId: 'immersive-gallery', required: true },
    { fieldId: 'video-presentation', required: true },
  ],
  peerResponse: {
    enabled: true,
    prompt: 'What question would help this curator clarify what these Egyptian artifacts reveal?',
    maxWords: 40,
    maxPerArtifact: 1,
    minimumVisits: 4,
    minimumResponses: 2,
  },
  defense: {
    required: true,
    individual: true,
    prompts: [
      {
        id: 'claim',
        label: 'State your exhibit’s central claim about ancient Egyptian life.',
        guidance: 'Use your own words and connect the artifacts as a collection.',
      },
      {
        id: 'object',
        label: 'Which Egyptian artifact provides the strongest evidence, and why?',
        guidance: 'Name the artifact and connect its material, use, or context to the claim.',
      },
      {
        id: 'source',
        label: 'Which museum or scholarly source was most important to your research?',
        guidance: 'Explain what made it useful or trustworthy.',
      },
      {
        id: 'design',
        label: 'Explain one design choice in your MetaSteps gallery or video presentation.',
      },
      { id: 'response', label: 'Answer one visitor question about your artifacts.' },
    ],
    fallbackChallenge:
      'What might an archaeologist still be unable to conclude from your artifact group, and why?',
  },
  publication: {
    rehangLimit: 1,
    preventRehangAfterResponse: true,
    allowFamilyView: true,
  },
  theme: {
    themeId: 'museum-evening',
    corridorStyle: 'long-horizontal-room',
    frameStyle: 'museum-frame',
    emptyLocationLabel: 'Empty nail',
  },
};
