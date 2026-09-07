import type {
  JourneyEvidenceDefinition,
  JourneyProjectConfig,
} from '../../templates/journey-replay/domain/journey-replay.models';

const attribution =
  'Forge classroom writing team · fictional teaching reconstruction, not a historical quotation';
export const expeditionEvidence: readonly JourneyEvidenceDefinition[] = [
  {
    id: 'evidence-spice-ledger',
    title: 'Practice Merchant Ledger',
    sourceLabel: 'Fictional classroom ledger',
    provenance: 'classroom-reconstruction',
    attribution,
    summary:
      'Compare a merchant’s expected earnings with the costs that the ledger leaves uncertain.',
    paragraphs: [
      {
        id: 'ledger-1',
        text: 'Our practice ledger lists one cargo of pepper bought for 10 coins and a hoped-for selling price of 30 coins. These invented numbers let us compare motives; they are not historical prices.',
      },
      {
        id: 'ledger-2',
        text: 'Food, repairs, wages, and lost cargo must be paid before a merchant earns a profit. A shorter route may cost less, but an unsafe route can lose the whole cargo.',
      },
      {
        id: 'ledger-3',
        text: 'The merchant’s ledger counts goods and money. It does not tell us whether people at a trading port agreed to the exchange or how the voyage affected their lives.',
      },
    ],
  },
  {
    id: 'evidence-portolan',
    title: 'Practice Coastal Chart Notes',
    sourceLabel: 'Fictional navigator’s notes',
    provenance: 'classroom-reconstruction',
    attribution,
    summary: 'Read the live map and compare routes using these simulated chart notes.',
    paragraphs: [
      {
        id: 'chart-1',
        text: 'Lisbon is north of Cape Verde. The coastal option stays near the western African shore; the direct option crosses open water. Use the route comparison to identify which option is shorter.',
      },
      {
        id: 'chart-2',
        text: 'The island route first heads west to the Azores, then turns south. A stop offers a planned refuge, but the detour uses more time and provisions.',
      },
      {
        id: 'chart-3',
        text: 'A chart may record what its makers know and omit what other communities know. A blank area on a European chart does not mean no one lives there or knows its geography.',
      },
    ],
  },
  {
    id: 'evidence-astrolabe',
    title: 'Navigation Tool Notes',
    sourceLabel: 'Classroom explanation',
    provenance: 'classroom-reconstruction',
    attribution,
    summary: 'Different tools answer different navigation questions.',
    paragraphs: [
      {
        id: 'tools-1',
        text: 'A compass helps a navigator keep a direction. A chart helps connect directions with known coasts, islands, and ports.',
      },
      {
        id: 'tools-2',
        text: 'A mariner’s astrolabe can help estimate latitude by measuring the angle of a celestial object above the horizon. Clouds, a moving ship, and measurement errors make this difficult.',
      },
      {
        id: 'tools-3',
        text: 'Tools do not make a route safe on their own. A navigator must compare measurements, observations, supplies, and information from other people.',
      },
    ],
  },
  {
    id: 'evidence-wind-chart',
    title: 'Practice Wind and Resupply Notes',
    sourceLabel: 'Simulated voyage observations',
    provenance: 'classroom-reconstruction',
    attribution,
    summary: 'Use these conditions for the simulation; they are not a weather forecast.',
    paragraphs: [
      {
        id: 'wind-1',
        text: 'In this simulation, the direct route benefits from trade winds and takes three weeks. It offers fewer planned stops than the coastal route, which takes four weeks.',
      },
      {
        id: 'wind-2',
        text: 'The Azores route takes six weeks. A planned island stop can provide refuge, but supplies are consumed throughout the longer voyage.',
      },
      {
        id: 'wind-3',
        text: 'Wind and repair delays can increase the time at sea. Extra drinking water and food protect the crew during a delay, but occupy cargo space.',
      },
    ],
  },
  {
    id: 'evidence-storm-log',
    title: 'Practice Storm Log',
    sourceLabel: 'Fictional crisis record',
    provenance: 'classroom-reconstruction',
    attribution,
    summary: 'The damaged ship faces two possible responses.',
    paragraphs: [
      {
        id: 'storm-1',
        text: 'The mainsail is torn. Continuing directly into difficult southern conditions could worsen the damage. The crew needs time, tools, and material to repair it.',
      },
      {
        id: 'storm-2',
        text: 'Turning west follows the simulated favorable winds toward Brazil. It uses fewer supplies than the southern option but changes the expedition’s intended direction.',
      },
      {
        id: 'storm-3',
        text: 'Repairing and continuing south preserves a route toward the Cape of Good Hope. It takes longer and costs more supplies. A preparation choice changes the supplies you have, but these route costs are fixed in this version of the simulation.',
      },
    ],
  },
  {
    id: 'evidence-port-accounts',
    title: 'Two Reconstructed Accounts of an Exchange',
    sourceLabel: 'Two fictional perspectives — not testimony from a real community',
    provenance: 'classroom-reconstruction',
    attribution,
    summary: 'Read both accounts. Distinguish what each speaker claims from what we can establish.',
    paragraphs: [
      {
        id: 'account-ship',
        perspective: 'Expedition recorder',
        text: 'We asked for water and food. I wrote that the meeting was peaceful because our crew returned unharmed. We offered goods, but I did not understand every word the interpreter used. Our captain wanted to leave before the weather changed.',
      },
      {
        id: 'account-community',
        perspective: 'Community representative',
        text: 'We needed to keep enough food and water for our own households. The visitors called their offer fair, but we had not agreed on what they would give in return. We wanted more time to speak together and explain our terms.',
      },
      {
        id: 'account-limits',
        perspective: 'Source note',
        text: 'These invented accounts describe the same classroom scenario from two positions. Neither establishes everyone’s views. Identify a specific disagreement, explain each speaker’s interest, and name one question that would require more evidence. Do not present these paragraphs as historical testimony.',
      },
    ],
  },
];

