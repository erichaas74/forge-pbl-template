import {
  afterNextRender,
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  Injector,
  PendingTasks,
  signal,
  viewChild,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PROJECT_SESSION_CONTEXT } from '../../runtime/project-launch/project-launch.tokens';
import {
  PROJECT_INTRO_CONFIG,
  ProjectIntroRuntime,
} from '../../shared/project-intro/project-intro.runtime';
import type { ProjectTeaserResult } from '../../shared/project-intro/project-teaser.models';
import { ProjectTeaserHostComponent } from './project-teaser-host.component';
import { ProjectProductPreviewComponent } from './project-product-preview.component';

@Component({
  selector: 'app-project-intro',
  imports: [RouterLink, ProjectTeaserHostComponent, ProjectProductPreviewComponent],
  providers: [ProjectIntroRuntime],
  templateUrl: './project-intro.component.html',
  styleUrl: './project-intro.component.scss',
})
export class ProjectIntroComponent {
  readonly config = inject(PROJECT_INTRO_CONFIG);
  readonly runtime = inject(ProjectIntroRuntime);
  private readonly session = inject(PROJECT_SESSION_CONTEXT);
  private readonly router = inject(Router);
  private readonly injector = inject(Injector);
  private readonly pendingTasks = inject(PendingTasks);
  private readonly heading = viewChild<ElementRef<HTMLElement>>('productHeading');
  private readonly saveError = viewChild<ElementRef<HTMLElement>>('saveError');
  private teaserHandoffPending = false;
  readonly pendingReceipt = signal<ProjectTeaserResult | undefined>(undefined);
  readonly loading = signal(true);
  readonly entering = signal(false);
  readonly teaserVisible = signal(true);
  readonly teaserReplayLabel = computed(() => {
    const teaser = this.config.teaser;
    return teaser?.type === 'decision-scene'
      ? teaser.replayLabel
      : teaser
        ? `Replay ${teaser.scientistName}’s introduction`
        : 'Replay opening';
  });

  constructor() {
    this.pendingTasks.run(async () => {
      try {
        await this.runtime.initialize(
          { session: this.session, introVersion: this.config.version },
          this.config,
        );
      } finally {
        // A saved receipt preserves learning history; it must not hide the story opening.
        this.teaserVisible.set(!!this.config.teaser);
        this.loading.set(false);
        if (!this.config.teaser) this.focus(false);
      }
    });
  }

  async finishTeaser(result: ProjectTeaserResult): Promise<void> {
    this.pendingReceipt.set(result);
    const revisiting =
      !this.teaserHandoffPending &&
      (!!this.runtime.snapshot()?.draft.teaser || !!this.runtime.snapshot()?.history.length);
    if (revisiting && result.thinking?.length) {
      const replays = this.runtime.draft().practiceReplays ?? [];
      if (
        !replays.some(
          (item) => item.timestamp === result.timestamp && item.teaserId === result.teaserId,
        )
      )
        this.runtime.update({ practiceReplays: [...replays.slice(-9), result] });
      if (!(await this.runtime.saveDraft())) {
        this.focus(true);
        return;
      }
    }
    if (!revisiting) {
      this.teaserHandoffPending = true;
      this.runtime.update({ teaser: result });
      if (!(await this.runtime.saveDraft())) {
        this.focus(true);
        return;
      }
    }
    this.teaserHandoffPending = false;
    this.teaserVisible.set(false);
    if (result.eventType === 'projectIntro.teaserCompleted' && result.thinking?.length)
      await this.enter();
    else this.focus(false);
  }

  replayTeaser(): void {
    this.teaserVisible.set(true);
  }

  async enter(): Promise<void> {
    if (this.entering()) return;
    this.entering.set(true);
    try {
      // The goal chat is a visual placeholder. Do not fabricate an accepted response.
      if (await this.canLeave())
        await this.router.navigate(['/projects', this.config.projectId, 'experience']);
    } finally {
      this.entering.set(false);
    }
  }

  async canLeave(): Promise<boolean> {
    const saved = !this.runtime.dirty() || (await this.runtime.saveDraft());
    if (!saved) this.focus(true);
    return saved;
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnload(event: BeforeUnloadEvent): void {
    if (this.runtime.dirty()) event.preventDefault();
  }

  private focus(error: boolean): void {
    afterNextRender(
      () => {
        const element = (error ? this.saveError() : this.heading())?.nativeElement;
        element?.scrollIntoView({ block: 'nearest' });
        element?.focus({ preventScroll: true });
      },
      { injector: this.injector },
    );
  }
}
