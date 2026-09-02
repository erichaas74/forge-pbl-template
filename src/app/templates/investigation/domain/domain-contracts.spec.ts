import type { ProjectManifest } from './project-manifest';
import type { RuntimeStateSnapshot } from './runtime-state';

describe('Investigation domain contracts', () => {
  it('keeps schema, template, and project versions independently addressable', () => {
    const manifest: ProjectManifest = {
      id: 'project-example',
      schemaVersion: '1.0.0',
      template: { id: 'investigation', version: '2.0.0' },
      projectType: 'investigation',
      gradeLevels: [7],
      subjects: { primary: 'science' },
      status: 'draft',
      investigationConfigRef: 'investigation.json',
      capabilities: ['investigation.evidence'],
    };

    expect(manifest.schemaVersion).toBe('1.0.0');
    expect(manifest.template.version).toBe('2.0.0');
  });

  it('models mutable learner state separately from project configuration', () => {
    const runtime: RuntimeStateSnapshot = {
      version: 1,
      tenantId: 'tenant-school-example',
      projectId: 'project-example',
      projectVersion: '1.0.0',
      lastUpdated: '2026-09-02T00:00:00.000Z',
      scope: {
        tenantId: 'tenant-school-example',
        projectId: 'project-example',
        projectVersion: '1.0.0',
        studentId: 'student-1',
        scopeType: 'student',
      },
      stateValues: { 'case.evidenceCollected': 0 },
      firedRuleIds: [],
      evidence: {},
      studentEvidence: {},
      evidenceRelationships: [],
      activities: {},
      hypotheses: [],
      resources: {},
      board: { itemLocations: {} },
      phases: {},
      lessons: {},
      requirements: {
        hypothesisRequired: false,
        revisionRequired: false,
      },
      finalSubmission: {
        status: 'closed',
        availabilityStatus: 'closed',
        submissionStatus: 'notSubmitted',
        approvalStatus: 'notRequired',
        gradeStatus: 'ungraded',
        argumentDraft: { evidenceIds: [] },
        artifactIds: [],
      },
      solutionRevealed: false,
      messages: [],
      teacherNotifications: [],
      teacherReleases: {},
      teamTasks: {},
    };

    runtime.stateValues['case.evidenceCollected'] = 1;

    expect(runtime.version).toBe(1);
    expect(runtime.stateValues['case.evidenceCollected']).toBe(1);
  });
});
