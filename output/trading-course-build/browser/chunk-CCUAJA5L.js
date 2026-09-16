import {
  solsticeGatesChecks,
  solsticeGatesStarter
} from "./chunk-G4P4QDGV.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/projects/calendar-monument/calendar-monument.solar-calendar.ts
var gate = (id, x, z, rotation = 0) => {
  const angle = rotation * Math.PI / 180;
  return [
    ...[-1, 1].map((side) => ({
      id: `${id}-post-${side < 0 ? "left" : "right"}`,
      assemblyId: id,
      label: `${id.replaceAll("-", " ")} \xB7 ${side < 0 ? "left" : "right"} pillar`,
      x: x + side * 0.36 * Math.cos(angle),
      y: 0,
      z: z - side * 0.36 * Math.sin(angle),
      width: 0.2,
      height: 1,
      depth: 0.3,
      rotation
    })),
    {
      id: `${id}-lintel`,
      assemblyId: id,
      label: `${id.replaceAll("-", " ")} \xB7 lintel`,
      x,
      y: 1,
      z,
      width: 0.96,
      height: 0.08,
      depth: 0.5,
      rotation
    }
  ];
};
var jeweledGate = (id, x, z, color) => gate(id, x, z).map(
  (block2, i) => i === 2 ? __spreadProps(__spreadValues({}, block2), {
    aperture: { axis: "y", diameter: color === "blue" ? 0.18 : 0.32, insert: "jewel", color }
  }) : block2
);
var solarCalendarStonework = [
  ...jeweledGate("amber-gate", -1.3, 0.6, "amber"),
  ...jeweledGate("blue-gate", 0, 1.3, "blue"),
  ...jeweledGate("ruby-gate", 1.3, 0.6, "red"),
  ...gate("west-gate", -1.9, -0.45, 90),
  ...gate("northwest-gate", -1.25, -1.5, 135),
  ...gate("north-gate", 0, -1.95),
  ...gate("northeast-gate", 1.25, -1.5, 225),
  ...gate("east-gate", 1.9, -0.45, 90)
];
var solarCalendarStarter = { blocks: solarCalendarStonework, targets: [] };
var solarCalendarDesign = {
  blocks: [
    ...solarCalendarStonework,
    {
      id: "sunkeeper-base",
      x: 0,
      y: 0,
      z: -0.5,
      width: 0.9,
      height: 0.12,
      depth: 0.9,
      rotation: 0
    },
    {
      id: "sunkeeper-step",
      x: 0,
      y: 0.12,
      z: -0.5,
      width: 0.68,
      height: 0.12,
      depth: 0.68,
      rotation: 0
    },
    ...[
      { id: "emerald", x: -2.25, z: 1.55, rotation: 45, color: "green", insert: "jewel" },
      { id: "violet", x: 2.25, z: 1.55, rotation: 315, color: "violet", insert: "jewel" },
      { id: "west-eye", x: -2.25, z: -1.55, rotation: 135, color: "clear", insert: "open" },
      { id: "east-eye", x: 2.25, z: -1.55, rotation: 225, color: "clear", insert: "open" }
    ].flatMap((stone) => [
      {
        id: stone.id + "-foot",
        x: stone.x,
        y: 0,
        z: stone.z,
        width: 0.72,
        height: 0.12,
        depth: 0.52,
        rotation: stone.rotation
      },
      {
        id: stone.id + "-window",
        x: stone.x,
        y: 0.12,
        z: stone.z,
        width: 0.55,
        height: 1.4,
        depth: 0.24,
        rotation: stone.rotation,
        aperture: {
          axis: "z",
          diameter: 0.34,
          insert: stone.insert,
          color: stone.color
        }
      }
    ])
  ],
  displayObject: {
    model: "crystal",
    material: "bronze",
    x: 0,
    y: 0.24,
    z: -0.5,
    width: 0.54,
    height: 1.45,
    rotation: 45
  },
  targets: [
    { id: "june", label: "June \xB7 amber light", x: -1.3, z: 0.315 },
    { id: "equinox", label: "Equinoxes \xB7 blue light", x: 0, z: 0.463 },
    { id: "december", label: "December \xB7 ruby light", x: 1.3, z: -1.371 }
  ]
};

