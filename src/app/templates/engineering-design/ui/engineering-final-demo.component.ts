import { Component, computed, inject, input } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { DESIGN_SIMULATIONS } from '../../../shared/engineering/design-simulation.registry';
import type { EngineeringSnapshot } from '../domain/engineering-design.models';
import { EngineeringExhibitComponent } from './engineering-exhibit.component';

/** Read-only final product: live registered simulation first, supporting records second. */
@Component({
  selector: 'app-engineering-final-demo',
  imports: [NgComponentOutlet, EngineeringExhibitComponent],
  template: `<h2>{{ title() }}</h2>
    <p>
      Walk through the special dates on this model. These are simulated checks of a fictional
      design.
    </p>
    <ng-container *ngComponentOutlet="simulation(); inputs: simulationInputs()" />
    <details>
      <summary>Research, blueprint & earlier evidence</summary>
      <app-engineering-exhibit [title]="title()" [snapshot]="snapshot()" />
    </details>`,
  styles: [
    `
      :host {
        display: block;
      }
      h2 {
        margin: 0 0 8px;
      }
      p {
        line-height: 1.6;
      }
      summary {
        cursor: pointer;
        padding: 18px 0;
        font-weight: 700;
      }
    `,
  ],
})
export class EngineeringFinalDemoComponent {
  readonly title = input.required<string>();
  readonly snapshot = input.required<EngineeringSnapshot>();
  readonly simulationId = input.required<string>();
  private readonly registry = inject(DESIGN_SIMULATIONS);
  readonly simulation = computed(() => this.registry.require(this.simulationId()));
  readonly simulationInputs = computed(() => {
    const snapshot = this.snapshot();
    return {
      design: snapshot.design,
      checks: snapshot.checks ?? [],
      presentation: true,
      readOnly: true,
      active: true,
      restore: snapshot.trials[0] ? { ...snapshot.trials[0], design: snapshot.design } : undefined,
    };
  });
}
