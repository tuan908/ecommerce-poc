CREATE TYPE "public"."availability_status" AS ENUM('in-stock', 'out-of-stock', 'pre-order', 'discontinued');--> statement-breakpoint
CREATE TYPE "public"."product_badge" AS ENUM('featured', 'best-seller', 'new', 'sale', 'limited-edition', 'organic', 'vegetarian', 'gluten-free');--> statement-breakpoint
ALTER TABLE "products" RENAME COLUMN "image" TO "image_url";--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "name" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "updated_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "price" SET DATA TYPE numeric(12, 0);--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "slug" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "category" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "original_price" numeric(12, 0);--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "rating" numeric(3, 2) DEFAULT '0.00';--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "review_count" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "availability" "availability_status" DEFAULT 'in-stock' NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "inventory" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "badges" text[] DEFAULT ARRAY[]::text[];--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "created_by" uuid;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "updated_by" uuid;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "deleted_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "deleted_by" uuid;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_slug_unique" UNIQUE("slug");