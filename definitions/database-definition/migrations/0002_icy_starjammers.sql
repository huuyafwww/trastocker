CREATE TABLE `workspace_user` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`deleted_at` integer,
	`user_id` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `workspace_user_user_id_unique` ON `workspace_user` (`user_id`);