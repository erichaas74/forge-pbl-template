import { Component, computed, inject, input, output } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import type { CrisisRoomSurface, CrisisView } from '../domain/crisis.models';
import { workstationReports } from '../domain/crisis-workstations';
import { CrisisRuntimeService } from '../runtime/crisis-runtime.service';
import { CrisisWeatherScreenComponent } from './crisis-weather-screen.component';

@Component({
  selector: 'app-crisis-workstations',
  imports: [DecimalPipe, CrisisWeatherScreenComponent],
  templateUrl: './crisis-workstations.component.html',
  styleUrls: ['./crisis-workstations.component.scss', './crisis-integrated-workstations.scss'],
})
export class CrisisWorkstationsComponent {
  readonly runtime = inject(CrisisRuntimeService);
  readonly view = input<CrisisView>('room');
  readonly open = output<string>();
  readonly crewSlots = Array.from({ length: this.runtime.config.crews }, (_, index) => index + 1);
  readonly stations = computed(() =>
    (this.runtime.config.workstations ?? []).map((station) => {
      const reports = workstationReports(this.runtime.config, this.runtime.state(), station);
      return {
        ...station,
        surface: station.roomSurface ? this.surfaceLayout(station.roomSurface) : null,
        reports: reports.length,
        unread: reports.filter(
          (report) => !this.runtime.state().readEvidenceIds.includes(report.id),
        ).length,
      };
    }),
  );
  private surfaceLayout(surface: CrisisRoomSurface) {
    const [x, y, width, height] = surface.bounds;
    const screenX = Math.min(...surface.screen.map((point) => point[0]));
    const screenY = Math.min(...surface.screen.map((point) => point[1]));
    const screenWidth = Math.max(...surface.screen.map((point) => point[0])) - screenX;
    const screenHeight = Math.max(...surface.screen.map((point) => point[1])) - screenY;
    return {
      x,
      y,
      width,
      height,
      viewBox: surface.bounds.join(' '),
      aspect: (width * 1.7769) / height,
      screenX: ((screenX - x) / width) * 100,
      screenY: ((screenY - y) / height) * 100,
      screenWidth: (screenWidth / width) * 100,
      screenHeight: (screenHeight / height) * 100,
      clip: `polygon(${surface.screen
        .map(
          (point) =>
            `${((point[0] - screenX) / screenWidth) * 100}% ${((point[1] - screenY) / screenHeight) * 100}%`,
        )
        .join(',')})`,
    };
  }
  readonly trend = computed(() => {
    const values = [
      ...this.runtime.config.primaryMetric.initialTrend,
      ...this.runtime.config.bulletins
        .slice(0, this.runtime.state().stage + 1)
        .map((bulletin) => bulletin.metricValue),
    ];
    const min = Math.min(...values) * 0.9,
      span = Math.max(...values) - min || 1;
    return values
      .map(
        (value, index) =>
          `${(index * 160) / (values.length - 1)},${44 - ((value - min) / span) * 36}`,
      )
      .join(' ');
  });
}
