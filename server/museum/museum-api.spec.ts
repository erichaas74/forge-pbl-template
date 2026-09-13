import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { DatabaseSync } from 'node:sqlite';
import { readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';
import worker from '../index';
import { HttpMuseumPublicationAdapter } from '../../src/app/infrastructure/exhibit-hall/http-museum-publication.adapter';
import { handleMuseumRequest, type MuseumApiDependencies } from './museum-api';
import type { MuseumDatabase, MuseumSqlStatement } from './museum-repository';
import { museumProjectPolicies } from '../config/museum-project-policies';
import { studentMuseumConfig as config } from '../../src/app/projects/class-exhibit-hall/student-museum.config';
import {
  museumScopeKey,
  type MuseumPublicationScope,
  type MuseumRoomContent,
} from '../../src/app/templates/exhibit-hall/rooms/museum-publication';

describe('shared museum API with real SQLite statements', () => {
  const scope: MuseumPublicationScope = {
    tenantId: 'school',
    classId: 'class-a',
    projectId: config.projectId,
    projectVersion: config.projectVersion,
    museumId: 'museum-a',
  };
  const key = museumScopeKey(scope);
  let db: DatabaseSync;
  let dbPath: string;
  function database(beforePrepare?: (query: string) => void): MuseumDatabase {
    return {
      prepare(query) {
        beforePrepare?.(query);
        let args: unknown[] = [];
        const statement: MuseumSqlStatement = {
          bind(...values) {
            args = values;
            return statement;
          },
          async first<T>() {
            return (db.prepare(query).get(...(args as never[])) as T) ?? null;
          },
          async all<T>() {
            return { results: db.prepare(query).all(...(args as never[])) as T[] };
          },
          async run() {
            const result = db.prepare(query).run(...(args as never[]));
            return { success: true, meta: { changes: Number(result.changes) } };
          },
        };
        return statement;
      },
    };
  }
  function content(roomId = 'alcove-01', objectId = 'nefertiti'): MuseumRoomContent {
    return {
      roomId,
      layoutId: 'classic-museum-room-v1',
      title: 'Objects and identity',
      introduction: 'Look closely at form and the ideas that it expresses.',
      displays: [
        {
          slotId: 'display-1',
          objectId,
          title: 'A royal portrait',
          label: 'A tall crown and carefully shaped face.',
          connection: 'Its form raises questions about royal identity.',
        },
      ],
    };
  }
  function call(
    path: string,
    actorId = 'student-a',
    body?: unknown,
    overrides: Partial<MuseumApiDependencies> = {},
  ) {
    return handleMuseumRequest(
      new Request(
        'https://school.test/api/museum' +
          path +
          (body ? '' : '?' + new URLSearchParams({ ...scope })),
        {
          method: body ? 'POST' : 'GET',
          headers: body
            ? { 'content-type': 'application/json', origin: 'https://school.test' }
            : {},
          ...(body ? { body: JSON.stringify(body) } : {}),
        },
      ),
      {
        db: database(),
        policies: museumProjectPolicies,
        authenticate: () => actorId,
        ...overrides,
      },
    );
  }
  const submit = (actor = 'student-a', room = 'alcove-01', operationId = 'operation-a') =>
    call('/submissions', actor, { scope, operationId, content: content(room) });
  beforeEach(() => {
    dbPath = join(tmpdir(), 'museum-test-' + randomUUID() + '.sqlite');
    db = new DatabaseSync(dbPath);
    db.exec(
      readFileSync(
        new URL('../../drizzle/0001_skinny_doctor_octopus.sql', import.meta.url),
        'utf8',
      ),
    );
    db.prepare('INSERT INTO museum_classes VALUES (?, 0, 1)').run(key);
    for (const [index, actor] of ['student-a', 'student-b'].entries()) {
      const room = config.museum!.rooms[index];
      db.prepare('INSERT INTO museum_assignments VALUES (?, ?, ?, ?, ?, ?, ?)').run(
        key,
        room.roomId,
        'team-' + index,
        room.label,
        room.layoutId,
        index,
        'Curators ' + index,
      );
      db.prepare('INSERT INTO museum_memberships VALUES (?, ?, ?, ?)').run(
        key,
        actor,
        'team-' + index,
        'student',
      );
    }
  });
  afterEach(() => {
    db.close();
    rmSync(dbPath, { force: true });
  });
  it('requires trusted authentication and existing scoped membership; bodies cannot self-enroll', async () => {
    expect((await call('/session', '')).status).toBe(401);
    expect((await call('/session', 'outsider')).status).toBe(403);
    const spoofed = await call('/submissions', 'outsider', {
      scope,
      actorId: 'student-a',
      role: 'teacher',
      operationId: 'fake',
      content: content(),
    });
    expect(spoofed.status).toBe(403);
    const foreignClass = await call('/submissions', 'student-a', {
      scope: { ...scope, classId: 'class-b' },
      operationId: 'fake',
      content: content(),
    });
    expect(foreignClass.status).toBe(403);
  });
  it('keeps the Worker route disabled until trusted authentication ingress is configured', async () => {
    const response = await worker.fetch(
      new Request('https://school.test/api/museum/session', {
        headers: {
          'oai-authenticated-user-id': 'student-a',
          'oai-authenticated-user-email': 'spoofed@example.test',
        },
      }),
      {} as never,
    );
    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ error: 'MUSEUM_AUTH_NOT_CONFIGURED' });
  });
  it('serves two independent HTTP adapter clients from the same publication store', async () => {
    const adapterFor = (actorId: string) =>
      new HttpMuseumPublicationAdapter('https://school.test/api/museum', ((
        input: RequestInfo | URL,
        init?: RequestInit,
      ) =>
        handleMuseumRequest(new Request(input, init), {
          db: database(),
          policies: museumProjectPolicies,
          authenticate: () => actorId,
        })) as typeof fetch);
    const studentA = adapterFor('student-a'),
      studentB = adapterFor('student-b');
    expect((await studentA.openSession(scope)).room.roomId).toBe('alcove-01');
    await studentA.publish({ scope, operationId: 'http-a', content: content() });
    await studentB.publish({ scope, operationId: 'http-b', content: content('alcove-02') });
    expect((await studentA.loadCollection(scope)).map((room) => room.room.roomId)).toEqual([
      'alcove-01',
      'alcove-02',
    ]);
  });
  it('returns only the student’s assignment and no other student drafts', async () => {
    const session = await (await call('/session')).json();
    expect(session.room.roomId).toBe('alcove-01');
    expect(session.actorId).toBe('student-a');
    expect(session.publishedRoom).toBeUndefined();
    expect((await (await call('/collection')).json()).rooms).toEqual([]);
  });
  it('rebuilds sources, model URLs and curator credit from trusted records', async () => {
    const response = await call('/submissions', 'student-a', {
      scope,
      operationId: 'one',
      content: {
        ...content(),
        teamCredit: { displayName: 'Spoofed' },
        displays: [
          {
            ...content().displays[0],
            model: { src: 'https://untrusted.test/model.glb' },
            sourceIds: [],
          },
        ],
      },
    });
    expect(response.status).toBe(200);
    const published = await response.json();
    expect(published.board.objects[0].model.src).toBe(config.museum!.catalog.objects[0].model!.src);
    expect(published.board.sources.length).toBeGreaterThan(0);
    expect(published.board.teamCredit.displayName).toBe('Curators 0');
    expect(published.board.immersiveGallery).toBeUndefined();
    expect(published.submittedBy).toBeUndefined();
  });
  it('rejects other rooms, unknown objects, duplicate slots, and incomplete or oversized labels', async () => {
    expect((await submit('student-a', 'alcove-02')).status).toBe(403);
    const invalids = [
      { ...content(), displays: [{ ...content().displays[0], objectId: 'unknown' }] },
      { ...content(), displays: [...content().displays, ...content().displays] },
      { ...content(), title: 'word '.repeat(13) },
      { ...content(), displays: [{ ...content().displays[0], label: '' }] },
    ];
    for (const invalid of invalids)
      expect(
        (await call('/submissions', 'student-a', { scope, operationId: 'one', content: invalid }))
          .status,
      ).toBe(422);
    expect(
      (
        await call('/submissions', 'student-a', {
          scope,
          operationId: 'one',
          content: { ...content(), introduction: 'x'.repeat(40_000) },
        })
      ).status,
    ).toBe(413);
    expect(db.prepare('SELECT * FROM museum_publications').all()).toHaveLength(0);
  });
  it('lets independent student clients publish separate rooms without overwriting each other', async () => {
    const responses = await Promise.all([
      submit(),
      submit('student-b', 'alcove-02', 'operation-b'),
    ]);
    expect(responses.map((response) => response.status)).toEqual([200, 200]);
    const collection = await (await call('/collection')).json();
    expect(collection.rooms.map((room: { room: { roomId: string } }) => room.room.roomId)).toEqual([
      'alcove-01',
      'alcove-02',
    ]);
    expect(
      collection.rooms.every((room: Record<string, unknown>) => !('submitted_by' in room)),
    ).toBe(true);
  });
  it('survives a server restart and returns the same snapshot on an exact retry', async () => {
    const first = await (await submit()).json();
    db.close();
    db = new DatabaseSync(dbPath);
    const again = await (await submit()).json();
    expect(again).toEqual(first);
    expect((await (await call('/session')).json()).publishedRoom).toEqual(first);
    expect(db.prepare('SELECT * FROM museum_publications').all()).toHaveLength(1);
    const changed = await call('/submissions', 'student-a', {
      scope,
      operationId: 'operation-a',
      content: { ...content(), title: 'Different content' },
    });
    expect(changed.status).toBe(409);
  });
  it('allows only one immutable submission when two teammates submit at once', async () => {
    db.prepare('UPDATE museum_memberships SET team_id = ? WHERE actor_id = ?').run(
      'team-0',
      'student-b',
    );
    const results = await Promise.all([submit(), submit('student-b', 'alcove-01', 'operation-b')]);
    expect(results.map((result) => result.status).sort()).toEqual([200, 409]);
    expect(db.prepare('SELECT * FROM museum_publications').all()).toHaveLength(1);
  });
  it.each(['lock', 'membership', 'assignment'])(
    'checks %s again within the publication statement',
    async (change) => {
      const guarded = database((query) => {
        if (!query.startsWith('INSERT INTO museum_publications')) return;
        if (change === 'lock')
          db.prepare('UPDATE museum_classes SET submission_locked = 1 WHERE scope_key = ?').run(
            key,
          );
        else if (change === 'membership')
          db.prepare('DELETE FROM museum_memberships WHERE actor_id = ?').run('student-a');
        else
          db.prepare('UPDATE museum_assignments SET team_id = ? WHERE room_id = ?').run(
            'reassigned',
            'alcove-01',
          );
      });
      const response = await call(
        '/submissions',
        'student-a',
        { scope, operationId: 'one', content: content() },
        { db: guarded },
      );
      expect(response.status).toBe(409);
      expect(db.prepare('SELECT * FROM museum_publications').all()).toHaveLength(0);
    },
  );
  it('honors the final-museum opening flag without losing the student submission', async () => {
    await submit();
    db.prepare('UPDATE museum_classes SET collection_open = 0 WHERE scope_key = ?').run(key);
    expect((await call('/collection')).status).toBe(403);
    expect((await (await call('/session')).json()).publishedRoom.room.roomId).toBe('alcove-01');
  });
  it('does not claim publication after a database failure and can retry', async () => {
    const response = await call(
      '/submissions',
      'student-a',
      { scope, operationId: 'one', content: content() },
      {
        db: database((query) => {
          if (query.startsWith('INSERT INTO museum_publications'))
            throw new Error('Storage unavailable');
        }),
      },
    );
    expect(response.status).toBe(503);
    expect(db.prepare('SELECT * FROM museum_publications').all()).toHaveLength(0);
    expect((await submit()).status).toBe(200);
  });
  it('rejects cross-origin mutation requests', async () => {
    const response = await handleMuseumRequest(
      new Request('https://school.test/api/museum/submissions', {
        method: 'POST',
        headers: { origin: 'https://other.test', 'content-type': 'application/json' },
        body: JSON.stringify({ scope, operationId: 'one', content: content() }),
      }),
      { db: database(), authenticate: () => 'student-a', policies: museumProjectPolicies },
    );
    expect(response.status).toBe(403);
  });
});
