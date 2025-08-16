/*
  Warnings:

  - You are about to drop the column `imagen` on the `producto` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `producto` DROP COLUMN `imagen`,
    ADD COLUMN `imagenUrl` VARCHAR(191) NULL,
    ADD COLUMN `stock` INTEGER NULL;

