import type {
  JourneyAdventureDefinition,
  JourneyChoiceDefinition,
  JourneyProjectConfig,
} from '../../templates/journey-replay/domain/journey-replay.models';

const adventures: Readonly<Record<string, JourneyAdventureDefinition>> = {
  'step-sponsor': {
    title: 'The tide waits for no captain',
    atmosphere: 'harbor',
    narrative:
      'Lisbon wakes to bells and creaking rigging. On the quay, a merchant wants a profitable route; your navigator wants a better chart. A sealed sponsor letter promises support—with expectations attached. The harbor chain is coming down. What will your voyage stand for?',
    stakes:
      'Your mission changes your starting resources and how your sponsor responds when the storm forces a detour. Destinations here are proposals; the playable voyage explores the Atlantic.',
    learningGoals: [
      'Distinguish revenue from profit after food, wages, and repairs.',
      'Explain how a sponsor’s interests can shape the record of a voyage.',
      'Treat a blank on your chart as a gap in your knowledge, not an empty land.',
    ],
  },
  'step-supplies': {
    title: 'One space left in the hold',
    atmosphere: 'harbor',
    narrative:
      'A cart rattles to the gangplank. Below deck, the quartermaster taps the last empty cargo berth. Barrels, instruments, or repair timber can fit—but only one load. Beyond the breakwater, the first whitecaps rise. The choice you make in calm water will follow you into the storm.',
    stakes:
      'Water gives a reserve now. Instruments reduce losses on the direct crossing. Repair stores cut the cost of the southern storm route. You cannot pack all three.',
    learningGoals: [
      'Use opportunity cost: name what must stay ashore.',
      'Explain what a compass, chart, and latitude observation can—and cannot—tell you.',
      'Match preparation to the route and failure you expect.',
    ],
  },
  'step-route': {
    title: 'Three lines across a restless ocean',
    atmosphere: 'ocean',
    narrative:
      'The last roofs of Lisbon sink below the horizon. The coastal pilot traces familiar harbors. Another sailor points west, toward the volcanic islands of the Azores. Your navigator lays a finger on the shortest line: open water. All three courses reach Cape Verde. They will not bring the same ship there.',
    stakes:
      'Coastal stops conserve provisions; the Azores restore crew health and add chart detail; the direct passage saves weeks but exposes the crew. Your earlier cargo choice can change the balance.',
    learningGoals: [
      'Read direction, distance, waypoints, and wind together.',
      'Compare remaining supplies and crew health, not just travel time.',
      'Explain why the shortest distance need not be the strongest plan.',
    ],
  },
  'step-storm': {
    title: 'A crack above the thunder',
    atmosphere: 'storm',
    narrative:
      'Off Cape Verde, the sky turns ink-black. A seam splits across the mainsail. “Line away!” A sailor dives for the loose rope as water sweeps the deck. Favorable winds lead west toward Brazil. The southern course keeps Africa ahead—but the sail must hold. The quartermaster opens the cargo list you chose in Lisbon.',
    stakes:
      'Turning west is cheaper but may break a sponsor’s expectations. Repairing south is demanding, yet your timber and sailcloth can make it feasible. Earlier decisions now change the actual cost.',
    learningGoals: [
      'Separate evidence of damage from a guess about what happens next.',
      'Recalculate the route with the cargo and resources you actually have.',
      'Defend revising a plan—or keeping it—using a specific log detail.',
    ],
  },
  'step-encounter': {
    title: 'Land ahead. Agreement still to come.',
    atmosphere: 'landfall',
    narrative:
      'After the crossing, a lookout shouts from the mast. Small boats wait beyond the surf. On shore, households are counting their own water stores. Your crew needs help, but nobody has agreed to your terms. The interpreter asks for time. A changing wind presses against the anchored ship.',
    stakes:
      'A full negotiation offers more resupply but takes two weeks. A smaller, explicitly agreed exchange saves time but gives less. Staying offshore gives the crew rest and survey time, while provisions keep falling.',
    learningGoals: [
      'Compare a detail from both fictional accounts, including whose needs each omits.',
      'Distinguish a proposed exchange from informed agreement.',
      'Judge success using the crew, local households, and the limits of your evidence.',
    ],
  },
};

