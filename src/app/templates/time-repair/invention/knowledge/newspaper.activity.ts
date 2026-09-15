import { emptyKnowledge, result, type KnowledgeActivity, type KnowledgeDefinition, type KnowledgeState } from './knowledge.models';

export function newspaperValue(state: KnowledgeState, key: string): number {
  return state.values[key] ?? 0;
}

function validText(value: unknown, max = 180): value is string {
  return typeof value === 'string' && value.trim().length > 0 && value.length <= max;
}

export const newspaperActivity: KnowledgeActivity = {
  validate: (c: KnowledgeDefinition) => {
    const d = c.newspaper;
    return !!d && validText(d.title, 100) && validText(d.era, 80) && validText(d.answer, 300) &&
      Array.isArray(d.editions) && d.editions.length >= 2 && d.editions.length <= 4 &&
      new Set(d.editions.map((e) => e.id)).size === d.editions.length &&
      d.editions.every((e) => validText(e.id, 40) && /^[a-z][a-z0-9-]*$/.test(e.id) && validText(e.masthead, 50) && validText(e.date, 40) &&
        validText(e.headline, 100) && validText(e.subhead, 140) && Array.isArray(e.columns) && e.columns.length >= 2 && e.columns.length <= 4 &&
        e.columns.every((column: string) => validText(column, 180)) && validText(e.signal, 160) && ['alternate', 'historical'].includes(e.kind));
  },
  initial: () => emptyKnowledge(),
  reduce(c, s, a) {
    const d = c.newspaper!;
    if (a.type === 'open' && d.editions.some((e) => e.id === a.target)) {
      const edition = d.editions.find((e) => e.id === a.target)!;
      return {
        ...s,
        selected: edition.id,
        values: { ...s.values, [`opened-${edition.id}`]: 1 },
        message: `${edition.masthead}, ${edition.date}: ${edition.signal}`,
      };
    }
    if (a.type === 'inspect' && typeof a.target === 'string') {
      const [editionId, column] = a.target.split(':');
      const edition = d.editions.find((e) => e.id === editionId);
      const index = Number(column);
      if (!edition || !Number.isInteger(index) || !edition.columns[index]) return s;
      return result(
        { ...s, values: { ...s.values, [`clue-${edition.id}-${index}`]: 1, [`opened-${edition.id}`]: 1 } },
        `${edition.masthead}: ${edition.columns[index]}`,
        true,
        JSON.stringify({ edition: edition.id, column: index, kind: edition.kind }),
      );
    }
    if (a.type === 'compare' && (a.value === 0 || a.value === 1))
      return {
        ...s,
        values: { ...s.values, view: a.value },
        message: a.value ? 'Lay the documented issues beside the alternate record. Look for what changed and what remained.' : 'Read the alternate issues as evidence of a world where the printed debate does not arrive.',
      };
    if (a.type === 'trace') {
      const opened = d.editions.filter((e) => newspaperValue(s, `opened-${e.id}`)).length;
      const clues = Object.keys(s.values).filter((key) => key.startsWith('clue-')).length;
      const complete = opened === d.editions.length && clues >= d.editions.length * 2;
      return result(
        s,
        complete ? `Your press trail reads: ${d.answer}` : `Keep investigating: open every issue and inspect at least two columns in each.`,
        complete,
        JSON.stringify({ opened, clues, interpretation: d.answer }),
      );
    }
    return s;
  },
};
