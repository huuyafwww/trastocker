PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_user_token` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`deleted_at` integer,
	`user_id` text NOT NULL,
	`access_token` text(255) NOT NULL,
	`refresh_token` text(255) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_user_token`("id", "created_at", "updated_at", "deleted_at", "user_id", "access_token", "refresh_token") SELECT "id", "created_at", "updated_at", "deleted_at", "user_id", "access_token", "refresh_token" FROM `user_token`;--> statement-breakpoint
DROP TABLE `user_token`;--> statement-breakpoint
ALTER TABLE `__new_user_token` RENAME TO `user_token`;--> statement-breakpoint
PRAGMA foreign_keys=ON;