const choices: Readonly<Record<string, Partial<JourneyChoiceDefinition>>> = {
  'mission-trade': {
    resourceChanges: { backing: 15, time: 1 },
    summary: 'Build a profitable route. Merchant backing costs a week of negotiations.',
  },
  'mission-mapping': {
    resourceChanges: { knowledge: 15, backing: -10 },
    summary: 'Bring back a more useful chart. Research earns knowledge but less financial backing.',
  },
  'mission-influence': {
    resourceChanges: { backing: 30, supplies: -10 },
    summary:
      'Secure strong patronage. Sponsor cargo takes space, and a detour will need defending.',
  },
  'supply-water': {
    resourceChanges: { supplies: 15, time: 1, backing: -5 },
    summary: 'A larger reserve; one extra week loading and less space for sponsor cargo.',
  },
  'supply-navigation': {
    resourceChanges: { supplies: -5, knowledge: 12 },
    summary: 'Lose provision space; cross-check positions and reduce direct-crossing losses.',
  },
  'supply-repair': {
    resourceChanges: { supplies: -8 },
    summary: 'Trade food space for timber and canvas that reduce the cost of repairing south.',
    consequence:
      'Timber and canvas fill the hold. The provision reserve is smaller, but a southern storm repair will cost 12 fewer supply points, 8 fewer crew-health points, and two fewer weeks.',
  },
  'route-choice-coastal': {
    resourceChanges: { supplies: -10, time: 4, crew: -4, knowledge: 4 },
    summary: 'Four weeks. Preserve provisions through port stops; gain fewer new observations.',
  },
  'route-choice-islands': {
    resourceChanges: { supplies: -16, time: 6, crew: 8, knowledge: 15 },
    summary:
      'Six weeks. The Azores offer rest and fresh chart observations, but the detour consumes stores.',
    consequence:
      'Volcanic slopes rise through the mist at the Azores. The crew rests while the navigator checks island bearings. Six weeks of provisions buy healthier sailors and a more detailed chart before Cape Verde.',
  },
  'route-choice-direct': {
    resourceChanges: { supplies: -12, time: 3, crew: -10, knowledge: 7 },
    summary:
      'Three weeks. Save time in open water; fatigue and uncertain positions threaten the crew.',
    consequenceModifiers: [
      {
        afterChoiceId: 'supply-navigation',
        resourceChanges: { supplies: 5, crew: 6, knowledge: 5 },
        narrative:
          'Your instruments from Lisbon let the navigator cross-check the crossing. They save five supply points and six crew-health points, and add five chart points.',
      },
    ],
  },
  'storm-west': {
    resourceChanges: { supplies: -18, crew: -8, time: 4, knowledge: 15, backing: -8 },
    summary:
      'Four weeks toward Brazil. Ease the strain on the sail and gather new observations; explain the detour to your sponsor.',
    consequence:
      'The crew trims the torn sail. Days later, Brazil’s coast breaks the horizon. Favorable winds have saved stores, but the sponsor’s planned southern voyage has changed. New chart observations are a return worth explaining.',
    consequenceModifiers: [
      {
        afterChoiceId: 'mission-mapping',
        resourceChanges: { knowledge: 10, backing: 8 },
        narrative:
          'You chose mapping as your mission. The unexpected coast advances that purpose: ten more chart points, and no loss of sponsor backing for the detour.',
      },
      {
        afterChoiceId: 'mission-influence',
        resourceChanges: { backing: -12 },
        narrative:
          'The strong patronage you accepted came with route expectations. The detour costs twelve additional backing points; your report must defend that decision.',
      },
    ],
  },
  'storm-south': {
    resourceChanges: { supplies: -25, crew: -12, time: 7, knowledge: 6, backing: 15 },
    summary:
      'Seven weeks toward the Cape. Protect the sponsor’s route, with steep repair costs that your cargo may reduce.',
    consequence:
      'Canvas snaps tight on a repaired spar. The ship works south until the Cape of Good Hope rises out of the spray. You have kept the route your sponsor expected, at a cost the crew and stores must bear.',
    consequenceModifiers: [
      {
        afterChoiceId: 'supply-repair',
        resourceChanges: { supplies: 12, crew: 8, time: -2 },
        narrative:
          'The timber and sailcloth you packed in Lisbon are used now. The repair takes two fewer weeks, saves twelve supply points, and prevents eight crew-health points of loss.',
      },
    ],
  },
  'encounter-negotiate': {
    summary:
      'Agree a fuller exchange: more water and knowledge, two weeks of delay, fewer trade goods for home.',
    resourceChanges: { supplies: 8, time: 2, knowledge: 12, backing: -6 },
    consequence:
      'The interpreter returns with terms both parties accept. Households keep their reserve; your crew receives a larger agreed share. You record the two accounts separately. The lost time and traded cargo still matter to your sponsor.',
  },
  'encounter-seize': {
    id: 'encounter-limited',
    label: 'Agree a smaller exchange',
    summary:
      'Accept only the water freely offered. Leave sooner, with less resupply and unanswered questions.',
    rationaleHint:
      'A smaller agreement can respect a community’s limits without solving all the crew’s needs.',
    question:
      'Use both accounts to explain why a limited exchange might be defensible. What would you verify about consent, and what risk remains for the crew?',
    consequence:
      'The crew takes only the agreed barrels and records what was exchanged. Departure comes sooner, but the quartermaster marks a smaller reserve and the historian leaves unresolved questions in the log.',
    sceneTitle: 'The Smaller Agreement',
    resourceChanges: { supplies: 3, time: 1, knowledge: 3, backing: -2 },
  },
  'encounter-withdraw': {
    label: 'Stay offshore and survey',
    summary:
      'Respect a pause in contact. Rest the crew and chart from offshore, using your own dwindling stores.',
    question:
      'Why might waiting offshore be responsible? Compare the cost to your crew with what the community account says, and name what an offshore chart cannot tell you.',
    consequence:
      'The anchor holds beyond the surf. Rest helps the crew while the navigator sketches the coast from offshore. No exchange is assumed. The water reserve falls, and the chart records only what the expedition could observe.',
    resourceChanges: { supplies: -10, time: 1, crew: 6, knowledge: 7 },
  },
};

