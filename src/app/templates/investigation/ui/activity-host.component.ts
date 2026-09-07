import { NgComponentOutlet } from '@angular/common';
import { Component, computed, input, output, type Type } from '@angular/core';

import type { ActivityTypeRegistry } from '../../../core/registries/specialized-registries';
import type { ActivityDefinition, ActivityResult } from '../../../shared/activities/activity-contracts';
import type { ActivityRuntimeState } from '../domain/runtime-state';

export interface InvestigationActivityRenderer {
  readonly component: Type<unknown>;
  inputs(
    definition: ActivityDefinition,
    runtime: ActivityRuntimeState | undefined,
  ): Readonly<Record<string, unknown>>;
}

@Component({
  selector: 'app-investigation-activity-host',
  imports: [NgComponentOutlet],
  template: `
    @if (renderer(); as registration) {
      <ng-container
        *ngComponentOutlet="registration.component; inputs: rendererInputs()"
      ></ng-container>
    } @else {
      <section class="activity-unavailable" role="alert">
        <h3>Activity unavailable</h3>
        <p>No installed activity renderer supports “{{ definition().type }}”.</p>
      </section>
    }
  `,
  styles: `
    .activity-unavailable {
      padding: 1rem;
      border: 1px solid #b26147;
      border-radius: 0.65rem;
      background: #fff7f2;
    }
    h3 { margin-top: 0; }
  `,
})
export class InvestigationActivityHostComponent {
  readonly definition = input.required<ActivityDefinition>();
  readonly runtime = input<ActivityRuntimeState>();
  readonly registry = input.required<ActivityTypeRegistry<InvestigationActivityRenderer>>();
  readonly completed = output<ActivityResult>();

  readonly renderer = computed(
    () => this.registry().get(this.definition().type)?.plugin,
  );
  readonly rendererInputs = computed(() =>
    this.renderer()?.inputs(this.definition(), this.runtime()) ?? {},
  );
}
