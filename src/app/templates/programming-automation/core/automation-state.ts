import type {
  AutomationProjectConfig,
  AutomationState,
  ChallengeDraft,
  CourseDefinition,
  RobotCommand,
  RobotChallenge,
} from '../domain/automation.models';
import { allCommands, compileProgram } from './automation-compiler';
import { mathTools } from './automation-math';
import { isMoveCommand, isMoveMathProblem, prepareMoveMathCommands } from './move-math';
import { touchesCourseActor, validCourseActors } from './course-actors';
export const emptyPrediction = () => ({
  route: '',
  distance: '',
  turns: '',
  seconds: '',
  battery: '',
});
export function initialAutomationState(config: AutomationProjectConfig): AutomationState {
  return {
    schemaVersion: '1.0',
    projectId: config.projectId,
    projectVersion: config.projectVersion,
    revision: 0,
    selectedChallengeId: config.initialChallengeId,
    drafts: Object.fromEntries(
      config.challenges.map((challenge) => [
        challenge.id,
        {
          program: {
            id: `program-${challenge.id}`,
            version: 0,
            commands: prepareMoveMathCommands(structuredClone(challenge.discovery?.starterCommands ?? []), challenge.moveMath),
            variables: [],
          },
          targetIndex: 0,
          prediction: emptyPrediction(),
          diagnosis: '',
          reflection: '',
        } satisfies ChallengeDraft,
      ]),
    ),
    math: [],
    trials: [],
    versions: [],
    measuredDistancePerRotation: '',
    measuredTurnRate: '',
    measurementExplanation: '',
    defense: '',
    championship: {
      revealed: false,
      practiceOpen: true,
      practiceLimit: 0,
      paused: false,
      showStandings: true,
      finalized: false,
      queue: [],
    },
    audit: [],
  };
}
export function transformCommands(
  commands: readonly RobotCommand[],
  id: string,
  transform: (command: RobotCommand) => readonly RobotCommand[],
): readonly RobotCommand[] {
  return commands.flatMap((command) =>
    command.id === id
      ? transform(command)
      : [
          {
            ...command,
            ...(command.commands
              ? { commands: transformCommands(command.commands, id, transform) }
              : {}),
          },
        ],
  );
}
export function validateAutomationConfig(config: AutomationProjectConfig): void {
  if (
    !config ||
    config.schemaVersion !== '1.0' ||
    !config.template ||
    !config.robot ||
    !config.scoring ||
    !Array.isArray(config.challenges) ||
    !Array.isArray(config.courses)
  ) {
    throw new Error('CONFIG_INVALID: Expected an automation project definition.');
  }
  const unique = (items: readonly { id: string }[]) =>
    items.length > 0 && new Set(items.map((item) => item.id)).size === items.length;
  if (
    config.schemaVersion !== '1.0' ||
    config.template.id !== 'programming-automation' ||
    !unique(config.challenges) ||
    !unique(config.courses) ||
    !config.challenges.some((item) => item.id === config.initialChallengeId) ||
    !config.challenges.some((item) => item.id === config.championshipChallengeId)
  )
    throw new Error('CONFIG_INVALID: Missing automation challenge or course.');
  if (
    [
      config.robot.radiusCm,
      config.robot.distancePerRotationCm,
      config.robot.moveSpeed,
      config.robot.turnRate,
      config.robot.batteryCapacity,
    ].some((value) => !Number.isFinite(value) || value <= 0)
  )
    throw new Error('CONFIG_INVALID: Robot measurements must be positive.');
  if (Math.abs(Object.values(config.scoring).reduce((a, b) => a + b, 0) - 100) > 0.001)
    throw new Error('CONFIG_INVALID: Scoring weights must add to 100.');
  for (const challenge of config.challenges as readonly RobotChallenge[]) {
    if (!config.courses.some((course) => course.id === challenge.courseId))
      throw new Error('CONFIG_INVALID: Unknown course.');
    if (challenge.moveMath !== undefined && (!challenge.moveMath || typeof challenge.moveMath !== 'object' || Array.isArray(challenge.moveMath) ||
      Object.entries(challenge.moveMath).some(([type, problem]) =>
        !isMoveCommand(type as RobotCommand['type']) || !challenge.allowedCommands.includes(type as RobotCommand['type']) ||
        !isMoveMathProblem(problem))))
      throw new Error('CONFIG_INVALID: Move math needs an allowed movement type, operation, and valid given number.');
    const discovery = challenge.discovery;
    if (
      discovery &&
      (!Array.isArray(discovery.starterCommands) ||
        !discovery.instructions?.trim() ||
        !discovery.reasoningPrompt?.trim() ||
        !mathTools.some((tool) => tool.id === discovery.mathTool) ||
        !allCommands(discovery.starterCommands).some(
          (command) => command.id === discovery.focusCommandId,
        ) ||
        compileProgram(
          {
            id: 'starter-validation',
            version: 0,
            commands: discovery.starterCommands,
            variables: [],
          },
          config.robot,
          challenge,
          [],
        ).issues.some((issue) => issue.severity === 'error'))
    )
      throw new Error(
        'CONFIG_INVALID: Discovery needs runnable starter code, a focus command, and reasoning guidance.',
      );
  }
  for (const course of config.courses as readonly CourseDefinition[]) {
    if (course?.visualTheme !== undefined && !['workshop', 'tabletop'].includes(course.visualTheme)) {
      throw new Error('CONFIG_INVALID: Unsupported course visual theme.');
    }
    if (
      !course ||
      !course.startPose ||
      !course.battery ||
      ![
        course.targets,
        course.obstacles,
        course.packages,
        course.deliveryZones,
        course.checkpoints,
      ].every(Array.isArray)
    )
      throw new Error('CONFIG_INVALID: Course geometry is incomplete.');
    if (course.actors !== undefined && (!validCourseActors(course.actors, course.widthCm, course.heightCm) ||
      (course.actors.length > 0 && course.visualTheme !== 'tabletop') ||
      course.actors.some(actor => touchesCourseActor(course.startPose, config.robot.radiusCm, actor, 0))))
      throw new Error('CONFIG_INVALID: Moving actors need valid bounded routes, a clear start, and the tabletop renderer.');
    if (course.visualTheme === 'workshop' && (
      course.obstacles.length || course.packages.length || course.deliveryZones.length || course.checkpoints.length ||
      course.targets.some(target => target.xCm !== course.startPose.xCm || target.headingDeg !== course.startPose.headingDeg)
    )) throw new Error('CONFIG_INVALID: Workshop art currently supports straight parking lanes without cargo or obstacles.');
    for (const pose of [course.startPose, ...course.targets])
      if (!Number.isFinite(pose.headingDeg))
        throw new Error('CONFIG_INVALID: Every pose needs a heading in degrees.');
    for (const rect of [...course.obstacles, ...course.deliveryZones])
      if (
        [rect.xCm, rect.yCm, rect.widthCm, rect.heightCm].some((n) => !Number.isFinite(n)) ||
        rect.widthCm <= 0 ||
        rect.heightCm <= 0 ||
        rect.xCm < 0 ||
        rect.yCm < 0 ||
        rect.xCm + rect.widthCm > course.widthCm ||
        rect.yCm + rect.heightCm > course.heightCm
      )
        throw new Error('CONFIG_INVALID: A course rectangle is invalid or outside the grid.');
    if (
      !course.targets.length ||
      [course.widthCm, course.heightCm, course.gridSizeCm, course.toleranceCm].some(
        (value) => !Number.isFinite(value) || value <= 0,
      )
    )
      throw new Error('CONFIG_INVALID: Invalid course dimensions.');
    for (const point of [
      course.startPose,
      ...course.targets,
      ...course.packages,
      ...course.checkpoints,
    ])
      if (
        !Number.isFinite(point.xCm) ||
        !Number.isFinite(point.yCm) ||
        point.xCm < 0 ||
        point.yCm < 0 ||
        point.xCm > course.widthCm ||
        point.yCm > course.heightCm
      )
        throw new Error('CONFIG_INVALID: A course object lies outside the grid.');
    for (const pkg of course.packages)
      if (!course.deliveryZones.some((zone: { id: string }) => zone.id === pkg.deliveryZoneId))
        throw new Error('CONFIG_INVALID: Unknown delivery zone.');
    if (
      Object.values(course.battery).some(
        (cost) => typeof cost !== 'number' || !Number.isFinite(cost) || cost < 0,
      )
    )
      throw new Error('CONFIG_INVALID: Invalid battery costs.');
  }
}
