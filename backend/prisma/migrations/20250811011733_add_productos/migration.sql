/*
  Warnings:

  - You are about to drop the column `categoria` on the `producto` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `producto` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Producto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `producto` DROP COLUMN `categoria`,
    DROP COLUMN `stock`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `imagen` VARCHAR(191) NULL;
