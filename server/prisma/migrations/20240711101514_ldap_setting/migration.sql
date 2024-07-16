/*
  Warnings:

  - You are about to drop the `LDAPServer` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropTable
DROP TABLE [dbo].[LDAPServer];

-- CreateTable
CREATE TABLE [dbo].[LdapSetting] (
    [id] INT NOT NULL IDENTITY(1,1),
    [serverUrl] NVARCHAR(1000) NOT NULL,
    [adminDn] NVARCHAR(1000) NOT NULL,
    [adminPassword] NVARCHAR(1000) NOT NULL,
    [userSearchBase] NVARCHAR(1000) NOT NULL,
    [usernameAttribute] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [LdapSetting_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [LdapSetting_pkey] PRIMARY KEY CLUSTERED ([id])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
