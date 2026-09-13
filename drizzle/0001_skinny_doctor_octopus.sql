CREATE TABLE `museum_assignments` (
	`scope_key` text NOT NULL,
	`room_id` text NOT NULL,
	`team_id` text NOT NULL,
	`room_label` text NOT NULL,
	`layout_id` text NOT NULL,
	`position` integer NOT NULL,
	`curator_name` text NOT NULL,
	PRIMARY KEY(`scope_key`, `room_id`),
	FOREIGN KEY (`scope_key`) REFERENCES `museum_classes`(`scope_key`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_museum_assignment_team` ON `museum_assignments` (`scope_key`,`team_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `idx_museum_assignment_position` ON `museum_assignments` (`scope_key`,`position`);--> statement-breakpoint
CREATE TABLE `museum_classes` (
	`scope_key` text PRIMARY KEY NOT NULL,
	`submission_locked` integer DEFAULT 0 NOT NULL,
	`collection_open` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `museum_memberships` (
	`scope_key` text NOT NULL,
	`actor_id` text NOT NULL,
	`team_id` text NOT NULL,
	`role` text NOT NULL,
	PRIMARY KEY(`scope_key`, `actor_id`),
	FOREIGN KEY (`scope_key`) REFERENCES `museum_classes`(`scope_key`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `museum_publications` (
	`scope_key` text NOT NULL,
	`room_id` text NOT NULL,
	`team_id` text NOT NULL,
	`submitted_by` text NOT NULL,
	`operation_id` text NOT NULL,
	`content_hash` text NOT NULL,
	`publication_json` text NOT NULL,
	`submitted_at` text NOT NULL,
	PRIMARY KEY(`scope_key`, `room_id`),
	FOREIGN KEY (`scope_key`) REFERENCES `museum_classes`(`scope_key`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_museum_publication_operation` ON `museum_publications` (`scope_key`,`team_id`,`operation_id`);