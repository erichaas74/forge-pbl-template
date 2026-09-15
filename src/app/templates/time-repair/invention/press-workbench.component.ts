import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { InventionRuntime } from './invention.runtime';
import { PressProofComponent } from './press-proof.component';

@Component({
  selector: 'app-press-workbench',
  imports: [PressProofComponent],
  templateUrl: './press-workbench.component.html',
  styleUrl: './press-workbench.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PressWorkbenchComponent {
  readonly r = inject(InventionRuntime);
  readonly pressDown = signal(false);
  readonly typesEditable = computed(() =>
    ['compose', 'recompose', 'production'].includes(this.r.session().mode),
  );
  readonly inkEditable = computed(() =>
    ['ink', 'production', 'return'].includes(this.r.session().mode),
  );
  readonly packingEditable = computed(() =>
    ['packing', 'production'].includes(this.r.session().mode),
  );
  readonly pressureEditable = computed(() =>
    ['ink', 'packing', 'production', 'return'].includes(this.r.session().mode),
  );
  readonly visibleTrials = computed(() => this.r.state().trials.slice(-5));
  readonly stitches = Array.from({ length: 15 }, (_, i) => i);
  readonly floorLines = Array.from({ length: 14 }, (_, i) => i);
  readonly marks = [0, 1, 2];
  inkMark(id: string): string {
    return this.r.content.inks.find((i) => i.id === id)?.mark ?? '';
  }
  pull(): void {
    this.pressDown.update((v) => !v);
    this.r.pull();
  }
}
