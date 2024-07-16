/*
  Warnings:

  - You are about to alter the column `loggedAt` on the `sessions` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(1000)` to `DateTime2`.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[sessions] ALTER COLUMN [loggedAt] DATETIME2 NOT NULL;
ALTER TABLE [dbo].[sessions] ADD CONSTRAINT [sessions_loggedAt_df] DEFAULT CURRENT_TIMESTAMP FOR [loggedAt];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
