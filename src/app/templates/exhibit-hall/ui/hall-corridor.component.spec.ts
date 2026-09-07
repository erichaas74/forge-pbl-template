import { TestBed } from '@angular/core/testing';

import { classExhibitHallConfig } from '../../../projects/class-exhibit-hall/class-exhibit-hall.config';
import { GalleryCollectionService } from '../core/gallery-collection-service';
import type { ExhibitActor } from '../domain/exhibit-types';
import { MuseumBoardRenderer } from '../renderers/museum-board/museum-board-renderer';
import { createInitialHallState } from '../runtime/exhibit-hall-runtime.service';
import { HallCorridorComponent } from './hall-corridor.component';

describe('HallCorridorComponent', () => {
  it('offers four rotatable model previews and opens every exhibit', async () => {
    await TestBed.configureTestingModule({ imports: [HallCorridorComponent] }).compileComponents();
    const fixture = TestBed.createComponent(HallCorridorComponent);
    const actor: ExhibitActor = {
      id: classExhibitHallConfig.viewer.studentId,
      role: 'student',
      courseSectionIds: [classExhibitHallConfig.courseSectionId],
      teamIds: [classExhibitHallConfig.viewer.teamId],
    };
    const state = createInitialHallState(classExhibitHallConfig, new MuseumBoardRenderer());
    const locations = new GalleryCollectionService().build(
      state,
      classExhibitHallConfig.teams,
      actor,
    );
    const opened: string[] = [];

    fixture.componentRef.setInput('locations', locations);
    fixture.componentInstance.opened.subscribe((hangingId) => opened.push(hangingId));
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelectorAll('.model-frame app-object-model-viewer')).toHaveLength(4);
    expect(element.querySelectorAll('.preview-frame img')).toHaveLength(0);
    expect(element.querySelectorAll('.coming-soon-action')).toHaveLength(0);
    expect(element.querySelectorAll('.location-actions button')).toHaveLength(4);
    element
      .querySelectorAll<HTMLButtonElement>('.location-actions button')
      .forEach((button) => button.click());
    expect(opened).toEqual([
      'hanging-team-atlas',
      'hanging-team-marigold',
      'hanging-team-northstar',
      'hanging-team-ember',
    ]);
  });
});
