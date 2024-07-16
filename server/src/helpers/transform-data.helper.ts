import {
  createAdAudit,
  createCheckpointFirewallAttackData,
  createCheckpointFw,
  createCheckpontHarmonyData,
  createDarktraceData,
  createImpervaDamData,
  createImpervaWafData,
  createIncidents,
  createPaloAlto,
  createPortnoxData,
} from 'src/app/data/helper/create.helper';
import {
  IRecordAdAudit,
  IRecordCheckpointFw,
  IRecordCheckpointFwAttack,
  IRecordCheckpointHarmony,
  IRecordDarktrace,
  IRecordImpervaDam,
  IRecordImpervaWaf,
  IRecordIncidents,
  IRecordPaloAlto,
  IRecordPortnox,
} from 'src/interfaces/stream.interface';

import {
  IAdAuditData,
  ICheckpointFwAttackData,
  ICheckpointFwData,
  ICheckpointHarmonyData,
  IDarktraceData,
  IImpervaDamData,
  IImpervaWafData,
  IPaloAltoData,
  IPortnoxData,
} from 'src/interfaces/transform-data.interface';

export async function transformIncidents(data: IDarktraceData) {
  const header = transformHeaderArray(data[0]);
  const newData = data.slice(1);

  const record: IRecordIncidents = {
    mes: '',
    data: new Date(),
    incidentes_reportados: 0,
    incidentes_resolvidos_por_intervencao: 0,
    incidentes_resolvidos_por_acao_tecnica: 0,
    incidentes_pendentes_por_investigacao: 0,
    falsos_positivos: 0,
  };

  for (const row of newData) {
    header[0] === 'mes' ? (record.mes = row[0]) : '';
    header[1] === 'data' ? (record.data = incidentsDate(row[1])) : '';
    header[2] === 'incidentes_reportados'
      ? (record.incidentes_reportados = Number(row[2]))
      : '';
    header[3] === 'incidentes_resolvidos_por_intervencao'
      ? (record.incidentes_resolvidos_por_intervencao = Number(row[3]))
      : '';
    header[4] === 'incidentes_resolvidos_por_acao_tecnica'
      ? (record.incidentes_resolvidos_por_acao_tecnica = Number(row[4]))
      : '';
    header[5] === 'incidentes_pendentes_por_investigacao'
      ? (record.incidentes_pendentes_por_investigacao = Number(row[5]))
      : '';
    header[6] === 'falsos_positivos'
      ? (record.falsos_positivos = Number(row[6]))
      : '';

    await createIncidents(record);
  }
}

function incidentsDate(str: string) {
  const dateParts = str.split('/');
  const formattedDateString =
    dateParts[1] + '/' + dateParts[0] + '/' + dateParts[2];

  return new Date(formattedDateString);
}

export async function transformDarktraceData(data: IDarktraceData) {
  const header = data[0];
  const newData = data.slice(1);

  const record: IRecordDarktrace = {
    time: undefined,
    username: '',
    ip: '',
    method: '',
    status: 0,
    endpoint: '',
    description: '',
  };

  for (const row of newData) {
    header[0] === 'time' ? (record.time = new Date(row[0])) : '';
    header[1] === 'username' ? (record.username = row[1]) : '';
    header[2] === 'ip' ? (record.ip = row[2]) : '';
    header[3] === 'method' ? (record.method = row[3]) : '';
    header[4] === 'status' ? (record.status = Number(row[4])) : '';
    header[5] === 'endpoint' ? (record.endpoint = row[5]) : '';
    header[6] === 'description' ? (record.description = row[6]) : '';

    await createDarktraceData(record);
  }
}

export async function transformPortnox(data: IPortnoxData) {
  const header = transformedPortnoxHeaderArray(data[0]);
  const newData = data.slice(1);

  const record: IRecordPortnox = {
    title: '',
    start_info: new Date(),
    events_count: '',
    time_stamp: '',
    device_name: '',
    device_ip: '',
    device_os: '',
    mac_address: '',
    network_entity_ip: '',
    nv_unit: '',
    nv_port: 0,
    action: '',
    event_name: '',
    connected: false,
    reocurrences: 0,
    vr_os: '',
    status_events: '',
  };

  for (const row of newData) {
    const date = stringToDate(row[24]);

    record.title = row[1];
    record.start_info = date;
    record.events_count = '';
    record.time_stamp = '';
    record.device_name = row[26];
    record.device_ip = row[27];
    record.device_os = row[28];
    record.mac_address = row[30];
    record.network_entity_ip = row[31];
    record.nv_unit = row[32];
    record.nv_port = Number(row[33]);
    record.action = row[34];
    record.event_name = row[35];
    record.connected = false;
    record.reocurrences = Number(row[25]);
    record.vr_os = '';
    record.status_events = '';

    await createPortnoxData(record);
  }
}