export function withAtlanticAdventures(base: JourneyProjectConfig): JourneyProjectConfig {
  return {
    ...base,
    projectVersion: '1.2.0',
    resources: [
      ...base.resources,
      {
        id: 'knowledge',
        label: 'Chart detail',
        startingValue: 10,
        minimum: 0,
        maximum: 100,
        unit: ' pts',
      },
      {
        id: 'backing',
        label: 'Sponsor backing',
        startingValue: 50,
        minimum: 0,
        maximum: 100,
        unit: ' pts',
      },
    ],
    evidence: [
      ...base.evidence.map((source) =>
        source.id === 'evidence-storm-log'
          ? {
              ...source,
              paragraphs: source.paragraphs?.map((paragraph) =>
                paragraph.id === 'storm-3'
                  ? {
                      ...paragraph,
                      text: 'In this simulation, repairing south takes seven weeks and costs 25 supply points and 12 crew-health points. Timber and sailcloth packed in Lisbon reduce these to five weeks, 13 supply points, and four crew-health points. Turning west is cheaper unless your preparation changes that comparison. These are classroom rules, not historical measurements.',
                    }
                  : paragraph,
              ),
            }
          : source,
      ),
      {
        id: 'evidence-cargo-brief',
        title: 'The quartermaster’s decision brief',
        sourceLabel: 'Fictional game briefing · simulated costs',
        provenance: 'classroom-reconstruction',
        summary: 'Your cargo has consequences later. Read this before committing to a plan.',
        paragraphs: [
          {
            id: 'cargo-1',
            text: 'Water and food add a 15-point provision reserve but cost a loading week and five backing points. Instruments occupy five provision points of space, improve chart detail, and on the direct route save five supply points and six crew-health points. They do not prevent all damage.',
          },
          {
            id: 'cargo-2',
            text: 'Repair material occupies eight provision points of space. If you repair and sail south after the storm, it saves twelve supply points, eight crew-health points, and two weeks. If you turn west, you have carried materials you did not use for that repair.',
          },
          {
            id: 'cargo-3',
            text: 'The island route consumes more food but restores eight crew-health points and adds fifteen chart points. Backing measures the sponsor’s confidence; chart detail measures recorded observations. Neither measures human worth or proves that a voyage was ethical. There is no single combined victory score.',
          },
        ],
      },
    ],
    steps: base.steps.map((step) => ({
      ...step,
      adventure: adventures[step.id],
      choices: step.choices.map((choice) => ({
        ...choice,
        ...choices[choice.id],
        evidenceIds: [
          ...choice.evidenceIds,
          ...(step.chapter >= 2 && step.chapter <= 4 ? ['evidence-cargo-brief'] : []),
        ],
      })),
    })),
  };
}
