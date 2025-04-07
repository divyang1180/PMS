/*
  Warnings:

  - You are about to alter the column `percentageD2D` on the `StudentProfile` table. The data in that column could be lost. The data in that column will be cast from `Double` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `StudentProfile` MODIFY `passingYearD2D` VARCHAR(191) NULL,
    MODIFY `percentageD2D` VARCHAR(191) NULL;
