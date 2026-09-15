import type {
  JourneyPathChoice,
  JourneyPathDefinition,
  JourneyPathEvent,
  JourneyPathNode,
} from '../../templates/journey-replay/domain/journey-path.models';
import type {
  JourneyMapConfig,
  JourneyProjectConfig,
  JourneyRouteDefinition,
} from '../../templates/journey-replay/domain/journey-replay.models';

type Option = Omit<JourneyPathChoice, 'id'> & { readonly id: string };
const refreshedEvidence = ['evidence-portolan', 'evidence-wind-chart', 'evidence-storm-log'];
const option = (
  id: string,
  label: string,
  summary: string,
  consequence: string,
  nextTask: string,
  learning: string,
  resourceChanges: Record<string, number>,
  grants: string[],
  effect: JourneyPathChoice['effect'],
): Option => ({
  id,
  label,
  summary,
  consequence,
  nextTask,
  learning,
  resourceChanges,
  grants,
  effect,
});
const event = (
  id: string,
  label: string,
  observation: string,
  question: string,
  icon: JourneyPathEvent['object']['icon'],
  x: number,
  y: number,
  evidenceIds: string[],
  choices: Option[],
): JourneyPathEvent => ({
  id,
  label,
  observation,
  question,
  object: { icon, x, y },
  evidenceIds: evidenceIds.map((id) => (refreshedEvidence.includes(id) ? `${id}-path` : id)),
  choices,
});

function cargo(prefix: string): JourneyPathEvent {
  return event(
    `${prefix}-hold`,
    'The last cargo berth',
    'One berth remains. Water, instruments and repair timber compete for it.',
    'What will your crew need if the next passage changes?',
    'cargo',
    35,
    72,
    ['evidence-wind-chart', 'evidence-astrolabe'],
    [
      option(
        `${prefix}-water`,
        'Load water barrels',
        'More reserve; one week loading.',
        'Water barrels fill the berth. A longer passage is now easier to supply.',
        'Compare the longer passage against the water reserve you packed.',
        'Opportunity cost: carrying water leaves the instruments and timber ashore.',
        { supplies: 12, time: 1 },
        ['water'],
        'water',
      ),
      option(
        `${prefix}-instruments`,
        'Pack navigation instruments',
        'Less water; better observations.',
        'The navigator unpacks an instrument case. A survey passage is revealed on the next chart.',
        'Inspect the newly revealed survey passage and compare its observations with its cost.',
        'Instruments help establish position; they do not replace supplies.',
        { supplies: -5, knowledge: 12 },
        ['charts'],
        'charts',
      ),
      option(
        `${prefix}-timber`,
        'Stow repair timber',
        'Use provision space for a later repair.',
        'Timber and canvas are secured beside the mast. A later sail patch will use fewer supplies.',
        'Locate a repair stop and compare its cost with the stores you packed.',
        'Preparation changes the cost of responding to a later failure.',
        { supplies: -6 },
        ['repair'],
        'repair',
      ),
    ],
  );
}

function bearings(prefix: string, coastal = false): JourneyPathEvent {
  return event(
    `${prefix}-bearings`,
    coastal ? 'Wind at the roadstead' : 'The headland bearings',
    coastal
      ? 'A crosswind pushes the anchored ship toward a shallow shelf.'
      : 'Two headlands line up differently as the ship moves. One sighting cannot fix its position.',
    'What observation would you trust for your next passage?',
    'compass',
    74,
    35,
    ['evidence-portolan', 'evidence-wind-chart'],
    [
      option(
        `${prefix}-survey`,
        'Take a second bearing',
        'Use one model week to check the chart.',
        'A second sight line crosses the first. The chart now records a checked position.',
        'Use both bearings to evaluate the survey route on the next map.',
        'A second independent observation can reduce uncertainty.',
        { knowledge: 8, time: 1 },
        ['charts'],
        'charts',
      ),
      option(
        `${prefix}-pilot`,
        'Consult the coastal pilot',
        'Trade supplies for local route knowledge.',
        'The pilot marks a sheltered approach. Coastal options remain available as weather changes.',
        'Compare the pilot’s sheltered route with the open-water crossing.',
        'Local knowledge offers useful evidence; ask whose experience it represents.',
        { supplies: -4, crew: 3 },
        ['shelter'],
        'rest',
      ),
    ],
  );
}

