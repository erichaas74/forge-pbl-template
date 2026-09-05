import type { ProjectPackageLocation } from '../../core/packages/project-package-contracts';
import type {
  InvestigationActivityOption,
  InvestigationPhaseItem,
} from '../../templates/investigation/ui/investigation-ui.models';

export const mysterySubstanceLocation: ProjectPackageLocation = {
  tenantId: 'local',
  projectId: 'mystery-substance-outbreak',
  projectVersion: '1.0.0',
  reference: 'projects/mystery-substance-outbreak/1.0.0',
};

const phaseIds = [
  'phase-inventory',
  'phase-evidence',
  'phase-properties',
  'phase-reactions',
  'phase-conservation',
  'phase-restore',
  'phase-emergency',
  'phase-showcase',
] as const;

const vialScans = [
  {
    vialId: 'vial-a',
    code: 'A',
    color: '#1769ff',
    image: '/evidence-artwork/vial-a-observation-v2.webp',
    cue: 'Coarse, clear-edged crystals',
  },
  {
    vialId: 'vial-b',
    code: 'B',
    color: '#e0a51f',
    image: '/evidence-artwork/vial-b-observation-v2.webp',
    cue: 'Smaller, sparkling crystals',
  },
  {
    vialId: 'vial-c',
    code: 'C',
    color: '#7555e8',
    image: '/evidence-artwork/vial-c-observation-v2.webp',
    cue: 'Fine white powder',
  },
  {
    vialId: 'vial-d',
    code: 'D',
    color: '#18a6ad',
    image: '/evidence-artwork/vial-d-observation-v2.webp',
    cue: 'Very fine white powder',
  },
] as const;

export type MysteryVial = (typeof vialScans)[number];
export const mysteryVials: readonly MysteryVial[] = vialScans;

export const mysteryEvidenceFiles = [
  {
    id: 'evidence-inventory',
    title: 'Four-Vial Inventory',
    type: 'document',
    text: 'Four sealed white-substance vials remain, marked only A–D.',
    asset: '/evidence-artwork/e01-four-vial-inventory.webp',
    file: '/evidence/unlabeled-shelf-inventory.txt',
  },
  {
    id: 'evidence-shelf-scene',
    title: 'Shelf Scene',
    type: 'scene',
    text: 'Four open label clips and four sealed vials were documented on the dry-material shelf.',
    asset: '/evidence-artwork/e02-shelf-scene.webp',
    file: '/evidence/shelf-scene-record.txt',
  },
  {
    id: 'evidence-temperature-log',
    title: 'Prior Test Log',
    type: 'measurement',
    text: 'A prior controlled trial recorded bubbling and a temperature change for Vial C.',
    asset: '/evidence-artwork/e03-temperature-log.webp',
    file: '/evidence/vial-c-temperature-log.csv',
  },
  {
    id: 'evidence-label-list',
    title: 'Recovered Label List',
    type: 'document',
    text: 'Four product labels were recovered without vial assignments.',
    asset: '/evidence-artwork/e04-recovered-labels.webp',
    file: '/evidence/recovered-label-list.txt',
  },
  {
    id: 'evidence-witness-note',
    title: 'Shelf Monitor Note',
    type: 'testimony',
    text: 'A student recalls two crystal vials and two powder vials; the recollection needs testing.',
    asset: '/evidence-artwork/e05-witness-note.webp',
    file: '/evidence/shelf-monitor-statement.txt',
  },
  {
    id: 'evidence-test-kit',
    title: 'Virtual Test Kit',
    type: 'equipment',
    text: 'The kit supports controlled comparisons using equal conditions.',
    asset: '/evidence-artwork/e06-virtual-test-kit.webp',
    file: '/evidence/virtual-test-kit-safety-card.txt',
  },
  {
    id: 'evidence-probe-calibration',
    title: 'Probe Calibration',
    type: 'measurement',
    text: 'Control samples document how the virtual conductivity probe responded.',
    asset: '/evidence-artwork/e07-probe-calibration.webp',
    file: '/evidence/conductivity-probe-calibration.csv',
  },
  {
    id: 'evidence-water-reference',
    title: 'Water-Test Reference',
    type: 'reference',
    text: 'Known materials show different dissolving and suspension patterns under equal conditions.',
    asset: '/evidence-artwork/e08-water-reference.webp',
    file: '/evidence/water-test-reference-table.csv',
  },
  {
    id: 'evidence-indicator-key',
    title: 'Indicator B Color Key',
    type: 'reference',
    text: 'The color key provides a comparison standard for the virtual indicator test.',
    asset: '/evidence-artwork/e09-indicator-key.webp',
    file: '/evidence/indicator-b-color-key.txt',
  },
  {
    id: 'evidence-shelf-audit',
    title: 'Shelf Position Audit',
    type: 'document',
    text: 'Vial positions and label-clip locations were recorded without claiming identity.',
    asset: '/evidence-artwork/e10-shelf-audit.webp',
    file: '/evidence/shelf-position-audit.txt',
  },
] as const;

