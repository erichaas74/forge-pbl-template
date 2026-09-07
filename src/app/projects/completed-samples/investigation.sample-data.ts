import type { RuntimeStateSnapshot } from '../../templates/investigation/domain/runtime-state';
import type { InvestigationEvidenceItem } from '../../templates/investigation/ui/investigation-ui.models';
import type { SampleGuide } from '../../shared/project-intro/completed-sample-guide';

const date = '2026-04-16T14:00:00.000Z';
export const investigationSampleEvidence: readonly InvestigationEvidenceItem[] = [
  {
    id: 'physical',
    title: 'Physical trials · Lookalikes separated',
    type: 'Trial record',
    source: 'Team Catalyst · equal sample portions, clean equipment, water baseline',
    status: 'usedInClaim',
    classification: 'supports',
    important: true,
    studentCreated: true,
    summary:
      'A and B both dissolved, but only A conducted electricity above the water baseline. C conducted; D stayed cloudy.',
    notes: [
      'Same amount of sample and water for each comparison. Conductivity supports an identification only when combined with the other trials.',
    ],
    resultMatrix: {
      title: 'Physical-properties comparison',
      columnLabels: ['Appearance', 'In water', 'Conductivity'],
      rows: [
        { id: 'a', label: 'Vial A', cells: ['White crystals', 'Clear solution', 'Above baseline'] },
        { id: 'b', label: 'Vial B', cells: ['White crystals', 'Clear solution', 'At baseline'] },
        { id: 'c', label: 'Vial C', cells: ['White powder', 'Dissolves', 'Above baseline'] },
        { id: 'd', label: 'Vial D', cells: ['White powder', 'Cloudy suspension', 'At baseline'] },
      ],
    },
  },
  {
    id: 'chemical',
    title: 'Chemical trials · The decisive split',
    type: 'Trial record',
    source: 'Team Catalyst · virtual reaction bench',
    status: 'usedInClaim',
    classification: 'supports',
    important: true,
    studentCreated: true,
    summary:
      'C bubbled for 18 seconds with Solution A. D turned blue-black with Indicator B; the other vials did not.',
    notes: [
      'C changed from 22°C to 19°C during the Solution A trial. The control did not bubble. Bubbles and temperature change support a reaction; they do not identify a substance by themselves.',
    ],
    resultMatrix: {
      title: 'Controlled reaction comparison',
      columnLabels: ['Solution A', 'Indicator B'],
      rows: [
        { id: 'a', label: 'Vial A', cells: ['No visible reaction', 'No blue-black change'] },
        { id: 'b', label: 'Vial B', cells: ['No visible reaction', 'No blue-black change'] },
        { id: 'c', label: 'Vial C', cells: ['Bubbles · 18 seconds', 'No blue-black change'] },
        { id: 'd', label: 'Vial D', cells: ['No visible reaction', 'Blue-black'] },
      ],
    },
  },
  {
    id: 'mass',
    title: 'Closed-chamber mass record',
    type: 'Measurement',
    source: 'Team Catalyst · sealed virtual chamber, same apparatus before and after',
    status: 'usedInClaim',
    classification: 'supports',
    important: true,
    studentCreated: true,
    summary:
      'Total mass stayed at 125.0 g before and after C reacted. Gas formed but remained inside the sealed chamber.',
    notes: [
      'The measurement is for the whole closed system. A new gas does not mean matter disappeared.',
    ],
    resultMatrix: {
      title: 'Closed-system mass',
      columnLabels: ['Before', 'After'],
      rows: [{ id: 'total', label: 'Chamber + all contents', cells: ['125.0 g', '125.0 g'] }],
    },
  },
  {
    id: 'labels',
    title: 'Recovered label list',
    type: 'Document',
    source: 'Classroom case file · recovered inventory card',
    status: 'usedInClaim',
    classification: 'supports',
    important: false,
    studentCreated: false,
    summary:
      'The shelf inventory lists salt, sugar, baking soda, and cornstarch. The card identifies the possible substances, but not which vial holds each one.',
    notes: ['The list narrows the candidates; the experimental results establish their positions.'],
  },
  {
    id: 'key',
    title: 'Indicator B interpretation key',
    type: 'Reference',
    source: 'Classroom case file · supplied reagent key',
    status: 'usedInClaim',
    classification: 'supports',
    important: true,
    studentCreated: false,
    summary:
      'In this case, a blue-black Indicator B result supports the presence of starch. D was the only vial to show that result.',
    notes: [
      'Use only the supplied virtual test and interpretation key; the cartoon launch is not a laboratory procedure.',
    ],
  },
  {
    id: 'appearance',
    title: 'First guess · A and B must be the same',
    type: 'Initial observation',
    source: 'Maya’s opening notebook entry',
    status: 'usedInClaim',
    classification: 'contradicts',
    important: false,
    studentCreated: true,
    summary:
      '“A and B look like the same white crystals.” That first guess conflicts with their different conductivity results.',
    notes: [
      'Appearance is real evidence, but it cannot distinguish these two candidates. We revised the guess rather than discarding the measurement.',
    ],
  },
  {
    id: 'witness',
    title: 'Shelf monitor’s uncertain memory',
    type: 'Witness note',
    source: 'Classroom case file · shelf monitor',
    status: 'usedInClaim',
    classification: 'uncertain',
    important: false,
    studentCreated: false,
    summary:
      'The shelf monitor remembers two similar powders but cannot reliably remember their positions.',
    notes: [
      'This account explains the confusion. It cannot override repeatable tests or place C and D by itself.',
    ],
  },
];

