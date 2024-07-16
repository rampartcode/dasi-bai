import { IncidentResponse } from './../../../node_modules/.prisma/client/index.d';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/libs/prisma';

import { Readable } from 'stream';
import { parse } from 'papaparse';

import {
  transformAdAudit,
  transformCheckpointFw,
  transformCheckpointFwAttack,
  transformCheckpointHarmony,
  transformDarktraceData,
  transformImpervaDam,
  transformImpervaWaf,
  transformIncidents,
  transformPaloAlto,
  transformPortnox,
} from 'src/helpers/transform-data.helper';

import { TotalEvents } from 'src/interfaces/data.interface';
import { IStreamResults } from 'src/interfaces/stream.interface';

@Injectable()
export class DataService {
  constructor(private readonly prisma: PrismaService) {}

  async uploadMultipleFiles(files: {
    [fieldname: string]: Express.Multer.File[];
  }) {
    try {
      if (files.ad_audit) {
        console.log(files.ad_audit);
      }
      // if (files.ad_audit) {
      //   const file = files.ad_audit[0];
      //   const stream = new ReadableStream(file.buffer);

      //   const csv = parse(stream, {
      //     header: false,
      //     worker: true,
      //     delimiter: ',',
      //     complete: async (result: any) => {
      //       console.log(result);
      //     },
      //     error: (err: any) => {
      //       console.log(err);
      //     },
      //   });
      // }

      for (const fieldname in files) {
        const file = files[fieldname][0];
        const stream = Readable.from(file.buffer);

        const csvData = parse(stream, {
          header: false,
          worker: true,
          delimiter: ',',
          complete: async (results: IStreamResults) => {
            file.fieldname === 'ad_audit' &&
              (await transformAdAudit(results.data));
            file.fieldname === 'darktrace' &&
              (await transformDarktraceData(results.data));
            file.fieldname === 'portnox' &&
              (await transformPortnox(results.data));
            file.fieldname === 'imperva_waf' &&
              (await transformImpervaWaf(results.data));
            file.fieldname === 'imperva_dam' &&
              (await transformImpervaDam(results.data));
            file.fieldname === 'checkpoint_harmony' &&
              (await transformCheckpointHarmony(results.data));
            file.fieldname === 'checkpoint_fw_attack' &&
              (await transformCheckpointFwAttack(results.data));
            file.fieldname === 'checkpoint_fw' &&
              (await transformCheckpointFw(results.data));
            file.fieldname === 'paloalto' &&
              (await transformPaloAlto(results.data));
          },
        });
      }
    } catch (error) {
      throw error;
    }
  }

  async uploadIncidents(file: Express.Multer.File) {
    try {
      const stream = Readable.from(file.buffer);

      const csvData = parse(stream, {
        header: false,
        worker: true,
        delimiter: ',',
        complete: async (results: IStreamResults) => {
          await transformIncidents(results.data);
        },
      });
    } catch (error) {}
  }

  async getData(start_at?: Date, end_at?: Date) {
    const totalEvents = await this.getTotalEvents(start_at, end_at);
    const severity = await this.getSeverity(start_at, end_at);
    const checkpointIndicators = await this.getCheckpointIndicators(
      start_at,
      end_at,
    );
    const portnoxIndicators = await this.getPortnoxIndicators(start_at, end_at);
    const generalActivity = await this.getGeneralMonthData();

    const incidentResponse = await this.getIncidentResponse(start_at, end_at);

    return {
      totalEvents,
      severity,
      checkpointIndicators,
      portnoxIndicators,
      generalActivity,
      incidentResponse,
    };
  }

