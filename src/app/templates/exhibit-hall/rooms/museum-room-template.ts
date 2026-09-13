import type { ExhibitTemplateDefinition } from '../domain/exhibit-types';
import { museumBoardTemplate } from '../renderers/museum-board/museum-board-template';

export const museumRoomTemplate: ExhibitTemplateDefinition = {
  ...museumBoardTemplate,
  templateId: 'assigned-museum-room',
  version: 1,
  vocabulary: {
    ...museumBoardTemplate.vocabulary,
    composeAction: 'Open my room',
    publishAction: 'Submit my room',
    publishedState: 'Submitted',
  },
  sourceAdapter: {
    ...museumBoardTemplate.sourceAdapter,
    allowedSlotIds: [...museumBoardTemplate.sourceAdapter.allowedSlotIds, 'museum-room'],
  },
  requirements: [
    { fieldId: 'exhibit-title', required: true, maxWords: 12 },
    { fieldId: 'central-claim', required: true, maxWords: 60 },
    { fieldId: 'selected-objects', required: true, minItems: 1, maxItems: 3 },
    { fieldId: 'object-captions', required: true },
    { fieldId: 'source-list', required: true, minItems: 1 },
    { fieldId: 'museum-room', required: true },
  ],
  defense: {
    ...museumBoardTemplate.defense,
    prompts: museumBoardTemplate.defense.prompts.map((prompt) =>
      prompt.id === 'design'
        ? { ...prompt, label: 'Explain why you included these artifacts in your room.' }
        : prompt,
    ),
  },
};
