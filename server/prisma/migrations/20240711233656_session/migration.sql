/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `sessions` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- CreateIndex
ALTER TABLE [dbo].[sessions] ADD CONSTRAINT [sessions_username_key] UNIQUE NONCLUSTERED ([username]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
