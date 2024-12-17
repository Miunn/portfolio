/*
  Warnings:

  - You are about to drop the column `description` on the `Resource` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[value]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Resource" DROP COLUMN "description";

-- CreateIndex
CREATE UNIQUE INDEX "Tag_value_key" ON "Tag"("value");
