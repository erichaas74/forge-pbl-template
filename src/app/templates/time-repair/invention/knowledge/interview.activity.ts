import { emptyKnowledge, result, type KnowledgeActivity, type KnowledgeDefinition, type KnowledgeState } from './knowledge.models';

export function interviewValue(state: KnowledgeState, key: string): number {
  return state.values[key] ?? 0;
}

function validText(value: unknown, max = 220): value is string {
  return typeof value === 'string' && value.trim().length > 0 && value.length <= max;
}

export const interviewActivity: KnowledgeActivity = {
  validate: (c: KnowledgeDefinition) => {
    const d = c.interview;
    return !!d && validText(d.title, 100) && validText(d.era, 80) && validText(d.answer, 300) &&
      Array.isArray(d.witnesses) && d.witnesses.length >= 3 && d.witnesses.length <= 5 &&
      new Set(d.witnesses.map((w) => w.id)).size === d.witnesses.length &&
      d.witnesses.every((w) => validText(w.id, 40) && /^[a-z][a-z0-9-]*$/.test(w.id) && validText(w.name, 60) && validText(w.role, 80) &&
        validText(w.date, 40) && validText(w.statement, 260) && validText(w.artifact, 100) && validText(w.clue, 160));
  },
  initial: () => emptyKnowledge(),
  reduce(c, s, a) {
    const d = c.interview!;
    if (a.type === 'hear' && d.witnesses.some((w) => w.id === a.target)) {
      const witness = d.witnesses.find((w) => w.id === a.target)!;
      return {
        ...s,
        selected: witness.id,
        values: { ...s.values, [`heard-${witness.id}`]: 1 },
        message: `${witness.name}, ${witness.role}: “${witness.statement}”`,
      };
    }
    if (a.type === 'inspect' && d.witnesses.some((w) => w.id === a.target)) {
      const witness = d.witnesses.find((w) => w.id === a.target)!;
      return result(
        { ...s, values: { ...s.values, [`artifact-${witness.id}`]: 1, [`heard-${witness.id}`]: 1 } },
        `${witness.artifact}: ${witness.clue}`,
        true,
        JSON.stringify({ witness: witness.id, artifact: witness.artifact }),
      );
    }
    if (a.type === 'compare' && (a.value === 0 || a.value === 1))
      return {
        ...s,
        values: { ...s.values, view: a.value },
        message: a.value ? 'Historical record selected. Compare testimony with the surviving printed evidence.' : 'Alternate record selected. Compare what each witness could see without a working print network.',
      };
    if (a.type === 'weigh') {
      const heard = d.witnesses.filter((w) => interviewValue(s, `heard-${w.id}`)).length;
      const artifacts = d.witnesses.filter((w) => interviewValue(s, `artifact-${w.id}`)).length;
      const complete = heard === d.witnesses.length && artifacts === d.witnesses.length;
      return result(
        s,
        complete ? `The interviews agree on a bounded explanation: ${d.answer}` : 'The board is missing a voice or its physical evidence. Hear and inspect every witness before weighing the account.',
        complete,
        JSON.stringify({ heard, artifacts, interpretation: d.answer }),
      );
    }
    return s;
  },
};
