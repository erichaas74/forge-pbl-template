import type { DebateExchangeConfig } from '../../templates/debate-studio/exchange/debate-exchange.models';
import { createExchangeLessons } from '../../templates/debate-studio/exchange/debate-exchange.curriculum';

export const romanDebateExchange: DebateExchangeConfig = {
  schemaVersion: '1.0',
  lessons: createExchangeLessons([
    { title: 'Connect a claim to evidence', claim: 'Which opening makes a claim the audience can examine?', strongest: 1, sourceIds: ['ev-reforms', 'ev-rubicon', 'ev-senate-crisis'], choices: [
      { text: 'Caesar was popular, so every action he took was right.', feedback: 'Popularity does not justify every action. Name a policy and explain its effect.' },
      { text: 'Caesar’s reforms addressed problems in Rome; his use of military power still needs a separate defense.', feedback: 'This limits the claim and leaves room for an objection. Inspect the reform and Rubicon sources to test both parts.' },
    ] },
    { title: 'Critique the source, then revise', claim: 'A speaker cites Cicero as proof that everyone opposed Caesar. What is the strongest critique?', strongest: 0, sourceIds: ['ev-cicero', 'ev-dictator', 'ev-reforms'], choices: [
      { text: 'One elite voice cannot establish what everyone thought. Compare evidence about other groups.', feedback: 'Purpose, position and scope matter. Preserve Cicero’s evidence while narrowing the claim it supports.' },
      { text: 'Cicero had a viewpoint, so none of his evidence can be used.', feedback: 'A viewpoint is a reason to examine a source. Ask what it can and cannot show.' },
    ] },
    { title: 'Answer the strongest objection', claim: 'Your opponent argues that Caesar’s reforms helped Rome. Which response engages that claim?', strongest: 1, sourceIds: ['ev-reforms', 'ev-dictator', 'ev-veterans'], choices: [
      { text: 'My opponent wants Rome to have no laws.', feedback: 'That is not the stated argument. Summarize the reform claim fairly before responding.' },
      { text: 'Some reforms may have helped people. That does not settle whether concentrating authority endangered republican government.', feedback: 'This separates benefits from the institutional question. Use the dictator source to support the second part.' },
    ] },
    { title: 'Weigh a closing argument', claim: 'Which closing helps a judge compare the cases?', strongest: 0, sourceIds: ['ev-rubicon', 'ev-reforms', 'ev-dictator', 'ev-senate-crisis'], choices: [
      { text: 'Compare the benefits of reform with the risks to republican authority, then explain why your evidence carries more weight.', feedback: 'State your judgment, weigh the strongest evidence and answer an actual opponent.' },
      { text: 'Our side spoke most confidently, so our interpretation must be correct.', feedback: 'Delivery helps listeners follow a case, but confidence is not historical evidence.' },
    ] },
  ], [
    'Name a republican institution and explain its function.',
    'Connect political participation and power to the opposing cases.',
    'Compare Cicero’s perspective with evidence about other groups.',
    'Explain the tradeoff between reform and concentrated authority.',
    'Evaluate a peer’s claim while preserving your earlier version.',
    'Practice clear oral delivery during the exchange.',
    'Ask your teacher for a fresh source detail to test independently.',
    'Explain institutions, law and participation in your final defense.',
  ]),
  examples: [
    { name: 'Maya · example', side: 'caesarian-reformers', points: ['Judge reforms by the problems they addressed.'], speech: 'Caesar’s reforms addressed problems in Rome. Their benefits deserve weight, although they do not by themselves justify his military choices.', evidenceIds: ['ev-reforms'] },
    { name: 'Noah · example', side: 'republic-defenders', points: ['Military force can threaten civic authority.'], speech: 'The Rubicon crossing raises a question about military force and civic authority. Even useful reforms do not remove that concern. A defense of Caesar must explain why one leader should hold so much power.', evidenceIds: ['ev-rubicon', 'ev-dictator'] },
    { name: 'Elena · example', side: 'caesarian-reformers', points: ['Compare Caesar with the Senate’s difficulties.'], speech: 'The Senate crisis source describes an unstable political setting. That context can explain demands for change, but it does not prove every change was justified.', evidenceIds: ['ev-senate-crisis'] },
    { name: 'Sam · example', side: 'republic-defenders', points: ['A source represents a perspective.'], speech: 'Cicero’s concerns help us examine republican ideals. His position limits what his account tells us about all Romans. I would compare his perspective with the reforms before reaching a judgment.', evidenceIds: ['ev-cicero', 'ev-reforms'] },
  ],
};
