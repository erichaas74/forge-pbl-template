import { Component, computed, inject, input, Injector, signal } from '@angular/core';
import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  DESIGN_SIMULATIONS,
  DESIGN_CHROME,
  type DesignChrome,
} from '../../../shared/engineering/design-simulation.registry';
import type { EngineeringSnapshot } from '../domain/engineering-design.models';
import { EngineeringExhibitComponent } from './engineering-exhibit.component';

/** Read-only final product, using the same single-header composition as the student lab. */
@Component({
  selector: 'app-engineering-final-demo',
  imports: [NgComponentOutlet, NgTemplateOutlet, RouterLink, EngineeringExhibitComponent],
  template: `
    <header aria-label="Example navigation and controls">
      <a [routerLink]="['/projects', projectId(), 'experience']">← Lab</a>
      <span class="example-label" [title]="title()">Fictional example</span>
      <button (click)="guideOpen.set(!guideOpen())" [attr.aria-expanded]="guideOpen()">
        Guide
      </button>
      <ng-container *ngTemplateOutlet="chrome()?.toolbar ?? null" />
    </header>
    @if (guideOpen()) {
      <aside aria-label="Example guide">
        <button class="close" (click)="guideOpen.set(false)">Close ×</button>
        <h2>{{ title() }}</h2>
        <p>This example is read only. Choose a special date to compare its Sun and shadow.</p>
        <ng-container *ngTemplateOutlet="chrome()?.guide ?? null" />
        <button (click)="hostGuide()()">Teacher guide</button>
        <details>
          <summary>Blueprint & evidence</summary>
          <app-engineering-exhibit [title]="title()" [snapshot]="snapshot()" />
        </details>
      </aside>
    }
    <ng-container
      *ngComponentOutlet="simulation(); inputs: simulationInputs(); injector: simulationInjector"
    />
  `,
  styles: [
    `
      :host {
        display: block;
        color: #393b31;
      }
      header {
        position: sticky;
        top: 0;
        z-index: 30;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 6px;
        padding: 8px;
        border: 1px solid #c2b69d;
        background: #f7f3e8;
      }
      a {
        color: #385a44;
        font-size: 13px;
        padding: 7px;
      }
      .example-label {
        font-size: 12px;
        color: #66624e;
      }
      button {
        font: inherit;
        cursor: pointer;
        min-height: 36px;
        padding: 7px 10px;
        font-size: 13px;
        color: inherit;
        border: 1px solid #c2b69d;
        border-radius: 6px;
        background: #fffdf7;
      }
      aside {
        position: fixed;
        right: 16px;
        top: 72px;
        z-index: 40;
        width: 345px;
        max-width: calc(100vw - 48px);
        max-height: calc(100dvh - 110px);
        overflow: auto;
        padding: 14px;
        border: 1px solid #b8aa8e;
        border-radius: 8px;
        background: #fffdf7;
        box-shadow: 0 15px 55px #282a2640;
      }
      .close {
        display: block;
        margin-left: auto;
      }
      h2 {
        font:
          700 22px Georgia,
          serif;
      }
      p {
        line-height: 1.5;
        font-size: 14px;
      }
      summary {
        cursor: pointer;
        padding: 12px 0;
      }
    `,
  ],
})
export class EngineeringFinalDemoComponent {
  readonly title = input.required<string>();
  readonly projectId = input('');
  readonly hostGuide = input<() => void>(() => {});
  readonly snapshot = input.required<EngineeringSnapshot>();
  readonly simulationId = input.required<string>();
  readonly chrome = signal<DesignChrome | undefined>(undefined);
  readonly guideOpen = signal(false);
  readonly simulationInjector = Injector.create({
    parent: inject(Injector),
    providers: [
      {
        provide: DESIGN_CHROME,
        useValue: (chrome: DesignChrome | undefined) => this.chrome.set(chrome),
      },
    ],
  });
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
