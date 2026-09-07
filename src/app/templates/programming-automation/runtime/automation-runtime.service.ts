import { computed, inject, Injectable, OnDestroy, signal } from '@angular/core';
import type {
  AutomationState,
  ChallengeDraft,
  CommandType,
  MathEvidence,
  Prediction,
  ProgramVersion,
  RobotCommand,
  RobotTrial,
  RobotVariable,
} from '../domain/automation.models';
import { AUTOMATION_CONFIG, AUTOMATION_SAMPLE, AUTOMATION_SESSION } from './automation.tokens';
import { AUTOMATION_PERSISTENCE, isAutomationState } from '../persistence/automation.persistence';
import {
  initialAutomationState,
  transformCommands,
  validateAutomationConfig,
} from '../core/automation-state';
import { allCommands, compileProgram } from '../core/automation-compiler';
import { evidenceIsCorrect, mathTools } from '../core/automation-math';
import { executeRobot } from '../core/robot-execution';
@Injectable()
export class AutomationRuntimeService implements OnDestroy {
  readonly config = inject(AUTOMATION_CONFIG);
  readonly session = inject(AUTOMATION_SESSION);
  readonly sample = inject(AUTOMATION_SAMPLE, { optional: true }) ?? false;
  private readonly persistence = inject(AUTOMATION_PERSISTENCE);
  private timer?: ReturnType<typeof setTimeout>;
  readonly state = signal(this.load());
  readonly selectedCommandId = signal('');
  readonly message = signal('');
  readonly saveStatus = signal('Saved locally');
  readonly challenge = computed(() =>
    this.config.challenges.find((item) => item.id === this.state().selectedChallengeId)!,
  );
  readonly course = computed(() =>
    this.config.courses.find((item) => item.id === this.challenge().courseId)!,
  );
  readonly draft = computed(() => this.state().drafts[this.challenge().id]);
  readonly selectedCommand = computed(() =>
    allCommands(this.draft().program.commands).find((item) => item.id === this.selectedCommandId()),
  );
  readonly isChampionship = computed(
    () => this.challenge().id === this.config.championshipChallengeId,
  );
  readonly canControl = computed(
    () =>
      !this.sample &&
      (this.session.mode === 'preview' ||
        this.session.permissions.includes('automation.championship.manage')),
  );
  readonly canEdit = computed(
    () =>
      !this.sample &&
      !this.draft().lockedVersionId &&
      !(this.isChampionship() && this.state().championship.finalized),
  );
  readonly compiled = computed(() =>
    compileProgram(this.draft().program, this.config.robot, this.challenge(), this.state().math),
  );
  readonly currentTrials = computed(() =>
    this.state().trials.filter((trial) => trial.challengeId === this.challenge().id),
  );
  readonly observedTrial = computed(() =>
    this.currentTrials().find(
      (trial) => trial.id === this.draft().observedTrialId && trial.mode === 'practice',
    ),
  );
  readonly reasoningOpened = computed(
    () =>
      this.sample ||
      !!this.draft().reasoningOpened ||
      !!this.draft().completedAt ||
      !!this.draft().lockedVersionId,
  );
  observeTrial(id: string): void {
    if (
      this.sample ||
      this.observedTrial() ||
      !this.currentTrials().some((trial) => trial.id === id && trial.mode === 'practice')
    )
      return;
    this.updateDraft({ observedTrialId: id });
    this.flush();
  }
  openReasoning(): void {
    if (!this.observedTrial() || this.reasoningOpened()) return;
    this.updateDraft({ reasoningOpened: true });
    this.flush();
  }
  readonly standings = computed(() =>
    this.state()
      .trials.filter(
        (trial) =>
          trial.mode === 'championship' &&
          !trial.technicalInvalidReason &&
          this.state().championship.queue.includes(trial.version.id),
      )
      .sort((a, b) => b.score - a.score || a.elapsedSeconds - b.elapsedSeconds),
  );
  readonly mastery = computed(() =>
    mathTools.map((tool) => ({
      title: tool.title,
      achieved: this.state().math.some(
        (item) =>
          item.studentId === this.session.actorId &&
          item.tool === tool.id &&
          evidenceIsCorrect(item),
      ),
    })),
  );
  readonly readiness = computed(() => {
    const problems = compileProgram(
      this.draft().program,
      this.config.robot,
      this.challenge(),
      this.state().math,
      true,
    )
      .issues.filter((issue) => issue.severity === 'error')
      .map((issue) => issue.message);
    if (
      !this.currentTrials().some(
        (trial) =>
          trial.mode === 'practice' &&
          trial.completedMission &&
          trial.version.program.version === this.draft().program.version &&
          trial.version.targetIndex === this.draft().targetIndex,
      )
    )
      problems.push('Complete a successful practice run with this version.');
    if (this.draft().reflection.trim().length < 20)
      problems.push('Explain your testing or debugging evidence in at least 20 characters.');
    if (this.isChampionship()) {
      const prediction = this.draft().prediction;
      if (prediction.route.trim().length < 15) problems.push('Describe your planned route.');
      if (
        [prediction.distance, prediction.turns, prediction.seconds, prediction.battery].some(
          (value) => !value.trim() || !Number.isFinite(Number(value)) || Number(value) < 0,
        )
      )
        problems.push('Enter all four numerical predictions.');
    }
    return [...new Set(problems)];
  });
  constructor() {
    validateAutomationConfig(this.config);
  }
  ngOnDestroy(): void {
    this.flush();
  }
  selectChallenge(id: string): void {
    const next = this.config.challenges.find((item) => item.id === id);
    if (!next) return;
    if (id === this.config.championshipChallengeId && !this.state().championship.revealed) {
      this.message.set('Reveal the championship course using the rehearsal controls.');
      return;
    }
    this.flush();
    this.patch({ selectedChallengeId: id });
    this.selectedCommandId.set('');
    this.message.set('');
    this.flush();
  }
  setTarget(index: number): void {
    if (!this.canEdit() || !this.course().targets[index]) return;
    this.updateDraft({ targetIndex: index, completedAt: undefined });
  }
  selectCommand(id: string): void {
    this.selectedCommandId.set(id);
  }
  setCommands(commands: readonly RobotCommand[]): void {
    if (!this.canEdit()) return;
    this.updateProgram({ commands });
  }
  addCommand(type: CommandType, parentId?: string): void {
    if (!this.canEdit() || !this.challenge().allowedCommands.includes(type)) return;
    const command: RobotCommand = {
      id: crypto.randomUUID(),
      type,
      value: type === 'repeat' ? '2' : '',
      direction: 'right',
      ...(type === 'repeat' ? { commands: [] } : {}),
      ...(type === 'pick-up' || type === 'drop-off'
        ? { packageId: this.course().packages[0]?.id }
        : {}),
    };
    const commands = parentId
      ? transformCommands(this.draft().program.commands, parentId, (parent) => [
          { ...parent, commands: [...(parent.commands ?? []), command] },
        ])
      : [...this.draft().program.commands, command];
    this.setCommands(commands);
    this.selectedCommandId.set(command.id);
  }
  editCommand(id: string, patch: Partial<RobotCommand>): void {
    this.setCommands(
      transformCommands(this.draft().program.commands, id, (command) => [{ ...command, ...patch }]),
    );
  }
  updateVariables(variables: readonly RobotVariable[]): void {
    if (this.canEdit()) this.updateProgram({ variables });
  }
  linkEvidence(evidenceId: string): void {
    const command = this.selectedCommand();
    if (command) this.editCommand(command.id, { mathEvidenceId: evidenceId });
  }
  saveEvidence(evidence: MathEvidence): void {
    if (this.sample) return;
    this.patch({ math: [...this.state().math, evidence] });
    this.flush();
  }
  updateDraft(patch: Partial<ChallengeDraft>): void {
    if (!this.canEdit()) return;
    const id = this.challenge().id;
    this.patch({ drafts: { ...this.state().drafts, [id]: { ...this.draft(), ...patch } } });
  }
  updatePrediction(key: keyof Prediction, value: string): void {
    this.updateDraft({ prediction: { ...this.draft().prediction, [key]: value } });
  }
  updateCalibration(
    key: 'measuredDistancePerRotation' | 'measuredTurnRate' | 'measurementExplanation' | 'defense',
    value: string,
  ): void {
    if (!this.sample) this.patch({ [key]: value });
  }
  runPractice(): RobotTrial | undefined {
    if (this.sample) return;
    if (
      this.isChampionship() &&
      (this.state().championship.finalized ||
        !this.state().championship.practiceOpen ||
        (this.state().championship.practiceLimit > 0 &&
          this.currentTrials().filter((trial) => trial.mode === 'practice').length >=
            this.state().championship.practiceLimit))
    ) {
      this.message.set(
        'The championship practice window is closed or the attempt limit is reached.',
      );
      return;
    }
    if (this.compiled().issues.some((issue) => issue.severity === 'error')) {
      this.message.set('Fix the command errors before running.');
      return;
    }
    return this.runVersion(this.captureVersion(), 'practice');
  }
  completeChallenge(): void {
    if (this.readiness().length || !this.canEdit()) return;
    this.updateDraft({ completedAt: new Date().toISOString() });
    this.message.set('Mission evidence saved. Choose the next challenge when you are ready.');
    this.flush();
  }
  lockProgram(): boolean {
    if (
      this.sample ||
      !this.isChampionship() ||
      this.readiness().length ||
      this.draft().lockedVersionId ||
      this.state().championship.finalized
    )
      return false;
    const version = this.captureVersion();
    this.patch({
      versions: [...this.state().versions, version],
      drafts: {
        ...this.state().drafts,
        [this.challenge().id]: { ...this.draft(), lockedVersionId: version.id },
      },
      championship: {
        ...this.state().championship,
        queue: [...this.state().championship.queue, version.id],
      },
    });
    this.audit('program.locked', 'Student confirmed the championship version.');
    this.flush();
    return true;
  }
  launchNext(): RobotTrial | undefined {
    if (
      !this.canControl() ||
      this.state().championship.paused ||
      this.state().championship.finalized
    )
      return;
    const id = this.state().championship.queue.find(
      (id) =>
        !this.state().trials.some(
          (trial) =>
            trial.version.id === id &&
            trial.mode === 'championship' &&
            !trial.technicalInvalidReason,
        ),
    );
    const version = this.state().versions.find((item) => item.id === id);
    if (!version) {
      this.message.set('No locked program is waiting in the queue.');
      return;
    }
    return this.runVersion(version, 'championship');
  }
  control(patch: Partial<AutomationState['championship']>): void {
    if (!this.canControl() || this.state().championship.finalized) return;
    const { queue: ignored, ...settings } = patch;
    void ignored;
    if (
      settings.practiceLimit !== undefined &&
      (!Number.isInteger(settings.practiceLimit) ||
        settings.practiceLimit < 0 ||
        settings.practiceLimit > 100)
    )
      return;
    this.patch({ championship: { ...this.state().championship, ...settings } });
    this.audit('championship.settings', 'Rehearsal settings updated.');
    this.flush();
  }
  unlock(versionId: string, reason: string): void {
    if (!this.canControl() || reason.trim().length < 8 || this.state().championship.finalized)
      return;
    const version = this.state().versions.find((item) => item.id === versionId);
    if (!version) return;
    this.patch({
      drafts: {
        ...this.state().drafts,
        [version.challengeId]: {
          ...this.state().drafts[version.challengeId],
          lockedVersionId: undefined,
        },
      },
      championship: {
        ...this.state().championship,
        queue: this.state().championship.queue.filter((id) => id !== versionId),
      },
    });
    this.audit('program.unlocked', reason);
    this.flush();
  }
  technicalRerun(trialId: string, reason: string): void {
    if (!this.canControl() || reason.trim().length < 8 || this.state().championship.finalized)
      return;
    this.patch({
      trials: this.state().trials.map((trial) =>
        trial.id === trialId && trial.mode === 'championship'
          ? { ...trial, technicalInvalidReason: reason }
          : trial,
      ),
    });
    this.audit('run.technical-invalid', reason);
    this.flush();
  }
  flush(): void {
    if (this.timer) clearTimeout(this.timer);
    if (this.sample) return;
    try {
      this.persistence.save(this.state());
      this.saveStatus.set('Saved locally');
    } catch (error) {
      this.saveStatus.set('Save failed — keep this page open');
      this.message.set(
        error instanceof Error ? error.message : 'Export your portfolio before leaving this page.',
      );
    }
  }
  private updateProgram(patch: Partial<ChallengeDraft['program']>): void {
    this.updateDraft({
      completedAt: undefined,
      program: { ...this.draft().program, ...patch, version: this.draft().program.version + 1 },
    });
  }
  private captureVersion(): ProgramVersion {
    return structuredClone({
      id: crypto.randomUUID(),
      ownerId: this.session.actorId,
      ownerName: this.session.actorDisplayName,
      challengeId: this.challenge().id,
      targetIndex: this.draft().targetIndex,
      createdAt: new Date().toISOString(),
      program: this.draft().program,
      math: this.state().math,
      prediction: this.draft().prediction,
      robot: this.config.robot,
      course: this.course(),
    });
  }
  private runVersion(
    version: ProgramVersion,
    mode: 'practice' | 'championship',
  ): RobotTrial | undefined {
    const challenge = this.config.challenges.find((item) => item.id === version.challengeId)!;
    const compiled = compileProgram(
      version.program,
      version.robot,
      challenge,
      version.math,
      mode === 'championship',
    );
    if (compiled.issues.some((issue) => issue.severity === 'error')) {
      this.message.set('This program version did not pass validation.');
      return;
    }
    const result = executeRobot(
      compiled.commands,
      version.course,
      version.robot,
      challenge,
      version.targetIndex,
      version.prediction,
      this.config.scoring,
    );
    const trial: RobotTrial = {
      ...result,
      id: crypto.randomUUID(),
      challengeId: version.challengeId,
      version,
      createdAt: new Date().toISOString(),
      mode,
    };
    this.patch({ trials: [...this.state().trials, trial] });
    this.message.set('Run recorded. Watch the robot, then review what happened.');
    this.flush();
    return trial;
  }
  private audit(action: string, reason: string): void {
    this.patch({
      audit: [
        ...this.state().audit,
        { id: crypto.randomUUID(), action, reason, timestamp: new Date().toISOString() },
      ],
    });
  }
  private patch(patch: Partial<AutomationState>): void {
    this.state.update((state) => ({ ...state, ...patch, revision: state.revision + 1 }));
    if (this.sample) return;
    this.saveStatus.set('Saving…');
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => this.flush(), 600);
  }
  private load(): AutomationState {
    try {
      const saved = this.persistence.load();
      if (
        isAutomationState(saved) &&
        saved.projectId === this.config.projectId &&
        saved.projectVersion === this.config.projectVersion &&
        this.config.challenges.some((c) => c.id === saved.selectedChallengeId) &&
        this.config.challenges.every((challenge) => {
          const draft = saved.drafts[challenge.id];
          return (
            draft &&
            this.config.courses.find((c) => c.id === challenge.courseId)?.targets[draft.targetIndex]
          );
        })
      )
        return {
          ...saved,
          drafts: Object.fromEntries(
            Object.entries(saved.drafts).map(([id, draft]) => {
              const starter = this.config.challenges.find((c) => c.id === id)?.discovery
                ?.starterCommands;
              const untouched =
                draft.program.version === 0 &&
                !draft.program.commands.length &&
                !draft.program.variables.length &&
                !draft.completedAt &&
                !draft.lockedVersionId &&
                !draft.reflection &&
                !draft.diagnosis &&
                !Object.values(draft.prediction).some(Boolean) &&
                !saved.trials.some((trial) => trial.challengeId === id);
              return [
                id,
                starter && untouched
                  ? { ...draft, program: { ...draft.program, commands: structuredClone(starter) } }
                  : draft,
              ];
            }),
          ),
        };
    } catch {
      /* Unavailable storage leaves an editable in-memory draft; flush reports failed saves. */
    }
    return initialAutomationState(this.config);
  }
}
