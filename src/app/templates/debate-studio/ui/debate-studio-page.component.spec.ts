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
  it('keeps both faction records visible and opens an incoming argument in the chamber', async () => {
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
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('The Senate Docket');

    fixture.debugElement.query(By.css('.hear-now')).nativeElement.click();
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).textContent).toContain(
      'Listen closely, then mark the exact words your faction must address.',
    );
    expect(fixture.debugElement.queryAll(By.css('app-debate-faction-rail'))).toHaveLength(2);
    expect(fixture.debugElement.query(By.css('app-debate-workbench'))).toBeTruthy();
  });
});
