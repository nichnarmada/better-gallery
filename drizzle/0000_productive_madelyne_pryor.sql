CREATE TABLE `photo_tags` (
	`photo_id` integer,
	`tag_id` integer,
	FOREIGN KEY (`photo_id`) REFERENCES `photos`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `photos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`file_path` text NOT NULL,
	`file_name` text NOT NULL,
	`file_size` integer NOT NULL,
	`width` integer NOT NULL,
	`height` integer NOT NULL,
	`created_at` integer NOT NULL,
	`imported_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	`title` text,
	`description` text,
	`camera_model` text,
	`latitude` real,
	`longitude` real
);
--> statement-breakpoint
CREATE TABLE `settings` (
	`id` integer PRIMARY KEY NOT NULL,
	`json` text
);
--> statement-breakpoint
CREATE TABLE `tags` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `tags_name_unique` ON `tags` (`name`);