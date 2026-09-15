import {
  emptyKnowledge,
  result,
  uniqueStrings,
  type KnowledgeActivity,
  type KnowledgeDefinition,
  type KnowledgeState,
} from './knowledge.models';

export function restoredCells(c: KnowledgeDefinition, s: KnowledgeState): number {
  return (c.fragments ?? []).filter(
    (f) => s.placements[String(f.cell)] === f.id && (s.values[f.id] ?? f.turn) % 4 === 0,
  ).length;
}
export const reconstructionActivity: KnowledgeActivity = {
  validate: (c) =>
    Array.isArray(c.fragments) &&
    c.fragments.length === 6 &&
    new Set(c.fragments.map((f) => f.id)).size === 6 &&
    new Set(c.fragments.map((f) => f.cell)).size === 6 &&
    c.fragments.every(
      (f) =>
        typeof f.id === 'string' &&
        /^[a-z0-9-]{1,40}$/.test(f.id) &&
        Number.isInteger(f.cell) &&
        f.cell >= 0 &&
        f.cell < 6 &&
        Number.isInteger(f.turn) &&
        f.turn >= 0 &&
        f.turn < 4 &&
        [0, 1].includes(f.copy),
    ) &&
    c.fragments.some((f) => f.copy === 0) &&
    c.fragments.some((f) => f.copy === 1),
  initial: (c) => ({
    ...emptyKnowledge(),
    values: Object.fromEntries(c.fragments!.map((f) => [f.id, f.turn])),
  }),
  reduce(c, s, a) {
    if (a.type === 'select' && c.fragments!.some((f) => f.id === a.item))
      return {
        ...s,
        selected: a.item!,
        message: 'A surviving fragment is lifted. Turn it or fit it into the damaged page.',
      };
    if (a.type === 'turn' && s.selected)
      return {
        ...s,
        values: { ...s.values, [s.selected]: ((s.values[s.selected] ?? 0) + 1) % 4 },
        message: 'The fragment turns. Follow the lines across its edges.',
      };
    if (a.type === 'place' && s.selected && /^[0-5]$/.test(a.target ?? '')) {
      const placements = { ...s.placements };
      for (const key of Object.keys(placements))
        if (placements[key] === s.selected) delete placements[key];
      placements[a.target!] = s.selected;
      return {
        ...s,
        placements,
        message: 'The fragment rests on the page. Inspect its joins before sealing.',
      };
    }
    if (a.type === 'lift' && a.target && s.placements[a.target]) {
      const placements = { ...s.placements };
      const selected = placements[a.target];
      delete placements[a.target];
      return { ...s, selected, placements, message: 'The fragment is lifted again.' };
    }
    if (a.type === 'inspect') {
      const count = restoredCells(c, s);
      return result(
        s,
        count === 6
          ? 'The whole drawing connects. Neither surviving copy held all six parts; together they preserve it.'
          : `${count} of six sections connect in their original orientation. Compare the broken joins with the surviving copies.`,
        count === 6,
        JSON.stringify({ placements: s.placements, turns: s.values }),
      );
    }
    return s;
  },
};

export const ASSEMBLY_ROLES = ['frame', 'mold', 'ink', 'screw'] as const;
export function assemblyFault(s: KnowledgeState): string {
  if (ASSEMBLY_ROLES.some((p) => s.placements[p] !== p)) return 'connection';
  if (!s.values['frame']) return 'loose';
  if ((s.values['mold'] ?? 0) < 4) return 'type';
  if ((s.values['ink'] ?? 0) < 2) return 'ink';
  if (s.values['screw'] !== 2) return 'pressure';
  return 'none';
}
export const assemblyActivity: KnowledgeActivity = {
  validate: (c) => uniqueStrings(c.parts, 4) && ASSEMBLY_ROLES.every((p) => c.parts!.includes(p)),
  initial: () => emptyKnowledge(),
  reduce(c, s, a) {
    if (a.type === 'select' && c.parts!.includes(a.item!))
      return {
        ...s,
        selected: a.item!,
        message: 'Fit this craft’s mechanism into a socket. Then operate it.',
      };
    if (a.type === 'fit' && s.selected && c.parts!.includes(a.target!)) {
      const placements = { ...s.placements };
      for (const key of Object.keys(placements))
        if (placements[key] === s.selected) delete placements[key];
      placements[a.target!] = s.selected;
      return {
        ...s,
        placements,
        values: { ...s.values, [a.target!]: 0 },
        message: 'The mechanism is fitted. Its shape and connection determine what it can do.',
      };
    }
    if (
      a.type === 'operate' &&
      c.parts!.includes(a.target!) &&
      s.placements[a.target!] === a.target
    ) {
      const key = a.target!;
      const max = key === 'mold' ? 4 : key === 'frame' ? 1 : 3;
      const value = ((s.values[key] ?? 0) + 1) % (max + 1);
      const messages: Record<string, string> = {
        frame: value
          ? 'The frame grips the type. The pieces stay together.'
          : 'The frame is open; loose pieces can shift.',
        mold: `${value} matching pieces have been cast in this teaching model.`,
        ink: 'The ink coating changes. Too little leaves bare areas.',
        screw: 'The screw converts turning into downward travel. Watch the platen meet the type.',
      };
      return { ...s, values: { ...s.values, [key]: value }, message: messages[key] };
    }
    if (a.type === 'test') {
      const fault = assemblyFault(s);
      const messages: Record<string, string> = {
        connection: 'A mechanism is missing or fitted to the wrong connection.',
        loose: 'The unheld type shifts under the platen.',
        type: 'The mold has not yet supplied the full set of four matching pieces.',
        ink: 'Bare regions of the type leave a faint impression.',
        pressure: 'The platen is not making the intended contact. Try another screw position.',
        none: 'A repeated impression: casting, holding, coating, and pressure now work as a system.',
      };
      return result(
        s,
        messages[fault],
        fault === 'none',
        JSON.stringify({ placements: s.placements, controls: s.values, fault }),
      );
    }
    return s;
  },
};

