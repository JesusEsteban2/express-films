/*
  Warnings:

  - A unique constraint covering the columns `[nombre]` on the table `categories` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `categories_nombre_key` ON `categories`(`nombre`);
