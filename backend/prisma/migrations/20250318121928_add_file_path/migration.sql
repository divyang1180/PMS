/*
  Warnings:

  - You are about to drop the `studentProfile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `studentProfile`;

-- CreateTable
CREATE TABLE `StudentProfile` (
    `id` VARCHAR(191) NOT NULL,
    `studentName` VARCHAR(191) NOT NULL,
    `enrollmentNo` VARCHAR(191) NOT NULL,
    `gender` VARCHAR(191) NOT NULL,
    `branch` VARCHAR(191) NOT NULL,
    `birthdate` DATETIME(3) NULL,
    `age` INTEGER NULL,
    `passingYearSSC` INTEGER NULL,
    `percentageSSC` DOUBLE NULL,
    `passingYearHSC` INTEGER NULL,
    `percentageHSC` DOUBLE NULL,
    `passingYearD2D` INTEGER NULL,
    `percentageD2D` DOUBLE NULL,
    `studyGap` INTEGER NULL,
    `mediumSchool` VARCHAR(191) NULL,
    `spiSem1` DOUBLE NULL,
    `spiSem2` DOUBLE NULL,
    `spiSem3` DOUBLE NULL,
    `spiSem4` DOUBLE NULL,
    `spiSem5` DOUBLE NULL,
    `currentCGPA` DOUBLE NULL,
    `percentageBE` DOUBLE NULL,
    `totalBacklogs` INTEGER NULL,
    `backlogTitles` VARCHAR(191) NULL,
    `currentBacklogs` INTEGER NULL,
    `currentBacklogTitles` VARCHAR(191) NULL,
    `mobileNumber` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `pincode` VARCHAR(191) NOT NULL,
    `district` VARCHAR(191) NOT NULL,
    `filePath` VARCHAR(191) NULL,

    UNIQUE INDEX `StudentProfile_enrollmentNo_key`(`enrollmentNo`),
    UNIQUE INDEX `StudentProfile_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
