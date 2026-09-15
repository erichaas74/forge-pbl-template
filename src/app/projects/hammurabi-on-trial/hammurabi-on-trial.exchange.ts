import type { DebateExchangeConfig } from '../../templates/debate-studio/exchange/debate-exchange.models';
import { createExchangeLessons } from '../../templates/debate-studio/exchange/debate-exchange.curriculum';

export const hammurabiDebateExchange: DebateExchangeConfig = {
  schemaVersion: '1.0',
  lessons: createExchangeLessons([
    { title: 'Separate order from fairness', claim: 'Which opening makes a supportable claim about the Code?', strongest: 0, sourceIds: ['river-cities', 'royal-monument', 'law-48', 'law-fees'], choices: [
      { text: 'Law 48 describes crop-failure relief. Examine other laws before claiming fairness for every group.', feedback: 'A specific law supports a limited claim. The city and royal sources add monarchy and empire context; medical fees raise hierarchy questions.' },
      { text: 'A written code proves everyone was treated equally.', feedback: 'A written rule does not prove equal treatment or enforcement. Compare the groups in the medical-fee source.' },
    ] },
    { title: 'Compare purpose and genre', claim: 'How should a speaker use royal claims, written law and an epic?', strongest: 1, sourceIds: ['gods-and-king', 'writing', 'epic', 'royal-monument'], choices: [
      { text: 'Treat royal promises and an epic as records of everyday enforcement.', feedback: 'Purpose and genre matter. Neither a royal claim nor literature establishes how every case was handled.' },
      { text: 'Compare beliefs and authority, and distinguish intended rules from proof of practice.', feedback: 'Connect polytheism, kingship, cuneiform and literature without confusing their evidence. Cuneiform is a writing system, not a language.' },
    ] },
    { title: 'Trace a claim and its consequences', claim: 'Your opponent says canal rules could protect farmers. Which rebuttal is strongest?', strongest: 0, sourceIds: ['law-55', 'law-fees', 'ziggurat'], choices: [
      { text: 'Accept that rules could protect neighbors, then examine who bears the cost and how status affects treatment.', feedback: 'A fair concession leaves a question to test. Compare law 55 with medical fees. Use the ziggurat source for architecture, not proof of enforcement.' },
      { text: 'Monumental buildings prove the canal rule worked fairly.', feedback: 'An architectural source cannot establish fair enforcement of a law. Match evidence to the claim.' },
    ] },
    { title: 'Weigh order, fairness and limits', claim: 'Which closing gives a judge a basis for a verdict?', strongest: 1, sourceIds: ['law-48', 'law-55', 'law-fees', 'river-cities', 'ziggurat', 'epic'], choices: [
      { text: 'The Code was old and famous, so it must have been fair.', feedback: 'Age and fame do not establish fairness. Compare specific protections and unequal treatment.' },
      { text: 'Weigh protections against status differences, answer the opposing interpretation and state the limits of the sources.', feedback: 'Distinguish order from fairness. Your context defense must also explain monarchy, empire, hierarchy, polytheism, writing, architecture, literature and law.' },
    ] },
  ], [
    'Begin context evidence: monarchy, empire and hierarchy.',
    'Explain how one law could create order and question fairness.',
    'Explain polytheism, cuneiform and literature in your context defense.',
    'Distinguish intended protection from evidence of practice.',
    'Propose a hypothetical law change and effects on two groups; examine architecture separately.',
    'Answer a competing interpretation using a cited law.',
    'Compare unavoidable crop failure with negligent canal damage; revisit all eight concepts.',
    'Complete all eight civilization concepts in your independent context defense.',
  ]),
  examples: [
    { name: 'Maya · example', side: 'case-for', points: ['Specific rules could provide protection.'], speech: 'Law 48 describes relief when a crop fails. That is evidence for a particular protection. I argue the Code could help create order, but one law cannot tell us whether all groups were treated fairly.', evidenceIds: ['law-48'] },
    { name: 'Noah · example', side: 'case-against', points: ['Order and equal treatment are different tests.'], speech: 'The medical-fee source distinguishes people by status. That gives us a reason to question equal treatment. A rule can organize society while preserving social hierarchy.', evidenceIds: ['law-fees'] },
    { name: 'Elena · example', side: 'case-for', points: ['Canal responsibilities could protect neighbors.'], speech: 'Law 55 connects canal responsibility to damage suffered by neighbors. This could support cooperation around irrigation. The written rule does not prove how every dispute was settled.', evidenceIds: ['law-55'] },
    { name: 'Sam · example', side: 'case-against', points: ['Royal promises need critical reading.'], speech: 'The royal monument presents the ruler’s authority and purpose. It is useful evidence about kingship, but a royal promise is not proof of fair outcomes. Compare it with the laws themselves.', evidenceIds: ['royal-monument', 'law-fees'] },
  ],
};
