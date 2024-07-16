BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[IncidentResponse] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [IncidentResponse_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [event_name] NVARCHAR(1000) NOT NULL,
    [total_events] INT NOT NULL,
    [month] NVARCHAR(1000) NOT NULL,
    [month_date] DATETIME2 NOT NULL,
    CONSTRAINT [IncidentResponse_pkey] PRIMARY KEY CLUSTERED ([id])
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
