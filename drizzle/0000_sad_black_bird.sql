CREATE TABLE `journey_classes` (
	`id` text PRIMARY KEY NOT NULL,
	`tenant_id` text NOT NULL,
	`class_id` text NOT NULL,
	`class_label` text NOT NULL,
	`project_id` text NOT NULL,
	`project_version` text NOT NULL,
	`created_by` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	`revision` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_journey_classes_scope` ON `journey_classes` (`tenant_id`,`project_id`,`project_version`,`class_id`);--> statement-breakpoint
CREATE TABLE `journey_mastery_assessments` (
	`id` text PRIMARY KEY NOT NULL,
	`submission_id` text NOT NULL,
	`mastery_tag` text NOT NULL,
	`level` text NOT NULL,
	`feedback` text,
	`assessor_user_id` text NOT NULL,
	`assessed_at` text NOT NULL,
	FOREIGN KEY (`submission_id`) REFERENCES `journey_submissions`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_journey_mastery_submission_tag` ON `journey_mastery_assessments` (`submission_id`,`mastery_tag`);--> statement-breakpoint
CREATE INDEX `idx_journey_mastery_tag_level` ON `journey_mastery_assessments` (`mastery_tag`,`level`);--> statement-breakpoint
CREATE TABLE `journey_media_assets` (
	`id` text PRIMARY KEY NOT NULL,
	`class_key` text NOT NULL,
	`actor_user_id` text NOT NULL,
	`object_key` text NOT NULL,
	`file_name` text NOT NULL,
	`content_type` text NOT NULL,
	`byte_size` integer NOT NULL,
	`metadata_json` text DEFAULT '{}' NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`class_key`) REFERENCES `journey_classes`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `idx_journey_media_class` ON `journey_media_assets` (`class_key`);--> statement-breakpoint
CREATE INDEX `idx_journey_media_owner` ON `journey_media_assets` (`actor_user_id`);--> statement-breakpoint
CREATE TABLE `journey_memberships` (
	`id` text PRIMARY KEY NOT NULL,
	`class_key` text NOT NULL,
	`actor_user_id` text NOT NULL,
	`actor_email` text NOT NULL,
	`display_name` text NOT NULL,
	`role` text NOT NULL,
	`joined_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`class_key`) REFERENCES `journey_classes`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_journey_memberships_class_actor` ON `journey_memberships` (`class_key`,`actor_user_id`);--> statement-breakpoint
CREATE INDEX `idx_journey_memberships_actor` ON `journey_memberships` (`actor_user_id`);--> statement-breakpoint
CREATE TABLE `journey_operations` (
	`id` text PRIMARY KEY NOT NULL,
	`actor_user_id` text NOT NULL,
	`operation_type` text NOT NULL,
	`response_json` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_journey_operations_actor_created` ON `journey_operations` (`actor_user_id`,`created_at`);--> statement-breakpoint
CREATE TABLE `journey_records` (
	`id` text PRIMARY KEY NOT NULL,
	`class_key` text NOT NULL,
	`actor_user_id` text NOT NULL,
	`voyage_id` text NOT NULL,
	`record_json` text NOT NULL,
	`total_steps` integer NOT NULL,
	`completed_steps` integer NOT NULL,
	`completion_status` text NOT NULL,
	`response_preview` text,
	`revision` integer DEFAULT 0 NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`class_key`) REFERENCES `journey_classes`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_journey_records_class_actor` ON `journey_records` (`class_key`,`actor_user_id`);--> statement-breakpoint
CREATE INDEX `idx_journey_records_class_updated` ON `journey_records` (`class_key`,`updated_at`);--> statement-breakpoint
CREATE TABLE `journey_submissions` (
	`id` text PRIMARY KEY NOT NULL,
	`class_key` text NOT NULL,
	`actor_user_id` text NOT NULL,
	`voyage_id` text NOT NULL,
	`snapshot_json` text NOT NULL,
	`status` text NOT NULL,
	`submitted_at` text NOT NULL,
	`reviewed_at` text,
	`reviewer_user_id` text,
	`reviewer_display_name` text,
	`teacher_feedback` text,
	`revision` integer DEFAULT 1 NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`class_key`) REFERENCES `journey_classes`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_journey_submissions_class_actor` ON `journey_submissions` (`class_key`,`actor_user_id`);--> statement-breakpoint
CREATE INDEX `idx_journey_submissions_class_status` ON `journey_submissions` (`class_key`,`status`);
--> statement-breakpoint
PRAGMA optimize;
