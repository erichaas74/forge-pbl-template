import { TaskGuideComponent } from '../../../shared/learning/task-guide.component';
import { Component, inject, signal, ViewChild } from '@angular/core';

import { DebateStudioRuntimeService } from '../runtime/debate-studio-runtime.service';
import { DebateFactionRailComponent } from './debate-faction-rail.component';
import { DebateShowcaseComponent } from './debate-showcase.component';
import { DebateComposerDockComponent } from './debate-composer-dock.component';
import { DebateThreadComponent } from './debate-thread.component';

@Component({
  selector: 'app-debate-studio-page',
  imports: [
    TaskGuideComponent,
    DebateFactionRailComponent,
    DebateShowcaseComponent,
    DebateComposerDockComponent,
    DebateThreadComponent,
  ],
  templateUrl: './debate-studio-page.component.html',
  styleUrl: './debate-studio-page.component.scss',
})
export class DebateStudioPageComponent {
  readonly runtime = inject(DebateStudioRuntimeService);
  readonly docketOpen = signal(false);

  @ViewChild(DebateThreadComponent) private readonly debateThread?: DebateThreadComponent;
  @ViewChild(DebateComposerDockComponent)
  private readonly debateComposer?: DebateComposerDockComponent;

  toggleDocket(): void {
    this.docketOpen.update((open) => !open);
  }

  reviewTurn(turnId: string): void {
    this.debateThread?.focusTurn(turnId);
  }

  openBuilder(tab: 'plan' | 'evidence' = 'plan'): void {
    this.debateComposer?.open(tab);
  }
}
