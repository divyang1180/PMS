/*
  Warnings:

  - Made the column `passingYearD2D` on table `StudentProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `percentageD2D` on table `StudentProfile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `StudentProfile` MODIFY `passingYearD2D` VARCHAR(191) NOT NULL DEFAULT 'N/A',
    MODIFY `percentageD2D` VARCHAR(191) NOT NULL DEFAULT '0';
