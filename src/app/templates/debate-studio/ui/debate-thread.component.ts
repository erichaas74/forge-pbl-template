import { AfterViewInit, Component, ElementRef, inject, signal, ViewChild } from '@angular/core';

import type {
  DebateBroadcastSegment,
  DebateFaction,
  DebateTurn,
} from '../domain/debate-studio.models';
import { DebateStudioRuntimeService } from '../runtime/debate-studio-runtime.service';

@Component({
  selector: 'app-debate-thread',
  templateUrl: './debate-thread.component.html',
  styleUrl: './debate-thread.component.scss',
})
export class DebateThreadComponent implements AfterViewInit {
  readonly runtime = inject(DebateStudioRuntimeService);
  readonly selectedSegmentId = signal<string | undefined>(undefined);

  @ViewChild('threadScroller') private readonly threadScroller?: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    queueMicrotask(() => this.scrollToLatest(false));
  }

  faction(segment: DebateBroadcastSegment): DebateFaction | undefined {
    return this.runtime.config.factions.find((faction) => faction.id === segment.factionId);
  }

  turn(segment: DebateBroadcastSegment): DebateTurn | undefined {
    return this.runtime.session().turns.find((turn) => turn.id === segment.turnId);
  }

  evidenceTitle(evidenceId: string): string {
    return this.runtime.config.evidence.find((item) => item.id === evidenceId)?.title ?? evidenceId;
  }

  isLeft(segment: DebateBroadcastSegment): boolean {
    return segment.factionId === this.runtime.config.factions[0].id;
  }

  isExpanded(segment: DebateBroadcastSegment): boolean {
    return this.selectedSegmentId() === segment.id;
  }

  toggleSegment(segment: DebateBroadcastSegment): void {
    this.selectedSegmentId.update((id) => (id === segment.id ? undefined : segment.id));
  }

  focusTurn(turnId: string): void {
    const segment = this.runtime.program().find((item) => item.turnId === turnId);
    if (segment === undefined) return;
    this.selectedSegmentId.set(segment.id);
    queueMicrotask(() => this.scrollToElement(`debate-turn-${turnId}`));
  }

  scrollToLatest(smooth = true): void {
    const scroller = this.threadScroller?.nativeElement;
    if (scroller === undefined) return;
    if (typeof scroller.scrollTo !== 'function') {
      scroller.scrollTop = scroller.scrollHeight;
      return;
    }
    scroller.scrollTo({
      top: scroller.scrollHeight,
      behavior: smooth && !this.prefersReducedMotion() ? 'smooth' : 'auto',
    });
  }

  private scrollToElement(id: string): void {
    const target = this.threadScroller?.nativeElement.querySelector<HTMLElement>(`#${id}`);
    if (target === undefined || target === null) return;
    if (typeof target.scrollIntoView === 'function') {
      target.scrollIntoView({
        block: 'center',
        behavior: this.prefersReducedMotion() ? 'auto' : 'smooth',
      });
    }
    if (typeof target.focus === 'function') target.focus({ preventScroll: true });
  }

  private prefersReducedMotion(): boolean {
    return (
      typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }
}
