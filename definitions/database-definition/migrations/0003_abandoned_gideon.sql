PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_workspace_user` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`deleted_at` integer,
	`workspace_id` text NOT NULL,
	`user_id` text NOT NULL,
	FOREIGN KEY (`workspace_id`) REFERENCES `workspace`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_workspace_user`("id", "created_at", "updated_at", "deleted_at", "workspace_id", "user_id") SELECT "id", "created_at", "updated_at", "deleted_at", "workspace_id", "user_id" FROM `workspace_user`;--> statement-breakpoint
DROP TABLE `workspace_user`;--> statement-breakpoint
ALTER TABLE `__new_workspace_user` RENAME TO `workspace_user`;--> statement-breakpoint
PRAGMA foreign_keys=ON;