export const mysteryObservationTags = [
  'crystal edges',
  'sparkling grains',
  'fine particles',
  'uniform white color',
] as const;

const scanEvidence = vialScans.map((vial) => ({
  id: `evidence-scan-${vial.vialId}`,
  schemaVersion: '1.0',
  title: `Vial ${vial.code} optical scan`,
  evidenceType: 'studentObservation',
  content: {
    assetRefs: [vial.image],
    extensions: { vialId: vial.vialId, vialCode: vial.code },
  },
  availability: {
    initialState: 'locked',
    ruleIds: [`rule-unlock-scan-${vial.vialId}`],
  },
  requirement: 'required',
  studentCapabilities: {
    annotate: true,
    classify: true,
    connect: true,
    cite: true,
  },
  unlockRuleIds: [`rule-unlock-scan-${vial.vialId}`],
}));

const fileEvidence = mysteryEvidenceFiles.map((evidence) => ({
  id: evidence.id,
  schemaVersion: '1.0',
  title: evidence.title,
  evidenceType: evidence.type,
  content: {
    text: evidence.text,
    assetRefs: [evidence.asset],
    contentRef: evidence.file,
  },
  availability: { initialState: 'available' },
  requirement: 'required',
  studentCapabilities: {
    annotate: true,
    classify: true,
    connect: true,
    cite: true,
  },
}));

const scanActivities = vialScans.map((vial) => ({
  id: `activity-scan-${vial.vialId}`,
  schemaVersion: '1.0',
  title: `Scan Vial ${vial.code}`,
  type: 'opticalObservation',
  required: true,
  extensions: {
    investigation: {
      evidenceProducedIds: [`evidence-scan-${vial.vialId}`],
      ruleIds: [`rule-unlock-scan-${vial.vialId}`],
    },
    mysterySubstance: {
      vialId: vial.vialId,
      artwork: vial.image,
      observableCue: vial.cue,
    },
  },
}));

const scanRules = vialScans.map((vial) => ({
  id: `rule-unlock-scan-${vial.vialId}`,
  schemaVersion: '1.0',
  trigger: {
    eventType: 'activity.completed',
    targetId: `activity-scan-${vial.vialId}`,
  },
  actions: [{ type: 'evidence.unlock', targetId: `evidence-scan-${vial.vialId}` }],
  repeatable: false,
  priority: 100,
  enabled: true,
}));

