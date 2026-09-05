import { Component, inject, signal } from '@angular/core';

import { formatBroadcastTime } from '../core/history-live-state';
import { HistoryLiveRuntimeService } from '../runtime/history-live-runtime.service';

@Component({
  selector: 'app-history-live-producer-console',
  templateUrl: './producer-console.component.html',
  styleUrl: './producer-console.component.scss',
})
export class ProducerConsoleComponent {
  readonly runtime = inject(HistoryLiveRuntimeService);

  readonly feedback = signal('');
  totalRuntime(): string {
    return formatBroadcastTime(
      this.runtime.state().schedule.reduce((sum, segment) => sum + segment.durationSeconds, 0),
    );
  }

  sideCount(side: 'patriot' | 'british'): number {
    return this.runtime.state().schedule.filter((segment) => segment.side === side).length;
  }
}