export async function transformImpervaWaf(data: IImpervaWafData) {
  const header = transformHeaderArray(data[0]);
  const newData = data.slice(1);

  const record: IRecordImpervaWaf = {
    user_name_applicative: '',
    source_ip: '',
    alert_description: '',
    alert_type: '',
    user_name_db: '',
    num_of_events: 0,
    alert_start_time: undefined,
    source_app: '',
    immediate_action: '',
    url: '',
  };

  for (const row of newData) {
    header[0] === 'alert_start_time'
      ? (record.alert_start_time = new Date(Date.parse(row[0])))
      : '';
    header[1] === 'user_name_applicative'
      ? (record.user_name_applicative = row[1])
      : '';
    header[2] === 'user_name_db' ? (record.user_name_db = row[2]) : '';
    header[3] === 'source_ip' ? (record.source_ip = row[3]) : '';
    header[4] === 'source_app' ? (record.source_app = row[4]) : '';
    header[5] === 'url' ? (record.url = row[5]) : '';
    header[6] === 'immediate_action' ? (record.immediate_action = row[6]) : '';
    header[7] === 'alert_description'
      ? (record.alert_description = row[7])
      : '';
    header[8] === 'alert_type' ? (record.alert_type = row[8]) : '';
    header[9] === 'num_of_events'
      ? (record.num_of_events = Number(row[9]))
      : '';

    await createImpervaWafData(record);
  }
}

export async function transformImpervaDam(data: IImpervaDamData) {
  const header = transformHeaderArray(data[0]);
  const newData = data.slice(1);

  const record: IRecordImpervaDam = {
    num_of_events: 0,
  };

  for (const row of newData) {
    header[0] === 'num_of_events'
      ? (record.num_of_events = Number(row[0].replace(',', '')))
      : '';

    await createImpervaDamData(record);
  }
}

export async function transformCheckpointFwAttack(
  data: ICheckpointFwAttackData,
) {
  const header = transformHeaderArray(data[0]);
  const newData = data.slice(1);

  const record: IRecordCheckpointFwAttack = {
    attack: '',
    severity: '',
    blade: '',
    logs: 0,
  };

  for (const row of newData) {
    header[0] === 'attack' ? (record.attack = row[0]) : '';
    header[1] === 'severity' ? (record.severity = row[1]) : '';
    header[2] === 'blade' ? (record.blade = row[2]) : '';
    header[3] === 'logs' ? (record.logs = Number(row[3])) : '';

    await createCheckpointFirewallAttackData(record);
  }
}

export async function transformCheckpointHarmony(data: ICheckpointHarmonyData) {
  const header = transformHeaderArray(data[0]);
  const newData = data.slice(1);

  const record: IRecordCheckpointHarmony = {
    receive_time: undefined,
    quarantined: false,
    subject: '',
    recipients: '',
    sender: '',
    server_ip: '',
    client_ip: '',
    links: '',
  };

  for (const row of newData) {
    header[0] === 'receive_time'
      ? (record.receive_time = new Date(row[0]))
      : '';
    header[1] === 'quarantined'
      ? (record.quarantined = !Boolean(
          row[1] === 'FALSE' || row[1] === 'false',
        ))
      : '';
    header[2] === 'subject' ? (record.subject = row[2]) : '';
    header[3] === 'recipients' ? (record.recipients = row[3]) : '';
    header[4] === 'sender' ? (record.sender = row[4]) : '';
    header[5] === 'server_ip' ? (record.server_ip = row[5]) : '';
    header[6] === 'client_ip' ? (record.client_ip = row[6]) : '';
    header[7] === 'links' ? (record.links = row[7]) : '';

    await createCheckpontHarmonyData(record);
  }
}

export async function transformCheckpointFw(data: ICheckpointFwData) {
  const header = transformHeaderArray(data[0]);
  const newData = data.slice(1);

  const record: IRecordCheckpointFw = {
    blade: '',
    logs: 0,
  };

  for (const row of newData) {
    header[0] === 'blade' ? (record.blade = row[0]) : '';
    header[1] === 'logs' ? (record.logs = Number(row[1])) : '';

    await createCheckpointFw(record);
  }
}

