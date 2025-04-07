/*
  Warnings:

  - You are about to alter the column `percentageHSC` on the `StudentProfile` table. The data in that column could be lost. The data in that column will be cast from `Double` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `StudentProfile` MODIFY `passingYearHSC` VARCHAR(191) NULL,
    MODIFY `percentageHSC` VARCHAR(191) NULL;
