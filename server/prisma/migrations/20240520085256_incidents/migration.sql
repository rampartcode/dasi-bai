/*
  Warnings:

  - You are about to drop the column `event_name` on the `IncidentResponse` table. All the data in the column will be lost.
  - You are about to drop the column `total_events` on the `IncidentResponse` table. All the data in the column will be lost.
  - Added the required column `falsos_positivos` to the `IncidentResponse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `incidentes_pendentes_por_investigacao` to the `IncidentResponse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `incidentes_reportados` to the `IncidentResponse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `incidentes_resolvidos_por_acao_tecnica` to the `IncidentResponse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `incidentes_resolvidos_por_intervencao` to the `IncidentResponse` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[IncidentResponse] DROP COLUMN [event_name],
[total_events];
ALTER TABLE [dbo].[IncidentResponse] ADD [falsos_positivos] INT NOT NULL,
[incidentes_pendentes_por_investigacao] INT NOT NULL,
[incidentes_reportados] INT NOT NULL,
[incidentes_resolvidos_por_acao_tecnica] INT NOT NULL,
[incidentes_resolvidos_por_intervencao] INT NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
