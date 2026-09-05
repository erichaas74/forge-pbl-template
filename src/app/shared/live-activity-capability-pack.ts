import type { CapabilityRegistry } from '../core/registries/specialized-registries';
import type { CapabilityRegistration } from '../core/registries/registration-contracts';

export const liveActivityCapabilityIds = [
  'liveSession',
  'resourceAccounts',
  'multiPartyExchange',
  'challengeGates',
  'scenarioScheduler',
  'awardLedger',
  'activityEvidenceBridge',
  'summaryProjection',
] as const;

export type LiveActivityCapabilityId = (typeof liveActivityCapabilityIds)[number];

const registrations: readonly CapabilityRegistration[] = [
  {
    id: 'liveSession',
    version: '1.0.0',
    status: 'future',
    eventsProduced: ['liveSession.started', 'liveSession.paused', 'liveSession.finalized'],
    actionsSupported: ['liveSession.start', 'liveSession.pause', 'liveSession.finalize'],
  },
  {
    id: 'resourceAccounts',
    version: '1.0.0',
    status: 'future',
    eventsProduced: ['resourceAccount.transactionCommitted'],
    actionsSupported: ['resourceAccount.commitTransaction'],
  },
  {
    id: 'multiPartyExchange',
    version: '1.0.0',
    status: 'future',
    eventsProduced: ['exchange.quoteReserved', 'exchange.tradeCommitted'],
    actionsSupported: ['exchange.reserveQuote', 'exchange.approveQuote', 'exchange.settleQuote'],
  },
  {
    id: 'challengeGates',
    version: '1.0.0',
    status: 'future',
    eventsProduced: ['challenge.attemptEvaluated'],
    actionsSupported: ['challenge.submitAttempt'],
  },
  {
    id: 'scenarioScheduler',
    version: '1.0.0',
    status: 'future',
    eventsProduced: ['scenario.eventReleased'],
    actionsSupported: ['scenario.releaseScheduledEvent'],
  },
  {
    id: 'awardLedger',
    version: '1.0.0',
    status: 'future',
    eventsProduced: ['award.recorded'],
    actionsSupported: ['award.apply'],
  },
  {
    id: 'activityEvidenceBridge',
    version: '1.0.0',
    status: 'future',
    eventsProduced: ['activityEvidence.referenceCreated'],
    actionsSupported: ['activityEvidence.createReference'],
  },
  {
    id: 'summaryProjection',
    version: '1.0.0',
    status: 'future',
    eventsProduced: ['summaryProjection.updated'],
  },
];

export function registerLiveActivityCapabilityContracts(registry: CapabilityRegistry): void {
  registry.registerAll(registrations);
}