const capabilityEvidence = [
  {
    id: 'evidence-property-trials',
    schemaVersion: '1.0',
    title: 'Four-vial physical-property trials',
    evidenceType: 'measurementSet',
    content: {
      text: 'Student-captured optical, water, conductivity, and surface-scan records.',
    },
    availability: {
      initialState: 'locked',
      ruleIds: ['rule-unlock-property-trials'],
    },
    requirement: 'required',
    studentCapabilities: {
      annotate: true,
      classify: true,
      connect: true,
      cite: true,
    },
    unlockRuleIds: ['rule-unlock-property-trials'],
  },
  {
    id: 'evidence-reaction-trials',
    schemaVersion: '1.0',
    title: 'Controlled chemical-screening trials',
    evidenceType: 'simulationTrialSet',
    content: {
      text: 'Student-captured gas, temperature, and color observations from synchronized vessels.',
    },
    availability: {
      initialState: 'locked',
      ruleIds: ['rule-unlock-reaction-trials'],
    },
    requirement: 'required',
    studentCapabilities: {
      annotate: true,
      classify: true,
      connect: true,
      cite: true,
    },
    unlockRuleIds: ['rule-unlock-reaction-trials'],
  },
  {
    id: 'evidence-conservation-trials',
    schemaVersion: '1.0',
    title: 'Mass and particle-tracking trials',
    evidenceType: 'modelAndMeasurement',
    content: {
      text: 'Before-and-after mass readings paired with system-boundary particle observations.',
    },
    availability: {
      initialState: 'locked',
      ruleIds: ['rule-unlock-conservation-trials'],
    },
    requirement: 'required',
    studentCapabilities: {
      annotate: true,
      classify: true,
      connect: true,
      cite: true,
    },
    unlockRuleIds: ['rule-unlock-conservation-trials'],
  },
  {
    id: 'evidence-shelf-case',
    schemaVersion: '1.0',
    title: 'Shelf restoration case drafts',
    evidenceType: 'performanceArtifact',
    content: {
      text: 'Versioned vial labels, shelf positions, handling plans, confidence, and reasoning.',
    },
    availability: {
      initialState: 'locked',
      ruleIds: ['rule-unlock-shelf-case'],
    },
    requirement: 'required',
    studentCapabilities: {
      annotate: true,
      classify: false,
      connect: true,
      cite: true,
    },
    unlockRuleIds: ['rule-unlock-shelf-case'],
  },
  {
    id: 'evidence-emergency-response',
    schemaVersion: '1.0',
    title: 'Bay 3 incident record',
    evidenceType: 'performanceArtifact',
    content: {
      text: 'The call filed with the fire marshal, the tests bought to support it, the confidence held, and the minutes it cost.',
    },
    availability: {
      initialState: 'locked',
      ruleIds: ['rule-unlock-emergency-response'],
    },
    requirement: 'required',
    studentCapabilities: {
      annotate: true,
      classify: false,
      connect: true,
      cite: true,
    },
    unlockRuleIds: ['rule-unlock-emergency-response'],
  },
  {
    id: 'evidence-final-case-file',
    schemaVersion: '1.0',
    title: 'Case-file showcase versions',
    evidenceType: 'performanceArtifact',
    content: {
      text: 'Versioned claims, selected evidence, and scientific reasoning for the final audience.',
    },
    availability: {
      initialState: 'locked',
      ruleIds: ['rule-unlock-final-case-file'],
    },
    requirement: 'required',
    studentCapabilities: {
      annotate: true,
      classify: false,
      connect: true,
      cite: true,
    },
    unlockRuleIds: ['rule-unlock-final-case-file'],
  },
];

const capabilityRules = [
  ['property-trials', 'activity-property-comparison', 'evidence-property-trials'],
  ['reaction-trials', 'activity-reaction-comparison', 'evidence-reaction-trials'],
  ['conservation-trials', 'activity-conservation-model', 'evidence-conservation-trials'],
  ['shelf-case', 'activity-shelf-restoration', 'evidence-shelf-case'],
  ['emergency-response', 'activity-emergency-response', 'evidence-emergency-response'],
  ['final-case-file', 'activity-case-showcase', 'evidence-final-case-file'],
].map(([suffix, activityId, evidenceId]) => ({
  id: `rule-unlock-${suffix}`,
  schemaVersion: '1.0',
  trigger: { eventType: 'activity.completed', targetId: activityId },
  actions: [{ type: 'evidence.unlock', targetId: evidenceId }],
  repeatable: false,
  priority: 90,
  enabled: true,
}));

