import { Component, computed, inject, input, output } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import type { CrisisView, MapLayer } from '../domain/crisis.models';
import { CrisisRuntimeService } from '../runtime/crisis-runtime.service';
import { CrisisIconComponent } from './crisis-icon.component';

/** Controls surround the room's persistent map instead of rendering a second map. */
@Component({
  selector: 'app-crisis-table-controls',
  imports: [DecimalPipe, CrisisIconComponent],
  templateUrl: './crisis-table-controls.component.html',
  styleUrl: './crisis-table-controls.component.scss',
})
export class CrisisTableControlsComponent {
  readonly runtime = inject(CrisisRuntimeService);
  readonly selectedLocation = input.required<string>();
  readonly layer = input<MapLayer>('hazard');
  readonly zoom = input(1);
  readonly layerChanged = output<MapLayer>();
  readonly zoomChanged = output<number>();
  readonly locationSelected = output<string>();
  readonly navigate = output<CrisisView>();
  readonly location = computed(
    () =>
      this.runtime.config.locations.find((l) => l.id === this.selectedLocation()) ??
      this.runtime.config.locations[0],
  );
  readonly locationReports = computed(() =>
    this.runtime.reports().filter((r) => r.locationId === this.location().id),
  );
  readonly locationOrders = computed(() =>
    this.runtime.orders().filter((o) => o.action.locationId === this.location().id),
  );
}
