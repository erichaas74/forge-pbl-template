import { index, integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const journeyClasses = sqliteTable('journey_classes', {
  id: text('id').primaryKey(),
  tenantId: text('tenant_id').notNull(),
  classId: text('class_id').notNull(),
  classLabel: text('class_label').notNull(),
  projectId: text('project_id').notNull(),
  projectVersion: text('project_version').notNull(),
  createdBy: text('created_by').notNull(),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
  revision: integer('revision').notNull().default(0),
}, (table) => [
  uniqueIndex('idx_journey_classes_scope').on(
    table.tenantId,
    table.projectId,
    table.projectVersion,
    table.classId,
  ),
]);

export const journeyMemberships = sqliteTable('journey_memberships', {
  id: text('id').primaryKey(),
  classKey: text('class_key').notNull().references(() => journeyClasses.id, { onDelete: 'cascade' }),
  actorUserId: text('actor_user_id').notNull(),
  actorEmail: text('actor_email').notNull(),
  displayName: text('display_name').notNull(),
  role: text('role', { enum: ['student', 'teacher'] }).notNull(),
  joinedAt: text('joined_at').notNull(),
  updatedAt: text('updated_at').notNull(),
}, (table) => [
  uniqueIndex('idx_journey_memberships_class_actor').on(table.classKey, table.actorUserId),
  index('idx_journey_memberships_actor').on(table.actorUserId),
]);

export const journeyRecords = sqliteTable('journey_records', {
  id: text('id').primaryKey(),
  classKey: text('class_key').notNull().references(() => journeyClasses.id, { onDelete: 'cascade' }),
  actorUserId: text('actor_user_id').notNull(),
  voyageId: text('voyage_id').notNull(),
  recordJson: text('record_json').notNull(),
  totalSteps: integer('total_steps').notNull(),
  completedSteps: integer('completed_steps').notNull(),
  completionStatus: text('completion_status', { enum: ['in-progress', 'complete'] }).notNull(),
  responsePreview: text('response_preview'),
  revision: integer('revision').notNull().default(0),
  updatedAt: text('updated_at').notNull(),
}, (table) => [
  uniqueIndex('idx_journey_records_class_actor').on(table.classKey, table.actorUserId),
  index('idx_journey_records_class_updated').on(table.classKey, table.updatedAt),
]);

export const journeySubmissions = sqliteTable('journey_submissions', {
  id: text('id').primaryKey(),
  classKey: text('class_key').notNull().references(() => journeyClasses.id, { onDelete: 'cascade' }),
  actorUserId: text('actor_user_id').notNull(),
  voyageId: text('voyage_id').notNull(),
  snapshotJson: text('snapshot_json').notNull(),
  status: text('status', { enum: ['submitted', 'approved', 'revision-requested'] }).notNull(),
  submittedAt: text('submitted_at').notNull(),
  reviewedAt: text('reviewed_at'),
  reviewerUserId: text('reviewer_user_id'),
  reviewerDisplayName: text('reviewer_display_name'),
  teacherFeedback: text('teacher_feedback'),
  revision: integer('revision').notNull().default(1),
  updatedAt: text('updated_at').notNull(),
}, (table) => [
  uniqueIndex('idx_journey_submissions_class_actor').on(table.classKey, table.actorUserId),
  index('idx_journey_submissions_class_status').on(table.classKey, table.status),
]);

export const journeyMasteryAssessments = sqliteTable('journey_mastery_assessments', {
  id: text('id').primaryKey(),
  submissionId: text('submission_id').notNull().references(() => journeySubmissions.id, { onDelete: 'cascade' }),
  masteryTag: text('mastery_tag').notNull(),
  level: text('level', { enum: ['developing', 'proficient', 'advanced'] }).notNull(),
  feedback: text('feedback'),
  assessorUserId: text('assessor_user_id').notNull(),
  assessedAt: text('assessed_at').notNull(),
}, (table) => [
  uniqueIndex('idx_journey_mastery_submission_tag').on(table.submissionId, table.masteryTag),
  index('idx_journey_mastery_tag_level').on(table.masteryTag, table.level),
]);

export const journeyOperations = sqliteTable('journey_operations', {
  id: text('id').primaryKey(),
  actorUserId: text('actor_user_id').notNull(),
  operationType: text('operation_type').notNull(),
  responseJson: text('response_json').notNull(),
  createdAt: text('created_at').notNull(),
}, (table) => [index('idx_journey_operations_actor_created').on(table.actorUserId, table.createdAt)]);

export const journeyMediaAssets = sqliteTable('journey_media_assets', {
  id: text('id').primaryKey(),
  classKey: text('class_key').notNull().references(() => journeyClasses.id, { onDelete: 'cascade' }),
  actorUserId: text('actor_user_id').notNull(),
  objectKey: text('object_key').notNull(),
  fileName: text('file_name').notNull(),
  contentType: text('content_type').notNull(),
  byteSize: integer('byte_size').notNull(),
  metadataJson: text('metadata_json').notNull().default('{}'),
  createdAt: text('created_at').notNull(),
}, (table) => [
  index('idx_journey_media_class').on(table.classKey),
  index('idx_journey_media_owner').on(table.actorUserId),
]);
