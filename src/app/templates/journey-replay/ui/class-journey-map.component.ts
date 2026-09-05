import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import type { Subscription } from 'rxjs';

import { detectVoyageIntersections } from '../core/journey-replay.engine';
import type {
  ClassMapDisplayMode,
  ClassVoyageRecord,
  JourneyClassMemberSummary,
  JourneyMasteryLevel,
} from '../domain/journey-replay.models';
import { JourneyReplayRuntimeService } from '../runtime/journey-replay-runtime.service';
import { LivingJourneyMapComponent } from './map/living-journey-map.component';

@Component({
  selector: 'app-class-journey-map',
  imports: [LivingJourneyMapComponent],
  templateUrl: './class-journey-map.component.html',
  styleUrl: './class-journey-map.component.scss',
})
export class ClassJourneyMapComponent implements OnInit, OnDestroy {
  readonly runtime = inject(JourneyReplayRuntimeService);
  readonly mode = signal<ClassMapDisplayMode>('all');
  readonly reviewLevel = signal<JourneyMasteryLevel>('proficient');
  readonly reviewFeedback = signal('');
  readonly voyages = computed<readonly ClassVoyageRecord[]>(() => {
    const summary = this.runtime.classSummary();
    if (summary !== undefined) {
      return summary.members.map((member) => ({
        voyageId: member.voyageId,
        team: member.team,
        route: member.route,
        outcome: member.outcome,
      }));
    }
    return this.runtime.session() === undefined ? this.runtime.config.classVoyages : [];
  });
  readonly selectedVoyageIds = signal<readonly string[]>([
    this.runtime.config.classVoyages[0]?.voyageId ?? '',
  ]);
  readonly revealCount = signal(this.voyages().length);
  readonly visibleVoyages = computed(() => {
    const voyages = this.voyages();
    if (this.mode() === 'all') return voyages;
    if (this.mode() === 'classReplay') return voyages.slice(0, this.revealCount());
    return voyages.filter((voyage) => this.selectedVoyageIds().includes(voyage.voyageId));
  });
  readonly intersections = computed(() => detectVoyageIntersections(this.voyages()));
  readonly pendingReviews = computed(
    () => this.runtime.classSummary()?.members.filter((member) => member.submission?.status === 'submitted') ?? [],
  );
  readonly masteryTags = computed(() => [
    ...new Set(this.runtime.config.steps.flatMap((step) => step.masteryTags)),
  ]);
  private timer?: ReturnType<typeof setInterval>;
  private summarySubscription?: Subscription;

  ngOnInit(): void {
    this.summarySubscription = this.runtime.connectClassSummary();
  }

  setMode(mode: ClassMapDisplayMode): void {
    this.stopReplay();
    this.mode.set(mode);
    if (mode === 'all') this.revealCount.set(this.voyages().length);
    if (mode === 'single') this.selectedVoyageIds.set([this.selectedVoyageIds()[0] ?? this.voyages()[0]?.voyageId ?? '']);
    if (mode === 'compare') this.selectedVoyageIds.set(this.voyages().slice(0, 2).map((voyage) => voyage.voyageId));
  }

  toggleVoyage(voyageId: string): void {
    if (this.mode() === 'single') {
      this.selectedVoyageIds.set([voyageId]);
      return;
    }
    if (this.mode() !== 'compare') return;
    const selected = this.selectedVoyageIds();
    if (selected.includes(voyageId)) {
      if (selected.length > 1) this.selectedVoyageIds.set(selected.filter((id) => id !== voyageId));
      return;
    }
    this.selectedVoyageIds.set([...selected.slice(-1), voyageId]);
  }

  startClassReplay(): void {
    this.stopReplay();
    this.mode.set('classReplay');
    this.revealCount.set(1);
    this.timer = setInterval(() => {
      if (this.revealCount() >= this.voyages().length) {
        this.stopReplay();
        return;
      }
      this.revealCount.update((count) => count + 1);
    }, 1800);
  }

  setReviewLevel(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    if (value === 'developing' || value === 'proficient' || value === 'advanced') {
      this.reviewLevel.set(value);
    }
  }

  setReviewFeedback(event: Event): void {
    this.reviewFeedback.set((event.target as HTMLTextAreaElement).value);
  }

  async review(member: JourneyClassMemberSummary, decision: 'approved' | 'revision-requested'): Promise<void> {
    if (member.submission === undefined) return;
    const mastery = this.masteryTags().map((masteryTag) => ({
      masteryTag,
      level: decision === 'approved' ? this.reviewLevel() : 'developing' as const,
      feedback: this.reviewFeedback().trim() || undefined,
    }));
    if (await this.runtime.reviewSubmission(
      member.submission.id,
      decision,
      this.reviewFeedback().trim(),
      mastery,
    )) this.reviewFeedback.set('');
  }

  locationName(locationId: string): string {
    return this.runtime.config.map.locations.find((location) => location.id === locationId)?.name ?? locationId;
  }

  stopReplay(): void {
    if (this.timer !== undefined) clearInterval(this.timer);
    this.timer = undefined;
  }

  ngOnDestroy(): void {
    this.stopReplay();
    this.summarySubscription?.unsubscribe();
  }
}
