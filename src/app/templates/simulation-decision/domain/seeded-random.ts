export function seededSequence(seed: number, count: number): number[] {
  let state = normalizeSeed(seed);
  const values: number[] = [];
  for (let index = 0; index < count; index += 1) {
    state = (Math.imul(state, 1_664_525) + 1_013_904_223) >>> 0;
    values.push(state / 4_294_967_296);
  }
  return values;
}

export function deterministicSample<T>(items: readonly T[], seed: number, count: number): T[] {
  const available = [...items];
  const random = seededSequence(seed, Math.min(count, available.length));
  const selected: T[] = [];
  for (const value of random) {
    const index = Math.floor(value * available.length);
    const [item] = available.splice(index, 1);
    if (item !== undefined) {
      selected.push(item);
    }
  }
  return selected;
}

function normalizeSeed(seed: number): number {
  return Number.isFinite(seed) ? Math.abs(Math.trunc(seed)) || 1 : 1;
}
