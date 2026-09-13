import type {
  MuseumPublicationScope,
  PublishedMuseumRoom,
} from '../../src/app/templates/exhibit-hall/rooms/museum-publication';
import { museumScopeKey } from '../../src/app/templates/exhibit-hall/rooms/museum-publication';
import { MuseumApiError } from './museum-policy';

export interface MuseumSqlStatement {
  bind(...values: unknown[]): MuseumSqlStatement;
  first<T>(): Promise<T | null>;
  all<T>(): Promise<{ readonly results?: readonly T[] }>;
  run(): Promise<{ readonly success: boolean; readonly meta?: { readonly changes?: number } }>;
}
export interface MuseumDatabase {
  prepare(query: string): MuseumSqlStatement;
}
export interface MuseumEnrollment {
  readonly team_id: string;
  readonly role: 'student' | 'teacher';
  readonly room_id: string;
  readonly room_label: string;
  readonly layout_id: string;
  readonly position: number;
  readonly curator_name: string;
  readonly submission_locked: number;
  readonly collection_open: number;
}
interface PublicationRow {
  readonly publication_json: string;
  readonly operation_id: string;
  readonly content_hash: string;
}

export class MuseumRepository {
  constructor(private readonly db: MuseumDatabase) {}
  async enrollment(scope: MuseumPublicationScope, actorId: string): Promise<MuseumEnrollment> {
    const row = await this.db
      .prepare(
        `SELECT m.role, a.team_id, a.room_id, a.room_label, a.layout_id, a.position, a.curator_name, c.submission_locked, c.collection_open
      FROM museum_memberships m JOIN museum_classes c ON c.scope_key = m.scope_key
      JOIN museum_assignments a ON a.scope_key = m.scope_key AND a.team_id = m.team_id
      WHERE m.scope_key = ? AND m.actor_id = ?`,
      )
      .bind(museumScopeKey(scope), actorId)
      .first<MuseumEnrollment>();
    if (!row) throw new MuseumApiError(403, 'MUSEUM_ENROLLMENT_REQUIRED');
    return row;
  }
  async own(scope: MuseumPublicationScope, roomId: string): Promise<PublicationRow | undefined> {
    return (
      (await this.db
        .prepare(
          'SELECT publication_json, operation_id, content_hash FROM museum_publications WHERE scope_key = ? AND room_id = ?',
        )
        .bind(museumScopeKey(scope), roomId)
        .first<PublicationRow>()) ?? undefined
    );
  }
  async publish(
    scope: MuseumPublicationScope,
    actorId: string,
    operationId: string,
    contentHash: string,
    publication: PublishedMuseumRoom,
  ): Promise<PublishedMuseumRoom> {
    const scopeKey = museumScopeKey(scope);
    // One statement atomically checks the live lock, membership and assignment, and
    // creates the immutable room. There is no separate idempotency claim to strand.
    const result = await this.db
      .prepare(
        `INSERT INTO museum_publications
      (scope_key, room_id, team_id, submitted_by, operation_id, content_hash, publication_json, submitted_at)
      SELECT a.scope_key, a.room_id, a.team_id, m.actor_id, ?, ?, ?, ?
      FROM museum_assignments a JOIN museum_classes c ON c.scope_key = a.scope_key
      JOIN museum_memberships m ON m.scope_key = a.scope_key AND m.team_id = a.team_id
      WHERE a.scope_key = ? AND a.room_id = ? AND a.team_id = ? AND a.layout_id = ?
        AND m.actor_id = ? AND m.role = 'student' AND c.submission_locked = 0
      ON CONFLICT DO NOTHING`,
      )
      .bind(
        operationId,
        contentHash,
        JSON.stringify(publication),
        publication.submittedAt,
        scopeKey,
        publication.room.roomId,
        publication.teamId,
        publication.room.layoutId,
        actorId,
      )
      .run();
    if (!result.success) throw new MuseumApiError(503, 'MUSEUM_SAVE_FAILED');
    const saved = await this.own(scope, publication.room.roomId);
    if (saved?.operation_id === operationId && saved.content_hash === contentHash)
      return JSON.parse(saved.publication_json) as PublishedMuseumRoom;
    if (saved) throw new MuseumApiError(409, 'MUSEUM_ROOM_ALREADY_SUBMITTED');
    throw new MuseumApiError(409, 'MUSEUM_ASSIGNMENT_OR_LOCK_CHANGED');
  }
  async collection(scope: MuseumPublicationScope): Promise<readonly PublishedMuseumRoom[]> {
    const rows = await this.db
      .prepare(
        `SELECT p.publication_json FROM museum_publications p
      JOIN museum_assignments a ON a.scope_key = p.scope_key AND a.room_id = p.room_id
      WHERE p.scope_key = ? ORDER BY a.position, a.room_id LIMIT 500`,
      )
      .bind(museumScopeKey(scope))
      .all<PublicationRow>();
    return (rows.results ?? []).map(
      (row) => JSON.parse(row.publication_json) as PublishedMuseumRoom,
    );
  }
}