  async getTotalEvents(start_at?: Date, end_at?: Date): Promise<TotalEvents> {
    const filters =
      start_at && end_at ? { createdAt: { gte: start_at, lte: end_at } } : {};

    let counts;

    if (start_at && end_at) {
      counts = await Promise.all([
        this.prisma.portnox.count({ where: filters }),
        this.prisma.darktrace.count({ where: filters }),
        this.prisma.impervaDam.aggregate({
          _sum: { num_of_events: true },
          where: filters,
        }),
        this.prisma.impervaWaf.aggregate({
          _sum: { num_of_events: true },
          where: filters,
        }),
        this.prisma.checkpointFw.aggregate({
          _sum: { logs: true },
          where: filters,
        }),
        this.prisma.adAudit.count({ where: filters }),
        this.prisma.tablePaloAlto.count({ where: filters }),
        this.prisma.checkpointHarmony.count({ where: filters }),
        this.prisma.checkpointFwAttack.aggregate({
          _sum: { logs: true },
          where: filters,
        }),
      ]);
    } else {
      counts = await Promise.all([
        this.prisma.portnox.count(),
        this.prisma.darktrace.count(),
        this.prisma.impervaDam.aggregate({
          _sum: { num_of_events: true },
        }),
        this.prisma.impervaWaf.aggregate({
          _sum: { num_of_events: true },
        }),
        this.prisma.checkpointFw.aggregate({
          _sum: { logs: true },
        }),
        this.prisma.adAudit.count(),
        this.prisma.tablePaloAlto.count(),
        this.prisma.checkpointHarmony.count(),
        this.prisma.checkpointFwAttack.aggregate({
          _sum: { logs: true },
        }),
      ]);
    }

    const [
      tPortnox,
      tDarktrace,
      tImpervaDam,
      tImpervaWaf,
      tCheckpointFw,
      tAdAudit,
      tPaloAlto,
      tCheckpointHm,
      tCheckpointFwAtt,
    ] = counts;

    const total =
      tPortnox +
      tDarktrace +
      tImpervaDam._sum.num_of_events +
      tImpervaWaf._sum.num_of_events +
      tCheckpointFw._sum.logs +
      tAdAudit +
      tPaloAlto +
      tCheckpointHm +
      tCheckpointFwAtt._sum.logs;

    return {
      totalEvents: total,
      totalPortnox: tPortnox,
      totalDarktrace: tDarktrace,
      totalImpDam: tImpervaDam._sum.num_of_events
        ? tImpervaDam._sum.num_of_events
        : 0,
      totalImpWaf: tImpervaWaf._sum.num_of_events
        ? tImpervaWaf._sum.num_of_events
        : 0,
      totalCheckFw: tCheckpointFw._sum.logs ? tCheckpointFw._sum.logs : 0,
      totalAdAudit: tAdAudit,
      totalPaloAlto: tPaloAlto,
      totalCheckHm: tCheckpointHm,
      totalCheckFwAtt: tCheckpointFwAtt._sum.logs
        ? tCheckpointFwAtt._sum.logs
        : 0,
    };
  }

  async getSeverity(start_at?: Date, end_at?: Date) {
    const filters =
      start_at && end_at ? { createdAt: { gte: start_at, lte: end_at } } : {};

    let data;

    if (start_at && end_at) {
      data = await Promise.all([
        this.prisma.tablePaloAlto.findMany({
          where: filters,
        }),
        this.prisma.checkpointFwAttack.findMany({
          where: filters,
        }),
      ]);
    } else {
      data = await Promise.all([
        this.prisma.tablePaloAlto.findMany(),
        this.prisma.checkpointFwAttack.findMany(),
      ]);
    }

    const severity = {
      low: 0,
      medium: 0,
      high: 0,
      critical: 0,
    };

    const [paloAlto, checkFw] = data;

    paloAlto.forEach((row) => {
      row.severity === 'low' && (severity.low += 1);
      row.severity === 'medium' && (severity.medium += 1);
      row.severity === 'high' && (severity.high += 1);
      row.severity === 'critical' && (severity.critical += 1);
    });

    checkFw.forEach((row) => {
      row.severity.toLowerCase() === 'low' && (severity.low += row.logs);
      row.severity.toLowerCase() === 'medium' && (severity.medium += row.logs);
      row.severity.toLowerCase() === 'high' && (severity.high += row.logs);
      row.severity.toLowerCase() === 'critical' &&
        (severity.critical += row.logs);
    });

    return severity;
  }

