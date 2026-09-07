import { ageOfExplorationJourneyConfig as config } from '../age-of-exploration-journey/age-of-exploration-journey.config';
import {
  completeJourneyStep,
  createInitialJourneyRecord,
  selectJourneyChoice,
  updateJourneyResponseDraft,
  reviseJourneyResponse,
} from '../../templates/journey-replay/core/journey-replay.engine';
import type {
  JourneyEnrollment,
  JourneyResponseDraft,
  StudentJourneyRecord,
} from '../../templates/journey-replay/domain/journey-replay.models';
import { responseFingerprint } from '../../templates/journey-replay/domain/journey-tutor.contracts';
import type { SampleGuide } from '../../shared/project-intro/completed-sample-guide';

export const journeySampleEnrollment: JourneyEnrollment = {
  tenantId: 'completed-sample',
  classId: 'sample-voyagers',
  studentId: 'sample-alex',
  studentDisplayName: 'Alex Rivera · North Star crew',
  classLabel: 'Fictional Grade 6 expedition',
  mode: 'demo',
};
const drafts: readonly { choiceId: string; draft: JourneyResponseDraft }[] = [
  {
    choiceId: 'mission-trade',
    draft: {
      responseMode: 'text',
      transcript: '',
      text: 'We chose trade because ledger-1 shows a hoped-for selling price above the purchase price. That is a motive, not a guaranteed profit: ledger-2 says food, repairs, wages, and losses must be paid. Mapping could help later voyages, but our sponsor wants an exchange we can explain with costs as well as revenue.',
      prediction: 'Trade may earn money if the crew survives the route and costs stay below sales.',
      citations: [
        {
          evidenceId: 'evidence-spice-ledger',
          paragraphId: 'ledger-1',
          explanation:
            'The difference between buying and hoped-for selling prices explains the sponsor’s motive.',
        },
        {
          evidenceId: 'evidence-spice-ledger',
          paragraphId: 'ledger-2',
          explanation: 'Costs can erase that hoped-for return.',
        },
      ],
    },
  },
  {
    choiceId: 'supply-water',
    draft: {
      responseMode: 'text',
      transcript: '',
      text: 'We chose extra water and food. Wind-3 explains that delays increase time at sea, while provisions protect the crew and occupy cargo space. Instruments help navigation but cannot replace drinking water. We accept less trade cargo to have a margin if weather delays us.',
      prediction: 'The extra provisions should leave a reserve after an unexpected delay.',
      citations: [
        {
          evidenceId: 'evidence-wind-chart',
          paragraphId: 'wind-3',
          explanation: 'Extra water reduces one consequence of delays, at the cost of cargo space.',
        },
      ],
    },
  },
  {
    choiceId: 'route-choice-islands',
    draft: {
      responseMode: 'text',
      transcript: '',
      text: 'The island arc heads west to the Azores before turning south toward Cape Verde. Chart-2 explains the extra time and supplies, but a planned refuge is valuable to our crew. We accept the six-week route rather than the shorter direct crossing. The island stop reduces some risk; it does not make the sea predictable.',
      prediction:
        'We expect to reach Cape Verde with fewer supplies but a planned refuge along the way.',
      citations: [
        {
          evidenceId: 'evidence-portolan',
          paragraphId: 'chart-2',
          explanation: 'The westward detour changes both our map path and our supply budget.',
        },
      ],
    },
  },
  {
    choiceId: 'storm-west',
    draft: {
      responseMode: 'text',
      transcript: '',
      text: 'We should turn west because storm-2 says it uses fewer supplies than the southern option. That seems safest for the damaged ship.',
      prediction: 'Turning west should preserve more supplies than repairing and continuing south.',
      citations: [
        {
          evidenceId: 'evidence-storm-log',
          paragraphId: 'storm-2',
          explanation:
            'The scenario gives the westward choice lower supply cost, but it changes our intended direction.',
        },
      ],
    },
  },
  {
    choiceId: 'encounter-negotiate',
    draft: {
      responseMode: 'text',
      transcript: '',
      text: 'We will pause and negotiate. The ship recorder in account-ship calls the meeting peaceful because the crew returned unharmed and wants to leave before weather changes. The community representative in account-community needs provisions for households and says the exchange terms were not agreed. Those are different interests. An unharmed crew does not prove a fair exchange. We need to ask what terms the community accepts and whether the interpreter explained them accurately.',
      prediction:
        'More time may allow agreement, but the crew cannot assume agreement or count the ship’s gain as everyone’s success.',
      citations: [
        {
          evidenceId: 'evidence-port-accounts',
          paragraphId: 'account-ship',
          explanation: 'The recorder judges the meeting mainly by the crew’s safety and schedule.',
        },
        {
          evidenceId: 'evidence-port-accounts',
          paragraphId: 'account-community',
          explanation: 'The community needs to retain household supplies and agree on terms.',
        },
      ],
    },
  },
];
export function createJourneySample(): StudentJourneyRecord {
  let record = createInitialJourneyRecord(
    config,
    journeySampleEnrollment.studentId,
    '2026-04-10T14:00:00.000Z',
  );
  for (const [index, item] of drafts.entries()) {
    const now = '2026-04-' + String(11 + index).padStart(2, '0') + 'T14:00:00.000Z';
    record = selectJourneyChoice(config, record, item.choiceId);
    let draft = {
      ...structuredClone(item.draft),
      evidenceViewed: [...new Set(item.draft.citations?.map((c) => c.evidenceId))],
    };
    if (item.choiceId === 'storm-west') {
      draft = {
        ...draft,
        tutorTurns: [
          {
            id: 'sample-question-storm',
            stepId: 'step-storm',
            choiceId: item.choiceId,
            responseFingerprint: responseFingerprint(draft),
            criterionId: 'consequences',
            question:
              'Safer for whom, and what does turning west give up? Compare the two route costs.',
            answer:
              'West costs 18 supplies and 4 time units; south costs 25 supplies and 7. West protects more of our reserve, but abandons our intended southern route.',
            createdAt: now,
            source: 'scaffold',
          },
        ],
      };
    }
    record = updateJourneyResponseDraft(record, draft);
    record = completeJourneyStep(config, record, now);
  }
  const prior = record.completedSteps.find((step) => step.stepId === 'step-storm')!.studentResponse;
  record = reviseJourneyResponse(
    config,
    record,
    'step-storm',
    {
      ...drafts[3].draft,
      text: 'We turned west with the simulated favorable winds. Storm-1 describes a torn mainsail, and storm-2 explains that west uses fewer supplies but changes our intended direction. We compared 18 supplies and 4 time units for west with 25 supplies and 7 for south. West preserved 7 supplies and 3 time units relative to the alternative. Our actual reserve fell after the storm, so this was still a cost. Protecting the crew meant giving up the southern route; it did not guarantee success at the next encounter.',
      citations: [
        ...drafts[3].draft.citations!,
        {
          evidenceId: 'evidence-storm-log',
          paragraphId: 'storm-1',
          explanation:
            'The damaged sail explains why continuing into difficult conditions could worsen the problem.',
        },
      ],
      tutorTurns: prior.tutorTurns,
    },
    'The scaffold question made me compare both costs and state what our choice sacrificed.',
    '2026-04-16T14:00:00.000Z',
  );
  return record;
}
export const journeySampleGuide: SampleGuide = {
  title: 'Our Class Race Around the World',
  subtitle:
    'Explore a simulated class showcase: follow one crew through its journey snapshots, then compare its decisions, route, outcome, and revisions with every other voyage.',
  audience: 'Whole-class historical inquiry · Grade 6',
  duration: 'Two presentation modes · Explore at your pace',
  trail: [
    {
      label: 'Opening scene',
      title: 'Five crews leave the chart table.',
      text: 'The showcase begins with one featured route, then reveals how crews used the same starting evidence to make different plans.',
      evidence: 'Mode 1 → Voyage snapshots presents one group stop by stop.',
    },
    {
      label: 'Turning point',
      title: 'The storm redraws the race.',
      text: 'Shared dangers create different consequences as each crew balances time, supplies, safety, and its original purpose.',
      evidence: 'The map marks route-changing moments and the ports crews still share.',
    },
    {
      label: 'Big reveal',
      title: 'One class reaches multiple endings.',
      text: 'The comparison keeps one crew in focus while the other routes show that success can mean distance, safety, impact, or discovery.',
      evidence: 'Mode 2 → Class comparison places the featured route against every voyage.',
    },
    {
      label: 'Reflection',
      title: 'Revision becomes part of the story.',
      text: 'Class performance summarizes completion, reasoning readiness, teacher review, and the crews that changed their claims.',
      evidence: 'The simulated summary includes approved, submitted, and revision-requested records.',
    },
  ],
  review: {
    strength:
      'The final presentation makes both individual reasoning and class-wide patterns visible without collapsing the voyages into one average path.',
    question:
      'Where did crews facing the same evidence make different choices, and what did each choice protect or sacrifice?',
    revision:
      'Earlier claims remain visible through the class revision count, so the showcase presents learning as a change in reasoning.',
    assessment:
      'The simulated summary demonstrates geography, cause and consequence, perspective, evidence use, and teacher review. It is a fictional preview, not a live class grade.',
  },
};
