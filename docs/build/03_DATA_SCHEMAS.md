# Investigation Template Data Schemas

## Purpose

Define the canonical domain contracts for configuration and runtime data.

These interfaces describe the intended architecture. Codex may organize them into multiple TypeScript files as appropriate, but must preserve the semantic separation described here.

---

# 1. Base Types

```ts
export interface BaseEntity {
  id: string;
  schemaVersion: string;

  title?: string;
  description?: string;

  tags?: string[];
  enabled?: boolean;

  extensions?: Record<string, unknown>;

  metadata?: {
    createdBy?: string;
    notes?: string;
  };
}
```

Rules:

- `id` must be stable.
- titles may change; IDs should not.
- extension data must not override core semantics.

---

# 2. Recommended ID Prefixes

Suggested conventions:

```text
project-
phase-
board-
ev-
act-
lesson-
rule-
state-
resource-
random-
npc-
hyp-
skill-
assessment-
rubric-
final-
```

State variable IDs may use semantic namespaces such as:

```text
sample.b.condition
patient.vitals.temperature
case.evidenceCollected
team.labCredits
```

Do not use vague IDs such as `status1`.

---

# 3. Project Manifest

```ts
export interface ProjectManifest extends BaseEntity {
  template: {
    id: 'investigation';
    version: string;
  };

  projectType: 'investigation';

  gradeLevels: number[];

  subjects: {
    primary: string;
    supporting?: string[];
  };

  duration?: {
    value: number;
    unit: 'days' | 'weeks';
  };

  status: 'draft' | 'review' | 'published' | 'archived';

  investigationConfigRef: string;

  standards?: StandardReference[];

  masterySkills?: string[];

  theme?: ThemeConfiguration;

  capabilities: string[];
}

export interface StandardReference {
  id: string;
  framework?: string;
  code?: string;
  label?: string;
  role?: 'primary' | 'supporting';
}

export interface ThemeConfiguration {
  id?: string;
  name?: string;
  extensions?: Record<string, unknown>;
}
```

---

# 4. Investigation Configuration

```ts
export type InvestigationGoal =
  | 'identifyUnknown'
  | 'diagnoseProblem'
  | 'solveMystery'
  | 'determineCause'
  | 'evaluateExplanations'
  | 'recommendSolution';

export type SolutionMode =
  | 'exact'
  | 'multipleDefensible'
  | 'ranked'
  | 'openEvidenceBased';

export interface InvestigationConfiguration extends BaseEntity {
  goals: InvestigationGoal[];

  solutionModel: SolutionMode;

  mission?: {
    role?: string;
    situation?: string;
    drivingQuestion?: string;
    goal?: string;
    stakes?: string;
    missionContentRef?: string;
  };

  phases: InvestigationPhase[];

  openness: InvestigationControlSettings;

  hypotheses?: HypothesisSettings;

  solution?: SolutionDefinition;

  reveal?: RevealSettings;
}
```

---

# 5. Investigation Phases

```ts
export interface InvestigationPhase extends BaseEntity {
  order: number;

  optional?: boolean;

  activityIds?: string[];
  lessonIds?: string[];

  entryRuleIds?: string[];
  completionRuleIds?: string[];
}

export interface InvestigationControlSettings {
  evidenceOrder: 'fixed' | 'partiallyOpen' | 'open';
  activityOrder: 'fixed' | 'partiallyOpen' | 'open';
  lessonOrder: 'fixed' | 'partiallyOpen' | 'open';

  allowDecoys: boolean;
  allowOptionalEvidence: boolean;
  allowRevisit: boolean;

  allowHypothesisRevision: boolean;
  requireHypothesisRevision?: boolean;
  allowMultipleHypotheses?: boolean;

  teacherOverrideAllowed: boolean;
}
```

---

# 6. Solution / Reveal

```ts
export interface SolutionDefinition {
  mode: SolutionMode;

  exactSolutionIds?: string[];

  acceptableSolutionIds?: string[];

  rankingCriteria?: string[];

  teacherExplanation?: string;

  requireEvidenceSupport?: boolean;
}

export interface RevealSettings {
  mode:
    | 'afterIndividualSubmission'
    | 'afterTeamSubmission'
    | 'afterDefense'
    | 'teacherControlled'
    | 'scheduled'
    | 'none';

  scheduledAt?: string;
}
```

---

# 7. Case Board

