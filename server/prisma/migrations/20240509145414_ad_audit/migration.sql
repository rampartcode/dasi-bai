/*
  Warnings:

  - You are about to alter the column `client_ip_address` on the `ad_audit` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(1000)` to `Text`.
  - You are about to alter the column `client_host_name` on the `ad_audit` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(1000)` to `Text`.
  - You are about to alter the column `domain_controller` on the `ad_audit` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(1000)` to `Text`.
  - You are about to alter the column `event_type_text` on the `ad_audit` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(1000)` to `Text`.
  - You are about to alter the column `failure_reason` on the `ad_audit` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(1000)` to `Text`.
  - You are about to alter the column `user_distinguish_name` on the `ad_audit` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(1000)` to `Text`.
  - You are about to alter the column `pre_authentication_type` on the `ad_audit` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(1000)` to `Text`.
  - You are about to alter the column `failure_type` on the `ad_audit` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(1000)` to `Text`.
  - You are about to alter the column `logon_service` on the `ad_audit` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(1000)` to `Text`.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[ad_audit] ALTER COLUMN [client_ip_address] TEXT NOT NULL;
ALTER TABLE [dbo].[ad_audit] ALTER COLUMN [client_host_name] TEXT NOT NULL;
ALTER TABLE [dbo].[ad_audit] ALTER COLUMN [domain_controller] TEXT NOT NULL;
ALTER TABLE [dbo].[ad_audit] ALTER COLUMN [event_type_text] TEXT NOT NULL;
ALTER TABLE [dbo].[ad_audit] ALTER COLUMN [failure_reason] TEXT NOT NULL;
ALTER TABLE [dbo].[ad_audit] ALTER COLUMN [user_distinguish_name] TEXT NOT NULL;
ALTER TABLE [dbo].[ad_audit] ALTER COLUMN [pre_authentication_type] TEXT NOT NULL;
ALTER TABLE [dbo].[ad_audit] ALTER COLUMN [failure_type] TEXT NOT NULL;
ALTER TABLE [dbo].[ad_audit] ALTER COLUMN [logon_service] TEXT NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
