import { firstValueFrom, take, toArray } from 'rxjs';

import type { JourneyAuthorityLocator } from '../../templates/journey-replay/persistence/journey-replay.authority';
import { HttpJourneyReplayAuthorityAdapter, JourneyAuthorityHttpError } from './http-journey-replay.adapters';

const locator: JourneyAuthorityLocator = {
  tenantId: 'school',
  classId: 'class-a',
  classLabel: 'World History',
  projectId: 'journey',
  projectVersion: '1.0',
};

describe('HttpJourneyReplayAuthorityAdapter', () => {
  it('uses one class projection poll and deduplicates unchanged revisions', async () => {
    const revisions = [1, 1, 2];
    const fetcher = vi.fn(async () =>
      Response.json({
        classId: 'class-a',
        classLabel: 'World History',
        projectId: 'journey',
        projectVersion: '1.0',
        generatedAt: '2026-09-04T00:00:00.000Z',
        revision: revisions.shift() ?? 2,
        members: [],
      }),
    );
    const adapter = new HttpJourneyReplayAuthorityAdapter('/api/journey', fetcher as typeof fetch, 1);
    const observed = await firstValueFrom(adapter.classSummary(locator).pipe(take(2), toArray()));

    expect(observed.map((summary) => summary.revision)).toEqual([1, 2]);
    expect(fetcher).toHaveBeenCalledTimes(3);
  });

  it('returns undefined for a missing authoritative record', async () => {
    const adapter = new HttpJourneyReplayAuthorityAdapter(
      '/api/journey',
      (async () => Response.json({ error: 'NOT_FOUND' }, { status: 404 })) as typeof fetch,
    );

    await expect(adapter.loadRecord(locator)).resolves.toBeUndefined();
  });

  it('surfaces authorization failures without silently falling back', async () => {
    const adapter = new HttpJourneyReplayAuthorityAdapter(
      '/api/journey',
      (async () => Response.json({ error: 'AUTHENTICATION_REQUIRED' }, { status: 401 })) as typeof fetch,
    );

    await expect(adapter.openSession(locator, {
      tenantId: 'school',
      classId: 'class-a',
      classLabel: 'World History',
      studentId: 'hint',
      studentDisplayName: 'Learner',
      mode: 'student',
    })).rejects.toBeInstanceOf(JourneyAuthorityHttpError);
  });
});
