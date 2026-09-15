import { WorkspaceToolsComponent } from '../../../shared/project-lessons/workspace-tools.component';
import { TaskGuideComponent } from '../../../shared/learning/task-guide.component';
import { Component, inject, signal, ViewChild } from '@angular/core';

import { DebateStudioRuntimeService } from '../runtime/debate-studio-runtime.service';
import { DebateFactionRailComponent } from './debate-faction-rail.component';
import { DebateShowcaseComponent } from './debate-showcase.component';
import { DebateComposerDockComponent } from './debate-composer-dock.component';
import { DebateThreadComponent } from './debate-thread.component';
import { DebateInquiryComponent } from './debate-inquiry.component';
import { bindLessonFocus } from '../../../shared/project-lessons/project-lesson-focus';

@Component({
  selector: 'app-debate-studio-page',
  imports: [WorkspaceToolsComponent, DebateInquiryComponent,
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
  readonly inquiryOpen = signal(true);
  constructor() {
    bindLessonFocus(() => { if (this.runtime.config.inquiry) this.inquiryOpen.set(true); });
  }

  enterHearing(): void {
    const inquiry = this.runtime.config.inquiry;
    if (!inquiry || !this.runtime.inquiryGate(inquiry.hearingGateId)) return;
    this.inquiryOpen.set(false);
  }

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
