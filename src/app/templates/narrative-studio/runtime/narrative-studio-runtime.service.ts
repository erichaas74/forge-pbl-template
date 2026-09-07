import { computed, inject, Injectable, signal } from '@angular/core';

import { projectSessionRuntimeScope } from '../../../core/context/project-session-context';
import {
  changeNarrativeBranch,
  narrativeDraftConfig,
  validNarrativePath,
} from '../core/narrative-branching';
import {
  createInitialNarrativeState,
  narrativeReadiness,
  wordCount,
} from '../core/narrative-studio-state';
import type {
  NarrativeCoachResponse,
  NarrativeCoachTool,
  NarrativeSceneDraft,
  NarrativeStudioStage,
  NarrativeStudioState,
  NarrativeStoryBible,
} from '../domain/narrative-studio.models';
import { NARRATIVE_STUDIO_PERSISTENCE } from '../persistence/narrative-studio.persistence';
import {
  NARRATIVE_STUDIO_COACH,
  NARRATIVE_STUDIO_CONFIG,
  NARRATIVE_STUDIO_INITIAL_HISTORY_SETTING_ID,
  NARRATIVE_STUDIO_SESSION,
} from './narrative-studio.tokens';

@Injectable()
export class NarrativeStudioRuntimeService {
  readonly config = inject(NARRATIVE_STUDIO_CONFIG);
  readonly session = inject(NARRATIVE_STUDIO_SESSION);
  private readonly persistence = inject(NARRATIVE_STUDIO_PERSISTENCE);
  private readonly coach = inject(NARRATIVE_STUDIO_COACH);
  private readonly initialHistorySettingId =
    inject(NARRATIVE_STUDIO_INITIAL_HISTORY_SETTING_ID, { optional: true }) ?? '';
  private saveTimer?: ReturnType<typeof setTimeout>;

  readonly state = signal(this.load());
  readonly storyConfig = computed(() => narrativeDraftConfig(this.config, this.state()));
  readonly saveStatus = signal<'saved' | 'saving' | 'error'>('saved');
  readonly coachBusy = signal(false);
  readonly selectedNode = computed(() =>
    this.storyConfig().nodes.find((node) => node.id === this.state().selectedNodeId)!,
  );
  readonly selectedScene = computed(() => this.state().scenes[this.state().selectedNodeId]);
  readonly selectedStorm = computed(() =>
    this.config.stormStages.find((stage) => stage.id === this.selectedNode().stormStageId)!,
  );
  readonly selectedHistoricalSetting = computed(() =>
    this.config.historicalSettings.find(
      (setting) => setting.id === this.state().historicalSettingId,
    ),
  );
  readonly readiness = computed(() => narrativeReadiness(this.config, this.state()));
  readonly totalWords = computed(() =>
    this.storyConfig().nodes.reduce(
      (total, node) => total + wordCount(this.state().scenes[node.id]?.text ?? ''),
      0,
    ),
  );
  readonly completedSceneCount = computed(
    () =>
      this.storyConfig().nodes.filter(
        (node) => wordCount(this.state().scenes[node.id]?.text ?? '') >= 20,
      ).length,
  );
  readonly planningTurns = computed(() =>
    this.state().coachHistory.filter((turn) => turn.context === 'planning'),
  );
  readonly planningAnswerCount = computed(
    () => this.planningTurns().filter((turn) => turn.role === 'student').length,
  );
  readonly nextPlanningQuestion = computed(
    () => this.config.planningQuestions[this.planningAnswerCount()],
  );
  readonly planningComplete = computed(
    () => this.planningAnswerCount() >= this.config.planningQuestions.length,
  );

  setStage(stage: NarrativeStudioStage): void {
    this.checkpointScene();
    this.patch({ stage });
    this.flushSave();
  }

  selectNode(nodeId: string): void {
    if (!this.storyConfig().nodes.some((node) => node.id === nodeId)) return;
    this.checkpointScene();
    this.patch({ selectedNodeId: nodeId, stage: 'write' });
    this.flushSave();
  }

  changeBranch(action: 'branch' | 'end' | 'finish'): void {
    this.checkpointScene();
    const current = this.state();
    const next = changeNarrativeBranch(
      this.config,
      current,
      current.selectedNodeId,
      action,
      crypto.randomUUID(),
    );
    if (next === current) return;
    this.patch(next);
    this.flushSave();
  }

  updateStoryTitle(storyTitle: string): void {
    this.patch({ storyTitle });
  }

  selectHistoricalSetting(historicalSettingId: string): void {
    if (!this.config.historicalSettings.some((setting) => setting.id === historicalSettingId))
      return;
    this.patch({ historicalSettingId });
  }

  updateBible<K extends keyof NarrativeStoryBible>(key: K, value: NarrativeStoryBible[K]): void {
    this.patch({ bible: { ...this.state().bible, [key]: value } });
  }

  async answerPlanningQuestion(message: string): Promise<void> {
    const answer = message.trim();
    const question = this.nextPlanningQuestion();
    if (!answer || !question || this.coachBusy()) return;
    this.updateBible(question.bibleField, answer);
    await this.askCoach('reply', answer);
  }

  updateSceneTitle(title: string): void {
    this.updateSelectedScene({ title });
  }

  updateSceneText(text: string): void {
    if (text === this.selectedScene().text) return;
    this.patch({ playtests: [] });
    this.updateSelectedScene({ text });
  }

  updateChoice(choiceId: string, label: string): void {
    if (!this.selectedNode().choices.some((choice) => choice.id === choiceId)) return;
    const scene = this.selectedScene();
    if (scene.choiceLabels[choiceId] === label) return;
    this.patch({ playtests: [] });
    this.updateSelectedScene({ choiceLabels: { ...scene.choiceLabels, [choiceId]: label } });
  }

