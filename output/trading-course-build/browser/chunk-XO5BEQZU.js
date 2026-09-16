import {
  IntroError,
  validateIntroConfig
} from "./chunk-5A6GBRKO.js";
import {
  hostedMediaUrl
} from "./chunk-ZTDR7NN6.js";
import {
  egyptianObjectModels
} from "./chunk-X7Y4LULJ.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/projects/calendar-monument/calendar-monument.intro.ts
var image = "/simulations/solar-monument/solstice-gates-cover.svg";
var alt = "Diagram of horizontal holes directing summer and winter sunlight onto a marked central pillar.";
var practiceImage = "/simulations/solar-monument/monument.svg";
var practiceAlt = "A block tower with three seasonal shadow markers and Sun paths above it.";
var calendarMonumentIntro = {
  capabilityId: "project.intro",
  schemaVersion: "1.0",
  projectId: "calendar-monument",
  version: "1.0.0",
  theme: "observatory",
  image,
  imageAlt: alt,
  kicker: "A calendar made of sunlight",
  headline: "Can a shadow tell time\u2014and the season?",
  story: "Start with a post and a moving shadow. Build a sundial, play a whole day, and mark the shadow tip. Then change the season: why does the same dial make different shadows? Your final project is a solar calendar, with standing stones, holes and colored jewels that mark the year.",
  hook: "The same tower makes a different shadow in winter. How could you turn that pattern into a calendar?",
  role: "Sky researcher and monument designer",
  teaser: {
    type: "decision-scene",
    id: "calendar-first-prediction",
    version: "1.0.0",
    interaction: "artifact",
    headline: "One tower. Two Sun angles.",
    replayLabel: "Revisit my shadow prediction",
    kicker: "A practice prediction",
    invitation: "Imagine a tower standing on level ground. The Sun starts high in the sky, then moves lower.",
    sceneLabel: "SHADOW OBSERVATION",
    sceneCaption: "Keep the tower height fixed. Only the Sun\u2019s altitude changes.",
    media: { image: practiceImage, alt: practiceAlt },
    dialogue: [],
    prompt: "What happens to the shadow as the Sun gets lower?",
    revealButton: "Explore the prediction",
    choices: [
      {
        id: "longer",
        label: "It grows longer",
        detail: "Light reaches the ground at a shallower angle.",
        image: practiceImage,
        imageAlt: practiceAlt,
        badge: "PREDICTION",
        result: {
          title: "A longer reach",
          text: "For a vertical tower on level ground, lowering the Sun lengthens the shadow while the Sun stays above the horizon.",
          evidence: "Keep the tower height fixed and change the Sun altitude in the lab.",
          surprise: "ONE CHANGE, A NEW SHADOW",
          media: { image: practiceImage, alt: practiceAlt }
        }
      },
      {
        id: "same",
        label: "It stays the same",
        detail: "The tower itself has not changed.",
        image: practiceImage,
        imageAlt: practiceAlt,
        badge: "PREDICTION",
        result: {
          title: "Height is only one part",
          text: "The tower stays the same, but the light\u2019s angle changes. A fair test can reveal what this does to the shadow.",
          evidence: "Change only the Sun altitude, then compare the shadow lengths.",
          surprise: "TEST THE LIGHT ANGLE",
          media: { image: practiceImage, alt: practiceAlt }
        }
      }
    ],
    mission: {
      title: "From Sundial to Sun Monument",
      invitation: "Turn a pattern in the sky into a design you can test.",
      image,
      imageAlt: alt,
      deliverable: "A solar-calendar monument with stone openings and colored jewels, plus a matching 3D test of both equinoxes and both solstices.",
      steps: [
        "Build a sundial and mark one day.",
        "Change seasons, explain the tilt, and mark the equinoxes and solstices.",
        "Build a solar-calendar monument and test its seasonal light alignments."
      ],
      finishButton: "Build my first sundial"
    }
  },
  challenge: {
    title: "Make a fair comparison",
    context: "You want to compare June and December solar-noon shadows.",
    options: [
      {
        id: "fixed",
        label: "Keep the tower and location fixed",
        detail: "Compare the dates at solar noon.",
        feedback: "That lets you investigate how the seasonal Sun angle changes the shadow."
      },
      {
        id: "change",
        label: "Change the tower height too",
        detail: "Build a taller tower for December.",
        feedback: "Now two things changed. Keeping height fixed makes the seasonal comparison easier to explain."
      }
    ],
    takeaway: "Change one variable at a time, then use measurements to support your explanation."
  },
  decision: {
    prompt: "How will your solar calendar mark the year?",
    options: [
      {
        id: "shadow",
        label: "Land a shadow on a marker",
        detail: "Arrange standing stones and measured seasonal targets."
      },
      {
        id: "window",
        label: "Land colored light on a marker",
        detail: "Use holes and colored jewels in a stone gate."
      }
    ],
    reasonPrompt: "Why might that design work?",
    reasonHint: "Connect your idea to the Sun\u2019s angle.",
    questionPrompt: "What do you need to find out?",
    questionHint: "Ask something your research or simulation can investigate."
  },
  mission: [
    "Build a sundial, play a day, then investigate its changing seasonal shadows.",
    "Explain Earth\u2019s tilt and make your sundial mark the four special dates.",
    "Finally, build a solar calendar like a stone circle with jeweled openings, and test its light and shadow at all four special dates."
  ],
  action: "Start with a sundial",
  finalExample: {
    button: "Explore a solar calendar",
    format: "Interactive 3D seasonal demonstration",
    title: "Solstice Windows",
    introduction: "Aim two horizontal holes so summer and winter morning sunlight reaches the matching marks on a central pillar. Start with three stones and one simple challenge: move a window until its light patch meets a fixed carving.",
    chapters: [
      {
        label: "01 \xB7 Research",
        title: "Explain the sky pattern",
        studentWork: "Earth\u2019s tilt changes solar-noon altitude at our location. The Moon follows a different monthly pattern.",
        evidence: "Research notes and date-stamped observations.",
        teacherNote: "Listen for a causal explanation connecting tilt, angle, and shadow."
      },
      {
        label: "02 \xB7 Design",
        title: "Build matching models",
        studentWork: "Two upright window stones send light through empty horizontal holes to a central receiving pillar. Its summer and winter carvings stay fixed while we align the windows. The plan gives all three stones and target heights.",
        evidence: "Block list, coordinates, orientation, and target positions.",
        teacherNote: "Check whether another team could reproduce the model."
      },
      {
        label: "03 \xB7 Evidence",
        title: "Demonstrate all four special dates",
        studentWork: "I show the Sun and shadow on the same 3D monument at each equinox and solstice, and compare the results with my target expectations.",
        evidence: "Four seasonal comparisons and a documented revision.",
        teacherNote: "Assess the evidence and uncertainty, not decorative complexity."
      }
    ],
    lookFors: [
      "Accurate explanation of seasons",
      "Reproducible dimensions and orientation",
      "Evidence from tests and revisions"
    ]
  }
};

// src/app/projects/robot-delivery/robot-delivery.intro.ts
var robotDeliveryIntro = {
  capabilityId: "project.intro",
  schemaVersion: "1.0",
  projectId: "robot-delivery-code-lab",
  version: "1.0.0",
  theme: "robotics",
  image: "/robot-delivery/arena-launch-v2.webp",
  imageAlt: "A teal and ivory delivery robot carries an orange crate through a futuristic warehouse with glowing cyan routes, golden parking pads, and green delivery zones.",
  kicker: "Engineering dispatch \xB7 Your robot is waiting.",
  headline: "The delivery is urgent. The robot needs your instructions.",
  story: "A busy warehouse needs a new delivery robot. It can move, turn, and carry a package\u2014but it cannot plan its own route. You are the engineer who turns measurements into commands it can trust.",
  hook: "How can you prove your robot will stop in exactly the right place?",
  role: "Robot programmer & test engineer",
  challenge: {
    title: "One delivery. One decision.",
    context: "Your robot travels 24 centimeters in one wheel rotation. A package is 72 centimeters straight ahead. What should you investigate first?",
    options: [
      {
        id: "calculate",
        label: "Calculate the number of rotations.",
        detail: "Connect distance to a measured wheel rotation.",
        feedback: "You can divide the target distance by the travel per rotation, then test whether the robot reaches your prediction."
      },
      {
        id: "guess",
        label: "Try a command and watch carefully.",
        detail: "Use a trial to begin gathering evidence.",
        feedback: "A trial can give useful measurements. Record what happens, then use the numbers to make your next command more precise."
      }
    ],
    takeaway: "Strong engineers combine calculations with tests. Neither a lucky guess nor an unchecked formula is enough."
  },
  decision: {
    prompt: "What will your first engineering priority be?",
    options: [
      { id: "precision", label: "Precision", detail: "Stop close to the target every time." },
      {
        id: "efficiency",
        label: "Efficiency",
        detail: "Deliver packages with fewer turns and less battery."
      },
      {
        id: "reliability",
        label: "Reliability",
        detail: "Write a clear program that works across several routes."
      }
    ],
    reasonPrompt: "Why does this priority matter?",
    reasonHint: "Connect your choice to a delivery problem.",
    questionPrompt: "What do you need to find out about the robot?",
    questionHint: "Think about wheel travel, turn rate, cargo, or the course."
  },
  mission: [
    "Measure and calibrate the robot in eight training missions.",
    "Use fractions, variables, and loops to build and improve your program.",
    "Lock a tested championship design and defend it with your engineering portfolio."
  ],
  action: "Enter mission control",
  finalExample: {
    button: "Explore a finished robot project",
    format: "Working program, replay & engineering portfolio",
    title: "A delivery program backed by evidence",
    introduction: "Explore a fictional student\u2019s complete route. Replay two package deliveries, inspect the commands and calculations, and compare the trial that failed with the revision that worked.",
    chapters: [
      {
        label: "01 \xB7 Measure",
        title: "Calibrate before coding",
        studentWork: "The engineer compares theoretical wheel circumference with measured travel.",
        evidence: "8 \xD7 3.14 = 25.12 cm around the wheel; a test gives 24 cm of actual travel.",
        teacherNote: "Look for a clear distinction between a geometric model and a measurement."
      },
      {
        label: "02 \xB7 Improve",
        title: "Use a failed trial",
        studentWork: "A short final leg leaves the robot away from the dock. The engineer changes one variable.",
        evidence: "Saved versions keep the original program and route for a fair comparison.",
        teacherNote: "Ask which change explains the improved stopping error."
      },
      {
        label: "03 \xB7 Defend",
        title: "Deliver and explain",
        studentWork: "The final program delivers both packages, avoids the rack, and returns to the dock.",
        evidence: "A locked version includes code, predictions, math evidence, and an autonomous replay.",
        teacherNote: "Assess the reasoning separately from the robot\u2019s performance score."
      }
    ],
    lookFors: [
      "Calculations connected to code",
      "A reproducible test and revision",
      "A clear explanation of why the design works"
    ]
  }
};

