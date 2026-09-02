import type { ProjectPackageLocation } from '../core/packages/project-package-contracts';

export const simpleProjectLocation: ProjectPackageLocation = {
  tenantId: 'tenant-school-1',
  projectId: 'project-linear-investigation',
  projectVersion: '1.0.0',
  reference: 'fixtures/project-linear-investigation',
};

export const simpleProjectPackage: Readonly<Record<string, unknown>> = {
  'project.json': {
    id: 'project-linear-investigation',
    schemaVersion: '1.0',
    title: 'Linear Investigation Fixture',
    template: { id: 'investigation', version: '1.0' },
    projectType: 'investigation',
    gradeLevels: [7],
    subjects: { primary: 'science' },
    status: 'draft',
    investigationConfigRef: 'investigation.json',
    capabilities: [
      'caseBoard',
      'evidence',
      'hypotheses',
      'activities',
      'rules',
      'state',
      'limitedResources',
      'randomization',
      'scriptedNPCs',
      'finalSubmission',
    ],
  },
  'investigation.json': {
    id: 'investigation-linear',
    schemaVersion: '1.0',
    goals: ['determineCause'],
    solutionModel: 'multipleDefensible',
    phases: [
      {
        id: 'phase-start',
        schemaVersion: '1.0',
        title: 'Start',
        order: 1,
        activityIds: ['act-test'],
        lessonIds: ['lesson-method'],
      },
      {
        id: 'phase-final',
        schemaVersion: '1.0',
        title: 'Final',
        order: 2,
        entryRuleIds: ['rule-evidence-opens-phase'],
      },
    ],
    openness: {
      evidenceOrder: 'partiallyOpen',
      activityOrder: 'fixed',
      lessonOrder: 'fixed',
      allowDecoys: false,
      allowOptionalEvidence: true,
      allowRevisit: true,
      allowHypothesisRevision: true,
      requireHypothesisRevision: true,
      allowMultipleHypotheses: true,
      teacherOverrideAllowed: true,
    },
    hypotheses: {
      mode: 'studentGenerated',
      allowMultiple: true,
      requireRevision: true,
      trackHistory: true,
    },
  },
  'case-board.json': {
    id: 'board-linear',
    schemaVersion: '1.0',
    layoutMode: 'columns',
    sections: [
      {
        id: 'board-evidence',
        schemaVersion: '1.0',
        type: 'evidence',
        title: 'Evidence',
        order: 1,
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
    items: [
      {
        id: 'ev-intro',
        schemaVersion: '1.0',
        title: 'Initial Observation',
        evidenceType: 'observation',
        content: { text: 'An initial observation.' },
        availability: { initialState: 'available' },
        requirement: 'required',
      },
      {
        id: 'ev-result',
        schemaVersion: '1.0',
        title: 'Activity Result',
        evidenceType: 'measurement',
        content: { text: 'A measured result.' },
        availability: {
          initialState: 'locked',
          ruleIds: ['rule-activity-unlocks-evidence'],
        },
        requirement: 'required',
        unlockRuleIds: ['rule-activity-unlocks-evidence'],
      },
    ],
  },
  'activities.json': {
    schemaVersion: '1.0',
    items: [
      {
        id: 'act-test',
        schemaVersion: '1.0',
        title: 'Run Test',
        type: 'measurement',
        required: true,
        extensions: {
          investigation: {
            evidenceProducedIds: ['ev-result'],
            resourceCosts: [{ resourceId: 'resource-credits', amount: 1 }],
            ruleIds: ['rule-activity-unlocks-evidence'],
            randomizationIds: ['random-variant'],
          },
        },
      },
    ],
  },
  'lessons.json': {
    schemaVersion: '1.0',
    items: [
      {
        id: 'lesson-method',
        schemaVersion: '1.0',
        title: 'Method',
        contentRef: 'content/method.md',
        required: true,
      },
    ],
  },
  'rules.json': {
    schemaVersion: '1.0',
    items: [
      {
        id: 'rule-activity-unlocks-evidence',
        schemaVersion: '1.0',
        trigger: { eventType: 'activity.completed', targetId: 'act-test' },
        actions: [
          { type: 'evidence.unlock', targetId: 'ev-result' },
          { type: 'resource.add', targetId: 'resource-credits', value: 1 },
        ],
        repeatable: false,
        priority: 100,
        enabled: true,
      },
      {
        id: 'rule-evidence-opens-phase',
        schemaVersion: '1.0',
        trigger: { eventType: 'evidence.collected' },
        conditions: {
          operator: 'AND',
          conditions: [
            {
              type: 'evidence.count',
              operator: 'greaterThanOrEqual',
              value: 2,
              params: { status: 'collected' },
            },
          ],
        },
        actions: [{ type: 'phase.unlock', targetId: 'phase-final' }],
        repeatable: false,
        priority: 50,
        enabled: true,
      },
      {
        id: 'rule-revision-opens-final',
        schemaVersion: '1.0',
        trigger: { eventType: 'hypothesis.revised' },
        conditions: {
          operator: 'AND',
          conditions: [
            {
              type: 'hypothesis.revised',
              operator: 'greaterThan',
              value: 1,
            },
          ],
        },
        actions: [{ type: 'finalSubmission.open' }],
        repeatable: false,
        priority: 25,
        enabled: true,
      },
      {
        id: 'rule-npc-path',
        schemaVersion: '1.0',
        trigger: { eventType: 'npc.questionAsked', targetId: 'npc-guide' },
        actions: [{ type: 'state.set', targetId: 'case.path', value: 'npc' }],
        repeatable: false,
        priority: 10,
        enabled: true,
      },
    ],
  },
  'state.json': {
    schemaVersion: '1.0',
    items: [
      {
        id: 'case.progress',
        schemaVersion: '1.0',
        stateType: 'number',
        initialValue: 0,
        min: 0,
        max: 10,
        mutable: true,
      },
      {
        id: 'case.path',
        schemaVersion: '1.0',
        stateType: 'choice',
        initialValue: 'default',
        allowedValues: ['default', 'npc'],
        mutable: true,
      },
      {
        id: 'case.variant',
        schemaVersion: '1.0',
        stateType: 'choice',
        initialValue: 'a',
        allowedValues: ['a', 'b'],
        mutable: true,
      },
    ],
  },
  'resources.json': {
    schemaVersion: '1.0',
    items: [
      {
        id: 'resource-credits',
        schemaVersion: '1.0',
        title: 'Credits',
        resourceType: 'points',
        initialAmount: 2,
        min: 0,
        max: 3,
        studentVisible: true,
        sharedMode: 'individual',
      },
    ],
  },
  'randomization.json': {
    schemaVersion: '1.0',
    items: [
      {
        id: 'random-variant',
        schemaVersion: '1.0',
        scope: 'student',
        strategy: 'choice',
        seedStrategy: 'student',
        options: [{ value: 'a' }, { value: 'b' }],
        outputStateId: 'case.variant',
      },
    ],
  },
  'npcs.json': {
    schemaVersion: '1.0',
    items: [
      {
        id: 'npc-guide',
        schemaVersion: '1.0',
        title: 'Guide',
        characterType: 'guide',
        dialogueNodes: [
          {
            id: 'dialogue-clue',
            studentPrompt: 'What happened?',
            response: 'Look at the result.',
            evidenceProducedIds: ['ev-result'],
          },
        ],
      },
    ],
  },
  'final-submission.json': {
    id: 'final-linear',
    schemaVersion: '1.0',
    submissionType: 'investigationReport',
    teamMode: 'individual',
    availabilityRuleIds: ['rule-revision-opens-final'],
    sections: [
      {
        id: 'final-claim',
        schemaVersion: '1.0',
        type: 'claim',
        title: 'Claim',
        required: true,
      },
    ],
  },
};
