import type { InquiryConfig, InquiryLesson } from '../../shared/inquiry/inquiry.models';
import { expeditionExamples } from './expedition-examples';

const lesson = (value: InquiryLesson): InquiryLesson => value;
export const expeditionInquiry: InquiryConfig = {
  examples: expeditionExamples,
  capabilityId: 'learning.inquiry-portfolio',
  version: '1.0',
  hearingGateId: 'e-c',
  studioFromLesson: 6,
  introduction:
    'You are a reporter in a present-day classroom newsroom looking back at Endurance, 1914–1916. Read, check, write, revise, and explain what happened. Each person keeps a report and evidence; the team makes a 3–5 minute broadcast.',
  artworkCaption:
    'Imagined modern Antarctic learning studio. AI-created illustration; not a photograph or reconstruction of the Endurance ship.',
  recordSummary:
    'These six Grade 5 ELA standards need the complete portfolio. Speaking and listening also require observed performance; a written answer alone is not enough.',
  finalActionLabel: 'Open the recording desk',
  finalActionNote:
    'Rehearse after E-B. Prepare the final local broadcast after E-C. Your team performs together in class; this preview stores one learner’s work on this device.',
  targets: [
    {
      id: 'reading',
      standardId: 'FF.G5.ELA.12',
      label: 'Read and explain evidence',
      sourceIds: ['fresh-reading', 'anchor'],
      prompt:
        'Use the fresh reading to identify TWO central ideas, quote accurately, summarize, and explain a relationship among people, events, or ideas. Point to the supporting details.',
    },
    {
      id: 'informative',
      standardId: 'FF.G5.ELA.19',
      label: 'Write an informative report',
      sourceIds: ['anchor', 'primary-preparation'],
      prompt:
        'Show your full report. Explain its topic, facts, definitions, quotation or example, precise language, transitions, helpful formatting, and conclusion. How do these help a reader understand?',
    },
    {
      id: 'revision',
      standardId: 'FF.G5.ELA.21',
      label: 'Plan, revise, edit, and publish',
      sourceIds: ['anchor'],
      prompt:
        'Compare your original and revised report. Explain how audience, purpose, a plan, and feedback changed meaning or organization. Show an edit and explain your digital presentation choices.',
    },
    {
      id: 'research',
      standardId: 'FF.G5.ELA.22',
      label: 'Research and credit sources',
      sourceIds: ['primary-preparation', 'chronology', 'archive-photo'],
      prompt:
        'Show notes from at least two different sources, grouped by topic. Explain why you selected them, distinguish quotations from paraphrases, and connect a cited detail to your report.',
    },
    {
      id: 'discussion',
      standardId: 'FF.G5.ELA.16',
      label: 'Discuss and listen with evidence',
      requiresPerformanceEvidence: true,
      sourceIds: ['anchor'],
      prompt:
        'Use your group notes to explain how you prepared, followed discussion rules, built on someone’s idea, and summarized and evaluated a speaker’s reasons and evidence. Your teacher also observes the discussion.',
    },
    {
      id: 'presentation',
      standardId: 'FF.G5.ELA.17',
      label: 'Present a clear news report',
      requiresPerformanceEvidence: true,
      sourceIds: ['route', 'chronology'],
      prompt:
        'Present your own part in a logical order with evidence and a useful visual. Explain how your language suits the audience. A teacher observes your presentation or a recording, or approves an equivalent that demonstrates the same skills.',
    },
  ],
  gates: [
    {
      id: 'e-a',
      label: 'E-A · Ready to draft',
      afterLesson: 2,
      criteria:
        'Each learner names a source, accurately explains a relevant detail, and connects it to the reporting question. Teacher reviews before dependent report drafting.',
    },
    {
      id: 'e-b',
      label: 'E-B · Ready to rehearse',
      afterLesson: 4,
      criteria:
        'Each learner has an accurate first report with supported claims, source credits, and an explanation of how the evidence supports the report. Review before recording.',
    },
    {
      id: 'e-c',
      label: 'E-C · Ready for final release',
      afterLesson: 7,
      criteria:
        'Each learner independently explains two central ideas and a relationship in the fresh reading, defends source choices, and supplies a supported final report with a revision trail.',
    },
  ],
  lessons: [
    lesson({
      number: 1,
      title: 'Meet the expedition',
      sourceIds: ['anchor', 'primary-preparation'],
      targetIds: ['reading', 'research'],
      task: 'Read the anchor article. Find two big ideas and details that support them. Start your own source log.',
      fields: [
        {
          id: 'reading',
          label: 'My two central ideas and summary',
          prompt:
            'Name two ideas, add supporting details, and summarize in your own words. Explain one connection between people, events, or ideas.',
        },
        {
          id: 'sources',
          label: 'My first source note',
          prompt:
            'Record the source title and author. Copy one short quotation exactly; then explain its meaning and why it matters.',
        },
      ],
      check:
        'Explain two central ideas in the anchor article. Support them with details, quote one sentence accurately, and explain how changing conditions affected the expedition’s goal.',
      retry:
        'Choose different details from the anchor. Explain two central ideas and a relationship; distinguish your own summary from an exact quotation.',
      help: 'Read one paragraph at a time. An idea explains what details have in common. Put quotation marks around exact words. Say your summary aloud before writing.',
      sideQuest:
        'Compare the leader’s memoir with the anchor reading. What does each source add, and whose perspective is missing?',
      teacher:
        'Model idea versus detail and quotation versus paraphrase. Read each learner’s baseline, including students who need oral practice before writing.',
      tutor:
        'Practice: ask for a detail supporting each idea. Independent check: close hints, capture a fresh personal explanation, and flag missing reasoning for teacher review.',
      workload:
        '45–60 minutes: short model, shared reading, two personal notes (about 80–120 words total), one independent check. Word counts guide effort; they are not pass scores.',
    }),
    lesson({
      number: 2,
      title: 'Plan the newsroom together',
      sourceIds: ['anchor', 'chronology'],
      targetIds: ['research', 'revision', 'discussion'],
      task: 'Choose the question your team will explain. Agree on an audience and roles. Everyone brings one source and explains one useful detail.',
      fields: [
        {
          id: 'plan',
          label: 'Our plan · my copy',
          prompt:
            'Write the audience, reporting question, rough order, and each person’s job. Every learner still writes and presents their own part.',
        },
        {
          id: 'contribution',
          label: 'My source and listening note',
          prompt:
            'Name my source and relevant detail. Summarize a teammate’s idea and say how I built on it. Record our discussion rules.',
        },
      ],
      check:
        'E-A: Name a source and its author or organization. Accurately explain a detail, then explain how it helps answer your team’s question. What did you learn from a teammate?',
      retry:
        'E-A fresh check: Use a different source detail. Name where it comes from and explain its relevance without repeating a teammate’s answer.',
      help: 'Try: Our question is __. The source __ says __. This matters because __. Practice with a teacher, then respond independently with another detail.',
      sideQuest:
        'Propose two possible headlines. Explain which is more accurate and useful to your audience.',
      teacher:
        'Observe each learner contributing and listening. Review E-A individually; keep source reading and support available while dependent drafting waits.',
      tutor:
        'During group work, privately ask EACH learner for their own source explanation and a response to a peer. A group outline does not complete an individual standard.',
      workload:
        '45–60 minutes: one team outline, one personal source/contribution note, and one E-A check per learner. About 100 words of personal evidence.',
    }),
    lesson({
      number: 3,
      title: 'Gather evidence for the report',
      requiresGate: 'e-a',
      sourceIds: ['primary-preparation', 'chronology', 'archive-photo'],
      targetIds: ['reading', 'research', 'informative'],
      task: 'Use at least two sources. Sort your notes by topic and write a paragraph that explains a relationship, not just a sequence.',
      fields: [
        {
          id: 'research',
          label: 'My organized source log',
          prompt:
            'For each of two sources: title, creator, reference, topic, quotation or paraphrase, and how the detail supports the report. Do not count two copies of the same source as two sources.',
        },
        {
          id: 'paragraph',
          label: 'My evidence paragraph',
          prompt:
            'Introduce an idea, explain it with facts or an example, and credit the sources. Define an unfamiliar word for your audience.',
        },
      ],
      check:
        'Compare the memoir with the timeline or photo record. Explain what each can establish, and connect a credited detail to a people/event/idea relationship in your paragraph.',
      retry:
        'Use another pair of details. Explain how you checked them and why your paragraph needs both explanation and source credit.',
      help: 'Use a two-column note: what the source says / what I can explain from it. Label copied words QUOTE and your wording PARAPHRASE.',
      sideQuest:
        'Find a detail the photo alone cannot prove. Explain which additional source you would seek.',
      teacher:
        'Check accuracy and note organization. Supply chunked passages or source-note scaffolds when needed; maintain the same reasoning target.',
      tutor:
        'Ask one source-comparison question at a time. Check the learner’s own explanation with hints closed; do not turn copied notes into a readiness checkmark.',
      workload:
        '45–60 minutes: two source entries, one paragraph (roughly 100–150 words), and one individual explanation.',
    }),
    lesson({
      number: 4,
      title: 'Build the first news report',
      requiresGate: 'e-a',
      sourceIds: ['anchor', 'primary-preparation', 'chronology'],
      targetIds: ['informative', 'revision', 'research', 'discussion'],
      task: 'Write your first full report. Together, arrange an opening, evidence sections, and a closing. Check each person’s claims before rehearsal.',
      fields: [
        {
          id: 'report',
          label: 'My first full report',
          prompt:
            'Aim for about 250–400 words: topic, facts, definition or example, accurate quotation and credits, clear sections, transitions, precise language, and a conclusion.',
        },
        {
          id: 'rundown',
          label: 'Our running order and my peer check',
          prompt:
            'List who presents each section and its visual. Summarize a peer’s reason and evidence; explain whether they support the claim and name a change you suggested.',
        },
      ],
      check:
        'E-B: Show your complete first report. Explain two source-supported claims and why the evidence fits. Identify one peer suggestion and evaluate its reason or evidence.',
      retry:
        'E-B fresh check: Explain a corrected or different claim using the source itself. Defend its accuracy and show the first report with credits.',
      help: 'Use: topic → facts and explanation → useful example or quotation → conclusion. Read a claim next to its source. Fix an unsupported statement before recording.',
      sideQuest:
        'Write a second opening for a younger audience. Explain what you changed without changing the facts.',
      teacher:
        'Review each full report and E-B response, not just word count. Require accurate supported content before recording. Observe peer evaluation.',
      tutor:
        'In group time, test each student on a claim they wrote. Suggest specific revision needs from the evidence; the teacher decides readiness.',
      workload:
        '45–60 minutes: one first report per learner, one team rundown, one personal peer check, one E-B check. A 250–400-word report is a flexible planning estimate.',
    }),
    lesson({
      number: 5,
      title: 'Make the report clearer',
      requiresGate: 'e-a',
      sourceIds: ['anchor', 'primary-preparation'],
      targetIds: ['informative', 'revision'],
      task: 'Use feedback to make a meaningful revision. Keep the earlier report and explain what changed. This lesson stays available while you repair E-B.',
      fields: [
        {
          id: 'revision',
          label: 'My revised full report',
          prompt:
            'Paste or rewrite your revision here. Improve meaning or organization, then edit. Keep lesson 4 as your before version.',
        },
        {
          id: 'memo',
          label: 'My revision memo',
          prompt:
            'Quote a short before/after example. Explain the feedback, what changed, and how the change helps the audience. Check definition/example, precision, transitions, formatting, conclusion, spelling and punctuation.',
        },
      ],
      check:
        'Compare the two versions. Explain one substantive change and one edit. Show how you kept the facts accurate while making the report clearer for your audience.',
      retry:
        'Explain another before/after change. Why does it improve the reader’s understanding rather than only the appearance?',
      help: 'First ask “What might confuse my reader?” Move or explain one idea. Then check sentences and spelling. These are two different kinds of improvement.',
      sideQuest:
        'Try the same explanation as a short radio introduction. Explain what spoken listeners need that readers can see.',
      teacher:
        'Conference with students needing support. Compare actual versions; distinguish substantive revision from spelling-only edits. Invite an E-B retry when ready.',
      tutor:
        'In practice, ask the writer to choose and justify a change. In the individual check, capture the writer’s explanation without supplying it.',
      workload:
        '45–60 minutes: a revised report and a short revision memo (about 60–100 words), plus one independent check. Revise existing work instead of adding another report.',
    }),
    lesson({
      number: 6,
      title: 'Rehearse at the recording desk',
      requiresGate: 'e-b',
      sourceIds: ['route', 'chronology'],
      targetIds: ['discussion', 'presentation', 'revision'],
      task: 'Rehearse the team broadcast. Each person presents, uses a helpful visual, listens, and gives evidence-based feedback. Open the recording desk below when ready.',
      fields: [
        {
          id: 'rehearsal',
          label: 'My rehearsal and media choice',
          prompt:
            'Name my section, visual and source. Explain what the visual helps listeners understand and how my words suit the audience. Record an observation or recording timestamp.',
        },
        {
          id: 'feedback',
          label: 'My listening and revision note',
          prompt:
            'Summarize a teammate’s point, evaluate the reason/evidence, and record a specific improvement to my own delivery or script.',
        },
      ],
      check:
        'Present a short part in person or on a recording. Explain your visual choice and summarize and evaluate a teammate’s reasoning. Your teacher observes the performance as well as reading your response.',
      retry:
        'Present the revised section and explain what improved. Respond to a different peer point with a reason tied to evidence.',
      help: 'Practice one short section at a time. Pause after the key idea. Point out exactly what listeners should notice in the diagram. Ask for a small-group rehearsal if needed.',
      sideQuest:
        'Compare a timeline and a route diagram for the same section. Explain which tells your audience more useful information.',
      teacher:
        'Observe every learner speaking and listening. Record evidence and any approved equivalent, keeping the standard intact. Do not infer oral performance from a script.',
      tutor:
        'During group work, prompt each learner to explain their media and peer feedback. A future connected tutor may analyze consented recordings; this pilot records evidence for teacher review.',
      workload:
        '45–60 minutes: one short presentation per learner, two personal notes, and one team rehearsal of roughly 3–5 minutes. Shorter supported practice is available.',
    }),
    lesson({
      number: 7,
      title: 'Defend your final report',
      requiresGate: 'e-b',
      sourceIds: ['fresh-reading', 'primary-preparation'],
      targetIds: ['reading', 'informative', 'revision', 'research'],
      task: 'Read the new passage on preparing the James Caird. Complete your personal defense and gather your final report, sources, and revision memo.',
      fields: [
        {
          id: 'final-report',
          label: 'My final report and source credits',
          prompt:
            'Save the final supported version. Include credits for at least two sources. Keep the lesson 4 draft and lesson 5 revision memo in your portfolio.',
        },
        {
          id: 'defense',
          label: 'My fresh reading and source defense',
          prompt:
            'Explain two central ideas, summarize, quote accurately, and explain a relationship in the new reading. Explain why your report uses its chosen sources.',
        },
      ],
      check:
        'E-C: Using “Preparing a small boat for a large task,” explain two central ideas with details and a relationship. Quote accurately and summarize. Defend your sources and show a final report plus a meaningful revision trail.',
      retry:
        'E-C fresh response: Use different details from the new reading for two ideas and a relationship. Explain how you corrected the earlier response and defend a different source choice in your final report.',
      help: 'Practice on the anchor article first: idea, supporting detail, relationship. Return to the fresh passage for the independent check. The teacher can choose an additional passage if repeated practice makes this one familiar.',
      sideQuest:
        'Explain what another trustworthy source could add or challenge in your report. Identify a question you still cannot answer.',
      teacher:
        'Review the fresh reading response AND the full final portfolio. Confirm E-C only with independent reasoning and supported writing. Revisit any missing part of the six standards.',
      tutor:
        'Keep practice hints closed during the check. Capture personal reading and source explanations separately from the team product. Recommend a focused retry where evidence is missing.',
      workload:
        '45–60 minutes: one final portfolio check and one personal defense. Refine the existing 250–400-word report; do not require a new report.',
    }),
    lesson({
      number: 8,
      title: 'Share the expedition news',
      requiresGate: 'e-c',
      sourceIds: ['route', 'chronology'],
      targetIds: ['discussion', 'presentation'],
      task: 'Present the final team broadcast. Every person shares their own section, answers a question, and reflects on what the evidence changed.',
      fields: [
        {
          id: 'presentation',
          label: 'My final presentation evidence',
          prompt:
            'Record my section, the observed performance or recording timestamp, and my answer to an audience question. An approved equivalent must still demonstrate the assessed skills.',
        },
        {
          id: 'reflection',
          label: 'My reflection',
          prompt:
            'What did the sources change about my thinking? How did I help the team and respond to another person’s reasoning? What would I improve next time?',
        },
      ],
      check:
        'Present and answer an audience question with evidence. Explain how your media and delivery helped listeners, then reflect on a teammate’s reasoning and your own contribution.',
      retry:
        'Present or defend a revised section, using feedback. Explain your source support and a change in delivery or audience language.',
      help: 'Use a short cue card with idea, source, and visual. Rehearse with a partner before presenting. Ask the teacher for an equivalent access format if needed.',
      sideQuest:
        'Adapt a short part for a different audience, or investigate a remaining question using a newly vetted source.',
      teacher:
        'Observe individual presentations and discussion. Review all six standards across the complete portfolio; approve official completion only in the school system with evidence.',
      tutor:
        'Ask each learner a personal defense and reflection question. Summarize remaining evidence needs. Team broadcast completion alone does not award individual mastery.',
      workload:
        '45–60 minutes: one 3–5 minute team broadcast, a short individual defense and reflection, and final teacher review. Presentation time is a planning guide, not an automatic score.',
    }),
  ],
};
