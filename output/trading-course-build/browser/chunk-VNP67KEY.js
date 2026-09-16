import {
  ClassJourneyMapComponent
} from "./chunk-D6EU5EB6.js";
import {
  createDemoJourneyClassSummary
} from "./chunk-WXT6AGWE.js";
import {
  JourneyReplayRuntimeService,
  completeJourneyStep,
  createInitialJourneyRecord,
  responseFingerprint,
  reviseJourneyResponse,
  selectJourneyChoice,
  updateJourneyResponseDraft
} from "./chunk-EHZR63UE.js";
import {
  samplePersistence
} from "./chunk-HUXR7BE6.js";
import "./chunk-G7WLRBLS.js";
import {
  JOURNEY_REPLAY_AUTHORITY,
  JOURNEY_REPLAY_CONFIG,
  JOURNEY_REPLAY_DEMO_CLASS_SUMMARY,
  JOURNEY_REPLAY_ENROLLMENT,
  JOURNEY_REPLAY_MEDIA,
  JOURNEY_REPLAY_PERSISTENCE,
  JOURNEY_TUTOR
} from "./chunk-Q2RH2RH4.js";
import {
  ageOfExplorationJourneyConfig
} from "./chunk-KMOLVXW6.js";
import "./chunk-E2VJWGUE.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/projects/completed-samples/journey.sample-data.ts
var journeySampleEnrollment = {
  tenantId: "completed-sample",
  classId: "sample-voyagers",
  studentId: "sample-alex",
  studentDisplayName: "Alex Rivera \xB7 North Star crew",
  classLabel: "Fictional Grade 7 expedition",
  mode: "demo"
};
var drafts = [
  {
    choiceId: "mission-trade",
    draft: {
      planningTargetId: "trade-west-africa",
      planningSubmitted: true,
      responseMode: "text",
      transcript: "",
      text: "We chose trade because ledger-1 shows a hoped-for selling price above the purchase price. That is a motive, not a guaranteed profit: ledger-2 says food, repairs, wages, and losses must be paid. Mapping could help later voyages, but our sponsor wants an exchange we can explain with costs as well as revenue.",
      prediction: "Trade may earn money if the crew survives the route and costs stay below sales.",
      citations: [
        {
          evidenceId: "evidence-spice-ledger",
          paragraphId: "ledger-1",
          explanation: "The difference between buying and hoped-for selling prices explains the sponsor\u2019s motive."
        },
        {
          evidenceId: "evidence-spice-ledger",
          paragraphId: "ledger-2",
          explanation: "Costs can erase that hoped-for return."
        }
      ]
    }
  },
  {
    choiceId: "supply-water",
    draft: {
      responseMode: "text",
      transcript: "",
      text: "We chose extra water and food. Wind-3 explains that delays increase time at sea, while provisions protect the crew and occupy cargo space. Instruments help navigation but cannot replace drinking water. We accept less trade cargo to have a margin if weather delays us.",
      prediction: "The extra provisions should leave a reserve after an unexpected delay.",
      citations: [
        {
          evidenceId: "evidence-wind-chart",
          paragraphId: "wind-3",
          explanation: "Extra water reduces one consequence of delays, at the cost of cargo space."
        }
      ]
    }
  },
  {
    choiceId: "route-choice-islands",
    draft: {
      responseMode: "text",
      transcript: "",
      text: "The island arc heads west to the Azores before turning south toward Cape Verde. Chart-2 explains the extra time and supplies, but a planned refuge is valuable to our crew. We accept the six-week route rather than the shorter direct crossing. The island stop reduces some risk; it does not make the sea predictable.",
      prediction: "We expect to reach Cape Verde with fewer supplies but a planned refuge along the way.",
      citations: [
        {
          evidenceId: "evidence-portolan",
          paragraphId: "chart-2",
          explanation: "The westward detour changes both our map path and our supply budget."
        }
      ]
    }
  },
  {
    choiceId: "storm-west",
    draft: {
      responseMode: "text",
      transcript: "",
      text: "We should turn west because storm-2 says it uses fewer supplies than the southern option. That seems safest for the damaged ship.",
      prediction: "Turning west should preserve more supplies than repairing and continuing south.",
      citations: [
        {
          evidenceId: "evidence-storm-log",
          paragraphId: "storm-2",
          explanation: "The scenario gives the westward choice lower supply cost, but it changes our intended direction."
        }
      ]
    }
  },
  {
    choiceId: "encounter-negotiate",
    draft: {
      responseMode: "text",
      transcript: "",
      text: "We will pause and negotiate. The ship recorder in account-ship calls the meeting peaceful because the crew returned unharmed and wants to leave before weather changes. The community representative in account-community needs provisions for households and says the exchange terms were not agreed. Those are different interests. An unharmed crew does not prove a fair exchange. We need to ask what terms the community accepts and whether the interpreter explained them accurately.",
      prediction: "More time may allow agreement, but the crew cannot assume agreement or count the ship\u2019s gain as everyone\u2019s success.",
      citations: [
        {
          evidenceId: "evidence-port-accounts",
          paragraphId: "account-ship",
          explanation: "The recorder judges the meeting mainly by the crew\u2019s safety and schedule."
        },
        {
          evidenceId: "evidence-port-accounts",
          paragraphId: "account-community",
          explanation: "The community needs to retain household supplies and agree on terms."
        }
      ]
    }
  }
];
function createJourneySample() {
  let record = createInitialJourneyRecord(
    ageOfExplorationJourneyConfig,
    journeySampleEnrollment.studentId,
    "2026-04-10T14:00:00.000Z"
  );
  for (const [index, item] of drafts.entries()) {
    const now = "2026-04-" + String(11 + index).padStart(2, "0") + "T14:00:00.000Z";
    record = selectJourneyChoice(ageOfExplorationJourneyConfig, record, item.choiceId);
    let draft = __spreadProps(__spreadValues({}, structuredClone(item.draft)), {
      evidenceViewed: [...new Set(item.draft.citations?.map((c) => c.evidenceId))]
    });
    if (item.choiceId === "storm-west") {
      draft = __spreadProps(__spreadValues({}, draft), {
        tutorTurns: [
          {
            id: "sample-question-storm",
            stepId: "step-storm",
            choiceId: item.choiceId,
            responseFingerprint: responseFingerprint(draft),
            criterionId: "consequences",
            question: "Safer for whom, and what does turning west give up? Compare the two route costs.",
            answer: "West costs 18 supplies and 4 time units; south costs 25 supplies and 7. West protects more of our reserve, but abandons our intended southern route.",
            createdAt: now,
            source: "scaffold"
          }
        ]
      });
    }
    record = updateJourneyResponseDraft(record, draft);
    record = completeJourneyStep(ageOfExplorationJourneyConfig, record, now);
  }
  const prior = record.completedSteps.find((step) => step.stepId === "step-storm").studentResponse;
  record = reviseJourneyResponse(
    ageOfExplorationJourneyConfig,
    record,
    "step-storm",
    __spreadProps(__spreadValues({}, drafts[3].draft), {
      text: "We turned west with the simulated favorable winds. Storm-1 describes a torn mainsail, and storm-2 explains that west uses fewer supplies but changes our intended direction. We compared 18 supplies and 4 time units for west with 25 supplies and 7 for south. West preserved 7 supplies and 3 time units relative to the alternative. Our actual reserve fell after the storm, so this was still a cost. Protecting the crew meant giving up the southern route; it did not guarantee success at the next encounter.",
      citations: [
        ...drafts[3].draft.citations,
        {
          evidenceId: "evidence-storm-log",
          paragraphId: "storm-1",
          explanation: "The damaged sail explains why continuing into difficult conditions could worsen the problem."
        }
      ],
      tutorTurns: prior.tutorTurns
    }),
    "The scaffold question made me compare both costs and state what our choice sacrificed.",
    "2026-04-16T14:00:00.000Z"
  );
  return record;
}
var journeySampleGuide = {
  title: "Our Class Race Around the World",
  subtitle: "Follow fictional crews through their personal voyages in 1501. Compare their loyalties, routes, experiences, and revised claims within a historical record that stays the same.",
  audience: "Whole-class historical inquiry \xB7 Grade 7",
  duration: "Two presentation modes \xB7 Explore at your pace",
  trail: [
    {
      label: "Opening scene",
      title: "Five crews leave the chart table.",
      text: "The showcase begins with one featured route, then reveals how crews used the same starting evidence to make different plans.",
      evidence: "Mode 1 \u2192 Voyage snapshots presents one group stop by stop."
    },
    {
      label: "Turning point",
      title: "The storm redraws the race.",
      text: "Shared dangers create different consequences as each crew balances time, supplies, safety, and its original purpose.",
      evidence: "The map marks route-changing moments and the ports crews still share."
    },
    {
      label: "Big reveal",
      title: "Different paths. One historical record.",
      text: "Each crew returns with different experiences, costs, and observations. Their choices change their own journey; documented historical events and outcomes continue unchanged.",
      evidence: "Mode 2 \u2192 Class comparison places the featured route against every voyage."
    },
    {
      label: "Reflection",
      title: "Revision becomes part of the story.",
      text: "Class performance summarizes completion, reasoning readiness, teacher review, and the crews that changed their claims.",
      evidence: "The simulated summary includes approved, submitted, and revision-requested records."
    }
  ],
  review: {
    strength: "The final presentation makes both individual reasoning and class-wide patterns visible without collapsing the voyages into one average path.",
    question: "What did each crew protect or sacrifice, and which claims describe its fictional experience rather than the historical record?",
    revision: "Earlier claims remain visible through the class revision count, so the showcase presents learning as a change in reasoning.",
    assessment: "The simulated summary demonstrates geography, cause and consequence, perspective, evidence use, and teacher review. It is a fictional preview, not a live class grade."
  }
};

// src/app/runtime/project-showcase/journey.sample.ts
function loadSample() {
  return __spreadProps(__spreadValues({}, journeySampleGuide), {
    component: ClassJourneyMapComponent,
    inputs: { initialMode: "compare" },
    providers: [
      JourneyReplayRuntimeService,
      { provide: JOURNEY_REPLAY_CONFIG, useValue: ageOfExplorationJourneyConfig },
      {
        provide: JOURNEY_REPLAY_DEMO_CLASS_SUMMARY,
        useValue: createDemoJourneyClassSummary(ageOfExplorationJourneyConfig)
      },
      { provide: JOURNEY_REPLAY_ENROLLMENT, useValue: journeySampleEnrollment },
      { provide: JOURNEY_REPLAY_PERSISTENCE, useValue: samplePersistence(createJourneySample()) },
      { provide: JOURNEY_REPLAY_AUTHORITY, useValue: null },
      { provide: JOURNEY_REPLAY_MEDIA, useValue: null },
      { provide: JOURNEY_TUTOR, useValue: null }
    ]
  });
}
export {
  loadSample
};
//# debugId=a14f17b4-1785-579c-8182-a143567d3735
//# sourceMappingURL=chunk-VNP67KEY.js.map
