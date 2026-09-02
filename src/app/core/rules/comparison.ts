import type { RuntimeError } from '../errors/runtime-error';
import { runtimeError } from '../errors/runtime-error-factory';

export type ComparisonOperator =
  | 'equals'
  | 'notEquals'
  | 'greaterThan'
  | 'greaterThanOrEqual'
  | 'lessThan'
  | 'lessThanOrEqual'
  | 'contains'
  | 'notContains'
  | 'in'
  | 'notIn'
  | 'exists';

export interface ComparisonResult {
  matched: boolean;
  errors?: RuntimeError[];
}

const operators = new Set<ComparisonOperator>([
  'equals',
  'notEquals',
  'greaterThan',
  'greaterThanOrEqual',
  'lessThan',
  'lessThanOrEqual',
  'contains',
  'notContains',
  'in',
  'notIn',
  'exists',
]);

export function compareValues(
  actual: unknown,
  operator: string,
  expected: unknown,
): ComparisonResult {
  if (!operators.has(operator as ComparisonOperator)) {
    return {
      matched: false,
      errors: [
        runtimeError(
          'INVALID_COMPARISON_OPERATOR',
          `Comparison operator "${operator}" is not supported.`,
        ),
      ],
    };
  }

  switch (operator as ComparisonOperator) {
    case 'equals':
      return { matched: Object.is(actual, expected) };
    case 'notEquals':
      return { matched: !Object.is(actual, expected) };
    case 'exists':
      return { matched: actual !== undefined && actual !== null };
    case 'greaterThan':
    case 'greaterThanOrEqual':
    case 'lessThan':
    case 'lessThanOrEqual':
      if (typeof actual !== 'number' || typeof expected !== 'number') {
        return invalidValues(operator);
      }
      return {
        matched:
          operator === 'greaterThan'
            ? actual > expected
            : operator === 'greaterThanOrEqual'
              ? actual >= expected
              : operator === 'lessThan'
                ? actual < expected
                : actual <= expected,
      };
    case 'contains':
    case 'notContains': {
      const contains =
        (Array.isArray(actual) && actual.some((value) => Object.is(value, expected))) ||
        (typeof actual === 'string' &&
          typeof expected === 'string' &&
          actual.includes(expected));
      if (!Array.isArray(actual) && typeof actual !== 'string') {
        return invalidValues(operator);
      }
      return { matched: operator === 'contains' ? contains : !contains };
    }
    case 'in':
    case 'notIn':
      if (!Array.isArray(expected)) {
        return invalidValues(operator);
      }
      return {
        matched:
          operator === 'in'
            ? expected.some((value) => Object.is(value, actual))
            : !expected.some((value) => Object.is(value, actual)),
      };
  }
}

function invalidValues(operator: string): ComparisonResult {
  return {
    matched: false,
    errors: [
      runtimeError(
        'INVALID_COMPARISON_VALUE',
        `Comparison operator "${operator}" received incompatible values.`,
      ),
    ],
  };
}

