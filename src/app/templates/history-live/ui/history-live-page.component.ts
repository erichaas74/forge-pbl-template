import { TaskGuideComponent } from '../../../shared/learning/task-guide.component';
import { Component, inject, afterRenderEffect, ElementRef, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

import { HISTORY_LIVE_STAGES } from '../core/history-live-state';
import type { HistoryLiveRole, HistoryLiveSide } from '../domain/history-live.models';
import { HistoryLiveRuntimeService } from '../runtime/history-live-runtime.service';
import { AssignmentDeskComponent } from './assignment-desk.component';
import { BroadcastPlayerComponent } from './broadcast-player.component';
import { ProducerConsoleComponent } from './producer-console.component';
import { ProductionStudioComponent } from './production-studio.component';
import { ScriptDeskComponent } from './script-desk.component';
import { SourceWallComponent } from './source-wall.component';
import { ResearchPanelComponent } from './research-panel.component';
import { ResearchShelfState } from './research-shelf-state';

@Component({
  selector: 'app-history-live-page',
  providers: [ResearchShelfState],
  imports: [
    TaskGuideComponent,
    RouterLink,
    AssignmentDeskComponent,
    SourceWallComponent,
    ResearchPanelComponent,
    ScriptDeskComponent,
    ProductionStudioComponent,
    BroadcastPlayerComponent,
    ProducerConsoleComponent,
  ],
  templateUrl: './history-live-page.component.html',
  styleUrl: './history-live-page.component.scss',
})
export class HistoryLivePageComponent {
  readonly runtime = inject(HistoryLiveRuntimeService);
  readonly stages = HISTORY_LIVE_STAGES;
  readonly assignmentDesk = viewChild(AssignmentDeskComponent);
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private priorStage?: string;
  constructor() {
    // The shared project launch already provides the invitation and project overview.
    if (this.runtime.state().stage === 'opening') this.runtime.goTo('side');
    afterRenderEffect(() => {
      const stage = this.runtime.state().stage;
      if (stage === this.priorStage) return;
      const first = this.priorStage === undefined;
      this.priorStage = stage;
      if (first) return;
      const heading = this.element.nativeElement.querySelector<HTMLElement>('main h1');
      if (heading) {
        heading.tabIndex = -1;
        heading.scrollIntoView({ block: 'nearest', behavior: 'instant' });
        heading.focus({ preventScroll: true });
      }
    });
  }

  chooseRole(event: Event): void {
    this.runtime.setRole((event.target as HTMLSelectElement).value as HistoryLiveRole);
  }

  chooseSide(side: HistoryLiveSide): void {
    this.runtime.chooseSide(side);
  }
}
