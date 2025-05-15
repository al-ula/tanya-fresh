DROP INDEX "title_idx";--> statement-breakpoint
DROP INDEX "user_idx";--> statement-breakpoint
DROP INDEX "board_idx";--> statement-breakpoint
DROP INDEX "message_idx";--> statement-breakpoint
DROP INDEX "user_email_unique";--> statement-breakpoint
DROP INDEX "user_googleIdEmail_unique";--> statement-breakpoint
DROP INDEX "gid_idx";--> statement-breakpoint
DROP INDEX "email_idx";--> statement-breakpoint
ALTER TABLE `user` ALTER COLUMN "passHash" TO "passHash" text;--> statement-breakpoint
CREATE INDEX `title_idx` ON `board` (`title`);--> statement-breakpoint
CREATE INDEX `user_idx` ON `board` (`user_id`);--> statement-breakpoint
CREATE INDEX `board_idx` ON `message` (`board_id`);--> statement-breakpoint
CREATE INDEX `message_idx` ON `reply` (`message_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_googleIdEmail_unique` ON `user` (`googleIdEmail`);--> statement-breakpoint
CREATE INDEX `gid_idx` ON `user` (`googleIdEmail`);--> statement-breakpoint
CREATE INDEX `email_idx` ON `user` (`email`);