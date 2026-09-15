import type {
  DebateStudioProjectConfig,
  DebateFactionRole,
} from '../../templates/debate-studio/domain/debate-studio.models';
import { hammurabiInquiry } from './hammurabi-on-trial.inquiry';
import { hammurabiDebateExchange } from './hammurabi-on-trial.exchange';

const roles: readonly DebateFactionRole[] = [
  { id: 'opening-advocate', label: 'Opening advocate', roundTypes: ['opening'] },
  { id: 'evidence-advocate', label: 'Evidence advocate', roundTypes: ['response'] },
  { id: 'rebuttal-advocate', label: 'Rebuttal advocate', roundTypes: ['rebuttal'] },
  { id: 'closing-advocate', label: 'Closing advocate', roundTypes: ['closing'] },
];
const laws = 'https://avalon.law.yale.edu/ancient/hamcode.asp';

export const hammurabiOnTrialConfig: DebateStudioProjectConfig = {
  schemaVersion: '2.0',
  template: { id: 'debate-studio', version: '2.0' },
  projectId: 'hammurabi-on-trial',
  projectVersion: '2.0.0',
  exchange: hammurabiDebateExchange,
  sessionId: 'babylon-hearing',
  title: 'Hammurabi on Trial',
  subtitle: 'Order. Fairness. Your verdict.',
  historicalSetting: 'Babylon · Mesopotamia · about 1750 BCE',
  sessionDateLabel: 'Grade 6 · Social Studies',
  centralQuestion: 'Did Hammurabi’s Code create order, fairness, both, or neither?',
  chamberImageUrl: '/debate-studio/babylon-hearing-v1.png',
  chamberImageAlt:
    'An imagined Old Babylonian courtyard with earthen brick walls, reed shade, clay tablets, and facing benches. Educational illustration, not a documented ancient courtroom.',
  presentation: { assembly: 'Hearing', seal: 'LAW', speaker: 'Student advocate' },
  inquiry: hammurabiInquiry,
  factions: [
    {
      id: 'case-for',
      name: 'The case for the Code',
      shortName: 'Case for',
      railLabel: 'Case for',
      position: 'Test how written judgments could settle disputes and protect people.',
      accent: '#d4ad6e',
      emblem: '+',
      roles,
    },
    {
      id: 'case-against',
      name: 'The case against the Code',
      shortName: 'Case against',
      railLabel: 'Case against',
      position: 'Test unequal treatment and the limits of royal claims about justice.',
      accent: '#79c4c2',
      emblem: '?',
      roles,
    },
  ],
  rounds: [
    {
      id: 'opening',
      type: 'opening',
      label: 'Opening cases',
      mode: 'parallel',
      moderatorBeforeTurn: false,
      timeLimitSeconds: 90,
      minimumSeconds: 0,
      minimumEvidence: 2,
      allowNewEvidence: true,
      preparationPrompts: [
        'State your assigned case.',
        'Cite two sources and explain them in context.',
        'Distinguish evidence for order from evidence for fairness.',
      ],
    },
    {
      id: 'response',
      type: 'response',
      label: 'Evidence exchange',
      mode: 'alternating',
      speakerOrder: ['case-for', 'case-against'],
      moderatorBeforeTurn: true,
      timeLimitSeconds: 90,
      minimumSeconds: 0,
      minimumEvidence: 1,
      allowNewEvidence: true,
      preparationPrompts: [
        'Listen to the actual opposing contribution.',
        'Name the claim you are answering.',
        'Explain why a cited law supports your response.',
      ],
    },
    {
      id: 'rebuttal',
      type: 'rebuttal',
      label: 'Questions and rebuttals',
      mode: 'alternating',
      speakerOrder: ['case-for', 'case-against'],
      moderatorBeforeTurn: true,
      timeLimitSeconds: 90,
      minimumSeconds: 0,
      minimumEvidence: 1,
      allowNewEvidence: true,
      preparationPrompts: [
        'Describe the strongest opposing interpretation fairly.',
        'Answer it with evidence.',
        'Propose a law change and predict a consequence for two groups.',
      ],
    },
    {
      id: 'closing',
      type: 'closing',
      label: 'Closing cases',
      mode: 'parallel',
      moderatorBeforeTurn: false,
      timeLimitSeconds: 90,
      minimumSeconds: 0,
      minimumEvidence: 2,
      allowNewEvidence: false,
      preparationPrompts: [
        'Explain what the evidence establishes and what remains uncertain.',
        'Respond to a limitation.',
        'Your personal verdict may differ from your assigned case.',
      ],
    },
  ],
  moderator: {
    title: 'A question for the hearing',
    displayName: 'Hearing moderator',
    initials: 'HM',
    mode: 'teacher-written',
    requiredConcepts: [
      'law and authority',
      'social hierarchy',
      'order and fairness',
      'source perspective',
      'unintended consequences',
    ],
    promptPriorities: [
      'unanswered claim',
      'source limitation',
      'individual explanation',
      'different consequences for different groups',
    ],
  },
  evidence: [
    {
      id: 'river-cities',
      title: 'Rivers, farms, and cities',
      dateLabel: 'Mesopotamian background',
      sourceType: 'Secondary learning summary',
      excerpt:
        'Southern Mesopotamian communities used irrigation to bring river water to fields. Farming supported cities, specialized work, and exchange. Shared water systems also created responsibilities between neighbors.',
      context:
        'Babylon was a city on the Euphrates in present-day Iraq. A city is not the same thing as an empire: an empire brings multiple territories and peoples under one ruler.',
      citation:
        'Learning summary; compare the irrigation dispute in Hammurabi, §55, and the Met’s Ur: The Ziggurat.',
      sourceUrl: 'https://www.metmuseum.org/essays/ur-the-ziggurat',
      perspective: 'Modern overview; a starting point to verify with sources',
    },
    {
      id: 'royal-monument',
      title: 'A king’s statement in stone',
      dateLabel: 'About 1750 BCE',
      sourceType: 'Artifact described by a museum',
      excerpt:
        'Hammurabi, king of Babylon, had a collection of judgments inscribed on a tall dark stone monument. The collection deals with family, property, work, and trade. A royal monument presents the ruler’s view of justice.',
      context:
        'Monarchy means rule by a king or queen. Hammurabi extended Babylon’s rule over other cities. A ruler’s claim to be just does not prove that every person experienced justice.',
      citation:
        'Louvre, The Code of Hammurabi; object Sb 8. Classroom paraphrase of the museum explanation, not words spoken by Hammurabi.',
      sourceUrl: 'https://www.louvre.fr/en/the-code-of-hammurabi',
      perspective: 'Royal self-presentation interpreted by a modern museum',
    },
    {
      id: 'law-48',
      title: 'Law 48 · A failed harvest',
      dateLabel: 'About 1750 BCE',
      sourceType: 'Primary law, adapted from translation',
      excerpt:
        'When a storm, failed harvest, or lack of water ruins a debtor’s crop, the law allows relief from the grain payment for that year.',
      context:
        'Compare the farmer’s needs with the lender’s expectations. This is a classroom paraphrase, not an exact quotation or a claim that all debts were erased.',
      citation:
        'Hammurabi §48; L. W. King translation hosted by Yale’s Avalon Project. Adapted for classroom reading.',
      sourceUrl: laws,
      perspective: 'Royal legal judgment',
    },
    {
      id: 'law-55',
      title: 'Law 55 · Water damages a neighbor’s field',
      dateLabel: 'About 1750 BCE',
      sourceType: 'Primary law, adapted from translation',
      excerpt:
        'Someone who carelessly floods a neighbor’s field while irrigating must replace the lost crop with grain.',
      context:
        'Use this law to test responsibility and compensation. It tells us an expected judgment, not how often judges enforced it.',
      citation: 'Hammurabi §55; L. W. King translation, Yale Avalon Project. Classroom paraphrase.',
      sourceUrl: laws,
      perspective: 'Royal legal judgment',
    },
    {
      id: 'law-fees',
      title: 'Laws 215–217 · Different medical fees',
      dateLabel: 'About 1750 BCE',
      sourceType: 'Primary laws, adapted from translation',
      excerpt:
        'For a successful operation described in these laws, the fee varies with the patient’s status: ten, five, or two shekels. For an enslaved patient, the owner pays.',
      context:
        'Social hierarchy means unequal positions in society. Translations use different labels for status groups; do not equate them directly with modern income groups. Compare who pays and whose interests are represented.',
      citation:
        'Hammurabi §§215–217; L. W. King translation, Yale Avalon Project. Classroom paraphrase; historical status terms need teacher explanation.',
      sourceUrl: laws,
      perspective: 'A society with legal status differences and enslavement',
    },
    {
      id: 'gods-and-king',
      title: 'Religion and royal authority',
      dateLabel: 'About 1750 BCE',
      sourceType: 'Primary prologue, summarized',
      excerpt:
        'The prologue names several gods and presents Hammurabi’s authority as connected to them. Polytheism is belief in many gods.',
      context:
        'Identify this as the ruler’s claim about his authority. Religious language can show beliefs and political purpose without proving that every subject agreed.',
      citation:
        'Hammurabi, prologue; L. W. King translation, Yale Avalon Project. Classroom summary.',
      sourceUrl: laws,
      perspective: 'Royal and religious authority',
    },
    {
      id: 'writing',
      title: 'Cuneiform · Writing that can travel through time',
      dateLabel: 'Old Babylonian period',
      sourceType: 'Artifact record and secondary explanation',
      excerpt:
        'Cuneiform is a writing system made from wedge-shaped signs. Scribes used it for languages including Sumerian and Akkadian. A surviving inscribed brick from Eshnunna is one example of writing on building material.',
      context:
        'The linked brick is from about the 20th century BCE, earlier than Hammurabi. It is not a piece of his law monument. Writing is a system; Akkadian is a language.',
      citation:
        'Metropolitan Museum of Art, Inscribed brick, 41.160.188, Eshnunna, ca. 20th century BCE; classroom explanation.',
      sourceUrl: 'https://www.metmuseum.org/art/collection/search/323756',
      perspective: 'Material evidence interpreted by a museum',
    },
    {
      id: 'ziggurat',
      title: 'Monumental architecture · The ziggurat at Ur',
      dateLabel: 'Built before Hammurabi’s reign',
      sourceType: 'Secondary museum explanation',
      excerpt:
        'Ziggurats were large stepped structures made from brick. Building and maintaining them required organized materials and labor, and they were associated with religious life.',
      context:
        'Ur is a different Mesopotamian city from Babylon. Its ziggurat provides regional context, not a photograph of Hammurabi’s hearing room. Large buildings can express religious and political importance.',
      citation: 'Metropolitan Museum of Art, Ur: The Ziggurat. Classroom paraphrase.',
      sourceUrl: 'https://www.metmuseum.org/essays/ur-the-ziggurat',
      perspective: 'Modern interpretation of architecture',
    },
    {
      id: 'epic',
      title: 'Epic literature · Gilgamesh and Huwawa',
      dateLabel: 'Sumerian literary tradition',
      sourceType: 'Primary literary text in translation',
      excerpt: '“I want to set off into the mountains, to establish my renown there.”',
      context:
        'In this story Gilgamesh seeks lasting fame and speaks to the god Utu. Epic literature tells stories of heroic deeds and human concerns. It is evidence about literature and values, not an eyewitness report of Hammurabi’s life.',
      citation:
        'Gilgamesh and Huwawa, version A, lines 21–33. ETCSL 1.8.1.5, University of Oxford translation. Brief exact excerpt; Gilgamesh is rendered Gilgamec in that edition.',
      sourceUrl: 'https://etcsl.orinst.ox.ac.uk/section1/tr1815.htm',
      perspective: 'Literary story, not a legal record',
    },
  ],
  opinionOptions: [
    { id: 'order', label: 'Order' },
    { id: 'fairness', label: 'Fairness' },
    { id: 'both', label: 'Both' },
    { id: 'neither', label: 'Neither' },
  ],
  voteCategories: [
    {
      id: 'evidence',
      label: 'Evidence reflection',
      prompt: 'Which case best connected a claim to its sources? This vote is not a grade.',
      optionSource: 'factions',
    },
  ],
  viewer: {
    studentId: 'preview-learner',
    studentDisplayName: 'Learner',
    classLabel: 'Grade 6 Social Studies',
    classId: 'babylon-pilot',
    teacherDisplayName: 'Teacher',
    factionId: 'case-for',
    roleLabel: 'Student advocate',
    mode: 'preview',
    allowTeacherPreview: true,
  },
  seedTurns: [],
  seedModeratorPrompts: [],
};