```ts
export interface CaseBoardConfiguration extends BaseEntity {
  layoutMode: 'zones' | 'columns' | 'freeform' | 'hybrid';

  sections: CaseBoardSection[];

  interactions: {
    dragDrop: boolean;
    reorder: boolean;
    annotate: boolean;
    connectEvidence: boolean;
    createStudentEvidence: boolean;
    confidenceRating: boolean;
  };
}

export interface CaseBoardSection extends BaseEntity {
  type:
    | 'evidence'
    | 'hypothesis'
    | 'notes'
    | 'questions'
    | 'data'
    | 'confidence'
    | 'finalClaim'
    | 'custom';

  order: number;

  accepts?: string[];

  studentEditable?: boolean;

  required?: boolean;
}
```

The section `type` may later become registry-based if needed. If that change is made, preserve backwards compatibility.

---

# 8. Evidence

```ts
export interface EvidenceDefinition extends BaseEntity {
  evidenceType: string;

  content: EvidenceContent;

  availability: EvidenceAvailability;

  requirement:
    | 'required'
    | 'optional'
    | 'extension'
    | 'conditional'
    | 'decoy';

  studentCapabilities?: {
    annotate?: boolean;
    classify?: boolean;
    connect?: boolean;
    cite?: boolean;
  };

  instructionalMetadata?: EvidenceInstructionalMetadata;

  relationships?: EvidenceRelationship[];

  unlockRuleIds?: string[];

  assignment?: AudienceAssignment;
}

export interface EvidenceContent {
  text?: string;

  contentRef?: string;

  assetRefs?: string[];

  dataRef?: string;

  source?: {
    name?: string;
    citation?: string;
    url?: string;
  };

  extensions?: Record<string, unknown>;
}

export interface EvidenceAvailability {
  initialState: 'hidden' | 'locked' | 'available';

  availableFromPhaseId?: string;

  ruleIds?: string[];
}
```

---

# 9. Evidence Instructional Metadata

```ts
export interface EvidenceInstructionalMetadata {
  reliability?: number;
  relevance?: number;
  strength?: number;

  directness?: 'direct' | 'circumstantial' | 'mixed';

  sourceClassification?: 'primary' | 'secondary' | 'other';

  bias?: number;

  misleading?: boolean;

  intentionallyIncomplete?: boolean;

  teacherMeaning?: string;

  supportsHypothesisIds?: string[];

  contradictsHypothesisIds?: string[];

  rulesOutHypothesisIds?: string[];
}
```

Teacher metadata must not automatically appear in student rendering.

---

# 10. Evidence Relationships

```ts
export interface EvidenceRelationship {
  targetId: string;

  relationshipType: string;

  teacherDefined?: boolean;

  strength?: number;
}
```

Relationship types are registry-driven.

---

# 11. Hypotheses

```ts
export interface HypothesisDefinition extends BaseEntity {
  hypothesisType: string;

  teacherDefined?: boolean;

  validSolution?: boolean;

  ranking?: number;

  evidenceExpected?: string[];

  evidenceContradicting?: string[];
}

export interface HypothesisSettings {
  mode: 'studentGenerated' | 'predefined' | 'mixed';

  minimumEvidenceBeforeCreation?: number;

  allowMultiple?: boolean;

  requireRanking?: boolean;

  requireRevision?: boolean;

  trackHistory?: boolean;

  confidenceMode?:
    | 'none'
    | 'lowMediumHigh'
    | 'oneToFive'
    | 'percentage';
}
```

Runtime hypothesis history is separate.

---

# 12. State Variable Definitions

```ts
export interface StateVariableDefinition extends BaseEntity {
  stateType:
    | 'boolean'
    | 'number'
    | 'string'
    | 'choice'
    | 'list'
    | 'status'
    | 'counter';

  initialValue: unknown;

  allowedValues?: unknown[];

  min?: number;
  max?: number;

  studentVisible?: boolean;

  mutable?: boolean;
}
```

The configuration defines possible state. Runtime stores actual values.

---

# 13. Rule Definitions

