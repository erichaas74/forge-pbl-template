import {
  createExchangeLessons
} from "./chunk-FOENF5P4.js";

// src/app/projects/roman-senate-debate/roman-senate-debate.exchange.ts
var romanDebateExchange = {
  schemaVersion: "1.0",
  lessons: createExchangeLessons([
    { title: "Connect a claim to evidence", claim: "Which opening makes a claim the audience can examine?", strongest: 1, sourceIds: ["ev-reforms", "ev-rubicon", "ev-senate-crisis"], choices: [
      { text: "Caesar was popular, so every action he took was right.", feedback: "Popularity does not justify every action. Name a policy and explain its effect." },
      { text: "Caesar\u2019s reforms addressed problems in Rome; his use of military power still needs a separate defense.", feedback: "This limits the claim and leaves room for an objection. Inspect the reform and Rubicon sources to test both parts." }
    ] },
    { title: "Critique the source, then revise", claim: "A speaker cites Cicero as proof that everyone opposed Caesar. What is the strongest critique?", strongest: 0, sourceIds: ["ev-cicero", "ev-dictator", "ev-reforms"], choices: [
      { text: "One elite voice cannot establish what everyone thought. Compare evidence about other groups.", feedback: "Purpose, position and scope matter. Preserve Cicero\u2019s evidence while narrowing the claim it supports." },
      { text: "Cicero had a viewpoint, so none of his evidence can be used.", feedback: "A viewpoint is a reason to examine a source. Ask what it can and cannot show." }
    ] },
    { title: "Answer the strongest objection", claim: "Your opponent argues that Caesar\u2019s reforms helped Rome. Which response engages that claim?", strongest: 1, sourceIds: ["ev-reforms", "ev-dictator", "ev-veterans"], choices: [
      { text: "My opponent wants Rome to have no laws.", feedback: "That is not the stated argument. Summarize the reform claim fairly before responding." },
      { text: "Some reforms may have helped people. That does not settle whether concentrating authority endangered republican government.", feedback: "This separates benefits from the institutional question. Use the dictator source to support the second part." }
    ] },
    { title: "Weigh a closing argument", claim: "Which closing helps a judge compare the cases?", strongest: 0, sourceIds: ["ev-rubicon", "ev-reforms", "ev-dictator", "ev-senate-crisis"], choices: [
      { text: "Compare the benefits of reform with the risks to republican authority, then explain why your evidence carries more weight.", feedback: "State your judgment, weigh the strongest evidence and answer an actual opponent." },
      { text: "Our side spoke most confidently, so our interpretation must be correct.", feedback: "Delivery helps listeners follow a case, but confidence is not historical evidence." }
    ] }
  ], [
    "Name a republican institution and explain its function.",
    "Connect political participation and power to the opposing cases.",
    "Compare Cicero\u2019s perspective with evidence about other groups.",
    "Explain the tradeoff between reform and concentrated authority.",
    "Evaluate a peer\u2019s claim while preserving your earlier version.",
    "Practice clear oral delivery during the exchange.",
    "Ask your teacher for a fresh source detail to test independently.",
    "Explain institutions, law and participation in your final defense."
  ]),
  examples: [
    { name: "Maya \xB7 example", side: "caesarian-reformers", points: ["Judge reforms by the problems they addressed."], speech: "Caesar\u2019s reforms addressed problems in Rome. Their benefits deserve weight, although they do not by themselves justify his military choices.", evidenceIds: ["ev-reforms"] },
    { name: "Noah \xB7 example", side: "republic-defenders", points: ["Military force can threaten civic authority."], speech: "The Rubicon crossing raises a question about military force and civic authority. Even useful reforms do not remove that concern. A defense of Caesar must explain why one leader should hold so much power.", evidenceIds: ["ev-rubicon", "ev-dictator"] },
    { name: "Elena \xB7 example", side: "caesarian-reformers", points: ["Compare Caesar with the Senate\u2019s difficulties."], speech: "The Senate crisis source describes an unstable political setting. That context can explain demands for change, but it does not prove every change was justified.", evidenceIds: ["ev-senate-crisis"] },
    { name: "Sam \xB7 example", side: "republic-defenders", points: ["A source represents a perspective."], speech: "Cicero\u2019s concerns help us examine republican ideals. His position limits what his account tells us about all Romans. I would compare his perspective with the reforms before reaching a judgment.", evidenceIds: ["ev-cicero", "ev-reforms"] }
  ]
};

