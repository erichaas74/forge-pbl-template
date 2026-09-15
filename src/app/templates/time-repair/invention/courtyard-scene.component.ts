import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { InventionRuntime } from './invention.runtime';

@Component({
  selector: 'app-courtyard-scene',
  templateUrl: './courtyard-scene.component.html',
  styleUrl: './courtyard-scene.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourtyardSceneComponent {
  readonly r = inject(InventionRuntime);
  readonly restored = computed(() => this.r.session().mode === 'return' && this.r.repaired());
  readonly flow = computed(() => this.r.state().flow);
  readonly paperCount = computed(
    () =>
      this.flow().sheets +
      (this.restored()
        ? this.r.state().trials.filter((p) => p.usable).length - this.flow().supplied
        : 0),
  );
  readonly pages = computed(() =>
    Array.from({ length: Math.min(6, this.paperCount()) }, (_, i) => i),
  );
  readonly finished = computed(() =>
    Array.from({ length: Math.min(4, this.flow().finished) }, (_, i) => i),
  );
  readonly delivered = computed(() =>
    Array.from({ length: Math.min(3, this.flow().delivered) }, (_, i) => i),
  );
  readonly rows = [0, 1, 2, 3, 4, 5];
  readonly roofTiles = Array.from({ length: 15 }, (_, i) => i);
}
