import type {
  JourneyChoiceDefinition,
  JourneyProjectConfig,
  StudentJourneyRecord,
} from '../domain/journey-replay.models';

/** One calculation shared by the preview, recorded outcome, and replay narration. */
export function resolveJourneyOutcome(
  config: Pick<JourneyProjectConfig, 'resources'>,
  record: { readonly resources: StudentJourneyRecord['resources']; readonly completedSteps: readonly { readonly choiceId: string }[] },
  choice: Pick<JourneyChoiceDefinition, 'resourceChanges' | 'consequenceModifiers' | 'consequence'>,
) {
  const priorChoices = new Set(record.completedSteps.map((step) => step.choiceId));
  const modifiers = (choice.consequenceModifiers ?? []).filter((modifier) =>
    priorChoices.has(modifier.afterChoiceId),
  );
  const changes = { ...choice.resourceChanges };
  for (const modifier of modifiers) {
    for (const [id, amount] of Object.entries(modifier.resourceChanges)) {
      changes[id] = (changes[id] ?? 0) + amount;
    }
  }
  const resources = { ...record.resources };
  for (const [id, amount] of Object.entries(changes)) {
    const definition = config.resources.find((resource) => resource.id === id);
    if (!definition) throw new Error('RESOURCE_NOT_FOUND');
    if (!Number.isFinite(amount)) throw new Error('RESOURCE_CHANGE_INVALID');
    resources[id] = Math.max(
      definition.minimum,
      Math.min(definition.maximum, resources[id] + amount),
    );
  }
  return {
    resources,
    consequence: [choice.consequence, ...modifiers.map((modifier) => modifier.narrative)].join(' '),
    carriedForward: modifiers.map((modifier) => modifier.narrative),
    changes: config.resources.flatMap((resource) => {
      const before = record.resources[resource.id];
      const after = resources[resource.id];
      return after === before ? [] : [{ ...resource, before, after, delta: after - before }];
    }),
  };
}
