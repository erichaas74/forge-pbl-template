import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { describe, expect, it } from 'vitest';

import { loadSample } from '../../../runtime/project-showcase/debate.sample';
import { DebateExampleWalkthroughComponent } from './debate-example-walkthrough.component';

describe('DebateExampleWalkthroughComponent', () => {
  it('steps from arguments through the 65% builder and files the response into the thread', async () => {
    const sample = loadSample();
    await TestBed.configureTestingModule({
      imports: [DebateExampleWalkthroughComponent],
      providers: sample.providers,
    }).compileComponents();

    const fixture = TestBed.createComponent(DebateExampleWalkthroughComponent);
    fixture.componentRef.setInput('readOnly', true);
    fixture.detectChanges();
    if (fixture.componentInstance.playing()) fixture.componentInstance.togglePlayback();

    expect(fixture.debugElement.queryAll(By.css('.demo-speech'))).toHaveLength(0);
    fixture.componentInstance.next();
    fixture.componentInstance.next();
    fixture.componentInstance.next();
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('.demo-speech'))).toHaveLength(2);
    expect(fixture.debugElement.queryAll(By.css('.demo-moderator'))).toHaveLength(1);

    fixture.componentInstance.next();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.example-debate.builder-open'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('.example-builder'))).toBeTruthy();

    fixture.componentInstance.next();
    fixture.componentInstance.next();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.write-demo'))).toBeTruthy();
    expect((fixture.nativeElement as HTMLElement).textContent).toContain(
      'The moderator asks where emergency leadership should end.',
    );

    fixture.componentInstance.next();
    fixture.componentInstance.next();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.file-stamp'))).toBeTruthy();

    fixture.componentInstance.next();
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('.demo-speech'))).toHaveLength(3);
    expect(fixture.debugElement.query(By.css('.example-builder'))).toBeFalsy();
    expect((fixture.nativeElement as HTMLElement).textContent).toContain(
      'Response filed · builder closed',
    );

    fixture.destroy();
  });
});
