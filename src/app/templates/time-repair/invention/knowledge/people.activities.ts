import { emptyKnowledge, result, uniqueStrings, type KnowledgeActivity } from './knowledge.models';

export const distributionActivity: KnowledgeActivity = {
  validate: (c) =>
    Array.isArray(c.places) &&
    c.places.length >= 4 &&
    c.places.length <= 6 &&
    new Set(c.places.map((p) => p.id)).size === c.places.length &&
    c.places[0].id === 'workshop' &&
    c.places.every(
      (p) =>
        typeof p.id === 'string' &&
        /^[a-z-]{1,40}$/.test(p.id) &&
        typeof p.name === 'string' &&
        p.name.length > 0 &&
        p.name.length < 80 &&
        Number.isFinite(p.x) &&
        p.x >= 80 &&
        p.x <= 920 &&
        Number.isFinite(p.y) &&
        p.y >= 100 &&
        p.y <= 500 &&
        Number.isInteger(p.need) &&
        p.need >= 0 &&
        p.need <= 3 &&
        Array.isArray(p.links) &&
        p.links.every(
          (l: string) => l !== p.id && c.places!.some((q) => q.id === l && q.links.includes(p.id)),
        ),
    ) &&
    Number.isInteger(c.stock) &&
    c.stock! >= c.places.reduce((n, p) => n + p.need, 0) &&
    c.stock! <= 12 &&
    (() => {
      const seen = new Set(['workshop']);
      for (let i = 0; i < c.places!.length; i++)
        for (const p of c.places!) if (seen.has(p.id)) p.links.forEach((l: string) => seen.add(l));
      return seen.size === c.places!.length;
    })(),
  initial: (c) => ({
    ...emptyKnowledge(),
    selected: 'workshop',
    values: { stock: c.stock!, bag: 0, trips: 0, 'visited-workshop': 1 },
  }),
  reduce(c, s, a) {
    if (
      a.type === 'load' &&
      s.selected === 'workshop' &&
      s.values['stock'] > 0 &&
      s.values['bag'] < 2
    )
      return {
        ...s,
        values: { ...s.values, stock: s.values['stock'] - 1, bag: s.values['bag'] + 1 },
        message: 'A real copy moves from the workshop pile into the messenger’s bag.',
      };
    if (a.type === 'move') {
      const from = c.places!.find((p) => p.id === s.selected)!;
      const to = c.places!.find((p) => p.id === a.target);
      if (!to || !from.links.includes(to.id))
        return {
          ...s,
          message:
            'Follow a connected street or bridge. The messenger cannot cross buildings or the river.',
        };
      return {
        ...s,
        selected: to.id,
        placements: { ...s.placements, previous: from.id },
        values: { ...s.values, trips: s.values['trips'] + 1, ['visited-' + to.id]: 1 },
        message: to.need
          ? `${to.name}: look through the open room to see what is waiting for a copy.`
          : to.id === 'workshop'
            ? 'The messenger has reached the workshop. Refill the bag from the remaining pile.'
            : 'The messenger crosses the bridge. Follow a street into the other district.',
      };
    }
    if (a.type === 'deliver') {
      const place = c.places!.find((p) => p.id === s.selected)!;
      const delivered = s.values['delivered-' + place.id] ?? 0;
      if (!place.need)
        return {
          ...s,
          message:
            place.id === 'workshop'
              ? 'Load copies here; the destinations are across the town.'
              : 'This bridge connects destinations. Carry the copies on to a reader.',
        };
      if (!s.values['bag'])
        return { ...s, message: 'The bag is empty. The waiting room still has no new copy.' };
      if (delivered >= place.need)
        return {
          ...s,
          message:
            'This destination already has its requested copies. Other readers are still waiting.',
        };
      const values = {
        ...s.values,
        bag: s.values['bag'] - 1,
        ['delivered-' + place.id]: delivered + 1,
      };
      const done = c.places!.every((p) => (values['delivered-' + p.id] ?? 0) >= p.need);
      return result(
        { ...s, values },
        done
          ? 'The copies are in use throughout the town. Printing supplied them; routes and people made them available.'
          : `${place.name} receives a copy. Its room changes as people start using the page.`,
        true,
        `Delivered to ${place.id}; carried ${values['bag']}; stock ${values['stock']}`,
      );
    }
    return s;
  },
};