```ts
export interface RuleDefinition extends BaseEntity {
  trigger?: RuleTrigger;

  conditions?: ConditionGroup;

  actions: RuleAction[];

  repeatable?: boolean;

  priority?: number;

  enabled: boolean;
}

export interface RuleTrigger {
  eventType: string;
  targetId?: string;
}

export interface ConditionGroup {
  operator: 'AND' | 'OR' | 'NOT' | 'X_OF';

  requiredCount?: number;

  conditions: Array<RuleCondition | ConditionGroup>;
}

export interface RuleCondition {
  type: string;

  targetId?: string;

  operator?: string;

  value?: unknown;

  params?: Record<string, unknown>;
}

export interface RuleAction {
  type: string;

  targetId?: string;

  value?: unknown;

  params?: Record<string, unknown>;
}
```

Condition/action semantics are registry-driven.

---

# 14. Limited Resources

```ts
export interface InvestigationResource extends BaseEntity {
  resourceType: string;

  initialAmount: number;

  min?: number;
  max?: number;

  unitLabel?: string;

  studentVisible: boolean;

  sharedMode: 'individual' | 'team' | 'class';
}

export interface ResourceCost {
  resourceId: string;
  amount: number;
}
```

---

# 15. Randomization

```ts
export interface RandomizationDefinition extends BaseEntity {
  scope: 'project' | 'class' | 'team' | 'student';

  strategy:
    | 'choice'
    | 'shuffle'
    | 'weightedChoice'
    | 'numericRange'
    | 'dataset';

  options?: RandomizationOption[];

  seedStrategy?: 'generated' | 'class' | 'team' | 'student' | 'fixed';

  fixedSeed?: string;

  outputStateId: string;
}

export interface RandomizationOption {
  value: unknown;
  weight?: number;
  metadata?: Record<string, unknown>;
}
```

Randomization results belong in runtime state and must not reroll on reload.

---

# 16. NPCs

```ts
export interface NPCDefinition extends BaseEntity {
  characterType: string;

  role?: string;

  avatarAssetRef?: string;

  studentVisibleBio?: string;

  teacherNotes?: string;

  dialogueNodes?: DialogueNode[];

  initialState?: Record<string, unknown>;
}

export interface DialogueNode {
  id: string;

  studentPrompt: string;

  response: string;

  availabilityRuleIds?: string[];

  actionIds?: string[];

  evidenceProducedIds?: string[];
}
```

NPC runtime interaction state is separate.

---

# 17. Audience Assignment

```ts
export interface AudienceAssignment {
  visibility:
    | 'student'
    | 'team'
    | 'class'
    | 'role'
    | 'teacher';

  targetIds?: string[];
}
```

Reuse this contract across evidence, activities, resources, dialogue, hints, etc.

---

# 18. Team Settings

```ts
export interface InvestigationTeamSettings {
  mode: 'individual' | 'team' | 'mixed';

  roles?: TeamRole[];

  boardMode?:
    | 'individual'
    | 'shared'
    | 'sharedWithPrivateLayer';

  evidenceDistribution?: EvidenceDistributionRule[];
}

export interface TeamRole {
  id: string;
  title: string;
  responsibilities?: string[];
}

export interface EvidenceDistributionRule {
  evidenceIds: string[];

  audienceType:
    | 'all'
    | 'role'
    | 'team'
    | 'student'
    | 'random';

  targetIds?: string[];
}
```

---

# 19. Shared Activity Extension

The Investigation Template should extend a shared ActivityDefinition.

```ts
export interface InvestigationActivityExtension {
  evidenceProducedIds?: string[];

  stateChanges?: string[];

  resourceCosts?: ResourceCost[];

  ruleIds?: string[];

  randomizationIds?: string[];
}
```

Recommended shared activity contract concept:

```ts
export interface ActivityDefinition extends BaseEntity {
  type: string;
  required?: boolean;

  extensions?: {
    investigation?: InvestigationActivityExtension;
    [namespace: string]: unknown;
  };
}
```

Do not create Investigation-only replacements for the shared Activity model.

---

# 20. Activity Results

```ts
export interface ActivityResult {
  activityId: string;

  completed: boolean;

  score?: number;

  outputs?: Record<string, unknown>;

  evidenceProduced?: EvidenceOutput[];

  stateChanges?: StateChangeRequest[];

  resourceChanges?: ResourceChangeRequest[];

  attachments?: string[];

  metadata?: Record<string, unknown>;
}

export interface EvidenceOutput {
  evidenceId?: string;
  definition?: Partial<EvidenceDefinition>;
  runtimeData?: Record<string, unknown>;
}

export interface StateChangeRequest {
  stateId: string;
  operation: string;
  value?: unknown;
}

export interface ResourceChangeRequest {
  resourceId: string;
  operation: 'add' | 'spend' | 'set';
  amount: number;
}
```

