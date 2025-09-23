/*
  Warnings:

  - You are about to drop the column `limit` on the `usage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."account" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "public"."session" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "public"."usage" DROP COLUMN "limit";

-- AlterTable
ALTER TABLE "public"."user" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "public"."verification" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;