// src/app/projects/intro-scenes/unlabeled-shelf.dialogue.json
var unlabeled_shelf_dialogue_default = {
  welcome: [
    {
      speaker: "scientist",
      text: "Aha! Welcome, junior scientist! Professor Pip here! Two samples. Same color, same appearance. Obviously the same substance! Case closed! I would test them, of course, but my genius is usually faster! See that big button? Go on! Confirm my brilliance!",
      audioUrl: "/project-intros/lab-surprise/welcome-scientist-v2.m4a"
    },
    {
      speaker: "robot",
      text: "Beep. Confidence: one hundred percent. Evidence collected: zero. I recommend the button.",
      audioUrl: "/project-intros/lab-surprise/welcome-robot.m4a"
    }
  ],
  testing: [
    {
      speaker: "scientist",
      text: "Aha! Sample A turns blue! Beautiful! Completely predicta...",
      audioUrl: "/project-intros/lab-surprise/testing-scientist-v2.m4a"
    }
  ],
  reveal: [
    {
      speaker: "scientist",
      text: "Extraordinary! We have discovered two things! Appearances can fool us... and I need a hat! You saw that, right? Same-looking liquids. Different color results! My theory could use a little work. So could my hair!",
      audioUrl: "/project-intros/lab-surprise/reveal-scientist-v2.m4a"
    },
    {
      speaker: "robot",
      text: "Updating case file. Sample A: blue. Sample B: pink. Updating hairstyle: spectacular. The giant puff is our cartoon joke. The different colors are our evidence.",
      audioUrl: "/project-intros/lab-surprise/reveal-robot.m4a"
    }
  ],
  handoff: [
    {
      speaker: "robot",
      text: "Four unlabeled vials. One unsolved case. Perhaps YOU should lead this investigation. Collect observations. Compare tests. Find the evidence that Professor Pip skipped.",
      audioUrl: "/project-intros/lab-surprise/handoff-robot.m4a"
    },
    {
      speaker: "scientist",
      text: "I shall supervise! From a slightly greater distance! Go on, detective! Give those mystery vials an explanation worth believing! And if anyone asks... this hairstyle was intentional!",
      audioUrl: "/project-intros/lab-surprise/handoff-scientist-v2.m4a"
    }
  ]
};

// src/app/projects/intro-scenes/unlabeled-shelf.teaser.ts
var unlabeledShelfTeaser = {
  type: "illustrated-comparison",
  id: "unlabeled-shelf-pip-opening",
  version: "1.0.0",
  headline: "Professor Pip has a theory. You have the test button.",
  scientistName: "Professor Pip",
  robotName: "Beep",
  invitation: "Two identical-looking samples. One very confident scientist. What could possibly go wrong?",
  testButton: "TEST THAT THEORY",
  finishButton: "Give Me the Case",
  evidenceNote: "Same appearance. Different color results. Looking alike does not prove that two substances are the same.",
  comedyNote: "The giant POOF is cartoon comedy. The color changes are the scientific clue in this fictional comparison.",
  samples: [
    { id: "practice-a", label: "Sample A", result: "Turned blue", color: "#54c8f1" },
    { id: "practice-b", label: "Sample B", result: "Turned pink", color: "#f478b2" }
  ],
  dialogue: unlabeled_shelf_dialogue_default
};

// src/app/projects/intro-scenes/frontier.dialogue.json
var frontier_dialogue_default = {
  prologue: [
    {
      speaker: "Rowan \xB7 Returning trader",
      text: "Three weeks on the route, and you should see what\u2019s out there! At Mill Creek, the ferryman needed rope. Farther on, travelers were asking for provisions before I\u2019d even stopped my wagon. Every town had a different need.",
      audioUrl: "/project-intros/frontier/returning-trader-1.m4a"
    },
    {
      speaker: "Rowan \xB7 Returning trader",
      text: "Then rain washed out the short road. I nearly spent my last coins taking the long way round. So I opened my ledger, counted my costs, and saved enough for the journey home. A good sale means little if the trip costs more than you earn.",
      audioUrl: "/project-intros/frontier/returning-trader-2.m4a"
    },
    {
      speaker: "Rowan \xB7 Returning trader",
      text: "There are opportunities out there if you have the courage and the smarts. Courage to set off. Smarts to listen, check your numbers, and change your plan. You could build a company of your own. Come on, let\u2019s see what you\u2019d pack for your first trade.",
      audioUrl: "/project-intros/frontier/returning-trader-3.m4a"
    }
  ]
};

// src/app/projects/intro-scenes/frontier.teaser.ts
var street = {
  image: "/frontier-trading/shop-scenes/town-street.webp",
  alt: "A busy illustrated trading town with storefronts and a dusty road."
};
var frontierTeaser = {
  type: "decision-scene",
  id: "frontier-first-trade",
  version: "1.2.0",
  interaction: "cargo",
  replayLabel: "Replay my first trade",
  kicker: "Frontier Trading Company \xB7 The two-load challenge",
  headline: "One wagon. Thirty coins. Please tell us you packed something useful.",
  invitation: "The wagon leaves soon. Your trading company has two empty cargo spaces\u2014and you get to fill them.",
  sceneLabel: "DEPARTURE BOARD \xB7 NEXT STOP: MILL CREEK",
  speeches: [
    {
      id: "rowan-recruitment",
      speaker: "Rowan \xB7 Returning trader",
      title: "Your first trade with Rowan",
      summary: "Rowan invites you to help choose goods for the road. Try a practice trade with 30 coins and two cargo spaces: choose supplies, check your costs, and discover what buyers will offer.",
      video: hostedMediaUrl("project-intros/frontier/trading-town-launch.mp4")
    }
  ],
  prologue: {
    title: "The road is full of opportunity.",
    setting: "A mud-splashed wagon rolls into town at sundown. Rowan climbs down, sets a weathered ledger on a crate, and gathers a crowd. You step closer to hear the tale of a trader just back from the route.",
    media: {
      image: "/project-intros/frontier/returning-trader-v1.webp",
      alt: "Rowan, a returning trader, tells an attentive crowd about the route beside a loaded wagon, with an open ledger and a mountain road behind him at sunset."
    },
    dialogue: frontier_dialogue_default.prologue,
    continueLabel: "I\u2019m ready to try my first trade"
  },
  cargo: {
    startingCoins: 30,
    capacity: 2,
    vehicleImage: "/frontier-trading/vehicle-scenes/trade-wagon-realistic.webp",
    vehicleAlt: "Your trading wagon"
  },
  transition: { style: "load", label: "Cargo aboard. Next stop: the market!" },
  sceneCaption: "Mara, the driver, has a weather report: rain ahead. A merchant promises a big price for cloth. The mule has contributed by eating the corner of the report. Choose two different supplies for this practice trade.",
  media: {
    image: "/project-intros/frontier/Opening-scene-image.webp",
    alt: "A frontier trading company prepares wagons and cargo in a busy mountain town while a trade ledger summarizes trips, profit, and goods sold."
  },
  dialogue: [],
  prompt: "Load the wagon. Which two supplies will you bring?",
  revealButton: "Put my name on the company charter",
  choices: [
    {
      id: "rope",
      cargo: { name: "Sturdy rope", cost: 8, sale: 15 },
      label: "Load sturdy rope",
      detail: "Costs 8 coins. Useful equipment, modest expected demand.",
      image: "/frontier-trading/cargo-scenes/rope-coil.webp",
      imageAlt: "Coil of trading rope.",
      badge: "8 COINS \xB7 1 SPACE",
      result: {
        title: "The rain changed the market.",
        text: "At Mill Creek, a damaged ferry needs rope. A buyer offers 15 coins for your load. You make the sale! The driver calls you a genius. You remember that the storm helped, too.",
        evidence: "Practice trade: Rope costs 8 coins and sells for 15. Profit: 7 coins. Unexpected demand changed the offer.",
        surprise: "THE FERRY NEEDS YOU!",
        media: street,
        metrics: [
          { label: "Cost", value: "8" },
          { label: "Sale", value: "15" },
          { label: "Profit", value: "7" }
        ]
      }
    },
    {
      id: "cloth",
      cargo: { name: "Fine cloth", cost: 15, sale: 12 },
      label: "Load fine cloth",
      detail: "Costs 15 coins. A merchant predicts a sale for 24.",
      image: "/frontier-trading/cargo-scenes/wrapped-bale.webp",
      imageAlt: "A wrapped bale of cloth.",
      badge: "15 COINS \xB7 1 SPACE",
      result: {
        title: "Big promise. Smaller offer.",
        text: "You arrive to find three wagons selling cloth. The best offer is 12 coins, so this cloth sells for less than you paid. Mara unfolds the merchant\u2019s forecast. It says \u201Cprobably\u201D in extremely tiny writing.",
        evidence: "Practice trade: Cloth costs 15 coins and sells for 12. Loss: 3 coins. A predicted price was not a guaranteed sale.",
        surprise: "READ THE TINY \u201CPROBABLY.\u201D",
        media: street,
        metrics: [
          { label: "Cost", value: "15" },
          { label: "Sale", value: "12" },
          { label: "Loss", value: "3" }
        ]
      }
    },
    {
      id: "provisions",
      cargo: { name: "Provisions", cost: 10, sale: 14 },
      label: "Load provisions",
      detail: "Costs 10 coins. Travelers always need to eat.",
      image: "/frontier-trading/cargo-scenes/provisions-sack.webp",
      imageAlt: "Sack of travel provisions.",
      badge: "10 COINS \xB7 1 SPACE",
      result: {
        title: "A small profit. A very happy lunch line.",
        text: "Travelers buy your provisions for 14 coins. You earn a steady profit. The mule looks disappointed that \u201Ccompany inventory\u201D does not mean \u201Cfree snacks.\u201D What might another cargo have earned?",
        evidence: "Practice trade: Provisions cost 10 coins and sell for 14. Profit: 4 coins. Choosing provisions also meant giving up another possible trade.",
        surprise: "SOLD. NOT SNACKED.",
        media: street,
        metrics: [
          { label: "Cost", value: "10" },
          { label: "Sale", value: "14" },
          { label: "Profit", value: "4" }
        ]
      }
    }
  ],
  mission: {
    title: "Now build a company that can explain its choices.",
    invitation: "One lucky sale does not make a strategy. Your company will choose cargo, plan routes, respond to changing markets, and tell the story behind its results.",
    image: "/frontier-trading/setup-scenes/company-charter.webp",
    imageAlt: "A trading company charter waiting for its founders.",
    deliverable: "Your company. Your strategy.",
    steps: [
      "Plan a load and defend the tradeoff.",
      "Track what you spend, earn, and change.",
      "Present your ledger and strategy to the class."
    ],
    finishButton: "Let\u2019s build my trading company"
  }
};

