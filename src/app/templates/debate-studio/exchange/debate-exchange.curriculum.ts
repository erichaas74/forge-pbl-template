import type { DebateSkillExample, ExchangeLesson } from './debate-exchange.models';

/** Shared cadence; subject content belongs in the project package. */
export function createExchangeLessons(skills: readonly [DebateSkillExample, DebateSkillExample, DebateSkillExample, DebateSkillExample], context: readonly string[] = []): readonly ExchangeLesson[] {
  const entries = [
    { title: 'Choose a side · opening argument', mode: 'opening', tasks: ['Hear the prompt and choose a side.', 'Arrange your first points and connect sources.', 'Produce your individual opening argument.'], product: 'Opening argument with evidence', skill: skills[0] },
    { title: 'Exchange 1 · answer an opponent', mode: 'exchange', tasks: ['Exchange openings with an opposing group or individual.', 'Select the argument you will answer.', 'Submit a rebuttal by the end of class.'], product: 'First response linked to an opposing opening', skill: skills[0] },
    { title: 'Source clinic · refine the response', mode: 'refine', tasks: ['Review the arguments and try the source critique.', 'Critique another speaker who shares your side.', 'Use feedback to revise your argument independently.'], product: 'Refined argument and same-side peer critique', skill: skills[1] },
    { title: 'Exchange 2 · test the rebuttal', mode: 'exchange', tasks: ['Exchange refined arguments with an opponent.', 'Identify the strongest objection.', 'Submit a supported response by the end of class.'], product: 'Second response with an explicit counterargument', skill: skills[1] },
    { title: 'Reasoning clinic · strengthen the case', mode: 'refine', tasks: ['Try the reasoning critique and discuss it.', 'Give another same-side performer useful feedback.', 'Revise your response and explain the change.'], product: 'Reasoned revision with feedback attached', skill: skills[2] },
    { title: 'Exchange 3 · answer the strongest case', mode: 'exchange', tasks: ['Exchange arguments with an opposing group or individual.', 'Answer their strongest point fairly.', 'Submit your next response by the end of class.'], product: 'Third response with evidence and a fair concession', skill: skills[2] },
    { title: 'Closing clinic · refine and rehearse', mode: 'refine', tasks: ['Review the history and try the closing critique.', 'Use same-side feedback to refine your final case.', 'Rehearse; review any recording before submitting it.'], product: 'Refined closing preparation and revision trail', skill: skills[3] },
    { title: 'Final exchange · judge the performers', mode: 'final', tasks: ['Exchange and present closing arguments.', 'Review individual performances from both sides.', 'Rank up to three performers with evidence, reasoning and response quality.'], product: 'Closing argument, justified ballot and performer rankings', skill: skills[3] },
  ] as const;
  return entries.map((entry, index) => ({ ...entry, tasks: context[index] ? [...entry.tasks, context[index]] : entry.tasks, number: index + 1, sourceIds: entry.skill.sourceIds }));
}
