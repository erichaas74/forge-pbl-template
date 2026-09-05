import type { Observable } from 'rxjs';

import type {
  JourneyAuthoritySession,
  JourneyClassSummary,
  JourneyEnrollment,
  JourneyMasteryAssessment,
  JourneySubmission,
  StudentJourneyRecord,
} from '../domain/journey-replay.models';

export interface JourneyAuthorityLocator {
  readonly tenantId: string;
  readonly classId: string;
  readonly classLabel: string;
  readonly projectId: string;
  readonly projectVersion: string;
}

export interface AuthoritativeJourneyRecord {
  readonly record: StudentJourneyRecord;
  readonly serverRevision: number;
  readonly updatedAt: string;
}

export interface JourneyRecordSaveRequest {
  readonly locator: JourneyAuthorityLocator;
  readonly record: StudentJourneyRecord;
  readonly expectedServerRevision: number;
  readonly idempotencyKey: string;
  readonly totalStepCount: number;
}

export interface JourneySubmissionRequest {
  readonly locator: JourneyAuthorityLocator;
  readonly record: StudentJourneyRecord;
  readonly idempotencyKey: string;
  readonly totalStepCount: number;
}

export interface JourneySubmissionReviewRequest {
  readonly locator: JourneyAuthorityLocator;
  readonly submissionId: string;
  readonly decision: 'approved' | 'revision-requested';
  readonly teacherFeedback: string;
  readonly mastery: readonly JourneyMasteryAssessment[];
  readonly idempotencyKey: string;
}

export interface JourneyReplayAuthorityAdapter {
  openSession(locator: JourneyAuthorityLocator, enrollmentHint: JourneyEnrollment): Promise<JourneyAuthoritySession>;
  loadRecord(locator: JourneyAuthorityLocator): Promise<AuthoritativeJourneyRecord | undefined>;
  saveRecord(request: JourneyRecordSaveRequest): Promise<AuthoritativeJourneyRecord>;
  loadSubmission(locator: JourneyAuthorityLocator): Promise<JourneySubmission | undefined>;
  submitJourney(request: JourneySubmissionRequest): Promise<JourneySubmission>;
  reviewSubmission(request: JourneySubmissionReviewRequest): Promise<JourneySubmission>;
  classSummary(locator: JourneyAuthorityLocator): Observable<JourneyClassSummary>;
}

export function journeyAuthorityLocator(
  enrollment: JourneyEnrollment,
  projectId: string,
  projectVersion: string,
): JourneyAuthorityLocator {
  return {
    tenantId: enrollment.tenantId,
    classId: enrollment.classId,
    classLabel: enrollment.classLabel,
    projectId,
    projectVersion,
  };
}