function exchange(prefix: string): JourneyPathEvent {
  return event(
    `${prefix}-exchange`,
    'Two accounts at the shore',
    'Your crew wants water. Households ashore must keep their own reserve. The terms are not yet agreed.',
    'What can each account establish, and what is still uncertain?',
    'shore',
    78,
    59,
    ['evidence-port-accounts'],
    [
      option(
        `${prefix}-negotiate`,
        'Give the interpreter time',
        'More supplies after a longer agreement.',
        'Two parties agree on the marked barrels. The shoreline reserve remains with the households.',
        'Account for your delay when comparing the next departure windows.',
        'Consent requires agreed terms; the ship’s account alone cannot establish them.',
        { supplies: 10, time: 2, backing: -5 },
        ['agreement', 'water'],
        'exchange',
      ),
      option(
        `${prefix}-limited`,
        'Accept the smaller exchange',
        'Leave sooner with fewer supplies.',
        'Only the offered barrels cross the water. Your crew keeps a smaller reserve.',
        'Find a resupply route that fits the smaller reserve you accepted.',
        'An agreed exchange can respect limits while leaving a practical problem unsolved.',
        { supplies: 4, time: 1 },
        ['agreement', 'shelter'],
        'water',
      ),
      option(
        `${prefix}-offshore`,
        'Remain offshore',
        'Rest without taking shore supplies.',
        'The ship stays beyond the surf. The crew rests using its own stores.',
        'Compare a short passage or refuge with a longer open-water route.',
        'Choosing not to trade changes the evidence and resources available next.',
        { supplies: -6, crew: 6, time: 1 },
        ['shelter'],
        'rest',
      ),
    ],
  );
}

function damage(prefix: string): JourneyPathEvent {
  return event(
    `${prefix}-damage`,
    'The torn mainsail',
    'A tear runs down the canvas. The lower mast is sound; the loose line needs attention.',
    'Which response addresses the damage you can actually observe?',
    'sail',
    27,
    56,
    ['evidence-storm-log'],
    [
      {
        ...option(
          `${prefix}-repair`,
          'Patch and secure the sail',
          'Spend supplies and time to restore it.',
          'Canvas covers the tear and the line is secured. The ship can attempt a longer passage.',
          'Compare the restored ship’s longer route with a nearby refuge.',
          'Repair targets observed failure; its cost belongs in the route comparison.',
          { supplies: -8, crew: 2, time: 1 },
          ['repair'],
          'repair',
        ),
        consequenceModifiers: ['azores-timber', 'cape-verde-timber'].map((afterChoiceId) => ({
          afterChoiceId,
          resourceChanges: { supplies: 4 },
          narrative: 'The repair materials packed at the first landing save four supply points.',
        })),
      },
      option(
        `${prefix}-reef`,
        'Reef sail and seek shelter',
        'Reduce exposure; accept a shorter next leg.',
        'The sail is shortened. A refuge course is marked on the next chart.',
        'Inspect the refuge route before committing to another open-water crossing.',
        'Reducing exposure trades progress for a margin of safety.',
        { crew: 5, time: 1 },
        ['shelter'],
        'rest',
      ),
    ],
  );
}

