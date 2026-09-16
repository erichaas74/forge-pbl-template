import type { CapabilityRegistry } from '../../../core/registries/specialized-registries';

export const simulationDecisionCapabilityIds = [
  'simulationDecision',
  'markets',
  'routes',
  'scenarioEvents',
  'strategyReport',
  'choiceProgression',
  'transactionMath',
  'roundTripTrading',
] as const;

export function registerSimulationDecisionCapabilities(registry: CapabilityRegistry): void {
  for (const id of simulationDecisionCapabilityIds) {
    registry.register({ id, version: '1.0.0', status: 'core' });
  }
}
