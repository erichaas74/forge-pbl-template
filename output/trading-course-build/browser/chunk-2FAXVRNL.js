// src/app/projects/frontier-trading/frontier-trade-network.ts
function trail(id, from, to, name, path, days, miles, terrain, risk, cost) {
  return {
    id,
    fromLocationId: from,
    toLocationId: to,
    name,
    path,
    estimatedDays: days,
    distanceMiles: miles,
    terrain,
    risk,
    supplyCostCents: cost,
    demandClue: "Check the market news. Weather, disrupted freight and arriving shipments can change prices."
  };
}
function link(id, from, to, name, points, days, miles, terrain, risk, cost) {
  const [x1, y1, cx1, cy1, cx2, cy2, x2, y2] = points;
  return [
    trail(
      id,
      from,
      to,
      name,
      `M${x1} ${y1} C${cx1} ${cy1} ${cx2} ${cy2} ${x2} ${y2}`,
      days,
      miles,
      terrain,
      risk,
      cost
    ),
    trail(
      `${id}-return`,
      to,
      from,
      `${name} \xB7 return`,
      `M${x2} ${y2} C${cx2} ${cy2} ${cx1} ${cy1} ${x1} ${y1}`,
      days,
      miles,
      terrain,
      risk,
      cost
    )
  ];
}
var frontierNetworkRoutes = [
  trail(
    "route-northern-return",
    "fort-bridger",
    "independence-post",
    "Northern Fort Road \xB7 return",
    "M38 30 C28 32 20 42 14 62",
    3,
    96,
    ["plains", "forest"],
    "low",
    1800
  ),
  trail(
    "route-river-return",
    "river-crossing",
    "independence-post",
    "Green River Trail \xB7 return",
    "M47 69 C35 76 24 72 14 62",
    4,
    108,
    ["plains", "river", "forest"],
    "moderate",
    2100
  ),
  trail(
    "route-south-pass-return",
    "south-pass",
    "independence-post",
    "South Pass Route \xB7 return",
    "M68 39 C49 39 31 48 14 62",
    4,
    124,
    ["plains", "mountain", "rocky"],
    "high",
    2500
  ),
  trail(
    "route-laramie-return",
    "fort-laramie",
    "independence-post",
    "Laramie Supply Road \xB7 return",
    "M80 68 C56 73 34 61 14 62",
    3,
    118,
    ["plains", "forest"],
    "low",
    2200
  ),
  trail(
    "route-miners-return",
    "miners-camp",
    "independence-post",
    "High Country Freight Trail \xB7 return",
    "M89 25 C65 16 37 24 14 62",
    5,
    148,
    ["plains", "mountain", "rocky"],
    "high",
    2900
  ),
  ...link(
    "route-bridger-river",
    "fort-bridger",
    "river-crossing",
    "Riverbank Connector",
    [38, 30, 31, 44, 39, 59, 47, 69],
    2,
    58,
    ["forest", "river"],
    "moderate",
    1100
  ),
  ...link(
    "route-river-laramie",
    "river-crossing",
    "fort-laramie",
    "Valley Freight Road",
    [47, 69, 60, 76, 75, 73, 80, 68],
    2,
    64,
    ["plains"],
    "low",
    1200
  ),
  ...link(
    "route-laramie-pass",
    "fort-laramie",
    "south-pass",
    "Eastern Ridge Road",
    [80, 68, 84, 53, 74, 46, 68, 39],
    2,
    52,
    ["plains", "forest"],
    "moderate",
    1400
  ),
  ...link(
    "route-bridger-pass",
    "fort-bridger",
    "south-pass",
    "Fort-to-Pass Road",
    [38, 30, 49, 25, 58, 30, 68, 39],
    2,
    61,
    ["plains", "forest"],
    "moderate",
    1400
  ),
  ...link(
    "route-pass-miners",
    "south-pass",
    "miners-camp",
    "High Camp Switchbacks",
    [68, 39, 76, 39, 87, 33, 89, 25],
    2,
    43,
    ["mountain", "rocky"],
    "high",
    1600
  ),
  ...link(
    "route-laramie-miners",
    "fort-laramie",
    "miners-camp",
    "Camp Supply Loop",
    [80, 68, 98, 54, 99, 37, 89, 25],
    3,
    84,
    ["plains", "forest"],
    "moderate",
    1900
  ),
  ...link(
    "route-bridger-laramie",
    "fort-bridger",
    "fort-laramie",
    "Central Trading Road",
    [38, 30, 49, 49, 67, 54, 80, 68],
    3,
    88,
    ["plains", "forest"],
    "low",
    1700
  )
];

