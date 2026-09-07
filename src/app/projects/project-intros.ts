import type { ProjectIntroConfig } from '../shared/project-intro/project-intro.models';
import { calendarMonumentIntro } from './calendar-monument/calendar-monument.intro';
import { robotDeliveryIntro } from './robot-delivery/robot-delivery.intro';
import { unlabeledShelfTeaser } from './intro-scenes/unlabeled-shelf.teaser';
import { frontierTeaser } from './intro-scenes/frontier.teaser';
import { museumTeaser } from './intro-scenes/museum.teaser';
import { senateTeaser } from './intro-scenes/senate.teaser';
import { bostonAftermathScene, newsroomTeaser } from './intro-scenes/newsroom.teaser';
import { voyageTeaser } from './intro-scenes/voyage.teaser';
import { survivalIslandHistoryTeaser } from './intro-scenes/survival-island-history.teaser';

/** Versioned opening content. These practice challenges do not reveal project solutions. */
export const projectIntros: readonly ProjectIntroConfig[] = [
  {
    capabilityId: 'project.intro',
    schemaVersion: '1.0',
    projectId: 'mystery-substance',
    teaser: unlabeledShelfTeaser,
    version: '1.0.0',
    theme: 'laboratory',
    image: '/lab-investigation-room-v2.webp',
    imageAlt: 'An investigation laboratory with a workbench, equipment, and evidence shelves.',
    kicker: 'Incoming case · Four vials. Zero labels.',
    headline: 'Someone mixed up the labels. Can you uncover the truth?',
    story:
      'The lab is ready. The samples are waiting. But the labels have vanished from four mystery vials. Your team has been called in to sort out what happened—and a good guess will not close this case.',
    hook: 'If two substances look the same, how could you prove they are different?',
    role: 'Lead evidence scientist',
    challenge: {
      title: 'First, sharpen your detective eyes.',
      context:
        'A practice vial holds a white powder. Which statement is an observation you can make just by looking?',
      options: [
        {
          id: 'observation',
          label: '“I see a white powder.”',
          detail: 'Describe what is visible.',
          feedback:
            'That is a direct observation. It describes the sample without deciding what the substance is.',
        },
        {
          id: 'identity',
          label: '“It must be salt.”',
          detail: 'Name the substance.',
          feedback:
            'That is an inference: a possible explanation. Many substances are white, so a test would help you check it.',
        },
        {
          id: 'prediction',
          label: '“It will dissolve in water.”',
          detail: 'Predict a test result.',
          feedback:
            'That is a prediction. You would need a controlled test and a recorded result before calling it an observation.',
        },
      ],
      takeaway:
        'Notice first. Test fairly. Explain what the evidence supports. All testing in this project takes place in the virtual lab.',
    },
    decision: {
      prompt: 'Which mystery vial would you investigate first?',
      options: [
        {
          id: 'vial-a',
          label: 'Vial A',
          detail: 'Start here and establish a careful testing routine.',
        },
        {
          id: 'vial-b',
          label: 'Vial B',
          detail: 'Start here and look for properties you can compare.',
        },
        {
          id: 'vial-c',
          label: 'Vial C',
          detail: 'Start here and challenge your first impression.',
        },
        { id: 'vial-d', label: 'Vial D', detail: 'Start here and record what is still unknown.' },
      ],
      reasonPrompt: 'What would you look for or test first, and why?',
      reasonHint: 'I would start by observing… Then I would test… because…',
      questionPrompt: 'What question should your investigation answer?',
      questionHint: 'How could I tell whether…?',
    },
    mission: [
      'Collect observations and run fair virtual tests.',
      'Build and revise a theory using your results.',
      'Present a case file that restores the labels with evidence.',
    ],
    action: 'Open the Evidence Locker',
    finalExample: {
      button: 'Open a completed case-file example',
      format: 'Case file + scientific defense',
      title: 'Case closed: the practice sample',
      introduction:
        'An invented practice case shows the shape of a finished scientific argument. Its sample and results are separate from the four-vial investigation.',
      chapters: [
        {
          label: '01 · Claim',
          title: 'A conclusion you can check',
          studentWork:
            '“I think practice sample X matches reference R. I compared more than its color before making this claim.”',
          evidence:
            'Practice evidence card: X and R were both white powders. Appearance alone could not distinguish them from the other references.',
          teacherNote: 'Look for a clear claim with an appropriately cautious level of certainty.',
        },
        {
          label: '02 · Evidence',
          title: 'Show the test, not just the answer',
          studentWork:
            '“In our invented test, 2 g of X dissolved in 20 mL of water. Reference R did too. I kept the amount, water volume, and stirring time the same.”',
          evidence:
            'Example result table: X—dissolved; R—dissolved; S—did not dissolve. A second test is still needed to distinguish X from any other soluble reference.',
          teacherNote:
            'The student connects measurements and fair-test conditions to the claim and names what a single test cannot prove.',
        },
        {
          label: '03 · Reflection',
          title: 'Make the change in thinking visible',
          studentWork:
            '“At first I chose by color. Now I would compare several properties, because different substances can look alike. If another reference matches all my results, I would revise my claim.”',
          evidence:
            'Opening response → test record → revised explanation. The completed project brings these pieces together in a case file.',
          teacherNote:
            'Assess how evidence changed the explanation, rather than rewarding a lucky initial guess.',
        },
      ],
      lookFors: [
        'A claim linked to specific results',
        'Fair tests and accurate observations',
        'Limits, uncertainty, and visible revisions',
      ],
    },
  },
  {
    capabilityId: 'project.intro',
    schemaVersion: '1.0',
    projectId: 'frontier-trading-company',
    teaser: frontierTeaser,
    version: '1.0.1',
    theme: 'frontier',
    image: '/frontier-trading/shop-scenes/town-street.webp',
    imageAlt: 'A frontier trading street with shops and supplies ready for a trading expedition.',
    kicker: 'Your charter is waiting · Make every dollar count',
    headline: 'An empty wagon. A new company. Your big move.',
    story:
      'The trading season is opening, and your company has $200 to get started. Stock costs money. Cargo takes space. A promising destination can become an expensive mistake. Can your math turn a small start into a smart season?',
    hook: 'Would you choose the biggest possible profit—or the plan most likely to survive a surprise?',
    role: 'Company founder & chief strategist',
    challenge: {
      title: 'Which crate earns its space?',
      context:
        'Practice offer: both crates take 2 cargo spaces. Crate A costs $12 and may sell for $18. Crate B costs $20 and may sell for $25. Ignore travel costs for this warm-up.',
      options: [
        {
          id: 'crate-a',
          label: 'Crate A · $6 possible profit',
          detail: '$18 sale − $12 cost. Uses $6 per cargo space to buy.',
          feedback:
            'A has the larger possible profit: $6 compared with $5. It also leaves more cash available. The sale is a forecast, not a guarantee.',
        },
        {
          id: 'crate-b',
          label: 'Crate B · $5 possible profit',
          detail: '$25 sale − $20 cost. Uses $10 per cargo space to buy.',
          feedback:
            'B has the higher sale price, but A has the higher possible profit. Subtract the purchase cost before comparing—and then consider travel costs and risk.',
        },
        {
          id: 'wait',
          label: 'Ask about the market first',
          detail: 'How reliable are these sale prices?',
          feedback:
            'Useful question. Forecasts can change. With the given prices A has $6 possible profit and B has $5, but evidence about demand could change the decision.',
        },
      ],
      takeaway:
        'Sale price, profit, capacity, and risk tell different parts of the story. A strong trader explains the whole decision.',
    },
    decision: {
      prompt: 'What kind of trading strategy will you try first?',
      options: [
        {
          id: 'careful',
          label: 'Keep a safety cushion',
          detail: 'Hold cash back and protect against surprises.',
        },
        {
          id: 'balanced',
          label: 'Balance reward and risk',
          detail: 'Mix promising trades with a reserve.',
        },
        {
          id: 'bold',
          label: 'Chase a bigger opportunity',
          detail: 'Accept more risk for a possible larger return.',
        },
      ],
      reasonPrompt: 'Why does this strategy make sense? Make one prediction.',
      reasonHint: 'I predict… because… I will keep track of…',
      questionPrompt: 'What information could change your plan?',
      questionHint: 'Before spending my money, I want to know…',
    },
    mission: [
      'Plan purchases, capacity, and routes using math.',
      'Record decisions and adjust when conditions change.',
      'Defend your company’s season with a financial record and explanation.',
    ],
    action: 'Open the Trading Post',
    finalExample: {
      button: 'Explore a completed company-defense example',
      format: 'Season ledger + strategy defense',
      title: 'The small reserve that saved our season',
      introduction:
        'A fictional company’s short defense models how a student can use calculations and decisions to explain a result. Figures are illustrative, not a saved simulation run.',
      chapters: [
        {
          label: '01 · Plan',
          title: 'Give every dollar a job',
          studentWork:
            '“We started with $200. We used $120 for stock and planned $30 for travel. That left a $50 reserve. We chose a smaller first trade so we could respond to changes.”',
          evidence: 'Opening budget: $200 − $120 − $30 = $50 reserve.',
          teacherNote:
            'Check that the spending plan balances and that the student explains the purpose of the reserve.',
        },
        {
          label: '02 · Decision',
          title: 'A surprise changes the numbers',
          studentWork:
            '“Our fictional trip added a $10 repair. We kept the planned route because the expected sales still covered our costs, but we reduced our profit forecast.”',
          evidence:
            'Example ledger: sales $180; stock $120; travel $30; repair $10. Net gain: $20. Ending cash: $220.',
          teacherNote:
            'Look for the full cost of the decision, a correct calculation, and an explanation of the alternative considered.',
        },
        {
          label: '03 · Defense',
          title: 'Explain more than the ending balance',
          studentWork:
            '“Our reserve did not make the trade more profitable, but it helped us absorb the repair. Next season we would compare profit per cargo space before buying more stock.”',
          evidence:
            'Presentation sequence: opening plan → key decisions → ledger → revised strategy.',
          teacherNote:
            'A persuasive defense uses numerical evidence and acknowledges the tradeoff, even if the company did not earn the largest profit.',
        },
      ],
      lookFors: [
        'Accurate costs, revenue, and net profit',
        'Reasons for route and cargo choices',
        'A revision backed by the season’s evidence',
      ],
    },
  },
  {
    capabilityId: 'project.intro',
    schemaVersion: '1.0',
    projectId: 'objects-that-changed-us',
    teaser: museumTeaser,
    version: '1.1.0',
    theme: 'museum',
    model: museumTeaser.media.model,
    imageAlt: 'A rotatable model of Nefertiti’s bust.',
    kicker: 'A new museum wing · One story only you can tell',
    headline: 'An object can be silent. Your exhibit gives it a voice.',
    story:
      'An empty place in the museum is waiting for your collection. Families will walk in knowing little about these objects. Your challenge: help them discover how objects shaped life in ancient Egypt—and what the objects cannot tell us on their own.',
    hook: 'What could an everyday object reveal about an entire civilization?',
    role: 'Museum curator',
    challenge: {
      title: 'Which label makes a visitor think?',
      context:
        'Imagine a display of a writing tool and a record of stored grain. Choose the label that best connects the objects to a historical question.',
      options: [
        {
          id: 'description',
          label: '“A writing tool and a grain record.”',
          detail: 'Identify what is in the case.',
          feedback:
            'A useful start, but the visitor still needs an explanation. What could these objects help us understand about work, resources, or power?',
        },
        {
          id: 'connection',
          label: '“Who could keep track of a harvest?”',
          detail: 'Use the tool and record to investigate how information was recorded and used.',
          feedback:
            'This label invites a historical investigation. Your sources must still support what you say about the people who wrote and used the records.',
        },
        {
          id: 'overclaim',
          label: '“Everyone in Egypt could write.”',
          detail: 'Make a claim about everyone from one display.',
          feedback:
            'That claim is too broad for these two objects. Ask whose experiences the objects represent and whose are missing.',
        },
      ],
      takeaway:
        'A compelling exhibit connects an object, a claim, and a source. It makes space for questions the evidence cannot answer yet.',
    },
    decision: {
      prompt: 'Which collection would you like to investigate?',
      options: [
        { id: 'nile', label: 'Nile Life', detail: 'Food, water, work, and everyday objects.' },
        {
          id: 'scribes',
          label: 'Scribes & Power',
          detail: 'Writing, records, and who used information.',
        },
        { id: 'afterlife', label: 'Afterlife', detail: 'Objects, beliefs, and remembrance.' },
        {
          id: 'builders',
          label: 'Builders & Engineers',
          detail: 'Tools, materials, and ambitious structures.',
        },
      ],
      reasonPrompt: 'What would you want a visitor to discover, and why?',
      reasonHint: 'I want visitors to wonder about… because…',
      questionPrompt: 'What is your first research question?',
      questionHint: 'What can these objects tell us about…?',
    },
    mission: [
      'Research a collection and connect claims to sources.',
      'Curate a museum board and record a guided explanation.',
      'Open your exhibition to classmates and families.',
    ],
    action: 'Unlock My Museum Wing',
    finalExample: {
      button: 'Tour a completed exhibition example',
      format: 'Museum board + curator-tour transcript',
      title: 'Behind the object: a curator’s story',
      introduction:
        'An illustrative exhibit walkthrough shows the relationship between objects, sources, and a curator’s explanation. The live project opens the shared museum; this example is a guided text preview.',
      chapters: [
        {
          label: '01 · Entrance panel',
          title: 'Begin with an idea',
          studentWork:
            '“Our exhibit asks how people kept track of important resources. The writing tool and grain record help us investigate the connection between objects and information.”',
          evidence:
            'Exhibit structure: central question → selected objects → source-supported labels.',
          teacherNote:
            'The objects support one coherent inquiry instead of becoming an unrelated collection of facts.',
        },
        {
          label: '02 · Object label',
          title: 'Put the evidence beside the claim',
          studentWork:
            '“This record is evidence of information being written down. It does not show that everyone could write. We need the source description and its context to identify who made it and why.”',
          evidence:
            'A finished label includes an object title, source citation, interpretation, and a limit on the claim.',
          teacherNote:
            'Look for a clear distinction between an observation, an interpretation, and an unanswered question.',
        },
        {
          label: '03 · Curator tour',
          title: 'Guide a visitor through the reasoning',
          studentWork:
            '“Start with our question. Compare the two objects. Read the sources beside them. Before you leave, consider whose lives are visible in this collection and whose stories we still need.”',
          evidence:
            'Presentation: museum board, linked source list, and a student-recorded curator tour with an accessible transcript.',
          teacherNote:
            'The public explanation should be understandable to a family audience and credit the sources used.',
        },
      ],
      lookFors: [
        'A coherent historical question',
        'Source-supported labels and acknowledged limits',
        'A clear, accessible public tour',
      ],
    },
  },
  {
    capabilityId: 'project.intro',
    schemaVersion: '1.0',
    projectId: 'history-live-revolutionary-war',
    teaser: newsroomTeaser,
    version: '1.1.0',
    theme: 'broadcast',
    image: bostonAftermathScene.image,
    imageAlt: bostonAftermathScene.alt,
    kicker: 'Developing story · Your newsroom needs a reporter',
    headline: 'Two networks. Conflicting headlines. What will you put on air?',
    story:
      'You are stepping into a newsroom covering the American Revolution. Reports are arriving from different sides. Some describe events. Others make claims. Your job is to produce a gripping report that an audience can trust.',
    hook: 'Can you report from a point of view without bending the evidence?',
    role: 'Historical correspondent',
    challenge: {
      title: 'Hold the headline. Check the claim.',
      context:
        'Practice dispatch: a letter says, “I heard that every shop has closed.” No second source has arrived. How should the newsroom treat the claim that every shop is closed?',
      options: [
        {
          id: 'fact',
          label: 'Verified fact',
          detail: 'Publish “Every shop is closed.”',
          feedback:
            'The letter proves someone reported hearing the claim. It does not verify that every shop closed. Look for independent evidence.',
        },
        {
          id: 'unconfirmed',
          label: 'Unconfirmed report',
          detail: 'Attribute the claim and seek another source.',
          feedback:
            'Yes—identify who made the report, make the uncertainty clear, and verify before presenting the claim as fact.',
        },
        {
          id: 'future',
          label: 'Use what happens later',
          detail: 'Fill in the gaps with information from the future.',
          feedback:
            'A report set at a historical moment must distinguish what reporters could know then from what historians learned later.',
        },
      ],
      takeaway:
        'Perspective shapes a story. Verification earns trust. Keep facts, interpretations, and unconfirmed reports distinct.',
    },
    decision: {
      prompt: 'Which reporting lens would you like to explore?',
      options: [
        {
          id: 'patriot',
          label: 'Continental / Patriot perspective',
          detail: 'Investigate the case for resistance and independence.',
        },
        {
          id: 'crown',
          label: 'Crown / British perspective',
          detail: 'Investigate the case for authority and continued union.',
        },
        {
          id: 'undecided',
          label: 'Compare before choosing',
          detail: 'Read accounts from both networks first.',
        },
      ],
      reasonPrompt: 'What makes this lens interesting? What might it leave out?',
      reasonHint: 'This lens might help me understand… I will also need to check…',
      questionPrompt: 'What must you verify before going on air?',
      questionHint: 'Before reporting that…, I need evidence from…',
    },
    mission: [
      'Pitch a story and verify sources available at that moment.',
      'Write and record a report that distinguishes evidence from interpretation.',
      'Present your news package in a class broadcast.',
    ],
    action: 'Enter the Newsroom',
    finalExample: {
      button: 'Explore a completed special-report example',
      format: 'News package + source notes',
      title: 'Before we go live: a report you can trust',
      introduction:
        'A fictional newsroom example demonstrates the structure of a finished special report. The transcript models verification; it is not a recording of a student or a claim about a particular historical event.',
      chapters: [
        {
          label: '01 · Anchor opening',
          title: 'Tell viewers what is known',
          studentWork:
            '“We have received a report of shop closures. One letter describes the rumor, but we have not verified how many shops are affected. Our correspondent is comparing accounts.”',
          evidence: 'Source note: one attributed letter; the wider claim remains unconfirmed.',
          teacherNote: 'Listen for precise language that keeps the source and the claim separate.',
        },
        {
          label: '02 · Correspondent',
          title: 'Make competing perspectives visible',
          studentWork:
            '“Our network is investigating why some people support the protest. Another account emphasizes disruption. We will show what each account says and identify which details they agree on.”',
          evidence: 'Source wall → verified script claims → attribution in the finished report.',
          teacherNote:
            'A chosen network perspective should shape the questions, while evidence still controls the factual claims.',
        },
        {
          label: '03 · Sign-off',
          title: 'Leave the audience informed',
          studentWork:
            '“We will update this story when independent evidence confirms the scale of the closures. For now, the reason for the disagreement is part of the story.”',
          evidence:
            'Final package: student recording, transcript, source credits, and a reflection on reporting choices.',
          teacherNote:
            'The report can be engaging while admitting uncertainty. Assess the evidence trail as well as delivery.',
        },
      ],
      lookFors: [
        'Verified, attributed claims',
        'Fair treatment of different perspectives',
        'A clear script, source credits, and reflection',
      ],
    },
  },
  {
    capabilityId: 'project.intro',
    schemaVersion: '1.0',
    projectId: 'the-fate-of-the-republic',
    teaser: senateTeaser,
    version: '1.0.0',
    theme: 'senate',
    image: '/debate-studio/roman-senate-chamber.png',
    imageAlt: 'The Roman Senate chamber with tiered seats surrounding a central speaking floor.',
    kicker: 'The Senate is gathering · Your voice carries weight',
    headline: 'The Republic is at a crossroads. Take a stand worth defending.',
    story:
      'Rome’s senators disagree about Caesar and the future of the Republic. The chamber needs more than a powerful speech. It needs reasons, historical evidence, and someone willing to answer the strongest opposing argument.',
    hook: 'Was Caesar the leader Rome needed—or a threat to the Republic?',
    role: 'Senator & evidence-based advocate',
    challenge: {
      title: 'Which response belongs on the Senate floor?',
      context:
        'An opposing speaker argues: “One powerful leader is the only way to restore stability.” Which reply gives you the strongest starting point for an evidence-based rebuttal?',
      options: [
        {
          id: 'attack',
          label: '“Only a fool would believe that.”',
          detail: 'Attack the speaker.',
          feedback:
            'That attacks a person instead of answering the claim. Challenge the reasoning and evidence while respecting the speaker.',
        },
        {
          id: 'rebuttal',
          label: '“What limits would protect the Republic?”',
          detail: 'Test the claim and seek evidence about power and accountability.',
          feedback:
            'This targets the argument’s key assumption. Now use historical sources to explain whether stability required concentrated power and what the consequences were.',
        },
        {
          id: 'repeat',
          label: '“The Republic must survive!”',
          detail: 'Repeat a forceful slogan.',
          feedback:
            'A slogan can communicate your position, but it does not yet answer the opposing argument. Add a claim, evidence, and reasoning.',
        },
      ],
      takeaway:
        'A rebuttal answers an argument. Strong speakers can explain the other side fairly before showing where the evidence leads.',
    },
    decision: {
      prompt: 'Where does your thinking begin?',
      options: [
        {
          id: 'needed',
          label: 'Rome needed his leadership',
          detail: 'I want to investigate the case for decisive leadership.',
        },
        {
          id: 'threat',
          label: 'His power threatened the Republic',
          detail: 'I want to investigate the case for limits on power.',
        },
        {
          id: 'undecided',
          label: 'I need more evidence',
          detail: 'I want to compare the strongest cases before deciding.',
        },
      ],
      reasonPrompt: 'What is your first reason for that position?',
      reasonHint: 'My starting view is… because… I am still uncertain about…',
      questionPrompt: 'What evidence could change your mind?',
      questionHint: 'I would reconsider if a reliable source showed…',
    },
    mission: [
      'Build a claim using historical sources.',
      'Respond fairly to a strong opposing argument.',
      'Record a Senate address and reflect after the class proceeding.',
    ],
    action: 'Take My Seat in the Senate',
    finalExample: {
      button: 'Explore a final Senate-proceeding example',
      format: 'Senate address + rebuttal + reflection',
      title: 'An argument that can withstand a challenge',
      introduction:
        'A model address outline shows the reasoning a completed debate should make visible. Students supply historical citations from their project sources; this preview is not an answer key or a completed historical evidence set.',
      chapters: [
        {
          label: '01 · Opening address',
          title: 'State the question behind the speech',
          studentWork:
            '“Senators, stability matters. My argument asks whether the power used to achieve it can remain accountable. I will compare what our sources show about leadership and limits.”',
          evidence:
            'The final address needs a precise claim and citations to the historical evidence used to support it.',
          teacherNote:
            'Assess the claim and its evidence, not whether the student chose a preferred side.',
        },
        {
          label: '02 · Rebuttal',
          title: 'Answer the strongest opposing case',
          studentWork:
            '“The opposing speaker argues that concentrated power could end disorder. That is a serious concern. My response is to ask what evidence shows whether the proposed limits would work.”',
          evidence:
            'Rebuttal structure: opposing claim → fair summary → source-supported response → implication for the verdict.',
          teacherNote:
            'The response should address the actual opposing argument and avoid substituting personal attacks or slogans.',
        },
        {
          label: '03 · Reflection',
          title: 'Show intellectual movement',
          studentWork:
            '“My opening view focused on leadership. The debate made me ask more about accountability. I would now qualify my claim and identify the source that changed my reasoning.”',
          evidence:
            'Class presentation: ordered Senate addresses and rebuttals, followed by individual reflection on the proceeding.',
          teacherNote:
            'Compare the saved opening response with the final reflection to identify growth, uncertainty, and evidence-based revision.',
        },
      ],
      lookFors: [
        'A claim supported by historical citations',
        'A fair, direct rebuttal',
        'A reflection linked to the initial position',
      ],
    },
  },
  {
    capabilityId: 'project.intro',
    schemaVersion: '1.0',
    projectId: 'race-around-the-world',
    teaser: voyageTeaser,
    version: '1.0.1',
    theme: 'atlas',
    image: '/journey-replay/world-atlas-v1.png',
    imageAlt: 'An illustrated world atlas with coastlines, oceans, and an expedition atmosphere.',
    kicker: 'Lisbon harbor · A world of consequential choices',
    headline: 'The horizon is calling. What kind of voyage will you lead?',
    story:
      'Your expedition is preparing to leave Lisbon. The council wants a plan. Your crew needs supplies. Your charts leave questions unanswered. Every route has tradeoffs—and the people you encounter have their own stories, choices, and rights.',
    hook: 'Can you defend your route when the shortest line is not the wisest journey?',
    role: 'Expedition captain',
    challenge: {
      title: 'Two routes. One decision to defend.',
      context:
        'Practice chart: Route A is shorter, but its winds and resupply points are uncertain. Route B is longer, with recorded winds and a known resupply stop. What would you recommend?',
      options: [
        {
          id: 'short',
          label: 'Try the shorter route',
          detail: 'Save distance, but prepare for missing information.',
          feedback:
            'A shorter route may use less time—but distance alone does not predict sailing time or safety. What evidence about wind and supplies would justify the risk?',
        },
        {
          id: 'supported',
          label: 'Use the documented route',
          detail: 'Accept extra distance for more planning information.',
          feedback:
            'Known winds and resupply can support a plan. You still need to weigh the extra distance, supply use, and reliability of the reports.',
        },
        {
          id: 'investigate',
          label: 'Investigate before choosing',
          detail: 'Compare wind notes, charts, and supply estimates.',
          feedback:
            'You have identified a useful next step. Name which missing evidence matters most so your investigation leads to a decision.',
        },
      ],
      takeaway:
        'The map records your path. Your explanations show why you took it. The consequences include more than the expedition’s own success.',
    },
    decision: {
      prompt: 'Which purpose would you propose to the council?',
      options: [
        {
          id: 'trade',
          label: 'Find a trading route',
          detail: 'Consider profit, exchange, and the interests of trading partners.',
        },
        {
          id: 'mapping',
          label: 'Improve the charts',
          detail: 'Reduce uncertainty and document what your sources can support.',
        },
        {
          id: 'influence',
          label: 'Investigate a bid for influence',
          detail: 'Examine the council’s ambitions and consequences for other communities.',
        },
      ],
      reasonPrompt: 'Why this purpose? Predict one difficult choice your crew may face.',
      reasonHint: 'I propose… because… A difficult choice might be…',
      questionPrompt: 'Whose perspective or what evidence must you seek?',
      questionHint: 'Before deciding…, I need to understand…',
    },
    mission: [
      'Use maps and sources to defend each decision.',
      'Keep a log of your route, tradeoffs, and consequences.',
      'Present a replay of your expedition and explain how your thinking changed.',
    ],
    action: 'Set Sail from Lisbon',
    finalExample: {
      button: 'Play a completed expedition example',
      format: 'Guided route replay + captain’s explanations',
      title: 'Team Compass: the journey behind the line',
      introduction:
        'Step through an illustrative expedition story. This text replay models the final presentation; it is separate from your saved voyage and contains no student recordings.',
      chapters: [
        {
          label: '01 · Lisbon · Departure',
          title: 'A route begins with a reason',
          studentWork:
            '“We began by wanting the shortest route. After comparing the practice wind notes and resupply information, we chose the better-documented route and recorded the tradeoff.”',
          evidence:
            'Replay checkpoint: map location + chosen route + cited evidence + the crew’s explanation.',
          teacherNote:
            'Look for geographic evidence that actually influenced the decision, rather than a citation added after the fact.',
        },
        {
          label: '02 · At sea · Revision',
          title: 'Explain the change in course',
          studentWork:
            '“In this example, falling supplies changed our priorities. We chose to resupply rather than continue toward the original goal. That cost time, but reduced our uncertainty about the next leg.”',
          evidence:
            'Decision record: original plan → changing conditions → alternative considered → revised route.',
          teacherNote:
            'The path and the explanation should agree. A strong reflection identifies the cost of the revised choice.',
        },
        {
          label: '03 · Return · Reflection',
          title: 'Success depends on whose story you tell',
          studentWork:
            '“Our captain’s log is only one account. We would compare it with the community’s account of the encounter. Our final explanation must consider consequences for people beyond our crew.”',
          evidence:
            'Final presentation: saved route, ordered decision checkpoints, student explanations, sources, and a concluding reflection.',
          teacherNote:
            'Use the replay to assess decisions and historical perspective, not just whether the expedition reached its destination.',
        },
      ],
      lookFors: [
        'A recorded route with evidence-based explanations',
        'Visible alternatives, tradeoffs, and revisions',
        'Consideration of affected communities',
      ],
    },
  },
  {
    capabilityId: 'project.intro',
    schemaVersion: '1.0',
    projectId: 'survival-island-story-lab',
    teaser: survivalIslandHistoryTeaser,
    version: '1.2.0',
    theme: 'island-story',
    image: '/narrative-studio/survival-island-history-launch-v1.jpg',
    imageAlt:
      'A fictional young survivor faces three historically inspired island horizons beneath a storm.',
    kicker: 'History sends a distress signal · Choose when it reaches shore',
    headline: 'A real moment in history is about to become your character’s greatest test.',
    story:
      'Choose a Pacific wayfinding voyage, Selkirk’s 1709 rescue, or the Endurance crew’s wait on Elephant Island in 1916. Then place one fictional person inside that historical pressure. The facts set the horizon—but the story does not exist until you decide what happens next.',
    hook: 'When history controls the conditions, how will your character’s choices change their fate?',
    role: 'Historical-fiction narrative designer',
    challenge: {
      title: 'Which reader choice carries the strongest story pressure?',
      context:
        'The storm is approaching. The protagonist sees smoke beyond the trees and also hears someone calling from a flooded cave.',
      options: [
        {
          id: 'direction-only',
          label: 'Go left or go right',
          detail: 'Choose a direction without revealing what matters.',
          feedback:
            'Directions can move a character, but the reader cannot yet tell what either path might risk or protect.',
        },
        {
          id: 'costly-choice',
          label: 'Follow the smoke or answer the call',
          detail: 'Choose between possible rescue and helping someone in danger.',
          feedback:
            'Both options protect something and risk something. The choice can reveal the protagonist’s priorities and create different consequences.',
        },
        {
          id: 'obvious-answer',
          label: 'Wait safely or walk into danger',
          detail: 'Make one option clearly correct before the reader chooses.',
          feedback:
            'If one choice is obviously safe and the other is only dangerous, the decision may feel like a quiz. Give both options a believable reason and cost.',
        },
      ],
      takeaway:
        'A meaningful choice is not merely a fork in the trail. It reveals what the character values and changes what becomes possible later.',
    },
    decision: {
      prompt: 'What kind of pressure do you want your island story to explore?',
      options: [
        {
          id: 'courage',
          label: 'Courage under pressure',
          detail: 'A character must act while afraid and discover what courage actually requires.',
        },
        {
          id: 'trust',
          label: 'Trust and betrayal',
          detail: 'A character must decide whose story to believe when evidence is incomplete.',
        },
        {
          id: 'responsibility',
          label: 'Survival or responsibility',
          detail:
            'A character must weigh personal safety against protecting someone or something else.',
        },
      ],
      reasonPrompt: 'Why could that pressure lead to difficult, revealing choices?',
      reasonHint: 'This pressure interests me because my character might have to choose between…',
      questionPrompt: 'What do you want a player to wonder after making the final choice?',
      questionHint: 'After the ending, I want the player to wonder whether…',
    },
    mission: [
      'Build a story bible and map a finishable branching narrative.',
      'Write scenes in your own voice while a coach questions, challenges, and checks.',
      'Playtest multiple paths, revise the consequences, and publish a playable story.',
    ],
    action: 'Enter the Story Lab',
    finalExample: {
      button: 'Play the Grade 5 sample story',
      format: 'Playable Grade 5 historical-fiction story + author reflection',
      title: 'The Fire Above the Cove',
      introduction:
        'Play a complete branching story about fictional deckhand Tomás during Alexander Selkirk’s real rescue on February 2, 1709. Every path protects the historical outcome.',
      chapters: [
        {
          label: '01 · Opening pressure',
          title: 'The Man in Goatskins',
          studentWork:
            'Tomás must follow the stranger’s warning or save the rescue boat’s loose rope while a storm reaches the island.',
          evidence:
            'The first choice offers two understandable goals with different risks, not two unlabeled directions.',
          teacherNote:
            'Look for character motivation inside the action rather than background information delivered before the story begins.',
        },
        {
          label: '02 · Branch and consequence',
          title: 'Different paths reveal different courage',
          studentWork:
            'One route changes what the protagonist knows; another changes whom the protagonist trusts. Both feed the final decision without becoming identical.',
          evidence:
            'The branch map and playtest history show that earlier decisions alter later context or available meaning.',
          teacherNote:
            'A foldback structure is successful when paths converge physically but retain their distinct consequences.',
        },
        {
          label: '03 · Ending and reflection',
          title: 'Five endings, including two fatal dead ends',
          studentWork:
            'Two choices lead to Tomás’s death. Three endings let him survive in different ways. Every path preserves Selkirk’s real rescue.',
          evidence:
            'The author can identify a playtest discovery and explain the revision it caused.',
          teacherNote:
            'Assess control of narrative craft, consequence, continuity, and revision—not whether the student found one preferred ending.',
        },
      ],
      lookFors: [
        'A protagonist whose decisions shape the plot',
        'Distinct choices with visible consequences',
        'Consistent details and purposeful revision across paths',
      ],
    },
  },
  robotDeliveryIntro,
  calendarMonumentIntro,
];
