import { Injectable, signal } from '@angular/core';

export type RenderQuality = 'high' | 'plain';

/**
 * Decides whether the bench may use the expensive SVG filters — displacement
 * refraction and specular lighting.
 *
 * These land on school hardware, so quality starts high and drops permanently
 * the first time a run cannot hold frame rate. It never climbs back: flipping
 * the glass between two looks mid-investigation is worse than picking the
 * cheaper one and staying there.
 */
@Injectable({ providedIn: 'root' })
export class RenderQualityService {
  private static readonly sampleFrames = 42;
  private static readonly slowFrameMs = 22;

  readonly quality = signal<RenderQuality>('high');
  private probing = false;
  private settled = false;

  constructor() {
    if (prefersReducedMotion()) {
      this.quality.set('plain');
      this.settled = true;
    }
  }

  get filtersEnabled(): boolean {
    return this.quality() === 'high';
  }

  /**
   * Samples frame times across one animated stretch. Safe to call on every
   * run; it measures once and then leaves the verdict alone.
   */
  probe(): void {
    if (
      this.settled ||
      this.probing ||
      typeof requestAnimationFrame !== 'function' ||
      typeof performance === 'undefined'
    ) {
      return;
    }
    this.probing = true;

    let frames = 0;
    let last = performance.now();
    let total = 0;

    const step = (now: number): void => {
      total += now - last;
      last = now;
      frames += 1;
      if (frames < RenderQualityService.sampleFrames) {
        requestAnimationFrame(step);
        return;
      }
      if (total / frames > RenderQualityService.slowFrameMs) {
        this.quality.set('plain');
      }
      this.probing = false;
      this.settled = true;
    };

    requestAnimationFrame(step);
  }
}

function prefersReducedMotion(): boolean {
  return typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
}
