/*
  Warnings:

  - Made the column `birthdate` on table `StudentProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `age` on table `StudentProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `passingYearSSC` on table `StudentProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `percentageSSC` on table `StudentProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `passingYearHSC` on table `StudentProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `percentageHSC` on table `StudentProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `passingYearD2D` on table `StudentProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `percentageD2D` on table `StudentProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `studyGap` on table `StudentProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `mediumSchool` on table `StudentProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `spiSem1` on table `StudentProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `spiSem2` on table `StudentProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `spiSem3` on table `StudentProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `spiSem4` on table `StudentProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `spiSem5` on table `StudentProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `currentCGPA` on table `StudentProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `percentageBE` on table `StudentProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `totalBacklogs` on table `StudentProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `backlogTitles` on table `StudentProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `currentBacklogs` on table `StudentProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `currentBacklogTitles` on table `StudentProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `filePath` on table `StudentProfile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `StudentProfile` MODIFY `birthdate` DATETIME(3) NOT NULL,
    MODIFY `age` INTEGER NOT NULL,
    MODIFY `passingYearSSC` INTEGER NOT NULL,
    MODIFY `percentageSSC` DOUBLE NOT NULL,
    MODIFY `passingYearHSC` INTEGER NOT NULL,
    MODIFY `percentageHSC` VARCHAR(191) NOT NULL,
    MODIFY `passingYearD2D` INTEGER NOT NULL,
    MODIFY `percentageD2D` VARCHAR(191) NOT NULL,
    MODIFY `studyGap` INTEGER NOT NULL,
    MODIFY `mediumSchool` VARCHAR(191) NOT NULL,
    MODIFY `spiSem1` DOUBLE NOT NULL,
    MODIFY `spiSem2` DOUBLE NOT NULL,
    MODIFY `spiSem3` DOUBLE NOT NULL,
    MODIFY `spiSem4` DOUBLE NOT NULL,
    MODIFY `spiSem5` DOUBLE NOT NULL,
    MODIFY `currentCGPA` DOUBLE NOT NULL,
    MODIFY `percentageBE` DOUBLE NOT NULL,
    MODIFY `totalBacklogs` INTEGER NOT NULL,
    MODIFY `backlogTitles` VARCHAR(191) NOT NULL,
    MODIFY `currentBacklogs` INTEGER NOT NULL,
    MODIFY `currentBacklogTitles` VARCHAR(191) NOT NULL,
    MODIFY `filePath` VARCHAR(191) NOT NULL;
