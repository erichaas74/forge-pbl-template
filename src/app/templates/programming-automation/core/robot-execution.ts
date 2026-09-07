import type {
  AutomationProjectConfig,
  CompiledCommand,
  CourseDefinition,
  Prediction,
  Rect,
  ReplaySample,
  RobotChallenge,
  RobotConfig,
  RobotPose,
  RunResult,
} from '../domain/automation.models';
export const normalizeHeading = (value: number): number => ((value % 360) + 360) % 360;
const round = (value: number): number => Math.round(value * 10000) / 10000;
const distance = (a: RobotPose | { xCm: number; yCm: number }, b: { xCm: number; yCm: number }) =>
  Math.hypot(a.xCm - b.xCm, a.yCm - b.yCm);
const inside = (pose: RobotPose, rect: Rect): boolean =>
  pose.xCm >= rect.xCm &&
  pose.xCm <= rect.xCm + rect.widthCm &&
  pose.yCm >= rect.yCm &&
  pose.yCm <= rect.yCm + rect.heightCm;
export function collides(pose: RobotPose, course: CourseDefinition, radius: number): boolean {
  return (
    pose.xCm < radius ||
    pose.yCm < radius ||
    pose.xCm > course.widthCm - radius ||
    pose.yCm > course.heightCm - radius ||
    course.obstacles.some((rect) => {
      const x = Math.max(rect.xCm, Math.min(pose.xCm, rect.xCm + rect.widthCm));
      const y = Math.max(rect.yCm, Math.min(pose.yCm, rect.yCm + rect.heightCm));
      return Math.hypot(pose.xCm - x, pose.yCm - y) <= radius;
    })
  );
}
/** Deterministic simulation is independent of animation frames and wall-clock time. */
export function executeRobot(
  commands: readonly CompiledCommand[],
  course: CourseDefinition,
  robot: RobotConfig,
  challenge: RobotChallenge,
  targetIndex: number,
  prediction: Prediction,
  scoring: AutomationProjectConfig['scoring'],
): RunResult {
  let pose = { ...course.startPose },
    seconds = 0,
    traveled = 0,
    degrees = 0,
    battery = 0,
    collisions = 0,
    stoppedReason = 'Program finished',
    halted = false;
  const capacity = challenge.batteryCapacity ?? robot.batteryCapacity;
  const carrying = new Set<string>(),
    delivered = new Set<string>(),
    checkpoints = new Set<string>();
  const samples: ReplaySample[] = [],
    events: { commandId: string; message: string; timeMs: number }[] = [];
  let active = '';
  const sample = (force = false): void => {
    if (!force && samples.length && seconds * 1000 - samples.at(-1)!.timeMs < 99.99) return;
    samples.push({
      ...pose,
      timeMs: round(seconds * 1000),
      activeCommandId: active,
      carryingPackageIds: [...carrying],
      deliveredPackageIds: [...delivered],
      batteryUsed: round(battery),
    });
  };
  const event = (message: string): void => {
    events.push({ commandId: active, message, timeMs: round(seconds * 1000) });
  };
  const consume = (time: number, cost: number): number => {
    const fraction = Math.min(
      1,
      cost > 0 ? Math.max(0, capacity - battery) / cost : 1,
      time > 0 ? Math.max(0, 600 - seconds) / time : 1,
    );
    seconds += time * fraction;
    battery += cost * fraction;
    if (fraction < 1 || battery >= capacity || seconds >= 600) {
      halted = true;
      stoppedReason = battery >= capacity ? 'Battery empty' : '600-second run limit reached';
    }
    return fraction;
  };
  const checkPoints = (): void => {
    for (const point of course.checkpoints)
      if (distance(pose, point) <= point.radiusCm) checkpoints.add(point.id);
  };
  sample(true);
  checkPoints();
  for (const command of commands) {
    if (halted) break;
    active = command.id;
    sample(true);
    if (command.type === 'move-distance' || command.type === 'move-rotations') {
      const rotationTravel = carrying.size
        ? (robot.loadedDistancePerRotationCm ?? robot.distancePerRotationCm)
        : robot.distancePerRotationCm;
      const amount =
        command.type === 'move-rotations' ? command.value * rotationTravel : command.value;
      const speed = carrying.size
        ? Math.min(command.rate, robot.loadedSpeed ?? command.rate)
        : command.rate;
      const steps = Math.max(1, Math.ceil(amount));
      for (let i = 0; i < steps && !halted; i++) {
        const step = amount / steps,
          radians = (pose.headingDeg * Math.PI) / 180;
        const next = {
          ...pose,
          xCm: pose.xCm + Math.sin(radians) * step,
          yCm: pose.yCm + Math.cos(radians) * step,
        };
        if (collides(next, course, robot.radiusCm)) {
          collisions++;
          consume(0, course.battery.collision);
          event(`Collision at (${round(pose.xCm)}, ${round(pose.yCm)}) cm.`);
          stoppedReason = 'Collision stopped movement';
          if (course.stopOnCollision) halted = true;
          break;
        }
        const fraction = consume(step / speed, step * course.battery.move);
        pose = {
          ...pose,
          xCm: pose.xCm + (next.xCm - pose.xCm) * fraction,
          yCm: pose.yCm + (next.yCm - pose.yCm) * fraction,
        };
        traveled += step * fraction;
        checkPoints();
        sample();
      }
    } else if (command.type === 'turn-degrees' || command.type === 'turn-fraction') {
      const amount = command.value * (command.type === 'turn-fraction' ? 360 : 1),
        steps = Math.max(1, Math.ceil(amount / 4));
      for (let i = 0; i < steps && !halted; i++) {
        const step = amount / steps,
          fraction = consume(step / command.rate, step * course.battery.turn);
        pose.headingDeg = normalizeHeading(
          pose.headingDeg + step * fraction * (command.direction === 'left' ? -1 : 1),
        );
        degrees += step * fraction;
        sample();
      }
    } else if (command.type === 'wait') {
      const steps = Math.max(1, Math.ceil(command.value * 10));
      for (let i = 0; i < steps && !halted; i++) {
        consume(command.value / steps, (command.value / steps) * course.battery.wait);
        sample();
      }
    } else if (command.type === 'pick-up') {
      const item = course.packages.find((pkg) => pkg.id === command.packageId);
      if (
        !item ||
        distance(pose, item) > 18 ||
        carrying.size >= robot.cargoLimit ||
        carrying.has(item.id) ||
        delivered.has(item.id)
      )
        event('Pickup failed: check the package, distance and cargo capacity.');
      else {
        const fraction = consume(1, course.battery.pickup);
        if (fraction === 1) {
          carrying.add(item.id);
          event(`Picked up ${item.label}.`);
        }
      }
    } else if (command.type === 'drop-off') {
      const item = course.packages.find((pkg) => pkg.id === command.packageId),
        zone = course.deliveryZones.find((zone) => zone.id === item?.deliveryZoneId);
      if (!item || !carrying.has(item.id) || !zone || !inside(pose, zone))
        event('Delivery failed: carry the right package into its matching zone.');
      else {
        const fraction = consume(1, course.battery.dropoff);
        if (fraction === 1) {
          carrying.delete(item.id);
          delivered.add(item.id);
          event(`Delivered ${item.label}.`);
        }
      }
    }
    event(
      `${command.type.replaceAll('-', ' ')} complete · (${round(pose.xCm)}, ${round(pose.yCm)}) cm · heading ${round(pose.headingDeg)}°`,
    );
    sample(true);
  }
  const target = course.targets[targetIndex] ?? course.targets[0];
  const error = distance(pose, target),
    angleError = Math.min(
      normalizeHeading(pose.headingDeg - target.headingDeg),
      normalizeHeading(target.headingDeg - pose.headingDeg),
    );
  const completedMission =
    !halted &&
    error <= course.toleranceCm &&
    (!course.headingToleranceDeg || angleError <= course.headingToleranceDeg) &&
    delivered.size === course.packages.length &&
    checkpoints.size === course.checkpoints.length &&
    traveled + 0.001 >= (challenge.minimumDistance ?? 0);
  if (!completedMission && !halted)
    stoppedReason =
      delivered.size < course.packages.length
        ? 'Some packages were not delivered'
        : checkpoints.size < course.checkpoints.length
          ? 'A checkpoint was missed'
          : traveled < (challenge.minimumDistance ?? 0)
            ? 'The required route is not complete'
            : course.headingToleranceDeg && angleError > course.headingToleranceDeg
              ? `Final heading is ${round(angleError)}° from the required direction`
              : `Stopped ${round(error)} cm from the target`;
  if (completedMission) stoppedReason = 'Mission complete';
  const accuracy =
    (
      [
        [prediction.distance, traveled],
        [prediction.turns, degrees],
        [prediction.seconds, seconds],
        [prediction.battery, battery],
      ] as const
    ).reduce((sum, [value, actual]) => {
      const predicted = Number(value);
      return (
        sum +
        (value.trim() && Number.isFinite(predicted) && predicted >= 0
          ? Math.max(0, 1 - Math.abs(predicted - actual) / Math.max(actual, 1))
          : 0)
      );
    }, 0) / 4;
  const scoreParts = {
    delivery: course.packages.length
      ? delivered.size / course.packages.length
      : completedMission
        ? 1
        : 0,
    navigation: Math.max(0, 1 - error / Math.max(25, course.toleranceCm * 10)),
    efficiency: completedMission ? Math.max(0, 1 - battery / capacity) : 0,
    reliability: Math.max(0, 1 - collisions * 0.25),
    prediction: accuracy,
  };
  const score = Object.entries(scoring).reduce(
    (sum, [key, weight]) => sum + scoreParts[key as keyof typeof scoreParts] * weight,
    0,
  );
  return {
    completedMission,
    stoppedReason,
    elapsedSeconds: round(seconds),
    distanceCm: round(traveled),
    totalTurnDegrees: round(degrees),
    collisions,
    deliveriesCompleted: delivered.size,
    checkpointsReached: [...checkpoints],
    batteryUsed: round(battery),
    stoppingErrorCm: round(error),
    commandCount: commands.length,
    score: round(score),
    scoreParts,
    pathSamples: samples,
    events,
  };
}
