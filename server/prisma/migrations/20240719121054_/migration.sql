BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[users] (
    [id] NVARCHAR(1000) NOT NULL,
    [firstName] NVARCHAR(1000) NOT NULL,
    [lastName] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [username] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL CONSTRAINT [users_password_df] DEFAULT 'none',
    [roles] NVARCHAR(1000) NOT NULL,
    [isConfigure] BIT NOT NULL CONSTRAINT [users_isConfigure_df] DEFAULT 0,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [users_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [users_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [users_email_key] UNIQUE NONCLUSTERED ([email]),
    CONSTRAINT [users_username_key] UNIQUE NONCLUSTERED ([username])
);

-- CreateTable
CREATE TABLE [dbo].[sessions] (
    [id] NVARCHAR(1000) NOT NULL,
    [token] NVARCHAR(1000) NOT NULL,
    [username] NVARCHAR(1000) NOT NULL,
    [role] NVARCHAR(1000) NOT NULL,
    [loggedAt] DATETIME2 NOT NULL CONSTRAINT [sessions_loggedAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [sessions_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [sessions_token_key] UNIQUE NONCLUSTERED ([token]),
    CONSTRAINT [sessions_username_key] UNIQUE NONCLUSTERED ([username])
);

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

-- CreateTable
CREATE TABLE [dbo].[IncidentResponse] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [IncidentResponse_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [mes] NVARCHAR(1000) NOT NULL,
    [month_date] DATETIME2 NOT NULL,
    [incidentes_reportados] INT NOT NULL,
    [incidentes_resolvidos_por_intervencao] INT NOT NULL,
    [incidentes_resolvidos_por_acao_tecnica] INT NOT NULL,
    [incidentes_pendentes_por_investigacao] INT NOT NULL,
    [falsos_positivos] INT NOT NULL,
    CONSTRAINT [IncidentResponse_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[darktrace] (
    [id] INT NOT NULL IDENTITY(1,1),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [darktrace_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [time] DATETIME2 NOT NULL,
    [username] NVARCHAR(1000) NOT NULL,
    [ip] NVARCHAR(1000) NOT NULL,
    [method] NVARCHAR(1000) NOT NULL,
    [status] INT NOT NULL,
    [endpoint] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [darktrace_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[imperva_waf] (
    [id] INT NOT NULL IDENTITY(1,1),
    [created_at] DATETIME2 NOT NULL CONSTRAINT [imperva_waf_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [alert_start_time] DATETIME2 NOT NULL,
    [user_name_applicative] NVARCHAR(1000) NOT NULL,
    [user_name_db] NVARCHAR(1000) NOT NULL,
    [source_ip] NVARCHAR(1000) NOT NULL,
    [source_app] NVARCHAR(1000) NOT NULL,
    [url] NVARCHAR(1000) NOT NULL,
    [immediate_action] NVARCHAR(1000) NOT NULL,
    [alert_description] NVARCHAR(1000) NOT NULL,
    [alert_type] NVARCHAR(1000) NOT NULL,
    [num_of_events] INT NOT NULL,
    CONSTRAINT [imperva_waf_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[imperva_dam] (
    [id] INT NOT NULL IDENTITY(1,1),
    [created_at] DATETIME2 NOT NULL CONSTRAINT [imperva_dam_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [num_of_events] INT NOT NULL,
    CONSTRAINT [imperva_dam_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[checkpoint_harmony] (
    [id] INT NOT NULL IDENTITY(1,1),
    [created_at] DATETIME2 NOT NULL CONSTRAINT [checkpoint_harmony_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [receive_time] DATETIME2 NOT NULL,
    [quarantined] BIT NOT NULL,
    [subject] NVARCHAR(1000) NOT NULL,
    [recipients] NVARCHAR(1000) NOT NULL,
    [sender] NVARCHAR(1000) NOT NULL,
    [server_ip] NVARCHAR(1000) NOT NULL,
    [client_ip] NVARCHAR(1000) NOT NULL,
    [links] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [checkpoint_harmony_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[checkpoint_fw_attack] (
    [id] INT NOT NULL IDENTITY(1,1),
    [created_at] DATETIME2 NOT NULL CONSTRAINT [checkpoint_fw_attack_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [severity] NVARCHAR(1000) NOT NULL,
    [blade] NVARCHAR(1000) NOT NULL,
    [logs] INT NOT NULL,
    [attack] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [checkpoint_fw_attack_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[checkpoint_fw] (
    [id] INT NOT NULL IDENTITY(1,1),
    [created_at] DATETIME2 NOT NULL CONSTRAINT [checkpoint_fw_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [blade] NVARCHAR(1000) NOT NULL,
    [logs] INT NOT NULL,
    CONSTRAINT [checkpoint_fw_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[portnox] (
    [id] INT NOT NULL IDENTITY(1,1),
    [created_at] DATETIME2 NOT NULL CONSTRAINT [portnox_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [title] VARCHAR(200) NOT NULL,
    [start_info] DATETIME2 NOT NULL,
    [events_count] NVARCHAR(1000) NOT NULL,
    [time_stamp] NVARCHAR(1000) NOT NULL,
    [device_name] NVARCHAR(1000) NOT NULL,
    [device_ip] NVARCHAR(1000) NOT NULL,
    [device_os] VARCHAR(150) NOT NULL,
    [mac_address] VARCHAR(20) NOT NULL,
    [network_entity_ip] NVARCHAR(1000) NOT NULL,
    [nv_unit] NVARCHAR(1000) NOT NULL,
    [nv_port] INT NOT NULL,
    [action] NVARCHAR(1000) NOT NULL,
    [event_name] NVARCHAR(1000) NOT NULL,
    [connected] BIT NOT NULL,
    [reocurrences] INT NOT NULL,
    [vr_os] NVARCHAR(1000) NOT NULL,
    [status_events] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [portnox_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[windows_defender] (
    [Id] INT NOT NULL IDENTITY(1,1),
    [created_at] DATETIME2 NOT NULL CONSTRAINT [windows_defender_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [severity] NVARCHAR(1000) NOT NULL,
    [investigated_new] BIT NOT NULL,
    [first_activity] DATETIME2 NOT NULL,
    [alert_name] NVARCHAR(1000) NOT NULL,
    [detect_source] NVARCHAR(1000) NOT NULL,
    [last_activity] DATETIME2 NOT NULL,
    [category] NVARCHAR(1000) NOT NULL,
    [status] NVARCHAR(1000) NOT NULL,
    [classification] NVARCHAR(1000) NOT NULL,
    [determination] NVARCHAR(1000) NOT NULL,
    [assigned] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [windows_defender_pkey] PRIMARY KEY CLUSTERED ([Id])
);

-- CreateTable
CREATE TABLE [dbo].[ad_audit] (
    [id] INT NOT NULL IDENTITY(1,1),
    [created_at] DATETIME2 NOT NULL CONSTRAINT [ad_audit_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [user_name] TEXT NOT NULL,
    [client_ip_address] TEXT NOT NULL,
    [client_host_name] TEXT NOT NULL,
    [domain_controller] TEXT NOT NULL,
    [logon_time] DATETIME2 NOT NULL,
    [event_type_text] TEXT NOT NULL,
    [failure_reason] TEXT NOT NULL,
    [client_port] INT NOT NULL,
    [user_distinguish_name] TEXT NOT NULL,
    [pre_authentication_type] TEXT NOT NULL,
    [failure_type] TEXT NOT NULL,
    [logon_service] TEXT NOT NULL,
    [monitor_id] INT NOT NULL,
    CONSTRAINT [ad_audit_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[table_palo_alto] (
    [id] INT NOT NULL IDENTITY(1,1),
    [created_at] DATETIME2 NOT NULL CONSTRAINT [table_palo_alto_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [domain] INT NOT NULL,
    [receive_time] DATETIME2 NOT NULL,
    [serial] NVARCHAR(1000) NOT NULL,
    [type] NVARCHAR(1000) NOT NULL,
    [threat_content_type] NVARCHAR(1000) NOT NULL,
    [config_version] NVARCHAR(1000) NOT NULL,
    [generate_time] DATETIME2 NOT NULL,
    [source_address] NVARCHAR(1000) NOT NULL,
    [destination_address] NVARCHAR(1000) NOT NULL,
    [nat_source_ip] NVARCHAR(1000) NOT NULL,
    [nat_destination_ip] NVARCHAR(1000) NOT NULL,
    [rule] NVARCHAR(1000) NOT NULL,
    [source_user] NVARCHAR(1000) NOT NULL,
    [destination_user] NVARCHAR(1000) NOT NULL,
    [application] NVARCHAR(1000) NOT NULL,
    [virtual_system] NVARCHAR(1000) NOT NULL,
    [source_zone] NVARCHAR(1000) NOT NULL,
    [destination_zone] NVARCHAR(1000) NOT NULL,
    [inbound_interface] NVARCHAR(1000) NOT NULL,
    [outbound_interface] NVARCHAR(1000) NOT NULL,
    [log_action] NVARCHAR(1000) NOT NULL,
    [time_logged] DATETIME2 NOT NULL,
    [session_id] INT NOT NULL,
    [repeat_count] INT NOT NULL,
    [source_port] INT NOT NULL,
    [destination_port] INT NOT NULL,
    [nat_source_port] INT NOT NULL,
    [nat_destination_port] INT NOT NULL,
    [flags] NVARCHAR(1000) NOT NULL,
    [ip_protocol] NVARCHAR(1000) NOT NULL,
    [action] NVARCHAR(1000) NOT NULL,
    [url_filename] NVARCHAR(1000) NOT NULL,
    [threat_content_name] NVARCHAR(1000) NOT NULL,
    [category] NVARCHAR(1000) NOT NULL,
    [severity] NVARCHAR(1000) NOT NULL,
    [direction] NVARCHAR(1000) NOT NULL,
    [sequence_number] NVARCHAR(1000) NOT NULL,
    [action_flags] NVARCHAR(1000) NOT NULL,
    [source_country] NVARCHAR(1000) NOT NULL,
    [destination_country] NVARCHAR(1000) NOT NULL,
    [contenttype] NVARCHAR(1000) NOT NULL,
    [pcap_id] INT NOT NULL,
    [filedigest] NVARCHAR(1000) NOT NULL,
    [cloud] NVARCHAR(1000) NOT NULL,
    [url_idx] INT NOT NULL,
    [user_agent] NVARCHAR(1000) NOT NULL,
    [filetype] NVARCHAR(1000) NOT NULL,
    [xff] NVARCHAR(1000) NOT NULL,
    [referer] NVARCHAR(1000) NOT NULL,
    [sender] NVARCHAR(1000) NOT NULL,
    [subject] NVARCHAR(1000) NOT NULL,
    [recipient] NVARCHAR(1000) NOT NULL,
    [reportid] INT NOT NULL,
    [dg_hierarchy_level_1] INT NOT NULL,
    [dg_hierarchy_level_2] INT NOT NULL,
    [dg_hierarchy_level_3] INT NOT NULL,
    [dg_hierarchy_level_4] INT NOT NULL,
    [virtual_system_name] NVARCHAR(1000) NOT NULL,
    [device_name] NVARCHAR(1000) NOT NULL,
    [file_url] NVARCHAR(1000) NOT NULL,
    [source_vm_uuid] NVARCHAR(1000) NOT NULL,
    [destination_vm_uuid] NVARCHAR(1000) NOT NULL,
    [http_method] NVARCHAR(1000) NOT NULL,
    [tunnel_id_imsi] INT NOT NULL,
    [monitor_tag_imei] NVARCHAR(1000) NOT NULL,
    [parent_session_id] INT NOT NULL,
    [parent_session_start_time] NVARCHAR(1000) NOT NULL,
    [tunnel] NVARCHAR(1000) NOT NULL,
    [thr_category] NVARCHAR(1000) NOT NULL,
    [contentver] NVARCHAR(1000) NOT NULL,
    [sig_flags] NVARCHAR(1000) NOT NULL,
    [sctp_association_id] INT NOT NULL,
    [payload_protocol_id] NVARCHAR(1000) NOT NULL,
    [http_headers] NVARCHAR(1000) NOT NULL,
    [url_category_list] NVARCHAR(1000) NOT NULL,
    [uuid_for_rule] NVARCHAR(1000) NOT NULL,
    [http_2_connection] INT NOT NULL,
    [dynusergroup_name] NVARCHAR(1000) NOT NULL,
    [xff_address] NVARCHAR(1000) NOT NULL,
    [source_device_category] NVARCHAR(1000) NOT NULL,
    [source_device_profile] NVARCHAR(1000) NOT NULL,
    [source_device_model] NVARCHAR(1000) NOT NULL,
    [source_device_vendor] NVARCHAR(1000) NOT NULL,
    [source_device_os_family] NVARCHAR(1000) NOT NULL,
    [source_device_os_version] NVARCHAR(1000) NOT NULL,
    [source_hostname] NVARCHAR(1000) NOT NULL,
    [source_mac_address] NVARCHAR(1000) NOT NULL,
    [destination_device_category] NVARCHAR(1000) NOT NULL,
    [destination_device_profile] NVARCHAR(1000) NOT NULL,
    [destination_device_model] NVARCHAR(1000) NOT NULL,
    [destination_device_vendor] NVARCHAR(1000) NOT NULL,
    [destination_device_os_family] NVARCHAR(1000) NOT NULL,
    [destination_device_os_version] NVARCHAR(1000) NOT NULL,
    [destination_hostname] NVARCHAR(1000) NOT NULL,
    [destination_mac_address] NVARCHAR(1000) NOT NULL,
    [container_id] NVARCHAR(1000) NOT NULL,
    [pod_namespace] NVARCHAR(1000) NOT NULL,
    [pod_name] NVARCHAR(1000) NOT NULL,
    [source_external_dynamic_list] NVARCHAR(1000) NOT NULL,
    [destination_external_dynamic_list] NVARCHAR(1000) NOT NULL,
    [host_id] NVARCHAR(1000) NOT NULL,
    [serial_number] NVARCHAR(1000) NOT NULL,
    [domain_edl] NVARCHAR(1000) NOT NULL,
    [source_dynamic_address_group] NVARCHAR(1000) NOT NULL,
    [destination_dynamic_address_group] NVARCHAR(1000) NOT NULL,
    [partial_hash] INT NOT NULL,
    [high_res_timestamp] DATETIME2 NOT NULL,
    [reason] NVARCHAR(1000) NOT NULL,
    [justification] NVARCHAR(1000) NOT NULL,
    [nssai_sst] NVARCHAR(1000) NOT NULL,
    [subcategory_of_app] NVARCHAR(1000) NOT NULL,
    [category_of_app] NVARCHAR(1000) NOT NULL,
    [technology_of_app] NVARCHAR(1000) NOT NULL,
    [risk_of_app] INT NOT NULL,
    [characteristic_of_app] NVARCHAR(1000) NOT NULL,
    [container_of_app] NVARCHAR(1000) NOT NULL,
    [tunneled_app] NVARCHAR(1000) NOT NULL,
    [saas_of_app] BIT NOT NULL,
    [sanctioned_state_of_app] BIT NOT NULL,
    CONSTRAINT [table_palo_alto_pkey] PRIMARY KEY CLUSTERED ([id])
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
