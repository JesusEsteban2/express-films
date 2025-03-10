/*
  Warnings:

  - You are about to alter the column `A` on the `_categorytofilm` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `category_id` on the `categories` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `_categorytofilm` DROP FOREIGN KEY `_CategoryToFilm_A_fkey`;

-- AlterTable
ALTER TABLE `_categorytofilm` MODIFY `A` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `categories` DROP PRIMARY KEY,
    MODIFY `category_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`category_id`);

-- AddForeignKey
ALTER TABLE `_CategoryToFilm` ADD CONSTRAINT `_CategoryToFilm_A_fkey` FOREIGN KEY (`A`) REFERENCES `categories`(`category_id`) ON DELETE CASCADE ON UPDATE CASCADE;
