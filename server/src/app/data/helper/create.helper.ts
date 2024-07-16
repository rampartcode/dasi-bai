import { PrismaService } from 'src/libs/prisma';

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

const prisma = new PrismaService();

export async function createImpervaWafData(record: IRecordImpervaWaf) {
  try {
    if (
      Object.prototype.toString.call(record.alert_start_time) !==
        '[object Date]' ||
      isNaN(record.alert_start_time.getTime())
    ) {
      console.error('Invalid Date for alert_start_time');
      return;
    }

    await prisma.impervaWaf.create({
      data: {
        ...record,
      },
    });
  } catch (error) {
    console.error('Erro ao cadastrar Imperva Waf Data:', error);
  }
}

export async function createImpervaDamData(record: IRecordImpervaDam) {
  try {
    await prisma.impervaDam.create({
      data: {
        ...record,
      },
    });
  } catch (error) {
    throw error;
  }
}

export async function createPortnoxData(record: IRecordPortnox) {
  try {
    await prisma.portnox.create({
      data: {
        ...record,
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export async function createDarktraceData(record: IRecordDarktrace) {
  try {
    await prisma.darktrace.create({
      data: {
        ...record,
      },
    });
  } catch (error) {
    // throw error;
    console.error('Erro ao cadastrar Darktrace Data:', error);
  }
}

export async function createIncidents(record: IRecordIncidents) {
  try {
    await prisma.incidentResponse.create({
      data: {
        ...record,
      },
    });
  } catch (error) {}
}

export async function createCheckpointFirewallAttackData(
  record: IRecordCheckpointFwAttack,
) {
  try {
    await prisma.checkpointFwAttack.create({
      data: {
        ...record,
      },
    });
  } catch (error) {
    console.log('Erro: ' + error);
  }
}

export async function createCheckpointFw(record: IRecordCheckpointFw) {
  try {
    await prisma.checkpointFw.create({
      data: {
        ...record,
      },
    });
  } catch (error) {
    console.log('Erro: ' + error);
  }
}

export async function createCheckpontHarmonyData(
  record: IRecordCheckpointHarmony,
) {
  try {
    await prisma.checkpointHarmony.create({
      data: {
        ...record,
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export async function createAdAudit(record: IRecordAdAudit) {
  try {
    await prisma.adAudit.create({
      data: {
        ...record,
      },
    });
  } catch (error) {
    // console.error('Continue');
  }
}

export async function createPaloAlto(record: IRecordPaloAlto) {
  try {
    const t = await prisma.tablePaloAlto.create({
      data: {
        ...record,
      },
    });

    console.log(t);
  } catch (error) {
    console.error(error);
  }
}

// export async function createWindowsDefenderData(data: any[]) {
//   try {
//     for (const row of data) {
//       await prisma.checkpointFwAttack.create({
//         data: {
//           severity: '',
//           logs: '',
//           blade: '',
//         },
//       });
//     }
//   } catch (error) {
//     throw error;
//   }
// }
