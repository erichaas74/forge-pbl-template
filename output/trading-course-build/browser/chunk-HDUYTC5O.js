import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/projects/robot-delivery/robot-delivery-weeks.ts
var robotDeliveryWeeks = [
  {
    week: 1,
    title: "Precision driving",
    setting: "Test track \xB7 learn your robot\u2019s movement, then take the corner.",
    sessions: [
      {
        challengeId: "precision-parking",
        product: "A parking program tested at different target distances."
      },
      {
        challengeId: "turn-training",
        product: "An L-shaped driving program that clears the barrier and parks facing east."
      }
    ],
    questions: [
      "What distance does one wheel rotation produce? How do your trials support that estimate?",
      "How would you change the program for a target twice as far away, or halfway there?",
      "What fraction of a full turn points the robot east? Why did your first turn miss?",
      "How does measured wheel travel compare with \u03C0 \xD7 wheel diameter, and why might they differ?"
    ],
    evidence: [
      "Target distance, movement operands, and recorded path.",
      "Before/after programs, stopping error, heading, and wheel calibration trials."
    ],
    adjustments: [
      "Target distance and parking tolerance.",
      "Wheel travel, turn rate, block operands, and hints."
    ]
  },
  {
    week: 2,
    title: "Warehouse automation",
    setting: "Sorting depot \xB7 turn repeated routes into reusable code.",
    sessions: [
      {
        challengeId: "variable-upgrade",
        product: "A route controlled by a named SIDE variable that works at two sizes.",
        starterVariables: [{ id: "side", name: "SIDE", value: "75", unit: "cm" }],
        starterCommands: [
          { id: "first-side", type: "move-distance", value: "SIDE" },
          { id: "corner", type: "turn-degrees", value: "90" },
          { id: "second-side", type: "move-distance", value: "SIDE" }
        ]
      },
      {
        challengeId: "warehouse-pattern",
        product: "A repeat-loop patrol visiting all warehouse checkpoints and returning to its start.",
        starterCommands: [
          {
            id: "patrol-loop",
            type: "repeat",
            value: "3",
            commands: [
              {
                id: "side",
                type: "move-distance",
                value: "2",
                moveMath: { given: 200, operation: "divide" }
              },
              { id: "corner", type: "turn-degrees", value: "90" }
            ]
          }
        ]
      }
    ],
    questions: [
      "Which measurements change when the route grows? Which instructions can stay the same?",
      "What does SIDE represent, and where does your program use it?",
      "Which blocks repeat? How many repetitions close the route, and why?",
      "How can you prove every checkpoint was visited instead of only checking the final position?"
    ],
    evidence: [
      "Variable definitions and program versions for both route sizes.",
      "Loop contents, checkpoint visits, total distance, and replay trace."
    ],
    adjustments: [
      "Route size, checkpoint positions, and available blocks.",
      "Loop challenge, command budget, and scaffolding."
    ]
  },
  {
    week: 3,
    title: "Cross the moving city",
    setting: "Transit corridor \xB7 time your journey through patrols and sliding gates.",
    sessions: [
      {
        challengeId: "patrol-crossing",
        product: "A timed crossing program that avoids the moving scout.",
        starterCommands: [
          { id: "wait", type: "wait", value: "0" },
          {
            id: "cross",
            type: "move-distance",
            value: "7",
            moveMath: { given: 40, operation: "multiply" }
          }
        ]
      },
      {
        challengeId: "moving-gates",
        product: "A two-stage route through a scout crossing and a sliding gate.",
        starterCommands: [
          { id: "wait", type: "wait", value: "0" },
          {
            id: "north",
            type: "move-distance",
            value: "7",
            moveMath: { given: 40, operation: "multiply" }
          },
          { id: "turn", type: "turn-degrees", value: "90" },
          {
            id: "east",
            type: "move-distance",
            value: "6",
            moveMath: { given: 40, operation: "multiply" }
          }
        ]
      }
    ],
    questions: [
      "Where will the scout be when your robot reaches the crossing? Use distance, speed, and time.",
      "How does adding WAIT change the crossing without changing the route?",
      "Which collision did your revision prevent? Compare the two timelines.",
      "If the gate pauses for a different duration, which part of the program needs to change?"
    ],
    evidence: [
      "WAIT durations, movement speeds, collision events, and actor positions at the crossing.",
      "Earlier and revised trial timelines, turns, and final heading."
    ],
    adjustments: [
      "Patrol speed, route, starting phase, and gate pause duration.",
      "Robot speed, obstacles, available hints, and timing difficulty."
    ]
  },
  {
    week: 4,
    title: "Delivery finals",
    setting: "Cargo terminal \xB7 carry the load, then take on the full delivery circuit.",
    sessions: [
      {
        challengeId: "cargo-delivery",
        product: "A heavy-cargo delivery program with a tested pickup, drop-off, and parking route.",
        starterCommands: [
          {
            id: "approach",
            type: "move-distance",
            value: "4",
            moveMath: { given: 25, operation: "multiply" }
          },
          { id: "pickup", type: "pick-up", value: "", packageId: "parcel-a" },
          {
            id: "north",
            type: "move-distance",
            value: "2",
            moveMath: { given: 25, operation: "multiply" }
          },
          { id: "turn", type: "turn-degrees", value: "90" },
          {
            id: "east",
            type: "move-distance",
            value: "6",
            moveMath: { given: 25, operation: "multiply" }
          },
          { id: "drop", type: "drop-off", value: "", packageId: "parcel-a" }
        ]
      },
      {
        challengeId: "championship",
        product: "A final autonomous program delivering both parcels and returning to the start dock.",
        starterCommands: [
          { id: "approach", type: "move-distance", value: "100" },
          { id: "pickup", type: "pick-up", value: "", packageId: "parcel-a" },
          { id: "north", type: "move-distance", value: "100" },
          { id: "turn", type: "turn-degrees", value: "90" },
          { id: "east", type: "move-distance", value: "100" },
          { id: "drop", type: "drop-off", value: "", packageId: "parcel-a" }
        ]
      }
    ],
    questions: [
      "How does carrying cargo change travel time? Which evidence supports your prediction?",
      "Why does your route deliver each parcel to the correct zone without hitting the rack?",
      "What tradeoff did you make between distance, turns, battery use, and reliability?",
      "Which test led to your most useful revision? How would your program adapt to a relocated delivery zone?"
    ],
    evidence: [
      "Pickup/drop-off events, carried load, travel time, battery use, and collisions.",
      "Final code, earlier revisions, both deliveries, return position, and repeat trials."
    ],
    adjustments: [
      "Cargo weight effects, pickup locations, delivery zones, and robot capacity.",
      "Battery budget, course geometry, difficulty, and all available model settings."
    ]
  }
];

