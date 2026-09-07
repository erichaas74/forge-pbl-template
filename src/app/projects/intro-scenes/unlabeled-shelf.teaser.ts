import type { IllustratedComparisonConfig } from '../../shared/project-intro/project-teaser.models';
import dialogue from './unlabeled-shelf.dialogue.json';

export const unlabeledShelfTeaser: IllustratedComparisonConfig = {
  type: 'illustrated-comparison',
  id: 'unlabeled-shelf-pip-opening',
  version: '1.0.0',
  headline: 'Professor Pip has a theory. You have the test button.',
  scientistName: 'Professor Pip',
  robotName: 'Beep',
  invitation:
    'Two identical-looking samples. One very confident scientist. What could possibly go wrong?',
  testButton: 'TEST THAT THEORY',
  finishButton: 'Give Me the Case',
  evidenceNote:
    'Same appearance. Different color results. Looking alike does not prove that two substances are the same.',
  comedyNote:
    'The giant POOF is cartoon comedy. The color changes are the scientific clue in this fictional comparison.',
  samples: [
    { id: 'practice-a', label: 'Sample A', result: 'Turned blue', color: '#54c8f1' },
    { id: 'practice-b', label: 'Sample B', result: 'Turned pink', color: '#f478b2' },
  ],
  dialogue,
};