---

# 21. Final Submission

```ts
export interface FinalSubmissionDefinition extends BaseEntity {
  submissionType: string;

  sections: FinalSubmissionSection[];

  availabilityRuleIds?: string[];

  solutionRevealAfterSubmission?: boolean;

  rubricId?: string;

  teamMode?: 'individual' | 'team' | 'mixed';
}

export interface FinalSubmissionSection extends BaseEntity {
  type: string;

  prompt?: string;

  required: boolean;

  evidenceRequired?: boolean;

  minEvidenceCount?: number;

  allowAttachments?: boolean;
}
```

Final section types are registry-driven.

The canonical stored final product is a structured evidence-based argument,
even when the project also requires uploaded or presented artifacts:

```ts
export interface StructuredArgumentPackage {
  claim?: string;
  identification?: string;
  diagnosis?: string;
  cause?: string;
  recommendation?: string;
  evidenceIds: string[];
  reasoning?: string;
  counterevidence?: string;
  alternativeExplanation?: string;
  confidence?: number;
  uncertainty?: string;
  nextTest?: string;
  safetyRecommendation?: string;
  reflection?: string;
  individualContribution?: string;
  artifactIds?: string[];
}
```

Draft, submission, approval, rubric, and grade records must remain separate.
An uploaded file is an attached artifact, not the only representation of the
student's reasoning.

---

# 22. Runtime Scope

```ts
export interface RuntimeScope {
  tenantId: string;
  projectId: string;
  projectVersion: string;

  classId?: string;
  studentId?: string;
  teamId?: string;

  scopeType: 'student' | 'team' | 'class';
}
```

---

# 23. Runtime Event

```ts
export interface RuntimeEvent {
  id: string;

  eventType: string;

  timestamp: string;

  tenantId: string;

  projectId: string;

  actor: {
    type: 'student' | 'team' | 'teacher' | 'system';
    id?: string;
  };

  sourceId?: string;

  payload?: Record<string, unknown>;

  clientEventId?: string;
}
```

---

# 24. Runtime Commands

```ts
export interface RuntimeCommand {
  commandType: string;

  targetId?: string;

  value?: unknown;

  params?: Record<string, unknown>;
}
```

Command implementations are registered action handlers.

---

# 25. Runtime State Snapshot

```ts
export interface RuntimeStateSnapshot {
  version: number;
  tenantId: string;
  projectId: string;
  projectVersion: string;
  lastUpdated: string;

  stateValues: Record<string, unknown>;

  evidence: Record<string, EvidenceRuntimeState>;

  activities: Record<string, ActivityRuntimeState>;

  hypotheses: HypothesisRuntimeState[];

  resources: Record<string, number>;

  board: BoardRuntimeState;

  phases: Record<string, PhaseRuntimeState>;

  mastery?: Record<string, MasteryRuntimeState>;

  randomization?: Record<string, RandomizationRuntimeState>;

  npc?: Record<string, NPCRuntimeState>;
}
```

Subtypes should be defined in implementation files with stable semantics.

---

# 26. Example Runtime Subtypes

```ts
export interface EvidenceRuntimeState {
  status:
    | 'hidden'
    | 'locked'
    | 'available'
    | 'unopened'
    | 'viewed'
    | 'collected'
    | 'classified'
    | 'annotated'
    | 'usedInClaim'
    | 'archived';

  classification?: string;
  notes?: string[];
  relationshipIds?: string[];
  updatedAt?: string;
}

export interface ActivityRuntimeState {
  status:
    | 'locked'
    | 'notStarted'
    | 'inProgress'
    | 'submitted'
    | 'complete'
    | 'needsRevision'
    | 'missing'
    | 'excused';

  attempts?: number;
  lastResult?: ActivityResult;

  completion: 'notStarted' | 'inProgress' | 'complete';
  submission: 'notRequired' | 'draft' | 'submitted' | 'returned';
  mastery: 'notMeasured' | 'notMet' | 'met';
  approval: 'notRequired' | 'pending' | 'approved' | 'changesRequested';
  grade?: {
    status: 'ungraded' | 'graded';
    score?: number;
    rubricResultId?: string;
  };
}

export interface HypothesisRuntimeState {
  id: string;
  label?: string;
  statement: string;

  selected?: boolean;
  eliminated?: boolean;
  ranking?: number;
  confidence?: number;

  revisions: HypothesisRevision[];

  evidenceIds?: string[];
}

export interface HypothesisRevision {
  revisionId: string;
  hypothesisId: string;
  timestamp: string;
  statement: string;
  confidence?: number;
  evidenceIds?: string[];
  reasonForChange?: string;
}

export interface BoardRuntimeState {
  itemLocations: Record<string, string>;
  itemOrder?: Record<string, string[]>;
  notes?: BoardNote[];
  questions?: BoardQuestion[];
}

export interface BoardNote {
  id: string;
  text: string;
  createdAt: string;
  authorId?: string;
}

export interface BoardQuestion {
  id: string;
  text: string;
  status?: 'open' | 'answered' | 'archived';
}

export interface PhaseRuntimeState {
  status: 'locked' | 'available' | 'inProgress' | 'complete';
}

export interface MasteryRuntimeState {
  level?: number;
  status?: string;
}

export interface RandomizationRuntimeState {
  seed: string;
  value: unknown;
  assignedAt: string;
}

export interface NPCRuntimeState {
  dialogueCompletedIds?: string[];
  state?: Record<string, unknown>;
}
```

