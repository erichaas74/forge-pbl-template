import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { describe, expect, it, vi } from 'vitest';
import { hammurabiOnTrialConfig } from '../../../projects/hammurabi-on-trial/hammurabi-on-trial.config';
import { PROJECT_LESSON_FOCUS } from '../../../shared/project-lessons/project-lesson-focus';
import type { ProjectLesson } from '../../../shared/project-lessons/project-lesson.models';
import type { DebateWorkspaceState } from '../domain/debate-studio.models';
import {
  DEBATE_STUDIO_MEDIA,
  DEBATE_STUDIO_PERSISTENCE,
  DEBATE_STUDIO_SESSION,
  MemoryDebateMediaAdapter,
  MemoryDebateSessionAdapter,
} from '../persistence/debate-studio.persistence';
import { DebateStudioRuntimeService } from '../runtime/debate-studio-runtime.service';
import { DEBATE_STUDIO_CONFIG } from '../runtime/debate-studio.tokens';
import { DebateInquiryComponent } from './debate-inquiry.component';
import { DebateStudioPageComponent } from './debate-studio-page.component';

const lesson = (number: number): ProjectLesson => ({
  number,
  title: 'Lesson',
  output: 'Work',
  workspace: 'Workspace',
  checkpoint: 'Check',
  criteria: ['Evidence'],
  focusTarget: 'inquiry',
});

async function setup() {
  let saved: DebateWorkspaceState | undefined;
  const focus = signal<ProjectLesson | undefined>(lesson(1));
  await TestBed.configureTestingModule({
    imports: [DebateInquiryComponent, DebateStudioPageComponent],
    providers: [
      provideRouter([]),
      { provide: DEBATE_STUDIO_CONFIG, useValue: hammurabiOnTrialConfig },
      { provide: DEBATE_STUDIO_SESSION, useClass: MemoryDebateSessionAdapter },
      { provide: DEBATE_STUDIO_MEDIA, useClass: MemoryDebateMediaAdapter },
      {
        provide: DEBATE_STUDIO_PERSISTENCE,
        useValue: {
          load: () => saved,
          save: (_p: string, _v: string, _s: string, _a: string, value: DebateWorkspaceState) => {
            saved = structuredClone(value);
          },
          clear: () => {
            saved = undefined;
          },
        },
      },
      { provide: PROJECT_LESSON_FOCUS, useValue: focus },
      DebateStudioRuntimeService,
    ],
  }).compileComponents();
  const fixture = TestBed.createComponent(DebateInquiryComponent);
  fixture.detectChanges();
  await fixture.whenStable();
  return {
    fixture,
    focus,
    runtime: TestBed.inject(DebateStudioRuntimeService),
    saved: () => saved,
  };
}

describe('DebateInquiryComponent', () => {
  it('starts with the Babylonian learning task instead of Roman factions', async () => {
    const { fixture } = await setup();
    expect(fixture.nativeElement.textContent).toContain('Meet Babylon');
    expect(fixture.nativeElement.textContent).toContain('Hammurabi on Trial');
    expect(fixture.nativeElement.textContent).not.toMatch(/SPQR|Consul|Senator/);
    expect(fixture.nativeElement.querySelectorAll('app-debate-faction-rail')).toHaveLength(0);
  });
  it('saves individual drafts and retains them across lesson and debate-turn changes', async () => {
    const { fixture, focus, runtime, saved } = await setup();
    runtime.updateInquiryDraft('lesson-1-context', 'My original thinking.');
    runtime.saveInquiryDrafts();
    focus.set(lesson(2));
    fixture.detectChanges();
    await fixture.whenStable();
    expect(fixture.componentInstance.lessonNumber()).toBe(2);
    runtime.clearLocalDraft();
    expect(runtime.inquiryState().drafts['lesson-1-context']).toBe('My original thinking.');
    expect(saved()?.inquiry?.drafts['lesson-1-context']).toBe('My original thinking.');
  });
  it('blocks dependent responses but leaves the sources and practice help readable', async () => {
    const { fixture, focus, runtime } = await setup();
    focus.set(lesson(4));
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.componentInstance.blocked()).toBe(true);
    expect(fixture.nativeElement.querySelector('#claim').disabled).toBe(true);
    expect(fixture.nativeElement.querySelector('#source-select').disabled).toBe(false);
    expect(runtime.submitInquiryAttempt(4, 'Check', 'My answer')).toBe(false);
    expect(runtime.canFile()).toBe(false);
  });
  it('requires a separate demo reviewer decision and keeps failed attempts for a fresh check', async () => {
    const { fixture, runtime } = await setup();
    runtime.submitInquiryAttempt(2, 'Authority and hierarchy?', 'Source-based explanation.');
    const first = runtime.inquiryState().attempts[0]!;
    runtime.reviewInquiryAttempt(first.id, 'ready', 'Verified.');
    expect(runtime.inquiryGate('h-a')).toBe(false);
    runtime.toggleTeacherPreview();
    runtime.reviewInquiryAttempt(first.id, 'revise', 'Explain hierarchy.');
    expect(runtime.inquiryGate('h-a')).toBe(false);
    runtime.submitInquiryAttempt(2, 'Fresh case', 'Revised independent reasoning.');
    const second = runtime.inquiryState().attempts[1]!;
    runtime.reviewInquiryAttempt(
      second.id,
      'ready',
      'Authority and hierarchy supported by sources.',
    );
    expect(runtime.inquiryGate('h-a')).toBe(true);
    expect(runtime.inquiryState().attempts).toHaveLength(2);
    expect(runtime.inquiryState().reviews[first.id]?.decision).toBe('revise');
    expect(runtime.inquiryState().reviewHistory).toHaveLength(2);
    fixture.detectChanges();
  });
  it('keeps the response in memory and reports an unsuccessful draft save', async () => {
    const { fixture, runtime } = await setup();
    vi.spyOn(TestBed.inject(DEBATE_STUDIO_PERSISTENCE), 'save').mockImplementation(() => {
      throw new Error('Storage full');
    });
    runtime.updateInquiryDraft('lesson-1-context', 'Keep this response.');
    runtime.saveInquiryDrafts();
    fixture.detectChanges();
    fixture.componentInstance.saveWork();
    fixture.detectChanges();
    expect(runtime.inquiryState().drafts['lesson-1-context']).toBe('Keep this response.');
    expect(fixture.nativeElement.textContent).toContain('Not saved');
    expect(fixture.nativeElement.textContent).toContain('could not be saved');
  });
  it('closes hints during an independent check and persists its response separately', async () => {
    const { fixture, runtime } = await setup();
    fixture.componentInstance.startCheck();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.practice-help')).toBeNull();
    runtime.updateInquiryDraft('check-1', 'My independent explanation.');
    fixture.componentInstance.submit();
    fixture.detectChanges();
    expect(runtime.inquiryState().attempts[0]?.mode).toBe('independent');
    expect(runtime.inquiryState().attempts[0]?.response).toBe('My independent explanation.');
    expect(runtime.inquiryGate('h-a')).toBe(false);
  });
});
