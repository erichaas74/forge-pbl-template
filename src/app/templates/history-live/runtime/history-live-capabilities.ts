import { EventRegistry, CapabilityRegistry } from '../../../core/registries/specialized-registries';
import { Registry } from '../../../core/registries/registry';

export const historyLiveEventIds = [
  'audience.reacted',
  'broadcast.ended',
  'broadcast.held',
  'broadcast.nextTaken',
  'broadcast.previousTaken',
  'broadcast.started',
  'claim.created',
  'claim.draftChanged',
  'claim.removed',
  'network.selected',
  'package.reviewed',
  'package.submitted',
  'pitch.draftChanged',
  'pitch.formatChanged',
  'pitch.reopened',
  'pitch.reviewed',
  'pitch.submitted',
  'production.sceneChanged',
  'recording.saved',
  'reflection.draftChanged',
  'reflection.revised',
  'schedule.reordered',
  'script.blockAdded',
  'script.blockRemoved',
  'script.blockTypeChanged',
  'script.claimLinked',
  'script.draftChanged',
  'source.closed',
  'source.opened',
  'source.removed',
  'source.saved',
  'story.claimed',
  'story.customPitchStarted',
  'transcript.draftChanged',
  'viewer.roleChanged',
  'workflow.stageOpened',
] as const;
export type HistoryLiveEventType = (typeof historyLiveEventIds)[number];
export const historyLiveEvents = new EventRegistry();
historyLiveEvents.registerAll(
  historyLiveEventIds.map((id) => ({ id, version: '1.1', status: 'extension' })),
);
export const historyLiveCommands = new Registry<{ id: string; producerOnly: boolean }>(
  'history-live-commands',
);
historyLiveCommands.registerAll([
  { id: 'broadcast.end', producerOnly: true },
  { id: 'broadcast.hold', producerOnly: true },
  { id: 'broadcast.next', producerOnly: true },
  { id: 'broadcast.previous', producerOnly: true },
  { id: 'broadcast.start', producerOnly: true },
  { id: 'package.review', producerOnly: true },
  { id: 'package.submit', producerOnly: false },
  { id: 'pitch.reopen', producerOnly: true },
  { id: 'pitch.review', producerOnly: true },
  { id: 'pitch.submit', producerOnly: false },
  { id: 'schedule.reorder', producerOnly: true },
]);
export const historyLiveCapabilities = new CapabilityRegistry();
historyLiveCapabilities.register({
  id: 'history-live.editorial-workflow',
  version: '1.1',
  status: 'extension',
  eventsProduced: historyLiveEventIds,
  actionsSupported: historyLiveCommands.list().map((command) => `history-live.${command.id}`),
});