  async getLastUpdate() {
    try {
      const { createdAt } = await this.prisma.darktrace.findFirst({
        orderBy: { createdAt: 'desc' },
      });

      return {
        lastUpdate: createdAt,
      };
    } catch (error) {
      return {
        lastUpdate: null,
      };
    }
  }

  async getCheckpointIndicators(start_at?: Date, end_at?: Date) {
    try {
      const filters =
        start_at && end_at ? { createdAt: { gte: start_at, lte: end_at } } : {};

      const data = await this.prisma.checkpointFw.findMany({
        where: filters,
      });

      const res = data.reduce(
        (acc, item) => {
          const blade = item.blade.toLowerCase();
          if (blade === 'firewall') {
            acc.firewall += item.logs;
          } else if (blade === 'anti-bot') {
            acc.antibot += item.logs;
          } else if (blade === 'anti-malware') {
            acc.antimalware += item.logs;
          } else if (blade === 'anti-virus') {
            acc.antivirus += item.logs;
          } else if (blade === 'ransomware') {
            acc.ransomware += item.logs;
          }

          return acc;
        },
        {
          firewall: 0,
          antimalware: 0,
          antivirus: 0,
          antibot: 0,
          ransomware: 0,
        },
      );

      return res;
    } catch (error) {}
  }

  async getIncidentResponse(start_at?: Date, end_at?: Date) {
    try {
      const filters =
        start_at && end_at ? { data: { gte: start_at, lte: end_at } } : {};

      const i = await this.prisma.incidentResponse.findMany({
        where: filters,
      });

      const incidents = i.reduce(
        (acc, incident) => {
          acc[0].total += incident.incidentes_reportados;
          acc[1].total += incident.incidentes_resolvidos_por_intervencao;
          acc[2].total += incident.incidentes_resolvidos_por_acao_tecnica;
          acc[3].total += incident.incidentes_pendentes_por_investigacao;
          acc[4].total += incident.falsos_positivos;

          return acc;
        },
        [
          {
            name: 'Incidentes Reportados',
            total: 0,
          },
          {
            name: 'Incidentes Resolvidos por Intervenção',
            total: 0,
          },
          {
            name: 'Incidentes Resolvidos por Ação Técnica',
            total: 0,
          },
          {
            name: 'Incidentes Pendentes por Investigação',
            total: 0,
          },
          {
            name: 'Falsos Positivos',
            total: 0,
          },
        ],
      );
      return incidents;
    } catch (error) {}
  }

  async getPortnoxIndicators(start_at?: Date, end_at?: Date) {
    try {
      const filters =
        start_at && end_at
          ? { start_info: { gte: start_at, lte: end_at } }
          : {};

      const data = await this.prisma.portnox.findMany({
        where: filters,
      });

      const portnoxIndicators = data.reduce(
        (acc, item) => {
          const event = item.event_name.toLocaleLowerCase();

          event === 'does not comply' ? (acc.dvc_nt_comply += 1) : '';
          event === 'device unreachable' ? (acc.dvc_unreachable += 1) : '';
          event === 'rogue device' ? (acc.dvc_rogue += 1) : '';
          event === 'missing ip' ? (acc.mss_ips += 1) : '';

          return acc;
        },
        {
          dvc_nt_comply: 0,
          dvc_unreachable: 0,
          dvc_rogue: 0,
          mss_ips: 0,
        },
      );

      const monthlyData = await Promise.all([
        await this.getDataForGraphic('does not comply'),
        await this.getDataForGraphic('device unreachable'),
        await this.getDataForGraphic('rogue device'),
        await this.getDataForGraphic('missing ip'),
      ]);

      return {
        indicators: portnoxIndicators,
        monthly: {
          dvc_nt_comply: monthlyData[0],
          dvc_unreachable: monthlyData[1],
          dvc_rogue: monthlyData[2],
          mss_ips: monthlyData[3],
        },
      };
    } catch (error) {}
  }

