import type {
  JourneyChoiceDefinition,
  JourneyHistoricalFrame,
  JourneyProjectConfig,
} from '../../templates/journey-replay/domain/journey-replay.models';

export const atlanticHistoricalFrame: JourneyHistoricalFrame = {
  setting: 'Your personal voyage · 1501',
  agency:
    'Choose your companions, loyalties, route, and response. Your choices change your fictional crew’s experience; historical events and their outcomes stay the same.',
  witnessGuidance:
    'Keep three things separate in your log: what your character witnesses in a fictional scene, what a historical source establishes, and what remains uncertain. You do not command a real historical expedition or decide another people’s history.',
  events: [
    {
      id: 'dias-1488',
      date: '1488',
      title: 'Dias rounds southern Africa',
      period: 'before-voyage',
      summary:
        'Bartolomeu Dias’s expedition rounds Africa’s southern tip. Your crew travels later; reaching the Cape does not replace his voyage.',
      sourceLabel: 'The Mariners’ Museum · Bartolomeu Dias',
      sourceUrl: 'https://exploration.marinersmuseum.org/subject/bartolomeu-dias/',
    },
    {
      id: 'tordesillas-1494',
      date: '1494',
      title: 'The Treaty of Tordesillas is signed',
      period: 'before-voyage',
      summary:
        'The Castilian and Portuguese crowns agree to a demarcation line west of Cape Verde. Your choice of a sponsor does not move that line or change the treaty.',
      sourceLabel: 'UNESCO · Treaty of Tordesillas',
      sourceUrl: 'https://www.unesco.org/en/memory-world/treaty-tordesillas',
    },
    {
      id: 'gama-1498',
      date: '1498',
      title: 'Da Gama reaches India',
      period: 'before-voyage',
      summary:
        'Vasco da Gama reaches India after sailing around Africa. Your route choices concern your own crew’s later passage, not whether this voyage succeeds.',
      sourceLabel: 'The Mariners’ Museum · Dias and da Gama',
      sourceUrl: 'https://exploration.marinersmuseum.org/subject/bartolomeu-dias/',
    },
    {
      id: 'cabral-1500',
      date: '1500',
      title: 'Cabral reaches the Brazilian coast',
      period: 'before-voyage',
      summary:
        'Pedro Álvares Cabral’s expedition lands near present-day Bahia. Your possible landfall farther north is a separate fictional journey. It does not make you Cabral or the first person to reach an inhabited coast.',
      sourceLabel: 'The Mariners’ Museum · Pedro Álvares Cabral',
      sourceUrl: 'https://exploration.marinersmuseum.org/subject/pedro-alvares-cabral/',
    },
    {
      id: 'victoria-1522',
      date: '1522',
      title: 'Victoria returns with Elcano',
      period: 'epilogue',
      summary:
        'Years after your story, Victoria returns to Spain under Juan Sebastián Elcano, completing the expedition begun under Magellan. This documented outcome is the same for every player. Your character did not witness it during the 1501 voyage.',
      sourceLabel: 'The Mariners’ Museum · Magellan’s expedition',
      sourceUrl: 'https://exploration.marinersmuseum.org/subject/ferdinand-magellan/',
    },
  ],
};

