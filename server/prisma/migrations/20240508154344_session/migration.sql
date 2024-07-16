/*
  Warnings:

  - Added the required column `role` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[sessions] ADD [role] NVARCHAR(1000) NOT NULL,
[username] NVARCHAR(1000) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