// src/app/projects/calendar-monument/calendar-monument.design-samples.ts
var block = (id, x, y, z, width, height, depth, rotation = 0) => ({ id, x, y, z, width, height, depth, rotation });
var calendarMonumentDesignSamples = [
  {
    id: "solstice-gates",
    title: "Align the solstice window",
    description: "Three stones, two sideways holes and a marked central pillar. The summer window is out of alignment. At Colorado Springs in 2026, choose June and Morning light; move that window until sunlight reaches the summer carving. The winter window shows a working alignment.",
    design: solsticeGatesStarter,
    checks: solsticeGatesChecks
  },
  {
    id: "solar-calendar-circle",
    title: "Solar calendar circle",
    description: "Start your final project with a Stonehenge-inspired circle of eight stone gates. Amber, blue and ruby jewels fill holes in three lintels. Find the moving light patches and place your own seasonal markers.",
    design: solarCalendarStarter
  },
  {
    id: "sun-gate",
    title: "Sun gate",
    description: "Two pillars and a lintel frame a bright opening. Move the Sun to stretch the gate\u2019s shadow and watch the gap travel across the ground.",
    design: {
      blocks: [
        block("gate-west", -0.55, 0, 0, 0.22, 1.2, 0.28),
        block("gate-east", 0.55, 0, 0, 0.22, 1.2, 0.28),
        block("gate-lintel", 0, 1.2, 0, 1.32, 0.24, 0.28)
      ],
      targets: [{ id: "gate-marker", label: "Gate opening", x: 0, z: -0.65 }]
    }
  },
  {
    id: "round-portal",
    title: "Round portal",
    description: "A wide wall with an 80 cm cylindrical opening casts a dark frame around a patch of sunlight. Compare the patch at low and high Sun angles.",
    design: {
      blocks: [
        __spreadProps(__spreadValues({}, block("portal", 0, 0, 0, 1.4, 1.2, 0.12)), {
          aperture: { axis: "z", diameter: 0.8, insert: "open", color: "clear" }
        })
      ],
      targets: [{ id: "portal-marker", label: "Light through the hole", x: 0, z: -0.5 }]
    }
  },
  {
    id: "color-windows",
    title: "Three color windows",
    description: "Ruby, sapphire and amber windows paint moving patches on the ground. A pale crystal catches the middle beam. Try solar noon, then Inspect sculpture.",
    design: {
      blocks: ["red", "blue", "amber"].flatMap((color, i) => {
        const x = (i - 1) * 0.75;
        return [
          block(`${color}-left`, x - 0.25, 0, 0, 0.1, 0.3, 0.14),
          block(`${color}-right`, x + 0.25, 0, 0, 0.1, 0.3, 0.14),
          __spreadProps(__spreadValues({}, block(`${color}-window`, x, 0.3, 0, 0.6, 1, 0.08)), {
            aperture: {
              axis: "z",
              diameter: 0.4,
              insert: i === 1 ? "jewel" : "glass",
              color
            }
          })
        ];
      }),
      targets: [
        { id: "ruby-marker", label: "Ruby patch", x: -0.75, z: -0.65 },
        { id: "amber-marker", label: "Amber patch", x: 0.75, z: -0.65 }
      ],
      displayObject: {
        model: "crystal",
        material: "porcelain",
        x: 0,
        y: 0,
        z: -0.55,
        width: 0.28,
        height: 0.5,
        rotation: 0
      }
    }
  },
  {
    id: "pierced-pyramid",
    title: "Pierced pyramid",
    description: "Four terraces share a vertical tunnel. Can a high summer Sun send light all the way down? Use Plan view to inspect the hole and compare June with December.",
    design: {
      blocks: [1.6, 1.2, 0.8, 0.4].map((width, i) => __spreadProps(__spreadValues({}, block(`terrace-${i}`, 0, i * 0.2, 0, width, 0.2, width)), {
        aperture: { axis: "y", diameter: 0.3, insert: "open", color: "clear" }
      })),
      targets: [{ id: "pyramid-marker", label: "Inside the tunnel", x: 0, z: -0.1 }]
    }
  },
  {
    id: "shadow-crown",
    title: "Shadow crown",
    description: "Eight pillars surround a round sculpture. Their long and short shadows form spokes. Tiny holes in the taller pillars admit light only from some directions.",
    design: {
      blocks: Array.from({ length: 8 }, (_, i) => {
        const angle = i * Math.PI / 4;
        return __spreadValues(__spreadValues({}, block(
          `crown-${i}`,
          0.9 * Math.sin(angle),
          0,
          0.9 * Math.cos(angle),
          0.18,
          i % 2 ? 0.7 : 1.1,
          0.26,
          i * 45
        )), i % 2 ? {} : {
          aperture: {
            axis: "z",
            diameter: 0.12,
            insert: "open",
            color: "clear"
          }
        });
      }),
      targets: [{ id: "crown-marker", label: "Between the spokes", x: 0.35, z: -0.4 }],
      displayObject: {
        model: "sphere",
        material: "limestone",
        x: 0,
        y: 0,
        z: 0,
        width: 0.5,
        height: 0.5,
        rotation: 0
      }
    }
  },
  {
    id: "twin-tunnels",
    title: "Twin tunnels",
    description: "These blocks have equal 32 cm holes but different depths: 10 cm and 65 cm. Find a Sun angle that lights one hole while the other stays dark.",
    design: {
      blocks: [-0.48, 0.48].map((x, i) => __spreadProps(__spreadValues({}, block(`tunnel-${i}`, x, 0, 0, 0.6, 1.1, i ? 0.65 : 0.1)), {
        aperture: { axis: "z", diameter: 0.32, insert: "open", color: "clear" }
      })),
      targets: [
        { id: "thin-marker", label: "Thin wall", x: -0.48, z: -0.5 },
        { id: "deep-marker", label: "Deep tunnel", x: 0.48, z: -0.5 }
      ]
    }
  }
];

