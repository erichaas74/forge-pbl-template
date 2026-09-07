import type { JourneyProjectConfig } from '../../templates/journey-replay/domain/journey-replay.models';
import { expeditionEvidence, expeditionLearning } from './age-of-exploration-learning';

export const legacyAgeOfExplorationJourneyConfig: JourneyProjectConfig = {
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
      summary:
        'Imported pepper and cloves sold for many times their purchase price in European markets.',
    },
    {
      id: 'evidence-portolan',
      title: 'Portolan Coast Chart',
      sourceLabel: 'Navigation chart · late 1400s',
      summary:
        'Coastal bearings and ports are detailed, while the open ocean remains sparsely marked.',
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
      summary:
        'Sailors record reliable winds west of the African coast and difficult return winds near shore.',
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
      summary:
        'The official ship record and a community account describe the same exchange very differently.',
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
      {
        id: 'lisbon',
        name: 'Lisbon',
        shortName: 'Lisbon',
        latitude: 38.72,
        longitude: -9.14,
        regionId: 'iberia',
        type: 'port',
        description: 'A major Portuguese Atlantic port and the expedition’s departure point.',
      },
      {
        id: 'seville',
        name: 'Seville',
        shortName: 'Seville',
        latitude: 37.39,
        longitude: -5.99,
        regionId: 'iberia',
        type: 'port',
        description: 'A Spanish center for Atlantic navigation and trade.',
      },
      {
        id: 'london',
        name: 'London, England',
        shortName: 'England',
        latitude: 51.51,
        longitude: -0.13,
        regionId: 'northern-europe',
        type: 'city',
        description: 'An English royal and merchant center considering overseas ventures.',
      },
      {
        id: 'paris',
        name: 'Paris, France',
        shortName: 'France',
        latitude: 48.86,
        longitude: 2.35,
        regionId: 'western-europe',
        type: 'city',
        description: 'A French royal center weighing the costs and advantages of exploration.',
      },
      {
        id: 'azores',
        name: 'The Azores',
        shortName: 'Azores',
        latitude: 37.74,
        longitude: -25.67,
        regionId: 'north-atlantic',
        type: 'waypoint',
        description: 'Atlantic islands useful for water, repairs, and changing wind patterns.',
      },
      {
        id: 'cape-verde',
        name: 'Cape Verde',
        shortName: 'Cape Verde',
        latitude: 15.11,
        longitude: -23.51,
        regionId: 'west-africa',
        type: 'port',
        description: 'An island crossroads near routes toward West Africa and the South Atlantic.',
      },
      {
        id: 'elmina',
        name: 'Elmina',
        shortName: 'Elmina',
        latitude: 5.08,
        longitude: -1.35,
        regionId: 'west-africa',
        type: 'port',
        description: 'A fortified trading port on the West African coast.',
      },
      {
        id: 'recife',
        name: 'Recife',
        shortName: 'Brazil',
        latitude: -8.05,
        longitude: -34.88,
        regionId: 'south-america',
        type: 'encounter',
        description: 'A landing on the eastern coast of South America.',
      },
      {
        id: 'san-juan',
        name: 'San Juan',
        shortName: 'Caribbean',
        latitude: 18.47,
        longitude: -66.1,
        regionId: 'caribbean',
        type: 'encounter',
        description: 'A Caribbean harbor shaped by Indigenous, African, and European worlds.',
      },
      {
        id: 'havana',
        name: 'Havana',
        shortName: 'Havana',
        latitude: 23.11,
        longitude: -82.37,
        regionId: 'caribbean',
        type: 'port',
        description: 'A protected Caribbean harbor and later center of imperial shipping.',
      },
      {
        id: 'cape-town',
        name: 'Cape of Good Hope',
        shortName: 'The Cape',
        latitude: -33.92,
        longitude: 18.42,
        regionId: 'southern-africa',
        type: 'waypoint',
        description: 'A dangerous turning point between the Atlantic and Indian Oceans.',
      },
      {
        id: 'goa',
        name: 'Goa',
        shortName: 'Goa',
        latitude: 15.49,
        longitude: 73.83,
        regionId: 'india',
        type: 'port',
        description: 'A major Indian Ocean trading center.',
      },
      {
        id: 'malacca',
        name: 'Malacca',
        shortName: 'Malacca',
        latitude: 2.19,
        longitude: 102.25,
        regionId: 'southeast-asia',
        type: 'port',
        description: 'A strategic strait linking Indian Ocean and Southeast Asian trade.',
      },
      {
        id: 'newfoundland',
        name: 'Newfoundland',
        shortName: 'N. Atlantic',
        latitude: 47.5,
        longitude: -53.5,
        regionId: 'north-atlantic',
        type: 'encounter',
        description: 'A cold North Atlantic coast and rich fishing region.',
      },
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
        id: 'preview-trade-west-africa',
        fromLocationId: 'lisbon',
        toLocationId: 'elmina',
        coordinates: [
          { latitude: 38.72, longitude: -9.14 },
          { latitude: 23, longitude: -17 },
          { latitude: 5.08, longitude: -1.35 },
        ],
        distanceLabel: '2,650 nautical miles',
        risk: 'moderate',
        windLabel: 'Known coastal markets; seasonal currents',
      },
      {
        id: 'preview-trade-caribbean',
        fromLocationId: 'lisbon',
        toLocationId: 'san-juan',
        coordinates: [
          { latitude: 38.72, longitude: -9.14 },
          { latitude: 28, longitude: -24 },
          { latitude: 18.47, longitude: -66.1 },
        ],
        distanceLabel: '3,350 nautical miles',
        risk: 'high',
        windLabel: 'Favorable westbound winds; few known resupply points',
      },
      {
        id: 'preview-trade-india',
        fromLocationId: 'lisbon',
        toLocationId: 'goa',
        coordinates: [
          { latitude: 38.72, longitude: -9.14 },
          { latitude: 5, longitude: -14 },
          { latitude: -33.92, longitude: 18.42 },
          { latitude: 15.49, longitude: 73.83 },
        ],
        distanceLabel: '10,500 nautical miles',
        risk: 'high',
        windLabel: 'Long passage around Africa; access to Indian Ocean trade',
      },
      {
        id: 'preview-unknown-brazil',
        fromLocationId: 'lisbon',
        toLocationId: 'recife',
        coordinates: [
          { latitude: 38.72, longitude: -9.14 },
          { latitude: 17, longitude: -27 },
          { latitude: -8.05, longitude: -34.88 },
        ],
        distanceLabel: '3,700 nautical miles',
        risk: 'high',
        windLabel: 'Strong westbound winds; an uncertain landfall',
      },
      {
        id: 'preview-unknown-north',
        fromLocationId: 'lisbon',
        toLocationId: 'newfoundland',
        coordinates: [
          { latitude: 38.72, longitude: -9.14 },
          { latitude: 45, longitude: -30 },
          { latitude: 47.5, longitude: -53.5 },
        ],
        distanceLabel: '2,900 nautical miles',
        risk: 'high',
        windLabel: 'Cold water, fog, and changing North Atlantic winds',
      },
      {
        id: 'preview-unknown-cape',
        fromLocationId: 'lisbon',
        toLocationId: 'cape-town',
        coordinates: [
          { latitude: 38.72, longitude: -9.14 },
          { latitude: 8, longitude: -13 },
          { latitude: -18, longitude: 4 },
          { latitude: -33.92, longitude: 18.42 },
        ],
        distanceLabel: '5,700 nautical miles',
        risk: 'high',
        windLabel: 'Long coastal study ending in dangerous southern seas',
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
      id: 'step-sponsor',
      chapter: 1,
      title: 'Choose the Mission',
      kicker: 'Why we sail',
      positionLocationId: 'lisbon',
      sceneType: 'mission-brief',
      topicTags: ['motives', 'trade', 'knowledge'],
      masteryTags: ['Evidence-based claim'],
      mission:
        'Choose the expedition goal, investigate its map options, and build the full mission before committing to a voyage.',
      choicePrompt: 'Which goal should guide the expedition?',
      choices: [
        {
          id: 'mission-trade',
          icon: '🪙',
          label: 'Open a trade route',
          summary: 'Compare routes to valuable regional and overseas markets.',
          rationaleHint: 'Compare risk with the value shown in the merchant ledger.',
          question:
            'You prioritized trade access. What evidence suggests this goal mattered to European rulers and merchants?',
          consequence:
            'The expedition receives support from merchants who expect a profitable new route.',
          sceneTitle: 'Why We Sailed',
          evidenceIds: ['evidence-spice-ledger'],
          planning: {
            mode: 'route',
            mapFocus: { cover: 'world' },
            prompt: 'Compare possible trading destinations before committing the expedition.',
            targetPrompt: 'Which trade route best supports your mission?',
            selectionLabel: 'Choose this trade route',
            targets: [
              {
                id: 'trade-west-africa',
                label: 'West African markets',
                locationId: 'elmina',
                routeId: 'preview-trade-west-africa',
                summary: 'A shorter passage to established coastal trade networks.',
                details:
                  'The route offers nearer markets and more coastal knowledge, but competition and existing African trading systems must shape the plan.',
                facts: [
                  { label: 'Reach', value: 'Regional Atlantic trade' },
                  { label: 'Main advantage', value: 'Shorter supply line' },
                  { label: 'Question', value: 'How will you trade without assuming control?' },
                ],
              },
              {
                id: 'trade-caribbean',
                label: 'Caribbean passage',
                locationId: 'san-juan',
                routeId: 'preview-trade-caribbean',
                summary: 'Follow Atlantic winds toward unfamiliar island markets.',
                details:
                  'A westbound passage could open new exchange, but distance, uncertain ports, and the rights of people already living there raise serious risks.',
                facts: [
                  { label: 'Reach', value: 'Across the Atlantic' },
                  { label: 'Main advantage', value: 'Favorable westbound winds' },
                  { label: 'Question', value: 'Whose consent and knowledge are needed?' },
                ],
              },
              {
                id: 'trade-india',
                label: 'Indian Ocean spices',
                locationId: 'goa',
                routeId: 'preview-trade-india',
                summary: 'Attempt the longest route for direct access to spice markets.',
                details:
                  'The potential value is high, but the voyage around Africa demands exceptional supplies, navigation, and cooperation with established Indian Ocean traders.',
                facts: [
                  { label: 'Reach', value: 'Intercontinental voyage' },
                  { label: 'Main advantage', value: 'Direct spice-market access' },
                  { label: 'Question', value: 'Can the crew sustain the distance?' },
                ],
              },
            ],
          },
        },
        {
          id: 'mission-mapping',
          icon: '🗺',
          label: 'Map the unknown',
          summary: 'Expand geographic knowledge for later voyages.',
          rationaleHint: 'Consider what the portolan chart shows—and leaves blank.',
          question:
            'You prioritized mapping. How could better geographic knowledge change later decisions and voyages?',
          consequence:
            'The expedition receives charts, instruments, and a mandate to record every coastline.',
          sceneTitle: 'A World to Be Mapped',
          evidenceIds: ['evidence-portolan'],
          planning: {
            mode: 'exploration',
            mapFocus: { cover: 'regional' },
            prompt:
              'The chart reveals three uncertain regions. Inspect each possible voyage before choosing what to map.',
            targetPrompt: 'Which unknown region should the expedition investigate?',
            selectionLabel: 'Choose this mapping voyage',
            targets: [
              {
                id: 'unknown-brazil',
                label: 'Western landfall',
                locationId: 'recife',
                routeId: 'preview-unknown-brazil',
                summary: 'Test the winds across the South Atlantic and record the coastline.',
                details:
                  'The winds may carry the ship west quickly, but the landing point is uncertain and any coastal community must be approached as people with their own knowledge and authority.',
                facts: [
                  { label: 'Unknown', value: 'Landfall and coastline' },
                  { label: 'Navigation test', value: 'Open-ocean latitude' },
                  { label: 'Major risk', value: 'No planned resupply port' },
                ],
              },
              {
                id: 'unknown-north',
                label: 'Northern Atlantic',
                locationId: 'newfoundland',
                routeId: 'preview-unknown-north',
                summary: 'Survey cold northern waters, fishing grounds, and coastlines.',
                details:
                  'The voyage is shorter than the southern alternatives, but fog, cold, and unstable winds make observation and safe return difficult.',
                facts: [
                  { label: 'Unknown', value: 'Northern coast and waters' },
                  { label: 'Navigation test', value: 'Fog and high latitude' },
                  { label: 'Major risk', value: 'Cold and poor visibility' },
                ],
              },
              {
                id: 'unknown-cape',
                label: 'Southern cape',
                locationId: 'cape-town',
                routeId: 'preview-unknown-cape',
                summary: 'Map a passage around Africa toward the Indian Ocean.',
                details:
                  'Coastal landmarks help for part of the voyage, but the southern cape brings extreme distance, weather, and currents before a return can begin.',
                facts: [
                  { label: 'Unknown', value: 'Southern passage' },
                  { label: 'Navigation test', value: 'Currents and coastal bearings' },
                  { label: 'Major risk', value: 'Severe weather and duration' },
                ],
              },
            ],
          },
        },
        {
          id: 'mission-influence',
          icon: '👑',
          label: 'Find a sponsor',
          summary: 'Choose a country and build a plan that can win its support.',
          rationaleHint: 'Match the proposed voyage to what each sponsor values and fears.',
          question:
            'Why should your selected sponsor support this plan, and whose interests must the proposal consider?',
          consequence:
            'The expedition records the sponsor response and carries its conditions into voyage planning.',
          sceneTitle: 'Winning a Sponsor',
          evidenceIds: ['evidence-portolan'],
          planning: {
            mode: 'sponsor',
            mapFocus: {
              cover: 'world',
              bounds: { west: -16, east: 8, north: 59, south: 33 },
            },
            prompt:
              'Four countries could sponsor the expedition. Inspect each court, select one, and prepare a convincing plan.',
            targetPrompt: 'Which country should receive your proposal?',
            selectionLabel: 'Select this sponsor',
            planPrompt: 'How will you convince this sponsor to support the voyage?',
            planPlaceholder:
              'Our expedition will help your country by… We will manage the risks by…',
            submitLabel: 'Send plan to the sponsor',
            targets: [
              {
                id: 'sponsor-portugal',
                label: 'Portugal',
                locationId: 'lisbon',
                summary: 'Experienced Atlantic pilots and strong interest in routes around Africa.',
                details:
                  'Portugal can offer navigators and coastal knowledge. Its council will expect a practical route, controlled costs, and a clear connection to overseas trade.',
                facts: [
                  { label: 'Can provide', value: 'Pilots, charts, Atlantic ports' },
                  { label: 'Wants to hear', value: 'A realistic route around Africa' },
                  { label: 'Concern', value: 'Cost and rival expeditions' },
                ],
                decisionResponse:
                  'Portugal will sponsor the mission if your final evidence shows the route is practical and the supply plan can support it.',
              },
              {
                id: 'sponsor-spain',
                label: 'Spain',
                locationId: 'seville',
                summary: 'Interested in a westward alternative and new Atlantic connections.',
                details:
                  'Spain may support a bold westward proposal. Its council will need a persuasive explanation of distance, navigation, and what makes the gamble worthwhile.',
                facts: [
                  { label: 'Can provide', value: 'Ships, crews, royal authority' },
                  { label: 'Wants to hear', value: 'A distinct westward opportunity' },
                  { label: 'Concern', value: 'Uncertain distance and return' },
                ],
                decisionResponse:
                  'Spain gives conditional approval: prove that the westward course has a credible navigation and return plan.',
              },
              {
                id: 'sponsor-england',
                label: 'England',
                locationId: 'london',
                summary: 'Merchant backing may support a focused northern Atlantic voyage.',
                details:
                  'English merchants may share the risk if the proposal has a specific northern objective, a manageable budget, and a believable path to new trade.',
                facts: [
                  { label: 'Can provide', value: 'Merchant funding and ships' },
                  { label: 'Wants to hear', value: 'A focused northern objective' },
                  { label: 'Concern', value: 'Profit and dangerous cold seas' },
                ],
                decisionResponse:
                  'England offers shared funding if the mission stays focused and your crew prepares for northern weather.',
              },
              {
                id: 'sponsor-france',
                label: 'France',
                locationId: 'paris',
                summary: 'Could support exploration that strengthens knowledge and competition.',
                details:
                  'France may value better maps and access to fisheries, but the proposal must show why this voyage deserves resources alongside competing priorities at home.',
                facts: [
                  { label: 'Can provide', value: 'Royal permission and port support' },
                  { label: 'Wants to hear', value: 'Useful maps and northern access' },
                  { label: 'Concern', value: 'Competing demands for money' },
                ],
                decisionResponse:
                  'France requests one revision: connect the new maps to a concrete trade or fishing opportunity before full approval.',
              },
            ],
          },
        },
      ],
    },
    {
      id: 'step-supplies',
      chapter: 2,
      title: 'Prepare the Ship',
      kicker: 'Every crate is a choice',
      positionLocationId: 'lisbon',
      sceneType: 'departure',
      topicTags: ['resources', 'technology'],
      masteryTags: ['Resource reasoning', 'Technology knowledge'],
      mission: 'The ship cannot carry everything. Choose what receives the final cargo space.',
      choicePrompt: 'Which preparation deserves priority?',
      choices: [
        {
          id: 'supply-water',
          icon: '💧',
          label: 'Extra water and food',
          summary: 'Protect the crew during delay or bad winds.',
          rationaleHint: 'Reliability may matter more than speed.',
          question:
            'Why is extra water and food worth the space it takes from trade goods and tools?',
          consequence:
            'The lower deck is crowded with barrels, but the crew has a stronger safety margin.',
          sceneTitle: 'Provisioned for Delay',
          evidenceIds: ['evidence-wind-chart'],
          resourceChanges: { supplies: 15, time: 1 },
        },
        {
          id: 'supply-navigation',
          icon: '🧭',
          label: 'Navigation instruments',
          summary: 'Carry redundant compasses, charts, and an astrolabe.',
          rationaleHint: 'Explain which navigation problem the tools solve.',
          question:
            'Which navigation instrument is most important for your route, and what problem does it solve?',
          consequence:
            'The navigator can cross-check latitude and heading even when the coastline disappears.',
          sceneTitle: 'Tools for the Unknown',
          evidenceIds: ['evidence-astrolabe'],
          resourceChanges: { supplies: -5 },
        },
        {
          id: 'supply-repair',
          icon: '🛠',
          label: 'Repair timber and sailcloth',
          summary: 'Prepare to recover from damage at sea.',
          rationaleHint: 'A repair is only valuable if the crew can make it in time.',
          question:
            'What voyage risk does repair material address, and why is that risk more urgent than extra provisions?',
          consequence: 'Spare spars, rope, and canvas fill the final cargo space.',
          sceneTitle: 'Ready to Repair',
          evidenceIds: ['evidence-wind-chart'],
          resourceChanges: { supplies: 5 },
        },
      ],
    },
    {
      id: 'step-route',
      chapter: 3,
      title: 'Choose the Route',
      kicker: 'The chart becomes a decision',
      positionLocationId: 'lisbon',
      sceneType: 'map-travel',
      topicTags: ['geography', 'navigation'],
      masteryTags: ['Geographic reasoning', 'Map interpretation'],
      mission:
        'The fleet leaves Lisbon. Winds, resupply points, and distance pull the route in different directions.',
      choicePrompt: 'How will you reach Cape Verde?',
      choices: [
        {
          id: 'route-choice-coastal',
          label: 'Follow the African coast',
          summary: 'Stay near known ports, accepting difficult currents.',
          rationaleHint: 'Known geography lowers some risks but can add time.',
          question: 'Why did you choose the coastal route instead of the shorter direct crossing?',
          consequence:
            'The ship follows familiar coastlines and reaches Cape Verde after several resupply stops.',
          sceneTitle: 'Along the African Coast',
          routeId: 'route-coastal',
          evidenceIds: ['evidence-portolan', 'evidence-wind-chart'],
          resourceChanges: { supplies: -10, time: 4 },
        },
        {
          id: 'route-choice-islands',
          label: 'Sail by the Azores',
          summary: 'Use island waypoints before turning south.',
          rationaleHint: 'This route is longer but creates a planned refuge.',
          question: 'Why is an island waypoint worth the added distance and time?',
          consequence: 'The Azores become a mid-ocean checkpoint before the fleet turns south.',
          sceneTitle: 'The Island Arc',
          routeId: 'route-island-arc',
          evidenceIds: ['evidence-portolan', 'evidence-astrolabe'],
          resourceChanges: { supplies: -16, time: 6 },
        },
        {
          id: 'route-choice-direct',
          label: 'Take the direct ocean route',
          summary: 'Trust the trade winds and accept open-water risk.',
          rationaleHint: 'The shortest line is not always the safest voyage.',
          question:
            'Why did you choose the direct route, and which evidence makes that risk defensible?',
          consequence:
            'The coast falls away. The ship reaches Cape Verde quickly after days of open water.',
          sceneTitle: 'Into Open Water',
          routeId: 'route-direct',
          evidenceIds: ['evidence-wind-chart', 'evidence-astrolabe'],
          resourceChanges: { supplies: -12, time: 3 },
        },
      ],
    },
    {
      id: 'step-storm',
      chapter: 4,
      title: 'The First Crisis',
      kicker: 'Storm over Cape Verde',
      positionLocationId: 'cape-verde',
      sceneType: 'crisis',
      topicTags: ['risk', 'consequence'],
      masteryTags: ['Evidence-based decision', 'Cause and consequence'],
      mission:
        'A storm tears the mainsail. Water stores are falling and the fleet must choose a direction.',
      choicePrompt: 'How will the expedition respond?',
      choices: [
        {
          id: 'storm-west',
          label: 'Turn west with the trade winds',
          summary: 'Seek land across the South Atlantic.',
          rationaleHint: 'This protects the damaged sail from a punishing southern route.',
          question:
            'Turning west protects the ship but abandons the original plan. Is that tradeoff justified by the expedition record?',
          consequence: 'The trade winds carry the damaged ship west to the coast of Brazil.',
          sceneTitle: 'Driven West',
          routeId: 'route-west-after-storm',
          evidenceIds: ['evidence-storm-log', 'evidence-wind-chart'],
          resourceChanges: { supplies: -18, crew: -8, time: 4 },
        },
        {
          id: 'storm-south',
          label: 'Repair and continue south',
          summary: 'Use supplies now to preserve the route around Africa.',
          rationaleHint:
            'A field repair preserves the mission but extends exposure to bad weather.',
          question:
            'Your decision protects the mission but costs supplies and time. Was the delay worth it?',
          consequence: 'The crew repairs the sail, then fights south toward the Cape of Good Hope.',
          sceneTitle: 'Hold the Southern Course',
          routeId: 'route-south-after-storm',
          evidenceIds: ['evidence-storm-log'],
          resourceChanges: { supplies: -25, crew: -12, time: 7 },
        },
      ],
    },
    {
      id: 'step-encounter',
      chapter: 5,
      title: 'First Encounter',
      kicker: 'Two accounts, one event',
      positionLocationId: 'cape-verde',
      sceneType: 'encounter',
      topicTags: ['perspective', 'contact'],
      masteryTags: ['Source perspective', 'Ethical reasoning'],
      mission:
        'At landfall, the ship’s official log and a community account describe the exchange differently.',
      choicePrompt: 'How will the expedition proceed?',
      choices: [
        {
          id: 'encounter-negotiate',
          label: 'Pause and negotiate',
          summary: 'Use interpreters, exchange knowledge, and accept delay.',
          rationaleHint: 'Look for what each account says the other side values.',
          question:
            'How might the local community describe this negotiation differently from the ship’s official account?',
          consequence:
            'The expedition pauses. The final record preserves both accounts and notes the limits of translation.',
          sceneTitle: 'Two Accounts of One Encounter',
          evidenceIds: ['evidence-port-accounts'],
          resourceChanges: { time: 2, supplies: 8 },
        },
        {
          id: 'encounter-seize',
          label: 'Seize supplies and leave',
          summary: 'Protect the voyage’s schedule at direct cost to the community.',
          rationaleHint: 'A strategically effective choice can still cause serious harm.',
          question:
            'Who benefits from this decision, who is harmed, and can the voyage still be called successful?',
          consequence:
            'The ship leaves quickly with supplies, while the community’s account records loss and violence.',
          sceneTitle: 'The Cost of Speed',
          evidenceIds: ['evidence-port-accounts'],
          resourceChanges: { supplies: 12, crew: -5 },
        },
        {
          id: 'encounter-withdraw',
          label: 'Withdraw without trade',
          summary: 'Avoid immediate conflict but gain no resupply or local knowledge.',
          rationaleHint: 'Avoiding contact also has consequences.',
          question:
            'What risk does withdrawal reduce, and what knowledge or opportunity does it sacrifice?',
          consequence:
            'The expedition moves offshore. No conflict occurs, but the chart remains incomplete.',
          sceneTitle: 'The Unfinished Chart',
          evidenceIds: ['evidence-port-accounts'],
          resourceChanges: { supplies: -10, time: 1 },
        },
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
        {
          ...point(-9.14, 38.72),
          locationId: 'lisbon',
          eventType: 'decision',
          eventLabel: 'Prioritized trade',
        },
        point(-17, 25),
        {
          ...point(-23.51, 15.11),
          locationId: 'cape-verde',
          eventType: 'resupply',
          eventLabel: 'Resupplied',
        },
        point(-11, -2),
        {
          ...point(18.42, -33.92),
          locationId: 'cape-town',
          eventType: 'storm',
          eventLabel: 'Repaired after storm',
        },
        {
          ...point(73.83, 15.49),
          locationId: 'goa',
          eventType: 'trade',
          eventLabel: 'Reached Indian Ocean market',
        },
      ],
      outcome: 'Reached Goa after repairing near the Cape.',
    },
    {
      voyageId: 'voyage-horizon',
      team: { name: 'Team Horizon', emblem: '◒', color: '#79c7d5', linePattern: 'long-dash' },
      route: [
        { ...point(-9.14, 38.72), locationId: 'lisbon' },
        {
          ...point(-23.51, 15.11),
          locationId: 'cape-verde',
          eventType: 'decision',
          eventLabel: 'Turned west',
        },
        {
          ...point(-34.88, -8.05),
          locationId: 'recife',
          eventType: 'encounter',
          eventLabel: 'Negotiated at landfall',
        },
      ],
      outcome: 'Reached South America and revised the mission.',
    },
    {
      voyageId: 'voyage-voyager',
      team: { name: 'Team Voyager', emblem: '⚑', color: '#ef9275', linePattern: 'short-dash' },
      route: [
        { ...point(-5.99, 37.39), locationId: 'seville' },
        point(-31, 29),
        {
          ...point(-66.1, 18.47),
          locationId: 'san-juan',
          eventType: 'encounter',
          eventLabel: 'Compared two accounts',
        },
        {
          ...point(-82.37, 23.11),
          locationId: 'havana',
          eventType: 'trade',
          eventLabel: 'Traded for water',
        },
      ],
      outcome: 'Crossed to the Caribbean through open water.',
    },
    {
      voyageId: 'voyage-star',
      team: { name: 'Team Star', emblem: '★', color: '#c39be8', linePattern: 'dot-dash' },
      route: [
        { ...point(-9.14, 38.72), locationId: 'lisbon' },
        {
          ...point(-1.35, 5.08),
          locationId: 'elmina',
          eventType: 'trade',
          eventLabel: 'Stopped at Elmina',
        },
        {
          ...point(18.42, -33.92),
          locationId: 'cape-town',
          eventType: 'storm',
          eventLabel: 'Lost a mast near the Cape',
        },
        { ...point(73.83, 15.49), locationId: 'goa' },
        {
          ...point(102.25, 2.19),
          locationId: 'malacca',
          eventType: 'discovery',
          eventLabel: 'Reached the strait',
        },
      ],
      outcome: 'Continued through the Indian Ocean to Malacca.',
    },
    {
      voyageId: 'voyage-atlas',
      team: { name: 'Team Atlas', emblem: '◎', color: '#a8d47d', linePattern: 'double' },
      route: [
        point(-1, 51),
        {
          ...point(-25.67, 37.74),
          locationId: 'azores',
          eventType: 'resupply',
          eventLabel: 'Waited for weather',
        },
        {
          ...point(-53.5, 47.5),
          locationId: 'newfoundland',
          eventType: 'discovery',
          eventLabel: 'Mapped fishing grounds',
        },
      ],
      outcome: 'Mapped a northern route across the Atlantic.',
    },
  ],
};

function point(longitude: number, latitude: number) {
  return { longitude, latitude } as const;
}

export const ageOfExplorationJourneyConfig: JourneyProjectConfig = {
  ...legacyAgeOfExplorationJourneyConfig,
  projectVersion: '1.1.0',
  subtitle: 'An Atlantic expedition · decisions, evidence, and reflection',
  evidence: expeditionEvidence,
  learning: expeditionLearning,
  steps: legacyAgeOfExplorationJourneyConfig.steps.map((step) =>
    step.id === 'step-encounter'
      ? {
          ...step,
          mission:
            'At landfall, compare two fictional classroom accounts. They show different interests and uncertainty; they are not historical testimony.',
          choices: step.choices.map((choice) =>
            choice.id === 'encounter-negotiate'
              ? {
                  ...choice,
                  question:
                    'Using a detail from each reconstructed account, explain why the speakers describe fairness differently. What evidence is still missing?',
                  consequence:
                    'The expedition pauses to negotiate. Compare the two reconstructed viewpoints and explain the limits of the evidence.',
                }
              : choice,
          ),
        }
      : step,
  ),
};