export const ACCESS_TOOLS = ['copy', 'loan', 'translation', 'reading'] as const;
export const accessActivity: KnowledgeActivity = {
  validate: (c) =>
    Array.isArray(c.readers) &&
    c.readers.length === 3 &&
    new Set(c.readers.map((p) => p.id)).size === 3 &&
    c.readers.every(
      (p) =>
        typeof p.id === 'string' &&
        /^[a-z-]{1,40}$/.test(p.id) &&
        typeof p.name === 'string' &&
        p.name.length > 0 &&
        p.name.length < 80 &&
        ['cost', 'language', 'reading'].includes(p.barrier),
    ),
  initial: () => emptyKnowledge(),
  reduce(c, s, a) {
    if (a.type === 'select' && ACCESS_TOOLS.includes(a.item as (typeof ACCESS_TOOLS)[number]))
      return { ...s, selected: a.item! };
    if (a.type === 'offer') {
      const reader = c.readers!.find((p) => p.id === a.target);
      if (!reader || !s.selected) return s;
      const id = reader.id;
      const values = { ...s.values };
      const placements = { ...s.placements };
      if (s.selected === 'copy' || s.selected === 'loan') values['copy-' + id] = 1;
      if (s.selected !== 'copy') placements[id] = s.selected;
      const helper = placements[id];
      const hasCopy = !!values['copy-' + id];
      const help =
        reader.barrier === 'cost'
          ? helper === 'loan'
          : reader.barrier === 'language'
            ? helper === 'translation'
            : helper === 'reading';
      const usable = hasCopy && help;
      values['using-' + id] = usable ? 1 : 0;
      const blocked: Record<string, string> = {
        cost: 'The price still prevents ownership. A loan could make a shared copy available.',
        language: 'The reader can read, but the language on this page is unfamiliar.',
        reading:
          'This person can understand the spoken explanation, but cannot independently read this page.',
      };
      return result(
        { ...s, placements, values },
        usable
          ? `${reader.name} can now use the diagram. Watch the construction on the table change.`
          : !hasCopy
            ? 'The assistance has arrived, but it needs a copy of the information to work with.'
            : blocked[reader.barrier],
        usable,
        `${id}: copy=${hasCopy}; help=${helper ?? 'none'}; barrier=${reader.barrier}`,
      );
    }
    return s;
  },
};

export const TEACHING_CASES = ['ink', 'packing', 'type'] as const;
export const apprenticeActivity: KnowledgeActivity = {
  validate: (c) => uniqueStrings(c.cases, 3) && TEACHING_CASES.every((x) => c.cases!.includes(x)),
  initial: () => ({ ...emptyKnowledge(), values: { case: 0, expert: 1 } }),
  reduce(c, s, a) {
    if (
      a.type === 'case' &&
      Number.isInteger(a.value) &&
      a.value! >= 0 &&
      a.value! < c.cases!.length
    )
      return {
        ...s,
        selected: '',
        placements: {},
        values: { ...s.values, case: a.value!, running: 0 },
        message:
          'A different failure reaches the bench. Inspect the new impression before choosing an example.',
      };
    if (a.type === 'expert')
      return {
        ...s,
        values: { ...s.values, expert: s.values['expert'] ? 0 : 1 },
        message: s.values['expert']
          ? 'The expert leaves. The apprentice can use the physical examples you have taught.'
          : 'The expert returns and places a failed sheet beside the machine.',
      };
    if (
      a.type === 'select' &&
      /^(before|fault|repair|after)-(ink|packing|type)$/.test(a.item ?? '')
    )
      return { ...s, selected: a.item! };
    if (a.type === 'place' && s.selected && /^[0-3]$/.test(a.target ?? '')) {
      const placements = { ...s.placements };
      for (const k of Object.keys(placements))
        if (placements[k] === s.selected) delete placements[k];
      placements[a.target!] = s.selected;
      return {
        ...s,
        placements,
        message:
          'The object is on the teaching bench. Show the chain from failed impression to cause, repair, and successful impression.',
      };
    }
    if (a.type === 'teach') {
      const fault = c.cases![s.values['case']];
      const order = ['before', 'fault', 'repair', 'after'].map((p) => `${p}-${fault}`);
      const ok = order.every((p, i) =>
        i === 3 ? s.placements[String(i)]?.startsWith('after-') : s.placements[String(i)] === p,
      );
      return result(
        {
          ...s,
          values: {
            ...s.values,
            ['learned-' + fault]: ok ? 1 : (s.values['learned-' + fault] ?? 0),
            demonstration: ok ? 1 : 0,
          },
        },
        ok
          ? `The apprentice follows the ${fault} example: symptom, cause, changed part, and a clean proof. The example stays available after the expert leaves.`
          : 'The apprentice follows the objects but cannot connect the failure to this repair. Inspect the order and whether all four belong to the same failure.',
        ok,
        JSON.stringify({ fault, sequence: s.placements }),
      );
    }
    if (a.type === 'run') {
      const fault = c.cases![s.values['case']];
      const ok = !!s.values['learned-' + fault];
      return result(
        {
          ...s,
          values: {
            ...s.values,
            running: ok ? 1 : -1,
            output: (s.values['output'] ?? 0) + (ok ? 1 : 0),
          },
        },
        ok
          ? `The apprentice recognizes the ${fault} symptom and uses the demonstrated repair without the expert’s help.`
          : 'The apprentice produces another failed sheet. A finished book alone did not explain how to diagnose this fault.',
        ok,
        `Independent ${fault} repair; trained=${ok}; expert=${s.values['expert']}`,
      );
    }
    return s;
  },
};
