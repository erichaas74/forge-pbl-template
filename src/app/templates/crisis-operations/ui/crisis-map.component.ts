import { Component, computed, input, output } from '@angular/core';
import type { CrisisConfig, CrisisState, MapLayer } from '../domain/crisis.models';

@Component({
  selector: 'app-crisis-map',
  templateUrl: './crisis-map.component.html',
  styleUrl: './crisis-map.component.scss',
})
export class CrisisMapComponent {
  readonly config = input.required<CrisisConfig>();
  readonly state = input.required<CrisisState>();
  readonly layer = input<MapLayer>('hazard');
  readonly selected = input('');
  readonly miniature = input(false);
  readonly locationSelected = output<string>();
  readonly buildings = computed(() =>
    this.config()
      .locations.filter((l) => l.population > 0 && l.kind === 'community')
      .flatMap((l) =>
        Array.from({ length: 27 }, (_, i) => ({
          x: l.x - 48 + (i % 6) * 16,
          y: l.y - 26 + Math.floor(i / 6) * 14,
          w: 6 + (i % 3) * 2,
          h: 5 + (i % 2) * 4,
        })),
      ),
  );
  readonly deployed = computed(() =>
    this.state().decisions.map((d) => {
      const action = this.config().actions.find((a) => a.id === d.actionId)!;
      return { action, location: this.config().locations.find((l) => l.id === action.locationId)! };
    }),
  );
}
