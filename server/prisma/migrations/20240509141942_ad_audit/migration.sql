/*
  Warnings:

  - You are about to drop the `table_ad_audit` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropTable
DROP TABLE [dbo].[table_ad_audit];

-- CreateTable
CREATE TABLE [dbo].[ad_audit] (
    [id] INT NOT NULL IDENTITY(1,1),
    [created_at] DATETIME2 NOT NULL CONSTRAINT [ad_audit_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [user_name] NVARCHAR(1000) NOT NULL,
    [client_ip_address] NVARCHAR(1000) NOT NULL,
    [client_host_name] NVARCHAR(1000) NOT NULL,
    [domain_controller] NVARCHAR(1000) NOT NULL,
    [logon_time] DATETIME2 NOT NULL,
    [event_type_text] NVARCHAR(1000) NOT NULL,
    [failure_reason] NVARCHAR(1000) NOT NULL,
    [client_port] INT NOT NULL,
    [user_distinguish_name] NVARCHAR(1000) NOT NULL,
    [pre_authentication_type] NVARCHAR(1000) NOT NULL,
    [failure_type] NVARCHAR(1000) NOT NULL,
    [logon_service] NVARCHAR(1000) NOT NULL,
    [monitor_id] INT NOT NULL,
    CONSTRAINT [ad_audit_pkey] PRIMARY KEY CLUSTERED ([id])
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