  async getDataForGraphic(evt_name: string) {
    try {
      const data = await this.prisma.portnox.findMany({
        where: {
          event_name: evt_name,
        },
        select: {
          start_info: true,
        },
      });

      const months = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

      data.forEach((d) => {
        const month = d.start_info.getMonth() + 1;

        month === 1 && (months[0] += 1);
        month === 2 && (months[1] += 1);
        month === 3 && (months[2] += 1);
        month === 4 && (months[3] += 1);
        month === 5 && (months[4] += 1);
        month === 6 && (months[5] += 1);
        month === 7 && (months[6] += 1);
        month === 8 && (months[7] += 1);
        month === 9 && (months[8] += 1);
        month === 10 && (months[9] += 1);
        month === 11 && (months[10] += 1);
        month === 12 && (months[11] += 1);
      });

      return months;
    } catch (error) {
      // Lida com o erro adequadamente
    }
  }

  async getGeneralMonthData() {
    try {
      const results = await Promise.all([
        this.prisma.checkpointFw.findMany({ select: { createdAt: true } }),
        this.prisma.checkpointFwAttack.findMany({
          select: { createdAt: true },
        }),
        this.prisma.checkpointHarmony.findMany({
          select: { receive_time: true },
        }),
        this.prisma.darktrace.findMany({ select: { time: true } }),
        this.prisma.impervaDam.findMany({ select: { createdAt: true } }),
        this.prisma.impervaWaf.findMany({ select: { alert_start_time: true } }),
        this.prisma.portnox.findMany({ select: { start_info: true } }),
        this.prisma.adAudit.findMany({ select: { logon_time: true } }),
        this.prisma.tablePaloAlto.findMany({ select: { generate_time: true } }),
      ]);

      const months = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

      results.forEach((r) => {
        r.forEach((record) => {
          let m: number;

          if (record?.createdAt) {
            m = this.threatMonth(record.createdAt);
            typeof m === 'number' && (months[m] += 1);
            m = undefined;
          } else if (record?.receive_time) {
            m = this.threatMonth(record.receive_time);
            typeof m === 'number' && (months[m] += 1);
            m = undefined;
          } else if (record?.time) {
            m = this.threatMonth(record.time);
            typeof m === 'number' && (months[m] += 1);
            m = undefined;
          } else if (record?.alert_start_time) {
            m = this.threatMonth(record.alert_start_time);
            typeof m === 'number' && (months[m] += 1);
            m = undefined;
          } else if (record?.start_info) {
            m = this.threatMonth(record.start_info);
            typeof m === 'number' && (months[m] += 1);
            m = undefined;
          } else if (record?.logon_time) {
            m = this.threatMonth(record.logon_time);
            typeof m === 'number' && (months[m] += 1);
            m = undefined;
          } else if (record?.generate_time) {
            m = this.threatMonth(record.generate_time);
            typeof m === 'number' && (months[m] += 1);
            m = undefined;
          }
        });
      });

      return months;
    } catch (error) {}
  }

  async getAdAuditIndicators(start_at?: Date, end_at?: Date) {
    const monthly = await this.getMonthlyIdicators(start_at, end_at);
    const failure = await this.getFailureReasom(start_at, end_at);

    return {
      monthly,
      failure,
    };
  }

  threatMonth(d: Date) {
    const month = d.getMonth();
    const year = new Date().getFullYear();

    if (d.getFullYear() === year) {
      return month;
    } else {
      return undefined;
    }
  }

  async getMonthlyIdicators(start_at?: Date, end_at?: Date) {
    const filters =
      start_at && end_at ? { logon_time: { gte: start_at, lte: end_at } } : {};

    const all_datas = await this.prisma.adAudit.findMany({
      select: {
        logon_time: true,
      },
    });

    const months = Array(12).fill(0);

    all_datas.forEach((r) => {
      const m = this.threatMonth(r.logon_time);

      m !== undefined && (months[m] += 1);
    });

    return months;
  }

