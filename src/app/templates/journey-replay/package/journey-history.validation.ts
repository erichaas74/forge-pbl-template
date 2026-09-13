import type { ValidationIssue } from '../../../core/validation/validation-contracts';

/** Historical events are optional published content, never a branchable runtime state. */
export function validateJourneyHistory(value: unknown): ValidationIssue[] {
  if (value === undefined) return [];
  const invalid = (): ValidationIssue[] => [
    {
      code: 'JOURNEY_HISTORY_INVALID',
      severity: 'error',
      file: 'journey.json',
      message:
        'Historical context needs setting, agency, witness guidance, and uniquely identified, sourced events with a valid period.',
    },
  ];
  if (
    !object(value) ||
    !['setting', 'agency', 'witnessGuidance'].every((key) => text(value[key])) ||
    !Array.isArray(value['events']) ||
    value['events'].length === 0
  )
    return invalid();
  const ids = new Set<string>();
  for (const event of value['events']) {
    if (
      !object(event) ||
      !['id', 'date', 'title', 'summary', 'sourceLabel', 'sourceUrl'].every((key) =>
        text(event[key]),
      ) ||
      !['before-voyage', 'epilogue'].includes(String(event['period'])) ||
      ids.has(String(event['id']))
    )
      return invalid();
    try {
      if (new URL(String(event['sourceUrl'])).protocol !== 'https:') return invalid();
    } catch {
      return invalid();
    }
    ids.add(String(event['id']));
  }
  return [];
}
function object(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}
function text(value: unknown): boolean {
  return typeof value === 'string' && value.trim().length > 0;
}
