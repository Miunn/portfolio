/*
  Warnings:

  - You are about to drop the column `name` on the `Tag` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "name",
ADD COLUMN     "label" VARCHAR(100),
ADD COLUMN     "value" VARCHAR(100);
