import { TestBed } from '@angular/core/testing';

import { classExhibitHallConfig } from '../../../projects/class-exhibit-hall/class-exhibit-hall.config';
import { GalleryCollectionService } from '../core/gallery-collection-service';
import type { ExhibitActor } from '../domain/exhibit-types';
import { MuseumBoardRenderer } from '../renderers/museum-board/museum-board-renderer';
import { createInitialHallState } from '../runtime/exhibit-hall-runtime.service';
import { HallCorridorComponent } from './hall-corridor.component';

describe('HallCorridorComponent', () => {
  it('shows four dimensional previews but makes only the first exhibit walk-up available', async () => {
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
    expect(element.querySelectorAll('.preview-frame img')).toHaveLength(4);
    expect(element.querySelectorAll('button.preview-frame.available')).toHaveLength(1);
    expect(element.querySelectorAll('.preview-frame.unavailable')).toHaveLength(3);
    expect(element.querySelectorAll('.coming-soon-action')).toHaveLength(3);

    (element.querySelector('button.preview-frame.available') as HTMLButtonElement).click();
    expect(opened).toEqual(['hanging-team-atlas']);
  });
});
