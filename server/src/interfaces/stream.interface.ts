export interface IStreamResults {
  data: string[][];
  errors: any[];
  meta: Meta;
}

export interface IRecordIncidents {
  mes: string;
  data: Date;
  incidentes_reportados: number;
  incidentes_resolvidos_por_intervencao: number;
  incidentes_resolvidos_por_acao_tecnica: number;
  incidentes_pendentes_por_investigacao: number;
  falsos_positivos: number;
}

export interface IRecordDarktrace {
  time: Date | undefined;
  username: string;
  ip: string;
  method: string;
  status: number;
  endpoint: string;
  description: string;
}

export interface IRecordImpervaWaf {
  user_name_applicative: string;
  source_ip: string;
  alert_description: string;
  alert_type: string;
  user_name_db: string;
  num_of_events: number;
  alert_start_time: Date | undefined;
  source_app: string;
  immediate_action: string;
  url: string;
}

export interface IRecordImpervaDam {
  num_of_events: number;
}

export interface IRecordCheckpointFwAttack {
  severity: string;
  blade: string;
  logs: number;
  attack: string;
}

export interface IRecordCheckpointFw {
  blade: string;
  logs: number;
}

export interface IRecordCheckpointHarmony {
  receive_time: Date | undefined;
  quarantined: boolean;
  subject: string;
  recipients: string;
  sender: string;
  server_ip: string;
  client_ip: string;
  links: string;
}

export interface IRecordPortnox {
  title: string;
  start_info: Date;
  events_count: string;
  time_stamp: string;
  device_name: string;
  device_ip: string;
  device_os: string;
  mac_address: string;
  network_entity_ip: string;
  nv_unit: string;
  nv_port: number;
  action: string;
  event_name: string;
  connected: boolean;
  reocurrences: number;
  vr_os: string;
  status_events: string;
}

export interface IRecordAdAudit {
  user_name: string;
  client_ip_address: string;
  client_host_name: string;
  domain_controller: string;
  logon_time: Date;
  event_type_text: string;
  failure_reason: string;
  client_port: number;
  user_distinguish_name: string;
  pre_authentication_type: string;
  failure_type: string;
  logon_service: string;
  monitor_id: number;
}

export interface IRecordPaloAlto {
  domain: number;
  receive_time: Date;
  serial: string;
  type: string;
  threat_content_type: string;
  config_version: string;
  generate_time: Date;
  source_address: string;
  destination_address: string;
  nat_source_ip: string;
  nat_destination_ip: string;
  rule: string;
  source_user: string;
  destination_user: string;
  application: string;
  virtual_system: string;
  source_zone: string;
  destination_zone: string;
  inbound_interface: string;
  outbound_interface: string;
  log_action: string;
  time_logged: Date;
  session_id: number;
  repeat_count: number;
  source_port: number;
  destination_port: number;
  nat_source_port: number;
  nat_destination_port: number;
  flags: string;
  ip_protocol: string;
  action: string;
  url_filename: string;
  threat_content_name: string;
  category: string;
  severity: string;
  direction: string;
  sequence_number: string;
  action_flags: string;
  source_country: string;
  destination_country: string;
  contenttype: string;
  pcap_id: number;
  filedigest: string;
  cloud: string;
  url_idx: number;
  user_agent: string;
  filetype: string;
  xff: string;
  referer: string;
  sender: string;
  subject: string;
  recipient: string;
  reportid: number;
  dg_hierarchy_level_1: number;
  dg_hierarchy_level_2: number;
  dg_hierarchy_level_3: number;
  dg_hierarchy_level_4: number;
  virtual_system_name: string;
  device_name: string;
  file_url: string;
  source_vm_uuid: string;
  destination_vm_uuid: string;
  http_method: string;
  tunnel_id_imsi: number;
  monitor_tag_imei: string;
  parent_session_id: number;
  parent_session_start_time: string;
  tunnel: string;
  thr_category: string;
  contentver: string;
  sig_flags: string;
  sctp_association_id: number;
  payload_protocol_id: string;
  http_headers: string;
  url_category_list: string;
  uuid_for_rule: string;
  http_2_connection: number;
  dynusergroup_name: string;
  xff_address: string;
  source_device_category: string;
  source_device_profile: string;
  source_device_model: string;
  source_device_vendor: string;
  source_device_os_family: string;
  source_device_os_version: string;
  source_hostname: string;
  source_mac_address: string;
  destination_device_category: string;
  destination_device_profile: string;
  destination_device_model: string;
  destination_device_vendor: string;
  destination_device_os_family: string;
  destination_device_os_version: string;
  destination_hostname: string;
  destination_mac_address: string;
  container_id: string;
  pod_namespace: string;
  pod_name: string;
  source_external_dynamic_list: string;
  destination_external_dynamic_list: string;
  host_id: string;
  serial_number: string;
  domain_edl: string;
  source_dynamic_address_group: string;
  destination_dynamic_address_group: string;
  partial_hash: number;
  high_res_timestamp: Date;
  reason: string;
  justification: string;
  nssai_sst: string;
  subcategory_of_app: string;
  category_of_app: string;
  technology_of_app: string;
  risk_of_app: number;
  characteristic_of_app: string;
  container_of_app: string;
  tunneled_app: string;
  saas_of_app: boolean;
  sanctioned_state_of_app: boolean;
}

interface Meta {
  delimiter: string;
  linebreak: string;
  aborted: boolean;
  truncated: boolean;
  cursor: number;
}