Lifecycle status, completion, mastery, submission, approval, and grade are
independent. Completing required fields or clicking through an activity must
never implicitly mark mastery, approval, or grading complete.

---

# 27. Rule Engine Results

```ts
export interface RuleEvaluationResult {
  matchedRules: string[];

  commands: RuntimeCommand[];

  errors?: RuntimeError[];
}

export interface RuntimeError {
  code: string;

  severity: 'info' | 'warning' | 'error' | 'fatal';

  message: string;

  sourceId?: string;

  recoverable: boolean;
}
```

---

# 28. Runtime State Store Contract

```ts
export interface RuntimeStateStore {
  getSnapshot(): RuntimeStateSnapshot;

  getStateValue(id: string): unknown;

  dispatch(event: RuntimeEvent): Promise<EventResult>;

  subscribe(
    scope: RuntimeScope,
    callback: RuntimeStateListener
  ): Unsubscribe;
}

export interface EventResult {
  event: RuntimeEvent;
  matchedRuleIds?: string[];
  commands?: RuntimeCommand[];
  snapshot?: RuntimeStateSnapshot;
  errors?: RuntimeError[];
}

export type RuntimeStateListener =
  (snapshot: RuntimeStateSnapshot) => void;

export type Unsubscribe = () => void;
```

---

# 29. Persistence Contracts

```ts
export interface RuntimePersistenceAdapter {
  loadRuntime(
    scope: RuntimeScope
  ): Promise<RuntimeStateSnapshot>;

  saveRuntime(
    scope: RuntimeScope,
    mutations: StateMutation[],
    expectedVersion: number
  ): Promise<StateMutationResult>;
}

export interface RealtimeAdapter {
  subscribe(
    channel: RuntimeChannel,
    listener: RealtimeListener
  ): Unsubscribe;
}

export interface AssetStorageAdapter {
  upload(
    input: AssetUploadInput
  ): Promise<StoredAsset>;

  getReference(
    assetId: string
  ): Promise<StoredAsset>;
}
```

Concrete Firebase/Supabase types must not leak into template code.

---

# 30. Validation Issues

```ts
export interface ValidationIssue {
  code: string;

  severity: 'warning' | 'error';

  entityId?: string;

  message: string;

  suggestion?: string;
}
```

Validators should return issue collections, not throw for normal project-authoring mistakes unless loading is impossible.

---

# 31. Capability Registration

```ts
export interface CapabilityRegistration {
  id: string;
  version: string;

  status: 'core' | 'optional' | 'extension' | 'future';

  schemaRefs?: string[];

  renderer?: string;

  eventsProduced?: string[];

  conditionsSupported?: string[];

  actionsSupported?: string[];
}
```

Implementation may split this into specialized registration interfaces.

---

# 32. Versioning Requirements

Every configuration file must have `schemaVersion`.

The project manifest also has:

```json
{
  "template": {
    "id": "investigation",
    "version": "1.0"
  }
}
```

Schema version and template version must remain independently meaningful.

---

# 33. Separation Rule

Do not store:

- actual student evidence status
- actual randomized result
- actual resource amount
- actual current state
- actual hypothesis revisions

inside published curriculum configuration files.

Those belong in runtime state.