// src/app/projects/intro-scenes/museum.teaser.ts
var bust = egyptianObjectModels.find((object) => object.id === "nefertiti").model;
var coffin = egyptianObjectModels.find((object) => object.id === "coffin").model;
var temple = egyptianObjectModels.find((object) => object.id === "temple").model;
var museumTeaser = {
  type: "decision-scene",
  id: "museum-object-spotlight",
  version: "2.0.0",
  interaction: "artifact",
  replayLabel: "Replay the artifact spotlight",
  kicker: "Objects That Changed Us \xB7 After hours at the museum",
  headline: "The label says \u201Cold thing.\u201D We\u2019re going to need a better story.",
  invitation: "The gallery lights flicker on. A royal bust and a decorated coffin are waiting. Rotate a supplied 3D model and find a detail worth investigating.",
  sceneLabel: "CURATOR ACCESS \xB7 ANCIENT EGYPT",
  transition: { style: "spotlight", label: "Spotlight on. Let\u2019s uncover its story." },
  sceneCaption: "A fictional museum assistant left you a note: \u201CPlease give one object a proper introduction.\u201D Choose an object to examine its shape and read its source record.",
  media: { model: bust, alt: bust.alt },
  dialogue: [],
  prompt: "Which object gets the spotlight?",
  revealButton: "Show me my exhibit space",
  choices: [
    {
      id: "nefertiti",
      thinking: {
        prompt: "What can you see in this portrait?",
        starter: "I notice\u2026",
        guide: "Turn the object. Describe one shape, color, or detail you can actually see. Keep what you see separate from what you think it means."
      },
      label: "Spotlight Nefertiti\u2019s bust",
      detail: "A tall crown. A carefully shaped profile. How does a portrait communicate identity?",
      model: bust,
      imageAlt: bust.alt,
      badge: "ROTATABLE 3D",
      result: {
        title: "A royal image. A question about representation.",
        text: "Rotate the bust to compare its face, crown, and profile. Describe a feature you can see before suggesting what it might communicate. A portrait presents a selected image of a person; it cannot tell us what every viewer thought.",
        evidence: "Object clue: the crown and profile invite questions about royal representation. This digital model is a starting point for observation, while the creator record helps establish what the model represents.",
        surprise: "LOOK FROM ANOTHER ANGLE",
        media: { model: bust, alt: bust.alt },
        source: { label: "View the supplied bust\u2019s source and credit", url: bust.sourceUrl }
      }
    },
    {
      id: "coffin",
      thinking: {
        prompt: "What detail would you put on its label?",
        starter: "I notice\u2026",
        guide: "Turn the object and pick one visible detail. Describe it before guessing what it means. The source record can help you investigate next."
      },
      label: "Spotlight the decorated coffin",
      detail: "An enclosure. Painted surfaces. What can form and decoration reveal?",
      model: coffin,
      imageAlt: coffin.alt,
      badge: "ROTATABLE 3D",
      result: {
        title: "An enclosure with a story to investigate.",
        text: "The supplied museum model identifies this as the Coffin of Ankh-Khonsu. Rotate it and compare the enclosure\u2019s shape with its decorated surfaces. These observations can guide research into funerary practice, craft, and belief.",
        evidence: "Interpretation needs context: one coffin cannot represent every burial. Use its museum model record to investigate the object before assigning meanings to individual images or inscriptions.",
        surprise: "FORM. DECORATION. CONTEXT.",
        media: { model: coffin, alt: coffin.alt },
        source: { label: "View the supplied coffin\u2019s museum record", url: coffin.sourceUrl }
      }
    }
  ],
  mission: {
    title: "This gallery has a space with your name on it.",
    invitation: "Turn objects into an exhibit people want to explore. You choose the story, investigate sources, design the display, and guide visitors through what the evidence can tell us.",
    model: temple,
    imageAlt: temple.alt,
    deliverable: "Your museum wing",
    steps: [
      "Choose a question that connects your objects.",
      "Build labels that explain clues and cite sources.",
      "Lead a curator tour of your finished exhibit."
    ],
    finishButton: "Give me the curator\u2019s pass"
  }
};

// src/app/projects/intro-scenes/senate.teaser.ts
var chamber = {
  image: "/debate-studio/roman-senate-chamber.webp",
  alt: "An illustrated Roman Senate chamber with a central speaking floor."
};
var senateTeaser = {
  type: "decision-scene",
  id: "senate-seat-invitation",
  version: "1.1.0",
  interaction: "council",
  replayLabel: "Replay my Senate summons",
  kicker: "The Fate of the Republic \xB7 You have been summoned",
  headline: "Two senators. Two big claims. One empty seat: yours.",
  invitation: "Rome is at a turning point. Hear both senators, question their claims, and prepare to take the floor.",
  sceneLabel: "THE SENATE IS IN SESSION",
  sceneCaption: "These fictional senators introduce the debate. Their dialogue is a dramatization, not a quotation from an ancient source.",
  media: chamber,
  speeches: [
    {
      id: "lucius",
      speaker: "Senator Lucius",
      title: "The case for strong leadership",
      summary: "Consider the promise of decisive leadership. How should a leader be held accountable?",
      video: hostedMediaUrl("debate-studio/openings/opening-Senator Lucius.mp4")
    },
    {
      id: "cassius",
      speaker: "Senator Cassius",
      title: "The case for the Republic",
      summary: "Consider the role of shared power. How can the Senate act effectively in a crisis?",
      video: hostedMediaUrl("debate-studio/openings/opening-Senator Cassius.mp4")
    }
  ],
  dialogue: [],
  prompt: "Interrupt with a question worth answering.",
  revealButton: "Take me to my Senate seat",
  choices: [
    {
      id: "challenge-leader",
      thinking: {
        prompt: "What would you ask Lucius?",
        starter: "My question for the senator\u2026",
        guide: "Ask about a weakness or missing limit in the strong-leader proposal. Write your own question; you do not need to choose a side yet."
      },
      label: "Challenge the strong-leader claim",
      detail: "\u201CWho would stop that leader from abusing power?\u201D",
      imageAlt: "Senator Lucius in a white toga with a red stripe.",
      badge: "QUESTION LUCIUS",
      result: {
        title: "The hand gestures stop. The thinking starts.",
        text: "You tested the missing limit in Lucius\u2019s argument. His next job is to support his claim with evidence. Your question opens an investigation; it does not settle the debate.",
        evidence: "Question raised: how could decisive leadership remain accountable? Look for historical evidence about both power and its limits.",
        surprise: "EXCELLENTLY INCONVENIENT.",
        media: chamber
      }
    },
    {
      id: "challenge-senate",
      thinking: {
        prompt: "What would you ask Cassius?",
        starter: "My question for the senator\u2026",
        guide: "Ask how shared government would work during a crisis. Write your own question; you do not need to choose a side yet."
      },
      label: "Challenge the Senate\u2019s promise",
      detail: "\u201CWhat if the Senate cannot agree during a crisis?\u201D",
      imageAlt: "Senator Cassius in a purple and cream robe.",
      badge: "QUESTION CASSIUS",
      result: {
        title: "A strong question reaches both sides.",
        text: "You asked Cassius to explain how his proposal would actually work. Supporting limits on power is a starting claim. Showing how institutions can respond to a crisis needs evidence too.",
        evidence: "Question raised: how could collective government act effectively during a crisis? Compare evidence for institutional strengths and weaknesses.",
        surprise: "THE CHAMBER IS LISTENING.",
        media: chamber
      }
    }
  ],
  mission: {
    title: "Now make a case that can survive a challenge.",
    invitation: "Investigate Caesar and the Republic. Choose a position you can defend, build a speech from sources, and respond to the strongest argument against you.",
    image: chamber.image,
    imageAlt: "Senate seating surrounding a space for the student\u2019s address.",
    deliverable: "Your Senate address",
    steps: [
      "Build your claim with historical evidence.",
      "Prepare for a fair but difficult challenge.",
      "Deliver your address, rebut, and reflect."
    ],
    finishButton: "I\u2019ll take the floor"
  }
};

