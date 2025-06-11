/*
  Warnings:

  - Made the column `label` on table `Tag` required. This step will fail if there are existing NULL values in that column.
  - Made the column `value` on table `Tag` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Tag" ALTER COLUMN "label" SET NOT NULL,
ALTER COLUMN "value" SET NOT NULL;
