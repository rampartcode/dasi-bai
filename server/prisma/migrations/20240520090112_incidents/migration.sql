/*
  Warnings:

  - You are about to drop the column `month` on the `IncidentResponse` table. All the data in the column will be lost.
  - Added the required column `mes` to the `IncidentResponse` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[IncidentResponse] DROP COLUMN [month];
ALTER TABLE [dbo].[IncidentResponse] ADD [mes] NVARCHAR(1000) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