// src/app/projects/robot-delivery/robot-delivery.config.ts
var movement = ["move-distance", "move-rotations", "wait"];
var navigation = [...movement, "turn-degrees", "turn-fraction"];
var delivery = [...navigation, "pick-up", "drop-off"];
var all = [...delivery, "repeat"];
var moveProblems = {
  "patrol-crossing": { "move-distance": { operation: "multiply", given: 40 }, "move-rotations": { operation: "add", given: 2 } },
  "moving-gates": { "move-distance": { operation: "multiply", given: 40 }, "move-rotations": { operation: "divide", given: 40 } },
  "calibration-garage": {
    "move-distance": { operation: "multiply", given: 24 },
    "move-rotations": { operation: "multiply", given: 0.5 }
  },
  "precision-parking": {
    "move-distance": { operation: "multiply", given: 24 },
    "move-rotations": { operation: "add", given: 2 }
  },
  "turn-training": {
    "move-distance": { operation: "subtract", given: 150 },
    "move-rotations": { operation: "subtract", given: 8 }
  },
  "coordinate-courier": {
    "move-distance": { operation: "multiply", given: 25 },
    "move-rotations": { operation: "multiply", given: 1.25 }
  },
  "warehouse-pattern": {
    "move-distance": { operation: "divide", given: 200 },
    "move-rotations": { operation: "divide", given: 25 }
  },
  "battery-emergency": {
    "move-distance": { operation: "add", given: 50 },
    "move-rotations": { operation: "add", given: 1 }
  },
  "cargo-delivery": {
    "move-distance": { operation: "multiply", given: 25 },
    "move-rotations": { operation: "multiply", given: 1 }
  }
};
var floor = (id, name) => ({
  id,
  name,
  visualTheme: "tabletop",
  widthCm: 400,
  heightCm: 300,
  gridSizeCm: 25,
  startPose: { xCm: 50, yCm: 50, headingDeg: 0 },
  targets: [{ xCm: 50, yCm: 170, headingDeg: 0, label: "120 cm" }],
  toleranceCm: 3,
  obstacles: [],
  packages: [],
  deliveryZones: [],
  checkpoints: [],
  battery: { move: 0.05, turn: 0.01, wait: 0.02, pickup: 2, dropoff: 1, collision: 8 },
  stopOnCollision: true
});
var courses = [
  __spreadProps(__spreadValues({}, floor("calibration", "Calibration lane")), {
    targets: [24, 12, 6, 18].map((distance) => ({
      xCm: 50,
      yCm: 50 + distance,
      headingDeg: 0,
      label: `${distance} cm`
    }))
  }),
  __spreadProps(__spreadValues({}, floor("parking", "Precision parking bay")), {
    targets: [120, 48, 72, 90, 126].map((distance) => ({
      xCm: 50,
      yCm: 50 + distance,
      headingDeg: 0,
      label: `${distance} cm`
    }))
  }),
  __spreadProps(__spreadValues({}, floor("turns", "Turn training")), {
    targets: [{ xCm: 150, yCm: 150, headingDeg: 90, label: "L route \xB7 face east" }],
    headingToleranceDeg: 2,
    obstacles: [
      { id: "barrier", label: "Keep clear", xCm: 85, yCm: 50, widthCm: 30, heightCm: 70 }
    ]
  }),
  __spreadProps(__spreadValues({}, floor("coordinates", "Coordinate courier")), {
    targets: [{ xCm: 150, yCm: 50, headingDeg: 180, label: "Return dock (6, 2)" }],
    packages: [{ id: "parcel-a", label: "A", xCm: 50, yCm: 125, deliveryZoneId: "zone-a" }],
    deliveryZones: [{ id: "zone-a", label: "A", xCm: 135, yCm: 110, widthCm: 30, heightCm: 30 }]
  }),
  __spreadProps(__spreadValues({}, floor("variables", "Variable upgrade")), {
    targets: [
      { xCm: 150, yCm: 150, headingDeg: 90, label: "100 cm sides" },
      { xCm: 200, yCm: 200, headingDeg: 90, label: "150 cm sides" }
    ]
  }),
  __spreadProps(__spreadValues({}, floor("pattern", "Warehouse square")), {
    startPose: { xCm: 75, yCm: 75, headingDeg: 0 },
    targets: [{ xCm: 75, yCm: 75, headingDeg: 0, label: "Return to start" }],
    checkpoints: [
      { id: "north", xCm: 75, yCm: 175, radiusCm: 5 },
      { id: "east", xCm: 175, yCm: 175, radiusCm: 5 },
      { id: "south", xCm: 175, yCm: 75, radiusCm: 5 }
    ]
  }),
  __spreadProps(__spreadValues({}, floor("battery", "Battery emergency")), {
    targets: [{ xCm: 250, yCm: 200, headingDeg: 90, label: "Charging dock" }],
    obstacles: [
      { id: "shelf", label: "Storage rack", xCm: 100, yCm: 80, widthCm: 100, heightCm: 80 }
    ]
  }),
  __spreadProps(__spreadValues({}, floor("cargo", "Cargo delivery")), {
    targets: [{ xCm: 250, yCm: 200, headingDeg: 90, label: "Delivery dock" }],
    packages: [{ id: "parcel-a", label: "A \xB7 heavy", xCm: 50, yCm: 150, deliveryZoneId: "zone-a" }],
    deliveryZones: [{ id: "zone-a", label: "A", xCm: 235, yCm: 185, widthCm: 30, heightCm: 30 }]
  }),
  __spreadProps(__spreadValues({}, floor("patrol", "Patrol crossing")), {
    heightCm: 400,
    gridSizeCm: 40,
    startPose: { xCm: 60, yCm: 40, headingDeg: 0 },
    targets: [{ xCm: 60, yCm: 320, headingDeg: 0, label: "Cross the patrol lane" }],
    actors: [{
      id: "patrol-1",
      label: "Scout patrol",
      kind: "robot",
      radiusCm: 12,
      path: [{ xCm: 20, yCm: 180 }, { xCm: 220, yCm: 180 }],
      speedCmPerSecond: 40,
      patrol: "ping-pong",
      phaseSeconds: 2
    }]
  }),
  __spreadProps(__spreadValues({}, floor("gates", "Patrol and sliding gate")), {
    heightCm: 400,
    gridSizeCm: 40,
    startPose: { xCm: 60, yCm: 40, headingDeg: 0 },
    targets: [{ xCm: 300, yCm: 320, headingDeg: 90, label: "Beyond the sliding gate" }],
    headingToleranceDeg: 2,
    actors: [
      {
        id: "patrol-1",
        label: "Scout patrol",
        kind: "robot",
        radiusCm: 12,
        path: [{ xCm: 20, yCm: 180 }, { xCm: 220, yCm: 180 }],
        speedCmPerSecond: 40,
        patrol: "ping-pong",
        phaseSeconds: 2
      },
      {
        id: "gate-1",
        label: "Sliding gate",
        kind: "barrier",
        widthCm: 36,
        heightCm: 32,
        path: [{ xCm: 180, yCm: 220 }, { xCm: 180, yCm: 360 }],
        speedCmPerSecond: 20,
        patrol: "ping-pong",
        pauseSeconds: 1
      }
    ]
  }),
  __spreadProps(__spreadValues({}, floor("championship", "Championship arena")), {
    targets: [{ xCm: 50, yCm: 50, headingDeg: 180, label: "Return to the start dock" }],
    packages: [
      { id: "parcel-a", label: "A", xCm: 50, yCm: 150, deliveryZoneId: "zone-a" },
      { id: "parcel-b", label: "B", xCm: 250, yCm: 250, deliveryZoneId: "zone-b" }
    ],
    deliveryZones: [
      { id: "zone-a", label: "A", xCm: 135, yCm: 235, widthCm: 30, heightCm: 30 },
      { id: "zone-b", label: "B", xCm: 235, yCm: 35, widthCm: 30, heightCm: 30 }
    ],
    obstacles: [
      { id: "rack", label: "Storage rack", xCm: 105, yCm: 90, widthCm: 85, heightCm: 110 }
    ]
  })
];
var discovery = {
  "calibration-garage": {
    starterCommands: [{ id: "guess-rotations", type: "move-rotations", value: "2" }],
    focusCommandId: "guess-rotations",
    instructions: "The Move block multiplies the given half rotation by your number. Guess a number to reach the target, or test the starter guess first.",
    reasoningPrompt: "Did the robot stop short or go too far? Compare the rotations you entered with the distance it travelled. What could one rotation tell you?",
    mathTool: "rotation-distance"
  },
  "precision-parking": {
    starterCommands: [{ id: "guess-rotations", type: "move-rotations", value: "3" }],
    focusCommandId: "guess-rotations",
    instructions: "The Move block adds the given 2 rotations to your number. Choose your number to park on the target, or test the starter guess first.",
    reasoningPrompt: "Where did the robot stop compared with the target? Use your trial distance and rotation count to find the travel per rotation. How could that help your next guess?",
    mathTool: "distance-rotations"
  },
  "turn-training": {
    starterCommands: [
      { id: "approach", type: "move-distance", value: "100" },
      { id: "guess-turn", type: "turn-degrees", value: "45", direction: "right" },
      { id: "finish", type: "move-distance", value: "100" }
    ],
    focusCommandId: "guess-turn",
    instructions: "The movement blocks are ready. Guess the turn angle in the highlighted block, then watch the direction the robot takes.",
    reasoningPrompt: "Was the turn too small or too large? Sketch the direction before and after the turn. What fraction of a full turn connects them?",
    mathTool: "fraction-turn"
  },
  "coordinate-courier": {
    starterCommands: [
      { id: "approach", type: "move-distance", value: "75" },
      { id: "collect", type: "pick-up", value: "", packageId: "parcel-a" },
      { id: "turn-east", type: "turn-degrees", value: "90", direction: "right" },
      { id: "guess-crossing", type: "move-distance", value: "50" },
      { id: "deliver", type: "drop-off", value: "", packageId: "parcel-a" },
      { id: "turn-south", type: "turn-degrees", value: "90", direction: "right" },
      { id: "park", type: "move-distance", value: "75" }
    ],
    focusCommandId: "guess-crossing",
    instructions: "The Move block multiplies the given 25 cm grid size by your number. Guess how many spaces cross to delivery zone A, then run the delivery code.",
    reasoningPrompt: "Did the robot reach the delivery zone before dropping the package? Count the horizontal grid spaces between pickup and delivery. How do spaces become centimeters?",
    mathTool: "grid-distance"
  }
};
var challenge = (id, title, week, courseId, mission, commands, requiredMath, hint) => ({
  id,
  title,
  week,
  courseId,
  mission,
  allowedCommands: commands,
  moveMath: moveProblems[id],
  requiredMath,
  skills: requiredMath,
  hint,
  discovery: discovery[id]
});
var robotDeliveryConfig = {
  schemaVersion: "1.0",
  template: { id: "programming-automation", version: "1.0" },
  projectId: "robot-delivery-code-lab",
  projectVersion: "1.0.0",
  title: "Robot Delivery Code Lab",
  subtitle: "Programming & Automation Challenge",
  initialChallengeId: "precision-parking",
  championshipChallengeId: "championship",
  previewWeeks: robotDeliveryWeeks,
  robot: {
    id: "courier-01",
    name: "Courier 01",
    wheelDiameterCm: 8,
    distancePerRotationCm: 24,
    loadedDistancePerRotationCm: 24,
    moveSpeed: 20,
    loadedSpeed: 17,
    turnRate: 45,
    radiusCm: 8,
    cargoLimit: 1,
    batteryCapacity: 100
  },
  courses,
  scoring: { delivery: 35, navigation: 20, efficiency: 20, reliability: 15, prediction: 10 },
  challenges: [
    challenge(
      "calibration-garage",
      "Calibration Garage",
      1,
      "calibration",
      "Measure how far one whole, half and quarter rotation actually carries your robot.",
      movement,
      ["circumference", "rotation-distance"],
      "Calculate with \u03C0 \u2248 3.14, then compare that theoretical circumference with measured travel. Measurements may differ."
    ),
    challenge(
      "precision-parking",
      "Precision Parking",
      1,
      "parking",
      "What number parks your robot on the target?",
      movement,
      ["circumference", "distance-rotations"],
      "Find the distance from the start to your target. Divide it by the measured travel per wheel rotation."
    ),
    challenge(
      "turn-training",
      "Turn Training",
      1,
      "turns",
      "Follow an L-shaped route around the barrier and finish facing east.",
      navigation,
      ["fraction-turn", "turn-time"],
      "North is 0\xB0, east is 90\xB0. Convert a fraction of 360\xB0 into a turn, then calculate how long the turn takes."
    ),
    challenge(
      "coordinate-courier",
      "Coordinate Courier",
      1,
      "coordinates",
      "Collect package A at (2, 5), deliver it to (6, 5), then park at (6, 2). Each grid square is 25 cm.",
      delivery,
      ["grid-distance"],
      "Use coordinate changes along one axis at a time. PICK UP and DROP OFF happen only when your code says so."
    ),
    __spreadProps(__spreadValues({}, challenge(
      "variable-upgrade",
      "Variable Upgrade",
      2,
      "variables",
      "Reach the far corner using a named SIDE variable. Change the target size, then update the variable.",
      navigation,
      ["grid-distance"],
      "A variable is a named measurement. Define SIDE once, then use SIDE in each MOVE block."
    )), {
      requiresVariable: true
    }),
    __spreadProps(__spreadValues({}, challenge(
      "warehouse-pattern",
      "Warehouse Pattern",
      2,
      "pattern",
      "Visit every corner of the 100 cm square and return to the start using a repeat block.",
      all,
      ["fraction-turn"],
      "Look for a MOVE and TURN pattern. The robot must visit all three checkpoints before returning."
    )), {
      requiresLoop: true,
      minimumDistance: 395,
      maximumCommands: 6
    }),
    __spreadProps(__spreadValues({}, challenge(
      "battery-emergency",
      "Battery Emergency",
      2,
      "battery",
      "Reach the charging dock without hitting the rack or using more than 24 battery units.",
      all,
      ["movement-time"],
      "Compare route length and turns. Movement uses 0.05 units/cm; turns use 0.01 units/degree."
    )), {
      batteryCapacity: 24
    }),
    challenge(
      "cargo-delivery",
      "Cargo Delivery",
      2,
      "cargo",
      "Pick up the heavy package, deliver it to zone A, and compare travel time with an empty robot.",
      all,
      ["movement-time"],
      "The loaded robot moves at 17 cm/s instead of 20 cm/s. Update your predicted time."
    ),
    challenge(
      "patrol-crossing",
      "Patrol Crossing",
      3,
      "patrol",
      "Cross the moving scout\u2019s route and reach the goal. The scout travels at 40 cm/s. Every run starts its patrol at the same position.",
      navigation,
      ["grid-distance", "movement-time"],
      "Watch the dashed patrol route. Use WAIT before moving to change when you cross it. Each grid square is 40 cm."
    ),
    challenge(
      "moving-gates",
      "Moving Gates",
      3,
      "gates",
      "Reach the far goal while avoiding a patrol robot and a sliding gate. The gate moves at 20 cm/s and pauses for 1 second at each end.",
      navigation,
      ["grid-distance", "movement-time", "fraction-turn"],
      "Plan the northbound crossing first, then the eastbound crossing. WAIT blocks can change the timing of each part of your route."
    ),
    __spreadProps(__spreadValues({}, challenge(
      "championship",
      "Robot Command Championship",
      3,
      "championship",
      "Deliver both packages to their matching zones and return to the start. Test and revise your autonomous program.",
      all,
      [
        "circumference",
        "distance-rotations",
        "fraction-turn",
        "turn-time",
        "grid-distance",
        "movement-time"
      ],
      "Plan around the rack. Package A goes to (6, 10); B goes to (10, 2). You can carry one package at a time."
    )), {
      requiresVariable: true,
      requiresLoop: true
    })
  ]
};

export {
  robotDeliveryConfig
};
//# debugId=be750d58-7508-5a6e-8f34-3f168d34786a
//# sourceMappingURL=chunk-HDUYTC5O.js.map
