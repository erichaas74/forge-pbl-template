import { provideRouter } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ProjectHomeComponent } from './project-home.component';

describe('ProjectHomeComponent', () => {
  it('renders links to both configured projects', async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectHomeComponent],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(ProjectHomeComponent);
    fixture.detectChanges();

    const links = fixture.debugElement.queryAll(By.css('.project-card a'));
    expect(links.map((link) => link.attributes['href'])).toEqual([
      '/mystery-substance',
      '/frontier-trading',
    ]);
  });
});
