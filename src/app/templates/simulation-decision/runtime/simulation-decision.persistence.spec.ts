import { createSimulationState } from '../domain/simulation-decision.engine';
import { frontierTradingConfig } from '../../../projects/frontier-trading/frontier-trading.config';
import { MemorySimulationDecisionPersistenceAdapter } from './simulation-decision.persistence';

describe('simulation decision persistence boundary', () => {
  it('round-trips a state snapshot without sharing mutable references', () => {
    const adapter = new MemorySimulationDecisionPersistenceAdapter();
    const state = createSimulationState(frontierTradingConfig, 321);

    adapter.save(state);
    const loaded = adapter.load(
      frontierTradingConfig.projectId,
      frontierTradingConfig.projectVersion,
    );

    expect(loaded).toEqual(state);
    expect(loaded).not.toBe(state);
  });

  it('does not load state for a different project version and can clear the snapshot', () => {
    const adapter = new MemorySimulationDecisionPersistenceAdapter();
    adapter.save(createSimulationState(frontierTradingConfig));

    expect(adapter.load(frontierTradingConfig.projectId, 'other-version')).toBeUndefined();
    adapter.clear();
    expect(
      adapter.load(frontierTradingConfig.projectId, frontierTradingConfig.projectVersion),
    ).toBeUndefined();
  });
});
