import { Component, computed, input, output } from '@angular/core';
import type { CrisisConfig, CrisisState, CrisisView, MapLayer } from '../domain/crisis.models';
import { CrisisMapComponent } from './crisis-map.component';
import { CrisisMonitorWallComponent } from './crisis-monitor-wall.component';

export const CRISIS_CAMERA_TRANSITION_MS = 1150;

@Component({
  selector: 'app-crisis-room-scene',
  imports: [CrisisMapComponent, CrisisMonitorWallComponent],
  templateUrl: './crisis-room-scene.component.html',
  styleUrl: './crisis-room-scene.component.scss',
})
export class CrisisRoomSceneComponent {
  readonly config = input.required<CrisisConfig>();
  readonly state = input.required<CrisisState>();
  readonly selectedLocation = input('');
  readonly view = input<CrisisView>('room');
  readonly layer = input<MapLayer>('hazard');
  readonly zoom = input(1);
  readonly imageFailed = output<void>();
  readonly navigate = output<CrisisView>();
  readonly locate = output<string>();
  readonly locationSelected = output<string>();
  readonly zoomOrigin = computed(() => {
    const location = this.config().locations.find((item) => item.id === this.selectedLocation());
    return location ? location.x / 10 + '% ' + location.y / 6 + '%' : '50% 50%';
  });
}