// src/app/projects/roman-senate-debate/roman-senate-debate.config.ts
var romanSenateDebateConfig = {
  schemaVersion: "2.0",
  template: { id: "debate-studio", version: "2.0" },
  projectId: "the-fate-of-the-republic",
  projectVersion: "3.0.0",
  exchange: romanDebateExchange,
  sessionId: "period-3-senate-session",
  title: "The Fate of the Republic",
  subtitle: "A shared Roman Senate debate",
  historicalSetting: "Rome \xB7 The late Republic \xB7 44 BCE",
  sessionDateLabel: "World History \xB7 Period 3",
  centralQuestion: "Was Julius Caesar a leader Rome needed, or a threat to the Roman Republic?",
  chamberImageUrl: "/debate-studio/roman-senate-chamber.webp",
  chamberImageAlt: "An empty Roman Senate chamber with marble floors, facing benches, bronze braziers, and a central presiding chair.",
  factions: [
    {
      id: "caesarian-reformers",
      name: "Caesarian Reformers",
      railLabel: "Caesarian Reformers",
      shortName: "Caesarian Reformers",
      position: "Caesar\u2019s leadership and reforms were necessary responses to a Republic in crisis.",
      accent: "#c49b58",
      emblem: "C",
      roles: [
        { id: "opening-senator", label: "Opening Senator", roundTypes: ["opening"] },
        { id: "evidence-senator", label: "Evidence Senator", roundTypes: ["response"] },
        { id: "rebuttal-senator", label: "Rebuttal Senator", roundTypes: ["rebuttal"] },
        { id: "crossfire-senator", label: "Crossfire Senator", roundTypes: ["crossfire"] },
        { id: "closing-senator", label: "Closing Senator", roundTypes: ["closing"] }
      ]
    },
    {
      id: "republic-defenders",
      name: "Defenders of the Republic",
      railLabel: "Defenders of the Republic",
      shortName: "Republic",
      position: "Caesar\u2019s concentration of personal power threatened the institutions and liberty of the Republic.",
      accent: "#a94f43",
      emblem: "R",
      roles: [
        { id: "opening-senator", label: "Opening Senator", roundTypes: ["opening"] },
        { id: "evidence-senator", label: "Evidence Senator", roundTypes: ["response"] },
        { id: "rebuttal-senator", label: "Rebuttal Senator", roundTypes: ["rebuttal"] },
        { id: "crossfire-senator", label: "Crossfire Senator", roundTypes: ["crossfire"] },
        { id: "closing-senator", label: "Closing Senator", roundTypes: ["closing"] }
      ]
    }
  ],
  rounds: [
    {
      id: "opening",
      type: "opening",
      label: "Round I \xB7 Independent Openings",
      mode: "parallel",
      moderatorBeforeTurn: false,
      timeLimitSeconds: 90,
      minimumSeconds: 60,
      minimumEvidence: 2,
      allowNewEvidence: true,
      preparationPrompts: [
        "State your faction\u2019s answer to the central question.",
        "Establish the crisis facing the Republic.",
        "Use at least two historical sources.",
        "Explain what Rome risks if your faction is ignored."
      ]
    },
    {
      id: "response",
      type: "response",
      label: "Round II \xB7 The First Exchange",
      mode: "alternating",
      speakerOrder: ["caesarian-reformers", "republic-defenders"],
      moderatorBeforeTurn: true,
      timeLimitSeconds: 75,
      minimumSeconds: 45,
      minimumEvidence: 1,
      allowNewEvidence: true,
      preparationPrompts: [
        "Answer the moderator\u2019s question directly.",
        "Respond to the exact opposing claim you marked.",
        "Use historical evidence.",
        "Explain why that evidence matters.",
        "Connect the answer to Rome\u2019s future."
      ]
    },
    {
      id: "rebuttal",
      type: "rebuttal",
      label: "Round III \xB7 Rebuttal",
      mode: "alternating",
      speakerOrder: ["caesarian-reformers", "republic-defenders"],
      moderatorBeforeTurn: true,
      timeLimitSeconds: 60,
      minimumSeconds: 45,
      minimumEvidence: 1,
      allowNewEvidence: true,
      preparationPrompts: [
        "Name the opponent\u2019s strongest argument fairly.",
        "Show where its reasoning or evidence fails.",
        "Answer with one decisive source.",
        "Explain the tradeoff your faction accepts."
      ]
    },
    {
      id: "crossfire",
      type: "crossfire",
      label: "Crossfire \xB7 The Unresolved Clash",
      mode: "alternating",
      speakerOrder: ["caesarian-reformers", "republic-defenders"],
      moderatorBeforeTurn: true,
      timeLimitSeconds: 45,
      minimumSeconds: 30,
      minimumEvidence: 1,
      allowNewEvidence: false,
      preparationPrompts: [
        "Answer in one clear claim.",
        "Use the strongest evidence already in the record.",
        "Name the consequence for the Republic."
      ]
    },
    {
      id: "closing",
      type: "closing",
      label: "Final Addresses",
      mode: "parallel",
      moderatorBeforeTurn: false,
      timeLimitSeconds: 60,
      minimumSeconds: 45,
      minimumEvidence: 2,
      allowNewEvidence: false,
      preparationPrompts: [
        "Identify the most important argument in the record.",
        "Answer the strongest opposing point.",
        "Synthesize evidence already used.",
        "Tell the Senate what it must remember when deciding Rome\u2019s future."
      ]
    }
  ],
  moderator: {
    title: "The Consul Calls the Question",
    displayName: "Presiding Consul",
    initials: "PC",
    mode: "ai-draft-teacher-approve",
    requiredConcepts: [
      "republican government",
      "emergency power",
      "rule of law",
      "military loyalty",
      "political reform",
      "tradeoffs between order and liberty"
    ],
    promptPriorities: [
      "unanswered opponent claim",
      "conflict between claims",
      "competing interpretation of evidence",
      "unsupported assertion",
      "missing historical concept",
      "unacknowledged tradeoff"
    ]
  },
  evidence: [
    {
      id: "ev-rubicon",
      title: "The Rubicon is crossed",
      dateLabel: "49 BCE",
      sourceType: "Political turning point",
      excerpt: "Caesar led an army across the boundary into Italy after the Senate ordered him to surrender command.",
      context: "Ask whether the act was a necessary defense against political enemies or an armed rejection of republican authority.",
      citation: "Appian and Suetonius, later accounts of the civil war",
      perspective: "Contested"
    },
    {
      id: "ev-reforms",
      title: "Reforms and relief",
      dateLabel: "46\u201344 BCE",
      sourceType: "Public policy record",
      excerpt: "Caesar reorganized the calendar, founded colonies, expanded the Senate, and changed debt and grain policies.",
      context: "Measure practical results against the way the reforms were enacted and whose political power grew.",
      citation: "Late Republican reform record",
      perspective: "Multiple"
    },
    {
      id: "ev-dictator",
      title: "Dictator in perpetuity",
      dateLabel: "44 BCE",
      sourceType: "Office and title",
      excerpt: "The Senate named Caesar dictator perpetuo, an office without the customary short emergency limit.",
      context: "Consider the difference between legal appointment and the survival of republican limits in practice.",
      citation: "Roman fasti and later historical accounts",
      perspective: "Republican institutions"
    },
    {
      id: "ev-veterans",
      title: "Soldiers and personal loyalty",
      dateLabel: "58\u201345 BCE",
      sourceType: "Military relationship",
      excerpt: "Years of campaigning tied soldiers\u2019 fortunes, land hopes, and loyalty closely to successful commanders.",
      context: "Does military loyalty explain Caesar\u2019s effectiveness, or reveal a deeper danger to civilian government?",
      citation: "Campaign histories and veteran settlement records",
      perspective: "Army and state"
    },
    {
      id: "ev-senate-crisis",
      title: "A Republic already in crisis",
      dateLabel: "133\u201349 BCE",
      sourceType: "Long-term pattern",
      excerpt: "Political violence, blocked reforms, civil conflict, and competing generals strained the Republic for generations.",
      context: "Use this evidence to test whether Caesar caused the collapse or accelerated problems already present.",
      citation: "Late Republican political chronology",
      perspective: "Structural"
    },
    {
      id: "ev-cicero",
      title: "Cicero on liberty and order",
      dateLabel: "46\u201344 BCE",
      sourceType: "Contemporary political writing",
      excerpt: "Cicero\u2019s surviving letters and works reveal both fear of one-man rule and anxiety about renewed civil war.",
      context: "A contemporary elite voice offers valuable evidence, but also reflects the interests and uncertainty of a senator.",
      citation: "Cicero, letters and political works",
      perspective: "Senatorial"
    }
  ],
  opinionOptions: [
    {
      id: "leader-needed",
      label: "Caesar was the leader Rome needed",
      factionId: "caesarian-reformers"
    },
    {
      id: "threat-republic",
      label: "Caesar was a threat to the Republic",
      factionId: "republic-defenders"
    },
    { id: "unsure", label: "Unsure" }
  ],
  voteCategories: [
    {
      id: "final-verdict",
      label: "The Final Verdict",
      prompt: "Which faction made the stronger case?",
      optionSource: "factions"
    },
    {
      id: "evidence",
      label: "Best Use of Evidence",
      prompt: "Which faction used historical evidence most effectively?",
      optionSource: "factions"
    },
    {
      id: "rebuttal",
      label: "Strongest Rebuttal",
      prompt: "Which faction most directly answered its opponent?",
      optionSource: "factions"
    },
    {
      id: "speaker",
      label: "Most Persuasive Speaker",
      prompt: "Which senator most changed or challenged your thinking?",
      optionSource: "speakers"
    },
    {
      id: "argument",
      label: "Most Important Argument",
      prompt: "Which filed argument mattered most to your final decision?",
      optionSource: "turns"
    }
  ],
  viewer: {
    studentId: "preview-student-jordan",
    studentDisplayName: "Jordan Lee",
    classLabel: "World History \xB7 Period 3",
    classId: "world-history-period-3",
    teacherDisplayName: "Ms. Morgan",
    factionId: "republic-defenders",
    roleLabel: "Evidence Senator",
    mode: "preview",
    allowTeacherPreview: true
  },
  seedTurns: [
    {
      turnId: "opening-caesarian-reformers",
      speakerId: "student-maya",
      speakerDisplayName: "Maya Torres",
      transcript: "Rome\u2019s government had become corrupt and unable to solve major problems. Caesar did not create that crisis. His military victories protected Rome, and his reforms addressed debts, settlement, citizenship, and a calendar the Republic had failed to repair. Extraordinary conditions required leadership capable of acting.",
      evidenceIds: ["ev-senate-crisis", "ev-reforms"],
      reasoningContribution: "The seriousness and duration of the crisis help explain why Romans accepted unusually strong leadership.",
      durationSeconds: 72,
      filedAt: "2026-09-02T15:10:00.000Z"
    },
    {
      turnId: "opening-republic-defenders",
      speakerId: "student-noah",
      speakerDisplayName: "Noah Williams",
      transcript: "Political dysfunction did not give Caesar the right to gather permanent personal power. Crossing the Rubicon with loyal troops placed force above lawful transfer of command. Accepting dictatorship without the old time limit made the emergency itself a path to one-man rule.",
      evidenceIds: ["ev-rubicon", "ev-dictator"],
      reasoningContribution: "A republic is most vulnerable when a crisis is used to remove the limits meant to protect it.",
      durationSeconds: 68,
      filedAt: "2026-09-02T15:18:00.000Z"
    },
    {
      turnId: "response-caesarian-reformers",
      speakerId: "student-elena",
      speakerDisplayName: "Elena Ruiz",
      transcript: "Caesar\u2019s dictatorship was necessary because the Senate could no longer govern effectively. The office was granted through Roman institutions, and he used it to settle veterans, reform public administration, and restore decisions after years of paralysis. Power should be judged by the public problems it solved.",
      evidenceIds: ["ev-reforms", "ev-senate-crisis"],
      reasoningContribution: "Legal appointment and measurable reforms distinguish emergency leadership from power taken only for personal benefit.",
      durationSeconds: 58,
      filedAt: "2026-09-03T15:08:00.000Z"
    }
  ],
  seedModeratorPrompts: [
    {
      id: "moderator-response-caesarian-reformers-1",
      targetTurnId: "response-caesarian-reformers",
      question: "Both factions agree that the Republic was in crisis. The disagreement is whether crisis justified concentrating power in one leader. Where should Rome draw the line between emergency leadership and the destruction of republican government?",
      reason: "Both openings identified political crisis but disagreed about whether institutional limits could be suspended to solve it.",
      triggerTurnIds: ["opening-caesarian-reformers", "opening-republic-defenders"],
      status: "released"
    },
    {
      id: "moderator-response-republic-defenders-1",
      targetTurnId: "response-republic-defenders",
      question: "Caesar\u2019s defenders argue that emergency powers are justified by the problems they solve. Republican senators, what evidence shows that Caesar\u2019s power became part of the problem rather than the solution?",
      reason: "The Caesarian response defended concentrated power through results but did not identify a limit on that power.",
      triggerTurnIds: ["response-caesarian-reformers"],
      status: "released"
    }
  ]
};

export {
  romanSenateDebateConfig
};
//# debugId=73516962-b0b0-5540-a0fe-edd07d2e929d
//# sourceMappingURL=chunk-7KK5HPLH.js.map
