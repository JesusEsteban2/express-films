/*
  Warnings:

  - You are about to drop the column `profileId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `Notes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `profiles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Notes` DROP FOREIGN KEY `Notes_userId_fkey`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_profileId_fkey`;

-- DropIndex
DROP INDEX `users_profileId_fkey` ON `users`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `profileId`;

-- DropTable
DROP TABLE `Notes`;

-- DropTable
DROP TABLE `profiles`;
