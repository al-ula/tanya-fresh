CREATE TABLE `board` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`title` text NOT NULL,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `title_idx` ON `board` (`title`);--> statement-breakpoint
CREATE INDEX `user_idx` ON `board` (`user_id`);--> statement-breakpoint
CREATE TABLE `message` (
	`id` text PRIMARY KEY NOT NULL,
	`board_id` text NOT NULL,
	`value` text NOT NULL,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`board_id`) REFERENCES `board`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `board_idx` ON `message` (`board_id`);--> statement-breakpoint
CREATE TABLE `reply` (
	`id` text PRIMARY KEY NOT NULL,
	`message_id` text NOT NULL,
	`value` text NOT NULL,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`message_id`) REFERENCES `message`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `message_idx` ON `reply` (`message_id`);--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text,
	`passHash` blob,
	`googleIdEmail` text,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	CONSTRAINT "login_type" CHECK((("user"."email" IS NOT NULL AND "user"."passHash" IS NOT NULL)
    OR "user"."googleIdEmail" IS NOT NULL))
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_googleIdEmail_unique` ON `user` (`googleIdEmail`);--> statement-breakpoint
CREATE INDEX `gid_idx` ON `user` (`googleIdEmail`);--> statement-breakpoint
CREATE INDEX `email_idx` ON `user` (`email`);