export function createInvestigationSample(): RuntimeStateSnapshot {
  const scope = {
    tenantId: 'completed-sample',
    projectId: 'mystery-substance',
    projectVersion: '1.0.0',
    studentId: 'sample-maya',
    teamId: 'sample-catalyst',
    scopeType: 'team' as const,
  };
  return {
    version: 12,
    ...scope,
    scope,
    lastUpdated: date,
    stateValues: {},
    firedRuleIds: [],
    evidence: Object.fromEntries(
      investigationSampleEvidence.map((item) => [
        item.id,
        { status: 'usedInClaim', classification: item.classification },
      ]),
    ),
    studentEvidence: {},
    evidenceRelationships: [],
    artifacts: {},
    activities: {},
    resources: {},
    board: { itemLocations: {} },
    phases: {},
    lessons: {},
    requirements: { hypothesisRequired: true, revisionRequired: true },
    hypotheses: [
      {
        id: 'shelf-theory',
        label: 'Restored shelf',
        statement: 'A is salt, B is sugar, C is baking soda, and D is cornstarch.',
        selected: true,
        confidence: 90,
        evidenceIds: ['physical', 'chemical', 'key'],
        revisions: [
          {
            revisionId: 'first',
            hypothesisId: 'shelf-theory',
            timestamp: '2026-04-15T14:00:00.000Z',
            statement:
              'A and B may be the same substance because both are white crystals. C and D are powders.',
            confidence: 55,
            evidenceIds: ['appearance'],
            remainingQuestion: 'Which tests separate the lookalike pairs?',
          },
          {
            revisionId: 'revised',
            hypothesisId: 'shelf-theory',
            timestamp: date,
            statement: 'A is salt, B is sugar, C is baking soda, and D is cornstarch.',
            confidence: 90,
            evidenceIds: ['physical', 'chemical', 'key'],
            reasonForChange:
              'Conductivity separated A/B. The gas and indicator results separated C/D.',
          },
        ],
      },
    ],
    finalSubmission: {
      status: 'open',
      availabilityStatus: 'open',
      submissionStatus: 'notSubmitted',
      approvalStatus: 'notRequired',
      gradeStatus: 'ungraded',
      artifactIds: [],
      argumentDraft: {
        identification:
          'Restore the shelf as A: salt; B: sugar; C: baking soda; D: cornstarch. The inventory gives us four candidates. Matching more than one test to each candidate gives a stronger identification than appearance alone.',
        evidenceIds: investigationSampleEvidence.map((item) => item.id),
        reasoning:
          'A and B looked alike and both dissolved. A’s solution conducted above the water baseline, while B stayed at baseline, separating salt from sugar. C produced gas for 18 seconds with Solution A and cooled from 22°C to 19°C. D formed a cloudy suspension and turned blue-black with Indicator B, matching the supplied starch key. The sealed chamber stayed at 125.0 g before and after C’s reaction: the gas remained inside the system, so the total measured mass was conserved.',
        counterevidence:
          'Our strongest challenge was the identical appearance of A and B. It supported our first guess, but the conductivity comparison showed a difference that sight could not reveal. The shelf monitor also remembered similar powders; uncertain memory does not establish their positions. We kept these clues and explained their limits.',
        uncertainty:
          'Our conclusion is limited to these four inventory candidates and the supplied virtual tests. Contamination or measurement error could change a result. Repeat the decisive tests with clean equipment before a teacher verifies the labels.',
        recommendation:
          'Keep every vial sealed and separate. Ask the teacher to verify the identification and repeated results before restoring the shelf. Attach the substance name, vial letter, verification date, and handling instructions. Never taste or mix an unknown substance.',
        confidence: 90,
        reflection:
          'I began at 55% confidence because I trusted what the samples looked like. I moved to 90% after the conductivity and indicator tests separated the pairs. More evidence raised my confidence, but it did not remove all uncertainty.',
        individualContribution:
          'I, Maya Ortiz, recorded the water baseline and conductivity results, compared the before-and-after mass, and revised our explanation of why the first appearance clue was insufficient.',
      },
    },
    solutionRevealed: false,
    messages: [],
    teacherNotifications: [],
    teacherReleases: {},
    teamTasks: {},
  };
}
export const investigationSampleGuide: SampleGuide = {
  title: 'Case Closed: The Restored Shelf',
  subtitle:
    'Open Maya’s completed case file. Inspect the test records, challenge the first guess, and see how four lookalike samples became a defensible conclusion.',
  audience: 'Science · Grade 5',
  duration: 'Explore in 2–3 minutes',
  trail: [
    {
      label: 'First idea',
      title: '“They look the same.”',
      text: 'Maya and Team Catalyst grouped the two crystals and the two powders at 55% confidence.',
      evidence: 'First guess and the first saved theory revision.',
    },
    {
      label: 'Evidence',
      title: 'One test was not enough.',
      text: 'Conductivity separated A from B; the gas and starch-indicator results separated C from D. The closed-chamber mass stayed constant.',
      evidence:
        'Physical trials, chemical trials, and closed-chamber record. Open their Preview buttons.',
    },
    {
      label: 'Revision',
      title: 'Keep the awkward clue.',
      text: 'The final case preserves the original appearance clue as a challenge and the shelf monitor’s memory as uncertain evidence.',
      evidence: 'Challenges and Uncertain filters; counterevidence section.',
    },
    {
      label: 'Final defense',
      title: 'A recommendation with limits.',
      text: 'The 90% conclusion includes repeat testing, teacher verification, safe labeling, and Maya’s individual contribution.',
      evidence: 'Restoration recommendation, uncertainty, and reflection.',
    },
  ],
  review: {
    strength:
      'The student explains why a result distinguishes candidates, rather than listing observations alone.',
    question:
      'Which single result best separates A and B, and why would appearance alone leave you uncertain?',
    revision:
      'The first visual grouping changes into four identities supported by distinct test patterns.',
    assessment:
      'Look for controlled comparison, interpretation of evidence, conservation of mass, and an honest account of uncertainty. Complete sections are not an automatic mastery judgment.',
  },
};
