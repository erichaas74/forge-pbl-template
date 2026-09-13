import { integer, primaryKey, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const museumClasses = sqliteTable('museum_classes', {
  scopeKey: text('scope_key').primaryKey(),
  submissionLocked: integer('submission_locked').notNull().default(0),
  collectionOpen: integer('collection_open').notNull().default(0),
});
export const museumAssignments = sqliteTable(
  'museum_assignments',
  {
    scopeKey: text('scope_key')
      .notNull()
      .references(() => museumClasses.scopeKey),
    roomId: text('room_id').notNull(),
    teamId: text('team_id').notNull(),
    roomLabel: text('room_label').notNull(),
    layoutId: text('layout_id').notNull(),
    position: integer('position').notNull(),
    curatorName: text('curator_name').notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.scopeKey, table.roomId] }),
    uniqueIndex('idx_museum_assignment_team').on(table.scopeKey, table.teamId),
    uniqueIndex('idx_museum_assignment_position').on(table.scopeKey, table.position),
  ],
);
export const museumMemberships = sqliteTable(
  'museum_memberships',
  {
    scopeKey: text('scope_key')
      .notNull()
      .references(() => museumClasses.scopeKey),
    actorId: text('actor_id').notNull(),
    teamId: text('team_id').notNull(),
    role: text('role', { enum: ['student', 'teacher'] }).notNull(),
  },
  (table) => [primaryKey({ columns: [table.scopeKey, table.actorId] })],
);
export const museumPublications = sqliteTable(
  'museum_publications',
  {
    scopeKey: text('scope_key')
      .notNull()
      .references(() => museumClasses.scopeKey),
    roomId: text('room_id').notNull(),
    teamId: text('team_id').notNull(),
    submittedBy: text('submitted_by').notNull(),
    operationId: text('operation_id').notNull(),
    contentHash: text('content_hash').notNull(),
    publicationJson: text('publication_json').notNull(),
    submittedAt: text('submitted_at').notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.scopeKey, table.roomId] }),
    uniqueIndex('idx_museum_publication_operation').on(
      table.scopeKey,
      table.teamId,
      table.operationId,
    ),
  ],
);
