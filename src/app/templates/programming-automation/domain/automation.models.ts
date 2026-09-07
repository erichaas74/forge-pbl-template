export type CommandType =
  | 'move-distance'
  | 'move-rotations'
  | 'turn-degrees'
  | 'turn-fraction'
  | 'wait'
  | 'pick-up'
  | 'drop-off'
  | 'repeat';
export interface RobotPose {
  xCm: number;
  yCm: number;
  headingDeg: number;
}
export interface RobotConfig {
  id: string;
  name: string;
  wheelDiameterCm: number;
  distancePerRotationCm: number;
  loadedDistancePerRotationCm?: number;
  moveSpeed: number;
  loadedSpeed?: number;
  turnRate: number;
  radiusCm: number;
  cargoLimit: number;
  batteryCapacity: number;
}
export interface RobotCommand {
  id: string;
  type: CommandType;
  value: string;
  rate?: string;
  direction?: 'right' | 'left';
  packageId?: string;
  mathEvidenceId?: string;
  label?: string;
  disabled?: boolean;
  commands?: readonly RobotCommand[];
}
export interface RobotVariable {
  id: string;
  name: string;
  value: string;
  unit: string;
}
export interface RobotProgram {
  id: string;
  version: number;
  commands: readonly RobotCommand[];
  variables: readonly RobotVariable[];
}
export interface Rect {
  id: string;
  label: string;
  xCm: number;
  yCm: number;
  widthCm: number;
  heightCm: number;
}
export interface CourseDefinition {
  id: string;
  name: string;
  widthCm: number;
  heightCm: number;
  gridSizeCm: number;
  startPose: RobotPose;
  targets: readonly (RobotPose & { label: string })[];
  toleranceCm: number;
  headingToleranceDeg?: number;
  obstacles: readonly Rect[];
  packages: readonly {
    id: string;
    label: string;
    xCm: number;
    yCm: number;
    deliveryZoneId: string;
  }[];
  deliveryZones: readonly Rect[];
  checkpoints: readonly { id: string; xCm: number; yCm: number; radiusCm: number }[];
  battery: {
    move: number;
    turn: number;
    wait: number;
    pickup: number;
    dropoff: number;
    collision: number;
  };
  stopOnCollision: boolean;
}
export type MathTool =
  | 'circumference'
  | 'rotation-distance'
  | 'distance-rotations'
  | 'fraction-turn'
  | 'degrees-fraction'
  | 'turn-time'
  | 'movement-time'
  | 'grid-distance';
export type MathUnit = 'cm' | 'rotations' | 'degrees' | 'turns' | 'seconds';
export interface MathEvidence {
  id: string;
  studentId: string;
  tool: MathTool;
  inputs: readonly number[];
  answer: number;
  expected: number;
  unit: MathUnit;
  explanation: string;
  status: 'correct' | 'needs-revision';
  timestamp: string;
}
export interface Prediction {
  route: string;
  distance: string;
  turns: string;
  seconds: string;
  battery: string;
}
export interface RobotChallenge {
  id: string;
  title: string;
  week: 1 | 2 | 3;
  mission: string;
  courseId: string;
  allowedCommands: readonly CommandType[];
  requiredMath: readonly MathTool[];
  requiresVariable?: boolean;
  requiresLoop?: boolean;
  minimumDistance?: number;
  maximumCommands?: number;
  batteryCapacity?: number;
  skills: readonly string[];
  hint: string;
  discovery?: {
    starterCommands: readonly RobotCommand[];
    focusCommandId: string;
    instructions: string;
    reasoningPrompt: string;
    mathTool: MathTool;
  };
}
export interface AutomationProjectConfig {
  schemaVersion: '1.0';
  template: { id: 'programming-automation'; version: '1.0' };
  projectId: string;
  projectVersion: string;
  title: string;
  subtitle: string;
  robot: RobotConfig;
  courses: readonly CourseDefinition[];
  challenges: readonly RobotChallenge[];
  initialChallengeId: string;
  championshipChallengeId: string;
  scoring: {
    delivery: number;
    navigation: number;
    efficiency: number;
    reliability: number;
    prediction: number;
  };
}
export interface CompiledCommand {
  id: string;
  type: Exclude<CommandType, 'repeat'>;
  value: number;
  rate: number;
  direction: 'right' | 'left';
  packageId?: string;
}
export interface ProgramIssue {
  code: string;
  message: string;
  severity: 'error' | 'warning';
  commandId?: string;
}
export interface ReplaySample extends RobotPose {
  timeMs: number;
  activeCommandId: string;
  carryingPackageIds: readonly string[];
  deliveredPackageIds: readonly string[];
  batteryUsed: number;
}
export interface RunResult {
  completedMission: boolean;
  stoppedReason: string;
  elapsedSeconds: number;
  distanceCm: number;
  totalTurnDegrees: number;
  collisions: number;
  deliveriesCompleted: number;
  checkpointsReached: readonly string[];
  batteryUsed: number;
  stoppingErrorCm: number;
  commandCount: number;
  score: number;
  scoreParts: Readonly<Record<string, number>>;
  pathSamples: readonly ReplaySample[];
  events: readonly { commandId: string; message: string; timeMs: number }[];
}
export interface ProgramVersion {
  id: string;
  ownerId: string;
  ownerName: string;
  challengeId: string;
  targetIndex: number;
  createdAt: string;
  program: RobotProgram;
  math: readonly MathEvidence[];
  prediction: Prediction;
  robot: RobotConfig;
  course: CourseDefinition;
}
export interface RobotTrial extends RunResult {
  id: string;
  challengeId: string;
  version: ProgramVersion;
  createdAt: string;
  mode: 'practice' | 'championship';
  technicalInvalidReason?: string;
}
export interface ChallengeDraft {
  program: RobotProgram;
  targetIndex: number;
  prediction: Prediction;
  diagnosis: string;
  reflection: string;
  completedAt?: string;
  lockedVersionId?: string;
  observedTrialId?: string;
  reasoningOpened?: boolean;
}
export interface ChampionshipState {
  revealed: boolean;
  practiceOpen: boolean;
  practiceLimit: number;
  paused: boolean;
  showStandings: boolean;
  finalized: boolean;
  queue: readonly string[];
}
export interface AutomationState {
  schemaVersion: '1.0';
  projectId: string;
  projectVersion: string;
  revision: number;
  selectedChallengeId: string;
  drafts: Readonly<Record<string, ChallengeDraft>>;
  math: readonly MathEvidence[];
  trials: readonly RobotTrial[];
  versions: readonly ProgramVersion[];
  measuredDistancePerRotation: string;
  measuredTurnRate: string;
  measurementExplanation: string;
  defense: string;
  championship: ChampionshipState;
  audit: readonly { id: string; action: string; reason: string; timestamp: string }[];
}