function record(prefix: string, final = false): JourneyPathEvent {
  return event(
    `${prefix}-record`,
    final ? 'The expedition record' : 'The navigator’s table',
    final
      ? 'Route, cargo and shore decisions are separate pieces of evidence. A short voyage is not a complete account.'
      : 'A coast sighting and a source account describe different kinds of knowledge.',
    'Which evidence should the next investigation follow?',
    'log',
    51,
    65,
    ['evidence-portolan', 'evidence-port-accounts'],
    [
      option(
        `${prefix}-chart`,
        final ? 'Assemble the route evidence' : 'Compare the coastal observations',
        'Connect observations to the chart.',
        final
          ? 'The voyage trace is laid beside the instrument observations.'
          : 'Survey markers appear along the coast. The next map reveals an observation passage.',
        final
          ? 'Use the route record to explain one decision and one remaining uncertainty.'
          : 'Inspect the observation passage and decide whether its new evidence is worth the journey.',
        'A map is a record of observations and choices, not proof that a place was unknown to others.',
        { knowledge: 8 },
        ['charts'],
        'charts',
      ),
      option(
        `${prefix}-accounts`,
        final ? 'Assemble the encounter evidence' : 'Compare both shore accounts',
        'Keep the speakers and their claims distinct.',
        final
          ? 'The two accounts remain separate beside the journey trace.'
          : 'Two source markers are placed by the shore. A return visit remains an option.',
        final
          ? 'Explain a disagreement using a detail from each account.'
          : 'Follow the sheltered return route and identify a question that would need new evidence.',
        'A fictional reconstruction can test perspective reasoning; it cannot establish real testimony.',
        { knowledge: 5, time: 1 },
        ['shelter', 'agreement'],
        'exchange',
      ),
    ],
  );
}

function site(
  id: string,
  session: number,
  locationId: string,
  title: string,
  scene: JourneyPathNode['scene'],
  defaultNextId: string | undefined,
  tasks: string[],
  learning: string,
  events: JourneyPathEvent[],
): JourneyPathNode {
  const backdrop =
    scene === 'storm' || scene === 'cape'
      ? 'storm'
      : scene === 'home'
        ? 'harbor'
        : scene === 'harbor'
          ? 'market'
          : scene === 'river'
            ? 'river'
            : 'island';
  return {
    id,
    session,
    kind: 'location',
    locationId,
    title,
    scene,
    sceneArt: {
      backdrop: `/journey-replay/voyage-v2/${backdrop}.webp`,
      ship: '/journey-replay/voyage-v2/ship.webp',
    },
    defaultNextId,
    tasks,
    learning,
    product:
      session === 8
        ? 'A route and event record with selected evidence.'
        : 'An inspected location, event decisions and the next passage task.',
    choices: [],
    events,
  };
}

