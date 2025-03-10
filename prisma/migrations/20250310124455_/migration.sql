/*
  Warnings:

  - The primary key for the `categories` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `_categorytofilm` DROP FOREIGN KEY `_CategoryToFilm_A_fkey`;

-- AlterTable
ALTER TABLE `_categorytofilm` MODIFY `A` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `categories` DROP PRIMARY KEY,
    MODIFY `category_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`category_id`);

-- AddForeignKey
ALTER TABLE `_CategoryToFilm` ADD CONSTRAINT `_CategoryToFilm_A_fkey` FOREIGN KEY (`A`) REFERENCES `categories`(`category_id`) ON DELETE CASCADE ON UPDATE CASCADE;