export const mysterySubstanceProjectPackage: Readonly<Record<string, unknown>> = {
  'project.json': {
    id: mysterySubstanceLocation.projectId,
    schemaVersion: '1.0',
    title: 'The Unlabeled Shelf',
    template: { id: 'investigation', version: '1.0' },
    projectType: 'investigation',
    gradeLevels: [5],
    subjects: {
      primary: 'science',
      supporting: ['languageArts', 'mathematics'],
    },
    duration: { value: 4, unit: 'weeks' },
    status: 'draft',
    investigationConfigRef: 'investigation.json',
    capabilities: [
      'caseBoard',
      'evidence',
      'studentEvidence',
      'hypotheses',
      'activities',
      'rules',
      'state',
      'finalSubmission',
      'performanceArtifacts',
    ],
    theme: {
      id: 'unlabeled-shelf-lab',
      name: 'Forensic school laboratory',
      extensions: {
        artworkMode: 'professionalRaster',
        shell: 'immersiveWorkspace',
      },
    },
  },
  'investigation.json': {
    id: 'investigation-unlabeled-shelf',
    schemaVersion: '1.0',
    title: 'Mystery Substance Investigation',
    goals: ['identifyUnknown', 'evaluateExplanations', 'recommendSolution'],
    solutionModel: 'exact',
    mission: {
      role: 'Student laboratory investigation team',
      situation: 'Four sealed substances remain on a shelf after their labels were separated.',
      drivingQuestion: 'How can evidence restore every label and safe shelf position?',
      goal: 'Build a defensible evidence trail for all four vials.',
      stakes: 'The shelf cannot return to use until each decision can be defended.',
    },
    phases: [
      {
        id: phaseIds[0],
        schemaVersion: '1.0',
        title: 'Inventory the shelf',
        order: 1,
        activityIds: scanActivities.map((activity) => activity.id),
      },
      {
        id: phaseIds[1],
        schemaVersion: '1.0',
        title: 'Examine case files',
        order: 2,
        activityIds: ['activity-evidence-locker'],
      },
      {
        id: phaseIds[2],
        schemaVersion: '1.0',
        title: 'Build property profiles',
        order: 3,
        activityIds: ['activity-property-comparison'],
      },
      {
        id: phaseIds[3],
        schemaVersion: '1.0',
        title: 'Screen chemical changes',
        order: 4,
        activityIds: ['activity-reaction-comparison'],
      },
      {
        id: phaseIds[4],
        schemaVersion: '1.0',
        title: 'Model conservation',
        order: 5,
        activityIds: ['activity-conservation-model'],
      },
      {
        id: phaseIds[5],
        schemaVersion: '1.0',
        title: 'Restore the shelf',
        order: 6,
        activityIds: ['activity-shelf-restoration'],
      },
      {
        id: phaseIds[6],
        schemaVersion: '1.0',
        title: 'Answer the Bay 3 call',
        order: 7,
        activityIds: ['activity-emergency-response'],
      },
      {
        id: phaseIds[7],
        schemaVersion: '1.0',
        title: 'Defend the case',
        order: 8,
        activityIds: ['activity-case-showcase'],
      },
    ],
    openness: {
      evidenceOrder: 'open',
      activityOrder: 'open',
      lessonOrder: 'open',
      allowDecoys: false,
      allowOptionalEvidence: true,
      allowRevisit: true,
      allowHypothesisRevision: true,
      requireHypothesisRevision: false,
      allowMultipleHypotheses: true,
      teacherOverrideAllowed: true,
    },
    hypotheses: {
      mode: 'studentGenerated',
      allowMultiple: true,
      requireRevision: false,
      trackHistory: true,
      confidenceMode: 'percentage',
    },
    solution: {
      mode: 'exact',
      exactSolutionIds: ['solution-shelf-restored'],
      requireEvidenceSupport: true,
    },
    reveal: { mode: 'teacherControlled' },
  },
  'case-board.json': {
    id: 'case-board-unlabeled-shelf',
    schemaVersion: '1.0',
    title: 'Evidence Locker',
    layoutMode: 'zones',
    sections: [
      {
        id: 'board-section-observations',
        schemaVersion: '1.0',
        type: 'evidence',
        title: 'Direct observations',
        order: 1,
        studentEditable: true,
      },
      {
        id: 'board-section-records',
        schemaVersion: '1.0',
        type: 'data',
        title: 'Measured records',
        order: 2,
        studentEditable: true,
      },
      {
        id: 'board-section-questions',
        schemaVersion: '1.0',
        type: 'questions',
        title: 'Questions to test',
        order: 3,
        studentEditable: true,
      },
      {
        id: 'board-section-claims',
        schemaVersion: '1.0',
        type: 'finalClaim',
        title: 'Claims under review',
        order: 4,
        studentEditable: true,
      },
    ],
    interactions: {
      dragDrop: true,
      reorder: true,
      annotate: true,
      connectEvidence: true,
      createStudentEvidence: true,
      confidenceRating: true,
    },
  },
  'evidence.json': {
    schemaVersion: '1.0',
    items: [...fileEvidence, ...scanEvidence, ...capabilityEvidence],
  },
  'activities.json': {
    schemaVersion: '1.0',
    items: [
      ...scanActivities,
      {
        id: 'activity-evidence-locker',
        schemaVersion: '1.0',
        title: 'Evidence Locker',
        type: 'evidenceReview',
        required: true,
      },
      {
        id: 'activity-property-comparison',
        schemaVersion: '1.0',
        title: 'Four-Vial Properties Lab',
        type: 'controlledComparison',
        required: true,
        extensions: {
          investigation: {
            evidenceProducedIds: ['evidence-property-trials'],
            ruleIds: ['rule-unlock-property-trials'],
          },
        },
      },
      {
        id: 'activity-reaction-comparison',
        schemaVersion: '1.0',
        title: 'Chemical Screening Bench',
        type: 'reactionSimulation',
        required: true,
        extensions: {
          investigation: {
            evidenceProducedIds: ['evidence-reaction-trials'],
            ruleIds: ['rule-unlock-reaction-trials'],
          },
        },
      },
      {
        id: 'activity-conservation-model',
        schemaVersion: '1.0',
        title: 'Conservation Investigation',
        type: 'particleModelSimulation',
        required: true,
        extensions: {
          investigation: {
            evidenceProducedIds: ['evidence-conservation-trials'],
            ruleIds: ['rule-unlock-conservation-trials'],
          },
        },
      },
      {
        id: 'activity-shelf-restoration',
        schemaVersion: '1.0',
        title: 'Shelf Investigation Bench',
        type: 'constrainedAssignment',
        required: true,
        extensions: {
          investigation: {
            evidenceProducedIds: ['evidence-shelf-case'],
            ruleIds: ['rule-unlock-shelf-case'],
          },
        },
      },
      {
        id: 'activity-emergency-response',
        schemaVersion: '1.0',
        title: 'Bay 3 Emergency Response',
        type: 'timedIdentification',
        required: true,
        extensions: {
          investigation: {
            evidenceProducedIds: ['evidence-emergency-response'],
            ruleIds: ['rule-unlock-emergency-response'],
          },
        },
      },
      {
        id: 'activity-case-showcase',
        schemaVersion: '1.0',
        title: 'Case-File Showcase',
        type: 'performanceArtifact',
        required: true,
        extensions: {
          investigation: {
            evidenceProducedIds: ['evidence-final-case-file'],
            ruleIds: ['rule-unlock-final-case-file'],
          },
        },
      },
    ],
  },
  'rules.json': {
    schemaVersion: '1.0',
    items: [...scanRules, ...capabilityRules],
  },
  'state.json': {
    schemaVersion: '1.0',
    items: [
      {
        id: 'workspace.selectedVial',
        schemaVersion: '1.0',
        stateType: 'choice',
        initialValue: '',
        allowedValues: ['', ...vialScans.map((vial) => vial.vialId)],
        studentVisible: false,
        mutable: true,
      },
      {
        id: 'workspace.activePhase',
        schemaVersion: '1.0',
        stateType: 'choice',
        initialValue: phaseIds[0],
        allowedValues: [...phaseIds],
        studentVisible: false,
        mutable: true,
      },
    ],
  },
  'final-submission.json': {
    id: 'final-submission-case-file',
    schemaVersion: '1.0',
    title: 'Restored Shelf Case File',
    submissionType: 'investigationReport',
    teamMode: 'mixed',
    sections: [
      {
        id: 'submission-section-claim',
        schemaVersion: '1.0',
        type: 'claim',
        title: 'Four-vial identification',
        required: true,
      },
      {
        id: 'submission-section-evidence',
        schemaVersion: '1.0',
        type: 'evidence',
        title: 'Evidence trail',
        required: true,
        evidenceRequired: true,
        minEvidenceCount: 4,
      },
      {
        id: 'submission-section-reasoning',
        schemaVersion: '1.0',
        type: 'reasoning',
        title: 'Scientific reasoning',
        required: true,
      },
      {
        id: 'submission-section-recommendation',
        schemaVersion: '1.0',
        type: 'recommendation',
        title: 'Shelf restoration plan',
        required: true,
      },
    ],
    solutionRevealAfterSubmission: false,
  },
};

