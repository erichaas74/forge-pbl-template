import { mysteryEvidenceRecords } from './mystery-evidence-records';
import type { WorkbenchEvidenceLink } from '../../templates/investigation/ui/workbench-evidence.models';

const properties = 'activity-property-comparison';
const reaction = 'activity-reaction-comparison';
const scans = ['a', 'b', 'c', 'd'].map((id) => `activity-scan-vial-${id}`);
export const requiredCaseClueIds = [
  'evidence-inventory',
  'evidence-shelf-scene',
  'evidence-temperature-log',
  'evidence-label-list',
  'evidence-witness-note',
] as const;

/** Curriculum relationships consumed by the reusable evidence dock. */
const links: readonly WorkbenchEvidenceLink[] = [
  { evidenceId: 'evidence-inventory', category: 'clue', activityIds: scans },
  { evidenceId: 'evidence-shelf-scene', category: 'clue', activityIds: scans },
  {
    evidenceId: 'evidence-temperature-log',
    category: 'clue',
    activityIds: [reaction],
    keywords: 'heat thermometer cold bubbles',
  },
  {
    evidenceId: 'evidence-label-list',
    category: 'clue',
    activityIds: ['activity-shelf-restoration'],
  },
  { evidenceId: 'evidence-witness-note', category: 'clue', activityIds: scans },
  {
    evidenceId: 'evidence-test-kit',
    category: 'guide',
    activityIds: [properties, reaction, ...scans],
    keywords: 'equipment tools magnifier water probe scanner',
    instruction:
      'Use the on-screen instruments. Keep sample amounts and conditions equal when comparing vials. Do not taste or touch an unknown substance.',
    action: { activityId: properties, label: 'Use the property tools' },
  },
  {
    evidenceId: 'evidence-probe-calibration',
    category: 'guide',
    activityIds: [properties],
    keywords: 'conductivity electrical meter',
    instruction:
      'Compare the calibrated probe readings after the same water preparation. Keep the sample amount, water volume and testing conditions equal.',
    action: { activityId: properties, toolId: 'conductivity', label: 'Use the conductivity probe' },
  },
  {
    evidenceId: 'evidence-water-reference',
    category: 'guide',
    activityIds: [properties],
    keywords: 'dissolve solubility cup',
    instruction:
      'Use equal 2 g samples in equal 50 mL water. Stir the same way and observe for 60 seconds. Compare clearing, cloudiness and settling.',
    action: { activityId: properties, toolId: 'solubility', label: 'Use the water test' },
  },
  {
    evidenceId: 'evidence-indicator-key',
    category: 'guide',
    activityIds: [reaction],
    keywords: 'color colour reagent drops',
    instruction:
      'In the reaction rig, measure 5 mL and weigh 2 g before the sealed-vessel test. Add three drops of Indicator B at the indicated step. Compare the observed color with the source key.',
    action: { activityId: reaction, label: 'Use the reaction rig' },
  },
  {
    evidenceId: 'evidence-shelf-audit',
    category: 'clue',
    activityIds: ['activity-shelf-restoration'],
    action: { activityId: 'activity-shelf-restoration', label: 'Open the shelf plan' },
  },
  ...scans.map((activityId, index): WorkbenchEvidenceLink => ({
    evidenceId: `evidence-scan-vial-${'abcd'[index]}`,
    category: 'result',
    activityIds: [activityId],
    action: { activityId, label: 'Inspect this vial' },
  })),
  ...[
    ['evidence-property-trials', properties, 'Run a physical test'],
    ['evidence-reaction-trials', reaction, 'Run a reaction test'],
    ['evidence-conservation-trials', 'activity-conservation-model', 'Open the matter tracker'],
    ['evidence-shelf-case', 'activity-shelf-restoration', 'Open the shelf plan'],
    ['evidence-emergency-response', 'activity-emergency-response', 'Open the transfer challenge'],
  ].map(([evidenceId, activityId, label]): WorkbenchEvidenceLink => ({
    evidenceId,
    category: 'result',
    activityIds: [activityId],
    action: { activityId, label },
  })),
];

export const mysteryWorkbenchLinks: readonly WorkbenchEvidenceLink[] = links.map((link) => ({
  ...link,
  sourceRecord: mysteryEvidenceRecords[link.evidenceId],
}));