// src/app/projects/calendar-monument/calendar-monument.walkthrough.ts
var view = (season, extra = {}) => __spreadValues({
  latitude: 38.83,
  longitude: -104.82,
  year: 2026,
  season,
  rule: "noon",
  camera: "top"
}, extra);
var mark = { label: "Place a mark at the shadow tip", command: "markDial" };
var length = { label: "Distance from the post to its shadow tip", unit: "cm" };
var record = { label: "Save this observation", command: "capture" };
var summer = view("june", {
  rule: "morning",
  camera: "target",
  targetId: "summer-carving",
  blockId: "summer-window"
});
var winter = view("dec", { rule: "morning", camera: "target", targetId: "winter-carving" });
var sundialWalkthrough = [
  {
    id: "post",
    title: "Place your vertical post",
    instruction: "Use a level base and a 60 cm upright post. The model is set to Colorado Springs. Keep the post and location fixed for the whole investigation.",
    lookFor: "Find the post, its shadow, and the glowing ring at the shadow tip. North is marked on the base.",
    setup: view("june", { rule: "clock", minutes: 540, camera: "angle" }),
    actions: [{ label: "Place the 60 cm post", command: "post", value: 60 }]
  },
  {
    id: "morning",
    title: "Mark the morning shadow",
    instruction: "It is 9:00 a.m. Measure from the base of the post to the glowing shadow tip. Read the live measurement below, enter the distance, then place a mark.",
    lookFor: "The shadow points away from the Sun. Your mark will stay in place when time changes.",
    setup: view("june", { rule: "clock", minutes: 540 }),
    actions: [mark],
    response: length
  },
  {
    id: "noon",
    title: "Mark the noon shadow",
    instruction: "The clock is now at solar noon, when the Sun is highest today. Measure the shadow again and place a second mark.",
    lookFor: "Compare this shadow with the morning mark. Has it become longer or shorter?",
    setup: view("june"),
    actions: [mark],
    response: length
  },
  {
    id: "afternoon",
    title: "Mark the afternoon shadow",
    instruction: "It is now 3:00 p.m. Measure the shadow and place your third mark. Save this observation to keep the sundial and all three marks in your notebook.",
    lookFor: "The shadow has changed direction as well as length. Earth\u2019s daily turn produces this pattern.",
    setup: view("june", { rule: "clock", minutes: 900 }),
    actions: [mark, record],
    response: length
  }
];
var seasonalWalkthrough = [
  {
    id: "summer-noon",
    title: "Measure the summer noon shadow",
    instruction: "Keep the same post and marks. At the June solstice, measure the shadow at solar noon and record its length.",
    lookFor: "Read the Sun\u2019s height as well as the shadow length. A high Sun makes a short shadow.",
    setup: view("june"),
    actions: [record],
    response: length
  },
  {
    id: "winter-noon",
    title: "Measure the winter noon shadow",
    instruction: "Only the date has changed: this is the December solstice at solar noon. Measure the same post\u2019s shadow.",
    lookFor: "The post did not move. Find the old summer mark inside the longer winter shadow.",
    setup: view("dec"),
    actions: [record],
    response: length
  },
  {
    id: "compare",
    title: "Compare your two measurements",
    instruction: "Use your summer and winter measurements in the notes below. Choose the date with the longer noon shadow at Colorado Springs.",
    lookFor: "Both measurements used the same post, place, and solar noon. Date was the only change.",
    setup: view("dec"),
    response: {
      label: "Which noon shadow was longer?",
      options: ["December solstice", "June solstice", "They were the same"]
    }
  }
];
var tiltWalkthrough = [
  {
    id: "june-earth",
    title: "Find the tilted axis in June",
    instruction: "Find Earth\u2019s axis in the diagram. In June the northern half tilts toward the Sun. Compare the Sun\u2019s height with your short summer shadow.",
    lookFor: "The lit half faces the Sun. The axis is tilted about 23.4\xB0.",
    setup: view("june", { earth: true, camera: "angle" })
  },
  {
    id: "december-earth",
    title: "Follow Earth to December",
    instruction: "Earth has moved to the opposite side of its orbit. Its axis still points the same way; now the northern half tilts away from the Sun.",
    lookFor: "The lower Sun matches the longer winter shadow you measured. Earth\u2019s daily turn still makes day and night.",
    setup: view("dec", { earth: true, camera: "angle" }),
    response: {
      label: "What explains the longer winter noon shadow here?",
      options: [
        "The Sun is lower because this hemisphere tilts away from it.",
        "The post gets taller in winter.",
        "The Sun goes around Earth once a year."
      ]
    }
  }
];
var calendarWalkthrough = [
  ...[
    [
      "march",
      "March equinox",
      "This is the first date mark. Place it exactly at the noon shadow tip."
    ],
    [
      "june",
      "June solstice",
      "Find the shortest noon shadow of these four dates. Place its summer mark."
    ],
    [
      "sept",
      "September equinox",
      "Look near the March mark. The two equinox shadow tips are close together."
    ],
    [
      "dec",
      "December solstice",
      "Find the longest noon shadow of these four dates. Place its winter mark."
    ]
  ].map(([season, label, instruction]) => ({
    id: season,
    title: "Place the " + label + " mark",
    instruction,
    lookFor: "The post stays fixed and every date uses solar noon. Place a small stone at the glowing ring; the simulator records its measured position.",
    setup: view(season),
    actions: [mark],
    requiredTargetId: "sundial-" + season
  })),
  {
    id: "read-calendar",
    title: "Read your four date marks",
    instruction: "Compare the spacing of the four date marks, then save your finished sundial calendar. A mark can match nearby days too, so it does not identify one exact day on its own.",
    lookFor: "The solstices mark the two extremes. The equinox marks sit close together between them.",
    setup: view("sept"),
    actions: [record],
    response: {
      label: "Which two date marks are closest?",
      options: ["March and September", "June and December", "March and December"]
    }
  }
];
var monumentWalkthrough = [
  {
    id: "starter",
    title: "Set out three stones",
    instruction: "Load the starting challenge: two outer stones with horizontal holes, and one fixed pillar with summer and winter rings. Your sundial stays saved. Loading the challenge keeps a backup of your current monument.",
    lookFor: "Each empty hole points toward the central pillar. Sunlight must pass through the hole before it can reach a ring.",
    setup: __spreadProps(__spreadValues({}, summer), { camera: "angle" }),
    sampleId: "solstice-gates"
  },
  {
    id: "summer-alignment",
    title: "Move the summer window into line",
    instruction: "This is June, 30 minutes after sunrise. The summer window starts 40 cm too far south. Move only that window north in 5 cm steps. Stop when the light patch covers the summer ring.",
    lookFor: "Watch the live reading for the Summer carving. The central pillar, ring, and winter window stay fixed.",
    setup: summer,
    actions: [
      { label: "Move window north \xB7 5 cm", command: "nudge", value: -0.05 },
      { label: "Move window south \xB7 5 cm", command: "nudge", value: 0.05 },
      { label: "View all three stones", command: "shadowView" },
      { label: "Inspect the rings", command: "targetView" },
      record
    ],
    response: {
      label: "What reaches the summer ring now?",
      options: ["Sunlight through the horizontal hole", "Shadow \u2014 I need to adjust the window"]
    }
  },
  {
    id: "winter-alignment",
    title: "Check the winter window",
    instruction: "The date has changed to December, again 30 minutes after sunrise. Keep every stone where it is. Check which ring receives sunlight now.",
    lookFor: "The winter window is already aligned. Its beam should reach the winter ring from a different direction.",
    setup: winter,
    actions: [record],
    response: {
      label: "Which ring receives the winter beam?",
      options: ["Winter carving", "Summer carving", "Neither \u2014 the design needs adjustment"]
    }
  },
  {
    id: "evidence",
    title: "Save your solar calendar evidence",
    requiredEvidenceCount: 4,
    instruction: "Run the four-date check to record both solstices and both equinoxes. Then explain how a horizontal hole and a fixed mark let your monument show the time of year.",
    lookFor: "The solstice checks measure light at the pillar rings. The equinox checks use sunlight at the open center as a baseline. Review the measured results in your notebook.",
    setup: __spreadProps(__spreadValues({}, summer), { camera: "angle" }),
    actions: [{ label: "Check & save all four dates", command: "review-save" }],
    response: {
      label: "Complete the explanation: My monument shows summer and winter because\u2026",
      saveAs: "exhibit"
    }
  }
];