export const expeditionLearning: NonNullable<JourneyProjectConfig['learning']> = {
  scopeNote:
    'Atlantic expedition · five decision chapters. This is a historical inquiry simulation, not a circumnavigation or a speed contest. The terrain is illustrative; route times, costs, and events are simulation rules. Discuss whose knowledge and interests each source represents.',
  targets: [
    'Use a source detail and map evidence to explain a choice.',
    'Compare a benefit, cost, and uncertainty.',
    'Explain more than one perspective.',
    'Revisit your reasoning after consequences or feedback.',
  ],
  responseFrame:
    'I chose __. Paragraph __ says/shows __. This matters because __. Compared with __, my choice risks __.',
  requireCitation: true,
  requirePrediction: true,
  glossary: [
    {
      term: 'Astrolabe',
      definition:
        'An instrument used to measure angles in the sky, which can help estimate latitude.',
    },
    {
      term: 'Portolan',
      definition: 'A type of sailing chart focused on coasts, ports, and directions.',
    },
    { term: 'Resupply', definition: 'To obtain more food, water, or materials.' },
    { term: 'Tradeoff', definition: 'Something you give up to gain something else.' },
    {
      term: 'Perspective',
      definition: 'A viewpoint shaped by a person’s experiences, position, and interests.',
    },
    { term: 'Strategic', definition: 'Chosen to help reach a longer-term goal.' },
    { term: 'Influence', definition: 'The ability to affect what other people decide or do.' },
  ],
  criteria: [
    {
      id: 'evidence',
      label: 'Evidence',
      question: 'Which exact source detail supports your choice, and why does it matter?',
      proficient:
        'Name a source paragraph, describe an accurate detail, and connect it to your decision.',
    },
    {
      id: 'geography',
      label: 'Geography',
      question:
        'How do location, distance, wind, or resupply make one alternative different from another?',
      proficient:
        'Compare two plausible choices using geographic information. State what remains uncertain.',
    },
    {
      id: 'consequences',
      label: 'Cause and consequence',
      question:
        'What do you predict will happen? What benefit, cost, and uncertainty are you accepting?',
      proficient:
        'Explain how your choice could lead to an outcome; revisit that prediction after the chapter.',
    },
    {
      id: 'perspective',
      label: 'Perspective',
      question: 'Who benefits, who could be harmed, and whose view or knowledge is missing?',
      proficient:
        'Use evidence to explain more than one viewpoint. A benefit to the ship does not measure harm to a community.',
    },
  ],
};
