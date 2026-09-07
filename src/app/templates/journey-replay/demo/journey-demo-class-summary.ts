import type {
  JourneyClassSummary,
  JourneyMasteryAssessment,
  JourneyProjectConfig,
  JourneySubmissionStatus,
} from '../domain/journey-replay.models';

const DEMO_GENERATED_AT = '2026-09-05T19:30:00.000Z';

interface DemoMemberState {
  readonly displayName: string;
  readonly status: JourneySubmissionStatus;
  readonly revision: number;
  readonly responsePreview: string;
  readonly feedback?: string;
}

const MEMBER_STATES: readonly DemoMemberState[] = [
  {
    displayName: 'Compass crew',
    status: 'approved',
    revision: 2,
    responsePreview:
      'We kept the southern route because repair supplies made the longer passage defensible.',
    feedback: 'Strong comparison of risk, evidence, and resources.',
  },
  {
    displayName: 'Horizon crew',
    status: 'approved',
    revision: 1,
    responsePreview:
      'Turning west changed our mission, but the wind record made that safer than forcing the Cape.',
    feedback: 'Clear cause-and-consequence reasoning.',
  },
  {
    displayName: 'Voyager crew',
    status: 'submitted',
    revision: 1,
    responsePreview:
      'The open-water route saved time, but our final account had to include who carried the risk.',
  },
  {
    displayName: 'Star crew',
    status: 'submitted',
    revision: 2,
    responsePreview:
      'Losing the mast did not end the voyage; it changed what we counted as a successful expedition.',
  },
  {
    displayName: 'Atlas crew',
    status: 'revision-requested',
    revision: 2,
    responsePreview:
      'We mapped the northern crossing, and now we are revising the claim with stronger evidence about uncertainty.',
    feedback: 'Name the source detail that supports the weather claim.',
  },
];

/**
 * Creates a deterministic, obviously simulated class projection for preview mode.
 * It never enters persistence and is never used when an authoritative class summary exists.
 */
export function createDemoJourneyClassSummary(
  config: JourneyProjectConfig,
  classLabel = 'Ms. Rivera · Period 3',
): JourneyClassSummary {
  const masteryTags = [...new Set(config.steps.flatMap((step) => step.masteryTags))];
  return {
    classId: 'simulated-class-showcase',
    classLabel,
    projectId: config.projectId,
    projectVersion: config.projectVersion,
    generatedAt: DEMO_GENERATED_AT,
    revision: 12,
    members: config.classVoyages.map((voyage, index) => {
      const state = MEMBER_STATES[index % MEMBER_STATES.length]!;
      const studentId = `simulated-crew-${index + 1}`;
      return {
        studentId,
        studentDisplayName: state.displayName,
        voyageId: voyage.voyageId,
        team: voyage.team,
        route: voyage.route,
        outcome: voyage.outcome,
        completedStepCount: config.steps.length,
        totalStepCount: config.steps.length,
        completionStatus: 'complete' as const,
        responsePreview: state.responsePreview,
        updatedAt: DEMO_GENERATED_AT,
        submission: {
          id: `simulated-submission-${index + 1}`,
          projectId: config.projectId,
          projectVersion: config.projectVersion,
          classId: 'simulated-class-showcase',
          studentId,
          studentDisplayName: state.displayName,
          voyageId: voyage.voyageId,
          status: state.status,
          submittedAt: DEMO_GENERATED_AT,
          reviewedAt: state.status === 'submitted' ? undefined : DEMO_GENERATED_AT,
          reviewerDisplayName: state.status === 'submitted' ? undefined : 'Ms. Rivera',
          teacherFeedback: state.feedback,
          mastery: demoMastery(masteryTags, index),
          revision: state.revision,
        },
      };
    }),
  };
}

function demoMastery(
  masteryTags: readonly string[],
  memberIndex: number,
): readonly JourneyMasteryAssessment[] {
  return masteryTags.slice(0, 4).map((masteryTag, index) => ({
    masteryTag,
    level:
      memberIndex === 4 && index === 0
        ? 'developing'
        : (memberIndex + index) % 4 === 0
          ? 'advanced'
          : 'proficient',
  }));
}
