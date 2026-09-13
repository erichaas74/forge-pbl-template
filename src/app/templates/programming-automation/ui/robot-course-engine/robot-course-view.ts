import type { CourseDefinition, ReplaySample, RobotPose, RunResult } from '../../domain/automation.models';

/** Presentation-only bridge. No commands, scoring, persistence, or mutable runtime state. */
export interface RobotCourseView {
  course: CourseDefinition;
  robotRadiusCm?: number;
  targetIndex: number;
  sample?: ReplaySample;
  samples: readonly ReplaySample[];
  events: RunResult['events'];
  showTrace: boolean;
  follow: boolean;
  zoom: number;
  reducedMotion: boolean;
  overview?: boolean;
  result?: Pick<RunResult, 'completedMission' | 'score' | 'stoppingErrorCm' | 'elapsedSeconds'>;
}

export interface RobotCourseRenderer {
  update(view: RobotCourseView): void;
  destroy(): void;
}

/** One uniform scale preserves distances; north is up and heading zero points north. */
export function courseProjection(course: CourseDefinition, pixelsPerCm = 2) {
  return {
    length: (cm: number) => cm * pixelsPerCm,
    point: (pose: Pick<RobotPose, 'xCm' | 'yCm'>) => ({
      x: pose.xCm * pixelsPerCm,
      y: (course.heightCm - pose.yCm) * pixelsPerCm,
    }),
  };
}