// src/app/projects/calendar-monument/calendar-monument.learning.ts
var calendarMonumentLearning = {
  practiceDesign: {
    blocks: [
      { id: "practice-post", x: 0, y: 0, z: 0, width: 0.08, depth: 0.08, height: 0.6, rotation: 0 }
    ],
    targets: []
  },
  steps: [
    {
      id: "make-a-sundial",
      tasks: sundialWalkthrough,
      title: "Build a sundial",
      workspace: "practice",
      activity: "sundial-build",
      showGuides: false,
      introduction: "Can a shadow tell the time? Start with a vertical post on a level stone dial.",
      instructions: sundialWalkthrough.map((task) => task.instruction),
      question: {
        researchId: "daily-sun",
        prompt: "What pattern did you notice as your sundial\u2019s shadow moved through one day?"
      }
    },
    {
      id: "season-surprise",
      tasks: seasonalWalkthrough,
      title: "A seasonal surprise",
      workspace: "practice",
      activity: "sundial-seasons",
      showGuides: false,
      introduction: "Keep the same sundial and its original marks. Now change the season. Why do you think the shadow tip misses the old marks?",
      instructions: seasonalWalkthrough.map((task) => task.instruction),
      question: {
        researchId: "season-noticing",
        prompt: "The sundial did not move. Why do you think its shadow tip misses some old marks now? What did you observe?"
      }
    },
    {
      id: "explain-the-tilt",
      tasks: tiltWalkthrough,
      title: "Why the shadows change",
      workspace: "practice",
      activity: "sundial-tilt",
      introduction: "Connect your sundial observations to a turning, tilted Earth.",
      instructions: tiltWalkthrough.map((task) => task.instruction),
      explanation: "Earth\u2019s daily turn makes the Sun appear to cross the sky. Earth\u2019s axis is tilted about 23.4\xB0 and keeps pointing nearly the same way as Earth orbits the Sun. This changes the Sun\u2019s daily path and daylight duration at your site. A higher Sun gives a shorter shadow; a lower Sun gives a longer one. Northern and southern places have opposite seasons. Our simple dial uses a vertical post and fixed shadow-tip marks. More advanced sundials use a tilted pointer to keep their hour lines useful through the year. Clock time and solar time can also differ, so use solar noon for a fair seasonal comparison.",
      question: {
        researchId: "seasons",
        prompt: "Revise your explanation: how does Earth\u2019s tilt help explain the seasonal change in your sundial\u2019s shadows?"
      }
    },
    {
      id: "mark-the-year",
      tasks: calendarWalkthrough,
      title: "Mark the sundial\u2019s year",
      workspace: "practice",
      activity: "sundial-calendar",
      introduction: "First challenge: make your sundial mark the equinoxes and solstices.",
      instructions: calendarWalkthrough.map((task) => task.instruction),
      explanation: "At an equinox the Sun crosses the celestial equator. March and September have similar Sun paths, so their noon marks are close. Solstices mark the yearly extremes in the Sun\u2019s path. In the tropics, the highest noon Sun can occur on other dates. A shadow covering a mark is only part of the evidence: compare the tip and nearby dates too.",
      question: {
        researchId: "dial-calendar",
        prompt: "Which marks help your sundial show the time of year? Explain the equinox pair and why a solstice can be hard to identify to one exact day."
      }
    },
    {
      id: "sun-monument",
      tasks: monumentWalkthrough,
      title: "Build a solar calendar",
      workspace: "project",
      activity: "monument",
      introduction: "Start with one visible alignment: move a window until morning sunlight passes through its horizontal hole and lights a mark on the central pillar. Then compare summer and winter on the same three-stone monument.",
      instructions: monumentWalkthrough.map((task) => task.instruction),
      explanation: "This starting challenge uses empty horizontal holes and a fixed receiving pillar. Solstice marks are tested 30 minutes after sunrise at Colorado Springs; equinoxes use the open center as a baseline. Nearby dates can also match. After solving it, add your own openings, colored filters or equinox marks and calibrate them for a chosen place and time."
    }
  ]
};

