/*
  Warnings:

  - Made the column `percentageHSC` on table `studentProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `percentageD2D` on table `studentProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `currentCGPA` on table `studentProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `percentageBE` on table `studentProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pincode` on table `studentProfile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `studentProfile` MODIFY `percentageHSC` DOUBLE NOT NULL,
    MODIFY `percentageD2D` DOUBLE NOT NULL,
    MODIFY `currentCGPA` DOUBLE NOT NULL,
    MODIFY `percentageBE` DOUBLE NOT NULL,
    MODIFY `pincode` INTEGER NOT NULL;
