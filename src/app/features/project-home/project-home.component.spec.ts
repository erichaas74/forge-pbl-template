import { provideRouter } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ProjectHomeComponent } from './project-home.component';

describe('ProjectHomeComponent', () => {
  it('renders links to every configured project', async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectHomeComponent],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(ProjectHomeComponent);
    fixture.detectChanges();

    const links = fixture.debugElement.queryAll(By.css('.project-card a'));
    expect(links.map((link) => link.attributes['href'])).toEqual([
      '/projects/robot-delivery-code-lab',
      '/projects/mystery-substance',
      '/projects/frontier-trading-company',
      '/projects/objects-that-changed-us',
      '/projects/history-live-revolutionary-war',
      '/projects/the-fate-of-the-republic',
      '/projects/race-around-the-world',
      '/projects/survival-island-story-lab',
      '/projects/calendar-monument',
    ]);
  });
});