  async getFailureReasom(start_at?: Date, end_at?: Date) {
    const filters =
      start_at && end_at ? { logon_time: { gte: start_at, lte: end_at } } : {};

    const data = await this.prisma.adAudit.findMany({
      where: filters,
    });

    const result = data.reduce(
      (acc, record) => {
        const failure = record.failure_reason.toLowerCase();

        if (failure.includes('account disabled, expired, or locked out')) {
          acc[0].value += 1;
        } else if (failure.includes('bad password')) {
          acc[1].value += 1;
        } else if (failure.includes('bad user name')) {
          acc[2].value += 1;
        } else if (failure.includes('password has expired')) {
          acc[3].value += 1;
        }

        return acc;
      },
      [
        {
          name: 'acc_dsb_lokecd',
          value: 0,
          label: 'Contas desabilitadas ou bloqueadas',
        },
        {
          name: 'pss_expired',
          value: 0,
          label: 'Password expirada',
        },
        {
          name: 'pss_bad',
          value: 0,
          label: 'Password errada',
        },
        {
          name: 'usr_bad',
          value: 0,
          label: 'Username errado',
        },
      ],
    );

    return result;
  }

  async getCheckpointEndpointIndicators(start_at?: Date, end_at?: Date) {
    const records = await this.getMonthlyIdicatorsCheckpoint(start_at, end_at);
    const failure = await this.getFailureReasom();

    return {
      records,
      failure,
    };
  }

  async getMonthlyIdicatorsCheckpoint(start_at?: Date, end_at?: Date) {
    const filters =
      start_at && end_at
        ? { alert_start_time: { gte: start_at, lte: end_at } }
        : {};

    const all_datas = await this.prisma.checkpointFw.findMany({
      select: {
        blade: true,
        logs: true,
      },
    });

    const records = all_datas.reduce(
      (acc, record) => {
        const r = record.blade.toLowerCase();

        if (r === 'firewall') {
          acc[0].y += record.logs;
        } else if (r === 'behavioral guard') {
          acc[1].y += record.logs;
        } else if (r === 'anti-malware') {
          acc[2].y += record.logs;
        } else if (r === 'endpoint compliance') {
          acc[3].y += record.logs;
        } else if (r === 'threat emulation') {
          acc[4].y += record.logs;
        } else if (r === 'zero phishing') {
          acc[5].y += record.logs;
        } else if (r === 'threat extraction') {
          acc[6].y += record.logs;
        } else if (r === 'anti-virus') {
          acc[7].y += record.logs;
        } else if (r === 'url filtering') {
          acc[8].y += record.logs;
        } else if (r === 'forensics') {
          acc[9].y += record.logs;
        } else if (r === 'anti-bot') {
          acc[10].y += record.logs;
        } else if (r === 'ips') {
          acc[11].y += record.logs;
        } else if (r === 'rasonware') {
          acc[12].y += record.logs;
        }

        return acc;
      },
      [
        { x: 'Firewall', y: 0 },
        { x: 'Anti-Mwalware', y: 0 },
        { x: 'Endpoint Compliance', y: 0 },
        { x: 'Threat Emulation', y: 0 },
        { x: 'Zero Phishing', y: 0 },
        { x: 'Threat Extraction', y: 0 },
        { x: 'Anti-Virus', y: 0 },
        { x: 'URL Filtering', y: 0 },
        { x: 'Forensics', y: 0 },
        { x: 'Anti-BOT', y: 0 },
        { x: 'IPS', y: 0 },
        { x: 'Behavioral Guard', y: 0 },
        { x: 'Rasonware', y: 0 },
      ],
    );

    return records;
  }

