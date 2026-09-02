import { Component, input, output } from '@angular/core';

import type { InvestigationActivityView } from './investigation-ui.models';

@Component({
  selector: 'app-investigation-options-panel',
  templateUrl: './investigate-panel.component.html',
  styleUrl: './investigate-panel.component.scss',
})
export class InvestigationOptionsPanelComponent {
  readonly activities = input.required<readonly InvestigationActivityView[]>();
  readonly currentQuestion = input<string>('');
  readonly activityLaunched = output<string>();

  studentStatus(activity: InvestigationActivityView): string {
    if (activity.locked) {
      return 'Locked';
    }
    switch (activity.runtime?.status) {
      case 'complete':
        return 'Evidence collected';
      case 'inProgress':
      case 'submitted':
        return 'In progress';
      default:
        return 'Available';
    }
  }
}
