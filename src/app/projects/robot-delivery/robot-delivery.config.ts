import type {
  AutomationProjectConfig,
  CommandType,
  CourseDefinition,
  MoveMathProblems,
  RobotChallenge,
} from '../../templates/programming-automation/domain/automation.models';
const movement: readonly CommandType[] = ['move-distance', 'move-rotations', 'wait'];
const navigation: readonly CommandType[] = [...movement, 'turn-degrees', 'turn-fraction'];
const delivery: readonly CommandType[] = [...navigation, 'pick-up', 'drop-off'];
const all: readonly CommandType[] = [...delivery, 'repeat'];
// Each level supplies the first number and operation; the learner supplies the second.
const moveProblems: Readonly<Record<string, MoveMathProblems>> = {
  'patrol-crossing': { 'move-distance': { operation: 'multiply', given: 40 }, 'move-rotations': { operation: 'add', given: 2 } },
  'moving-gates': { 'move-distance': { operation: 'multiply', given: 40 }, 'move-rotations': { operation: 'divide', given: 40 } },
  'calibration-garage': {
    'move-distance': { operation: 'multiply', given: 24 },
    'move-rotations': { operation: 'multiply', given: 0.5 },
  },
  'precision-parking': {
    'move-distance': { operation: 'multiply', given: 24 },
    'move-rotations': { operation: 'add', given: 2 },
  },
  'turn-training': {
    'move-distance': { operation: 'subtract', given: 150 },
    'move-rotations': { operation: 'subtract', given: 8 },
  },
  'coordinate-courier': {
    'move-distance': { operation: 'multiply', given: 25 },
    'move-rotations': { operation: 'multiply', given: 1.25 },
  },
  'warehouse-pattern': {
    'move-distance': { operation: 'divide', given: 200 },
    'move-rotations': { operation: 'divide', given: 25 },
  },
  'battery-emergency': {
    'move-distance': { operation: 'add', given: 50 },
    'move-rotations': { operation: 'add', given: 1 },
  },
  'cargo-delivery': {
    'move-distance': { operation: 'multiply', given: 25 },
    'move-rotations': { operation: 'multiply', given: 1 },
  },
};
const floor = (id: string, name: string): CourseDefinition => ({
  id,
  name,
  visualTheme: 'tabletop',
  widthCm: 400,
  heightCm: 300,
  gridSizeCm: 25,
  startPose: { xCm: 50, yCm: 50, headingDeg: 0 },
  targets: [{ xCm: 50, yCm: 170, headingDeg: 0, label: '120 cm' }],
  toleranceCm: 3,
  obstacles: [],
  packages: [],
  deliveryZones: [],
  checkpoints: [],
  battery: { move: 0.05, turn: 0.01, wait: 0.02, pickup: 2, dropoff: 1, collision: 8 },
  stopOnCollision: true,
});
const courses: readonly CourseDefinition[] = [
  {
    ...floor('calibration', 'Calibration lane'),
    targets: [24, 12, 6, 18].map((distance) => ({
      xCm: 50,
      yCm: 50 + distance,
      headingDeg: 0,
      label: `${distance} cm`,
    })),
  },
  {
    ...floor('parking', 'Precision parking bay'),
    targets: [120, 48, 72, 90, 126].map((distance) => ({
      xCm: 50,
      yCm: 50 + distance,
      headingDeg: 0,
      label: `${distance} cm`,
    })),
  },
  {
    ...floor('turns', 'Turn training'),
    targets: [{ xCm: 150, yCm: 150, headingDeg: 90, label: 'L route · face east' }],
    headingToleranceDeg: 2,
    obstacles: [
      { id: 'barrier', label: 'Keep clear', xCm: 85, yCm: 50, widthCm: 30, heightCm: 70 },
    ],
  },
  {
    ...floor('coordinates', 'Coordinate courier'),
    targets: [{ xCm: 150, yCm: 50, headingDeg: 180, label: 'Return dock (6, 2)' }],
    packages: [{ id: 'parcel-a', label: 'A', xCm: 50, yCm: 125, deliveryZoneId: 'zone-a' }],
    deliveryZones: [{ id: 'zone-a', label: 'A', xCm: 135, yCm: 110, widthCm: 30, heightCm: 30 }],
  },
  {
    ...floor('variables', 'Variable upgrade'),
    targets: [
      { xCm: 150, yCm: 150, headingDeg: 90, label: '100 cm sides' },
      { xCm: 200, yCm: 200, headingDeg: 90, label: '150 cm sides' },
    ],
  },
  {
    ...floor('pattern', 'Warehouse square'),
    startPose: { xCm: 75, yCm: 75, headingDeg: 0 },
    targets: [{ xCm: 75, yCm: 75, headingDeg: 0, label: 'Return to start' }],
    checkpoints: [
      { id: 'north', xCm: 75, yCm: 175, radiusCm: 5 },
      { id: 'east', xCm: 175, yCm: 175, radiusCm: 5 },
      { id: 'south', xCm: 175, yCm: 75, radiusCm: 5 },
    ],
  },
  {
    ...floor('battery', 'Battery emergency'),
    targets: [{ xCm: 250, yCm: 200, headingDeg: 90, label: 'Charging dock' }],
    obstacles: [
      { id: 'shelf', label: 'Storage rack', xCm: 100, yCm: 80, widthCm: 100, heightCm: 80 },
    ],
  },
  {
    ...floor('cargo', 'Cargo delivery'),
    targets: [{ xCm: 250, yCm: 200, headingDeg: 90, label: 'Delivery dock' }],
    packages: [{ id: 'parcel-a', label: 'A · heavy', xCm: 50, yCm: 150, deliveryZoneId: 'zone-a' }],
    deliveryZones: [{ id: 'zone-a', label: 'A', xCm: 235, yCm: 185, widthCm: 30, heightCm: 30 }],
  },
  {
    ...floor('patrol', 'Patrol crossing'),
    heightCm: 400,
    gridSizeCm: 40,
    startPose: { xCm: 60, yCm: 40, headingDeg: 0 },
    targets: [{ xCm: 60, yCm: 320, headingDeg: 0, label: 'Cross the patrol lane' }],
    actors: [{ id: 'patrol-1', label: 'Scout patrol', kind: 'robot', radiusCm: 12,
      path: [{ xCm: 20, yCm: 180 }, { xCm: 220, yCm: 180 }],
      speedCmPerSecond: 40, patrol: 'ping-pong', phaseSeconds: 2 }],
  },
  {
    ...floor('gates', 'Patrol and sliding gate'),
    heightCm: 400,
    gridSizeCm: 40,
    startPose: { xCm: 60, yCm: 40, headingDeg: 0 },
    targets: [{ xCm: 300, yCm: 320, headingDeg: 90, label: 'Beyond the sliding gate' }],
    headingToleranceDeg: 2,
    actors: [
      { id: 'patrol-1', label: 'Scout patrol', kind: 'robot', radiusCm: 12,
        path: [{ xCm: 20, yCm: 180 }, { xCm: 220, yCm: 180 }],
        speedCmPerSecond: 40, patrol: 'ping-pong', phaseSeconds: 2 },
      { id: 'gate-1', label: 'Sliding gate', kind: 'barrier', widthCm: 36, heightCm: 32,
        path: [{ xCm: 180, yCm: 220 }, { xCm: 180, yCm: 360 }],
        speedCmPerSecond: 20, patrol: 'ping-pong', pauseSeconds: 1 },
    ],
  },
  {
    ...floor('championship', 'Championship arena'),
    targets: [{ xCm: 50, yCm: 50, headingDeg: 180, label: 'Return to the start dock' }],
    packages: [
      { id: 'parcel-a', label: 'A', xCm: 50, yCm: 150, deliveryZoneId: 'zone-a' },
      { id: 'parcel-b', label: 'B', xCm: 250, yCm: 250, deliveryZoneId: 'zone-b' },
    ],
    deliveryZones: [
      { id: 'zone-a', label: 'A', xCm: 135, yCm: 235, widthCm: 30, heightCm: 30 },
      { id: 'zone-b', label: 'B', xCm: 235, yCm: 35, widthCm: 30, heightCm: 30 },
    ],
    obstacles: [
      { id: 'rack', label: 'Storage rack', xCm: 105, yCm: 90, widthCm: 85, heightCm: 110 },
    ],
  },
];
const discovery: Record<string, RobotChallenge['discovery']> = {
  'calibration-garage': {
    starterCommands: [{ id: 'guess-rotations', type: 'move-rotations', value: '2' }],
    focusCommandId: 'guess-rotations',
    instructions:
      'The Move block multiplies the given half rotation by your number. Guess a number to reach the target, or test the starter guess first.',
    reasoningPrompt:
      'Did the robot stop short or go too far? Compare the rotations you entered with the distance it travelled. What could one rotation tell you?',
    mathTool: 'rotation-distance',
  },
  'precision-parking': {
    starterCommands: [{ id: 'guess-rotations', type: 'move-rotations', value: '3' }],
    focusCommandId: 'guess-rotations',
    instructions:
      'The Move block adds the given 2 rotations to your number. Choose your number to park on the target, or test the starter guess first.',
    reasoningPrompt:
      'Where did the robot stop compared with the target? Use your trial distance and rotation count to find the travel per rotation. How could that help your next guess?',
    mathTool: 'distance-rotations',
  },
  'turn-training': {
    starterCommands: [
      { id: 'approach', type: 'move-distance', value: '100' },
      { id: 'guess-turn', type: 'turn-degrees', value: '45', direction: 'right' },
      { id: 'finish', type: 'move-distance', value: '100' },
    ],
    focusCommandId: 'guess-turn',
    instructions:
      'The movement blocks are ready. Guess the turn angle in the highlighted block, then watch the direction the robot takes.',
    reasoningPrompt:
      'Was the turn too small or too large? Sketch the direction before and after the turn. What fraction of a full turn connects them?',
    mathTool: 'fraction-turn',
  },
  'coordinate-courier': {
    starterCommands: [
      { id: 'approach', type: 'move-distance', value: '75' },
      { id: 'collect', type: 'pick-up', value: '', packageId: 'parcel-a' },
      { id: 'turn-east', type: 'turn-degrees', value: '90', direction: 'right' },
      { id: 'guess-crossing', type: 'move-distance', value: '50' },
      { id: 'deliver', type: 'drop-off', value: '', packageId: 'parcel-a' },
      { id: 'turn-south', type: 'turn-degrees', value: '90', direction: 'right' },
      { id: 'park', type: 'move-distance', value: '75' },
    ],
    focusCommandId: 'guess-crossing',
    instructions:
      'The Move block multiplies the given 25 cm grid size by your number. Guess how many spaces cross to delivery zone A, then run the delivery code.',
    reasoningPrompt:
      'Did the robot reach the delivery zone before dropping the package? Count the horizontal grid spaces between pickup and delivery. How do spaces become centimeters?',
    mathTool: 'grid-distance',
  },
};
const challenge = (
  id: string,
  title: string,
  week: 1 | 2 | 3,
  courseId: string,
  mission: string,
  commands: readonly CommandType[],
  requiredMath: RobotChallenge['requiredMath'],
  hint: string,
): RobotChallenge => ({
  id,
  title,
  week,
  courseId,
  mission,
  allowedCommands: commands,
  moveMath: moveProblems[id],
  requiredMath,
  skills: requiredMath,
  hint,
  discovery: discovery[id],
});
export const robotDeliveryConfig: AutomationProjectConfig = {
  schemaVersion: '1.0',
  template: { id: 'programming-automation', version: '1.0' },
  projectId: 'robot-delivery-code-lab',
  projectVersion: '1.0.0',
  title: 'Robot Delivery Code Lab',
  subtitle: 'Programming & Automation Challenge',
  initialChallengeId: 'precision-parking',
  championshipChallengeId: 'championship',
  robot: {
    id: 'courier-01',
    name: 'Courier 01',
    wheelDiameterCm: 8,
    distancePerRotationCm: 24,
    loadedDistancePerRotationCm: 24,
    moveSpeed: 20,
    loadedSpeed: 17,
    turnRate: 45,
    radiusCm: 8,
    cargoLimit: 1,
    batteryCapacity: 100,
  },
  courses,
  scoring: { delivery: 35, navigation: 20, efficiency: 20, reliability: 15, prediction: 10 },
  challenges: [
    challenge(
      'calibration-garage',
      'Calibration Garage',
      1,
      'calibration',
      'Measure how far one whole, half and quarter rotation actually carries your robot.',
      movement,
      ['circumference', 'rotation-distance'],
      'Calculate with π ≈ 3.14, then compare that theoretical circumference with measured travel. Measurements may differ.',
    ),
    challenge(
      'precision-parking',
      'Precision Parking',
      1,
      'parking',
      'Park the center of your robot on the selected target. Try a rotation guess, watch the run, then use evidence to improve it.',
      movement,
      ['circumference', 'distance-rotations'],
      'Find the distance from the start to your target. Divide it by the measured travel per wheel rotation.',
    ),
    challenge(
      'turn-training',
      'Turn Training',
      1,
      'turns',
      'Follow an L-shaped route around the barrier and finish facing east.',
      navigation,
      ['fraction-turn', 'turn-time'],
      'North is 0°, east is 90°. Convert a fraction of 360° into a turn, then calculate how long the turn takes.',
    ),
    challenge(
      'coordinate-courier',
      'Coordinate Courier',
      1,
      'coordinates',
      'Collect package A at (2, 5), deliver it to (6, 5), then park at (6, 2). Each grid square is 25 cm.',
      delivery,
      ['grid-distance'],
      'Use coordinate changes along one axis at a time. PICK UP and DROP OFF happen only when your code says so.',
    ),
    {
      ...challenge(
        'variable-upgrade',
        'Variable Upgrade',
        2,
        'variables',
        'Reach the far corner using a named SIDE variable. Change the target size, then update the variable.',
        navigation,
        ['grid-distance'],
        'A variable is a named measurement. Define SIDE once, then use SIDE in each MOVE block.',
      ),
      requiresVariable: true,
    },
    {
      ...challenge(
        'warehouse-pattern',
        'Warehouse Pattern',
        2,
        'pattern',
        'Visit every corner of the 100 cm square and return to the start using a repeat block.',
        all,
        ['fraction-turn'],
        'Look for a MOVE and TURN pattern. The robot must visit all three checkpoints before returning.',
      ),
      requiresLoop: true,
      minimumDistance: 395,
      maximumCommands: 6,
    },
    {
      ...challenge(
        'battery-emergency',
        'Battery Emergency',
        2,
        'battery',
        'Reach the charging dock without hitting the rack or using more than 24 battery units.',
        all,
        ['movement-time'],
        'Compare route length and turns. Movement uses 0.05 units/cm; turns use 0.01 units/degree.',
      ),
      batteryCapacity: 24,
    },
    challenge(
      'cargo-delivery',
      'Cargo Delivery',
      2,
      'cargo',
      'Pick up the heavy package, deliver it to zone A, and compare travel time with an empty robot.',
      all,
      ['movement-time'],
      'The loaded robot moves at 17 cm/s instead of 20 cm/s. Update your predicted time.',
    ),
    challenge('patrol-crossing', 'Patrol Crossing', 3, 'patrol',
      'Cross the moving scout’s route and reach the goal. The scout travels at 40 cm/s. Every run starts its patrol at the same position.',
      navigation, ['grid-distance', 'movement-time'],
      'Watch the dashed patrol route. Use WAIT before moving to change when you cross it. Each grid square is 40 cm.'),
    challenge('moving-gates', 'Moving Gates', 3, 'gates',
      'Reach the far goal while avoiding a patrol robot and a sliding gate. The gate moves at 20 cm/s and pauses for 1 second at each end.',
      navigation, ['grid-distance', 'movement-time', 'fraction-turn'],
      'Plan the northbound crossing first, then the eastbound crossing. WAIT blocks can change the timing of each part of your route.'),
    {
      ...challenge(
        'championship',
        'Robot Command Championship',
        3,
        'championship',
        'Deliver both packages to their matching zones and return to the start. Lock a tested program, then run it autonomously.',
        all,
        [
          'circumference',
          'distance-rotations',
          'fraction-turn',
          'turn-time',
          'grid-distance',
          'movement-time',
        ],
        'Plan around the rack. Package A goes to (6, 10); B goes to (10, 2). You can carry one package at a time.',
      ),
      requiresVariable: true,
      requiresLoop: true,
    },
  ],
};
