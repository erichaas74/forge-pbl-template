import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { selectedRepair } from './restoration.engine';
import type { RepairRegion, RestorationDefinition, RestorationState } from './restoration.models';
@Component({ selector: 'app-restoration-canvas', templateUrl: './painting-canvas.component.html', styleUrl: './painting-canvas.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class PaintingCanvasComponent {
  readonly definition = input.required<RestorationDefinition>(); readonly state = input.required<RestorationState>();
  readonly original = input(false); readonly interactive = input(true); readonly guides = input(true);
  readonly select = output<string>();
  readonly backgroundSize = computed(() => `${this.definition().image.grid * 100}% ${this.definition().image.grid * 100}%`);
  readonly position = computed(() => { const { frame, grid } = this.definition().image; return grid === 1 ? 'center' : `${frame % grid * 100 / (grid - 1)}% ${Math.floor(frame / grid) * 100 / (grid - 1)}%`; });
  option(region: RepairRegion) { return this.original() ? region.options.find(o => o.id === region.originalOptionId)! : selectedRepair(region, this.state()); }
}
