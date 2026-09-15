import type { AutomationPreviewWeek } from '../../templates/programming-automation/domain/automation.models';

/** Authoring content: proposed assessment, not a connected tutor or a completion record. */
export const robotDeliveryWeeks: readonly AutomationPreviewWeek[] = [
  {
    week: 1,
    title: 'Precision driving',
    setting: 'Test track · learn your robot’s movement, then take the corner.',
    sessions: [
      {
        challengeId: 'precision-parking',
        product: 'A parking program tested at different target distances.',
      },
      {
        challengeId: 'turn-training',
        product: 'An L-shaped driving program that clears the barrier and parks facing east.',
      },
    ],
    questions: [
      'What distance does one wheel rotation produce? How do your trials support that estimate?',
      'How would you change the program for a target twice as far away, or halfway there?',
      'What fraction of a full turn points the robot east? Why did your first turn miss?',
      'How does measured wheel travel compare with π × wheel diameter, and why might they differ?',
    ],
    evidence: [
      'Target distance, movement operands, and recorded path.',
      'Before/after programs, stopping error, heading, and wheel calibration trials.',
    ],
    adjustments: [
      'Target distance and parking tolerance.',
      'Wheel travel, turn rate, block operands, and hints.',
    ],
  },
  {
    week: 2,
    title: 'Warehouse automation',
    setting: 'Sorting depot · turn repeated routes into reusable code.',
    sessions: [
      {
        challengeId: 'variable-upgrade',
        product: 'A route controlled by a named SIDE variable that works at two sizes.',
        starterVariables: [{ id: 'side', name: 'SIDE', value: '75', unit: 'cm' }],
        starterCommands: [
          { id: 'first-side', type: 'move-distance', value: 'SIDE' },
          { id: 'corner', type: 'turn-degrees', value: '90' },
          { id: 'second-side', type: 'move-distance', value: 'SIDE' },
        ],
      },
      {
        challengeId: 'warehouse-pattern',
        product:
          'A repeat-loop patrol visiting all warehouse checkpoints and returning to its start.',
        starterCommands: [
          {
            id: 'patrol-loop',
            type: 'repeat',
            value: '3',
            commands: [
              {
                id: 'side',
                type: 'move-distance',
                value: '2',
                moveMath: { given: 200, operation: 'divide' },
              },
              { id: 'corner', type: 'turn-degrees', value: '90' },
            ],
          },
        ],
      },
    ],
    questions: [
      'Which measurements change when the route grows? Which instructions can stay the same?',
      'What does SIDE represent, and where does your program use it?',
      'Which blocks repeat? How many repetitions close the route, and why?',
      'How can you prove every checkpoint was visited instead of only checking the final position?',
    ],
    evidence: [
      'Variable definitions and program versions for both route sizes.',
      'Loop contents, checkpoint visits, total distance, and replay trace.',
    ],
    adjustments: [
      'Route size, checkpoint positions, and available blocks.',
      'Loop challenge, command budget, and scaffolding.',
    ],
  },
  {
    week: 3,
    title: 'Cross the moving city',
    setting: 'Transit corridor · time your journey through patrols and sliding gates.',
    sessions: [
      {
        challengeId: 'patrol-crossing',
        product: 'A timed crossing program that avoids the moving scout.',
        starterCommands: [
          { id: 'wait', type: 'wait', value: '0' },
          {
            id: 'cross',
            type: 'move-distance',
            value: '7',
            moveMath: { given: 40, operation: 'multiply' },
          },
        ],
      },
      {
        challengeId: 'moving-gates',
        product: 'A two-stage route through a scout crossing and a sliding gate.',
        starterCommands: [
          { id: 'wait', type: 'wait', value: '0' },
          {
            id: 'north',
            type: 'move-distance',
            value: '7',
            moveMath: { given: 40, operation: 'multiply' },
          },
          { id: 'turn', type: 'turn-degrees', value: '90' },
          {
            id: 'east',
            type: 'move-distance',
            value: '6',
            moveMath: { given: 40, operation: 'multiply' },
          },
        ],
      },
    ],
    questions: [
      'Where will the scout be when your robot reaches the crossing? Use distance, speed, and time.',
      'How does adding WAIT change the crossing without changing the route?',
      'Which collision did your revision prevent? Compare the two timelines.',
      'If the gate pauses for a different duration, which part of the program needs to change?',
    ],
    evidence: [
      'WAIT durations, movement speeds, collision events, and actor positions at the crossing.',
      'Earlier and revised trial timelines, turns, and final heading.',
    ],
    adjustments: [
      'Patrol speed, route, starting phase, and gate pause duration.',
      'Robot speed, obstacles, available hints, and timing difficulty.',
    ],
  },
  {
    week: 4,
    title: 'Delivery finals',
    setting: 'Cargo terminal · carry the load, then take on the full delivery circuit.',
    sessions: [
      {
        challengeId: 'cargo-delivery',
        product:
          'A heavy-cargo delivery program with a tested pickup, drop-off, and parking route.',
        starterCommands: [
          {
            id: 'approach',
            type: 'move-distance',
            value: '4',
            moveMath: { given: 25, operation: 'multiply' },
          },
          { id: 'pickup', type: 'pick-up', value: '', packageId: 'parcel-a' },
          {
            id: 'north',
            type: 'move-distance',
            value: '2',
            moveMath: { given: 25, operation: 'multiply' },
          },
          { id: 'turn', type: 'turn-degrees', value: '90' },
          {
            id: 'east',
            type: 'move-distance',
            value: '6',
            moveMath: { given: 25, operation: 'multiply' },
          },
          { id: 'drop', type: 'drop-off', value: '', packageId: 'parcel-a' },
        ],
      },
      {
        challengeId: 'championship',
        product:
          'A final autonomous program delivering both parcels and returning to the start dock.',
        starterCommands: [
          { id: 'approach', type: 'move-distance', value: '100' },
          { id: 'pickup', type: 'pick-up', value: '', packageId: 'parcel-a' },
          { id: 'north', type: 'move-distance', value: '100' },
          { id: 'turn', type: 'turn-degrees', value: '90' },
          { id: 'east', type: 'move-distance', value: '100' },
          { id: 'drop', type: 'drop-off', value: '', packageId: 'parcel-a' },
        ],
      },
    ],
    questions: [
      'How does carrying cargo change travel time? Which evidence supports your prediction?',
      'Why does your route deliver each parcel to the correct zone without hitting the rack?',
      'What tradeoff did you make between distance, turns, battery use, and reliability?',
      'Which test led to your most useful revision? How would your program adapt to a relocated delivery zone?',
    ],
    evidence: [
      'Pickup/drop-off events, carried load, travel time, battery use, and collisions.',
      'Final code, earlier revisions, both deliveries, return position, and repeat trials.',
    ],
    adjustments: [
      'Cargo weight effects, pickup locations, delivery zones, and robot capacity.',
      'Battery budget, course geometry, difficulty, and all available model settings.',
    ],
  },
];
