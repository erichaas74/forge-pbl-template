import type { JourneyProjectConfig } from '../../templates/journey-replay/domain/journey-replay.models';

export const ageOfExplorationJourneyConfig: JourneyProjectConfig = {
  schemaVersion: '1.0',
  template: { id: 'journey-replay', version: '1.0' },
  projectId: 'race-around-the-world',
  projectVersion: '1.0.0',
  title: 'Race Around the World',
  subtitle: 'An Age of Exploration journey',
  gradeBand: 'Grades 5–7',
  subject: 'History + Geography + ELA',
  drivingQuestion:
    'How did geography, evidence, and human choices shape exploration—and who experienced the consequences?',
  team: {
    name: 'Team Compass',
    emblem: '✦',
    color: '#f0c96a',
    linePattern: 'solid',
  },
  roles: ['Captain', 'Navigator', 'Historian', 'Quartermaster', 'Chronicler'],
  resources: [
    { id: 'supplies', label: 'Supplies', startingValue: 80, minimum: 0, maximum: 100, unit: '%' },
    { id: 'crew', label: 'Crew health', startingValue: 92, minimum: 0, maximum: 100, unit: '%' },
    { id: 'time', label: 'Voyage time', startingValue: 0, minimum: 0, maximum: 24, unit: ' weeks' },
  ],
  evidence: [
    {
      id: 'evidence-spice-ledger',
      title: 'Lisbon Spice Ledger',
      sourceLabel: 'Merchant account · 1490s',
      summary: 'Imported pepper and cloves sold for many times their purchase price in European markets.',
    },
    {
      id: 'evidence-portolan',
      title: 'Portolan Coast Chart',
      sourceLabel: 'Navigation chart · late 1400s',
      summary: 'Coastal bearings and ports are detailed, while the open ocean remains sparsely marked.',
    },
    {
      id: 'evidence-astrolabe',
      title: 'Mariner’s Astrolabe',
      sourceLabel: 'Navigation instrument',
      summary: 'Measuring the height of a star can help estimate latitude far from shore.',
    },
    {
      id: 'evidence-wind-chart',
      title: 'Atlantic Wind Notes',
      sourceLabel: 'Pilot observations',
      summary: 'Sailors record reliable winds west of the African coast and difficult return winds near shore.',
    },
    {
      id: 'evidence-storm-log',
      title: 'Storm-Damaged Ship Log',
      sourceLabel: 'Expedition record',
      summary: 'A torn sail, shifting wind, and falling water stores force a rapid decision.',
    },
    {
      id: 'evidence-port-accounts',
      title: 'Two Accounts of First Contact',
      sourceLabel: 'Conflicting perspectives',
      summary: 'The official ship record and a community account describe the same exchange very differently.',
    },
  ],
  map: {
    id: 'atlantic-world-map',
    schemaVersion: '1.0',
    title: 'The Known Atlantic World',
    startLocationId: 'lisbon',
    regionalCover: {
      id: 'atlantic-cover',
      label: 'Atlantic Regional Cover',
      regionId: 'atlantic',
      bounds: { west: -90, east: 30, north: 65, south: -60 },
    },
    lenses: ['navigation', 'weather', 'trade', 'risk', 'evidence'],
    locations: [
      { id: 'lisbon', name: 'Lisbon', shortName: 'Lisbon', latitude: 38.72, longitude: -9.14, regionId: 'iberia', type: 'port', description: 'A major Portuguese Atlantic port and the expedition’s departure point.' },
      { id: 'seville', name: 'Seville', shortName: 'Seville', latitude: 37.39, longitude: -5.99, regionId: 'iberia', type: 'port', description: 'A Spanish center for Atlantic navigation and trade.' },
      { id: 'azores', name: 'The Azores', shortName: 'Azores', latitude: 37.74, longitude: -25.67, regionId: 'north-atlantic', type: 'waypoint', description: 'Atlantic islands useful for water, repairs, and changing wind patterns.' },
      { id: 'cape-verde', name: 'Cape Verde', shortName: 'Cape Verde', latitude: 15.11, longitude: -23.51, regionId: 'west-africa', type: 'port', description: 'An island crossroads near routes toward West Africa and the South Atlantic.' },
      { id: 'elmina', name: 'Elmina', shortName: 'Elmina', latitude: 5.08, longitude: -1.35, regionId: 'west-africa', type: 'port', description: 'A fortified trading port on the West African coast.' },
      { id: 'recife', name: 'Recife', shortName: 'Brazil', latitude: -8.05, longitude: -34.88, regionId: 'south-america', type: 'encounter', description: 'A landing on the eastern coast of South America.' },
      { id: 'san-juan', name: 'San Juan', shortName: 'Caribbean', latitude: 18.47, longitude: -66.1, regionId: 'caribbean', type: 'encounter', description: 'A Caribbean harbor shaped by Indigenous, African, and European worlds.' },
      { id: 'havana', name: 'Havana', shortName: 'Havana', latitude: 23.11, longitude: -82.37, regionId: 'caribbean', type: 'port', description: 'A protected Caribbean harbor and later center of imperial shipping.' },
      { id: 'cape-town', name: 'Cape of Good Hope', shortName: 'The Cape', latitude: -33.92, longitude: 18.42, regionId: 'southern-africa', type: 'waypoint', description: 'A dangerous turning point between the Atlantic and Indian Oceans.' },
      { id: 'goa', name: 'Goa', shortName: 'Goa', latitude: 15.49, longitude: 73.83, regionId: 'india', type: 'port', description: 'A major Indian Ocean trading center.' },
      { id: 'malacca', name: 'Malacca', shortName: 'Malacca', latitude: 2.19, longitude: 102.25, regionId: 'southeast-asia', type: 'port', description: 'A strategic strait linking Indian Ocean and Southeast Asian trade.' },
      { id: 'newfoundland', name: 'Newfoundland', shortName: 'N. Atlantic', latitude: 47.5, longitude: -53.5, regionId: 'north-atlantic', type: 'encounter', description: 'A cold North Atlantic coast and rich fishing region.' },
    ],
    routes: [
      {
        id: 'route-coastal',
        fromLocationId: 'lisbon',
        toLocationId: 'cape-verde',
        coordinates: [
          { latitude: 38.72, longitude: -9.14 },
          { latitude: 31, longitude: -12 },
          { latitude: 23, longitude: -17 },
          { latitude: 15.11, longitude: -23.51 },
        ],
        distanceLabel: '2,050 nautical miles',
        risk: 'moderate',
        windLabel: 'Coastal currents; frequent resupply',
      },
      {
        id: 'route-island-arc',
        fromLocationId: 'lisbon',
        toLocationId: 'cape-verde',
        coordinates: [
          { latitude: 38.72, longitude: -9.14 },
          { latitude: 37.74, longitude: -25.67 },
          { latitude: 26, longitude: -31 },
          { latitude: 15.11, longitude: -23.51 },
        ],
        distanceLabel: '2,780 nautical miles',
        risk: 'high',
        windLabel: 'Open-ocean winds; fewer ports',
      },
      {
        id: 'route-direct',
        fromLocationId: 'lisbon',
        toLocationId: 'cape-verde',
        coordinates: [
          { latitude: 38.72, longitude: -9.14 },
          { latitude: 28, longitude: -20 },
          { latitude: 15.11, longitude: -23.51 },
        ],
        distanceLabel: '1,950 nautical miles',
        risk: 'high',
        windLabel: 'Fast trade winds; little margin for error',
      },
      {
        id: 'route-west-after-storm',
        fromLocationId: 'cape-verde',
        toLocationId: 'recife',
        coordinates: [
          { latitude: 15.11, longitude: -23.51 },
          { latitude: 6, longitude: -30 },
          { latitude: -2, longitude: -33 },
          { latitude: -8.05, longitude: -34.88 },
        ],
        distanceLabel: '1,650 nautical miles',
        risk: 'moderate',
        windLabel: 'Trade winds west; unfamiliar coast ahead',
      },
      {
        id: 'route-south-after-storm',
        fromLocationId: 'cape-verde',
        toLocationId: 'cape-town',
        coordinates: [
          { latitude: 15.11, longitude: -23.51 },
          { latitude: -2, longitude: -11 },
          { latitude: -18, longitude: 4 },
          { latitude: -33.92, longitude: 18.42 },
        ],
        distanceLabel: '4,100 nautical miles',
        risk: 'high',
        windLabel: 'Long southern arc; severe weather near the Cape',
      },
    ],
  },
  steps: [
    {
      id: 'step-sponsor', chapter: 1, title: 'The Sponsor', kicker: 'Why we sail', positionLocationId: 'lisbon', sceneType: 'mission-brief', topicTags: ['motives', 'trade', 'knowledge'], masteryTags: ['Evidence-based claim'], mission: 'The royal council will fund one expedition. Define the mission you will defend.', choicePrompt: 'Which goal should guide the expedition?',
      choices: [
        { id: 'mission-trade', label: 'Open a trade route', summary: 'Seek more direct access to valuable Asian goods.', rationaleHint: 'Compare risk with the value shown in the merchant ledger.', question: 'You prioritized trade access. What evidence suggests this goal mattered to European rulers and merchants?', consequence: 'The expedition receives support from merchants who expect a profitable new route.', sceneTitle: 'Why We Sailed', evidenceIds: ['evidence-spice-ledger'] },
        { id: 'mission-mapping', label: 'Map the unknown', summary: 'Expand geographic knowledge for later voyages.', rationaleHint: 'Consider what the portolan chart shows—and leaves blank.', question: 'You prioritized mapping. How could better geographic knowledge change later decisions and voyages?', consequence: 'The expedition receives charts, instruments, and a mandate to record every coastline.', sceneTitle: 'A World to Be Mapped', evidenceIds: ['evidence-portolan'] },
        { id: 'mission-influence', label: 'Build royal influence', summary: 'Claim strategic ports and strengthen the crown.', rationaleHint: 'Think about who already lives and trades in those places.', question: 'You prioritized royal influence. Who might benefit from that goal, and who might face harm?', consequence: 'The crown approves the voyage and expects the expedition to secure strategic alliances.', sceneTitle: 'The Crown’s Ambition', evidenceIds: ['evidence-portolan'] },
      ],
    },
    {
      id: 'step-supplies', chapter: 2, title: 'Prepare the Ship', kicker: 'Every crate is a choice', positionLocationId: 'lisbon', sceneType: 'departure', topicTags: ['resources', 'technology'], masteryTags: ['Resource reasoning', 'Technology knowledge'], mission: 'The ship cannot carry everything. Choose what receives the final cargo space.', choicePrompt: 'Which preparation deserves priority?',
      choices: [
        { id: 'supply-water', label: 'Extra water and food', summary: 'Protect the crew during delay or bad winds.', rationaleHint: 'Reliability may matter more than speed.', question: 'Why is extra water and food worth the space it takes from trade goods and tools?', consequence: 'The lower deck is crowded with barrels, but the crew has a stronger safety margin.', sceneTitle: 'Provisioned for Delay', evidenceIds: ['evidence-wind-chart'], resourceChanges: { supplies: 15, time: 1 } },
        { id: 'supply-navigation', label: 'Navigation instruments', summary: 'Carry redundant compasses, charts, and an astrolabe.', rationaleHint: 'Explain which navigation problem the tools solve.', question: 'Which navigation instrument is most important for your route, and what problem does it solve?', consequence: 'The navigator can cross-check latitude and heading even when the coastline disappears.', sceneTitle: 'Tools for the Unknown', evidenceIds: ['evidence-astrolabe'], resourceChanges: { supplies: -5 } },
        { id: 'supply-repair', label: 'Repair timber and sailcloth', summary: 'Prepare to recover from damage at sea.', rationaleHint: 'A repair is only valuable if the crew can make it in time.', question: 'What voyage risk does repair material address, and why is that risk more urgent than extra provisions?', consequence: 'Spare spars, rope, and canvas fill the final cargo space.', sceneTitle: 'Ready to Repair', evidenceIds: ['evidence-wind-chart'], resourceChanges: { supplies: 5 } },
      ],
    },
    {
      id: 'step-route', chapter: 3, title: 'Choose the Route', kicker: 'The chart becomes a decision', positionLocationId: 'lisbon', sceneType: 'map-travel', topicTags: ['geography', 'navigation'], masteryTags: ['Geographic reasoning', 'Map interpretation'], mission: 'The fleet leaves Lisbon. Winds, resupply points, and distance pull the route in different directions.', choicePrompt: 'How will you reach Cape Verde?',
      choices: [
        { id: 'route-choice-coastal', label: 'Follow the African coast', summary: 'Stay near known ports, accepting difficult currents.', rationaleHint: 'Known geography lowers some risks but can add time.', question: 'Why did you choose the coastal route instead of the shorter direct crossing?', consequence: 'The ship follows familiar coastlines and reaches Cape Verde after several resupply stops.', sceneTitle: 'Along the African Coast', routeId: 'route-coastal', evidenceIds: ['evidence-portolan', 'evidence-wind-chart'], resourceChanges: { supplies: -10, time: 4 } },
        { id: 'route-choice-islands', label: 'Sail by the Azores', summary: 'Use island waypoints before turning south.', rationaleHint: 'This route is longer but creates a planned refuge.', question: 'Why is an island waypoint worth the added distance and time?', consequence: 'The Azores become a mid-ocean checkpoint before the fleet turns south.', sceneTitle: 'The Island Arc', routeId: 'route-island-arc', evidenceIds: ['evidence-portolan', 'evidence-astrolabe'], resourceChanges: { supplies: -16, time: 6 } },
        { id: 'route-choice-direct', label: 'Take the direct ocean route', summary: 'Trust the trade winds and accept open-water risk.', rationaleHint: 'The shortest line is not always the safest voyage.', question: 'Why did you choose the direct route, and which evidence makes that risk defensible?', consequence: 'The coast falls away. The ship reaches Cape Verde quickly after days of open water.', sceneTitle: 'Into Open Water', routeId: 'route-direct', evidenceIds: ['evidence-wind-chart', 'evidence-astrolabe'], resourceChanges: { supplies: -12, time: 3 } },
      ],
    },
    {
      id: 'step-storm', chapter: 4, title: 'The First Crisis', kicker: 'Storm over Cape Verde', positionLocationId: 'cape-verde', sceneType: 'crisis', topicTags: ['risk', 'consequence'], masteryTags: ['Evidence-based decision', 'Cause and consequence'], mission: 'A storm tears the mainsail. Water stores are falling and the fleet must choose a direction.', choicePrompt: 'How will the expedition respond?',
      choices: [
        { id: 'storm-west', label: 'Turn west with the trade winds', summary: 'Seek land across the South Atlantic.', rationaleHint: 'This protects the damaged sail from a punishing southern route.', question: 'Turning west protects the ship but abandons the original plan. Is that tradeoff justified by the expedition record?', consequence: 'The trade winds carry the damaged ship west to the coast of Brazil.', sceneTitle: 'Driven West', routeId: 'route-west-after-storm', evidenceIds: ['evidence-storm-log', 'evidence-wind-chart'], resourceChanges: { supplies: -18, crew: -8, time: 4 } },
        { id: 'storm-south', label: 'Repair and continue south', summary: 'Use supplies now to preserve the route around Africa.', rationaleHint: 'A field repair preserves the mission but extends exposure to bad weather.', question: 'Your decision protects the mission but costs supplies and time. Was the delay worth it?', consequence: 'The crew repairs the sail, then fights south toward the Cape of Good Hope.', sceneTitle: 'Hold the Southern Course', routeId: 'route-south-after-storm', evidenceIds: ['evidence-storm-log'], resourceChanges: { supplies: -25, crew: -12, time: 7 } },
      ],
    },
    {
      id: 'step-encounter', chapter: 5, title: 'First Encounter', kicker: 'Two accounts, one event', positionLocationId: 'cape-verde', sceneType: 'encounter', topicTags: ['perspective', 'contact'], masteryTags: ['Source perspective', 'Ethical reasoning'], mission: 'At landfall, the ship’s official log and a community account describe the exchange differently.', choicePrompt: 'How will the expedition proceed?',
      choices: [
        { id: 'encounter-negotiate', label: 'Pause and negotiate', summary: 'Use interpreters, exchange knowledge, and accept delay.', rationaleHint: 'Look for what each account says the other side values.', question: 'How might the local community describe this negotiation differently from the ship’s official account?', consequence: 'The expedition pauses. The final record preserves both accounts and notes the limits of translation.', sceneTitle: 'Two Accounts of One Encounter', evidenceIds: ['evidence-port-accounts'], resourceChanges: { time: 2, supplies: 8 } },
        { id: 'encounter-seize', label: 'Seize supplies and leave', summary: 'Protect the voyage’s schedule at direct cost to the community.', rationaleHint: 'A strategically effective choice can still cause serious harm.', question: 'Who benefits from this decision, who is harmed, and can the voyage still be called successful?', consequence: 'The ship leaves quickly with supplies, while the community’s account records loss and violence.', sceneTitle: 'The Cost of Speed', evidenceIds: ['evidence-port-accounts'], resourceChanges: { supplies: 12, crew: -5 } },
        { id: 'encounter-withdraw', label: 'Withdraw without trade', summary: 'Avoid immediate conflict but gain no resupply or local knowledge.', rationaleHint: 'Avoiding contact also has consequences.', question: 'What risk does withdrawal reduce, and what knowledge or opportunity does it sacrifice?', consequence: 'The expedition moves offshore. No conflict occurs, but the chart remains incomplete.', sceneTitle: 'The Unfinished Chart', evidenceIds: ['evidence-port-accounts'], resourceChanges: { supplies: -10, time: 1 } },
      ],
    },
  ],
  replay: {
    id: 'age-of-exploration-replay',
    schemaVersion: '1.0',
    title: 'Our Expedition Record',
    closingTitle: 'One Voyage · A Changing World',
    sceneDurationSeconds: 7,
    allowStudentSceneHiding: true,
    maxRuntimeMinutes: 5,
  },
  classVoyages: [
    {
      voyageId: 'voyage-compass',
      team: { name: 'Team Compass', emblem: '✦', color: '#f0c96a', linePattern: 'solid' },
      route: [
        { ...point(-9.14, 38.72), locationId: 'lisbon', eventType: 'decision', eventLabel: 'Prioritized trade' },
        point(-17, 25),
        { ...point(-23.51, 15.11), locationId: 'cape-verde', eventType: 'resupply', eventLabel: 'Resupplied' },
        point(-11, -2),
        { ...point(18.42, -33.92), locationId: 'cape-town', eventType: 'storm', eventLabel: 'Repaired after storm' },
        { ...point(73.83, 15.49), locationId: 'goa', eventType: 'trade', eventLabel: 'Reached Indian Ocean market' },
      ],
      outcome: 'Reached Goa after repairing near the Cape.',
    },
    {
      voyageId: 'voyage-horizon',
      team: { name: 'Team Horizon', emblem: '◒', color: '#79c7d5', linePattern: 'long-dash' },
      route: [
        { ...point(-9.14, 38.72), locationId: 'lisbon' },
        { ...point(-23.51, 15.11), locationId: 'cape-verde', eventType: 'decision', eventLabel: 'Turned west' },
        { ...point(-34.88, -8.05), locationId: 'recife', eventType: 'encounter', eventLabel: 'Negotiated at landfall' },
      ],
      outcome: 'Reached South America and revised the mission.',
    },
    {
      voyageId: 'voyage-voyager',
      team: { name: 'Team Voyager', emblem: '⚑', color: '#ef9275', linePattern: 'short-dash' },
      route: [
        { ...point(-5.99, 37.39), locationId: 'seville' },
        point(-31, 29),
        { ...point(-66.1, 18.47), locationId: 'san-juan', eventType: 'encounter', eventLabel: 'Compared two accounts' },
        { ...point(-82.37, 23.11), locationId: 'havana', eventType: 'trade', eventLabel: 'Traded for water' },
      ],
      outcome: 'Crossed to the Caribbean through open water.',
    },
    {
      voyageId: 'voyage-star',
      team: { name: 'Team Star', emblem: '★', color: '#c39be8', linePattern: 'dot-dash' },
      route: [
        { ...point(-9.14, 38.72), locationId: 'lisbon' },
        { ...point(-1.35, 5.08), locationId: 'elmina', eventType: 'trade', eventLabel: 'Stopped at Elmina' },
        { ...point(18.42, -33.92), locationId: 'cape-town', eventType: 'storm', eventLabel: 'Lost a mast near the Cape' },
        { ...point(73.83, 15.49), locationId: 'goa' },
        { ...point(102.25, 2.19), locationId: 'malacca', eventType: 'discovery', eventLabel: 'Reached the strait' },
      ],
      outcome: 'Continued through the Indian Ocean to Malacca.',
    },
    {
      voyageId: 'voyage-atlas',
      team: { name: 'Team Atlas', emblem: '◎', color: '#a8d47d', linePattern: 'double' },
      route: [
        point(-1, 51),
        { ...point(-25.67, 37.74), locationId: 'azores', eventType: 'resupply', eventLabel: 'Waited for weather' },
        { ...point(-53.5, 47.5), locationId: 'newfoundland', eventType: 'discovery', eventLabel: 'Mapped fishing grounds' },
      ],
      outcome: 'Mapped a northern route across the Atlantic.',
    },
  ],
};

function point(longitude: number, latitude: number) {
  return { longitude, latitude } as const;
}
