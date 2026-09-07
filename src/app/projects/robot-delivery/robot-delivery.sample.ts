import type {
  AutomationState,
  MathEvidence,
  MathTool,
  ProgramVersion,
  RobotCommand,
  RobotProgram,
  RobotTrial,
} from '../../templates/programming-automation/domain/automation.models';
import { initialAutomationState } from '../../templates/programming-automation/core/automation-state';
import { compileProgram } from '../../templates/programming-automation/core/automation-compiler';
import {
  expectedMath,
  mathTools,
} from '../../templates/programming-automation/core/automation-math';
import { executeRobot } from '../../templates/programming-automation/core/robot-execution';
import type { SampleGuide } from '../../shared/project-intro/completed-sample-guide';
import { robotDeliveryConfig as config } from './robot-delivery.config';
export const robotSampleStudent = { id: 'robot-example-engineer', name: 'Alex · example engineer' };
/** Fictional curriculum evidence, executed through the same engine as student programs. */
export function createRobotSampleState(): AutomationState {
  let serial = 0;
  const id = () => `robot-sample-${++serial}`;
  const time = '2026-09-01T10:00:00.000Z';
  const math: MathEvidence[] = [];
  const evidence = (tool: MathTool, inputs: number[], explanation: string): string => {
    const existing = math.find(
      (e) => e.tool === tool && JSON.stringify(e.inputs) === JSON.stringify(inputs),
    );
    if (existing) return existing.id;
    const answer = expectedMath(tool, inputs);
    const item: MathEvidence = {
      id: id(),
      studentId: robotSampleStudent.id,
      tool,
      inputs,
      answer,
      expected: answer,
      unit: mathTools.find((t) => t.id === tool)!.unit,
      explanation,
      status: 'correct',
      timestamp: time,
    };
    math.push(item);
    return item.id;
  };
  evidence(
    'circumference',
    [8],
    'I used diameter × 3.14. The geometric circumference is 25.12 cm; a trial measures 24 cm of travel.',
  );
  evidence(
    'rotation-distance',
    [1, 24],
    'One measured rotation carries the robot 24 cm, so half a rotation should carry it 12 cm.',
  );
  evidence(
    'movement-time',
    [100, 20],
    'An empty robot covers 100 cm at 20 cm per second in 5 seconds. Loaded segments take longer.',
  );
  evidence(
    'turn-time',
    [90, 45],
    'A right-angle turn is 90 degrees. At 45 degrees each second, it takes 2 seconds.',
  );
  evidence('degrees-fraction', [90], '90 divided by 360 is one quarter of a full turn.');
  const move = (value: number, variable?: string): RobotCommand => ({
    id: id(),
    type: 'move-distance',
    value: variable ?? String(value),
    mathEvidenceId: evidence(
      'grid-distance',
      [0, 0, 0, value / 25, 25],
      `I counted ${value / 25} grid squares and multiplied by 25 cm per square to get ${value} cm.`,
    ),
  });
  const turn = (): RobotCommand => ({
    id: id(),
    type: 'turn-degrees',
    value: '90',
    direction: 'right',
    mathEvidenceId: evidence(
      'fraction-turn',
      [0.25],
      'A quarter of 360 degrees is 90 degrees. Four right-angle turns make a complete turn.',
    ),
  });
  const rotate = (rotations: number): RobotCommand => ({
    id: id(),
    type: 'move-rotations',
    value: String(rotations),
    mathEvidenceId: evidence(
      'distance-rotations',
      [rotations * 24, 24],
      `I divided ${rotations * 24} cm by the measured 24 cm per rotation to get ${rotations} rotations.`,
    ),
  });
  const cargo = (type: 'pick-up' | 'drop-off', pkg = 'parcel-a'): RobotCommand => ({
    id: id(),
    type,
    value: '',
    packageId: pkg,
  });
  const repeat = (count: number, commands: RobotCommand[]): RobotCommand => ({
    id: id(),
    type: 'repeat',
    value: String(count),
    commands,
  });
  const programs: Record<string, RobotProgram> = {};
  const program = (
    key: string,
    commands: RobotCommand[],
    variables: RobotProgram['variables'] = [],
  ) => {
    programs[key] = { id: `sample-${key}`, version: 2, commands, variables };
  };
  program('calibration-garage', [rotate(1)]);
  program('precision-parking', [rotate(5)]);
  program('turn-training', [move(100), turn(), move(100)]);
  program('coordinate-courier', [
    move(75),
    cargo('pick-up'),
    turn(),
    move(100),
    cargo('drop-off'),
    turn(),
    move(75),
  ]);
  program(
    'variable-upgrade',
    [move(100, 'SIDE'), turn(), move(100, 'SIDE')],
    [{ id: id(), name: 'SIDE', value: '100', unit: 'cm' }],
  );
  program('warehouse-pattern', [repeat(4, [move(100), turn()])]);
  program('battery-emergency', [move(150), turn(), move(200)]);
  program('cargo-delivery', [
    move(100),
    cargo('pick-up'),
    move(50),
    turn(),
    move(200),
    cargo('drop-off'),
  ]);
  program(
    'championship',
    [
      repeat(2, [move(50, 'STEP')]),
      cargo('pick-up'),
      repeat(2, [move(50, 'STEP')]),
      turn(),
      move(100, 'LONG'),
      cargo('drop-off'),
      move(100, 'LONG'),
      cargo('pick-up', 'parcel-b'),
      turn(),
      repeat(2, [move(100, 'LONG')]),
      cargo('drop-off', 'parcel-b'),
      turn(),
      repeat(2, [move(100, 'RETURN')]),
    ],
    [
      { id: id(), name: 'STEP', value: '50', unit: 'cm' },
      { id: id(), name: 'LONG', value: '100', unit: 'cm' },
      { id: id(), name: 'RETURN', value: '100', unit: 'cm' },
    ],
  );
  const base = initialAutomationState(config);
  const trials: RobotTrial[] = [];
  const versions: ProgramVersion[] = [];
  const drafts = { ...base.drafts };
  for (const challenge of config.challenges) {
    const currentProgram = programs[challenge.id];
    const course = config.courses.find((c) => c.id === challenge.courseId)!;
    const prediction = {
      route:
        'Travel north on the west aisle, deliver A across the top, collect B, travel south on the east aisle, then return west to the starting dock.',
      distance: challenge.id === 'championship' ? '800' : '',
      turns: challenge.id === 'championship' ? '270' : '',
      seconds: challenge.id === 'championship' ? '54' : '',
      battery: challenge.id === 'championship' ? '49' : '',
    };
    const version: ProgramVersion = {
      id: id(),
      ownerId: robotSampleStudent.id,
      ownerName: robotSampleStudent.name,
      challengeId: challenge.id,
      targetIndex: 0,
      createdAt: time,
      program: currentProgram,
      math: structuredClone(math),
      prediction,
      robot: config.robot,
      course,
    };
    const run = (v: ProgramVersion, mode: 'practice' | 'championship'): RobotTrial => {
      const compiled = compileProgram(
        v.program,
        v.robot,
        challenge,
        v.math,
        mode === 'championship',
      );
      if (compiled.issues.some((i) => i.severity === 'error'))
        throw new Error(compiled.issues.map((i) => i.message).join('\n'));
      return {
        ...executeRobot(
          compiled.commands,
          v.course,
          v.robot,
          challenge,
          0,
          v.prediction,
          config.scoring,
        ),
        id: id(),
        challengeId: challenge.id,
        version: structuredClone(v),
        createdAt: time,
        mode,
      };
    };
    if (challenge.id === 'championship') {
      const early = structuredClone(version);
      early.id = id();
      early.program = {
        ...early.program,
        version: 1,
        variables: early.program.variables.map((v) =>
          v.name === 'RETURN' ? { ...v, value: '90' } : v,
        ),
      };
      trials.push(run(early, 'practice'));
    }
    const trial = run(version, 'practice');
    if (!trial.completedMission)
      throw new Error(`${challenge.title} example failed: ${trial.stoppedReason}`);
    trials.push(trial);
    const reflection =
      challenge.id === 'championship'
        ? 'Trial 1 delivered both packages but stopped 20 cm east of the dock. RETURN was 90, repeated twice. Changing RETURN to 100 added 20 cm without changing the successful delivery route. The next trial reached the dock with no collisions.'
        : 'I compared the measured endpoint with the target and used the grid and calculations to check my command values. The completed trial supports this route.';
    drafts[challenge.id] = {
      ...drafts[challenge.id],
      program: currentProgram,
      prediction,
      diagnosis:
        challenge.id === 'championship'
          ? 'The final loop repeated a return distance that was 10 cm too short. Two repeats made a 20 cm error.'
          : 'Use the trial to check the target, heading, and distance.',
      reflection,
      completedAt: time,
      ...(challenge.id === 'championship' ? { lockedVersionId: version.id } : {}),
    };
    if (challenge.id === 'championship') {
      versions.push(version);
      trials.push(run(version, 'championship'));
    }
  }
  return {
    ...base,
    revision: 30,
    selectedChallengeId: 'championship',
    drafts,
    math,
    trials,
    versions,
    measuredDistancePerRotation: '24',
    measuredTurnRate: '45',
    measurementExplanation:
      'The wheel circumference is 8 × 3.14 = 25.12 cm. My one-rotation trial moved 24 cm, so I used measured travel for parking. A quarter turn took 2 seconds, giving 90 ÷ 2 = 45 degrees per second.',
    defense:
      'My route keeps the robot outside the storage rack and carries only one package at a time. Variables make each measured distance visible, and repeats express equal route segments. My 54-second prediction includes slower loaded travel and four cargo actions. The saved failed trial identifies the return variable as the cause of the stopping error; revising that variable produces the final successful route.',
    championship: {
      revealed: true,
      practiceOpen: false,
      practiceLimit: 3,
      paused: true,
      showStandings: true,
      finalized: true,
      queue: versions.map((v) => v.id),
    },
    audit: [
      {
        id: id(),
        action: 'program.locked',
        reason: 'The example engineer confirmed the tested second version.',
        timestamp: time,
      },
      {
        id: id(),
        action: 'championship.finalized',
        reason: 'The example rehearsal result was reviewed and finalized.',
        timestamp: time,
      },
    ],
  };
}
export const robotSampleGuide: SampleGuide = {
  title: 'Two packages. One tested program.',
  subtitle: 'Robot Delivery Code Lab · completed engineering portfolio',
  audience: 'Classroom engineering review',
  duration: '3–5 minute walkthrough',
  trail: [
    {
      label: 'CALIBRATE',
      title: 'Use measured travel',
      text: 'Alex calculated a 25.12 cm circumference and measured 24 cm per rotation. The measured value made the parking code accurate.',
      evidence: 'A 120 cm target requires 5 measured rotations.',
    },
    {
      label: 'DEBUG',
      title: 'Compare the original and revised routes',
      text: 'The first championship trial stopped 20 cm short on the return. Changing RETURN from 90 to 100 fixed both repeated segments.',
      evidence: 'Open Trials & portfolio to replay and compare the saved versions.',
    },
    {
      label: 'DEFEND',
      title: 'Connect the program to the evidence',
      text: 'The final replay delivers A and B, avoids the rack, and returns to the dock. The locked code and calculations remain available for review.',
      evidence: 'Performance points and individual math evidence are shown separately.',
    },
  ],
  review: {
    strength: 'One variable change explains the improvement between preserved trials.',
    question: 'How would the predicted time change if the robot carried a heavier package?',
    revision: 'Test a different loaded speed and compare the prediction with a new measurement.',
    assessment:
      'Use the calculation explanations, debugging comparison, and engineering defense to assess learning separately from the performance score.',
  },
};
