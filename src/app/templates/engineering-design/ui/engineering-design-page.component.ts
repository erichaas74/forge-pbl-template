import {
  Component,
  ElementRef,
  Injector,
  afterNextRender,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
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
  readonly panel = signal('');
  readonly presenting = signal(false);
  private readonly injector = inject(Injector);
  private readonly supportPanel = viewChild<ElementRef<HTMLElement>>('supportPanel');
  private readonly canvasRegion = viewChild<ElementRef<HTMLElement>>('canvasRegion');
  readonly restore = signal<DesignCapture | undefined>(this.savedContext());
  readonly simulationInputs = computed(() => ({
    design: this.runtime.snapshot().design,
    restore: this.restore(),
    active: true,
    presentation: this.presenting(),
    checks: this.runtime.snapshot().checks ?? [],
  }));
  readonly researchCount = computed(
    () => this.config.research.filter((r) => this.runtime.snapshot().research[r.id]?.trim()).length,
  );
  togglePanel(panel: string): void {
    this.panel.set(this.panel() === panel ? '' : panel);
    afterNextRender(
      () => {
        const element = (this.panel() ? this.supportPanel() : this.canvasRegion())?.nativeElement;
        element?.scrollIntoView({ block: 'nearest' });
        element?.focus({ preventScroll: true });
      },
      { injector: this.injector },
    );
  }
  private savedContext(): DesignCapture | undefined {
    const snapshot = this.runtime.snapshot();
    const last = snapshot.trials[snapshot.trials.length - 1];
    return last ? { ...last, design: snapshot.design } : undefined;
  }
  replay(trial: DesignCapture): void {
    this.runtime.saveDesign(trial.design);
    this.restore.set(trial);
    this.presenting.set(false);
    this.panel.set('');
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