// src/app/projects/frontier-trading/frontier-trade-world.ts
var frontierTradeWorld = {
  timing: "turn-based",
  tickIntervalMs: 2e4,
  eventEveryTicks: 3,
  events: [
    {
      id: "winter-supply-storm",
      kind: "winter-storm",
      title: "Winter storm closes the high roads",
      description: "Snow blocks supply wagons. Fort and camp stores raise prices on warm cloth, food and lantern oil until the storm clears.",
      locationIds: ["fort-bridger", "south-pass", "miners-camp"],
      goodIds: ["cloth", "flour", "dried-beans", "lantern-oil"],
      priceChangeBps: 3e3,
      durationTicks: 4
    },
    {
      id: "green-river-flood",
      kind: "flood",
      title: "Floodwater disrupts river deliveries",
      description: "Flooded crossings delay freight. Rope, tools and preserved food become harder to find at the river and nearby fort.",
      locationIds: ["river-crossing", "fort-laramie"],
      goodIds: ["rope", "iron-tools", "dried-beans", "salt"],
      priceChangeBps: 2500,
      durationTicks: 5
    },
    {
      id: "crossing-passage-conflict",
      kind: "conflict",
      title: "Raid at a disputed crossing",
      description: "In this fictional scenario, a small Native war party attacks a freight wagon after a dispute over passage through Native land. Local Native traders seek safe passage for everyone. Delayed shipments raise supply prices.",
      locationIds: ["independence-post", "fort-laramie"],
      goodIds: ["flour", "cloth", "rope"],
      priceChangeBps: 2e3,
      durationTicks: 3
    }
  ],
  shipments: [
    {
      id: "valley-freight",
      name: "Valley Freight",
      routeId: "route-river-laramie",
      goodIds: ["rope", "iron-tools", "dried-beans", "salt"],
      quantity: 6,
      travelTicks: 3,
      startOffset: 0,
      priceDropBps: 2e3,
      reliefTicks: 4
    },
    {
      id: "fort-provisions",
      name: "Fort Provisions",
      routeId: "route-northern",
      goodIds: ["flour", "cloth", "lantern-oil"],
      quantity: 8,
      travelTicks: 4,
      startOffset: 1,
      priceDropBps: 2e3,
      reliefTicks: 4
    },
    {
      id: "native-trade-caravan",
      name: "Native Trade Caravan",
      routeId: "route-bridger-pass",
      goodIds: ["cloth", "dried-beans", "salt"],
      quantity: 5,
      travelTicks: 3,
      startOffset: 1,
      priceDropBps: 1500,
      reliefTicks: 3
    },
    {
      id: "camp-supplies",
      name: "Camp Supply Company",
      routeId: "route-laramie-miners",
      goodIds: ["iron-tools", "lantern-oil", "flour"],
      quantity: 7,
      travelTicks: 5,
      startOffset: 0,
      priceDropBps: 2500,
      reliefTicks: 4
    }
  ]
};

// src/app/projects/frontier-trading/frontier-expeditions.ts
var storm = {
  id: "weather",
  kind: "winter-storm",
  title: "Storm on the trail",
  description: "Rain lashes the wagon. Protect the load or spend time waiting for clear skies.",
  afterLeg: 0,
  day: 1,
  choices: [
    { id: "cover", label: "Buy waterproof covers", costCents: 1200, delayDays: 0, lossUnits: 0 },
    { id: "shelter", label: "Shelter for two days", costCents: 400, delayDays: 2, lossUnits: 0 },
    { id: "push", label: "Push through the rain", costCents: 0, delayDays: 0, lossUnits: 2 }
  ]
};
var attack = {
  id: "attack",
  kind: "conflict",
  title: "Raiders block the road",
  description: "A raiding party threatens the cargo. Choose an escort, take the long way, or surrender two goods.",
  afterLeg: 1,
  day: 1,
  choices: [
    { id: "escort", label: "Hire a guard escort", costCents: 2e3, delayDays: 0, lossUnits: 0 },
    { id: "detour", label: "Take a hidden detour", costCents: 800, delayDays: 2, lossUnits: 0 },
    { id: "surrender", label: "Surrender two goods", costCents: 0, delayDays: 0, lossUnits: 2 }
  ]
};
var flood = {
  id: "flood",
  kind: "flood",
  title: "Flooded crossing",
  description: "Floodwater covers the crossing ahead. A ferry protects the cargo; waiting is slower; fording damages three goods.",
  afterLeg: 2,
  day: 1,
  choices: [
    { id: "ferry", label: "Pay for the ferry", costCents: 2800, delayDays: 0, lossUnits: 0 },
    { id: "wait", label: "Wait for the water to fall", costCents: 600, delayDays: 3, lossUnits: 0 },
    { id: "ford", label: "Ford the floodwater", costCents: 0, delayDays: 1, lossUnits: 3 }
  ]
};
var pair = (routeId, days, costCents) => [
  { routeId, days, costCents },
  { routeId: `${routeId}-return`, days, costCents }
];
var frontierExpeditions = {
  capability: "roundTripTrading",
  cycles: [
    {
      id: "first-trip",
      title: "The first round trip",
      budgetCents: 2e4,
      capacity: 20,
      goodIds: ["flour", "salt", "dried-beans"],
      requiredLocationIds: ["fort-bridger"],
      legs: pair("route-northern", 1, 600),
      hazards: []
    },
    {
      id: "weather-trip",
      title: "The longer supply run",
      budgetCents: 3e4,
      capacity: 28,
      goodIds: ["flour", "salt", "cloth", "rope"],
      requiredLocationIds: ["fort-laramie"],
      legs: [...pair("route-northern", 2, 900), ...pair("route-bridger-laramie", 3, 1400)],
      hazards: [storm]
    },
    {
      id: "raider-trip",
      title: "The high-country trade",
      budgetCents: 4e4,
      capacity: 34,
      goodIds: ["flour", "salt", "cloth", "iron-tools"],
      requiredLocationIds: ["miners-camp"],
      legs: [...pair("route-northern", 2, 900), ...pair("route-bridger-pass", 3, 1400), ...pair("route-pass-miners", 3, 1800), ...pair("route-south-pass", 5, 2500)],
      hazards: [storm, attack]
    },
    {
      id: "flood-trip",
      title: "The resilient trading company",
      budgetCents: 5e4,
      capacity: 40,
      goodIds: ["flour", "salt", "rope", "iron-tools", "cloth"],
      requiredLocationIds: ["fort-laramie", "miners-camp"],
      legs: [...pair("route-northern", 2, 900), ...pair("route-bridger-river", 3, 1500), ...pair("route-river-laramie", 3, 1600), ...pair("route-laramie-miners", 4, 2200), ...pair("route-laramie", 5, 2300)],
      hazards: [storm, attack, flood]
    }
  ]
};