export const mysteryInvestigationPhases = [
  {
    id: phaseIds[0],
    number: '01',
    shortTitle: 'Inventory',
    title: 'Inventory the shelf',
    instruction: 'Inspect the sealed vials and record only what the optical scan shows.',
    activityIds: scanActivities.map((activity) => activity.id),
  },
  {
    id: phaseIds[1],
    number: '02',
    shortTitle: 'Evidence',
    title: 'Examine case files',
    instruction: 'Review recovered records and separate observation from inference.',
    activityIds: ['activity-evidence-locker'],
  },
  {
    id: phaseIds[2],
    number: '03',
    shortTitle: 'Properties',
    title: 'Build property profiles',
    instruction: 'Run physical tests under equal conditions and compare all four vials.',
    activityIds: ['activity-property-comparison'],
  },
  {
    id: phaseIds[3],
    number: '04',
    shortTitle: 'Reactions',
    title: 'Screen chemical changes',
    instruction: 'Compare two vials in synchronized closed vessels.',
    activityIds: ['activity-reaction-comparison'],
  },
  {
    id: phaseIds[4],
    number: '05',
    shortTitle: 'Matter',
    title: 'Model conservation',
    instruction: 'Measure particles and mass across a clearly defined system boundary.',
    activityIds: ['activity-conservation-model'],
  },
  {
    id: phaseIds[5],
    number: '06',
    shortTitle: 'Restore',
    title: 'Restore the shelf',
    instruction: 'Draft a label, position, and safe handling case for every vial.',
    activityIds: ['activity-shelf-restoration'],
  },
  {
    id: phaseIds[6],
    number: '07',
    shortTitle: 'Bay 3',
    title: 'Answer the Bay 3 call',
    instruction:
      'An unidentified white powder has to be identified before a crew can enter an acid spill. Spend the clock on the tests that can actually settle it.',
    activityIds: ['activity-emergency-response'],
  },
  {
    id: phaseIds[7],
    number: '08',
    shortTitle: 'Final',
    title: 'Defend the case',
    instruction: 'Build a final claim from your evidence, analysis, and working theory.',
    activityIds: ['activity-case-showcase'],
  },
] as const satisfies readonly InvestigationPhaseItem[];

