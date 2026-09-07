import { Component, computed, inject, signal } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ENGINEERING_CONFIG,
  EngineeringDesignRuntime,
} from '../runtime/engineering-design.runtime';
import { DESIGN_SIMULATIONS } from '../../../shared/engineering/design-simulation.registry';
import { BlockBuilderComponent } from './block-builder.component';
import { EngineeringExhibitComponent } from './engineering-exhibit.component';
import type { DesignCapture } from '../../../shared/engineering/block-design';
@Component({
  selector: 'app-engineering-design-page',
  imports: [NgComponentOutlet, FormsModule, BlockBuilderComponent, EngineeringExhibitComponent],
  templateUrl: './engineering-design-page.component.html',
  styleUrl: './engineering-design-page.component.scss',
})
export class EngineeringDesignPageComponent {
  readonly config = inject(ENGINEERING_CONFIG);
  readonly runtime = inject(EngineeringDesignRuntime);
  readonly simulation = inject(DESIGN_SIMULATIONS).require(this.config.simulationId);
  readonly tab = signal('research');
  readonly restore = signal<DesignCapture | undefined>(undefined);
  readonly tabs = [
    { id: 'research', label: '1 · Research' },
    { id: 'build', label: '2 · Build & test' },
    { id: 'trials', label: '3 · Evidence' },
    { id: 'exhibit', label: '4 · Exhibit' },
  ];
  readonly simulationInputs = computed(() => ({
    design: this.runtime.snapshot().design,
    restore: this.restore(),
    active: this.tab() === 'build',
  }));
  readonly researchCount = computed(
    () => this.config.research.filter((r) => this.runtime.snapshot().research[r.id]?.trim()).length,
  );
  readonly ready = computed(
    () =>
      this.researchCount() === this.config.research.length &&
      this.runtime.snapshot().trials.length >= 4 &&
      !!this.runtime.snapshot().exhibit.trim(),
  );
  replay(trial: DesignCapture): void {
    this.runtime.saveDesign(trial.design);
    this.restore.set(trial);
    this.tab.set('build');
  }
  exportNotebook(): void {
    const blob = new Blob(
      [
        JSON.stringify(
          {
            projectId: this.config.projectId,
            projectVersion: this.config.version,
            ...this.runtime.snapshot(),
          },
          null,
          2,
        ),
      ],
      { type: 'application/json' },
    );
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${this.config.projectId}-notebook.json`;
    link.click();
    URL.revokeObjectURL(url);
  }
}