// src/app/projects/calendar-monument/calendar-monument.quests.ts
var march = "2026-03-20";
var june = "2026-06-21";
var september = "2026-09-22";
var december = "2026-12-21";
var round = (value) => Math.round(value * 1e3) / 1e3;
var hourMarks = [
  {
    id: "rooster",
    label: "Rooster",
    symbol: "rooster",
    color: "amber",
    x: -1.649,
    z: 0.305,
    size: 0.34,
    radius: 0.06,
    minutes: 480,
    required: false
  },
  {
    id: "rabbit",
    label: "Rabbit",
    symbol: "rabbit",
    color: "amber",
    x: -1.057,
    z: 0.033,
    size: 0.32,
    radius: 0.07,
    minutes: 540
  },
  {
    id: "bee",
    label: "Bee",
    symbol: "bee",
    color: "gold",
    x: -0.694,
    z: -0.101,
    size: 0.26,
    radius: 0.06,
    minutes: 600,
    required: false
  },
  {
    id: "butterfly",
    label: "Butterfly",
    symbol: "butterfly",
    color: "emerald",
    x: -0.428,
    z: -0.172,
    size: 0.22,
    radius: 0.06,
    minutes: 660,
    required: false
  },
  {
    id: "sun",
    label: "Sun",
    symbol: "sun",
    color: "gold",
    x: 3e-3,
    z: -0.22,
    size: 0.18,
    radius: 0.07,
    rule: "noon"
  },
  {
    id: "turtle",
    label: "Turtle",
    symbol: "turtle",
    color: "emerald",
    x: 0.197,
    z: -0.21,
    size: 0.18,
    radius: 0.05,
    minutes: 840,
    required: false
  },
  {
    id: "fox",
    label: "Fox",
    symbol: "fox",
    color: "ruby",
    x: 0.417,
    z: -0.175,
    size: 0.2,
    radius: 0.07,
    minutes: 900
  },
  {
    id: "owl",
    label: "Owl",
    symbol: "owl",
    color: "amethyst",
    x: 0.681,
    z: -0.105,
    size: 0.24,
    radius: 0.06,
    minutes: 960,
    required: false
  }
];
var hourLine = (mark2) => {
  const distance = Math.hypot(mark2.x, mark2.z), inner = 0.09, outer = distance - mark2.size / 2 - 0.01;
  return {
    kind: "line",
    from: [round(mark2.x * inner / distance), round(mark2.z * inner / distance)],
    to: [round(mark2.x * outer / distance), round(mark2.z * outer / distance)],
    width: 0.012,
    color: mark2.color
  };
};
var animalClock = {
  id: "animal-clock",
  title: "The Animal Sun Clock",
  kind: "shadow-tip",
  goal: "Make the shadow tip touch the rabbit, the sun and the fox.",
  postHeight: 0.8,
  tolerance: 0.03,
  marks: hourMarks,
  carvings: [{ kind: "plate", x: 0, z: 0, radius: 2.4, color: "gold" }, ...hourMarks.map(hourLine)],
  controls: ["noon"],
  tools: ["post"],
  reveal: { style: "daylapse", title: "The Animal Sun Clock wakes!" }
};
var seasonMarks = [
  {
    id: "june-sunflower",
    label: "Sunflower",
    symbol: "sunflower",
    color: "gold",
    x: 3e-3,
    z: -0.22,
    size: 0.18,
    radius: 0.07,
    rule: "noon",
    date: june
  },
  {
    id: "equinox-leaf",
    label: "Leaf",
    symbol: "leaf",
    color: "emerald",
    x: 4e-3,
    z: -0.642,
    size: 0.26,
    radius: 0.07,
    rule: "noon",
    date: march
  },
  {
    id: "mystery-owl",
    label: "Mystery owl",
    symbol: "owl",
    color: "amethyst",
    x: 0,
    z: -1.1,
    size: 0.28,
    radius: 0.07
  },
  {
    id: "december-snowflake",
    label: "Snowflake",
    symbol: "snowflake",
    color: "sapphire",
    x: 7e-3,
    z: -1.522,
    size: 0.3,
    radius: 0.07,
    rule: "noon",
    date: december
  }
];
var seasonLine = {
  id: "season-line",
  title: "The Season Line",
  kind: "shadow-tip",
  goal: "Make the solar-noon shadow tip touch all four season symbols.",
  postHeight: 0.8,
  tolerance: 0.03,
  marks: seasonMarks,
  carvings: [
    { kind: "plate", x: 0, z: 0, radius: 2.2, color: "gold" },
    { kind: "line", from: [0, -0.1], to: [0, -1.72], width: 0.03, color: "gold" }
  ],
  controls: ["seasons", "days", "noon"],
  tools: ["post"],
  reveal: { style: "year", from: march, title: "The Season Line comes alive!" }
};
var keptGates = [
  { blockId: "receiving-pillar", x: -0.5, z: 0 },
  { blockId: "summer-window", aperture: true },
  { blockId: "winter-window", aperture: true }
];
var summerBeam = {
  id: "summer-beam",
  title: "Catch the Summer Beam",
  kind: "light",
  goal: "Light the gold gem 30 minutes after sunrise on June 21.",
  gems: [
    {
      id: "summer-sun-gem",
      label: "Summer sun gem",
      color: "gold",
      targetId: "summer-carving",
      light: "sunlight",
      date: june,
      rule: "morning",
      within: 20
    }
  ],
  keep: keptGates,
  carvings: [
    { kind: "line", from: [-0.35, -0.2], to: [2.33, -1.55], width: 0.04, color: "gold" },
    { kind: "rays", x: -0.5, z: 0, radius: 0.9, inner: 0.55, count: 16, color: "amber" }
  ],
  controls: ["days"],
  tools: ["build"],
  reveal: { style: "beam", title: "The summer beam strikes!" }
};
var winterWindow = {
  id: "winter-window",
  title: "Winter Light",
  kind: "edge",
  goal: "Light the sapphire on December 21, then find the first and last mornings it glows.",
  gems: [
    {
      id: "winter-sapphire",
      label: "winter sapphire",
      color: "sapphire",
      targetId: "winter-carving",
      light: "sunlight",
      date: december,
      rule: "morning",
      window: 30
    }
  ],
  keep: keptGates,
  carvings: [
    { kind: "line", from: [-0.35, 0.2], to: [1.37, 2.66], width: 0.04, color: "sapphire" },
    { kind: "rays", x: -0.5, z: 0, radius: 0.9, inner: 0.55, count: 16, color: "sapphire" }
  ],
  controls: ["days"],
  reveal: { style: "beam", title: "The winter window is found!" }
};
var rainbowPetals = {
  id: "rainbow-petals",
  title: "The Rainbow Petals",
  kind: "light",
  together: true,
  goal: "Light all three petals at the same moment on March 20.",
  gems: [
    {
      id: "ruby-petal",
      label: "Ruby petal",
      color: "ruby",
      x: -0.508,
      z: -0.646,
      light: "red light",
      date: march
    },
    {
      id: "sapphire-petal",
      label: "Sapphire petal",
      color: "sapphire",
      x: 0.242,
      z: -0.646,
      light: "blue light",
      date: march
    },
    {
      id: "amber-petal",
      label: "Amber petal",
      color: "amber",
      x: 0.992,
      z: -0.646,
      light: "amber light",
      date: march
    }
  ],
  carvings: [
    { kind: "ring", x: -0.508, z: -0.646, radius: 0.2, color: "ruby" },
    { kind: "ring", x: 0.242, z: -0.646, radius: 0.2, color: "sapphire" },
    { kind: "ring", x: 0.992, z: -0.646, radius: 0.2, color: "amber" },
    { kind: "line", from: [-0.9, -0.646], to: [1.4, -0.646], width: 0.02, color: "gold" }
  ],
  controls: ["noon"],
  reveal: { style: "bloom", title: "The Rainbow Petals bloom!" }
};
var winterGallery = {
  id: "winter-gallery",
  title: "The Mixed-Up Winter Gallery",
  kind: "light",
  together: true,
  goal: "Light each gem with its own color at December solar noon.",
  gems: [
    {
      id: "west-amber",
      label: "Amber gem",
      color: "amber",
      x: -0.743,
      z: -1.522,
      light: "amber light",
      date: december
    },
    {
      id: "middle-sapphire",
      label: "Sapphire gem",
      color: "sapphire",
      x: 7e-3,
      z: -1.522,
      light: "blue light",
      date: december
    },
    {
      id: "east-ruby",
      label: "Ruby gem",
      color: "ruby",
      x: 0.757,
      z: -1.522,
      light: "red light",
      date: december
    }
  ],
  carvings: [
    { kind: "ring", x: -0.743, z: -1.522, radius: 0.2, color: "amber" },
    { kind: "ring", x: 7e-3, z: -1.522, radius: 0.2, color: "sapphire" },
    { kind: "ring", x: 0.757, z: -1.522, radius: 0.2, color: "ruby" },
    { kind: "line", from: [-1.1, -1.522], to: [1.1, -1.522], width: 0.02, color: "gold" }
  ],
  controls: ["noon"],
  tools: ["build"],
  reveal: { style: "bloom", title: "The gallery glows!" }
};
var circleCarvings = [
  { kind: "ring", x: 0, z: 0, radius: 2.6, width: 0.04, color: "gold" },
  { kind: "rays", x: 0, z: 0, radius: 2.55, inner: 2.35, count: 24, color: "amber" }
];
var calendarStones = {
  id: "calendar-stones",
  title: "Carve the Calendar Stones",
  kind: "markers",
  goal: "Carve stones where the blue beam lands at March noon and the amber beam lands at June noon.",
  gems: [
    {
      id: "equinox-sapphire",
      label: "March sapphire stone",
      color: "sapphire",
      date: march,
      rule: "noon",
      light: "blue light"
    },
    {
      id: "june-topaz",
      label: "June topaz stone",
      color: "amber",
      date: june,
      rule: "noon",
      light: "amber light"
    }
  ],
  carvings: circleCarvings,
  controls: ["seasons", "noon"],
  tools: ["markers"],
  reveal: { style: "burst", title: "The calendar stones awaken!" }
};
var yearOfLight = {
  id: "year-of-light",
  title: "A Year of Light",
  kind: "markers",
  goal: "Light a stone on all four seasonal dates. Add a stone for the ruby beam at December noon.",
  gems: [
    {
      id: "equinox-sapphire",
      label: "March sapphire stone",
      color: "sapphire",
      date: march,
      rule: "noon",
      light: "blue light"
    },
    {
      id: "june-topaz",
      label: "June topaz stone",
      color: "amber",
      date: june,
      rule: "noon",
      light: "amber light"
    },
    {
      id: "september-sapphire",
      label: "September sapphire stone",
      color: "sapphire",
      date: september,
      rule: "noon",
      light: "blue light"
    },
    {
      id: "december-ruby",
      label: "December ruby stone",
      color: "ruby",
      date: december,
      rule: "noon",
      light: "red light"
    }
  ],
  carvings: circleCarvings,
  controls: ["seasons", "noon"],
  tools: ["markers"],
  reveal: { style: "year", from: march, title: "Your solar calendar works!" }
};
var calendarMonumentQuests = {
  animalClock,
  seasonLine,
  summerBeam,
  winterWindow,
  rainbowPetals,
  winterGallery,
  calendarStones,
  yearOfLight
};