  async getImpervaEndpointIndicators(start_at?: Date, end_at?: Date) {
    const filters =
      start_at && end_at
        ? { alert_start_time: { gte: start_at, lte: end_at } }
        : {};

    const all_datas = await this.prisma.impervaWaf.findMany({
      where: filters,
    });

    const alertTypeIndicators = all_datas.reduce(
      (acc, record) => {
        const alertType = record.alert_type.toLowerCase();

        if (alertType === 'custom') {
          acc.custom += 1;
        } else if (alertType === 'protocol') {
          acc.protocol += 1;
        } else if (alertType === 'signature') {
          acc.signature += 1;
        }

        return acc;
      },
      {
        custom: 0,
        protocol: 0,
        signature: 0,
      },
    );

    const attacksTypes = all_datas.reduce(
      (acc, record) => {
        const attack = record.alert_description.toLowerCase();

        if (attack.includes('anti-bot')) {
          acc[0].value += record.num_of_events;
        } else if (attack.includes('brute')) {
          acc[1].value += record.num_of_events;
        } else if (attack.includes('malicious ips')) {
          acc[2].value += record.num_of_events;
        } else if (attack.includes('tor ips')) {
          acc[3].value += record.num_of_events;
        } else if (attack.includes('exposing configuration')) {
          acc[4].value += record.num_of_events;
        } else if (
          attack.includes('cve') ||
          attack.includes('web-misc') ||
          attack.includes('scanner') ||
          attack.includes('traversal') ||
          attack.includes('sql code')
        ) {
          acc[5].value += record.num_of_events;
        }

        return acc;
      },
      [
        {
          name: 'Anti-BOT',
          value: 0,
        },
        {
          name: 'Tentativas de Brute Force',
          value: 0,
        },
        {
          name: 'IPs Maliciosos',
          value: 0,
        },
        {
          name: 'TOR IPs',
          value: 0,
        },
        {
          name: 'Directórios Expostos',
          value: 0,
        },
        {
          name: 'Exploração de Vulnerabilidades',
          value: 0,
        },
      ],
    );

    const action = all_datas.reduce(
      (acc, record) => {
        const act = record.immediate_action.toLowerCase();

        if (act === 'none') {
          acc.none += record.num_of_events;
        } else if (act === 'block') {
          acc.block += record.num_of_events;
        }

        return acc;
      },
      { none: 0, block: 0 },
    );

    const top10Ips = await this.getTopSourceIps();

    return { alertTypeIndicators, attacksTypes, action, top10Ips };
  }

  async getTopSourceIps() {
    const topIPs = await this.prisma.impervaWaf.groupBy({
      by: ['source_ip'],
      _count: {
        num_of_events: true,
      },
      orderBy: {
        _count: {
          num_of_events: 'desc',
        },
      },
      take: 10, // Retorna os 10 primeiros resultados
    });

    return topIPs.map((result) => ({
      ip: result.source_ip,
      num_of_events: result._count.num_of_events,
    }));
  }

  async getPortnoxEndpointIndicators(start_at?: Date, end_at?: Date) {
    const filters =
      start_at && end_at
        ? { alert_start_time: { gte: start_at, lte: end_at } }
        : {};

    const all_datas = await this.prisma.impervaWaf.findMany({
      where: filters,
    });
  }

