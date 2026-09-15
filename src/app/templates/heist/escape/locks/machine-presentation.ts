import type { MachineChallenge, MachineDefinition } from './machine.models';

export function isBridgeDiorama(definition: MachineDefinition): boolean {
  return definition.presentation?.kind === 'bridge-cage';
}

/** Opted-in scenes own their native controls; all other workshops keep their renderer. */
export function isCageDiorama(stage: MachineChallenge): boolean {
  return (
    (stage.kind === 'timing-wheels' && stage.presentation?.kind === 'timing-cage') ||
    (stage.kind === 'fraction-gear' && stage.presentation?.kind === 'fraction-cage') ||
    (stage.kind === 'reflection' && stage.presentation?.kind === 'optics-cage')
  );
}
