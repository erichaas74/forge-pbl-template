import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { romanSenateDebateConfig } from '../../../projects/roman-senate-debate/roman-senate-debate.config';
import type { DebateWorkspaceState } from '../domain/debate-studio.models';
import {
  DEBATE_STUDIO_MEDIA,
  DEBATE_STUDIO_PERSISTENCE,
  DEBATE_STUDIO_SESSION,
  MemoryDebateMediaAdapter,
  MemoryDebateSessionAdapter,
  type DebateWorkspacePersistenceAdapter,
} from '../persistence/debate-studio.persistence';
import { DebateStudioRuntimeService } from '../runtime/debate-studio-runtime.service';
import { DEBATE_STUDIO_CONFIG } from '../runtime/debate-studio.tokens';
import { DebateStudioPageComponent } from './debate-studio-page.component';

class TestDebateWorkspacePersistence implements DebateWorkspacePersistenceAdapter {
  load(
    _projectId: string,
    _projectVersion: string,
    _sessionId: string,
    _studentId: string,
  ): DebateWorkspaceState | undefined {
    return undefined;
  }

  save(
    _projectId: string,
    _projectVersion: string,
    _sessionId: string,
    _studentId: string,
    _state: DebateWorkspaceState,
  ): void {}

  clear(
    _projectId: string,
    _projectVersion: string,
    _sessionId: string,
    _studentId: string,
  ): void {}
}

describe('DebateStudioPageComponent', () => {
  it('keeps both argument archives visible around the persistent debate thread and composer', async () => {
    await TestBed.configureTestingModule({
      imports: [DebateStudioPageComponent],
      providers: [
        provideRouter([]),
        { provide: DEBATE_STUDIO_CONFIG, useValue: romanSenateDebateConfig },
        { provide: DEBATE_STUDIO_SESSION, useClass: MemoryDebateSessionAdapter },
        { provide: DEBATE_STUDIO_MEDIA, useClass: MemoryDebateMediaAdapter },
        { provide: DEBATE_STUDIO_PERSISTENCE, useClass: TestDebateWorkspacePersistence },
        DebateStudioRuntimeService,
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(DebateStudioPageComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('app-debate-faction-rail'))).toHaveLength(2);
    expect(fixture.debugElement.queryAll(By.css('.room-object'))).toHaveLength(0);
    expect(fixture.debugElement.queryAll(By.css('.message-slip')).length).toBeGreaterThan(0);
    expect(fixture.debugElement.query(By.css('.incoming-seal'))).toBeTruthy();
    expect((fixture.nativeElement as HTMLElement).textContent).toContain(
      'Was Julius Caesar a leader Rome needed, or a threat to the Roman Republic?',
    );
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Shared Senate live');
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Docket');
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Arguing:');

    fixture.componentInstance.runtime.castPreOpinion('unsure');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('app-debate-faction-rail'))).toHaveLength(2);
    expect(fixture.debugElement.query(By.css('app-debate-thread'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('app-debate-composer-dock'))).toBeTruthy();
    expect(fixture.debugElement.queryAll(By.css('.speech-bubble')).length).toBeGreaterThan(0);
    expect(fixture.debugElement.queryAll(By.css('.moderator-break')).length).toBeGreaterThan(0);
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Build the next argument');
    expect(fixture.debugElement.query(By.css('.detail-actions'))).toBeFalsy();
    expect(fixture.debugElement.query(By.css('.composer-tabs'))).toBeFalsy();

    fixture.debugElement.query(By.css('.message-summary')).nativeElement.click();
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.detail-actions'))).toBeTruthy();
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Evidence presented');

    fixture.debugElement.query(By.css('.review-thread')).nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.debugElement.query(By.css('.speech-bubble.expanded'))).toBeTruthy();

    fixture.debugElement.query(By.css('.builder-toggle')).nativeElement.click();
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('app-debate-composer-dock.composer-expanded')),
    ).toBeTruthy();
    expect(fixture.debugElement.query(By.css('.composer-tabs'))).toBeTruthy();
  });
});
