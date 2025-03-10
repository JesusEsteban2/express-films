-- CreateTable
CREATE TABLE `categories` (
    `category_id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `categories_category_id_key`(`category_id`),
    PRIMARY KEY (`category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CategoryToFilm` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_CategoryToFilm_AB_unique`(`A`, `B`),
    INDEX `_CategoryToFilm_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_CategoryToFilm` ADD CONSTRAINT `_CategoryToFilm_A_fkey` FOREIGN KEY (`A`) REFERENCES `categories`(`category_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoryToFilm` ADD CONSTRAINT `_CategoryToFilm_B_fkey` FOREIGN KEY (`B`) REFERENCES `films`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
