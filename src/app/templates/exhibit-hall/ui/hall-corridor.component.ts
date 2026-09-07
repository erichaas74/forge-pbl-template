import { Component, input, output } from '@angular/core';

import type { HallLocationView } from '../domain/exhibit-types';
import { ExhibitRenderHostComponent } from './exhibit-render-host.component';
import { ObjectModelViewerComponent } from '../../../shared/media/object-model-viewer.component';
import { isMuseumBoardSnapshotData } from '../renderers/museum-board/museum-board-renderer';

@Component({
  selector: 'app-hall-corridor',
  imports: [ExhibitRenderHostComponent, ObjectModelViewerComponent],
  templateUrl: './hall-corridor.component.html',
  styleUrl: './hall-corridor.component.scss',
})
export class HallCorridorComponent {
  modelPreview(data: unknown) {
    return isMuseumBoardSnapshotData(data) ? data.objects[0]?.model : undefined;
  }
  readonly locations = input.required<readonly HallLocationView[]>();
  readonly focusedHangingId = input<string | undefined>(undefined);
  readonly emptyLabel = input('Empty location');
  readonly teacherMode = input(false);
  readonly opened = output<string>();
  readonly pointed = output<string>();
}
