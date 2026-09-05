import { Component, input, output } from '@angular/core';

import type { HallLocationView } from '../domain/exhibit-types';
import { ExhibitRenderHostComponent } from './exhibit-render-host.component';

@Component({
  selector: 'app-hall-corridor',
  imports: [ExhibitRenderHostComponent],
  templateUrl: './hall-corridor.component.html',
  styleUrl: './hall-corridor.component.scss',
})
export class HallCorridorComponent {
  readonly locations = input.required<readonly HallLocationView[]>();
  readonly focusedHangingId = input<string | undefined>(undefined);
  readonly emptyLabel = input('Empty location');
  readonly teacherMode = input(false);
  readonly opened = output<string>();
  readonly pointed = output<string>();
}
