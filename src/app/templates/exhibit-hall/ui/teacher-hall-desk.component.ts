import { Component, input, output } from '@angular/core';

import type {
  ExhibitHallState,
  ExhibitTeam,
  HallLocationView,
  HallPhase,
} from '../domain/exhibit-types';

@Component({
  selector: 'app-teacher-hall-desk',
  templateUrl: './teacher-hall-desk.component.html',
  styleUrl: './teacher-hall-desk.component.scss',
})
export class TeacherHallDeskComponent {
  readonly state = input.required<ExhibitHallState>();
  readonly locations = input.required<readonly HallLocationView[]>();
  readonly unpublishedTeams = input.required<readonly ExhibitTeam[]>();
  readonly collapsed = input(false);
  readonly collapsedChanged = output<boolean>();
  readonly phaseChanged = output<HallPhase>();
  readonly navigationChanged = output<'independent' | 'teacher_follow'>();
  readonly controlToggled = output<
    'submissionLocked' | 'peerResponsesEnabled' | 'familyViewEnabled'
  >();
  readonly pointed = output<string>();
  readonly docentsSelected = output<string>();
  readonly resetRequested = output<void>();

  readSelect(event: Event): string {
    return (event.target as HTMLSelectElement).value;
  }
}
