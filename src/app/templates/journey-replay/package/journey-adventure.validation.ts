import type { ValidationIssue } from '../../../core/validation/validation-contracts';
import type {
  JourneyResourceDefinition,
  JourneyStepDefinition,
} from '../domain/journey-replay.models';

export function validateJourneyAdventures(
  steps: readonly JourneyStepDefinition[],
  resources: readonly JourneyResourceDefinition[],
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const priorChoices = new Set<string>();
  const resourceIds = new Set(resources.map((resource) => resource.id));
  const fail = (id: string, message: string) =>
    issues.push({
      code: 'JOURNEY_ADVENTURE_INVALID',
      severity: 'error',
      file: 'journey.json',
      entityId: id,
      message,
    });
  const validChanges = (value: unknown) =>
    isRecord(value) &&
    Object.entries(value).every(
      ([id, amount]) =>
        resourceIds.has(id) && typeof amount === 'number' && Number.isFinite(amount),
    );
  for (const step of steps) {
    const adventure: unknown = step.adventure;
    if (
      adventure !== undefined &&
      (!isRecord(adventure) ||
        !['harbor', 'ocean', 'storm', 'landfall'].includes(String(adventure['atmosphere'])) ||
        !['title', 'narrative', 'stakes'].every(
          (key) =>
            typeof adventure[key] === 'string' && (adventure[key] as string).trim().length > 0,
        ) ||
        !Array.isArray(adventure['learningGoals']) ||
        adventure['learningGoals'].length === 0 ||
        !adventure['learningGoals'].every(
          (goal: unknown) => typeof goal === 'string' && goal.trim().length > 0,
        ))
    ) {
      fail(step.id, 'Adventure needs a supported atmosphere, story, stakes, and learning goals.');
    }
    for (const choice of step.choices) {
      if (choice.resourceChanges !== undefined && !validChanges(choice.resourceChanges))
        fail(choice.id, 'Resource changes must reference known resources with finite amounts.');
      const modifiers: unknown = choice.consequenceModifiers;
      if (modifiers === undefined) continue;
      if (!Array.isArray(modifiers)) {
        fail(choice.id, 'Consequence modifiers must be an array.');
        continue;
      }
      const seen = new Set<string>();
      for (const modifier of modifiers) {
        if (
          !isRecord(modifier) ||
          typeof modifier['afterChoiceId'] !== 'string' ||
          !priorChoices.has(modifier['afterChoiceId']) ||
          seen.has(modifier['afterChoiceId']) ||
          !validChanges(modifier['resourceChanges']) ||
          typeof modifier['narrative'] !== 'string' ||
          !modifier['narrative'].trim()
        ) {
          fail(
            choice.id,
            'A consequence modifier must reference a unique earlier choice and include valid changes and narration.',
          );
        } else seen.add(modifier['afterChoiceId']);
      }
    }
    step.choices.forEach((choice) => priorChoices.add(choice.id));
  }
  return issues;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