// src/app/projects/intro-scenes/newsroom.teaser.ts
var bostonAftermathScene = {
  image: "/history-live/boston-tea-party-aftermath-v1.webp",
  alt: "An imagined Boston waterfront after the Tea Party: a protester gestures to a crowd, a Loyalist holds official papers, a merchant points toward ruined tea with a ledger, and a woman and a Black dockworker watch the argument beside intact sailing ships.",
  fit: "contain"
};
var historicalContext = {
  label: "Read the National Park Service account",
  url: "https://www.nps.gov/articles/000/boston-tea-party-in-real-time.htm"
};
var newsroomTeaser = {
  type: "decision-scene",
  id: "newsroom-breaking-assignment",
  version: "1.1.0",
  interaction: "dispatch",
  replayLabel: "Return to the Boston waterfront",
  kicker: "History Live \xB7 A story is breaking",
  headline: "The tea is gone. The argument is just beginning.",
  invitation: "Boston, December 1773. Tea floats in the harbor. Voices rise on the wharf. Some defend resistance. Others demand order or fear for their work. You have arrived to report. What is the story here?",
  sceneLabel: "BOSTON HARBOR \xB7 AFTER THE TEA PARTY",
  sceneCaption: "Imagined scene, AI-generated illustration. These characters and their confrontation are fictional; investigate historical sources to find out what happened.",
  media: bostonAftermathScene,
  dialogue: [],
  prompt: "Who will you question first?",
  revealButton: "Follow this lead",
  choices: [
    {
      id: "protesters",
      label: "The protester",
      detail: "A stand for liberty. Who supports it?",
      image: bostonAftermathScene.image,
      imageAlt: "The protester gesturing toward the waterfront crowd.",
      badge: "RESISTANCE",
      thinking: {
        prompt: "What would you ask the protester?",
        starter: "I want to find out why\u2026",
        guide: "Start with a detail you notice. Write a question a historical source could help answer. The illustration gives you a lead, not proof.",
        evidence: [
          {
            id: "clue-1",
            text: "A protester gestures toward the harbor as people cheer behind him."
          },
          { id: "clue-2", text: "Other people in the same crowd look worried or argue back." }
        ]
      },
      result: {
        title: "A protest can unite people\u2014and divide them.",
        text: "Resistance to Parliament helped bring people together. But support for resisting the Tea Act did not mean everyone approved of destroying tea. Your story could ask where people drew that line.",
        evidence: "Compare a defense of the protest with an account that objects to the destruction. Whose views does each source represent?",
        surprise: "WHOSE LIBERTY? WHO AGREES?",
        media: bostonAftermathScene,
        source: historicalContext
      }
    },
    {
      id: "officials",
      label: "The Loyalist",
      detail: "A demand for order. Whose authority?",
      image: bostonAftermathScene.image,
      imageAlt: "A Loyalist civilian holds papers and argues with an open hand.",
      badge: "LAW & LOYALTY",
      thinking: {
        prompt: "What would you ask the Loyalist?",
        starter: "Before accepting this argument, I would ask\u2026",
        guide: "A source can value order and still leave questions unanswered. Ask for evidence about authority, rights, or the risks of resistance.",
        evidence: [
          {
            id: "clue-1",
            text: "A neatly dressed man holds official-looking papers as he argues."
          },
          { id: "clue-2", text: "The protester beside him appears unconvinced." }
        ]
      },
      result: {
        title: "Order sounds different depending on who has power.",
        text: "Some people saw the destruction as unlawful and feared its consequences. Others questioned Parliament\u2019s right to tax them without representation. Investigate what each side meant by lawful authority.",
        evidence: "Compare official demands with colonial objections. A document tells you what its author argued; it does not settle the argument.",
        surprise: "WHO MAKES THE RULES?",
        media: bostonAftermathScene,
        source: historicalContext
      }
    },
    {
      id: "merchants",
      label: "The merchant",
      detail: "Ruined cargo. Who bears the cost?",
      image: bostonAftermathScene.image,
      imageAlt: "A merchant holds a ledger and points toward the damaged tea chests.",
      badge: "TRADE & MONEY",
      thinking: {
        prompt: "What would you ask the merchant?",
        starter: "To understand who gains or loses, I would ask\u2026",
        guide: "Do not assume every merchant wanted the same thing. Look for who owned the tea, who carried it, and who could sell it.",
        evidence: [
          {
            id: "clue-1",
            text: "A merchant points toward ruined tea while holding an open ledger."
          },
          { id: "clue-2", text: "The merchant ships are still intact behind the crowd." }
        ]
      },
      result: {
        title: "Follow the tea. Then follow the money.",
        text: "The tea trade connected the East India Company, selected sellers, shipowners, and other merchants. Their interests were not identical. Your report could investigate who benefited from the Tea Act and who faced losses.",
        evidence: "Check trade rules, ownership records, and merchants\u2019 accounts before deciding who paid the price. A worried face cannot establish a financial loss.",
        surprise: "WHO GAINS? WHO PAYS?",
        media: bostonAftermathScene,
        source: historicalContext
      }
    },
    {
      id: "townspeople",
      label: "The waterfront workers",
      detail: "A divided town. What happens to daily life?",
      image: bostonAftermathScene.image,
      imageAlt: "A working woman and a Black dockworker watch the crowd and the harbor.",
      badge: "EVERYDAY LIVES",
      thinking: {
        prompt: "What would you ask the waterfront workers?",
        starter: "A voice I want to hear is\u2026 My question is\u2026",
        guide: "Ask whose work, safety, or rights might be affected. Do not infer a person\u2019s beliefs or legal status from their appearance.",
        evidence: [
          { id: "clue-1", text: "Two workers look between the arguing crowd and the harbor." },
          { id: "clue-2", text: "The loudest speakers are not the only people in the scene." }
        ]
      },
      result: {
        title: "The quietest people may have the biggest story.",
        text: "Political arguments reach beyond their leaders. Ask how the crisis affected work and everyday life, and whose concerns survive in the sources. These imagined workers invite questions; they cannot speak for a whole community.",
        evidence: "Seek personal accounts and records of daily life. Name gaps when the people you want to hear from are missing from the record.",
        surprise: "WHO IS MISSING FROM THE HEADLINE?",
        media: bostonAftermathScene,
        source: historicalContext
      }
    }
  ],
  mission: {
    title: "One crowded waterfront. More than one story.",
    invitation: "You found a lead. Now become a Revolutionary War correspondent: choose a network, investigate a story, and let the evidence shape the report you put on air.",
    image: "/history-live/assignment-newsroom.webp",
    imageAlt: "A newsroom assignment desk waiting for the student\u2019s script.",
    deliverable: "Your special report",
    steps: [
      "Choose a story and compare historical sources.",
      "Write, rehearse, and record your news package.",
      "Present it to the class with source credits."
    ],
    finishButton: "Give me the assignment"
  }
};

// src/app/projects/intro-scenes/voyage.teaser.ts
var clip = (name, alt2) => ({
  image: `/project-intros/voyage/${name}.svg`,
  alt: alt2,
  video: `/project-intros/voyage/${name}.webm`,
  captions: `/project-intros/voyage/${name}.vtt`,
  videoFallback: "illustration-and-transcript"
});
var voyageTeaser = {
  type: "decision-scene",
  id: "voyage-first-command",
  version: "1.2.0",
  interaction: "navigation",
  replayLabel: "Replay my first command",
  kicker: "Race Around the World \xB7 Captain to the chart table",
  headline: "The shortcut looks brilliant. The wind has other plans.",
  invitation: "Your fictional crew is waiting for a course. The navigator has two routes. You choose your path and whom to trust; the events of history keep their documented outcomes.",
  sceneLabel: "PRACTICE WATERS \xB7 A FICTIONAL CHART",
  sceneCaption: "Watch the ship meet changing weather. The direct passage is shorter, but its wind reports are old. The wider route has a recent wind report and a known supply harbor. Choose your first command.",
  media: __spreadProps(__spreadValues({}, clip(
    "departure",
    "An illustrated sailing ship leaves harbor as clouds gather over a fictional practice sea."
  )), {
    video: hostedMediaUrl("project-intros/voyage/intro-launch-video.mp4")
  }),
  afterVideoMedia: {
    image: "/project-intros/voyage/practice-chart.svg",
    fit: "contain",
    alt: "Fictional practice chart. From Departure Bay in the northeast, the direct passage crosses uncertain winds to the destination in the southwest. The longer route stops at Supply Harbor in the southeast before reaching the same destination."
  },
  dialogue: [],
  prompt: "Captain, which course do we sail?",
  revealButton: "Bring me the expedition chart",
  choices: [
    {
      id: "direct",
      thinking: {
        prompt: "What might happen on this route?",
        starter: "Because of this clue, I predict\u2026",
        guide: "Choose a chart clue. Predict how it could affect time or supplies before we reveal the voyage. A prediction can change when you learn more.",
        evidence: [
          {
            id: "clue-1",
            text: "The direct passage is shorter."
          },
          {
            id: "clue-2",
            text: "Its wind report is old."
          }
        ]
      },
      label: "Try the direct passage",
      detail: "Less distance. Older wind reports. Carry the uncertainty.",
      image: "/project-intros/voyage/direct.svg",
      imageAlt: "A sailing ship facing tall waves and gray clouds.",
      badge: "SHORTER \xB7 LESS CERTAIN",
      result: {
        title: "Shorter on paper. Slower in these winds.",
        text: "In this practice outcome, headwinds slow the ship. The crew uses two extra days of provisions. Your navigator points at the chart: \u201CThe line was short. Unfortunately, the ocean did not read it.\u201D",
        evidence: "Practice consequence: shorter distance did not guarantee less sailing time. Older wind information left an important uncertainty.",
        surprise: "THE OCEAN VOTED \u201CNO.\u201D",
        media: clip(
          "direct",
          "The ship rocks into headwinds and waves; a provisions counter shows two additional days used."
        ),
        metrics: [
          { label: "Unexpected time", value: "+2 days" },
          { label: "Next concern", value: "Supplies" }
        ]
      }
    },
    {
      id: "harbor",
      thinking: {
        prompt: "What might happen on this route?",
        starter: "Because of this clue, I predict\u2026",
        guide: "Choose a chart clue. Predict how it could affect time or supplies before we reveal the voyage. A prediction can change when you learn more.",
        evidence: [
          {
            id: "clue-1",
            text: "The harbor route adds distance."
          },
          {
            id: "clue-2",
            text: "The harbor has a recent wind report."
          }
        ]
      },
      label: "Sail via the supply harbor",
      detail: "More distance. A recent report. A place to ask and resupply.",
      image: "/project-intros/voyage/harbor.svg",
      imageAlt: "A sailing ship near a sheltered harbor with a lighthouse.",
      badge: "LONGER \xB7 MORE INFORMATION",
      result: {
        title: "You reach shelter. Now there is another decision.",
        text: "In this practice outcome, the recent report helps you reach harbor. The detour costs one day. Resupplying will require an agreement with people who live and trade there. Their needs matter too.",
        evidence: "Practice consequence: the detour added time and a chance to resupply. A harbor is a community, not a free supply box.",
        surprise: "LANDFALL. START LISTENING.",
        media: clip(
          "harbor",
          "The ship reaches a sheltered harbor; the route adds one day and an invitation to negotiate for supplies."
        ),
        metrics: [
          { label: "Detour", value: "+1 day" },
          { label: "Next step", value: "Negotiate" }
        ]
      }
    }
  ],
  mission: {
    title: "Your path is yours. History keeps its course.",
    invitation: "Lead a fictional crew from Lisbon in 1501. Choose your companions, loyalties, and route. Learn from what you witness and from sourced historical records. Your decisions affect your personal voyage; real expeditions, treaties, and later events keep their historical outcomes.",
    image: "/journey-replay/world-atlas-v1.webp",
    imageAlt: "An illustrated world atlas ready for an expedition route.",
    deliverable: "Your voyage replay",
    steps: [
      "Choose whom to work with and a course you can defend.",
      "Separate what you witness from what historical sources establish.",
      "Replay your personal journey alongside the unchanged historical timeline."
    ],
    finishButton: "I\u2019m ready for my first expedition"
  }
};