const personalChoices: Readonly<Record<string, Partial<JourneyChoiceDefinition>>> = {
  'mission-trade': {
    label: 'Join the merchant venture',
    summary:
      'Work with a fictional merchant group. Gain backing, spend a week negotiating, and carry its expectations.',
    question:
      'Why would you join the merchants? Use the ledger to explain whose interests you support and a cost your crew must accept.',
    consequence:
      'You join a fictional merchant venture. Its investment and expectations shape your crew’s voyage and what you are asked to record; they do not change any country’s trade policy.',
    sceneTitle: 'The Company You Keep',
  },
  'mission-mapping': {
    label: 'Sail with the chartmakers',
    summary:
      'Work alongside the navigator and chartmakers. Gain observations but accept weaker financial support.',
    question:
      'Why work with the chartmakers? Explain what you hope to learn, whose knowledge you need, and why your observations do not make an inhabited coast a new discovery.',
    consequence:
      'You sail with the chartmakers. Your own notebook gains observations and unanswered questions. The dates and achievements of documented voyages remain unchanged.',
    sceneTitle: 'A Place at the Chart Table',
  },
  'mission-influence': {
    label: 'Serve a sponsor’s agent',
    summary:
      'Accept a fictional agent’s commission. More support brings obligations that may conflict with your crew’s needs.',
    question:
      'Whose expectations are you accepting by joining this agent? Explain when loyalty to that patron might conflict with responsibility to your crew or the people you encounter.',
    consequence:
      'Your fictional sponsor’s agent accepts your proposal. You now carry personal obligations to that contact. You have not changed a monarch’s decision, a treaty, or an imperial boundary.',
    sceneTitle: 'A Commission and Its Obligations',
  },
  'route-choice-coastal': {
    question:
      'What would your crew be able to observe or ask about by taking the coastal route? Compare its costs with another route, separating your fictional experience from the historical record.',
  },
  'route-choice-islands': {
    question:
      'Why take your crew through the Azores? Explain what a rest stop and additional observations offer, and what the extra weeks cost you.',
  },
  'route-choice-direct': {
    question:
      'Why accept an open-water passage? Use the chart and instrument notes to explain what you can observe, what you must estimate, and who bears the risk.',
  },
  'storm-west': {
    question:
      'Do you follow the favorable winds west or honor the southern plan? Explain which responsibility you prioritize and why this changes your personal route rather than Cabral’s historical voyage.',
    consequence:
      'Your crew trims the torn sail and turns west. Later, you sight a coast in the region now called Brazil. This is your fictional arrival after Cabral’s 1500 voyage, at a different landing area. Your sponsor’s expectations, your reserves, and the observations in your log change; the historical record does not.',
  },
  'storm-south': {
    question:
      'Why keep your crew on the southern course? Explain the evidence, repair costs, and obligation you accept. Dias’s earlier passage around the Cape is already part of history.',
    consequence:
      'Your crew secures the repaired spar and works south toward the Cape. You follow waters other people have navigated before you. Keeping this personal commission affects your own stores and relationships, without changing Dias’s or da Gama’s voyages.',
  },
  'encounter-negotiate': {
    label: 'Support the interpreter’s approach',
    summary:
      'Back a slower, fuller agreement. Hear more perspectives and gain supplies, while spending time and trade goods.',
    question:
      'You stand with the interpreter’s request for time. Use both fictional accounts to explain that choice. What did your character witness, and what cannot be claimed about a real community from this invented scene?',
    consequence:
      'In this fictional local scene, you support the interpreter and witness an agreed exchange. You record the crew’s account alongside the community representative’s stated concerns. This agreement affects your crew; it does not erase documented conquest, coercion, or conflict elsewhere.',
  },
  'encounter-limited': {
    label: 'Back the quartermaster’s limited exchange',
    summary:
      'Prioritize a smaller agreed resupply and earlier departure. Keep less water and leave some questions unanswered.',
    question:
      'Why support the quartermaster’s smaller exchange? Use both accounts to explain the need you prioritize, whose concerns remain unresolved, and the limits of what you witnessed.',
    consequence:
      'In this fictional encounter, you support taking only the barrels agreed to. You witness a limited exchange and an early departure. Your journal records the terms and the unanswered questions, rather than claiming that your visit settled the community’s future.',
  },
  'encounter-withdraw': {
    label: 'Stand with the crew asking to wait offshore',
    summary:
      'Give the crew rest and avoid pressing for contact. Use your own reserves and learn only what can be observed offshore.',
    question:
      'Why stand with the sailors asking to remain offshore? Explain the cost of this choice and what your limited vantage point prevents you from claiming about life ashore.',
    consequence:
      'Your crew remains offshore. You witness the coastline from the ship, rest, and use your own provisions. Your notebook marks the limits of that view. Events ashore continue beyond your knowledge and control.',
  },
};

