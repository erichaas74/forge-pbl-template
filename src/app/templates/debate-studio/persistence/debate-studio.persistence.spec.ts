import { describe, expect, it, vi } from 'vitest';

import { romanSenateDebateConfig } from '../../../projects/roman-senate-debate/roman-senate-debate.config';
import { createInitialDebateSession } from '../core/debate-studio-state';
import { MemoryDebateSessionAdapter, type DebateSessionLocator } from './debate-studio.persistence';

const locator: DebateSessionLocator = {
  tenantId: 'tenant-test',
  projectId: romanSenateDebateConfig.projectId,
  projectVersion: romanSenateDebateConfig.projectVersion,
  classId: romanSenateDebateConfig.viewer.classId,
  sessionId: romanSenateDebateConfig.sessionId,
};

describe('DebateSessionAdapter contract', () => {
  it('shares mutations with subscribers and de-duplicates retried client events', async () => {
    const adapter = new MemoryDebateSessionAdapter();
    const seed = createInitialDebateSession(romanSenateDebateConfig);
    const connection = await adapter.initialize(locator, seed, {
      displayName: 'Jordan Lee',
      role: 'student',
      factionId: 'republic-defenders',
      joinedAt: '2026-09-04T18:00:00.000Z',
    });
    const listener = vi.fn();
    adapter.subscribe(locator, listener, vi.fn());

    const reducer = vi.fn((session) => ({
      ...session,
      status: 'premiere-ready' as const,
    }));
    const first = await adapter.mutate(locator, seed, 'client-event-1', reducer);
    const retried = await adapter.mutate(locator, seed, 'client-event-1', reducer);

    expect(connection.actorId).toBe('memory-jordan-lee');
    expect(first.revision).toBe(connection.session.revision + 1);
    expect(retried.revision).toBe(first.revision);
    expect(reducer).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenLastCalledWith(
      expect.objectContaining({ revision: first.revision }),
    );
  });
});
