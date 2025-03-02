/*
  Warnings:

  - The primary key for the `films` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `film_id` on the `films` table. All the data in the column will be lost.
  - The required column `id` was added to the `films` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `films` DROP PRIMARY KEY,
    DROP COLUMN `film_id`,
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);
