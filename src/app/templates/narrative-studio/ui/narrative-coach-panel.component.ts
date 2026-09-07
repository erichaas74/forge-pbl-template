import { Component, computed, inject, signal } from '@angular/core';

import type { NarrativeCoachTool } from '../domain/narrative-studio.models';
import { NarrativeStudioRuntimeService } from '../runtime/narrative-studio-runtime.service';

@Component({
  selector: 'app-narrative-coach-panel',
  templateUrl: './narrative-coach-panel.component.html',
  styleUrl: './narrative-coach-panel.component.scss',
})
export class NarrativeCoachPanelComponent {
  readonly runtime = inject(NarrativeStudioRuntimeService);
  readonly replyDraft = signal('');
  readonly latestTurns = computed(() =>
    this.runtime
      .state()
      .coachHistory.filter(
        (turn) =>
          turn.context !== 'planning' && turn.nodeId === this.runtime.state().selectedNodeId,
      )
      .slice(-6),
  );

  async useTool(tool: NarrativeCoachTool): Promise<void> {
    await this.runtime.askCoach(tool);
  }

  updateReply(event: Event): void {
    this.replyDraft.set((event.target as HTMLTextAreaElement).value);
  }

  async sendReply(): Promise<void> {
    const reply = this.replyDraft();
    if (!reply.trim()) return;
    this.replyDraft.set('');
    await this.runtime.askCoach('reply', reply);
  }
}
