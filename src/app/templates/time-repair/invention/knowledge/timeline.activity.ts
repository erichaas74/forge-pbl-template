import { emptyKnowledge, result, type KnowledgeActivity, type KnowledgeDefinition, type KnowledgeState } from './knowledge.models';

export function timelineValue(state: KnowledgeState, key: string): number {
  return state.values[key] ?? 0;
}

function validText(value: unknown, max = 180): value is string {
  return typeof value === 'string' && value.trim().length > 0 && value.length <= max;
}

export const timelineActivity: KnowledgeActivity = {
  validate: (c: KnowledgeDefinition) => {
    const d = c.timeline;
    return !!d && validText(d.title, 100) && validText(d.era, 80) && validText(d.answer, 60) &&
      Array.isArray(d.nodes) && d.nodes.length >= 4 && d.nodes.length <= 6 &&
      new Set(d.nodes.map((n) => n.id)).size === d.nodes.length &&
      d.nodes.every((n) => validText(n.id, 40) && /^[a-z][a-z0-9-]*$/.test(n.id) && validText(n.label, 90) && validText(n.date, 40) &&
        ['before', 'gap', 'after', 'documented'].includes(n.lane) && validText(n.detail, 240) && validText(n.signal, 160)) &&
      Array.isArray(d.candidates) && d.candidates.length >= 2 && d.candidates.length <= 4 &&
      new Set(d.candidates.map((n) => n.id)).size === d.candidates.length &&
      d.candidates.every((n) => validText(n.id, 40) && /^[a-z][a-z0-9-]*$/.test(n.id) && validText(n.label, 90) && validText(n.detail, 180)) &&
      d.candidates.some((n) => n.id === d.answer);
  },
  initial: () => emptyKnowledge(),
  reduce(c, s, a) {
    const d = c.timeline!;
    if (a.type === 'inspect' && d.nodes.some((n) => n.id === a.target)) {
      const node = d.nodes.find((n) => n.id === a.target)!;
      return result(
        { ...s, values: { ...s.values, [`inspected-${node.id}`]: 1 } },
        `${node.label}: ${node.detail}`,
        true,
        JSON.stringify({ node: node.id, lane: node.lane, signal: node.signal }),
      );
    }
    if (a.type === 'candidate' && d.candidates.some((n) => n.id === a.target)) {
      const candidate = d.candidates.find((n) => n.id === a.target)!;
      return {
        ...s,
        selected: candidate.id,
        message: `Candidate placed in the gap: ${candidate.label}. Check it against every clue before testing.`,
      };
    }
    if (a.type === 'view' && (a.value === 0 || a.value === 1))
      return {
        ...s,
        values: { ...s.values, view: a.value },
        message: a.value ? 'Repaired record: the printed debate can travel beyond Wittenberg.' : 'Broken record: handwriting and local speech remain, but the printed debate is absent.',
      };
    if (a.type === 'test') {
      const inspected = d.nodes.filter((n) => timelineValue(s, `inspected-${n.id}`)).length;
      const complete = inspected === d.nodes.length;
      const correct = s.selected === d.answer;
      return result(
        s,
        !complete
          ? `The timeline still has ${d.nodes.length - inspected} clue${d.nodes.length - inspected === 1 ? '' : 's'} to inspect.`
          : correct
            ? 'The gap closes: your candidate explains the missing event without pretending one broken machine controls every later choice.'
            : 'That candidate leaves a clue unexplained. Return to the timeline and test another possibility.',
        complete && correct,
        JSON.stringify({ inspected, candidate: s.selected ?? '', answer: d.answer }),
      );
    }
    return s;
  },
};