export const mysteryEvidenceCatalog = [
  ...mysteryEvidenceFiles.map((evidence) => ({
    ...evidence,
    summary: evidence.text,
    source: 'Recovered case file · Evidence Locker',
  })),
  ...vialScans.map((vial) => ({
    id: `evidence-scan-${vial.vialId}`,
    title: `Vial ${vial.code} optical scan`,
    type: 'student observation',
    summary: vial.cue,
    source: 'Student optical scan · Shelf Incident Lab',
    asset: vial.image,
  })),
  ...capabilityEvidence.map((evidence) => ({
    id: evidence.id,
    title: evidence.title,
    type: evidence.evidenceType,
    summary: evidence.content.text,
    source: 'Student activity result · Investigation workspace',
  })),
] as const;

export const mysteryInvestigationActivities = [
  ...vialScans.map((vial) => ({
    id: `activity-scan-${vial.vialId}`,
    title: `Optical scan · Vial ${vial.code}`,
    typeLabel: 'Specimen observation',
    purpose: 'Inspect one sealed vial under equal lighting and record visible properties.',
    helpsWith: 'Building an observation-only starting record',
    phaseId: phaseIds[0],
    evidenceId: `evidence-scan-${vial.vialId}`,
    required: true,
    displayMode: 'expanded' as const,
  })),
  {
    id: 'activity-evidence-locker',
    title: 'Review recovered case files',
    typeLabel: 'Source investigation',
    purpose: 'Inspect records from the shelf incident before deciding what they mean.',
    helpsWith: 'Separating direct observation from inference',
    phaseId: phaseIds[1],
    required: true,
    displayMode: 'embedded',
  },
  {
    id: 'activity-property-comparison',
    title: 'Four-Vial Properties Lab',
    typeLabel: 'Controlled comparison',
    purpose: 'Compare physical properties using equal testing conditions.',
    helpsWith: 'Distinguishing materials by observable and measurable properties',
    phaseId: phaseIds[2],
    evidenceId: 'evidence-property-trials',
    required: true,
    displayMode: 'expanded',
  },
  {
    id: 'activity-reaction-comparison',
    title: 'Chemical Screening Bench',
    typeLabel: 'Reaction simulation',
    purpose: 'Compare gas, temperature, and color evidence in closed vessels.',
    helpsWith: 'Finding evidence of chemical change without naming a correct candidate',
    phaseId: phaseIds[3],
    evidenceId: 'evidence-reaction-trials',
    required: true,
    displayMode: 'expanded',
  },
  {
    id: 'activity-conservation-model',
    title: 'Conservation Investigation',
    typeLabel: 'Particle model',
    purpose: 'Track mass and particles before and after a modeled reaction.',
    helpsWith: 'Explaining how system boundaries affect mass evidence',
    phaseId: phaseIds[4],
    evidenceId: 'evidence-conservation-trials',
    required: true,
    displayMode: 'expanded',
  },
  {
    id: 'activity-shelf-restoration',
    title: 'Shelf Investigation Bench',
    typeLabel: 'Decision activity',
    purpose: 'Build and defend a unique label, position, and handling plan for every vial.',
    helpsWith: 'Testing whether the current explanation accounts for the whole shelf',
    phaseId: phaseIds[5],
    evidenceId: 'evidence-shelf-case',
    required: true,
    displayMode: 'expanded',
  },
  {
    id: 'activity-emergency-response',
    title: 'Bay 3 Emergency Response',
    typeLabel: 'Timed identification',
    purpose: 'Identify an unlabeled shipment against a clock before a crew enters an acid spill.',
    helpsWith: 'Choosing the test that can actually settle a question when time is scarce',
    phaseId: phaseIds[6],
    evidenceId: 'evidence-emergency-response',
    required: true,
    displayMode: 'expanded',
  },
] as const satisfies readonly InvestigationActivityOption[];

export const templateCapabilityGaps = [
  'formativeMasteryAndReteach',
  'secureTeacherMetadataProjection',
] as const;

export const migratedInvestigationCapabilities = [
  'immersiveWorkspaceHost',
  'controlledComparisonSimulation',
  'performanceArtifactVersioning',
  'constrainedMultiEntityAssignment',
  'showcaseStudio',
] as const;
