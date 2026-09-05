import { TestBed } from '@angular/core/testing';

import { classExhibitHallConfig } from '../../../projects/class-exhibit-hall/class-exhibit-hall.config';
import { MuseumBoardComponent } from './museum-board.component';

describe('MuseumBoardComponent', () => {
  it('renders the same snapshot with logical headings, objects, sources, and team credit', async () => {
    await TestBed.configureTestingModule({ imports: [MuseumBoardComponent] }).compileComponents();
    const fixture = TestBed.createComponent(MuseumBoardComponent);
    fixture.componentRef.setInput('data', classExhibitHallConfig.seedBoards[0]!.data);
    fixture.componentRef.setInput('mode', 'walkup');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('h2')?.textContent).toContain('Life Along the Nile');
    expect(element.querySelectorAll('.object-card h3')).toHaveLength(3);
    expect(element.querySelectorAll('footer li')).toHaveLength(2);
    expect(element.textContent).toContain('Nile Life Curators');
    expect(element.textContent).toContain('MetaSteps Wing 1');
    expect(element.textContent).toContain('Prototype video station');
    expect(element.querySelector('iframe')?.getAttribute('title')).toContain('MetaSteps Wing 1');
  });
});