export async function transformAdAudit(data: IAdAuditData) {
  const header = transformHeaderArray(data[8]);
  const newData = data.slice(9);

  const record: IRecordAdAudit = {
    user_name: '',
    client_ip_address: '',
    client_host_name: '',
    domain_controller: '',
    logon_time: new Date(),
    event_type_text: '',
    failure_reason: '',
    client_port: 0,
    user_distinguish_name: '',
    pre_authentication_type: '',
    failure_type: '',
    logon_service: '',
    monitor_id: 0,
  };

  for (const row of newData) {
    header[0] === 'user_name' ? (record.user_name = row[0]) : '';
    header[1] === 'client_ip_address'
      ? (record.client_ip_address = row[1])
      : '';
    header[2] === 'client_host_name' ? (record.client_host_name = row[2]) : '';
    header[3] === 'domain_controller'
      ? (record.domain_controller = row[3])
      : '';
    header[4] === 'logon_time'
      ? (record.logon_time = stringToDate(row[4]))
      : '';
    header[5] === 'event_type_text' ? (record.event_type_text = row[5]) : '';
    header[6] === 'failure_reason' ? (record.failure_reason = row[6]) : '';
    header[7] === 'client_port' ? (record.client_port = Number(row[7])) : '';
    header[8] === 'user_distinguish_name'
      ? (record.user_distinguish_name = row[8])
      : '';
    header[9] === 'pre_authentication_type'
      ? (record.pre_authentication_type = row[9])
      : '';
    header[10] === 'failure_type' ? (record.failure_type = row[10]) : '';
    header[11] === 'logon_service' ? (record.logon_service = row[11]) : '';
    header[12] === 'monitor_id' ? (record.monitor_id = Number(row[12])) : '';

    await createAdAudit(record);
  }
}

