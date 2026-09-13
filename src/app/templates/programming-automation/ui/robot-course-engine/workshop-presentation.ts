import type { RobotCourseView } from './robot-course-view';
import { courseProjection } from './robot-course-view';

/** Result visibility comes from the recorded duration, never from proximity to the goal. */
export function workshopStatus(view: RobotCourseView) {
  const pose = view.sample ?? view.course.startPose;
  const target = view.course.targets[view.targetIndex] ?? view.course.targets[0];
  const finished = !!view.result && !!view.sample &&
    view.sample.timeMs >= (view.samples.at(-1)?.timeMs ?? view.result.elapsedSeconds * 1000);
  return {
    finished,
    success: finished && !!view.result?.completedMission,
    distance: target ? Math.hypot(pose.xCm - target.xCm, pose.yCm - target.yCm) : 0,
    score: finished ? view.result?.score : undefined,
    label: finished ? (view.result?.completedMission ? 'PARKING COMPLETE' : 'ADJUST YOUR PROGRAM')
      : view.sample ? 'RECORDED RUN' : 'READY TO RUN',
  };
}

/** The overview includes every centimeter. The default frame emphasizes the active lane. */
export function workshopFrame(view: RobotCourseView) {
  const p = courseProjection(view.course);
  const start = p.point(view.course.startPose);
  const target = p.point(view.course.targets[view.targetIndex] ?? view.course.startPose);
  if (view.overview) return { x: -110, y: -130,
    width: p.length(view.course.widthCm) + 220, height: p.length(view.course.heightCm) + 270 };
  return { x: Math.min(start.x, target.x) - 175,
    y: Math.min(start.y, target.y) - 135,
    width: Math.max(490, Math.abs(start.x - target.x) + 350),
    height: Math.max(460, Math.abs(start.y - target.y) + 260) };
}