export function withHistoricalVoyage(base: JourneyProjectConfig): JourneyProjectConfig {
  const historicalSourceByStep: Readonly<Record<string, string>> = {
    'step-sponsor': 'tordesillas-1494',
    'step-supplies': 'dias-1488',
    'step-route': 'gama-1498',
    'step-storm': 'cabral-1500',
    'step-encounter': 'cabral-1500',
  };
  return {
    ...base,
    projectVersion: '1.3.0',
    historicalFrame: atlanticHistoricalFrame,
    subtitle: 'Your path through a history that stays true',
    drivingQuestion:
      'How do your loyalties, route, and response shape what you experience and understand within a history you cannot rewrite?',
    roles: ['Fictional crew captain', 'Navigator', 'Witness', 'Quartermaster', 'Chronicler'],
    learning: base.learning
      ? {
          ...base.learning,
          scopeNote:
            'Lead a fictional crew in 1501. Documented historical events remain fixed on every path. Your route, relationships, resources, and personal account can differ. The storm, dialogue, and resupply encounters are invented teaching scenes; the historical timeline has linked sources. Later events appear in a hindsight epilogue, not as knowledge your character had at sea.',
          targets: [
            ...base.learning.targets,
            'Distinguish personal experience, documented history, and inference.',
          ],
          responseFrame:
            'I chose to stand with __ / take __. Source paragraph __ supports __. My crew risks __. My character witnesses __, but I cannot conclude __. The documented historical event remains __.',
        }
      : undefined,
    map: {
      ...base.map,
      locations: base.map.locations.map((location) =>
        location.id === 'recife'
          ? {
              ...location,
              name: 'Brazilian coast · near present-day Recife',
              description:
                'A modern map reference for your fictional coastal arrival in 1501, separate from Cabral’s 1500 landfall near present-day Bahia.',
            }
          : location,
      ),
    },
    replay: {
      ...base.replay,
      title: 'My path through history',
      closingTitle: 'Your account ends. History continues.',
    },
    evidence: [
      ...base.evidence,
      ...atlanticHistoricalFrame.events
        .filter((event) => event.period === 'before-voyage')
        .map((event) => ({
          id: `history-${event.id}`,
          title: `${event.date} · ${event.title}`,
          sourceLabel: event.sourceLabel,
          sourceUrl: event.sourceUrl,
          provenance: 'secondary-source' as const,
          attribution: `${event.sourceLabel} · historical summary; the game’s personal-voyage comparison is a teaching note.`,
          summary: 'A documented event that your personal choices do not change.',
          paragraphs: [{ id: `history-${event.id}-fact`, text: event.summary }],
        })),
    ],
    steps: base.steps.map((step) => ({
      ...step,
      title:
        step.id === 'step-sponsor'
          ? 'Choose Your Company'
          : step.id === 'step-encounter'
            ? 'Whose Approach Will You Support?'
            : step.title,
      mission:
        step.id === 'step-sponsor'
          ? 'Choose whom your fictional crew works with. Your allegiance shapes obligations and access, while real historical events remain fixed.'
          : step.id === 'step-encounter'
            ? 'Witness a fictional encounter and choose whose approach to support. You control your participation and your account, not the community or the course of history.'
            : step.mission,
      choicePrompt:
        step.id === 'step-sponsor'
          ? 'Whom will you work with?'
          : step.id === 'step-encounter'
            ? 'Whose approach will you stand behind?'
            : step.choicePrompt,
      adventure: step.adventure
        ? {
            ...step.adventure,
            narrative:
              step.id === 'step-sponsor'
                ? 'Lisbon, 1501. Reports of earlier voyages travel from quay to quay. Your small fictional crew has its own berth and its own choices. The merchants want returns; the chartmakers want careful observations; a patron’s agent wants loyalty. You can choose whose company to keep. The events in the historical record have happened without you.'
                : step.id === 'step-storm'
                  ? 'Off Cape Verde, your fictional ship’s mainsail tears. “Line away!” A sailor catches the loose rope. One voice urges westward winds toward the coast reached by Cabral’s expedition the previous year; another insists on your southern commission. This is your crew’s crisis, not a replay in which you command Cabral or change his fate.'
                  : step.id === 'step-encounter'
                    ? 'At your chosen landfall, you watch small boats wait beyond the surf. In this invented encounter, the interpreter asks for time, the quartermaster wants a limited exchange, and tired sailors ask to remain offshore. People ashore have needs and decisions of their own. You choose whom to support and what to record about the scene you witness.'
                    : step.adventure.narrative,
            learningGoals: [
              ...step.adventure.learningGoals,
              'Separate your character’s experience from a sourced historical event.',
            ],
          }
        : undefined,
      choices: step.choices.map((choice) => ({
        ...choice,
        ...personalChoices[choice.id],
        evidenceIds: [...choice.evidenceIds, `history-${historicalSourceByStep[step.id]}`],
        planning: choice.planning
          ? {
              ...choice.planning,
              prompt:
                choice.planning.mode === 'sponsor'
                  ? 'Compare fictional contacts based in these places. You are choosing a personal commission, not deciding national policy.'
                  : 'Investigate a possible assignment with your chosen companions. These pins are proposals; your playable route is a separate Atlantic voyage.',
              targetPrompt:
                choice.planning.mode === 'sponsor'
                  ? 'Which contact would you work for?'
                  : 'Which proposed assignment would you investigate?',
              planPrompt: choice.planning.planPrompt
                ? 'What will you offer this fictional contact, and what obligation are you willing to accept?'
                : undefined,
              submitLabel: choice.planning.submitLabel
                ? 'Record your personal commission'
                : undefined,
              targets: choice.planning.targets.map((target) => ({
                ...target,
                details: `${target.details} This is background for your fictional assignment; choosing it does not create a historical voyage or alter a state’s decisions.`,
                decisionResponse:
                  choice.planning?.mode === 'sponsor'
                    ? `A fictional contact in ${target.label} offers a personal commission in this story. The commitment affects your crew’s backing and obligations; the country’s documented history remains unchanged.`
                    : target.decisionResponse,
              })),
            }
          : undefined,
      })),
    })),
  };
}
