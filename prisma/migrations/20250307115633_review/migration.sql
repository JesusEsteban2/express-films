/*
  Warnings:

  - You are about to drop the `_categoriestofilm` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_categoriestofilm` DROP FOREIGN KEY `_CategoriesToFilm_A_fkey`;

-- DropForeignKey
ALTER TABLE `_categoriestofilm` DROP FOREIGN KEY `_CategoriesToFilm_B_fkey`;

-- DropTable
DROP TABLE `_categoriestofilm`;

-- DropTable
DROP TABLE `categories`;

-- CreateTable
CREATE TABLE `review_user_film` (
    `review_id` VARCHAR(191) NOT NULL,
    `film_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `rating` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `review_user_film_film_id_user_id_key`(`film_id`, `user_id`),
    PRIMARY KEY (`review_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `review_user_film` ADD CONSTRAINT `review_user_film_film_id_fkey` FOREIGN KEY (`film_id`) REFERENCES `films`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `review_user_film` ADD CONSTRAINT `review_user_film_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
