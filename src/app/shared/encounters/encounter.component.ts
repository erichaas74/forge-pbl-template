import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, computed, effect, inject, input, output, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { encounterReady } from './encounter.engine';
import type { EncounterAction, EncounterDefinition, EncounterSource, EncounterState, EvidenceRelationship } from './encounter.models';

@Component({
  selector: 'app-historical-encounter', imports: [FormsModule], templateUrl: './encounter.component.html',
  styleUrl: './encounter.component.scss', changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EncounterComponent {
  readonly definition = input.required<EncounterDefinition>();
  readonly state = input.required<EncounterState>();
  readonly sources = input.required<readonly EncounterSource[]>();
  readonly reducedMotion = input(false);
  readonly returnLabel = input('Return to gallery');
  readonly action = output<EncounterAction>();
  readonly leave = output<void>();
  readonly view = computed(() => this.definition().views.find(v => v.id === this.state().viewId)!);
  readonly readyForInsight = computed(() => encounterReady(this.state()));
  readonly insightOpen = signal(false);
  readonly evidenceId = signal('');
  readonly relationship = signal<EvidenceRelationship | ''>('');
  readonly lens = signal(50);
  readonly selectedFeature = signal('');
  readonly imageError = signal(false);
  readonly audioError = signal(false);
  readonly imageAttempt = signal(0);
  readonly imageSrc = computed(() => this.definition().image + (this.imageAttempt() ? `?retry=${this.imageAttempt()}` : ''));
  readonly evidence = computed(() => this.sources().filter(s => this.definition().insight.evidenceIds.includes(s.id)));
  readonly chosenEvidence = computed(() => this.evidence().find(e => e.id === this.evidenceId()));
  readonly chapter = computed(() => this.definition().chapters.find(c => c.id === this.state().chapterId));
  readonly question = computed(() => this.definition().questions.find(q => q.id === this.state().questionId));
  readonly spoken = computed(() => this.insightOpen() ? undefined : this.view().mode === 'listen' ? this.chapter() : this.view().mode === 'talk' ? this.question() : undefined);
  readonly feature = computed(() => this.definition().object.features.find(f => f.id === this.selectedFeature()));
  readonly heading = viewChild<ElementRef<HTMLElement>>('heading');
  readonly player = viewChild<ElementRef<HTMLAudioElement>>('player');
  readonly panel = viewChild<ElementRef<HTMLElement>>('panel');
  private disposed = false;
  constructor() {
    effect(() => this.lens.set(this.definition().object.position));
    effect(() => { this.spoken()?.id; this.player()?.nativeElement.pause(); this.audioError.set(false); });
    inject(DestroyRef).onDestroy(() => { this.disposed = true; this.pause(); });
  }
  pause(): void { this.player()?.nativeElement.pause(); }
  go(id: string): void {
    this.pause(); this.insightOpen.set(false);
    if (id !== this.state().viewId) this.action.emit({ type: 'view', viewId: id });
    const destination = this.definition().views.find(v => v.id === id);
    if (destination?.mode === 'listen' && !this.state().chapterId) this.action.emit({ type: 'chapter', chapterId: this.definition().chapters[0].id });
    this.focusPanel();
  }
  showInsight(): void { this.pause(); this.insightOpen.set(true); this.focusPanel(); }
  openChapter(id: string): void { this.pause(); if (this.state().chapterId !== id) this.action.emit({ type: 'chapter', chapterId: id }); }
  ask(id: string): void { this.pause(); if (this.state().questionId !== id) this.action.emit({ type: 'question', questionId: id }); }
  inspectFeature(id: string): void {
    this.selectedFeature.set(id);
    if (!this.state().features.includes(id)) this.action.emit({ type: 'feature', featureId: id });
  }
  checkInsight(): void {
    const relationship = this.relationship();
    if (this.evidenceId() && relationship && this.readyForInsight()) this.action.emit({ type: 'insight', evidenceId: this.evidenceId(), relationship });
  }
  retryImage(): void { this.imageError.set(false); this.imageAttempt.update(n => n + 1); }
  private focusPanel(): void {
    setTimeout(() => {
      if (this.disposed) return;
      this.panel()?.nativeElement.scrollTo?.({ top: 0, behavior: 'instant' });
      this.heading()?.nativeElement.scrollIntoView?.({ block: 'nearest', behavior: 'instant' });
      this.heading()?.nativeElement.focus({ preventScroll: true });
    });
  }
}