  checkpointScene(): void {
    const scene = this.selectedScene();
    const previous = scene.revisions.at(-1);
    if (
      previous?.title === scene.title &&
      previous.text === scene.text &&
      JSON.stringify(previous.choiceLabels) === JSON.stringify(scene.choiceLabels)
    )
      return;
    this.updateSelectedScene({
      revisions: [
        ...scene.revisions,
        {
          id: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
          title: scene.title,
          text: scene.text,
          choiceLabels: structuredClone(scene.choiceLabels),
        },
      ],
    });
    this.flushSave();
  }

  async askCoach(tool: NarrativeCoachTool, message?: string): Promise<void> {
    if (this.coachBusy()) return;
    const trimmed = message?.trim();
    if (tool === 'reply' && !trimmed) return;
    if (trimmed) this.addCoachTurn('student', tool, trimmed);
    this.coachBusy.set(true);
    try {
      const response: NarrativeCoachResponse = await this.coach.respond({
        tool,
        stage: this.state().stage,
        message: trimmed,
        node: this.selectedNode(),
        scene: this.selectedScene(),
        bible: this.state().bible,
        historicalSetting: this.selectedHistoricalSetting(),
        storm: this.selectedStorm(),
        priorTurns: this.state().coachHistory,
        nextPlanningQuestion:
          this.state().stage === 'conversation' ? this.nextPlanningQuestion() : undefined,
      });
      this.addCoachTurn('coach', tool, response.text);
    } finally {
      this.coachBusy.set(false);
    }
  }

  recordPlaytest(path: readonly string[]): void {
    if (!validNarrativePath(this.storyConfig(), path)) return;
    const endingNodeId = path.at(-1);
    if (endingNodeId === undefined) return;
    const ending = this.storyConfig().nodes.find((node) => node.id === endingNodeId);
    if (!ending || ending.kind !== 'ending') return;
    if (this.state().playtests.some((test) => test.path.join('|') === path.join('|'))) return;
    this.patch({
      playtests: [
        ...this.state().playtests,
        { id: crypto.randomUUID(), timestamp: new Date().toISOString(), path, endingNodeId },
      ],
    });
    this.flushSave();
  }

  publish(): boolean {
    if (this.readiness().length) return false;
    const now = new Date().toISOString();
    this.patch({
      published: {
        nodes: structuredClone(this.storyConfig().nodes),
        id: crypto.randomUUID(),
        publishedAt: now,
        title: this.state().storyTitle.trim(),
        authorDisplayName: this.session.actorDisplayName,
        historicalSettingId: this.state().historicalSettingId,
        bible: structuredClone(this.state().bible),
        scenes: structuredClone(this.state().scenes),
      },
    });
    this.flushSave();
    return true;
  }

  flushSave(): void {
    if (this.saveTimer !== undefined) clearTimeout(this.saveTimer);
    const current = this.state();
    const next = {
      ...current,
      revision: current.revision + 1,
      updatedAt: new Date().toISOString(),
    };
    this.state.set(next);
    try {
      this.persistence.save(next);
      this.saveStatus.set('saved');
    } catch {
      this.saveStatus.set('error');
    }
  }

  destroy(): void {
    this.flushSave();
  }

  private load(): NarrativeStudioState {
    const saved = this.persistence.load(this.config.projectId, this.config.projectVersion);
    // Only an untouched legacy scaffold adopts the smaller starter; authored drafts retain all work.
    if (
      saved &&
      !saved.nodes &&
      this.config.authoringMode &&
      !saved.published &&
      Object.values(saved.scenes).every(
        (scene) =>
          !scene.text.trim() &&
          !scene.revisions.length &&
          scene.title ===
            this.config.nodes.find((node) => node.id === scene.nodeId)?.suggestedTitle &&
          Object.values(scene.choiceLabels).every((label) => !label.trim()),
      )
    ) {
      const fresh = createInitialNarrativeState(this.config);
      return {
        ...saved,
        nodes: fresh.nodes,
        scenes: fresh.scenes,
        selectedNodeId: this.config.startNodeId,
      };
    }
    return (
      saved ?? {
        ...createInitialNarrativeState(
          this.config,
          new Date().toISOString(),
          this.initialHistorySettingId,
        ),
        runtimeScope: projectSessionRuntimeScope(this.session, 'student'),
      }
    );
  }

  private patch(patch: Partial<NarrativeStudioState>): void {
    this.state.update((state) => ({ ...state, ...patch, updatedAt: new Date().toISOString() }));
    this.scheduleSave();
  }

  private updateSelectedScene(patch: Partial<NarrativeSceneDraft>): void {
    const state = this.state();
    const nodeId = state.selectedNodeId;
    this.patch({ scenes: { ...state.scenes, [nodeId]: { ...state.scenes[nodeId], ...patch } } });
  }

  private addCoachTurn(role: 'student' | 'coach', tool: NarrativeCoachTool, text: string): void {
    this.patch({
      coachHistory: [
        ...this.state().coachHistory,
        {
          id: crypto.randomUUID(),
          role,
          tool,
          text,
          timestamp: new Date().toISOString(),
          nodeId: this.state().selectedNodeId,
          context: this.state().stage === 'conversation' ? 'planning' : 'scene',
        },
      ],
    });
  }

  private scheduleSave(): void {
    this.saveStatus.set('saving');
    if (this.saveTimer !== undefined) clearTimeout(this.saveTimer);
    this.saveTimer = setTimeout(() => this.flushSave(), 700);
  }
}