/** Content-only graph; no project conditions or story facts live in the renderer/engine. */
export function withVoyageExperience(base: JourneyProjectConfig): JourneyProjectConfig {
  const extraRoutes: JourneyRouteDefinition[] = [];
  function passage(
    nodeId: string,
    from: string,
    to: string,
    nextNodeId: string,
    label: string,
    weeks: number,
    task: string,
    requiresAny?: string[],
  ): JourneyPathChoice {
    const start = base.map.locations.find((place) => place.id === from)!;
    const end = base.map.locations.find((place) => place.id === to)!;
    const id = `${nodeId}-${nextNodeId}${requiresAny ? '-survey' : ''}`;
    const west =
      Math.min(start.longitude, end.longitude, -25) -
      (from === 'cape-town' || to === 'cape-town' ? 7 : 0);
    extraRoutes.push({
      id,
      fromLocationId: from,
      toLocationId: to,
      coordinates: [
        start,
        { longitude: west, latitude: start.latitude * 0.65 + end.latitude * 0.35 },
        { longitude: west, latitude: start.latitude * 0.25 + end.latitude * 0.75 },
        end,
      ],
      distanceLabel: `Model passage · ${weeks} weeks`,
      risk: weeks > 2 ? 'high' : 'moderate',
      windLabel: requiresAny
        ? 'Survey passage revealed by your observations'
        : weeks > 2
          ? 'Open water; compare the reserve'
          : 'Island or coastal refuge',
    });
    return {
      id,
      label,
      routeId: id,
      nextNodeId,
      requiresAny,
      summary: `${weeks} model weeks · ${weeks * 4} supply points${requiresAny ? ' · newly charted' : ''}`,
      consequence: `Your ship reaches ${end.shortName}. The route costs ${weeks * 4} supply points and ${weeks} weeks in this classroom model.`,
      resourceChanges: {
        supplies: -weeks * 4,
        time: weeks,
        crew: weeks > 2 ? -5 : -2,
        knowledge: requiresAny ? 8 : 2,
      },
      grants: requiresAny ? ['charts'] : [],
      effect: 'sail',
      nextTask: task,
      learning:
        'Compare direction, waypoints, time and reserve. These passage costs are simulation rules.',
    };
  }
  function chart(
    id: string,
    session: number,
    locationId: string,
    title: string,
    choices: JourneyPathChoice[],
  ): JourneyPathNode {
    return {
      id,
      session,
      kind: 'map',
      locationId,
      title,
      defaultNextId: choices[0].nextNodeId,
      tasks: [
        'Inspect a route and its destination.',
        'Compare passage costs with what your earlier choices left aboard.',
      ],
      product: 'A chosen passage and the investigation it opens.',
      learning:
        'Use geographic evidence and the expedition’s current resources to choose the next investigation.',
      choices,
      events: [],
    };
  }
  const nodes: JourneyPathNode[] = [
    chart('departure-chart', 1, 'lisbon', 'Where will you investigate first?', [
      passage(
        'departure-chart',
        'lisbon',
        'azores',
        'azores-arrival',
        'The Azores · bearings & cargo',
        2,
        'Inspect the headlands and choose the last load for the cargo berth.',
      ),
      passage(
        'departure-chart',
        'lisbon',
        'cape-verde',
        'cape-verde-arrival',
        'Cape Verde · wind & reserves',
        3,
        'Inspect the crosswind, then prepare your ship for the next passage.',
      ),
    ]),
    site(
      'azores-arrival',
      2,
      'azores',
      'The island anchorage',
      'island',
      'azores-chart',
      ['Inspect the two headlands.', 'Compare the three loads that fit the last berth.'],
      'Position fixing and preparation: one observation or one cargo load cannot solve every risk.',
      [bearings('azores'), cargo('azores')],
    ),
    site(
      'cape-verde-arrival',
      2,
      'cape-verde',
      'Wind across the roadstead',
      'harbor',
      'cape-verde-chart',
      [
        'Inspect the crosswind and the shallow shelf.',
        'Choose which preparation the ship will carry.',
      ],
      'Wind and reserves change the cost of a departure plan.',
      [bearings('cape-verde', true), cargo('cape-verde')],
    ),
    chart('azores-chart', 3, 'azores', 'A coast, a market, or a survey?', [
      passage(
        'azores-chart',
        'azores',
        'cape-verde',
        'storm-roadstead',
        'Cape Verde · damaged sail',
        2,
        'Inspect the torn canvas and compare repair with shelter.',
      ),
      passage(
        'azores-chart',
        'azores',
        'elmina',
        'market-arrival',
        'Elmina · exchange accounts',
        3,
        'Compare the shore accounts before deciding how to resupply.',
      ),
      passage(
        'azores-chart',
        'azores',
        'elmina',
        'market-arrival',
        'Survey the coastal approach',
        4,
        'Connect a second bearing to the arrival chart, then inspect the shore accounts.',
        ['charts'],
      ),
    ]),
    chart('cape-verde-chart', 3, 'cape-verde', 'Follow the coast or find a refuge?', [
      passage(
        'cape-verde-chart',
        'cape-verde',
        'elmina',
        'market-arrival',
        'Elmina · negotiate resupply',
        2,
        'Keep the ship’s needs and the households’ reserve visible in the exchange.',
      ),
      passage(
        'cape-verde-chart',
        'cape-verde',
        'azores',
        'refuge-arrival',
        'Azores · repair & bearings',
        3,
        'Inspect the sail at refuge and check the headland bearings.',
      ),
      passage(
        'cape-verde-chart',
        'cape-verde',
        'azores',
        'refuge-arrival',
        'Follow the checked island bearings',
        2,
        'Test how the earlier observations improve the refuge passage.',
        ['charts', 'repair'],
      ),
    ]),
    site(
      'storm-roadstead',
      4,
      'cape-verde',
      'A crack above the thunder',
      'storm',
      'storm-chart',
      ['Locate the damage on the ship.', 'Compare a patch with a shortened sail.'],
      'Update a plan from observed damage, then test the remaining reserve.',
      [damage('roadstead'), record('roadstead')],
    ),
    site(
      'market-arrival',
      4,
      'elmina',
      'An agreement at the water’s edge',
      'harbor',
      'market-chart',
      [
        'Inspect both accounts of the proposed exchange.',
        'Decide what the next chart should investigate.',
      ],
      'Compare interests and evidence without treating a reconstructed account as historical testimony.',
      [exchange('market'), record('market')],
    ),
    site(
      'refuge-arrival',
      4,
      'azores',
      'Repair in sheltered water',
      'island',
      'refuge-chart',
      [
        'Inspect the damaged sail beside the sheltered anchorage.',
        'Check the headland bearings before departure.',
      ],
      'Preparation and location affect the cost of responding to the same damage.',
      [damage('refuge'), bearings('refuge')],
    ),
  ];
  for (const [id, from] of [
    ['storm-chart', 'cape-verde'],
    ['market-chart', 'elmina'],
    ['refuge-chart', 'azores'],
  ] as const) {
    nodes.push(
      chart(id, 5, from, 'An ocean crossing or a return?', [
        passage(
          id,
          from,
          'recife',
          'brazil-arrival',
          'Brazilian coast · two perspectives',
          3,
          'Compare two reconstructed accounts and decide how your crew will approach the shore.',
        ),
        passage(
          id,
          from,
          'cape-town',
          'cape-arrival',
          'The Cape · repair & navigation',
          4,
          'Inspect the sail and the coastline; compare continuing with taking shelter.',
        ),
        passage(
          id,
          from,
          'lisbon',
          'return-arrival',
          'Lisbon · sheltered return',
          2,
          'Compare what the shorter return preserves with what the voyage leaves uncertain.',
          ['shelter'],
        ),
      ]),
    );
  }
  nodes.push(
    site(
      'brazil-arrival',
      6,
      'recife',
      'Beyond the surf',
      'river',
      'brazil-chart',
      [
        'Inspect the ship’s account and the shore account.',
        'Choose how to proceed while recording the limits of the evidence.',
      ],
      'Your fictional crew’s arrival changes its experience; it does not rewrite the documented historical record.',
      [exchange('brazil'), record('brazil')],
    ),
    site(
      'cape-arrival',
      6,
      'cape-town',
      'The southern turning point',
      'cape',
      'cape-chart',
      [
        'Inspect the canvas and the rocky approach.',
        'Choose whether the next passage should prioritize survey or shelter.',
      ],
      'A demanding route can preserve a plan while using the reserve needed for the return.',
      [damage('cape'), record('cape')],
    ),
    site(
      'return-arrival',
      6,
      'lisbon',
      'Back inside the breakwater',
      'home',
      'home-chart',
      [
        'Inspect the stores and the surviving route record.',
        'Choose the evidence for one final investigation.',
      ],
      'A return offers a new comparison; it does not make an incomplete account complete.',
      [cargo('return'), record('return')],
    ),
  );
  for (const [id, from] of [
    ['brazil-chart', 'recife'],
    ['cape-chart', 'cape-town'],
    ['home-chart', 'lisbon'],
  ] as const) {
    const harbor = from === 'lisbon' ? 'cape-verde' : 'lisbon';
    const harborNode = from === 'lisbon' ? 'final-harbor' : 'final-home';
    nodes.push(
      chart(id, 7, from, 'Which evidence will close your voyage?', [
        passage(
          id,
          from,
          harbor,
          harborNode,
          from === 'lisbon'
            ? 'Cape Verde · revisit the accounts'
            : 'Lisbon · compare the voyage record',
          3,
          'Select one recorded passage and connect it to its observed consequence.',
        ),
        passage(
          id,
          from,
          'azores',
          'final-atlas',
          'Azores · check the chart',
          3,
          'Compare the route record with two headland observations.',
        ),
        passage(
          id,
          from,
          'azores',
          'final-atlas',
          'Follow your survey observations',
          2,
          'Use the checked observations from your earlier investigation to examine a shorter modeled return.',
          ['charts'],
        ),
      ]),
    );
  }
  nodes.push(
    site(
      'final-home',
      8,
      'lisbon',
      'The record comes ashore',
      'home',
      undefined,
      [
        'Inspect the complete route and its remaining resources.',
        'Choose the evidence that explains a decision and a limit.',
      ],
      'An account is stronger when its route, sources and consequences can be inspected together.',
      [record('final-home', true), exchange('final-home')],
    ),
    site(
      'final-atlas',
      8,
      'azores',
      'A chart worth questioning',
      'island',
      undefined,
      [
        'Check the headlands against the route you recorded.',
        'Assemble the evidence for the voyage’s strongest remaining question.',
      ],
      'New observations can confirm or challenge a chart; retain what remains uncertain.',
      [bearings('final-atlas'), record('final-atlas', true)],
    ),
    site(
      'final-harbor',
      8,
      'cape-verde',
      'Return to the roadstead',
      'harbor',
      undefined,
      [
        'Compare the new approach with the earlier wind observation.',
        'Assemble both source perspectives beside the route.',
      ],
      'Returning to a place creates a comparison, not proof that the first interpretation was complete.',
      [bearings('final-harbor', true), record('final-harbor', true)],
    ),
  );
  const experience: JourneyPathDefinition = {
    schemaVersion: '1.0',
    capability: 'branchingJourney',
    startNodeId: 'departure-chart',
    nodes,
  };
  const map: JourneyMapConfig = { ...base.map, routes: [...base.map.routes, ...extraRoutes] };
  return {
    ...base,
    projectVersion: '1.4.0',
    subtitle: 'A branching Atlantic investigation',
    evidence: [
      ...base.evidence,
      ...base.evidence
        .filter((source) => refreshedEvidence.includes(source.id))
        .map((source) => {
          const notes: Record<string, readonly string[]> = {
            'evidence-portolan': [
              'Lisbon is north of Cape Verde; the Azores lie west of Portugal. Trace the highlighted passage from your current position to its destination, including its waypoints.',
              'A headland bearing gives a direction from the ship toward a visible landmark. Compare two bearings with the chart before treating a position as checked. In this model, observations can reveal an additional survey passage.',
              'A chart records its makers’ observations and omissions. A blank area on a European chart does not mean no one lives there or knows its geography.',
            ],
            'evidence-wind-chart': [
              'Read the current passage options for their model duration and supply cost. Different departure points reveal different passages; a destination does not have one fixed travel time.',
              'Each model week of passage consumes four supply points. Location decisions can also add time or change stores. Compare the displayed consequences with your current reserve before choosing.',
              'Water occupies the berth that could hold instruments or repair timber. A shelter choice can reveal a return route; observations can reveal a survey route. These are classroom rules, not historical sailing schedules or a weather forecast.',
            ],
            'evidence-storm-log': [
              'The mainsail is torn. Inspect the missing canvas and the sound mast before choosing a response. A patch addresses the tear; shortened canvas reduces exposure without making the same repair.',
              'In this model, patching takes one week and eight supply points. Repair timber packed at the first landing saves four of those supply points. Inspect the displayed cost to see whether your earlier preparation applies.',
              'Reefing takes one model week and improves crew health. It reveals a sheltered passage on a later chart. Compare the newly available route with the longer crossings; a shelter decision does not complete the next voyage for you.',
            ],
          };
          return notes[source.id]
            ? {
                ...source,
                id: `${source.id}-path`,
                paragraphs: notes[source.id].map((text, index) => ({
                  id: `${source.id}-path-${index + 1}`,
                  text,
                })),
              }
            : source;
        }),
    ],
    map,
    experience,
  };
}