export function gearContact(c: KnowledgeDefinition, s: KnowledgeState): boolean {
  const x = [c.axles![0], s.values['middle'] ?? c.axles![1], c.axles![2]];
  return [0, 1].every(
    (i) => Math.abs(x[i + 1] - x[i] - c.gearRadii![i] - c.gearRadii![i + 1]) <= 2,
  );
}
export const diagramActivity: KnowledgeActivity = {
  validate: (c) =>
    Array.isArray(c.axles) &&
    c.axles.length === 3 &&
    c.axles.every((v) => Number.isFinite(v) && v >= 200 && v <= 800) &&
    Array.isArray(c.gearRadii) &&
    c.gearRadii.length === 3 &&
    c.gearRadii.every((v) => Number.isFinite(v) && v >= 30 && v <= 80) &&
    [0, 1].every(
      (i) => Math.abs(c.axles![i + 1] - c.axles![i] - c.gearRadii![i] - c.gearRadii![i + 1]) <= 2,
    ),
  initial: (c) => ({
    ...emptyKnowledge(),
    values: { middle: c.axles![1] + 48, blueprint: 0, rotation: 0 },
  }),
  reduce(c, s, a) {
    if (a.type === 'blueprint' && [0, 1].includes(a.value!))
      return {
        ...s,
        placements: {},
        values: {
          ...s.values,
          blueprint: a.value!,
          middle: c.axles![1] + (a.value === 0 ? 48 : 0),
          running: 0,
        },
        message: 'A printed diagram sets the axle positions. Build it and test the claim.',
      };
    if (a.type === 'select' && ['0', '1', '2'].includes(a.item!))
      return { ...s, selected: a.item! };
    if (
      a.type === 'fit' &&
      ['0', '1', '2'].includes(s.selected) &&
      ['0', '1', '2'].includes(a.target!)
    ) {
      const placements = { ...s.placements };
      for (const key of Object.keys(placements))
        if (placements[key] === s.selected) delete placements[key];
      placements[a.target!] = s.selected;
      return {
        ...s,
        placements,
        values: { ...s.values, running: 0 },
        message: 'The wheel sits on its axle. Check the teeth against its neighbor.',
      };
    }
    if (a.type === 'shift' && [-1, 1].includes(a.value!))
      return {
        ...s,
        values: {
          ...s.values,
          middle: Math.max(
            c.axles![1],
            Math.min(c.axles![1] + 48, s.values['middle'] + a.value! * 24),
          ),
          running: 0,
        },
        message:
          'The middle axle moves to the next mounting hole. The printed diagram has not changed yet.',
      };
    if (a.type === 'crank') {
      const placed = [0, 1, 2].every(
        (i) =>
          s.placements[String(i)] !== undefined &&
          c.gearRadii![Number(s.placements[String(i)])] === c.gearRadii![i],
      );
      const ok = placed && gearContact(c, s);
      return result(
        {
          ...s,
          values: { ...s.values, rotation: (s.values['rotation'] ?? 0) + 1, running: ok ? 1 : 0 },
        },
        !placed
          ? 'The wheels are not assembled as the drawing specifies.'
          : ok
            ? 'All three wheels transmit the turn. The output spindle moves.'
            : 'The input turns, but the teeth gap or collide. A printed diagram can still be wrong.',
        ok,
        JSON.stringify({ middle: s.values['middle'], placements: s.placements }),
      );
    }
    if (a.type === 'print') {
      const ok = gearContact(c, s) && s.values['running'] === 1;
      return result(
        {
          ...s,
          values: {
            ...s.values,
            printed: s.values['middle'],
            revision: (s.values['revision'] ?? 0) + 1,
          },
        },
        ok
          ? 'The revised page records a mechanism you actually tested.'
          : 'The page reproduces your present arrangement, including any untested error.',
        ok,
        `Printed axle ${s.values['middle']}`,
      );
    }
    return s;
  },
};
