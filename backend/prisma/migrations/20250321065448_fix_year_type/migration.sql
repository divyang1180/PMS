/*
  Warnings:

  - You are about to alter the column `passingYearHSC` on the `StudentProfile` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `passingYearD2D` on the `StudentProfile` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `StudentProfile` MODIFY `passingYearHSC` INTEGER NULL,
    MODIFY `passingYearD2D` INTEGER NULL;
