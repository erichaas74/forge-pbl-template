import {
  emptyKnowledge,
  result,
  uniqueStrings,
  type KnowledgeActivity,
  type KnowledgeState,
} from './knowledge.models';

/** The two tabletop experiments have separate inventories; a reference is not a repair. */
export function circulationValue(s: KnowledgeState, key: string): number {
  return s.values[`${s.values['reference'] ? 'reference' : 'altered'}-${key}`] ?? 0;
}
export const circulationActivity: KnowledgeActivity = {
  validate: (c) => {
    const d = c.circulation;
    return (
      !!d &&
      [d.document, d.mark, d.author, d.origin, d.date, d.trace].every(
        (v) => typeof v === 'string' && v.trim().length > 0 && v.length <= 90,
      ) &&
      d.mark.length <= 4 &&
      Array.isArray(d.destinations) &&
      uniqueStrings(
        d.destinations.map((p) => p.id),
        3,
      ) &&
      d.destinations.every(
        (p) => typeof p.name === 'string' && p.name.length > 0 && p.name.length <= 25,
      )
    );
  },
  initial: () => ({ ...emptyKnowledge(), values: { 'altered-stock': 1, 'reference-stock': 1 } }),
  reduce: (c, s, a) => {
    const d = c.circulation!;
    if (a.type === 'compare' && (a.value === 0 || a.value === 1))
      return result(
        { ...s, values: { ...s.values, reference: a.value } },
        a.value
          ? 'Archive comparison: try the same actions with working presses. Your broken-timeline evidence is kept separately.'
          : 'Broken timeline: the manuscript and travel routes still exist. Investigate where copying fails.',
        true,
        `Comparison position: ${a.value ? 'working reference' : 'fictional failure'}. This does not repair the timeline.`,
      );
    const reference = !!s.values['reference'];
    const prefix = reference ? 'reference' : 'altered';
    const n = (key: string) => circulationValue(s, key);
    const next = (changes: Record<string, number>) => ({
      ...s,
      values: {
        ...s.values,
        ...Object.fromEntries(
          Object.entries(changes).map(([key, value]) => [`${prefix}-${key}`, value]),
        ),
      },
    });
    if (a.type === 'copy') {
      if (n('stock') >= 6)
        return result(
          s,
          'The dispatch tray is full. Send a copy before making another.',
          false,
          'Six-copy model capacity reached.',
        );
      const stroke = (n('stroke') + 1) % 4;
      return result(
        next({ stroke, stock: n('stock') + (stroke === 0 ? 1 : 0) }),
        stroke === 0
          ? 'A handwritten copy is ready to travel. The original remains here.'
          : 'The scribe is still copying. Follow the ink appearing on the page.',
        stroke === 0,
        `Hand-copy stage ${stroke || 4}/4; dispatch copies ${n('stock') + (stroke === 0 ? 1 : 0)}. Turns are not historical timings.`,
      );
    }
    const place = d.destinations.find((p) => p.id === a.target);
    if (!place) return s;
    const id = place.id;
    if (a.type === 'send') {
      if (n(`copies-${id}`) >= 6)
        return result(
          s,
          `${place.name}'s rack is full. Share a copy before sending another.`,
          false,
          'No additional copy spent.',
        );
      if (!n('stock'))
        return result(
          s,
          'The dispatch tray is empty. Make another handwritten copy.',
          false,
          'No copy available to send.',
        );
      return result(
        next({ stock: n('stock') - 1, [`seed-${id}`]: 1, [`copies-${id}`]: n(`copies-${id}`) + 1 }),
        `A manuscript reached ${place.name}. Travel works; can this workshop multiply it?`,
        true,
        `One copy transferred to ${place.name}; source retained there for reprinting.`,
      );
    }
    if (a.type === 'print') {
      if (!n(`seed-${id}`))
        return result(
          s,
          'The workshop has no source to set in type. Send it a manuscript.',
          false,
          'No source at this press.',
        );
      const copies = n(`copies-${id}`);
      if (reference && copies >= 6)
        return result(
          s,
          'The drying rack is full. Share a copy before printing again.',
          false,
          'Six-copy model capacity reached.',
        );
      return result(
        next({
          [`proof-${id}`]: reference ? 2 : 1,
          [`copies-${id}`]: reference ? Math.min(6, copies + 3) : copies,
          [`pull-${id}`]: n(`pull-${id}`) + 1,
        }),
        reference
          ? `Usable copies are drying in ${place.name}. People still need someone to carry and explain them.`
          : `The letters barely transfer in ${place.name}. The manuscript arrived, but the press made no usable new copies. Inspect the failed sheet.`,
        reference,
        `${place.name}: ${reference ? 'working reference produced a model batch of up to three' : 'failed ink transfer produced zero usable copies'}.`,
      );
    }
    if (a.type === 'share') {
      if (n(`readers-${id}`) >= 3)
        return result(
          s,
          'All three discussion tables here have a copy.',
          true,
          'Local tabletop capacity reached; this is not a measure of historical readership.',
        );
      if (!n(`copies-${id}`))
        return result(
          s,
          'There is no copy to share. The press needs to produce another.',
          false,
          'Empty local supply.',
        );
      return result(
        next({
          [`copies-${id}`]: n(`copies-${id}`) - 1,
          [`readers-${id}`]: n(`readers-${id}`) + 1,
        }),
        'A copy starts a discussion. Readers can question or disagree with it; receiving a page does not mean accepting its ideas.',
        true,
        `${place.name}: one copy moved to a discussion table. Public discussion, not religious conversion, is represented.`,
      );
    }
    if (a.type === 'inspect')
      return result(
        next({ [`inspected-${id}`]: 1 }),
        reference
          ? 'The reference impression carries the marks clearly. Compare it with the faint sheet in the broken timeline.'
          : `The ink stays readable on paper but beads on metal type. The fictional fault trail leads back to ${d.trace}.`,
        true,
        `${place.name}: ${reference ? 'reference impression examined' : 'paper/metal ink comparison; earlier workshop trace examined'}.`,
      );
    return s;
  },
};