export async function transformPaloAlto(data: IPaloAltoData) {
  const header = transformHeaderArray(data[0]);
  const newData = data.slice(1);

  const record: IRecordPaloAlto = {
    domain: 0,
    receive_time: new Date(),
    serial: '',
    type: '',
    threat_content_type: '',
    config_version: '',
    generate_time: new Date(),
    source_address: '',
    destination_address: '',
    nat_source_ip: '',
    nat_destination_ip: '',
    rule: '',
    source_user: '',
    destination_user: '',
    application: '',
    virtual_system: '',
    source_zone: '',
    destination_zone: '',
    inbound_interface: '',
    outbound_interface: '',
    log_action: '',
    time_logged: new Date(),
    session_id: 0,
    repeat_count: 0,
    source_port: 0,
    destination_port: 0,
    nat_source_port: 0,
    nat_destination_port: 0,
    flags: '',
    ip_protocol: '',
    action: '',
    url_filename: '',
    threat_content_name: '',
    category: '',
    severity: '',
    direction: '',
    sequence_number: '',
    action_flags: '',
    source_country: '',
    destination_country: '',
    contenttype: '',
    pcap_id: 0,
    filedigest: '',
    cloud: '',
    url_idx: 0,
    user_agent: '',
    filetype: '',
    xff: '',
    referer: '',
    sender: '',
    subject: '',
    recipient: '',
    reportid: 0,
    dg_hierarchy_level_1: 0,
    dg_hierarchy_level_2: 0,
    dg_hierarchy_level_3: 0,
    dg_hierarchy_level_4: 0,
    virtual_system_name: '',
    device_name: '',
    file_url: '',
    source_vm_uuid: '',
    destination_vm_uuid: '',
    http_method: '',
    tunnel_id_imsi: 0,
    monitor_tag_imei: '',
    parent_session_id: 0,
    parent_session_start_time: '',
    tunnel: '',
    thr_category: '',
    contentver: '',
    sig_flags: '',
    sctp_association_id: 0,
    payload_protocol_id: '',
    http_headers: '',
    url_category_list: '',
    uuid_for_rule: '',
    http_2_connection: 0,
    dynusergroup_name: '',
    xff_address: '',
    source_device_category: '',
    source_device_profile: '',
    source_device_model: '',
    source_device_vendor: '',
    source_device_os_family: '',
    source_device_os_version: '',
    source_hostname: '',
    source_mac_address: '',
    destination_device_category: '',
    destination_device_profile: '',
    destination_device_model: '',
    destination_device_vendor: '',
    destination_device_os_family: '',
    destination_device_os_version: '',
    destination_hostname: '',
    destination_mac_address: '',
    container_id: '',
    pod_namespace: '',
    pod_name: '',
    source_external_dynamic_list: '',
    destination_external_dynamic_list: '',
    host_id: '',
    serial_number: '',
    domain_edl: '',
    source_dynamic_address_group: '',
    destination_dynamic_address_group: '',
    partial_hash: 0,
    high_res_timestamp: new Date(),
    reason: '',
    justification: '',
    nssai_sst: '',
    subcategory_of_app: '',
    category_of_app: '',
    technology_of_app: '',
    risk_of_app: 0,
    characteristic_of_app: '',
    container_of_app: '',
    tunneled_app: '',
    saas_of_app: false,
    sanctioned_state_of_app: false,
  };

  for (const row of newData) {
    header[0] === 'domain' ? (record.domain = Number(row[0])) : null;
    header[1] === 'receive_time'
      ? (record.receive_time = new Date(row[1]))
      : null;
    header[2] === 'serial' ? (record.serial = row[2]) : null;
    header[3] === 'type' ? (record.type = row[3]) : null;
    header[4] === 'threat_content_type'
      ? (record.threat_content_type = row[4])
      : null;
    header[5] === 'config_version' ? (record.config_version = row[5]) : null;
    header[6] === 'generate_time'
      ? (record.generate_time = new Date(row[6]))
      : null;
    header[7] === 'source_address' ? (record.source_address = row[7]) : null;
    header[8] === 'destination_address'
      ? (record.destination_address = row[8])
      : null;
    header[9] === 'nat_source_ip' ? (record.nat_source_ip = row[9]) : null;
    header[10] === 'nat_destination_ip'
      ? (record.nat_destination_ip = row[10])
      : null;
    header[11] === 'rule' ? (record.rule = row[11]) : null;
    header[12] === 'source_user' ? (record.source_user = row[12]) : null;
    header[13] === 'destination_user'
      ? (record.destination_user = row[13])
      : null;
    header[14] === 'application' ? (record.application = row[14]) : null;
    header[15] === 'virtual_system' ? (record.virtual_system = row[15]) : null;
    header[16] === 'source_zone' ? (record.source_zone = row[16]) : null;
    header[17] === 'destination_zone'
      ? (record.destination_zone = row[17])
      : null;
    header[18] === 'inbound_interface'
      ? (record.inbound_interface = row[18])
      : null;
    header[19] === 'outbound_interface'
      ? (record.outbound_interface = row[19])
      : null;
    header[20] === 'log_action' ? (record.log_action = row[20]) : null;
    header[21] === 'time_logged'
      ? (record.time_logged = new Date(row[21]))
      : null;
    header[22] === 'session_id' ? (record.session_id = Number(row[22])) : null;
    header[23] === 'repeat_count'
      ? (record.repeat_count = Number(row[23]))
      : null;
    header[24] === 'source_port'
      ? (record.source_port = Number(row[24]))
      : null;
    header[25] === 'destination_port'
      ? (record.destination_port = Number(row[25]))
      : null;
    header[26] === 'nat_source_port'
      ? (record.nat_source_port = Number(row[26]))
      : null;
    header[27] === 'nat_destination_port'
      ? (record.nat_destination_port = Number(row[27]))
      : null;
    header[28] === 'flags' ? (record.flags = row[28]) : null;
    header[29] === 'ip_protocol' ? (record.ip_protocol = row[29]) : null;
    header[30] === 'action' ? (record.action = row[30]) : null;
    header[31] === 'url_filename' ? (record.url_filename = row[31]) : null;
    header[32] === 'threat_content_name'
      ? (record.threat_content_name = row[32])
      : null;
    header[33] === 'category' ? (record.category = row[33]) : null;
    header[34] === 'severity' ? (record.severity = row[34]) : null;
    header[35] === 'direction' ? (record.direction = row[35]) : null;
    header[36] === 'sequence_number'
      ? (record.sequence_number = row[36])
      : null;
    header[37] === 'action_flags' ? (record.action_flags = row[37]) : null;
    header[38] === 'source_country' ? (record.source_country = row[38]) : null;
    header[39] === 'destination_country'
      ? (record.destination_country = row[39])
      : null;
    header[40] === 'contenttype' ? (record.contenttype = row[40]) : null;
    header[41] === 'pcap_id' ? (record.pcap_id = Number(row[41])) : null;
    header[42] === 'filedigest' ? (record.filedigest = row[42]) : null;
    header[43] === 'cloud' ? (record.cloud = row[43]) : null;
    header[44] === 'url_idx' ? (record.url_idx = Number(row[44])) : null;
    header[45] === 'user_agent' ? (record.user_agent = row[45]) : null;
    header[46] === 'filetype' ? (record.filetype = row[46]) : null;
    header[47] === 'xff' ? (record.xff = row[47]) : null;
    header[48] === 'referer' ? (record.referer = row[48]) : null;
    header[49] === 'sender' ? (record.sender = row[49]) : null;
    header[50] === 'subject' ? (record.subject = row[50]) : null;
    header[51] === 'recipient' ? (record.recipient = row[51]) : null;
    header[52] === 'reportid' ? (record.reportid = Number(row[52])) : null;
    header[53] === 'dg_hierarchy_level_1'
      ? (record.dg_hierarchy_level_1 = Number(row[53]))
      : null;
    header[54] === 'dg_hierarchy_level_2'
      ? (record.dg_hierarchy_level_2 = Number(row[54]))
      : null;
    header[55] === 'dg_hierarchy_level_3'
      ? (record.dg_hierarchy_level_3 = Number(row[55]))
      : null;
    header[56] === 'dg_hierarchy_level_4'
      ? (record.dg_hierarchy_level_4 = Number(row[56]))
      : null;
    header[57] === 'virtual_system_name'
      ? (record.virtual_system_name = row[57])
      : null;
    header[58] === 'device_name' ? (record.device_name = row[58]) : null;
    header[59] === 'file_url' ? (record.file_url = row[59]) : null;
    header[60] === 'source_vm_uuid' ? (record.source_vm_uuid = row[60]) : null;
    header[61] === 'destination_vm_uuid'
      ? (record.destination_vm_uuid = row[61])
      : null;
    header[62] === 'http_method' ? (record.http_method = row[62]) : null;
    header[63] === 'tunnel_id_imsi'
      ? (record.tunnel_id_imsi = Number(row[63]))
      : null;
    header[64] === 'monitor_tag_imei'
      ? (record.monitor_tag_imei = row[64])
      : null;
    header[65] === 'parent_session_id'
      ? (record.parent_session_id = Number(row[65]))
      : null;
    header[66] === 'parent_session_start_time'
      ? (record.parent_session_start_time = row[66])
      : null;
    header[67] === 'tunnel' ? (record.tunnel = row[67]) : null;
    header[69] === 'thr_category' ? (record.thr_category = row[69]) : null;
    header[69] === 'contentver' ? (record.contentver = row[69]) : null;
    header[70] === 'sig_flags' ? (record.sig_flags = row[70]) : null;
    header[71] === 'sctp_association_id'
      ? (record.sctp_association_id = Number(row[71]))
      : null;
    header[72] === 'payload_protocol_id'
      ? (record.payload_protocol_id = row[72])
      : null;
    header[73] === 'http_headers' ? (record.http_headers = row[73]) : null;
    header[74] === 'url_category_list'
      ? (record.url_category_list = row[74])
      : null;
    header[75] === 'uuid_for_rule' ? (record.uuid_for_rule = row[75]) : null;
    header[76] === 'http_2_connection'
      ? (record.http_2_connection = Number(row[76]))
      : null;
    header[77] === 'dynusergroup_name'
      ? (record.dynusergroup_name = row[77])
      : null;
    header[78] === 'xff_address' ? (record.xff_address = row[78]) : null;
    header[79] === 'source_device_category'
      ? (record.source_device_category = row[79])
      : null;
    header[80] === 'source_device_profile'
      ? (record.source_device_profile = row[80])
      : null;
    header[81] === 'source_device_model'
      ? (record.source_device_model = row[81])
      : null;
    header[82] === 'source_device_vendor'
      ? (record.source_device_vendor = row[82])
      : null;
    header[83] === 'source_device_os_family'
      ? (record.source_device_os_family = row[83])
      : null;
    header[84] === 'source_device_os_version'
      ? (record.source_device_os_version = row[84])
      : null;
    header[85] === 'source_hostname'
      ? (record.source_hostname = row[85])
      : null;
    header[86] === 'source_mac_address'
      ? (record.source_mac_address = row[86])
      : null;
    header[87] === 'destination_device_category'
      ? (record.destination_device_category = row[87])
      : null;
    header[88] === 'destination_device_profile'
      ? (record.destination_device_profile = row[88])
      : null;
    header[89] === 'destination_device_model'
      ? (record.destination_device_model = row[89])
      : null;
    header[90] === 'destination_device_vendor'
      ? (record.destination_device_vendor = row[90])
      : null;
    header[91] === 'destination_device_os_family'
      ? (record.destination_device_os_family = row[91])
      : null;
    header[92] === 'destination_device_os_version'
      ? (record.destination_device_os_version = row[92])
      : null;
    header[93] === 'destination_hostname'
      ? (record.destination_hostname = row[93])
      : null;
    header[94] === 'destination_mac_address'
      ? (record.destination_mac_address = row[94])
      : null;
    header[95] === 'container_id' ? (record.container_id = row[95]) : null;
    header[96] === 'pod_namespace' ? (record.pod_namespace = row[96]) : null;
    header[97] === 'pod_name' ? (record.pod_name = row[97]) : null;
    header[98] === 'source_external_dynamic_list'
      ? (record.source_external_dynamic_list = row[98])
      : null;
    header[99] === 'destination_external_dynamic_list'
      ? (record.destination_external_dynamic_list = row[99])
      : null;
    header[100] === 'host_id' ? (record.host_id = row[100]) : null;
    header[101] === 'serial_number' ? (record.serial_number = row[101]) : null;
    header[102] === 'domain_edl' ? (record.domain_edl = row[102]) : null;
    header[103] === 'source_dynamic_address_group'
      ? (record.source_dynamic_address_group = row[103])
      : null;
    header[104] === 'destination_dynamic_address_group'
      ? (record.destination_dynamic_address_group = row[104])
      : null;
    header[105] === 'partial_hash'
      ? (record.partial_hash = Number(row[105]))
      : null;
    header[106] === 'high_res_timestamp'
      ? (record.high_res_timestamp = new Date(row[106]))
      : null;
    header[107] === 'reason' ? (record.reason = row[107]) : null;
    header[108] === 'justification' ? (record.justification = row[108]) : null;
    header[109] === 'nssai_sst' ? (record.nssai_sst = row[109]) : null;
    header[110] === 'subcategory_of_app'
      ? (record.subcategory_of_app = row[110])
      : null;
    header[111] === 'category_of_app'
      ? (record.category_of_app = row[111])
      : null;
    header[112] === 'technology_of_app'
      ? (record.technology_of_app = row[112])
      : null;
    header[113] === 'risk_of_app'
      ? (record.risk_of_app = Number(row[113]))
      : null;
    header[114] === 'characteristic_of_app'
      ? (record.characteristic_of_app = row[114])
      : null;
    header[115] === 'container_of_app'
      ? (record.container_of_app = row[115])
      : null;
    header[116] === 'tunneled_app' ? (record.tunneled_app = row[116]) : null;
    header[117] === 'saas_of_app'
      ? (record.saas_of_app = Boolean(row[117]))
      : null;
    header[118] === 'sanctioned_state_of_app'
      ? (record.sanctioned_state_of_app = Boolean(row[118]))
      : null;

    await createPaloAlto(record);
  }
}