// src/app/projects/calendar-monument/calendar-monument.weeks.ts
var site = { latitude: 38.83, longitude: -104.82, zone: "America/Denver" };
var settings = (localDate, observationRule = "noon") => __spreadProps(__spreadValues({}, site), {
  localDate,
  observationRule
});
var calendarMonumentWeeks = [
  {
    id: "daily-sundial",
    title: "Follow a moving shadow",
    buildType: "Daily sundial",
    starter: calendarMonumentLearning.practiceDesign,
    sessions: [
      {
        title: "Build a shadow clock",
        instruction: "Change the post height, play the Sun\u2019s day, then pause and mark the shadow tip.",
        activity: "sundial-build",
        settings: settings("2026-06-21"),
        quest: calendarMonumentQuests.animalClock
      },
      {
        title: "Calibrate the dial",
        instruction: "Use the same sundial. Mark 9 AM, solar noon and 3 PM, then change the season and compare the fixed marks.",
        activity: "sundial-build",
        settings: settings("2026-06-21", "morning"),
        quest: calendarMonumentQuests.seasonLine
      }
    ],
    products: ["A sundial with a measured post", "Fixed morning, noon and afternoon marks"],
    questions: [
      "Why does the shadow point away from the Sun?",
      "What changes when the post doubles in height?",
      "Why might the same clock time miss an old mark in another season?"
    ],
    evidence: [
      "Post height and fixed shadow-tip marks",
      "Saved date, time, Sun altitude and shadow measurements"
    ],
    controls: [
      "Post height; date and location",
      "Time, playback speed, camera and Earth rotation view"
    ]
  },
  {
    id: "solstice-windows",
    title: "Catch the solstice light",
    buildType: "Solstice windows",
    starter: solsticeGatesStarter,
    sessions: [
      {
        title: "Align the summer window",
        instruction: "At Colorado Springs, test June morning light. Move the summer window until light reaches the fixed summer carving on the pillar.",
        activity: "monument",
        settings: settings("2026-06-21", "morning"),
        quest: calendarMonumentQuests.summerBeam
      },
      {
        title: "Compare the two windows",
        instruction: "Keep the pillar fixed. Compare June and December morning light, then nearby dates. Use From center to watch the Sun cross the openings.",
        activity: "monument",
        settings: settings("2026-12-21", "morning"),
        quest: calendarMonumentQuests.winterWindow
      }
    ],
    products: ["A revised two-window alignment", "Saved summer and winter light tests"],
    questions: [
      "How does the sunrise direction change with the season?",
      "Why can a deeper opening block the same ray?",
      "Does an alignment identify one day or a range of days?"
    ],
    evidence: [
      "Window position, rotation and opening dimensions",
      "Light at the fixed pillar marks on each date"
    ],
    controls: [
      "Stone position, bore diameter and depth; ray guide",
      "Morning light, seasonal and nearby dates, site and observer camera"
    ]
  },
  {
    id: "colored-sculpture",
    title: "Sculpt with colored sunlight",
    buildType: "Colored-light sculpture",
    starter: calendarMonumentDesignSamples.find((s) => s.id === "color-windows").design,
    sessions: [
      {
        title: "Aim a colored window",
        instruction: "Edit a window\u2019s color or opening. Move the sculpture into the light and play the day to follow the moving patch.",
        activity: "monument",
        settings: settings("2026-03-20"),
        quest: calendarMonumentQuests.rainbowPetals
      },
      {
        title: "Compare colors and faces",
        instruction: "Keep one change at a time: compare clear, glass and jewel inserts, then follow the sculpture\u2019s faces through a winter day.",
        activity: "monument",
        settings: settings("2026-12-21"),
        quest: calendarMonumentQuests.winterGallery
      }
    ],
    products: [
      "A colored-window installation and sculpture",
      "A collection of light and color trials"
    ],
    questions: [
      "Which light does a colored filter transmit?",
      "Why do different faces catch light at different times?",
      "Which comparison isolates color from geometry?"
    ],
    evidence: [
      "Insert colors, opening sizes and sculpture geometry",
      "Target light colors and saved Sun directions"
    ],
    controls: [
      "Window inserts, colors, opening size and depth",
      "Sculpture shape, position and material; time, date and camera"
    ]
  },
  {
    id: "stone-calendar",
    title: "Build a calendar in stone",
    buildType: "Stone-circle calendar",
    starter: solarCalendarStarter,
    sessions: [
      {
        title: "Arrange the calendar gates",
        instruction: "Arrange the stone gates and carve markers where light or shadow lands. Compare the equinoxes and solstices.",
        activity: "monument",
        settings: settings("2026-03-20"),
        quest: calendarMonumentQuests.calendarStones
      },
      {
        title: "Play the final solar calendar",
        instruction: "Test your circle on all four seasonal dates. Play full days in the model, Sun path and center views; save and replay useful observations.",
        activity: "monument",
        settings: settings("2026-06-21"),
        quest: calendarMonumentQuests.yearOfLight
      }
    ],
    products: [
      "An editable stone-circle solar calendar",
      "Four seasonal observations with replayable designs"
    ],
    questions: [
      "Which features mark a season and which mark a time of day?",
      "Why do both equinoxes produce similar paths?",
      "What would terrain, clouds or an outdoor build change?"
    ],
    evidence: [
      "Gate geometry and calendar markers",
      "Four seasonal trials, nearby-date checks and revisions"
    ],
    controls: [
      "Gate layout, opening geometry, marker placement and Sun views",
      "All dates, location, observation time and day playback settings"
    ]
  }
];

