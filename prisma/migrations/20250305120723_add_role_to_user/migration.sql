-- AlterTable
ALTER TABLE `users` ADD COLUMN `role` ENUM('USER', 'EDITOR', 'ADMIN') NOT NULL DEFAULT 'USER';
