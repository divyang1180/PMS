/*
  Warnings:

  - You are about to alter the column `passingYearD2D` on the `StudentProfile` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `percentageD2D` on the `StudentProfile` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.
  - You are about to alter the column `studyGap` on the `StudentProfile` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `totalBacklogs` on the `StudentProfile` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `currentBacklogs` on the `StudentProfile` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - A unique constraint covering the columns `[studentId]` on the table `StudentProfile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `studentId` to the `StudentProfile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `StudentProfile` DROP FOREIGN KEY `StudentProfile_id_fkey`;

-- AlterTable
ALTER TABLE `StudentProfile` ADD COLUMN `studentId` INTEGER NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `passingYearD2D` INTEGER NULL,
    MODIFY `percentageD2D` DOUBLE NULL,
    MODIFY `studyGap` INTEGER NULL,
    MODIFY `spiSem1` DOUBLE NULL,
    MODIFY `spiSem2` DOUBLE NULL,
    MODIFY `spiSem3` DOUBLE NULL,
    MODIFY `spiSem4` DOUBLE NULL,
    MODIFY `spiSem5` DOUBLE NULL,
    MODIFY `totalBacklogs` INTEGER NULL,
    MODIFY `backlogTitles` VARCHAR(191) NULL,
    MODIFY `currentBacklogs` INTEGER NULL,
    MODIFY `currentBacklogTitles` VARCHAR(191) NULL,
    MODIFY `filePath` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `StudentProfile_studentId_key` ON `StudentProfile`(`studentId`);

-- AddForeignKey
ALTER TABLE `StudentProfile` ADD CONSTRAINT `StudentProfile_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
