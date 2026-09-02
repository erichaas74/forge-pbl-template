import type { RuleDefinition } from '../../../core/rules/rule-contracts';
import type { ActivityDefinition } from '../../../shared/activities/activity-contracts';
import type { LessonDefinition } from '../../../shared/content/lesson-contracts';
import type { CaseBoardConfiguration } from '../case-board/case-board-contracts';
import type {
  InvestigationConfiguration,
  ProjectManifest,
  StateVariableDefinition,
} from '../domain';
import type { InvestigationTeamSettings } from '../domain/audience-team';
import type { EvidenceDefinition } from '../evidence/evidence-contracts';
import type { FinalSubmissionDefinition } from '../final-investigation/final-submission-contracts';
import type { NPCDefinition } from '../npc/npc-contracts';
import type { RandomizationDefinition } from '../randomization/randomization-contracts';
import type { InvestigationResource } from '../resources/resource-contracts';

export interface ProjectDefinitionGraph {
  tenantId: string;
  projectId: string;
  projectVersion: string;
  manifest: Readonly<ProjectManifest>;
  investigation: Readonly<InvestigationConfiguration>;
  caseBoard: Readonly<CaseBoardConfiguration>;
  evidenceById: ReadonlyMap<string, Readonly<EvidenceDefinition>>;
  activitiesById: ReadonlyMap<string, Readonly<ActivityDefinition>>;
  lessonsById: ReadonlyMap<string, Readonly<LessonDefinition>>;
  rulesById: ReadonlyMap<string, Readonly<RuleDefinition>>;
  stateById: ReadonlyMap<string, Readonly<StateVariableDefinition>>;
  resourcesById: ReadonlyMap<string, Readonly<InvestigationResource>>;
  randomizationsById: ReadonlyMap<string, Readonly<RandomizationDefinition>>;
  npcsById: ReadonlyMap<string, Readonly<NPCDefinition>>;
  teams?: Readonly<InvestigationTeamSettings>;
  finalSubmission: Readonly<FinalSubmissionDefinition>;
  capabilities: ReadonlySet<string>;
}
