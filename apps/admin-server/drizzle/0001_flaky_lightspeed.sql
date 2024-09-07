DO $$ BEGIN
 CREATE TYPE "public"."role" AS ENUM('SUPERADMIN', 'ADMIN');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "countries" RENAME TO "user";--> statement-breakpoint
ALTER TABLE "user" RENAME COLUMN "name" TO "username";--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "password" varchar(500);--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "roles" "role";