import { passthroughAction } from '../../../core/commands/core-state-command-pack';
import type {
  ActionRegistry,
  CommandHandlerRegistry,
} from '../../../core/registries/specialized-registries';
import type { RuntimeStateSnapshot } from '../domain/runtime-state';
import type { ProjectDefinitionGraph } from '../package/project-definition-graph';
import { investigationCommandHandler } from './investigation-command-handlers';

export const investigationActionTypes = [
  'evidence.unlock',
  'evidence.lock',
  'evidence.hide',
  'evidence.reveal',
  'evidence.create',
  'activity.unlock',
  'activity.lock',
  'lesson.unlock',
  'phase.unlock',
  'phase.complete',
  'resource.add',
  'resource.spend',
  'message.show',
  'hypothesis.require',
  'revision.require',
  'finalSubmission.open',
  'finalSubmission.close',
  'solution.reveal',
  'teacher.notify',
  'npc.unlockDialogue',
] as const;

export const investigationInternalCommandTypes = [
  'activity.start',
  'activity.complete',
  'activity.submitResult',
  'evidence.view',
  'evidence.collect',
  'evidence.classify',
  'evidence.annotate',
  'evidence.connect',
  'evidence.disconnect',
  'evidence.studentCreate',
  'evidence.useInClaim',
  'hypothesis.create',
  'hypothesis.revise',
  'hypothesis.select',
  'hypothesis.rank',
  'hypothesis.eliminate',
  'hypothesis.attachEvidence',
  'confidence.set',
  'npc.completeDialogue',
  'finalSubmission.submit',
  'teacher.release',
] as const;

export function registerInvestigationActionPack(
  actions: ActionRegistry<RuntimeStateSnapshot>,
  commands: CommandHandlerRegistry<RuntimeStateSnapshot, ProjectDefinitionGraph>,
): void {
  for (const type of investigationActionTypes) {
    actions.register({
      id: type,
      version: '1.0.0',
      status: 'core',
      handler: passthroughAction(type),
    });
  }

  for (const type of [
    ...investigationActionTypes,
    ...investigationInternalCommandTypes,
  ]) {
    commands.register({
      id: type,
      version: '1.0.0',
      status: 'core',
      authority: authoritativeCommandTypes.has(type) ? 'serverRequired' : 'local',
      handler: investigationCommandHandler(type),
    });
  }
}

const authoritativeCommandTypes = new Set<string>([
  'resource.spend',
  'finalSubmission.submit',
  'solution.reveal',
  'teacher.release',
]);

