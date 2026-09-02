import { runtimeError } from '../errors/runtime-error-factory';
import type { RuntimeError } from '../errors/runtime-error';
import type { StateMutation } from './persistence-contracts';

export interface MutationApplicationResult<TState> {
  success: boolean;
  state: TState;
  errors?: RuntimeError[];
}

const forbiddenSegments = new Set(['__proto__', 'prototype', 'constructor']);

export function applyStateMutations<TState>(
  state: Readonly<TState>,
  mutations: readonly StateMutation[],
): MutationApplicationResult<TState> {
  const working = structuredClone(state) as TState;

  for (const mutation of mutations) {
    const result = applyMutation(working, mutation);
    if (result !== undefined) {
      return { success: false, state: structuredClone(state), errors: [result] };
    }
  }

  return { success: true, state: working };
}

function applyMutation(target: unknown, mutation: StateMutation): RuntimeError | undefined {
  const segments = parsePointer(mutation.path);
  if (segments.length === 0 || segments.some((segment) => forbiddenSegments.has(segment))) {
    return runtimeError(
      'INVALID_MUTATION_PATH',
      `Mutation path "${mutation.path}" is invalid.`,
    );
  }

  let parent: unknown = target;
  for (const segment of segments.slice(0, -1)) {
    if (!isContainer(parent)) {
      return runtimeError(
        'INVALID_MUTATION_PATH',
        `Mutation path "${mutation.path}" does not resolve to a container.`,
      );
    }
    parent = parent[segment];
  }

  if (!isContainer(parent)) {
    return runtimeError(
      'INVALID_MUTATION_PATH',
      `Mutation path "${mutation.path}" does not resolve to a writable target.`,
    );
  }

  const key = segments[segments.length - 1];
  if (key === undefined) {
    return runtimeError('INVALID_MUTATION_PATH', 'Mutation path has no target.');
  }
  const current = parent[key];

  switch (mutation.operation) {
    case 'set':
      parent[key] = structuredClone(mutation.value);
      return undefined;
    case 'increment':
    case 'decrement': {
      if (typeof current !== 'number' || typeof mutation.value !== 'number') {
        return runtimeError(
          'INVALID_MUTATION_VALUE',
          `${mutation.operation} requires numeric current and mutation values.`,
        );
      }
      parent[key] =
        mutation.operation === 'increment'
          ? current + mutation.value
          : current - mutation.value;
      return undefined;
    }
    case 'toggle':
      if (typeof current !== 'boolean') {
        return runtimeError('INVALID_MUTATION_VALUE', 'toggle requires a boolean target.');
      }
      parent[key] = !current;
      return undefined;
    case 'append':
      if (!Array.isArray(current)) {
        return runtimeError('INVALID_MUTATION_VALUE', 'append requires an array target.');
      }
      current.push(structuredClone(mutation.value));
      return undefined;
    case 'add':
      if (!Array.isArray(current)) {
        return runtimeError('INVALID_MUTATION_VALUE', 'add requires an array target.');
      }
      if (!current.some((value) => Object.is(value, mutation.value))) {
        current.push(structuredClone(mutation.value));
      }
      return undefined;
    case 'remove':
      if (!Array.isArray(current)) {
        return runtimeError('INVALID_MUTATION_VALUE', 'remove requires an array target.');
      }
      parent[key] = current.filter((value) => !Object.is(value, mutation.value));
      return undefined;
  }
}

function parsePointer(pointer: string): string[] {
  if (!pointer.startsWith('/')) {
    return [];
  }
  return pointer
    .slice(1)
    .split('/')
    .map((segment) => segment.replaceAll('~1', '/').replaceAll('~0', '~'));
}

function isContainer(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function pointer(...segments: readonly string[]): string {
  return `/${segments
    .map((segment) => segment.replaceAll('~', '~0').replaceAll('/', '~1'))
    .join('/')}`;
}

