import { Component, inject } from '@angular/core';

import { NarrativeStudioRuntimeService } from '../runtime/narrative-studio-runtime.service';

@Component({
  selector: 'app-narrative-history-launch',
  templateUrl: './narrative-history-launch.component.html',
  styleUrl: './narrative-history-launch.component.scss',
})
export class NarrativeHistoryLaunchComponent {
  readonly runtime = inject(NarrativeStudioRuntimeService);
}