// src/app/projects/intro-scenes/survival-island-history.teaser.ts
var launchArt = "/narrative-studio/survival-island-history-launch-v1.jpg";
var launchMedia = (alt2) => ({ image: launchArt, alt: alt2 });
var survivalIslandHistoryTeaser = {
  type: "decision-scene",
  id: "survival-island-history-launch",
  version: "1.0.0",
  interaction: "navigation",
  replayLabel: "Choose another moment in history",
  kicker: "Survival Island Story Lab \xB7 History sends a distress signal",
  headline: "Three moments in history. One person whose fate is yours to write.",
  invitation: "The weather is turning. Somewhere beyond the next wave, a real historical moment is about to collide with a fictional life. Choose where your story begins.",
  sceneLabel: "THE HORIZON IS CLOSING \xB7 CHOOSE YOUR HISTORICAL LAUNCH",
  sceneCaption: "Each option gives you real-world boundaries and one fictional person caught inside them. History sets the conditions. Your character\u2019s choices create the adventure.",
  sceneBadge: { primary: "3 historical launches", secondary: "1 branching story" },
  transition: { style: "spotlight", label: "The storm crosses time" },
  media: launchMedia(
    "A fictional young survivor faces a stormy horizon with a Pacific voyaging canoe, an eighteenth-century ship, and an Antarctic lifeboat."
  ),
  dialogue: [],
  prompt: "Where does your survivor\u2019s first impossible choice happen?",
  revealButton: "Reveal this person\u2019s first crisis",
  choices: [
    {
      id: "pacific-wayfinding",
      thinking: {
        prompt: "The stars vanish. What does your character do?",
        starter: "My first story moment\u2026",
        guide: "Invent a character and show an action using a real clue: waves, wind, birds, or sky. Show what they do, instead of explaining the whole adventure."
      },
      label: "The stars vanish",
      detail: "A fictional apprentice wayfinder must read waves, wind, birds, and sky after storm clouds hide the stars.",
      image: launchArt,
      imageAlt: "A double-hulled Pacific voyaging canoe travels beneath a storm-darkened sky.",
      badge: "PACIFIC VOYAGING \xB7 WAYFINDING",
      result: {
        title: "The island is ahead. The sky refuses to say where.",
        text: "The last guiding star disappears. A current pulls the canoe sideways, and the crew turns toward your fictional apprentice. They noticed one sign everyone else missed\u2014but speaking now could save the voyage or destroy the crew\u2019s trust.",
        evidence: "Historical anchor: Polynesian navigators used deeply learned observations of stars, waves, winds, clouds, birds, and other environmental signs. Portray that knowledge as expertise, not luck or magic.",
        surprise: "THE OCEAN HAS BEEN LEAVING CLUES.",
        media: launchMedia(
          "Lightning reveals a Pacific voyaging canoe while a fictional apprentice watches the changing sea."
        ),
        metrics: [
          { label: "What disappears", value: "The stars" },
          { label: "What remains", value: "Ocean signs" }
        ],
        source: {
          label: "Smithsonian: H\u014Dk\u016Ble\u02BBa and Hawaiian wayfinding",
          url: "https://folklife.si.edu/magazine/hokulea-hawaiian-wayfinding"
        }
      }
    },
    {
      id: "selkirk-1709",
      thinking: {
        prompt: "A ship appears. What does your character risk?",
        starter: "My first story moment\u2026",
        guide: "Write a fictional action within this historical setting. Give your character a choice with a cost. Save the complete plot for later."
      },
      label: "A fire on the deserted shore",
      detail: "On 2 February 1709, a fictional young deckhand approaches the island where Alexander Selkirk has survived alone.",
      image: launchArt,
      imageAlt: "An early-eighteenth-century sailing ship waits offshore as a storm reaches an island.",
      badge: "M\xC1S A TIERRA \xB7 1709",
      result: {
        title: "A stranger runs toward the sea. The landing boat breaks loose.",
        text: "Someone in goatskins is racing down the mountain. Then a wave takes the boat. Your fictional deckhand has seconds to protect the crew, reach the survivor, or recover the only object that proves why this expedition came here.",
        evidence: "Historical anchor: Alexander Selkirk was rescued on 2 February 1709 after four years and four months alone. That outcome stays true; your fictional character\u2019s crisis unfolds around it.",
        surprise: "RESCUE HAS BECOME A SURVIVAL STORY.",
        media: launchMedia(
          "A wooden sailing ship waits beyond rough surf while a fictional deckhand faces the island."
        ),
        metrics: [
          { label: "Known history", value: "Selkirk is rescued" },
          { label: "Your unknown", value: "What it costs" }
        ],
        source: {
          label: "Historic Environment Scotland: Selkirk\u2019s rescue",
          url: "https://blog.historicenvironment.scot/2020/01/incredible-voyages/"
        }
      }
    },
    {
      id: "elephant-island-1916",
      thinking: {
        prompt: "The boat is leaving. What does your character do?",
        starter: "My first story moment\u2026",
        guide: "Show one action in the cold, isolated setting. Your fictional character can choose, but cannot change the documented rescue events."
      },
      label: "The rescue boat disappears",
      detail: "On 24 April 1916, a fictional expedition assistant watches six men leave Elephant Island to seek rescue.",
      image: launchArt,
      imageAlt: "A small lifeboat crosses icy water as a storm gathers over Elephant Island.",
      badge: "ELEPHANT ISLAND \xB7 1916",
      result: {
        title: "The boat becomes a black dot. The ice begins to crack.",
        text: "The James Caird vanishes into freezing spray. Behind your fictional character, the shelter starts to fail\u2014and a hidden message could divide the stranded camp before help can ever return.",
        evidence: "Historical anchor: the Endurance crew reached Elephant Island, six men left on an 800-mile rescue journey, and all 28 real crew members ultimately survived. Your branches must protect those facts.",
        surprise: "THE WAITING MAY BE THE HARDEST VOYAGE.",
        media: launchMedia(
          "A fictional expedition assistant watches a lifeboat leave an icebound island under storm clouds."
        ),
        metrics: [
          { label: "Rescue voyage", value: "800 miles" },
          { label: "People who survived", value: "All 28" }
        ],
        source: {
          label: "Royal Museums Greenwich: Antarctic explorers",
          url: "https://www.rmg.co.uk/stories/maritime-history/history-antarctic-explorers"
        }
      }
    }
  ],
  mission: {
    title: "History fixes the horizon. You decide what the person does next.",
    invitation: "Carry your chosen moment into the Story Lab. Build a fictional protagonist, face them with consequential choices, and check every branch against the real historical anchor.",
    image: launchArt,
    imageAlt: "A lone fictional survivor faces three historically inspired island horizons beneath a dramatic storm.",
    deliverable: "A playable branching historical-fiction story",
    steps: [
      "Anchor the opening in a researched historical moment.",
      "Write a fictional character whose choices reveal what they value.",
      "Playtest every path for consequence, continuity, and historical respect."
    ],
    finishButton: "Launch my historical adventure"
  }
};

