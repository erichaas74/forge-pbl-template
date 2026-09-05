import { NgComponentOutlet } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';

import type { ExhibitSnapshot } from '../domain/exhibit-types';
import { EXHIBIT_RENDERER_COMPONENTS } from '../runtime/exhibit-hall.tokens';

@Component({
  selector: 'app-exhibit-render-host',
  imports: [NgComponentOutlet],
  template: `
    @if (renderer(); as rendererComponent) {
      <ng-container *ngComponentOutlet="rendererComponent; inputs: rendererInputs()" />
    } @else {
      <div class="missing-renderer" role="alert">
        This exhibit needs a renderer that is not installed.
      </div>
    }
  `,
  styles: `
    :host {
      display: block;
      min-width: 0;
    }
    .missing-renderer {
      border: 1px solid #b85c51;
      padding: 1rem;
      color: #742b22;
      background: #ffe5df;
    }
  `,
})
export class ExhibitRenderHostComponent {
  private readonly registrations = inject(EXHIBIT_RENDERER_COMPONENTS);
  readonly snapshot = input.required<ExhibitSnapshot>();
  readonly mode = input<'thumbnail' | 'walkup' | 'preview'>('thumbnail');
  readonly renderer = computed(
    () =>
      this.registrations.find(
        (registration) => registration.rendererType === this.snapshot().rendererType,
      )?.component,
  );
  readonly rendererInputs = computed(() => ({
    data: this.snapshot().visitorSafeData,
    mode: this.mode(),
  }));
}
