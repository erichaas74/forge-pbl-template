import { TestBed } from '@angular/core/testing';

import { classExhibitHallConfig } from '../../../projects/class-exhibit-hall/class-exhibit-hall.config';
import { validateMuseumBoard } from '../renderers/museum-board/museum-board-adapter';
import { MuseumBoardRenderer } from '../renderers/museum-board/museum-board-renderer';
import { museumBoardTemplate } from '../renderers/museum-board/museum-board-template';
import { EXHIBIT_RENDERER_COMPONENTS } from '../runtime/exhibit-hall.tokens';
import { MuseumBoardComponent } from './museum-board.component';
import { ArtifactComposerComponent } from './artifact-composer.component';

describe('ArtifactComposerComponent', () => {
  it('keeps a live station-only field view and opens full-screen review on demand', async () => {
    await TestBed.configureTestingModule({
      imports: [ArtifactComposerComponent],
      providers: [
        {
          provide: EXHIBIT_RENDERER_COMPONENTS,
          useValue: [{ rendererType: 'museum-board-v1', component: MuseumBoardComponent }],
        },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(ArtifactComposerComponent);
    const draft = classExhibitHallConfig.seedBoards[0]!.data;
    const renderer = new MuseumBoardRenderer();
    const validation = validateMuseumBoard(museumBoardTemplate, draft);

    fixture.componentRef.setInput('draft', draft);
    fixture.componentRef.setInput('validation', validation);
    fixture.componentRef.setInput('previewSnapshot', {
      id: 'preview',
      artifactId: 'artifact-team-atlas',
      version: 2,
      rendererType: renderer.type,
      rendererVersion: renderer.version,
      visitorSafeData: draft,
      accessibleData: renderer.renderAccessible(draft),
      createdBy: 'student-avery',
      createdAt: '',
    });
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelectorAll('.studio-map li button')).toHaveLength(6);
    expect(element.querySelector('.story-sheet')).not.toBeNull();
    expect(element.querySelector('.artifact-sheet')).toBeNull();
    expect(element.querySelector('.live-story')?.textContent).toContain('Life Along the Nile');
    expect(element.querySelector('.live-labels')).toBeNull();

    fixture.componentRef.setInput('draft', { ...draft, title: 'The Nile at Work' });
    fixture.detectChanges();
    expect(element.querySelector('.live-story')?.textContent).toContain('The Nile at Work');

    (element.querySelector('.step-controls .next') as HTMLButtonElement).click();
    fixture.detectChanges();

    expect(fixture.componentInstance.activeStep()).toBe(1);
    expect(element.querySelectorAll('.object-editors article')).toHaveLength(3);
    expect(element.querySelectorAll('.live-labels article')).toHaveLength(3);
    expect(element.querySelector('.live-story')).toBeNull();

    fixture.componentInstance.goToStep(5);
    fixture.detectChanges();

    expect(element.querySelector('.review-experience')).not.toBeNull();
    expect(element.querySelector('.full-preview')).not.toBeNull();
    expect(element.querySelectorAll('.review-inspector > ol > li')).toHaveLength(5);
    expect(element.querySelector('.back-review')).not.toBeNull();

    (element.querySelector('.back-review') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(fixture.componentInstance.activeStep()).toBe(1);
  });
});
