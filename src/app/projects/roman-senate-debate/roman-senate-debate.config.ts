import type { DebateStudioProjectConfig } from '../../templates/debate-studio/domain/debate-studio.models';

export const romanSenateDebateConfig: DebateStudioProjectConfig = {
  schemaVersion: '2.0',
  template: { id: 'debate-studio', version: '2.0' },
  projectId: 'the-fate-of-the-republic',
  projectVersion: '2.0.0',
  sessionId: 'period-3-senate-session',
  title: 'The Fate of the Republic',
  subtitle: 'A shared Roman Senate debate',
  historicalSetting: 'Rome · The late Republic · 44 BCE',
  sessionDateLabel: 'World History · Period 3',
  centralQuestion: 'Was Julius Caesar a leader Rome needed, or a threat to the Roman Republic?',
  chamberImageUrl: '/debate-studio/roman-senate-chamber.png',
  chamberImageAlt:
    'An empty Roman Senate chamber with marble floors, facing benches, bronze braziers, and a central presiding chair.',
  factions: [
    {
      id: 'caesarian-reformers',
      name: 'Caesarian Reformers',
      railLabel: 'Caesarian Reformers',
      shortName: 'Caesarian Reformers',
      position: 'Caesar’s leadership and reforms were necessary responses to a Republic in crisis.',
      accent: '#c49b58',
      emblem: 'C',
      roles: [
        { id: 'opening-senator', label: 'Opening Senator', roundTypes: ['opening'] },
        { id: 'evidence-senator', label: 'Evidence Senator', roundTypes: ['response'] },
        { id: 'rebuttal-senator', label: 'Rebuttal Senator', roundTypes: ['rebuttal'] },
        { id: 'crossfire-senator', label: 'Crossfire Senator', roundTypes: ['crossfire'] },
        { id: 'closing-senator', label: 'Closing Senator', roundTypes: ['closing'] },
      ],
    },
    {
      id: 'republic-defenders',
      name: 'Defenders of the Republic',
      railLabel: 'Defenders of the Republic',
      shortName: 'Republic',
      position:
        'Caesar’s concentration of personal power threatened the institutions and liberty of the Republic.',
      accent: '#a94f43',
      emblem: 'R',
      roles: [
        { id: 'opening-senator', label: 'Opening Senator', roundTypes: ['opening'] },
        { id: 'evidence-senator', label: 'Evidence Senator', roundTypes: ['response'] },
        { id: 'rebuttal-senator', label: 'Rebuttal Senator', roundTypes: ['rebuttal'] },
        { id: 'crossfire-senator', label: 'Crossfire Senator', roundTypes: ['crossfire'] },
        { id: 'closing-senator', label: 'Closing Senator', roundTypes: ['closing'] },
      ],
    },
  ],
  rounds: [
    {
      id: 'opening',
      type: 'opening',
      label: 'Round I · Independent Openings',
      mode: 'parallel',
      moderatorBeforeTurn: false,
      timeLimitSeconds: 90,
      minimumSeconds: 60,
      minimumEvidence: 2,
      allowNewEvidence: true,
      preparationPrompts: [
        'State your faction’s answer to the central question.',
        'Establish the crisis facing the Republic.',
        'Use at least two historical sources.',
        'Explain what Rome risks if your faction is ignored.',
      ],
    },
    {
      id: 'response',
      type: 'response',
      label: 'Round II · The First Exchange',
      mode: 'alternating',
      speakerOrder: ['caesarian-reformers', 'republic-defenders'],
      moderatorBeforeTurn: true,
      timeLimitSeconds: 75,
      minimumSeconds: 45,
      minimumEvidence: 1,
      allowNewEvidence: true,
      preparationPrompts: [
        'Answer the moderator’s question directly.',
        'Respond to the exact opposing claim you marked.',
        'Use historical evidence.',
        'Explain why that evidence matters.',
        'Connect the answer to Rome’s future.',
      ],
    },
    {
      id: 'rebuttal',
      type: 'rebuttal',
      label: 'Round III · Rebuttal',
      mode: 'alternating',
      speakerOrder: ['caesarian-reformers', 'republic-defenders'],
      moderatorBeforeTurn: true,
      timeLimitSeconds: 60,
      minimumSeconds: 45,
      minimumEvidence: 1,
      allowNewEvidence: true,
      preparationPrompts: [
        'Name the opponent’s strongest argument fairly.',
        'Show where its reasoning or evidence fails.',
        'Answer with one decisive source.',
        'Explain the tradeoff your faction accepts.',
      ],
    },
    {
      id: 'crossfire',
      type: 'crossfire',
      label: 'Crossfire · The Unresolved Clash',
      mode: 'alternating',
      speakerOrder: ['caesarian-reformers', 'republic-defenders'],
      moderatorBeforeTurn: true,
      timeLimitSeconds: 45,
      minimumSeconds: 30,
      minimumEvidence: 1,
      allowNewEvidence: false,
      preparationPrompts: [
        'Answer in one clear claim.',
        'Use the strongest evidence already in the record.',
        'Name the consequence for the Republic.',
      ],
    },
    {
      id: 'closing',
      type: 'closing',
      label: 'Final Addresses',
      mode: 'parallel',
      moderatorBeforeTurn: false,
      timeLimitSeconds: 60,
      minimumSeconds: 45,
      minimumEvidence: 2,
      allowNewEvidence: false,
      preparationPrompts: [
        'Identify the most important argument in the record.',
        'Answer the strongest opposing point.',
        'Synthesize evidence already used.',
        'Tell the Senate what it must remember when deciding Rome’s future.',
      ],
    },
  ],
  moderator: {
    title: 'The Consul Calls the Question',
    displayName: 'Presiding Consul',
    initials: 'PC',
    mode: 'ai-draft-teacher-approve',
    requiredConcepts: [
      'republican government',
      'emergency power',
      'rule of law',
      'military loyalty',
      'political reform',
      'tradeoffs between order and liberty',
    ],
    promptPriorities: [
      'unanswered opponent claim',
      'conflict between claims',
      'competing interpretation of evidence',
      'unsupported assertion',
      'missing historical concept',
      'unacknowledged tradeoff',
    ],
  },
  evidence: [
    {
      id: 'ev-rubicon',
      title: 'The Rubicon is crossed',
      dateLabel: '49 BCE',
      sourceType: 'Political turning point',
      excerpt:
        'Caesar led an army across the boundary into Italy after the Senate ordered him to surrender command.',
      context:
        'Ask whether the act was a necessary defense against political enemies or an armed rejection of republican authority.',
      citation: 'Appian and Suetonius, later accounts of the civil war',
      perspective: 'Contested',
    },
    {
      id: 'ev-reforms',
      title: 'Reforms and relief',
      dateLabel: '46–44 BCE',
      sourceType: 'Public policy record',
      excerpt:
        'Caesar reorganized the calendar, founded colonies, expanded the Senate, and changed debt and grain policies.',
      context:
        'Measure practical results against the way the reforms were enacted and whose political power grew.',
      citation: 'Late Republican reform record',
      perspective: 'Multiple',
    },
    {
      id: 'ev-dictator',
      title: 'Dictator in perpetuity',
      dateLabel: '44 BCE',
      sourceType: 'Office and title',
      excerpt:
        'The Senate named Caesar dictator perpetuo, an office without the customary short emergency limit.',
      context:
        'Consider the difference between legal appointment and the survival of republican limits in practice.',
      citation: 'Roman fasti and later historical accounts',
      perspective: 'Republican institutions',
    },
    {
      id: 'ev-veterans',
      title: 'Soldiers and personal loyalty',
      dateLabel: '58–45 BCE',
      sourceType: 'Military relationship',
      excerpt:
        'Years of campaigning tied soldiers’ fortunes, land hopes, and loyalty closely to successful commanders.',
      context:
        'Does military loyalty explain Caesar’s effectiveness, or reveal a deeper danger to civilian government?',
      citation: 'Campaign histories and veteran settlement records',
      perspective: 'Army and state',
    },
    {
      id: 'ev-senate-crisis',
      title: 'A Republic already in crisis',
      dateLabel: '133–49 BCE',
      sourceType: 'Long-term pattern',
      excerpt:
        'Political violence, blocked reforms, civil conflict, and competing generals strained the Republic for generations.',
      context:
        'Use this evidence to test whether Caesar caused the collapse or accelerated problems already present.',
      citation: 'Late Republican political chronology',
      perspective: 'Structural',
    },
    {
      id: 'ev-cicero',
      title: 'Cicero on liberty and order',
      dateLabel: '46–44 BCE',
      sourceType: 'Contemporary political writing',
      excerpt:
        'Cicero’s surviving letters and works reveal both fear of one-man rule and anxiety about renewed civil war.',
      context:
        'A contemporary elite voice offers valuable evidence, but also reflects the interests and uncertainty of a senator.',
      citation: 'Cicero, letters and political works',
      perspective: 'Senatorial',
    },
  ],
  opinionOptions: [
    {
      id: 'leader-needed',
      label: 'Caesar was the leader Rome needed',
      factionId: 'caesarian-reformers',
    },
    {
      id: 'threat-republic',
      label: 'Caesar was a threat to the Republic',
      factionId: 'republic-defenders',
    },
    { id: 'unsure', label: 'Unsure' },
  ],
  voteCategories: [
    {
      id: 'final-verdict',
      label: 'The Final Verdict',
      prompt: 'Which faction made the stronger case?',
      optionSource: 'factions',
    },
    {
      id: 'evidence',
      label: 'Best Use of Evidence',
      prompt: 'Which faction used historical evidence most effectively?',
      optionSource: 'factions',
    },
    {
      id: 'rebuttal',
      label: 'Strongest Rebuttal',
      prompt: 'Which faction most directly answered its opponent?',
      optionSource: 'factions',
    },
    {
      id: 'speaker',
      label: 'Most Persuasive Speaker',
      prompt: 'Which senator most changed or challenged your thinking?',
      optionSource: 'speakers',
    },
    {
      id: 'argument',
      label: 'Most Important Argument',
      prompt: 'Which filed argument mattered most to your final decision?',
      optionSource: 'turns',
    },
  ],
  viewer: {
    studentId: 'preview-student-jordan',
    studentDisplayName: 'Jordan Lee',
    classLabel: 'World History · Period 3',
    classId: 'world-history-period-3',
    teacherDisplayName: 'Ms. Morgan',
    factionId: 'republic-defenders',
    roleLabel: 'Evidence Senator',
    mode: 'preview',
    allowTeacherPreview: true,
  },
  seedTurns: [
    {
      turnId: 'opening-caesarian-reformers',
      speakerId: 'student-maya',
      speakerDisplayName: 'Maya Torres',
      transcript:
        'Rome’s government had become corrupt and unable to solve major problems. Caesar did not create that crisis. His military victories protected Rome, and his reforms addressed debts, settlement, citizenship, and a calendar the Republic had failed to repair. Extraordinary conditions required leadership capable of acting.',
      evidenceIds: ['ev-senate-crisis', 'ev-reforms'],
      reasoningContribution:
        'The seriousness and duration of the crisis help explain why Romans accepted unusually strong leadership.',
      durationSeconds: 72,
      filedAt: '2026-09-02T15:10:00.000Z',
    },
    {
      turnId: 'opening-republic-defenders',
      speakerId: 'student-noah',
      speakerDisplayName: 'Noah Williams',
      transcript:
        'Political dysfunction did not give Caesar the right to gather permanent personal power. Crossing the Rubicon with loyal troops placed force above lawful transfer of command. Accepting dictatorship without the old time limit made the emergency itself a path to one-man rule.',
      evidenceIds: ['ev-rubicon', 'ev-dictator'],
      reasoningContribution:
        'A republic is most vulnerable when a crisis is used to remove the limits meant to protect it.',
      durationSeconds: 68,
      filedAt: '2026-09-02T15:18:00.000Z',
    },
    {
      turnId: 'response-caesarian-reformers',
      speakerId: 'student-elena',
      speakerDisplayName: 'Elena Ruiz',
      transcript:
        'Caesar’s dictatorship was necessary because the Senate could no longer govern effectively. The office was granted through Roman institutions, and he used it to settle veterans, reform public administration, and restore decisions after years of paralysis. Power should be judged by the public problems it solved.',
      evidenceIds: ['ev-reforms', 'ev-senate-crisis'],
      reasoningContribution:
        'Legal appointment and measurable reforms distinguish emergency leadership from power taken only for personal benefit.',
      durationSeconds: 58,
      filedAt: '2026-09-03T15:08:00.000Z',
    },
  ],
  seedModeratorPrompts: [
    {
      id: 'moderator-response-caesarian-reformers-1',
      targetTurnId: 'response-caesarian-reformers',
      question:
        'Both factions agree that the Republic was in crisis. The disagreement is whether crisis justified concentrating power in one leader. Where should Rome draw the line between emergency leadership and the destruction of republican government?',
      reason:
        'Both openings identified political crisis but disagreed about whether institutional limits could be suspended to solve it.',
      triggerTurnIds: ['opening-caesarian-reformers', 'opening-republic-defenders'],
      status: 'released',
    },
    {
      id: 'moderator-response-republic-defenders-1',
      targetTurnId: 'response-republic-defenders',
      question:
        'Caesar’s defenders argue that emergency powers are justified by the problems they solve. Republican senators, what evidence shows that Caesar’s power became part of the problem rather than the solution?',
      reason:
        'The Caesarian response defended concentrated power through results but did not identify a limit on that power.',
      triggerTurnIds: ['response-caesarian-reformers'],
      status: 'released',
    },
  ],
};