function transformHeaderArray(array: string[]) {
  return array.map((item) => {
    let transformed = item.replace(/\./g, '').replace(/^\s+/, '');
    transformed = transformed.replace(/ /g, '_');
    transformed = transformed.replace(/\(/g, '').replace(/\)/g, '');
    transformed = transformed.replace(/"/g, '');
    transformed = transformed.replace(/\//g, '_');
    transformed = transformed.toLowerCase();

    transformed = transformed.replace('serial_#', 'serial');

    return transformed;
  });
}

function transformedPortnoxHeaderArray(array: string[]) {
  return array.map((item) => {
    const transformed = item.replace(
      /(TextBox|textBox|CaptionTextBox|DataTextBox)/g,
      '',
    );

    return transformed;
  });
}

function stringToDate(dateString: string) {
  if (typeof dateString === 'string') {
    try {
      const parts = dateString.split('/');
      const day = Number(parts[0]);
      const month = Number(parts[1]) - 1;
      const yearAndTime = parts[2]?.split(' ');
      const year = Number(yearAndTime[0]);
      const time = yearAndTime[1].split(':');
      const hour = Number(time[0]);
      const minute = Number(time[1]);
      const second = 0;

      return new Date(year, month, day, hour, minute, second);
    } catch (error) {}
  }

  return;
}