// src/app/projects/frontier-trading/frontier-trading.config.ts
var goods = [
  good(
    "fur-pelts",
    "Fur Pelts",
    "\u25C6",
    "Raw materials",
    4800,
    3,
    "Warm pelts prized at colder mountain posts.",
    "bale"
  ),
  good(
    "flour",
    "Flour",
    "\u25A7",
    "Food",
    2200,
    2,
    "A staple food that sells steadily in growing settlements.",
    "sack"
  ),
  good(
    "coffee",
    "Coffee",
    "\u25CF",
    "Food",
    3400,
    2,
    "A light luxury good with uneven demand.",
    "sack"
  ),
  good(
    "iron-tools",
    "Iron Tools",
    "\u2692",
    "Equipment",
    5200,
    4,
    "Heavy, useful equipment with strong value at remote camps.",
    "crate"
  ),
  good(
    "salt",
    "Salt",
    "\u25C7",
    "Food",
    1500,
    1,
    "Compact, reliable, and useful for preserving food.",
    "sack"
  ),
  good(
    "cloth",
    "Cloth",
    "\u25B1",
    "Textiles",
    2800,
    2,
    "Flexible cargo with demand in towns and forts.",
    "bale"
  ),
  good(
    "lantern-oil",
    "Lantern Oil",
    "\u25C9",
    "Supplies",
    2600,
    2,
    "Useful at camps, crossings, and night work sites.",
    "crate"
  ),
  good(
    "sugar",
    "Sugar",
    "\u25A0",
    "Food",
    3200,
    1,
    "Small cargo units with luxury-market potential.",
    "sack"
  ),
  good(
    "rope",
    "Rope",
    "\u25CE",
    "Equipment",
    2100,
    2,
    "Practical trail equipment with steady demand.",
    "coil"
  ),
  good(
    "dried-beans",
    "Dried Beans",
    "\u2662",
    "Food",
    1800,
    1,
    "Affordable provisions that travel well.",
    "sack"
  )
];
var events = [
  {
    id: "event-river-crossing",
    type: "decision",
    title: "Fast Water at the Crossing",
    icon: "\u2248",
    story: "Spring runoff has raised the river. A ferry operator offers a safe crossing, but waiting or taking a detour may preserve more cash. Your company must balance time, cost, and cargo safety.",
    facts: [
      "The normal ford is closed.",
      "Delays use valuable season days.",
      "Cargo remains safe only on the ferry or while waiting."
    ],
    choices: [
      choice(
        "ferry",
        "Pay for the ferry",
        "Cross safely with little delay.",
        -2400,
        0,
        "Low risk",
        "The ferry carries the company across safely."
      ),
      choice(
        "wait",
        "Wait for lower water",
        "Keep most cash but lose a day.",
        -500,
        1,
        "Low risk",
        "The water falls and the trail reopens the next day."
      ),
      choice(
        "detour",
        "Take the ridge detour",
        "Spend on extra supplies and accept cargo risk.",
        -1200,
        0,
        "Moderate risk",
        "The longer trail works, but one cargo unit is damaged.",
        1
      )
    ]
  },
  {
    id: "event-supply-bundle",
    type: "math",
    title: "Supply Bundle Calculation",
    icon: "\xF7",
    story: "A trail supplier sells four identical repair bundles for $18.00. Your crew needs to know the price of one bundle before deciding whether the offer fits the budget.",
    facts: [
      "The four bundles cost $18.00 total.",
      "All bundles are identical.",
      "Enter the unit price in dollars."
    ],
    mathChallenge: {
      prompt: "$18.00 \xF7 4 = ?",
      hint: "Think of 1,800 cents split into four equal groups.",
      answer: 4.5,
      unit: "dollars"
    },
    choices: [
      choice(
        "buy-bundle",
        "Buy one repair bundle",
        "Use the unit price you calculated.",
        -450,
        0,
        "Known cost",
        "The repair bundle prevents a later delay."
      ),
      choice(
        "pass-bundle",
        "Save the cash",
        "Continue without the extra repair bundle.",
        0,
        0,
        "Unknown risk",
        "The company keeps its cash and accepts the trail risk."
      )
    ]
  },
  {
    id: "event-demand-order",
    type: "positive",
    title: "Camp Supply Order",
    icon: "\u2191",
    story: "A survey crew needs urgent supplies and offers payment for helping organize their delivery list. The work takes a little time but brings dependable income.",
    facts: [
      "Payment is guaranteed.",
      "No cargo is sold.",
      "The task can be completed today or skipped."
    ],
    choices: [
      choice(
        "help-order",
        "Organize the order",
        "Earn cash for careful record keeping.",
        1600,
        0,
        "Guaranteed",
        "The accurate list earns your company $16.00."
      ),
      choice(
        "keep-moving",
        "Keep moving",
        "Protect your schedule instead.",
        0,
        0,
        "No change",
        "The company continues without changing cash."
      )
    ]
  },
  {
    id: "event-wheel-repair",
    type: "negative",
    title: "Loose Wagon Wheel",
    icon: "\u2699",
    story: "A wheel rim has loosened on the rough trail. A careful repair costs money; a temporary fix is cheaper but may damage cargo.",
    facts: [
      "Travel cannot continue without a repair.",
      "A full repair protects cargo.",
      "A temporary fix costs less immediately."
    ],
    choices: [
      choice(
        "full-repair",
        "Make a full repair",
        "Pay for parts and continue safely.",
        -1800,
        0,
        "Low risk",
        "The repaired wheel holds for the rest of the route."
      ),
      choice(
        "temporary-repair",
        "Make a temporary fix",
        "Spend less but risk one cargo unit.",
        -600,
        0,
        "Moderate risk",
        "The wheel holds, but one cargo unit is damaged.",
        1
      )
    ]
  },
  {
    id: "event-reserve-math",
    type: "math",
    title: "Reserve Check",
    icon: "%",
    story: "The company has $72.00 and considers spending $27.50 on supplies. Calculate the cash that would remain before choosing.",
    facts: [
      "Current comparison amount: $72.00.",
      "Possible supply cost: $27.50.",
      "Enter the remaining dollars."
    ],
    mathChallenge: {
      prompt: "$72.00 \u2212 $27.50 = ?",
      hint: "Subtract 2,750 cents from 7,200 cents.",
      answer: 44.5,
      unit: "dollars"
    },
    choices: [
      choice(
        "stock-supplies",
        "Stock extra supplies",
        "Pay now to lower future risk.",
        -2750,
        0,
        "Low future risk",
        "The crew is well supplied for the remaining trail."
      ),
      choice(
        "protect-reserve",
        "Protect the reserve",
        "Keep cash for the destination market.",
        0,
        0,
        "Unknown future risk",
        "The company keeps its reserve intact."
      )
    ]
  },
  {
    id: "event-shortcut",
    type: "decision",
    title: "Unmarked Shortcut",
    icon: "\u2197",
    story: "A local guide describes a shorter track across open grassland. The route could save a day, but the company would need to pay for guidance.",
    facts: [
      "The shortcut is passable for your transport.",
      "The guide knows the area.",
      "The regular route remains open."
    ],
    choices: [
      choice(
        "hire-guide",
        "Hire the guide",
        "Pay for local knowledge and keep moving.",
        -1e3,
        0,
        "Low risk",
        "The guide leads the company safely across the shortcut."
      ),
      choice(
        "regular-route",
        "Stay on the marked route",
        "Spend no extra cash.",
        0,
        1,
        "Low risk",
        "The company follows the longer known trail."
      )
    ]
  },
  {
    id: "event-cargo-cover",
    type: "negative",
    title: "Sudden Hail",
    icon: "\u2726",
    story: "A fast hailstorm threatens exposed cargo. Canvas covers are available from another traveler, or the crew can wait beneath a rocky shelter.",
    facts: [
      "Uncovered cargo may be damaged.",
      "The shelter is safe but costs time.",
      "The canvas can be reused."
    ],
    choices: [
      choice(
        "buy-canvas",
        "Buy canvas covers",
        "Protect cargo and continue.",
        -1300,
        0,
        "Low risk",
        "The new covers keep every cargo unit dry."
      ),
      choice(
        "take-shelter",
        "Wait under shelter",
        "Save cash and lose one day.",
        0,
        1,
        "Low risk",
        "The storm passes without damaging cargo."
      )
    ]
  },
  {
    id: "event-distance-math",
    type: "math",
    title: "Distance and Pace",
    icon: "\xD7",
    story: "The next marker is 36 miles away. At a steady pace of 12 miles per day, calculate how many travel days the segment requires.",
    facts: ["Distance: 36 miles.", "Pace: 12 miles each day.", "Enter a whole number of days."],
    mathChallenge: {
      prompt: "36 miles \xF7 12 miles per day = ?",
      hint: "How many groups of 12 fit in 36?",
      answer: 3,
      unit: "days"
    },
    choices: [
      choice(
        "steady-pace",
        "Keep a steady pace",
        "Use the planned three-day schedule.",
        0,
        0,
        "Low risk",
        "The company follows its calculated schedule."
      ),
      choice(
        "push-harder",
        "Push for a faster pace",
        "Save time but pay for extra feed.",
        -900,
        0,
        "Moderate risk",
        "Extra feed keeps the team moving safely."
      )
    ]
  },
  {
    id: "event-shared-repair",
    type: "positive",
    title: "Shared Repair Work",
    icon: "\u271A",
    story: "Another company offers to trade repair help for careful inventory counting. Cooperation can save both groups money.",
    facts: [
      "No cargo changes hands.",
      "The work is completed at camp.",
      "Accurate counting earns a payment."
    ],
    choices: [
      choice(
        "cooperate",
        "Help with the inventory",
        "Earn money and build goodwill.",
        1200,
        0,
        "Guaranteed",
        "Both companies finish their repairs and your company earns $12.00."
      ),
      choice(
        "decline",
        "Decline politely",
        "Keep the evening free.",
        0,
        0,
        "No change",
        "The company rests and continues in the morning."
      )
    ]
  },
  {
    id: "event-price-rumor",
    type: "decision",
    title: "Market Price Rumor",
    icon: "!",
    story: "A traveler claims that tools are scarce at the next settlement. The claim may help your planning, but it is not verified evidence.",
    facts: [
      "The source is one traveler.",
      "No official market list is available.",
      "Your current cargo cannot change on the trail."
    ],
    choices: [
      choice(
        "record-rumor",
        "Record it as uncertain evidence",
        "Use the clue carefully in your reflection.",
        0,
        0,
        "Uncertain information",
        "The rumor is saved as context, not as a guaranteed price."
      ),
      choice(
        "ignore-rumor",
        "Do not use the rumor",
        "Rely only on confirmed market records.",
        0,
        0,
        "No change",
        "The company continues with its existing evidence."
      )
    ]
  },
  {
    id: "event-food-shortage",
    type: "negative",
    title: "Trail Food Shortage",
    icon: "\u2212",
    story: "The route takes longer than expected and the crew needs more food. Buying locally is expensive, while rationing adds a day.",
    facts: [
      "The crew needs a safe plan.",
      "Food bought here costs more.",
      "Rationing slows travel."
    ],
    choices: [
      choice(
        "buy-food",
        "Buy trail food",
        "Pay the higher price and stay on schedule.",
        -1500,
        0,
        "Low risk",
        "The company restocks and continues."
      ),
      choice(
        "ration",
        "Ration supplies",
        "Keep cash but add a travel day.",
        0,
        1,
        "Low risk",
        "Careful rationing works, though travel slows."
      )
    ]
  },
  {
    id: "event-profit-math",
    type: "math",
    title: "Profit per Unit",
    icon: "+",
    story: "A trader bought rope for $2.10 per unit and later sold it for $3.25. Calculate the profit on one unit before evaluating the example.",
    facts: [
      "Buy price: $2.10.",
      "Sell price: $3.25.",
      "Profit equals selling price minus buying price."
    ],
    mathChallenge: {
      prompt: "$3.25 \u2212 $2.10 = ?",
      hint: "Subtract 210 cents from 325 cents.",
      answer: 1.15,
      unit: "dollars per unit"
    },
    choices: [
      choice(
        "save-example",
        "Save the example",
        "Use it as a strategy reminder.",
        0,
        0,
        "Learning evidence",
        "The calculation is recorded for later reflection."
      ),
      choice(
        "continue",
        "Continue traveling",
        "Do not save the example.",
        0,
        0,
        "No change",
        "The company continues on the route."
      )
    ]
  }
];
var frontierTradingConfig = {
  schemaVersion: "1.11",
  template: { id: "simulation-decision", version: "1.6" },
  projectId: "frontier-trading-company",
  projectVersion: "1.16.0",
  expeditionCourse: frontierExpeditions,
  tradeWorld: frontierTradeWorld,
  visualTheme: {
    vehicleImageUrl: "/frontier-trading/vehicle-scenes/trade-wagon-realistic.webp",
    vehicleImageAlt: "A frontier trade wagon carrying the company cargo.",
    cargoPackageAssets: {
      sack: "/frontier-trading/cargo-scenes/provisions-sack.webp",
      crate: "/frontier-trading/cargo-scenes/trade-crate.webp",
      bale: "/frontier-trading/cargo-scenes/wrapped-bale.webp",
      coil: "/frontier-trading/cargo-scenes/rope-coil.webp"
    }
  },
  title: "Frontier Trading Company",
  subtitle: "Trading Season Simulation",
  gradeLabel: "Grade 6 Mathematics PBL",
  mission: "Build a trading company, manage limited cash and cargo, forecast route profit, solve trail math, and explain the strategy with game records.",
  companyNameSuggestions: [
    "Bison Trail Trading Co.",
    "Red Fox Traders",
    "River Otter Trading Co.",
    "Great Horned Owl Company",
    "Pronghorn Supply Company",
    "Beaver Bend Traders",
    "Mountain Lion Mercantile",
    "Black Bear Trading Co.",
    "Peregrine Trading Company",
    "Elk Ridge Traders",
    "Badger Creek Trading Co.",
    "Snowshoe Hare Company"
  ],
  startingCashCents: 2e4,
  reserveTargetCents: 5e3,
  profitTargetCents: 5e3,
  startingLocationId: "independence-post",
  maxSeasonDays: 30,
  choiceProgression: {
    stages: [
      {
        id: "starter-outfitter",
        title: "Starter Trader",
        description: "Explore five destinations, then follow connecting roads and return trips. Visit the shops to learn more.",
        availableGoodIds: ["flour", "salt", "dried-beans"],
        availableRouteIds: [
          "route-northern",
          "route-river",
          "route-south-pass",
          "route-laramie",
          "route-miners",
          ...frontierNetworkRoutes.map((route) => route.id)
        ]
      },
      {
        id: "regional-outfitter",
        title: "Route Planner",
        description: "Choose a route, then compare goods that could earn money at your destination.",
        requirements: { minimumDiscoveredStalls: 2 },
        availableGoodIds: [
          "flour",
          "salt",
          "dried-beans",
          "cloth",
          "rope",
          "lantern-oil",
          "fur-pelts"
        ],
        availableRouteIds: [
          "route-northern",
          "route-river",
          "route-south-pass",
          "route-laramie",
          "route-miners",
          ...frontierNetworkRoutes.map((route) => route.id)
        ]
      },
      {
        id: "master-outfitter",
        title: "Frontier Trader",
        description: "You bought two kinds of goods. Every route and supply choice is now open.",
        requirements: { minimumDiscoveredStalls: 2, minimumPurchasedGoodTypes: 2 },
        availableGoodIds: goods.map((item) => item.id),
        availableRouteIds: [
          "route-northern",
          "route-river",
          "route-south-pass",
          "route-laramie",
          "route-miners",
          ...frontierNetworkRoutes.map((route) => route.id)
        ]
      }
    ]
  },
  routeForecastChallenge: {
    requiredBeforeDeparture: true,
    toleranceCents: 1
  },
  finalShowcase: {
    title: "Company Strategy Showcase",
    pitchSeconds: 180,
    audiencePrompts: [
      "Which calculation gave your company the most confidence?",
      "Which price, route, or cargo choice would you change next time?",
      "How did a trail event change your forecast?",
      "What evidence proves that your final profit is correct?",
      "Which trade-off mattered more: time, cargo space, or cash?"
    ]
  },
  transactionMath: {
    answerRequired: true,
    purchaseDiscountTiers: [
      { minimumQuantity: 3, discountPercent: 10 },
      { minimumQuantity: 7, discountPercent: 14 }
    ]
  },
  emblems: [
    { id: "compass", label: "Compass", symbol: "\u2725" },
    { id: "pine", label: "Pine tree", symbol: "\u2660" },
    { id: "star", label: "Trail star", symbol: "\u2605" },
    { id: "wagon", label: "Wagon wheel", symbol: "\u2295" }
  ],
  transports: [
    {
      id: "prairie-wagon",
      name: "Prairie Wagon",
      icon: "\u25A3",
      costCents: 4e3,
      cargoCapacity: 30,
      travelSpeed: 1,
      description: "Balanced capacity and route access.",
      vulnerability: "Moderate repair risk on rocky ground.",
      compatibleTerrain: ["plains", "forest", "river"]
    },
    {
      id: "mule-train",
      name: "Mule Train",
      icon: "\u265E",
      costCents: 3200,
      cargoCapacity: 20,
      travelSpeed: 1,
      description: "Smaller loads with excellent terrain access.",
      vulnerability: "Lower cargo capacity.",
      compatibleTerrain: ["plains", "forest", "river", "mountain", "rocky"]
    },
    {
      id: "freight-wagon",
      name: "Freight Wagon",
      icon: "\u25B0",
      costCents: 5500,
      cargoCapacity: 42,
      travelSpeed: 0.8,
      description: "Largest cargo capacity for established roads.",
      vulnerability: "Cannot use mountain or rocky routes.",
      compatibleTerrain: ["plains", "forest"]
    },
    {
      id: "handcart",
      name: "Handcart Company",
      icon: "\u25EB",
      costCents: 1800,
      cargoCapacity: 14,
      travelSpeed: 1.2,
      description: "Low startup cost and quick travel.",
      vulnerability: "Small reserve and limited rough-terrain access.",
      compatibleTerrain: ["plains", "forest"]
    }
  ],
  goods,
  locations: [
    {
      id: "independence-post",
      name: "Independence Trading Post",
      shortName: "Independence",
      kind: "post",
      mapX: 14,
      mapY: 62,
      context: "A busy starting market with balanced prices and plentiful stock."
    },
    {
      id: "fort-bridger",
      name: "Fort Bridger",
      shortName: "Fort Bridger",
      kind: "fort",
      mapX: 38,
      mapY: 30,
      context: "A northern fort that needs food, cloth, and trail equipment."
    },
    {
      id: "river-crossing",
      name: "Green River Crossing",
      shortName: "Green River",
      kind: "crossing",
      mapX: 47,
      mapY: 69,
      context: "A river settlement with demand for repair goods and preserved food."
    },
    {
      id: "south-pass",
      name: "South Pass Camp",
      shortName: "South Pass",
      kind: "pass",
      mapX: 68,
      mapY: 39,
      context: "A remote mountain camp where heavy tools can earn strong prices."
    },
    {
      id: "fort-laramie",
      name: "Fort Laramie",
      shortName: "Fort Laramie",
      kind: "fort",
      mapX: 80,
      mapY: 68,
      context: "A growing fort with strong household and food demand."
    },
    {
      id: "miners-camp",
      name: "Miner's Camp",
      shortName: "Miner's Camp",
      kind: "camp",
      mapX: 89,
      mapY: 25,
      context: "A high-risk destination with strong demand for supplies and luxuries."
    }
  ],
  markets: [
    market(
      "independence-market",
      "independence-post",
      "Independence Market",
      [1e4, 10200, 9800, 1e4, 9500, 10100, 9700, 10300, 9900, 9600],
      [8e3, 8200, 8100, 8300, 8e3, 8100, 8200, 8e3, 8300, 8100]
    ),
    market(
      "bridger-market",
      "fort-bridger",
      "Fort Bridger Market",
      [11e3, 10800, 10600, 11200, 10300, 10500, 10900, 10700, 10900, 10400],
      [14e3, 14500, 12e3, 13500, 12500, 14200, 13800, 11500, 13e3, 14800]
    ),
    market(
      "river-market",
      "river-crossing",
      "Green River Market",
      [10700, 10500, 10900, 11e3, 10600, 10400, 10300, 10800, 10500, 10200],
      [12e3, 13700, 12500, 15e3, 12800, 12200, 14500, 11800, 14800, 13900]
    ),
    market(
      "pass-market",
      "south-pass",
      "South Pass Camp Market",
      [11500, 11300, 11200, 12e3, 11e3, 11400, 11600, 11900, 11500, 11e3],
      [14500, 13e3, 13500, 17e3, 13800, 12800, 15500, 14200, 15e3, 14e3]
    ),
    market(
      "laramie-market",
      "fort-laramie",
      "Fort Laramie Market",
      [10800, 10700, 10400, 11e3, 10500, 10300, 10700, 10600, 10900, 10300],
      [13e3, 14200, 13200, 14e3, 12500, 15e3, 13900, 14700, 12800, 14500]
    ),
    market(
      "miners-market",
      "miners-camp",
      "Miner's Camp Market",
      [12e3, 11500, 11800, 12500, 11300, 11700, 12300, 12200, 12e3, 11600],
      [16e3, 15e3, 16500, 18e3, 14e3, 15500, 17e3, 17500, 16e3, 15200]
    )
  ],
  world: {
    travelAnimationMs: 5200,
    setupSceneAsset: "/frontier-trading/setup-scenes/company-charter.webp",
    mapSceneAsset: "/frontier-trading/map-scenes/frontier-route-map.webp",
    locations: [
      scene(
        "independence-post",
        "plains",
        "Bright morning with a steady west wind",
        "Mara Bell",
        "Jonas Pike",
        "Nell Avery",
        [
          "Flour shipments are plentiful this week.",
          "Remote camps may pay more for tools.",
          "Fur buyers at the northern fort are asking questions."
        ]
      ),
      scene(
        "fort-bridger",
        "fort",
        "Cool air and flags snapping above the gate",
        "Ada Rowe",
        "Caleb Stone",
        "June Hale",
        [
          "Food stores are running lower than expected.",
          "Cloth deliveries have been delayed.",
          "A freight crew says coffee demand may soften."
        ]
      ),
      scene(
        "river-crossing",
        "river",
        "Fast water, drifting clouds, and damp roads",
        "Tessa Green",
        "Micah Ford",
        "Ruth Cole",
        [
          "Repair crews need rope and iron tools.",
          "Travelers are buying dried beans.",
          "River delays could make lantern oil scarce."
        ]
      ),
      scene(
        "south-pass",
        "mountain",
        "Thin clouds with snow moving over the ridge",
        "Ivy North",
        "Eli Grant",
        "May Chen",
        [
          "Heavy tools are difficult to find here.",
          "Cold nights have raised demand for supplies.",
          "Another trader thinks sugar prices are uncertain."
        ]
      ),
      scene(
        "fort-laramie",
        "fort",
        "Warm afternoon with wagon traffic at the gate",
        "Clara West",
        "Owen Reed",
        "Sam Ortiz",
        [
          "Households are asking for cloth and flour.",
          "Salt stock looks steady.",
          "A notice claims sugar demand is rising."
        ]
      ),
      scene(
        "miners-camp",
        "camp",
        "Mountain haze, cook-fire smoke, and busy foot traffic",
        "Rosa Hill",
        "Ben Shaw",
        "Lee Morgan",
        [
          "Tools and lantern oil are visibly scarce.",
          "Freight arrivals have been unreliable.",
          "Luxury prices are high, but the rumor may be exaggerated."
        ]
      )
    ]
  },
  routes: [
    {
      id: "route-northern",
      fromLocationId: "independence-post",
      toLocationId: "fort-bridger",
      name: "Northern Fort Road",
      distanceMiles: 96,
      estimatedDays: 3,
      terrain: ["plains", "forest"],
      risk: "low",
      supplyCostCents: 1800,
      demandClue: "Food and cloth demand appears steady.",
      path: "M14 62 C20 42 28 32 38 30"
    },
    {
      id: "route-river",
      fromLocationId: "independence-post",
      toLocationId: "river-crossing",
      name: "Green River Trail",
      distanceMiles: 108,
      estimatedDays: 4,
      terrain: ["plains", "river", "forest"],
      risk: "moderate",
      supplyCostCents: 2100,
      demandClue: "Repair goods and preserved foods may be valuable.",
      path: "M14 62 C24 72 35 76 47 69"
    },
    {
      id: "route-south-pass",
      fromLocationId: "independence-post",
      toLocationId: "south-pass",
      name: "South Pass Route",
      distanceMiles: 124,
      estimatedDays: 4,
      terrain: ["plains", "mountain", "rocky"],
      risk: "high",
      supplyCostCents: 2500,
      demandClue: "Remote camps often need tools and trail supplies.",
      path: "M14 62 C31 48 49 39 68 39"
    },
    {
      id: "route-laramie",
      fromLocationId: "independence-post",
      toLocationId: "fort-laramie",
      name: "Laramie Plains Road",
      distanceMiles: 132,
      estimatedDays: 4,
      terrain: ["plains", "forest"],
      risk: "moderate",
      supplyCostCents: 2300,
      demandClue: "The growing fort may pay more for cloth and food.",
      path: "M14 62 C34 61 56 73 80 68"
    },
    {
      id: "route-miners",
      fromLocationId: "independence-post",
      toLocationId: "miners-camp",
      name: "High Country Freight Trail",
      distanceMiles: 148,
      estimatedDays: 5,
      terrain: ["plains", "mountain", "rocky"],
      risk: "high",
      supplyCostCents: 2900,
      demandClue: "Scarce supplies can bring high prices at the mining camp.",
      path: "M14 62 C37 24 65 16 89 25"
    },
    ...frontierNetworkRoutes
  ],
  events,
  reportSections: [
    {
      id: "my-plan",
      title: "My Plan",
      prompt: "What route and goods did you choose? Explain what you hoped would happen.",
      evidenceMinimum: 0
    },
    {
      id: "best-trade-math",
      title: "My Forecast and Trade Math",
      prompt: "Compare forecast and actual trip profit. Show one calculation and explain the biggest difference.",
      evidenceMinimum: 1,
      calculationRequired: true
    },
    {
      id: "route-choice",
      title: "Why I Chose My Route",
      prompt: "How did travel time, cost, risk, and destination needs affect your route choice?",
      evidenceMinimum: 1
    },
    {
      id: "next-season",
      title: "What I Would Do Next",
      prompt: "What worked, what would you change, and what advice would you give the next company?",
      evidenceMinimum: 1
    }
  ]
};
function good(id, name, icon, category, baseBuyPriceCents, unitCargo, description, cargoPackage) {
  return { id, name, icon, category, baseBuyPriceCents, unitCargo, description, cargoPackage };
}
function choice(id, label, description, cashChangeCents, dayChange, riskLabel, outcome, inventoryLossQuantity) {
  return {
    id,
    label,
    description,
    cashChangeCents,
    dayChange,
    riskLabel,
    outcome,
    inventoryLossQuantity
  };
}
function market(id, locationId, name, buyMultipliers, sellMultipliers) {
  const marketGoods = goods.map((item, index) => {
    const buy = buyMultipliers[index] ?? 1e4;
    const sell = sellMultipliers[index] ?? 1e4;
    return {
      goodId: item.id,
      availableQuantity: 12 + (index * 7 + name.length) % 19,
      buyMultiplierBps: buy,
      sellMultiplierBps: sell,
      trend: sell > 13e3 ? "higher" : sell < 1e4 ? "lower" : "same",
      note: sell > 14e3 ? "Strong local demand" : sell < 1e4 ? "Plentiful local supply" : "Steady local trade"
    };
  });
  return { id, locationId, name, statusText: "Open for trading", goods: marketGoods };
}
function scene(locationId, environment, weather, generalMerchant, smith, freightMerchant, rumors) {
  const stall = (suffix, name, merchantName, merchantRole, icon, buildingStyle, categories, greeting, rumor, trustCue) => ({
    id: `${locationId}-${suffix}`,
    name,
    merchantName,
    merchantRole,
    icon,
    buildingStyle,
    interiorSceneAsset: `/frontier-trading/shop-scenes/${buildingStyle === "mercantile" ? "general-store-interior" : buildingStyle === "forge" ? "blacksmith-interior" : buildingStyle === "warehouse" ? "freight-depot-interior" : "notice-office-interior"}.webp`,
    categories,
    greeting,
    rumor,
    trustCue
  });
  return {
    locationId,
    environment,
    weather,
    arrivalText: `Your wagon rolls into a ${environment} trading stop. Inspect the stalls before committing company money.`,
    streetSceneAsset: "/frontier-trading/shop-scenes/town-street.webp",
    stalls: [
      stall(
        "general-store",
        "General Store",
        generalMerchant,
        "Store owner",
        "\u25A4",
        "mercantile",
        ["Food", "Textiles", "Supplies"],
        "Welcome, trader. Check the posted prices and leave room in that wagon.",
        rumors[0] ?? "Travelers report changing demand farther west.",
        "Posted prices and visible shelf stock are verified here."
      ),
      stall(
        "blacksmith",
        "Blacksmith",
        smith,
        "Blacksmith",
        "\u2692",
        "forge",
        ["Equipment"],
        "Tools cost coin, but a well-chosen load can earn it back on the trail.",
        rumors[1] ?? "Freight crews have been asking about repair tools.",
        "Current workshop orders support part of this claim."
      ),
      stall(
        "freight-depot",
        "Freight Depot",
        freightMerchant,
        "Freight agent",
        "\u25B0",
        "warehouse",
        ["Raw materials"],
        "Space is money. Compare profit per cargo space before loading up.",
        rumors[2] ?? "A wagon master expects raw materials to move soon.",
        "This is a traveler report and may be uncertain."
      ),
      stall(
        "notice-board",
        "Notice Board",
        "Town notices",
        "Posted intelligence",
        "\u2726",
        "notice-office",
        [],
        "Read the notices, then decide which claims deserve your trust.",
        rumors.join(" "),
        "Notices mix verified prices with unconfirmed market rumors."
      )
    ]
  };
}

export {
  frontierTradingConfig
};
//# debugId=1ff43ea6-4dd9-53c0-b954-e78ad321036e
//# sourceMappingURL=chunk-2FAXVRNL.js.map