  async getPaloAltoEndpointIndicators(start_at?: Date, end_at?: Date) {
    const filters =
      start_at && end_at
        ? { receive_time: { gte: start_at, lte: end_at } }
        : {};

    const all_datas = await this.prisma.tablePaloAlto.findMany({
      where: filters,
    });

    const severity = await this.getSeverity();

    const thrCategory = all_datas.reduce(
      (acc, record) => {
        const category = record.thr_category.toLowerCase();

        if (category === 'dns-malware') {
          acc[0].value += 1;
        } else if (category === 'dns-proxy') {
          acc[1].value += 1;
        } else if (category === 'dns-grayware') {
          acc[2].value += 1;
        } else if (category === 'scan') {
          acc[3].value += 1;
        } else if (category === 'dns-parked') {
          acc[4].value += 1;
        } else if (category === 'unknown') {
          acc[5].value += 1;
        } else if (category === 'dns-adtracking') {
          acc[6].value += 1;
        } else if (category === 'dns-phishing') {
          acc[7].value += 1;
        } else if (category === 'info-leak') {
          acc[8].value += 1;
        } else if (category === 'code-execution') {
          acc[9].value += 1;
        } else if (category === 'spyware') {
          acc[10].value += 1;
        }

        return acc;
      },
      [
        { name: 'dns-malware', value: 0 },
        { name: 'dns-proxy', value: 0 },
        { name: 'dns-grayware', value: 0 },
        { name: 'scan', value: 0 },
        { name: 'dns-parked', value: 0 },
        { name: 'unknown', value: 0 },
        { name: 'dns-adtracking', value: 0 },
        { name: 'dns-phishing', value: 0 },
        { name: 'info-leak', value: 0 },
        { name: 'code-execution', value: 0 },
        { name: 'spyware', value: 0 },
      ],
    );

    const actions = all_datas.reduce(
      (acc, record) => {
        const category = record.action.toLowerCase();

        if (category === 'drop') {
          acc[0].value += 1;
        } else if (category === 'drop-packet') {
          acc[1].value += 1;
        } else if (category === 'alert') {
          acc[2].value += 1;
        } else if (category === 'allow') {
          acc[3].value += 1;
        } else if (category === 'reset-both') {
          acc[4].value += 1;
        }

        return acc;
      },
      [
        { name: 'drop', value: 0 },
        { name: 'drop-packet', value: 0 },
        { name: 'alert', value: 0 },
        { name: 'allow', value: 0 },
        { name: 'reset-both', value: 0 },
      ],
    );

    const th_content_name = all_datas.reduce(
      (acc, record) => {
        const category = record.threat_content_type.toLowerCase();

        if (category === 'spyware') {
          acc[0].value += 1;
        } else if (category === 'scan') {
          acc[1].value += 1;
        } else if (category === 'packet') {
          acc[2].value += 1;
        } else if (category === 'vulnerability') {
          acc[3].value += 1;
        }

        return acc;
      },
      [
        { name: 'spyware', value: 0 },
        { name: 'scan', value: 0 },
        { name: 'packet', value: 0 },
        { name: 'vulnerability', value: 0 },
      ],
    );

    return {
      severity,
      thrCategory,
      actions,
      th_content_name,
    };
  }

  async getDarktraceEndpointIndicators(start_at?: Date, end_at?: Date) {
    const annualStatistics = await this.getAnnualStatistics(start_at, end_at);
    const topEndpts = await this.getTop10Endpoints(start_at, end_at);

    return { annualStatistics, topEndpts };
  }

  async getAnnualStatistics(start_at?: Date, end_at?: Date) {
    try {
      const filters =
        start_at && end_at
          ? { time: { gte: start_at, lte: end_at } }
          : { time: { gte: new Date('01/01/2024'), lte: new Date() } };

      const evts = await this.prisma.darktrace.findMany({
        where: filters,
      });

      const months = evts.reduce(
        (acc, item) => {
          const m = item.time.getMonth();

          m === 0 && (acc[m] += 1);
          m === 1 && (acc[m] += 1);
          m === 2 && (acc[m] += 1);
          m === 3 && (acc[m] += 1);
          m === 4 && (acc[m] += 1);
          m === 5 && (acc[m] += 1);
          m === 6 && (acc[m] += 1);
          m === 7 && (acc[m] += 1);
          m === 8 && (acc[m] += 1);
          m === 9 && (acc[m] += 1);
          m === 10 && (acc[m] += 1);
          m === 11 && (acc[m] += 1);

          return acc;
        },
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      );

      return months;
    } catch (error) {}
  }

  async getTop10Endpoints(start_at?: Date, end_at?: Date) {
    try {
      const filters =
        start_at && end_at
          ? { time: { gte: start_at, lte: end_at } }
          : { time: { gte: new Date('01/01/2024'), lte: new Date() } };

      const topEndpts = await this.prisma.darktrace.groupBy({
        by: ['endpoint'],
        _count: {
          endpoint: true,
        },
        where: filters,
        orderBy: {
          _count: {
            endpoint: 'desc',
          },
        },
        take: 10,
      });

      return topEndpts.map((result) => ({
        endpoint: result.endpoint,
        n_access: result._count.endpoint,
      }));
    } catch (error) {}
  }

  async getThreats(start_at?: Date, end_at?: Date) {
    try {
      const filters =
        start_at && end_at ? { createdAt: { gte: start_at, lte: end_at } } : {};

      let data;

      if (start_at && end_at) {
        data = Promise.all([this.prisma.checkpointFw.findMany()]);
      }
    } catch (error) {}
  }
}
