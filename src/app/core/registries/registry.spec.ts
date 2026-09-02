import type { ConditionEvaluator } from '../rules/rule-contracts';
import { Registry } from './registry';
import {
  CapabilityRegistry,
  ConditionRegistry,
  EvidenceTypeRegistry,
} from './specialized-registries';

interface TestRegistration {
  id: string;
  label: string;
}

describe('Registry', () => {
  it('registers and resolves entries by stable ID', () => {
    const registry = new Registry<TestRegistration>('test');

    const registration = registry.register({ id: 'entry.one', label: 'One' });

    expect(registration.ok).toBe(true);
    expect(registry.has('entry.one')).toBe(true);
    expect(registry.get('entry.one')?.label).toBe('One');
    expect(registry.resolve('entry.one')).toEqual(registration);
  });

  it('rejects duplicate registrations without replacing the original', () => {
    const registry = new Registry<TestRegistration>('test');
    registry.register({ id: 'entry.one', label: 'Original' });

    const duplicate = registry.register({ id: 'entry.one', label: 'Replacement' });

    expect(duplicate.ok).toBe(false);
    if (duplicate.ok) {
      throw new Error('Expected duplicate registration to fail.');
    }
    expect(duplicate.error).toMatchObject({
      code: 'DUPLICATE_REGISTRATION',
      registry: 'test',
      id: 'entry.one',
    });
    expect(registry.get('entry.one')?.label).toBe('Original');
  });

  it('returns a structured result for an unknown ID', () => {
    const registry = new Registry<TestRegistration>('test');

    const missing = registry.resolve('missing.entry');

    expect(missing.ok).toBe(false);
    if (missing.ok) {
      throw new Error('Expected missing registration lookup to fail.');
    }
    expect(missing.error).toEqual({
      code: 'REGISTRATION_NOT_FOUND',
      registry: 'test',
      id: 'missing.entry',
      message: 'Registration "missing.entry" was not found in registry "test".',
    });
  });

  it('rejects blank or whitespace-padded IDs', () => {
    const registry = new Registry<TestRegistration>('test');

    const blank = registry.register({ id: '', label: 'Blank' });
    const padded = registry.register({ id: ' entry ', label: 'Padded' });

    expect(blank.ok && blank.value).toBe(false);
    expect(padded.ok && padded.value).toBe(false);
    expect(registry.list()).toHaveLength(0);
  });

  it('returns registrations in deterministic ID order', () => {
    const registry = new Registry<TestRegistration>('test');
    registry.registerAll([
      { id: 'zeta', label: 'Zeta' },
      { id: 'alpha', label: 'Alpha' },
    ]);

    const entries = registry.list();

    expect(entries.map((entry) => entry.id)).toEqual(['alpha', 'zeta']);
    expect(Object.isFrozen(entries)).toBe(true);
  });
});

describe('specialized registries', () => {
  it('stores capability metadata through the capability registry', () => {
    const registry = new CapabilityRegistry();

    registry.register({
      id: 'investigation.evidence',
      version: '1.0.0',
      status: 'core',
      eventsProduced: ['evidence.collected'],
    });

    expect(registry.resolve('investigation.evidence')).toMatchObject({
      ok: true,
      value: { status: 'core' },
    });
  });

  it('keeps condition evaluators and renderers behind typed registries', () => {
    const evaluator: ConditionEvaluator<{ ready: boolean }> = {
      type: 'state.ready',
      evaluate: (_condition, state) => state.ready,
    };
    const conditions = new ConditionRegistry<{ ready: boolean }>();
    const renderer = { render: () => 'preview' };
    const evidenceTypes = new EvidenceTypeRegistry<typeof renderer>();

    conditions.register({
      id: evaluator.type,
      version: '1.0.0',
      status: 'core',
      evaluator,
    });
    evidenceTypes.register({
      id: 'text',
      version: '1.0.0',
      status: 'core',
      renderer,
    });

    expect(conditions.get('state.ready')?.evaluator).toBe(evaluator);
    expect(evidenceTypes.get('text')?.renderer.render()).toBe('preview');
  });
});