// src/app/projects/project-intros.ts
var projectIntros = [
  {
    capabilityId: "project.intro",
    schemaVersion: "1.0",
    projectId: "mystery-substance",
    teaser: unlabeledShelfTeaser,
    version: "1.0.0",
    theme: "laboratory",
    image: "/lab-investigation-room-v2.webp",
    imageAlt: "An investigation laboratory with a workbench, equipment, and evidence shelves.",
    kicker: "Incoming case \xB7 Four vials. Zero labels.",
    headline: "Someone mixed up the labels. Can you uncover the truth?",
    story: "Professor Pip is certain two clear samples are identical. His robot, Beep, is less convinced. One test, one spectacular POOF, and four unlabeled mystery vials later, the lab needs a new lead scientist. That\u2019s you. Follow the evidence and solve the case Pip\u2019s confidence couldn\u2019t.",
    hook: "If two substances look the same, how could you prove they are different?",
    role: "Lead evidence scientist",
    challenge: {
      title: "First, sharpen your detective eyes.",
      context: "A practice vial holds a white powder. Which statement is an observation you can make just by looking?",
      options: [
        {
          id: "observation",
          label: "\u201CI see a white powder.\u201D",
          detail: "Describe what is visible.",
          feedback: "That is a direct observation. It describes the sample without deciding what the substance is."
        },
        {
          id: "identity",
          label: "\u201CIt must be salt.\u201D",
          detail: "Name the substance.",
          feedback: "That is an inference: a possible explanation. Many substances are white, so a test would help you check it."
        },
        {
          id: "prediction",
          label: "\u201CIt will dissolve in water.\u201D",
          detail: "Predict a test result.",
          feedback: "That is a prediction. You would need a controlled test and a recorded result before calling it an observation."
        }
      ],
      takeaway: "Notice first. Test fairly. Explain what the evidence supports. All testing in this project takes place in the virtual lab."
    },
    decision: {
      prompt: "Which mystery vial would you investigate first?",
      options: [
        {
          id: "vial-a",
          label: "Vial A",
          detail: "Start here and establish a careful testing routine."
        },
        {
          id: "vial-b",
          label: "Vial B",
          detail: "Start here and look for properties you can compare."
        },
        {
          id: "vial-c",
          label: "Vial C",
          detail: "Start here and challenge your first impression."
        },
        { id: "vial-d", label: "Vial D", detail: "Start here and record what is still unknown." }
      ],
      reasonPrompt: "What would you look for or test first, and why?",
      reasonHint: "I would start by observing\u2026 Then I would test\u2026 because\u2026",
      questionPrompt: "What question should your investigation answer?",
      questionHint: "How could I tell whether\u2026?"
    },
    mission: [
      "Collect observations and run fair virtual tests.",
      "Build and revise a theory using your results.",
      "Present a case file that restores the labels with evidence."
    ],
    action: "Open the Evidence Locker",
    finalExample: {
      button: "Open a completed case-file example",
      format: "Case file + scientific defense",
      title: "Case closed: the practice sample",
      introduction: "An invented practice case shows the shape of a finished scientific argument. Its sample and results are separate from the four-vial investigation.",
      chapters: [
        {
          label: "01 \xB7 Claim",
          title: "A conclusion you can check",
          studentWork: "\u201CI think practice sample X matches reference R. I compared more than its color before making this claim.\u201D",
          evidence: "Practice evidence card: X and R were both white powders. Appearance alone could not distinguish them from the other references.",
          teacherNote: "Look for a clear claim with an appropriately cautious level of certainty."
        },
        {
          label: "02 \xB7 Evidence",
          title: "Show the test, not just the answer",
          studentWork: "\u201CIn our invented test, 2 g of X dissolved in 20 mL of water. Reference R did too. I kept the amount, water volume, and stirring time the same.\u201D",
          evidence: "Example result table: X\u2014dissolved; R\u2014dissolved; S\u2014did not dissolve. A second test is still needed to distinguish X from any other soluble reference.",
          teacherNote: "The student connects measurements and fair-test conditions to the claim and names what a single test cannot prove."
        },
        {
          label: "03 \xB7 Reflection",
          title: "Make the change in thinking visible",
          studentWork: "\u201CAt first I chose by color. Now I would compare several properties, because different substances can look alike. If another reference matches all my results, I would revise my claim.\u201D",
          evidence: "Opening response \u2192 test record \u2192 revised explanation. The completed project brings these pieces together in a case file.",
          teacherNote: "Assess how evidence changed the explanation, rather than rewarding a lucky initial guess."
        }
      ],
      lookFors: [
        "A claim linked to specific results",
        "Fair tests and accurate observations",
        "Limits, uncertainty, and visible revisions"
      ]
    }
  },
  {
    capabilityId: "project.intro",
    schemaVersion: "1.0",
    projectId: "frontier-trading-company",
    teaser: frontierTeaser,
    version: "1.0.1",
    theme: "frontier",
    image: "/project-intros/frontier/trading-town-launch-poster.webp",
    imageAlt: "Rowan welcomes you beside his trading wagon and ledger at sunset.",
    kicker: "Your charter is waiting \xB7 Make every dollar count",
    headline: "An empty wagon. A new company. Your big move.",
    story: "The trading season is opening, and your company has $200 to get started. Stock costs money. Cargo takes space. A promising destination can become an expensive mistake. Can your math turn a small start into a smart season?",
    hook: "Would you choose the biggest possible profit\u2014or the plan most likely to survive a surprise?",
    role: "Company founder & chief strategist",
    challenge: {
      title: "Which crate earns its space?",
      context: "Practice offer: both crates take 2 cargo spaces. Crate A costs $12 and may sell for $18. Crate B costs $20 and may sell for $25. Ignore travel costs for this warm-up.",
      options: [
        {
          id: "crate-a",
          label: "Crate A \xB7 $6 possible profit",
          detail: "$18 sale \u2212 $12 cost. Uses $6 per cargo space to buy.",
          feedback: "A has the larger possible profit: $6 compared with $5. It also leaves more cash available. The sale is a forecast, not a guarantee."
        },
        {
          id: "crate-b",
          label: "Crate B \xB7 $5 possible profit",
          detail: "$25 sale \u2212 $20 cost. Uses $10 per cargo space to buy.",
          feedback: "B has the higher sale price, but A has the higher possible profit. Subtract the purchase cost before comparing\u2014and then consider travel costs and risk."
        },
        {
          id: "wait",
          label: "Ask about the market first",
          detail: "How reliable are these sale prices?",
          feedback: "Useful question. Forecasts can change. With the given prices A has $6 possible profit and B has $5, but evidence about demand could change the decision."
        }
      ],
      takeaway: "Sale price, profit, capacity, and risk tell different parts of the story. A strong trader explains the whole decision."
    },
    decision: {
      prompt: "What kind of trading strategy will you try first?",
      options: [
        {
          id: "careful",
          label: "Keep a safety cushion",
          detail: "Hold cash back and protect against surprises."
        },
        {
          id: "balanced",
          label: "Balance reward and risk",
          detail: "Mix promising trades with a reserve."
        },
        {
          id: "bold",
          label: "Chase a bigger opportunity",
          detail: "Accept more risk for a possible larger return."
        }
      ],
      reasonPrompt: "Why does this strategy make sense? Make one prediction.",
      reasonHint: "I predict\u2026 because\u2026 I will keep track of\u2026",
      questionPrompt: "What information could change your plan?",
      questionHint: "Before spending my money, I want to know\u2026"
    },
    mission: [
      "Plan purchases, capacity, and routes using math.",
      "Record decisions and adjust when conditions change.",
      "Defend your company\u2019s season with a financial record and explanation."
    ],
    action: "Open the Trading Post",
    finalExample: {
      button: "Explore a completed company-defense example",
      format: "Season ledger + strategy defense",
      title: "The small reserve that saved our season",
      introduction: "A fictional company\u2019s short defense models how a student can use calculations and decisions to explain a result. Figures are illustrative, not a saved simulation run.",
      chapters: [
        {
          label: "01 \xB7 Plan",
          title: "Give every dollar a job",
          studentWork: "\u201CWe started with $200. We used $120 for stock and planned $30 for travel. That left a $50 reserve. We chose a smaller first trade so we could respond to changes.\u201D",
          evidence: "Opening budget: $200 \u2212 $120 \u2212 $30 = $50 reserve.",
          teacherNote: "Check that the spending plan balances and that the student explains the purpose of the reserve."
        },
        {
          label: "02 \xB7 Decision",
          title: "A surprise changes the numbers",
          studentWork: "\u201COur fictional trip added a $10 repair. We kept the planned route because the expected sales still covered our costs, but we reduced our profit forecast.\u201D",
          evidence: "Example ledger: sales $180; stock $120; travel $30; repair $10. Net gain: $20. Ending cash: $220.",
          teacherNote: "Look for the full cost of the decision, a correct calculation, and an explanation of the alternative considered."
        },
        {
          label: "03 \xB7 Defense",
          title: "Explain more than the ending balance",
          studentWork: "\u201COur reserve did not make the trade more profitable, but it helped us absorb the repair. Next season we would compare profit per cargo space before buying more stock.\u201D",
          evidence: "Presentation sequence: opening plan \u2192 key decisions \u2192 ledger \u2192 revised strategy.",
          teacherNote: "A persuasive defense uses numerical evidence and acknowledges the tradeoff, even if the company did not earn the largest profit."
        }
      ],
      lookFors: [
        "Accurate costs, revenue, and net profit",
        "Reasons for route and cargo choices",
        "A revision backed by the season\u2019s evidence"
      ]
    }
  },
  {
    capabilityId: "project.intro",
    schemaVersion: "1.0",
    projectId: "objects-that-changed-us",
    teaser: museumTeaser,
    version: "1.1.0",
    theme: "museum",
    model: museumTeaser.media.model,
    imageAlt: "A rotatable model of Nefertiti\u2019s bust.",
    kicker: "A new museum wing \xB7 One story only you can tell",
    headline: "An object can be silent. Your exhibit gives it a voice.",
    story: "An empty place in the museum is waiting for your collection. Families will walk in knowing little about these objects. Your challenge: help them discover how objects shaped life in ancient Egypt\u2014and what the objects cannot tell us on their own.",
    hook: "What could an everyday object reveal about an entire civilization?",
    role: "Museum curator",
    challenge: {
      title: "Which label makes a visitor think?",
      context: "Imagine a display of a writing tool and a record of stored grain. Choose the label that best connects the objects to a historical question.",
      options: [
        {
          id: "description",
          label: "\u201CA writing tool and a grain record.\u201D",
          detail: "Identify what is in the case.",
          feedback: "A useful start, but the visitor still needs an explanation. What could these objects help us understand about work, resources, or power?"
        },
        {
          id: "connection",
          label: "\u201CWho could keep track of a harvest?\u201D",
          detail: "Use the tool and record to investigate how information was recorded and used.",
          feedback: "This label invites a historical investigation. Your sources must still support what you say about the people who wrote and used the records."
        },
        {
          id: "overclaim",
          label: "\u201CEveryone in Egypt could write.\u201D",
          detail: "Make a claim about everyone from one display.",
          feedback: "That claim is too broad for these two objects. Ask whose experiences the objects represent and whose are missing."
        }
      ],
      takeaway: "A compelling exhibit connects an object, a claim, and a source. It makes space for questions the evidence cannot answer yet."
    },
    decision: {
      prompt: "Which collection would you like to investigate?",
      options: [
        { id: "nile", label: "Nile Life", detail: "Food, water, work, and everyday objects." },
        {
          id: "scribes",
          label: "Scribes & Power",
          detail: "Writing, records, and who used information."
        },
        { id: "afterlife", label: "Afterlife", detail: "Objects, beliefs, and remembrance." },
        {
          id: "builders",
          label: "Builders & Engineers",
          detail: "Tools, materials, and ambitious structures."
        }
      ],
      reasonPrompt: "What would you want a visitor to discover, and why?",
      reasonHint: "I want visitors to wonder about\u2026 because\u2026",
      questionPrompt: "What is your first research question?",
      questionHint: "What can these objects tell us about\u2026?"
    },
    mission: [
      "Research a collection and connect claims to sources.",
      "Add artifacts and write labels in your assigned museum room.",
      "Submit your room for the final class exhibition."
    ],
    action: "Open My Assigned Room",
    finalExample: {
      button: "Tour a completed exhibition example",
      format: "3D museum rooms + curator-tour transcript",
      title: "Behind the object: a curator\u2019s story",
      introduction: "Visit furnished rooms in a fixed museum and explore each artifact\u2019s labels and sources. The curator transcript provides a reading companion to the exhibition.",
      chapters: [
        {
          label: "01 \xB7 Entrance panel",
          title: "Begin with an idea",
          studentWork: "\u201COur exhibit asks how people kept track of important resources. The writing tool and grain record help us investigate the connection between objects and information.\u201D",
          evidence: "Exhibit structure: central question \u2192 selected objects \u2192 source-supported labels.",
          teacherNote: "The objects support one coherent inquiry instead of becoming an unrelated collection of facts."
        },
        {
          label: "02 \xB7 Object label",
          title: "Put the evidence beside the claim",
          studentWork: "\u201CThis record is evidence of information being written down. It does not show that everyone could write. We need the source description and its context to identify who made it and why.\u201D",
          evidence: "A finished label includes an object title, source citation, interpretation, and a limit on the claim.",
          teacherNote: "Look for a clear distinction between an observation, an interpretation, and an unanswered question."
        },
        {
          label: "03 \xB7 Curator tour",
          title: "Guide a visitor through the reasoning",
          studentWork: "\u201CStart with our question. Compare the two objects. Read the sources beside them. Before you leave, consider whose lives are visible in this collection and whose stories we still need.\u201D",
          evidence: "Presentation: museum board, linked source list, and a student-recorded curator tour with an accessible transcript.",
          teacherNote: "The public explanation should be understandable to a family audience and credit the sources used."
        }
      ],
      lookFors: [
        "A coherent historical question",
        "Source-supported labels and acknowledged limits",
        "A clear, accessible public tour"
      ]
    }
  },
  {
    capabilityId: "project.intro",
    schemaVersion: "1.0",
    projectId: "history-live-revolutionary-war",
    teaser: newsroomTeaser,
    version: "1.1.0",
    theme: "broadcast",
    image: bostonAftermathScene.image,
    imageAlt: bostonAftermathScene.alt,
    kicker: "Developing story \xB7 Your newsroom needs a reporter",
    headline: "Two networks. Conflicting headlines. What will you put on air?",
    story: "You are stepping into a newsroom covering the American Revolution. Reports are arriving from different sides. Some describe events. Others make claims. Your job is to produce a gripping report that an audience can trust.",
    hook: "Can you report from a point of view without bending the evidence?",
    role: "Historical correspondent",
    challenge: {
      title: "Hold the headline. Check the claim.",
      context: "Practice dispatch: a letter says, \u201CI heard that every shop has closed.\u201D No second source has arrived. How should the newsroom treat the claim that every shop is closed?",
      options: [
        {
          id: "fact",
          label: "Verified fact",
          detail: "Publish \u201CEvery shop is closed.\u201D",
          feedback: "The letter proves someone reported hearing the claim. It does not verify that every shop closed. Look for independent evidence."
        },
        {
          id: "unconfirmed",
          label: "Unconfirmed report",
          detail: "Attribute the claim and seek another source.",
          feedback: "Yes\u2014identify who made the report, make the uncertainty clear, and verify before presenting the claim as fact."
        },
        {
          id: "future",
          label: "Use what happens later",
          detail: "Fill in the gaps with information from the future.",
          feedback: "A report set at a historical moment must distinguish what reporters could know then from what historians learned later."
        }
      ],
      takeaway: "Perspective shapes a story. Verification earns trust. Keep facts, interpretations, and unconfirmed reports distinct."
    },
    decision: {
      prompt: "Which reporting lens would you like to explore?",
      options: [
        {
          id: "patriot",
          label: "Continental / Patriot perspective",
          detail: "Investigate the case for resistance and independence."
        },
        {
          id: "crown",
          label: "Crown / British perspective",
          detail: "Investigate the case for authority and continued union."
        },
        {
          id: "undecided",
          label: "Compare before choosing",
          detail: "Read accounts from both networks first."
        }
      ],
      reasonPrompt: "What makes this lens interesting? What might it leave out?",
      reasonHint: "This lens might help me understand\u2026 I will also need to check\u2026",
      questionPrompt: "What must you verify before going on air?",
      questionHint: "Before reporting that\u2026, I need evidence from\u2026"
    },
    mission: [
      "Pitch a story and verify sources available at that moment.",
      "Write and record a report that distinguishes evidence from interpretation.",
      "Present your news package in a class broadcast."
    ],
    action: "Enter the Newsroom",
    finalExample: {
      button: "Explore a completed special-report example",
      format: "News package + source notes",
      title: "Before we go live: a report you can trust",
      introduction: "A fictional newsroom example demonstrates the structure of a finished special report. The transcript models verification; it is not a recording of a student or a claim about a particular historical event.",
      chapters: [
        {
          label: "01 \xB7 Anchor opening",
          title: "Tell viewers what is known",
          studentWork: "\u201CWe have received a report of shop closures. One letter describes the rumor, but we have not verified how many shops are affected. Our correspondent is comparing accounts.\u201D",
          evidence: "Source note: one attributed letter; the wider claim remains unconfirmed.",
          teacherNote: "Listen for precise language that keeps the source and the claim separate."
        },
        {
          label: "02 \xB7 Correspondent",
          title: "Make competing perspectives visible",
          studentWork: "\u201COur network is investigating why some people support the protest. Another account emphasizes disruption. We will show what each account says and identify which details they agree on.\u201D",
          evidence: "Source wall \u2192 verified script claims \u2192 attribution in the finished report.",
          teacherNote: "A chosen network perspective should shape the questions, while evidence still controls the factual claims."
        },
        {
          label: "03 \xB7 Sign-off",
          title: "Leave the audience informed",
          studentWork: "\u201CWe will update this story when independent evidence confirms the scale of the closures. For now, the reason for the disagreement is part of the story.\u201D",
          evidence: "Final package: student recording, transcript, source credits, and a reflection on reporting choices.",
          teacherNote: "The report can be engaging while admitting uncertainty. Assess the evidence trail as well as delivery."
        }
      ],
      lookFors: [
        "Verified, attributed claims",
        "Fair treatment of different perspectives",
        "A clear script, source credits, and reflection"
      ]
    }
  },
  {
    capabilityId: "project.intro",
    schemaVersion: "1.0",
    projectId: "the-fate-of-the-republic",
    teaser: senateTeaser,
    version: "1.0.0",
    theme: "senate",
    image: "/debate-studio/roman-senate-chamber.webp",
    imageAlt: "The Roman Senate chamber with tiered seats surrounding a central speaking floor.",
    kicker: "The Senate is gathering \xB7 Your voice carries weight",
    headline: "The Republic is at a crossroads. Take a stand worth defending.",
    story: "Rome\u2019s senators disagree about Caesar and the future of the Republic. The chamber needs more than a powerful speech. It needs reasons, historical evidence, and someone willing to answer the strongest opposing argument.",
    hook: "Was Caesar the leader Rome needed\u2014or a threat to the Republic?",
    role: "Senator & evidence-based advocate",
    challenge: {
      title: "Which response belongs on the Senate floor?",
      context: "An opposing speaker argues: \u201COne powerful leader is the only way to restore stability.\u201D Which reply gives you the strongest starting point for an evidence-based rebuttal?",
      options: [
        {
          id: "attack",
          label: "\u201COnly a fool would believe that.\u201D",
          detail: "Attack the speaker.",
          feedback: "That attacks a person instead of answering the claim. Challenge the reasoning and evidence while respecting the speaker."
        },
        {
          id: "rebuttal",
          label: "\u201CWhat limits would protect the Republic?\u201D",
          detail: "Test the claim and seek evidence about power and accountability.",
          feedback: "This targets the argument\u2019s key assumption. Now use historical sources to explain whether stability required concentrated power and what the consequences were."
        },
        {
          id: "repeat",
          label: "\u201CThe Republic must survive!\u201D",
          detail: "Repeat a forceful slogan.",
          feedback: "A slogan can communicate your position, but it does not yet answer the opposing argument. Add a claim, evidence, and reasoning."
        }
      ],
      takeaway: "A rebuttal answers an argument. Strong speakers can explain the other side fairly before showing where the evidence leads."
    },
    decision: {
      prompt: "Where does your thinking begin?",
      options: [
        {
          id: "needed",
          label: "Rome needed his leadership",
          detail: "I want to investigate the case for decisive leadership."
        },
        {
          id: "threat",
          label: "His power threatened the Republic",
          detail: "I want to investigate the case for limits on power."
        },
        {
          id: "undecided",
          label: "I need more evidence",
          detail: "I want to compare the strongest cases before deciding."
        }
      ],
      reasonPrompt: "What is your first reason for that position?",
      reasonHint: "My starting view is\u2026 because\u2026 I am still uncertain about\u2026",
      questionPrompt: "What evidence could change your mind?",
      questionHint: "I would reconsider if a reliable source showed\u2026"
    },
    mission: [
      "Build a claim using historical sources.",
      "Respond fairly to a strong opposing argument.",
      "Record a Senate address and reflect after the class proceeding."
    ],
    action: "Take My Seat in the Senate",
    finalExample: {
      button: "Explore a final Senate-proceeding example",
      format: "Senate address + rebuttal + reflection",
      title: "An argument that can withstand a challenge",
      introduction: "A model address outline shows the reasoning a completed debate should make visible. Students supply historical citations from their project sources; this preview is not an answer key or a completed historical evidence set.",
      chapters: [
        {
          label: "01 \xB7 Opening address",
          title: "State the question behind the speech",
          studentWork: "\u201CSenators, stability matters. My argument asks whether the power used to achieve it can remain accountable. I will compare what our sources show about leadership and limits.\u201D",
          evidence: "The final address needs a precise claim and citations to the historical evidence used to support it.",
          teacherNote: "Assess the claim and its evidence, not whether the student chose a preferred side."
        },
        {
          label: "02 \xB7 Rebuttal",
          title: "Answer the strongest opposing case",
          studentWork: "\u201CThe opposing speaker argues that concentrated power could end disorder. That is a serious concern. My response is to ask what evidence shows whether the proposed limits would work.\u201D",
          evidence: "Rebuttal structure: opposing claim \u2192 fair summary \u2192 source-supported response \u2192 implication for the verdict.",
          teacherNote: "The response should address the actual opposing argument and avoid substituting personal attacks or slogans."
        },
        {
          label: "03 \xB7 Reflection",
          title: "Show intellectual movement",
          studentWork: "\u201CMy opening view focused on leadership. The debate made me ask more about accountability. I would now qualify my claim and identify the source that changed my reasoning.\u201D",
          evidence: "Class presentation: ordered Senate addresses and rebuttals, followed by individual reflection on the proceeding.",
          teacherNote: "Compare the saved opening response with the final reflection to identify growth, uncertainty, and evidence-based revision."
        }
      ],
      lookFors: [
        "A claim supported by historical citations",
        "A fair, direct rebuttal",
        "A reflection linked to the initial position"
      ]
    }
  },
  {
    capabilityId: "project.intro",
    schemaVersion: "1.0",
    projectId: "race-around-the-world",
    teaser: voyageTeaser,
    version: "1.1.0",
    theme: "atlas",
    image: "/journey-replay/world-atlas-v1.webp",
    imageAlt: "An illustrated world atlas with coastlines, oceans, and an expedition atmosphere.",
    kicker: "Lisbon \xB7 1501 \xB7 Your own path through history",
    headline: "History keeps its course. Where will you stand?",
    story: "Lead a fictional crew within a documented historical world. Choose the company you keep, the side you support in a local dilemma, and the route you travel. Those choices shape what you witness, your obligations, and your personal account. Real voyages, treaties, and historical outcomes remain unchanged. People you encounter have decisions and histories of their own.",
    hook: "Can you defend your route when the shortest line is not the wisest journey?",
    role: "Fictional crew captain and witness",
    challenge: {
      title: "Two routes. One decision to defend.",
      context: "Practice chart: Route A is shorter, but its winds and resupply points are uncertain. Route B is longer, with recorded winds and a known resupply stop. What would you recommend?",
      options: [
        {
          id: "short",
          label: "Try the shorter route",
          detail: "Save distance, but prepare for missing information.",
          feedback: "A shorter route may use less time\u2014but distance alone does not predict sailing time or safety. What evidence about wind and supplies would justify the risk?"
        },
        {
          id: "supported",
          label: "Use the documented route",
          detail: "Accept extra distance for more planning information.",
          feedback: "Known winds and resupply can support a plan. You still need to weigh the extra distance, supply use, and reliability of the reports."
        },
        {
          id: "investigate",
          label: "Investigate before choosing",
          detail: "Compare wind notes, charts, and supply estimates.",
          feedback: "You have identified a useful next step. Name which missing evidence matters most so your investigation leads to a decision."
        }
      ],
      takeaway: "The map records your path. Your explanations show why you took it. The consequences include more than the expedition\u2019s own success."
    },
    decision: {
      prompt: "Whose company would you choose for your voyage?",
      options: [
        {
          id: "trade",
          label: "Join the merchant venture",
          detail: "Consider profit, exchange, and the interests of trading partners."
        },
        {
          id: "mapping",
          label: "Sail with the chartmakers",
          detail: "Reduce uncertainty and document what your sources can support."
        },
        {
          id: "influence",
          label: "Serve a sponsor\u2019s agent",
          detail: "Examine the council\u2019s ambitions and consequences for other communities."
        }
      ],
      reasonPrompt: "Why this purpose? Predict one difficult choice your crew may face.",
      reasonHint: "I propose\u2026 because\u2026 A difficult choice might be\u2026",
      questionPrompt: "Whose perspective or what evidence must you seek?",
      questionHint: "Before deciding\u2026, I need to understand\u2026"
    },
    mission: [
      "Use maps and sources to defend each decision.",
      "Keep a log of your route, tradeoffs, and consequences.",
      "Present a replay of your expedition and explain how your thinking changed."
    ],
    action: "Set Sail from Lisbon",
    finalExample: {
      button: "Play a completed expedition example",
      format: "Guided route replay + captain\u2019s explanations",
      title: "Team Compass: the journey behind the line",
      introduction: "Step through an illustrative expedition story. This text replay models the final presentation; it is separate from your saved voyage and contains no student recordings.",
      chapters: [
        {
          label: "01 \xB7 Lisbon \xB7 Departure",
          title: "A route begins with a reason",
          studentWork: "\u201CWe began by wanting the shortest route. After comparing the practice wind notes and resupply information, we chose the better-documented route and recorded the tradeoff.\u201D",
          evidence: "Replay checkpoint: map location + chosen route + cited evidence + the crew\u2019s explanation.",
          teacherNote: "Look for geographic evidence that actually influenced the decision, rather than a citation added after the fact."
        },
        {
          label: "02 \xB7 At sea \xB7 Revision",
          title: "Explain the change in course",
          studentWork: "\u201CIn this example, falling supplies changed our priorities. We chose to resupply rather than continue toward the original goal. That cost time, but reduced our uncertainty about the next leg.\u201D",
          evidence: "Decision record: original plan \u2192 changing conditions \u2192 alternative considered \u2192 revised route.",
          teacherNote: "The path and the explanation should agree. A strong reflection identifies the cost of the revised choice."
        },
        {
          label: "03 \xB7 Return \xB7 Reflection",
          title: "Success depends on whose story you tell",
          studentWork: "\u201COur captain\u2019s log is only one account. We would compare it with the community\u2019s account of the encounter. Our final explanation must consider consequences for people beyond our crew.\u201D",
          evidence: "Final presentation: saved route, ordered decision checkpoints, student explanations, sources, and a concluding reflection.",
          teacherNote: "Use the replay to assess decisions and historical perspective, not just whether the expedition reached its destination."
        }
      ],
      lookFors: [
        "A recorded route with evidence-based explanations",
        "Visible alternatives, tradeoffs, and revisions",
        "Consideration of affected communities"
      ]
    }
  },
  {
    capabilityId: "project.intro",
    schemaVersion: "1.0",
    projectId: "survival-island-story-lab",
    teaser: survivalIslandHistoryTeaser,
    version: "1.2.0",
    theme: "island-story",
    image: "/narrative-studio/survival-island-history-launch-v1.jpg",
    imageAlt: "A fictional young survivor faces three historically inspired island horizons beneath a storm.",
    kicker: "History sends a distress signal \xB7 Choose when it reaches shore",
    headline: "A real moment in history is about to become your character\u2019s greatest test.",
    story: "Choose a Pacific wayfinding voyage, Selkirk\u2019s 1709 rescue, or the Endurance crew\u2019s wait on Elephant Island in 1916. Then place one fictional person inside that historical pressure. The facts set the horizon\u2014but the story does not exist until you decide what happens next.",
    hook: "When history controls the conditions, how will your character\u2019s choices change their fate?",
    role: "Historical-fiction narrative designer",
    challenge: {
      title: "Which reader choice carries the strongest story pressure?",
      context: "The storm is approaching. The protagonist sees smoke beyond the trees and also hears someone calling from a flooded cave.",
      options: [
        {
          id: "direction-only",
          label: "Go left or go right",
          detail: "Choose a direction without revealing what matters.",
          feedback: "Directions can move a character, but the reader cannot yet tell what either path might risk or protect."
        },
        {
          id: "costly-choice",
          label: "Follow the smoke or answer the call",
          detail: "Choose between possible rescue and helping someone in danger.",
          feedback: "Both options protect something and risk something. The choice can reveal the protagonist\u2019s priorities and create different consequences."
        },
        {
          id: "obvious-answer",
          label: "Wait safely or walk into danger",
          detail: "Make one option clearly correct before the reader chooses.",
          feedback: "If one choice is obviously safe and the other is only dangerous, the decision may feel like a quiz. Give both options a believable reason and cost."
        }
      ],
      takeaway: "A meaningful choice is not merely a fork in the trail. It reveals what the character values and changes what becomes possible later."
    },
    decision: {
      prompt: "What kind of pressure do you want your island story to explore?",
      options: [
        {
          id: "courage",
          label: "Courage under pressure",
          detail: "A character must act while afraid and discover what courage actually requires."
        },
        {
          id: "trust",
          label: "Trust and betrayal",
          detail: "A character must decide whose story to believe when evidence is incomplete."
        },
        {
          id: "responsibility",
          label: "Survival or responsibility",
          detail: "A character must weigh personal safety against protecting someone or something else."
        }
      ],
      reasonPrompt: "Why could that pressure lead to difficult, revealing choices?",
      reasonHint: "This pressure interests me because my character might have to choose between\u2026",
      questionPrompt: "What do you want a player to wonder after making the final choice?",
      questionHint: "After the ending, I want the player to wonder whether\u2026"
    },
    mission: [
      "Build a story bible and map a finishable branching narrative.",
      "Write scenes in your own voice while a coach questions, challenges, and checks.",
      "Playtest multiple paths, revise the consequences, and publish a playable story."
    ],
    action: "Enter the Story Lab",
    finalExample: {
      button: "Play the Grade 5 sample story",
      format: "Playable Grade 5 historical-fiction story + author reflection",
      title: "The Fire Above the Cove",
      introduction: "Play a complete branching story about fictional deckhand Tom\xE1s during Alexander Selkirk\u2019s real rescue on February 2, 1709. Every path protects the historical outcome.",
      chapters: [
        {
          label: "01 \xB7 Opening pressure",
          title: "The Man in Goatskins",
          studentWork: "Tom\xE1s must follow the stranger\u2019s warning or save the rescue boat\u2019s loose rope while a storm reaches the island.",
          evidence: "The first choice offers two understandable goals with different risks, not two unlabeled directions.",
          teacherNote: "Look for character motivation inside the action rather than background information delivered before the story begins."
        },
        {
          label: "02 \xB7 Branch and consequence",
          title: "Different paths reveal different courage",
          studentWork: "One route changes what the protagonist knows; another changes whom the protagonist trusts. Both feed the final decision without becoming identical.",
          evidence: "The branch map and playtest history show that earlier decisions alter later context or available meaning.",
          teacherNote: "A foldback structure is successful when paths converge physically but retain their distinct consequences."
        },
        {
          label: "03 \xB7 Ending and reflection",
          title: "Five endings, including two fatal dead ends",
          studentWork: "Two choices lead to Tom\xE1s\u2019s death. Three endings let him survive in different ways. Every path preserves Selkirk\u2019s real rescue.",
          evidence: "The author can identify a playtest discovery and explain the revision it caused.",
          teacherNote: "Assess control of narrative craft, consequence, continuity, and revision\u2014not whether the student found one preferred ending."
        }
      ],
      lookFors: [
        "A protagonist whose decisions shape the plot",
        "Distinct choices with visible consequences",
        "Consistent details and purposeful revision across paths"
      ]
    }
  },
  robotDeliveryIntro,
  calendarMonumentIntro
];

// src/app/runtime/project-launch/project-intro.registry.ts
var ProjectIntroRegistry = class {
  entries = /* @__PURE__ */ new Map();
  constructor(configs) {
    for (const config of configs) {
      validateIntroConfig(config);
      if (this.entries.has(config.projectId))
        throw new IntroError("CONFIG_INVALID", "Duplicate project opening registration.");
      this.entries.set(config.projectId, config);
    }
  }
  find(projectId) {
    return this.entries.get(projectId);
  }
};
var projectIntroRegistry = new ProjectIntroRegistry(projectIntros);

export {
  projectIntroRegistry
};
//# debugId=45bc6044-e7e5-5f03-8850-9deb08fae9d8
//# sourceMappingURL=chunk-XO5BEQZU.js.map
