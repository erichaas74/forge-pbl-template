export function formatMoney(cents: number, showPlus = false): string {
  const prefix = cents < 0 ? '-' : showPlus && cents > 0 ? '+' : '';
  const absolute = Math.abs(cents);
  return `${prefix}$${(absolute / 100).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function applyBasisPoints(cents: number, basisPoints: number): number {
  return Math.round((cents * basisPoints) / 10_000);
}

export function sumCents(values: readonly number[]): number {
  return values.reduce((total, value) => total + value, 0);
}