// src/app/projects/calendar-monument/calendar-monument.config.ts
var calendarMonumentConfig = {
  schemaVersion: "1.0",
  projectId: "calendar-monument",
  version: "1.0.0",
  template: { id: "engineering-design", version: "1.0" },
  title: "From Sundial to Sun Monument",
  mission: "Build a sundial, investigate its seasonal shadows, and explain Earth\u2019s tilt. Your final project is a solar calendar: a stone monument with openings and colored jewels that marks the equinoxes and solstices.",
  simulationId: "simulation.solar-monument",
  previewWeeks: calendarMonumentWeeks,
  designSamples: calendarMonumentDesignSamples,
  learningSequence: calendarMonumentLearning,
  research: [
    {
      id: "season-noticing",
      title: "The sundial surprise",
      explanation: "Keep your first explanation so you can compare it with your thinking after exploring the Earth model.",
      prompt: "Your sundial did not move. Why did its shadow tip miss old marks when the season changed?",
      source: {
        label: "Explore a sundial \xB7 NASA",
        url: "https://pwg.gsfc.nasa.gov/stargaze/Sdial1.htm"
      }
    },
    {
      id: "dial-calendar",
      title: "A sundial that marks the year",
      explanation: "A shadow tip can show a daily pattern and a yearly pattern. Two dates can have similar shadow positions; a marker alone does not always identify one unique date.",
      prompt: "Compare your sundial\u2019s four solar-noon marks and nearby dates. Which dates are hardest to distinguish?",
      source: {
        label: "How sundials use Earth\u2019s axis \xB7 Royal Museums Greenwich",
        url: "https://www.rmg.co.uk/stories/time/sundials"
      }
    },
    {
      id: "daily-sun",
      title: "A shadow moves",
      explanation: "Earth rotates. The Sun appears to move across our sky, and a shadow points away from it. Sun altitude means its angle above the horizon; azimuth means its compass direction.",
      prompt: "Measure a stick\u2019s shadow at three times. Record the stick height, date, times, lengths, and directions. What changed?",
      source: {
        label: "Explore Sun angles and solar noon \xB7 NOAA",
        url: "https://www.gml.noaa.gov/grad/solcalc/glossary.html"
      }
    },
    {
      id: "seasons",
      title: "The angle of a season",
      explanation: "Earth\u2019s axis stays tilted as Earth travels around the Sun. This changes the Sun\u2019s height and daylight duration through the year. The two hemispheres experience opposite seasons.",
      prompt: "Draw or describe how Earth\u2019s tilt changes sunlight. At our location, how will solar-noon shadows differ in June and December?",
      source: {
        label: "What causes the seasons? \xB7 NASA",
        url: "https://spaceplace.nasa.gov/seasons/en/"
      }
    },
    {
      id: "moon",
      title: "The Moon keeps a different rhythm",
      explanation: "The Moon reflects sunlight. Its phases repeat in about 29.5 days as our view of its sunlit half changes. It can appear during the day. Ordinary Moon phases are not Earth\u2019s shadow.",
      prompt: "Compare the Moon on four dates about a week apart. Record phase, illumination, time, and position. Could a Moon calendar work like a solar calendar?",
      source: { label: "Moon phases \xB7 NASA", url: "https://science.nasa.gov/moon/moon-phases/" }
    },
    {
      id: "calendar",
      title: "A building that marks time",
      explanation: "A solstice marks an extreme in the Sun\u2019s yearly path. At an equinox the Sun crosses the celestial equator. Equinox daylight is approximately, rather than exactly, twelve hours. Both equinoxes have similar Sun paths.",
      prompt: "Research a solar monument such as Stonehenge. What alignment is documented? Sketch your own design and explain what it could tell an observer.",
      source: {
        label: "Stonehenge and the solstice \xB7 English Heritage",
        url: "https://www.english-heritage.org.uk/visit/places/stonehenge/things-to-do/solstice"
      }
    },
    {
      id: "colored-light",
      title: "Build with light and color",
      explanation: "A hole is a tunnel: a ray must clear both openings to pass through. A colored transparent material transmits some colors of light and absorbs others. A sculpture\u2019s faces look different as the light direction changes.",
      prompt: "Compare an empty hole, a colored window, and a deeper hole at the same Sun angle. Predict which sculpture faces will catch the color in March, June, September, and December. Which prediction does your evidence support?",
      source: {
        label: "Color filters absorb parts of white light \xB7 Exploratorium",
        url: "https://annex.exploratorium.edu/xref/exhibits/color_removal.html"
      }
    }
  ],
  designBrief: "Align a horizontal hole with a fixed mark on a central pillar. The three-stone starter has a misplaced summer window and a working winter window. At Colorado Springs in 2026, test 30 minutes after sunrise and move the summer window until its light patch reaches the summer carving. Keep the pillar and marks fixed. Extend the solved design into your own solar calendar and test all four special dates.",
  testInstructions: [
    "For the starting challenge, use Colorado Springs (38.83, \u2212104.82), 2026. Keep the location, pillar and carved marks fixed.",
    "Choose June solstice \u2192 Test sunlight \u2192 Morning light. This sets 30 minutes after sunrise. Predict whether the misplaced summer window will light the summer carving; save a trial.",
    "Choose Build, select Summer window and move it north in small steps. Return to Test sunlight. Inspect pillar shows both marks close up; Markers \u2192 Summer carving reports sunlight or shadow at the fixed point.",
    "Use Ray guide to follow the actual light path through the hole. Turn the guide off to see the projected patch alone. When it reaches the summer ring, save another trial.",
    "Choose December solstice and Morning light. Check that the winter carving lights and the summer carving is shaded. In Final demonstration \u2192 Compare, the starter supplies both solstice expectations and the same morning observation rule.",
    "Compare the equinox dates using sunlight at the open center as a baseline. These records do not claim an equinox alignment through a solstice hole. Later, design a separate equinox feature if you want one.",
    "Seal a hole, turn its bore vertically, or change its depth. Does the mark still receive sunlight? Undo the change and compare. Test a week before and after a solstice to investigate how many nearby dates also align.",
    "After the starting challenge, add your own openings, colored filters, or markers. Build supports ground and pillar targets with explicit height and face direction. Each changed design needs its own predictions and observations.",
    "Use Explore Earth to connect daily rotation and yearly orbit with the changing Sun direction. Record the final seasonal comparison and explain your revision.",
    "For a physical model, scale every dimension and mark together, keep true north and a level base, and test the projected sunlight on an available day. Record differences from the simulation."
  ],
  exhibitPrompts: [
    "Introduce your solar calendar. Show how its stone openings and colored jewels or glass create repeatable seasonal alignments.",
    "Explain Earth\u2019s tilt, the changing Sun angle, and why your monument\u2019s shadows change.",
    "Describe the block dimensions, location, true-north orientation, target positions, and observation times needed to reproduce your design.",
    "Use evidence from all four seasonal dates. Distinguish the solstice-hole alignments from the equinox baseline, and explain any additional equinox feature you built.",
    "Describe a revision and what your nearby-date and outdoor tests taught you. Explain the limits of your model.",
    "Compare the Moon\u2019s monthly pattern with the Sun\u2019s yearly pattern and credit your research sources."
  ],
  starterDesign: solsticeGatesStarter,
  starterChecks: solsticeGatesChecks
};
export {
  calendarMonumentConfig
};
//# debugId=267a0029-0dc2-5984-8af0-0a5c6555e7d6
//# sourceMappingURL=chunk-CCUAJA5L.js.map
