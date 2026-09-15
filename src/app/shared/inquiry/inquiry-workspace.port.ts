import { InjectionToken } from '@angular/core';
import type { InquiryConfig, InquiryState } from './inquiry.models';

/** UI contract: templates supply persistence and authority; this view owns neither. */
export interface InquiryWorkspacePort {
  readonly config: {
    title: string;
    projectId: string;
    historicalSetting: string;
    centralQuestion: string;
    inquiry?: InquiryConfig;
    viewer: { studentDisplayName: string; allowTeacherPreview?: boolean };
    evidence: readonly {
      id: string;
      title: string;
      dateLabel: string;
      sourceType: string;
      excerpt: string;
      context: string;
      citation: string;
      perspective: string;
      sourceUrl?: string;
      imageUrl?: string;
      imageAlt?: string;
    }[];
  };
  inquiryState(): InquiryState;
  saveState(): 'saved' | 'saving' | 'local';
  inquiryGate(id: string): boolean;
  updateInquiryDraft(key: string, value: string): void;
  saveInquiryDrafts(): void;
  submitInquiryAttempt(
    lesson: number,
    prompt: string,
    response: string,
    targetId?: string,
  ): boolean;
  reviewInquiryAttempt(
    id: string,
    decision: 'ready' | 'revise',
    feedback: string,
    performanceEvidence?: string,
  ): void;
  teacherPreview(): boolean;
  canManageModerator(): boolean;
  toggleTeacherPreview(): void;
}
export const INQUIRY_WORKSPACE = new InjectionToken<InquiryWorkspacePort>('INQUIRY_WORKSPACE');
