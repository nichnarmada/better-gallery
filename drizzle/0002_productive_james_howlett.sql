CREATE TABLE `folders` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`path` text NOT NULL,
	`added_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `folders_path_unique` ON `folders` (`path`);--> statement-breakpoint
ALTER TABLE `photos` ADD `folder_id` integer NOT NULL REFERENCES folders(id);