import type { ProjectIntroConfig } from '../../shared/project-intro/project-intro.models';
export const robotDeliveryIntro: ProjectIntroConfig = {
  capabilityId: 'project.intro',
  schemaVersion: '1.0',
  projectId: 'robot-delivery-code-lab',
  version: '1.0.0',
  theme: 'robotics',
  image: '/robot-delivery/mission-control.svg',
  imageAlt:
    'A teal delivery robot follows a measured route between packages and parking bays on a warehouse grid.',
  kicker: 'Engineering dispatch · Your robot is waiting.',
  headline: 'The delivery is urgent. The robot needs your instructions.',
  story:
    'A busy warehouse needs a new delivery robot. It can move, turn, and carry a package—but it cannot plan its own route. You are the engineer who turns measurements into commands it can trust.',
  hook: 'How can you prove your robot will stop in exactly the right place?',
  role: 'Robot programmer & test engineer',
  challenge: {
    title: 'One delivery. One decision.',
    context:
      'Your robot travels 24 centimeters in one wheel rotation. A package is 72 centimeters straight ahead. What should you investigate first?',
    options: [
      {
        id: 'calculate',
        label: 'Calculate the number of rotations.',
        detail: 'Connect distance to a measured wheel rotation.',
        feedback:
          'You can divide the target distance by the travel per rotation, then test whether the robot reaches your prediction.',
      },
      {
        id: 'guess',
        label: 'Try a command and watch carefully.',
        detail: 'Use a trial to begin gathering evidence.',
        feedback:
          'A trial can give useful measurements. Record what happens, then use the numbers to make your next command more precise.',
      },
    ],
    takeaway:
      'Strong engineers combine calculations with tests. Neither a lucky guess nor an unchecked formula is enough.',
  },
  decision: {
    prompt: 'What will your first engineering priority be?',
    options: [
      { id: 'precision', label: 'Precision', detail: 'Stop close to the target every time.' },
      {
        id: 'efficiency',
        label: 'Efficiency',
        detail: 'Deliver packages with fewer turns and less battery.',
      },
      {
        id: 'reliability',
        label: 'Reliability',
        detail: 'Write a clear program that works across several routes.',
      },
    ],
    reasonPrompt: 'Why does this priority matter?',
    reasonHint: 'Connect your choice to a delivery problem.',
    questionPrompt: 'What do you need to find out about the robot?',
    questionHint: 'Think about wheel travel, turn rate, cargo, or the course.',
  },
  mission: [
    'Measure and calibrate the robot in eight training missions.',
    'Use fractions, variables, and loops to build and improve your program.',
    'Lock a tested championship design and defend it with your engineering portfolio.',
  ],
  action: 'Enter mission control',
  finalExample: {
    button: 'Explore a finished robot project',
    format: 'Working program, replay & engineering portfolio',
    title: 'A delivery program backed by evidence',
    introduction:
      'Explore a fictional student’s complete route. Replay two package deliveries, inspect the commands and calculations, and compare the trial that failed with the revision that worked.',
    chapters: [
      {
        label: '01 · Measure',
        title: 'Calibrate before coding',
        studentWork: 'The engineer compares theoretical wheel circumference with measured travel.',
        evidence: '8 × 3.14 = 25.12 cm around the wheel; a test gives 24 cm of actual travel.',
        teacherNote: 'Look for a clear distinction between a geometric model and a measurement.',
      },
      {
        label: '02 · Improve',
        title: 'Use a failed trial',
        studentWork:
          'A short final leg leaves the robot away from the dock. The engineer changes one variable.',
        evidence: 'Saved versions keep the original program and route for a fair comparison.',
        teacherNote: 'Ask which change explains the improved stopping error.',
      },
      {
        label: '03 · Defend',
        title: 'Deliver and explain',
        studentWork:
          'The final program delivers both packages, avoids the rack, and returns to the dock.',
        evidence:
          'A locked version includes code, predictions, math evidence, and an autonomous replay.',
        teacherNote: 'Assess the reasoning separately from the robot’s performance score.',
      },
    ],
    lookFors: [
      'Calculations connected to code',
      'A reproducible test and revision',
      'A clear explanation of why the design works',
    ],
  },
};
