import { provideRouter } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ProjectHomeComponent } from './project-home.component';
import { projectCatalog } from '../../projects/project-catalog';

describe('ProjectHomeComponent', () => {
  it('renders demo links and leaves unbuilt project types inactive', async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectHomeComponent],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(ProjectHomeComponent);
    fixture.detectChanges();

    const links = fixture.debugElement.queryAll(By.css('.project-card a[href]'));
    expect(links.map((link) => link.attributes['href'])).toEqual([
      '/projects/expedition-news-network',
      '/projects/hammurabi-on-trial',
      '/projects/exploration-time-repair',
      '/projects/community-story-network',
      '/projects/shadow-gallery',
      '/projects/castle-archive-rescue',
      '/projects/championship-show',
      '/projects/live-strategy-league',
      '/projects/cascade-bay-crisis',
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

    const inactive = fixture.debugElement.queryAll(By.css('.project-card a[aria-disabled="true"]'));
    for (const project of projectCatalog) {
      const card = fixture.debugElement.query(By.css(`[data-project-id="${project.id}"]`));
      expect(card.query(By.css('.project-grade')).nativeElement.textContent.trim()).toBe(project.grade);
    }
    expect(inactive).toHaveLength(2);
    for (const card of inactive) {
      expect(card.attributes['href']).toBeUndefined();
      expect(card.query(By.css('img'))).not.toBeNull();
      expect(
        card.query(By.css('.project-content p')).nativeElement.textContent.length,
      ).toBeGreaterThan(100);
      expect(card.nativeElement.textContent).toContain('Not built yet');
      expect(card.query(By.css('.project-grade'))).toBeNull();
      card.nativeElement.click();
      expect(card.attributes['href']).toBeUndefined();
    }

    const mystery = fixture.debugElement.query(By.css('[data-project-id="mystery-substance"]'));
    expect(mystery.query(By.css('h2')).nativeElement.textContent).toBe(
      'Investigation / Mystery Lab',
    );
    expect(mystery.query(By.css('.project-art')).nativeElement.textContent).toContain(
      'Mystery Substances: Properties & Reactions',
    );
    expect(mystery.query(By.css('.project-content p:not(.project-grade)')).nativeElement.textContent).toContain(
      'compare properties, test reactions, and challenge their theories',
    );

    const forgery = fixture.debugElement.query(By.css('[data-project-id="shadow-gallery"]'));
    expect(forgery.nativeElement.textContent).toContain(
      'Historical Forgery Hunt / Living Artwork Restoration',
    );
    expect(forgery.nativeElement.textContent).toContain('restore the historical scene');
    expect(forgery.query(By.css('.project-art')).nativeElement.textContent).toContain(
      'Age of Exploration: The Art Forgery Hunt',
    );
    expect(forgery.query(By.css('a')).attributes['href']).toBe('/projects/shadow-gallery');
    expect(forgery.nativeElement.textContent).not.toContain('Not built yet');
    expect(fixture.debugElement.query(By.css('[data-project-id="historical-forgery"]'))).toBeNull();

    const monument = fixture.debugElement.query(By.css('[data-project-id="calendar-monument"]'));
    expect(monument.query(By.css('h2')).nativeElement.textContent).toBe(
      'Astronomy / Calendar & Monument Building',
    );
    expect(monument.nativeElement.textContent).toContain('track shadows, test seasonal alignments');
    expect(monument.nativeElement.textContent).toContain('Earth’s tilt shapes the year');
    expect(monument.query(By.css('.project-art')).nativeElement.textContent).toContain(
      'Sun Monuments: Shadows, Seasons & Earth’s Tilt',
    );
    expect(monument.query(By.css('a')).attributes['href']).toBe('/projects/calendar-monument');
    expect(monument.nativeElement.textContent).not.toContain('Not built yet');

    const engineering = fixture.debugElement.query(
      By.css('[data-project-id="engineering-design"]'),
    );
    expect(engineering.nativeElement.textContent).toContain('measurement and data into a race car design');
    expect(engineering.query(By.css('a')).attributes['href']).toBeUndefined();
    expect(engineering.query(By.css('img')).attributes['src']).toBe(
      '/project-types/race-car-design-v1.png',
    );
  });
});
