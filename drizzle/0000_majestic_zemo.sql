CREATE TYPE "public"."availability_status" AS ENUM('in-stock', 'out-of-stock', 'pre-order', 'discontinued');--> statement-breakpoint
CREATE TYPE "public"."product_badge" AS ENUM('featured', 'best-seller', 'new', 'sale', 'limited-edition', 'organic', 'vegetarian', 'gluten-free');--> statement-breakpoint
CREATE TABLE "t_page_setting" (
	"page_setting_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"data" jsonb DEFAULT '{"theme":{"primaryColor":"#1f5d59","headerBackground":"#ffffff","footerBackground":"#f8f9fa"},"branding":{"logoUrl":"/placeholder.svg?height=40&width=120","thumbnailUrl":"/placeholder.svg?height=200&width=200"},"contact":{"phone":"+1 (555) 123-4567","email":"contact@example.com","address":"123 Main St, City, State 12345","latitude":"40.7128","longitude":"-74.0060"},"social":{"links":[{"id":"1","platform":"facebook","url":"https://facebook.com/example"},{"id":"2","platform":"twitter","url":"https://twitter.com/example"}]}}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_by" uuid,
	"version" integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "t_product" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"description" text,
	"category" varchar(100) NOT NULL,
	"price" numeric(12, 0) NOT NULL,
	"original_price" numeric(12, 0),
	"image_url" text,
	"rating" numeric(3, 2) DEFAULT '0.00',
	"review_count" integer DEFAULT 0 NOT NULL,
	"availability" "availability_status" DEFAULT 'in-stock' NOT NULL,
	"inventory" integer DEFAULT 0 NOT NULL,
	"badges" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp with time zone,
	"deleted_by" uuid,
	"version" integer DEFAULT 1 NOT NULL,
	CONSTRAINT "t_product_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "t_users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_by" uuid,
	"version" integer DEFAULT 1 NOT NULL,
	CONSTRAINT "t_users_email_unique" UNIQUE("email")
);
