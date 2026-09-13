import type { CommandType } from '../domain/automation.models';

export const commandLabels: Record<CommandType, string> = {
  'move-distance': 'Move distance', 'move-rotations': 'Move rotations',
  'turn-degrees': 'Turn degrees', 'turn-fraction': 'Turn fraction',
  wait: 'Wait', 'pick-up': 'Pick up', 'drop-off': 'Drop off', repeat: 'Repeat',
};
export const commandDescriptions: Record<CommandType, string> = {
  'move-distance': 'Drive forward a distance in centimeters.',
  'move-rotations': 'Drive forward by spinning the wheels.',
  'turn-degrees': 'Turn left or right by an angle.',
  'turn-fraction': 'Turn left or right by part of a full circle.',
  wait: 'Pause before the next block.',
  'pick-up': 'Collect a package at the robot’s position.',
  'drop-off': 'Deliver a package to its matching zone.',
  repeat: 'Run the blocks inside a set number of times.',
};
export const commandGroups: readonly { id: string; label: string; types: readonly CommandType[] }[] = [
  { id: 'motion', label: 'Motion', types: ['move-distance', 'move-rotations'] },
  { id: 'turning', label: 'Turning', types: ['turn-degrees', 'turn-fraction'] },
  { id: 'cargo', label: 'Cargo', types: ['pick-up', 'drop-off'] },
  { id: 'control', label: 'Control', types: ['repeat', 'wait'] },
];
