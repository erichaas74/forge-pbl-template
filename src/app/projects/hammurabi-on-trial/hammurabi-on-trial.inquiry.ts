import type { DebateInquiryConfig } from '../../templates/debate-studio/domain/debate-inquiry.models';

export const hammurabiInquiry: DebateInquiryConfig = {
  capabilityId: 'debate.inquiry-portfolio',
  version: '1.0',
  recordSummary: 'All eight civilization concepts are needed for FF.G6.SS.10.',
  hearingGateId: 'h-c',
  introduction:
    'You are an advocate in a classroom hearing about ancient Babylon. Read the sources, build a case, and decide for yourself. The hearing is our learning format; it is not a reenactment of a known trial.',
  artworkCaption:
    'Imagined Old Babylonian courtyard · about 1750 BCE · present-day Iraq. AI-created educational illustration; not historical evidence.',
  targets: [
    {
      id: 'sources',
      standardId: 'FF.G6.SS.01',
      label: 'Gather sources',
      prompt:
        'Identify a primary text, an artifact record, and a secondary explanation you used. Give each source’s origin, citation, and relevance. What source would help fill a remaining gap?',
      sourceIds: ['law-55', 'writing', 'ziggurat'],
    },
    {
      id: 'analysis',
      standardId: 'FF.G6.SS.02',
      label: 'Examine sources',
      prompt:
        'Paraphrase a law. Separate a fact in the text, your opinion, and an inference. Compare its purpose and viewpoint with a museum explanation. Explain a possible bias and a limit on what the sources prove.',
      sourceIds: ['law-48', 'royal-monument'],
    },
    {
      id: 'argument',
      standardId: 'FF.G6.SS.04',
      label: 'Argue with evidence',
      prompt:
        'State a claim with citations and reasoning. Fairly answer an opposing view. Propose a law change and predict effects on two groups. Describe one respectful exchange from the hearing. Link your brief, revision, and personal defense.',
      sourceIds: ['law-48', 'law-55', 'law-fees'],
    },
    {
      id: 'monarchy',
      standardId: 'FF.G6.SS.10',
      label: 'Monarchy',
      prompt:
        'What is monarchy? Explain how Hammurabi’s authority illustrates it. Cite a source and distinguish a royal claim from proof.',
      sourceIds: ['royal-monument'],
    },
    {
      id: 'empire',
      standardId: 'FF.G6.SS.10',
      label: 'Empire',
      prompt:
        'How does an empire differ from one city? Explain why governing several cities could make laws useful to Hammurabi.',
      sourceIds: ['river-cities', 'royal-monument'],
    },
    {
      id: 'hierarchy',
      standardId: 'FF.G6.SS.10',
      label: 'Social hierarchy',
      prompt:
        'Explain social hierarchy using a law about medical fees. Who is treated differently? What does this reveal, and what can it not prove?',
      sourceIds: ['law-fees'],
    },
    {
      id: 'polytheism',
      standardId: 'FF.G6.SS.10',
      label: 'Polytheism',
      prompt:
        'Explain polytheism and how religious beliefs appear in the ruler’s claims about authority. Cite the prologue source.',
      sourceIds: ['gods-and-king'],
    },
    {
      id: 'cuneiform',
      standardId: 'FF.G6.SS.10',
      label: 'Cuneiform',
      prompt:
        'Explain why cuneiform is a writing system rather than a language. How could writing help preserve laws and other knowledge? Cite an object or text.',
      sourceIds: ['writing', 'royal-monument'],
    },
    {
      id: 'architecture',
      standardId: 'FF.G6.SS.10',
      label: 'Monumental architecture',
      prompt:
        'Use the ziggurat at Ur to explain monumental architecture, organized labor, and religion. Explain why this is regional context rather than an image of Babylon’s courtroom.',
      sourceIds: ['ziggurat'],
    },
    {
      id: 'literature',
      standardId: 'FF.G6.SS.10',
      label: 'Epic literature',
      prompt:
        'Explain how the Gilgamesh passage shows a concern of epic literature. How is a heroic story useful to a historian, and different from a law or eyewitness report?',
      sourceIds: ['epic'],
    },
    {
      id: 'code',
      standardId: 'FF.G6.SS.10',
      label: 'Code of Hammurabi',
      prompt:
        'Explain the Code as a royal collection of judgments. Apply one cited law to a new example, then evaluate order and fairness separately. Do written expectations prove actual enforcement?',
      sourceIds: ['royal-monument', 'law-55', 'law-fees'],
    },
  ],
  gates: [
    {
      id: 'h-a',
      label: 'H-A · Ready to interpret laws',
      afterLesson: 2,
      criteria:
        'Independently explain royal authority and hierarchy with a source before dependent case interpretation.',
    },
    {
      id: 'h-b',
      label: 'H-B · Ready to rehearse',
      afterLesson: 4,
      criteria:
        'Explain a cited law in context, link it to a claim, and fairly describe a defensible opposing view.',
    },
    {
      id: 'h-c',
      label: 'H-C · Ready for the final hearing',
      afterLesson: 7,
      criteria:
        'Independently apply a law in context and review the individual portfolio. Open standard components remain open.',
    },
  ],
  lessons: [
    {
      number: 1,
      title: 'Meet Babylon',
      task: 'Start with the rivers, the cities, and the king. Explain who had power before deciding whether a law was fair.',
      sourceIds: ['river-cities', 'royal-monument', 'law-fees'],
      targetIds: ['sources', 'analysis', 'monarchy', 'empire', 'hierarchy'],
      fields: [
        {
          id: 'context',
          label: 'My explanation',
          prompt:
            'How did farms, trade, and cities connect? Explain monarchy, empire, and hierarchy using a source.',
        },
        {
          id: 'source',
          label: 'My source note',
          prompt:
            'Name the source, its origin, whether it is primary or secondary, and one question it leaves you with.',
        },
      ],
      check:
        'Explain the difference between a city and an empire. Use one source to show how a king or social status could affect people.',
      retry:
        'Imagine Babylon adds another city to its rule. Explain what changes about its government and whose viewpoint a royal monument presents.',
      help: 'Begin with one link: river → irrigation → farms → cities. Monarchy means a king or queen rules; hierarchy means people hold different social positions. Now find a source example.',
      sideQuest:
        'Compare what a king’s monument and a farmer’s account could reveal. What perspective is missing from our packet?',
      teacher:
        'Model source identification; check agriculture, trade, and cities. Teach monarchy, empire, and hierarchy before law interpretation.',
      tutor:
        'Ask for the learner’s own explanation, then ask which source supports it. Flag confusion between a city, an empire, and a modern nation.',
      workload:
        'About 45–60 minutes: 10-minute model, 20–30 minutes of source work, one short personal check. Two notes; roughly 80–120 words total.',
    },
    {
      number: 2,
      title: 'Plan the case together',
      task: 'Define order and fairness. Choose an assigned case and a job for everyone. Each person still keeps their own explanation.',
      sourceIds: ['gods-and-king', 'ziggurat', 'royal-monument', 'law-fees'],
      targetIds: ['sources', 'argument', 'monarchy', 'hierarchy', 'polytheism', 'architecture'],
      fields: [
        {
          id: 'team',
          label: 'Our case plan · my copy',
          prompt:
            'State the question, what order and fairness mean, each member’s job, and two sources to explore. Share this plan with your group.',
        },
        {
          id: 'context',
          label: 'My context note',
          prompt:
            'Explain polytheism and monumental architecture. Connect a source to royal authority or hierarchy.',
        },
      ],
      check:
        'H-A: Explain royal authority and social hierarchy in your own words. Use a source for each, and distinguish the ruler’s claim from your judgment.',
      retry:
        'H-A recheck: A monument praises the king, while a law sets different fees by status. Explain what each tells you about authority and hierarchy.',
      help: 'Take one source at a time. Use “This source shows… because…”. Your teacher can model another example before you try a fresh check.',
      sideQuest:
        'Find a plausible reason someone might value order yet question fairness. What further evidence would test that idea?',
      teacher:
        'Check every member, including clerks and judges. Review H-A before dependent law interpretation; keep source reading and other team roles available.',
      tutor:
        'Ask each student privately about their contribution and source, not only the spokesperson. Suggest a source reread; teacher decides H-A.',
      workload:
        'About 45–60 minutes: one group outline, one personal context note, one H-A check per learner.',
    },
    {
      number: 3,
      title: 'Read the evidence',
      task: 'Read a law as a historical source. Explore how writing preserved laws and how epic literature preserved stories.',
      requiresGate: 'h-a',
      sourceIds: ['writing', 'epic', 'law-48', 'law-55', 'law-fees'],
      targetIds: ['sources', 'analysis', 'cuneiform', 'literature', 'code'],
      fields: [
        {
          id: 'annotation',
          label: 'My law analysis',
          prompt:
            'Cite and paraphrase one law. Identify a fact, an opinion, an inference, the source’s purpose, and a limit on what it proves.',
        },
        {
          id: 'context',
          label: 'Writing and stories',
          prompt:
            'Explain cuneiform and epic literature. Use the brick and Gilgamesh sources; distinguish their dates, purposes, and places.',
        },
      ],
      check:
        'Compare a royal legal judgment with the Gilgamesh passage. What can each tell a historian, and what can neither establish on its own?',
      retry:
        'Explain why an inscribed brick and a translated law are different kinds of evidence. Give one justified inference and one claim you cannot support.',
      help: 'Read the adapted excerpt aloud or in smaller pieces. Separate “the text says” from “I infer”. An epic is a story; a law states a judgment.',
      sideQuest:
        'Compare the adaptation with the linked translation. Identify one wording choice that might affect an interpretation.',
      teacher:
        'Teach cuneiform, epic literature, and the Code. Verify all eight S10 concepts have now been introduced; model purpose and bias analysis.',
      tutor:
        'Ask the learner to paraphrase before giving a hint. Probe source purpose and unsupported inferences; use a fresh no-hint question for the check.',
      workload:
        'About 45–60 minutes: two short source analyses plus one independent comparison. Revisit the eight context entries over the project.',
    },
    {
      number: 4,
      title: 'Build the first argument',
      task: 'Combine your team’s ideas, then build your own claim, evidence, and explanation. A strong case takes the other side seriously.',
      requiresGate: 'h-a',
      sourceIds: ['law-48', 'law-55', 'law-fees', 'royal-monument'],
      targetIds: ['analysis', 'argument', 'code'],
      fields: [
        {
          id: 'claim',
          label: 'My claim',
          prompt: 'What does your assigned case argue about order or fairness?',
        },
        {
          id: 'evidence',
          label: 'My evidence and why',
          prompt:
            'Cite two sources. Explain how each supports the claim in its historical context.',
        },
        {
          id: 'opponent',
          label: 'Another interpretation',
          prompt:
            'What is the strongest fair interpretation the other side could offer? Respond to its evidence.',
        },
      ],
      check:
        'H-B: Apply a cited law to a case, explain how it supports your claim, and give a defensible opposing interpretation. Explain the difference between a law’s aim and proof of its effect.',
      retry:
        'H-B recheck: A neighbor loses grain after careless irrigation. Use law 55 to argue a case, then show how someone could question your conclusion about fairness.',
      help: 'Try “My claim… My source… This matters because…”. The teacher can model a different law before your fresh independent check.',
      sideQuest:
        'Find a counterexample to your claim. Narrow the claim so that it remains defensible.',
      teacher:
        'Check each learner’s brief and H-B reasoning before formal rehearsal. Judge evidence rather than agreement with a preferred verdict.',
      tutor:
        'Ask each member to defend one source-to-claim link and acknowledge an opposing view. Recommend revision when the link is missing; teacher decides readiness.',
      workload:
        'About 45–60 minutes: a first individual brief, roughly 250–400 words across the three fields, plus one H-B check. Length is a guide, not a gate.',
    },
    {
      number: 5,
      title: 'Revise and predict',
      task: 'Improve a weak part of your argument. Propose a change to a law and think through who might be helped or harmed.',
      requiresGate: 'h-a',
      sourceIds: ['law-48', 'law-55', 'law-fees'],
      targetIds: ['analysis', 'argument', 'hierarchy', 'code'],
      fields: [
        {
          id: 'revision',
          label: 'My revision',
          prompt:
            'Keep the original claim in Lesson 4. Write a stronger version here and explain the evidence or feedback that changed it.',
        },
        {
          id: 'prediction',
          label: 'My proposed law change',
          prompt:
            'Label your change hypothetical. Predict an effect for two groups and one unintended consequence. Explain your cause-and-effect reasoning.',
        },
      ],
      check:
        'Explain a correction to your claim. Defend a hypothetical law change with evidence and predict different consequences for two groups.',
      retry:
        'A proposed law gives the same medical fee for every patient. Predict a benefit and a possible problem, using the source while keeping your prediction separate from historical fact.',
      help: 'Choose only one claim to revise. Use “Before… Now… My evidence…”. For a prediction use “If… then… because…”. Retry H-B in Lesson 4 after reteaching.',
      sideQuest:
        'Explain why a well-intended law could have an unwanted consequence. Propose evidence that could test your prediction.',
      teacher:
        'Reteach weak reasoning; preserve before-and-after work. Recheck H-B with a fresh prompt if needed.',
      tutor:
        'Ask what changed and why. Distinguish a prediction from a fact; give scaffolding in practice, then remove answer-generating hints for the check.',
      workload:
        'About 45–60 minutes: one revised passage, one hypothetical law change, one personal check. Around 120–180 new words.',
    },
    {
      number: 6,
      title: 'Practice the hearing',
      task: 'Take turns making a case, listening, and responding. Use an actual classmate’s words; every member must explain their own thinking.',
      requiresGate: 'h-b',
      sourceIds: ['law-48', 'law-55', 'law-fees'],
      targetIds: ['analysis', 'argument', 'code'],
      fields: [
        {
          id: 'listening',
          label: 'What I heard',
          prompt:
            'Name your partner and fairly paraphrase a real claim they made. Which source did they use?',
        },
        {
          id: 'response',
          label: 'My response and improvement',
          prompt:
            'Answer that claim with evidence. Explain one change you made after the practice. Keep a transcript or recording reference.',
        },
      ],
      check:
        'Defend one change prompted by the rehearsal. Respond to an opposing claim using a cited source and acknowledge a limitation.',
      retry:
        'Choose a different real opposing claim from the practice. Explain its evidence fairly before giving your evidence-based response.',
      help: 'Listen once for the main claim and again for the evidence. Rehearse one sentence at a time. If H-B needs work, revise Lesson 4 and request a fresh review.',
      sideQuest:
        'Identify a point both cases can accept and one disagreement the sources cannot settle.',
      teacher:
        'Observe respectful discourse and question every student. Recheck critical gaps; do not substitute a team performance for personal evidence.',
      tutor:
        'Ask a private follow-up about each learner’s response and revision. Keep class moderator questions separate from private practice notes.',
      workload:
        'About 45–60 minutes: one practice hearing, one question/response per learner, and one revision note. Use supported speaking or transcript routes as needed.',
    },
    {
      number: 7,
      title: 'Defend your thinking',
      task: 'Use a fresh case to show what you can do independently. Review your source notes, brief, revision, and all eight civilization concepts.',
      requiresGate: 'h-b',
      sourceIds: ['law-48', 'law-55', 'law-fees', 'royal-monument'],
      targetIds: [
        'sources',
        'analysis',
        'argument',
        'monarchy',
        'empire',
        'hierarchy',
        'polytheism',
        'cuneiform',
        'architecture',
        'literature',
        'code',
      ],
      fields: [
        {
          id: 'portfolio',
          label: 'My evidence for the final',
          prompt:
            'Identify your source notes, brief, revision, prediction, and practice response by lesson. In My learning record, revisit each open concept separately.',
        },
      ],
      check:
        'H-C: A farmer’s crop fails because rain does not arrive; another farmer carelessly floods a neighbor. Compare the relevant laws. Defend a conclusion about order and fairness in context, and identify a limitation in your evidence.',
      retry:
        'H-C recheck: A ruler claims that written laws make society fair. Use two different laws and a context source to evaluate that claim. What further evidence would you need?',
      help: 'Review sources and earlier feedback before starting the check. Practice with the teacher, then answer a fresh case independently. Open sources remain available.',
      sideQuest:
        'Find a new question your sources raise about government or justice. Explain what evidence would answer it.',
      teacher:
        'Review H-C and the individual portfolio. Check every remaining S10 component separately; final readiness does not mean all standards are complete.',
      tutor:
        'Ask a new transfer question, log the independent response, and flag unsupported reasoning. Teacher confirms readiness and component evidence.',
      workload:
        'About 45–60 minutes: one short transfer defense and a portfolio review. Check remaining concepts individually; allow focused reassessment rather than repeating everything.',
    },
    {
      number: 8,
      title: 'Hammurabi on trial',
      task: 'Present the final hearing. Then give your own verdict: order, fairness, both, or neither. Your evidence and reasoning matter more than winning.',
      requiresGate: 'h-c',
      sourceIds: ['law-48', 'law-55', 'law-fees', 'royal-monument'],
      targetIds: ['sources', 'analysis', 'argument', 'code'],
      fields: [
        {
          id: 'final',
          label: 'My final brief',
          prompt:
            'Bring your revised claim, citations, opposing view, rebuttal, and proposed law change into one final brief. Keep your earlier drafts in the previous lessons.',
        },
        {
          id: 'verdict',
          label: 'My verdict and reflection',
          prompt:
            'Order, fairness, both, or neither? Explain why, what changed your thinking, and your own contribution. Your verdict can differ from your assigned team case.',
        },
      ],
      check:
        'Defend one specific claim from your final work with a source. Answer a follow-up about a limitation and explain your own contribution to the hearing.',
      retry:
        'Choose another source from your final brief. Explain what it proves, what it does not prove, and how it affects your personal verdict.',
      help: 'Use your brief as speaking notes. Your teacher can arrange audio, a supported live contribution, or a transcript. Revisit only the target that still needs evidence.',
      sideQuest:
        'Compare a principle from your verdict with a different historical legal system using a teacher-approved source.',
      teacher:
        'Run the hearing and personal defenses. Review all evidence before confirming each standard; S10 needs all eight concepts, and votes never award mastery.',
      tutor:
        'Ask every learner a defense question tied to their own work. Summarize evidence gaps for teacher review; do not infer mastery from team success.',
      workload:
        'About 45–60 minutes including an 8–12-minute team hearing and individual defenses. Final brief roughly 250–400 words; accommodations preserve the reasoning targets.',
    },
  ],
};
