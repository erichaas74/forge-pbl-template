import { provideRouter } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ProjectHomeComponent } from './project-home.component';

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
    expect(inactive).toHaveLength(2);
    for (const card of inactive) {
      expect(card.attributes['href']).toBeUndefined();
      expect(card.query(By.css('img'))).not.toBeNull();
      expect(
        card.query(By.css('.project-content p')).nativeElement.textContent.length,
      ).toBeGreaterThan(100);
      expect(card.nativeElement.textContent).toContain('Not built yet');
      card.nativeElement.click();
      expect(card.attributes['href']).toBeUndefined();
    }

    const mystery = fixture.debugElement.query(By.css('[data-project-id="mystery-substance"]'));
    expect(mystery.query(By.css('h2')).nativeElement.textContent).toBe(
      'Investigation / Mystery Lab',
    );
    expect(mystery.query(By.css('.project-art')).nativeElement.textContent).toContain(
      'The Unlabeled Shelf',
    );
    expect(mystery.query(By.css('.project-content p')).nativeElement.textContent).toContain(
      'developing competing explanations',
    );

    const forgery = fixture.debugElement.query(By.css('[data-project-id="shadow-gallery"]'));
    expect(forgery.nativeElement.textContent).toContain(
      'Historical Forgery Hunt / Living Artwork Restoration',
    );
    expect(forgery.nativeElement.textContent).toContain('repair the forged artwork');
    expect(forgery.query(By.css('.project-art')).nativeElement.textContent).toContain(
      'The Cartographer’s Vault',
    );
    expect(forgery.query(By.css('a')).attributes['href']).toBe('/projects/shadow-gallery');
    expect(forgery.nativeElement.textContent).not.toContain('Not built yet');
    expect(fixture.debugElement.query(By.css('[data-project-id="historical-forgery"]'))).toBeNull();

    const monument = fixture.debugElement.query(By.css('[data-project-id="calendar-monument"]'));
    expect(monument.query(By.css('h2')).nativeElement.textContent).toBe(
      'Astronomy / Calendar & Monument Building',
    );
    expect(monument.nativeElement.textContent).toContain('Sun, Moon, and stars');
    expect(monument.nativeElement.textContent).toContain('history developed calendars');
    expect(monument.query(By.css('.project-art')).nativeElement.textContent).toContain(
      'From Sundial to Sun Monument',
    );
    expect(monument.query(By.css('a')).attributes['href']).toBe('/projects/calendar-monument');
    expect(monument.nativeElement.textContent).not.toContain('Not built yet');

    const engineering = fixture.debugElement.query(
      By.css('[data-project-id="engineering-design"]'),
    );
    expect(engineering.nativeElement.textContent).toContain('designing and building a race car');
    expect(engineering.query(By.css('a')).attributes['href']).toBeUndefined();
    expect(engineering.query(By.css('img')).attributes['src']).toBe(
      '/project-types/race-car-design-v1.png',
    );
  });
});
