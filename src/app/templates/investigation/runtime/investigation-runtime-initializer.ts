import type { RuntimeError } from '../../../core/errors/runtime-error';
import { runtimeError } from '../../../core/errors/runtime-error-factory';
import type { RuntimeScope } from '../../../core/state/runtime-state-contracts';
import type { Clock } from '../../../core/time/clock';
import { SystemClock } from '../../../core/time/clock';
import type { RuntimeStateSnapshot } from '../domain/runtime-state';
import type { RandomizationDefinition } from '../randomization/randomization-contracts';
import type { ProjectDefinitionGraph } from '../package/project-definition-graph';

export interface RuntimeInitializationResult {
  snapshot: RuntimeStateSnapshot;
  errors?: RuntimeError[];
}

export class InvestigationRuntimeInitializer {
  constructor(private readonly clock: Clock = new SystemClock()) {}

  create(graph: ProjectDefinitionGraph, scope: RuntimeScope): RuntimeInitializationResult {
    const assignedAt = this.clock.now();
    const stateValues = Object.fromEntries(
      [...graph.stateById.values()].map((definition) => [
        definition.id,
        structuredClone(definition.initialValue),
      ]),
    );
    const randomization: RuntimeStateSnapshot['randomization'] = {};
    const errors: RuntimeError[] = [];

    if (graph.tenantId !== scope.tenantId) {
      errors.push(
        runtimeError(
          'PROJECT_TENANT_MISMATCH',
          'Project definition tenant does not match the requested runtime scope.',
          { sourceId: graph.projectId },
        ),
      );
    }

    for (const definition of graph.randomizationsById.values()) {
      const result = this.randomize(definition, scope);
      if (result.error !== undefined) {
        errors.push(result.error);
        continue;
      }
      randomization[definition.id] = {
        seed: result.seed,
        value: structuredClone(result.value),
        assignedAt,
      };
      stateValues[definition.outputStateId] = structuredClone(result.value);
    }

    const phases = [...graph.investigation.phases].sort(
      (left, right) => left.order - right.order || left.id.localeCompare(right.id),
    );

    const snapshot: RuntimeStateSnapshot = {
      version: 0,
      tenantId: scope.tenantId,
      projectId: graph.projectId,
      projectVersion: graph.projectVersion,
      lastUpdated: assignedAt,
      scope: structuredClone(scope),
      stateValues,
      firedRuleIds: [],
      evidence: Object.fromEntries(
        [...graph.evidenceById.values()].map((definition) => [
          definition.id,
          {
            status: definition.availability.initialState,
            notes: [],
            relationshipIds: [],
          },
        ]),
      ),
      studentEvidence: {},
      evidenceRelationships: [],
      artifacts: {},
      activities: Object.fromEntries(
        [...graph.activitiesById.keys()].map((id) => [
          id,
          {
            status: 'notStarted',
            resultHistory: [],
            completionStatus: 'notStarted',
            submissionStatus: 'notRequired',
            masteryStatus: 'notMeasured',
            approvalStatus: 'notRequired',
            gradeStatus: 'ungraded',
          },
        ]),
      ),
      hypotheses: [],
      resources: Object.fromEntries(
        [...graph.resourcesById.values()].map((definition) => [
          definition.id,
          definition.initialAmount,
        ]),
      ),
      board: { itemLocations: {}, itemOrder: {}, notes: [], questions: [] },
      phases: Object.fromEntries(
        phases.map((phase, index) => [
          phase.id,
          {
            status: index === 0 && (phase.entryRuleIds?.length ?? 0) === 0 ? 'available' : 'locked',
          },
        ]),
      ),
      lessons: Object.fromEntries(
        [...graph.lessonsById.keys()].map((id) => [id, { status: 'locked' }]),
      ),
      requirements: {
        hypothesisRequired: false,
        revisionRequired: graph.investigation.hypotheses?.requireRevision ?? false,
      },
      finalSubmission: {
        status: 'closed',
        availabilityStatus: 'closed',
        submissionStatus: 'notSubmitted',
        approvalStatus: 'notRequired',
        gradeStatus: 'ungraded',
        argumentDraft: { evidenceIds: [] },
        artifactIds: [],
      },
      solutionRevealed: false,
      messages: [],
      teacherNotifications: [],
      teacherReleases: {},
      teamTasks: {},
      mastery: {},
      randomization,
      npc: Object.fromEntries(
        [...graph.npcsById.values()].map((definition) => [
          definition.id,
          {
            dialogueCompletedIds: [],
            unlockedDialogueIds: [],
            state: structuredClone(definition.initialState ?? {}),
          },
        ]),
      ),
    };

    return {
      snapshot,
      errors: errors.length === 0 ? undefined : errors,
    };
  }

  private randomize(
    definition: Readonly<RandomizationDefinition>,
    scope: RuntimeScope,
  ): { seed: string; value?: unknown; error?: RuntimeError } {
    const seed = this.seed(definition, scope);
    const random = seededRandom(seed);
    const options = definition.options ?? [];
    if (definition.strategy === 'numericRange') {
      return {
        seed,
        error: runtimeError(
          'RANDOMIZATION_CONFIGURATION_UNDERSPECIFIED',
          `Randomization "${definition.id}" uses numericRange, but the V1 schema defines no range bounds.`,
          { sourceId: definition.id },
        ),
      };
    }
    if (options.length === 0) {
      return {
        seed,
        error: runtimeError(
          'RANDOMIZATION_OPTIONS_MISSING',
          `Randomization "${definition.id}" requires at least one option.`,
          { sourceId: definition.id },
        ),
      };
    }

    if (definition.strategy === 'shuffle') {
      const values = options.map((option) => structuredClone(option.value));
      for (let index = values.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(random() * (index + 1));
        [values[index], values[swapIndex]] = [values[swapIndex], values[index]];
      }
      return { seed, value: values };
    }

    if (definition.strategy === 'weightedChoice') {
      const weights = options.map((option) => option.weight ?? 1);
      if (weights.some((weight) => weight <= 0 || !Number.isFinite(weight))) {
        return {
          seed,
          error: runtimeError(
            'RANDOMIZATION_WEIGHT_INVALID',
            `Randomization "${definition.id}" has an invalid weight.`,
            { sourceId: definition.id },
          ),
        };
      }
      const total = weights.reduce((sum, weight) => sum + weight, 0);
      let selection = random() * total;
      for (let index = 0; index < options.length; index += 1) {
        selection -= weights[index] ?? 0;
        if (selection <= 0) {
          return { seed, value: structuredClone(options[index]?.value) };
        }
      }
    }

    const selected = options[Math.floor(random() * options.length)];
    return { seed, value: structuredClone(selected?.value) };
  }

  private seed(definition: Readonly<RandomizationDefinition>, scope: RuntimeScope): string {
    if (definition.seedStrategy === 'fixed' && definition.fixedSeed !== undefined) {
      return definition.fixedSeed;
    }
    const scopeValue =
      definition.scope === 'student'
        ? scope.studentId
        : definition.scope === 'team'
          ? scope.teamId
          : definition.scope === 'class'
            ? scope.classId
            : scope.projectId;
    return [scope.projectId, scope.projectVersion, definition.id, scopeValue ?? 'default'].join(
      '::',
    );
  }
}

function seededRandom(seed: string): () => number {
  let state = 2166136261;
  for (const character of seed) {
    state ^= character.charCodeAt(0);
    state = Math.imul(state, 16777619);
  }
  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}
