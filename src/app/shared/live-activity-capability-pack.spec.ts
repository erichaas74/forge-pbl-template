import { CapabilityRegistry } from '../core/registries/specialized-registries';
import {
  liveActivityCapabilityIds,
  registerLiveActivityCapabilityContracts,
} from './live-activity-capability-pack';

describe('live activity capability contracts', () => {
  it('registers every approved capability as contract-only future work', () => {
    const registry = new CapabilityRegistry();

    registerLiveActivityCapabilityContracts(registry);

    expect(registry.list().map((registration) => registration.id)).toEqual(
      [...liveActivityCapabilityIds].sort(),
    );
    for (const id of liveActivityCapabilityIds) {
      expect(registry.get(id)).toMatchObject({ id, version: '1.0.0', status: 'future' });
    }
  });
});
