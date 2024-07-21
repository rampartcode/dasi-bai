import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateConfigDto } from './dto/create-config.dto';
import { PrismaService } from 'src/libs/prisma';
import * as ldapAuth from 'ldap-authentication';

import { hashSync } from 'bcrypt';
import { encrypt } from 'src/helpers/encrypt-decrypt';

@Injectable()
export class ConfigService {
  constructor(private readonly prisma: PrismaService) {}

  async ldapServerStatus() {
    try {
      const ldapServer = await this.prisma.ldapSetting.findFirst();

      if (!ldapServer) {
        throw new UnauthorizedException('Configurações LDAP não encontradas.');
      }

      return;
    } catch (error) {
      throw error;
    }
  }

  async create(createConfigDto: CreateConfigDto) {
    try {
      await this.prisma.$transaction(async (prisma) => {
        await prisma.ldapSetting.deleteMany();

        const psswd = encrypt(createConfigDto.adminPassword);
        const password = `${psswd.content}=${psswd.iv}`;

        await prisma.ldapSetting.create({
          data: {
            ...createConfigDto,
            adminPassword: password,
          },
        });
      });

      return;
    } catch (error) {
      throw error;
    }
  }

  async testLdapServer(createConfigDto: CreateConfigDto) {
    const ldapConfig = {
      ldapOpts: {
        url: createConfigDto.serverUrl,
      },
      adminDn: createConfigDto.adminDn,
      adminPassword: createConfigDto.adminPassword,
      userSearchBase: createConfigDto.userSearchBase,
      usernameAttribute: createConfigDto.usernameAttribute,
    };

    const authenticated = await ldapAuth.authenticate(ldapConfig);

    if (!authenticated) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    return;
  }

  async resetDataTools(user: any) {
    try {
      return await this.prisma.$transaction(async (prisma) => {
        await prisma.adAudit.deleteMany();
        await prisma.checkpointFw.deleteMany();
        await prisma.checkpointHarmony.deleteMany();
        await prisma.checkpointFwAttack.deleteMany();
        await prisma.tablePaloAlto.deleteMany();
        await prisma.impervaWaf.deleteMany();
        await prisma.impervaDam.deleteMany();
        await prisma.darktrace.deleteMany();
        await prisma.portnox.deleteMany();
        await prisma.windowsDefender.deleteMany();
        await prisma.incidentResponse.deleteMany();
      });
    } catch (error) {
      throw error;
    }
  }

  async resetDatabase(user: any) {
    try {
      return await this.prisma.$transaction(async (prisma) => {
        await prisma.adAudit.deleteMany();
        await prisma.checkpointFw.deleteMany();
        await prisma.checkpointHarmony.deleteMany();
        await prisma.checkpointFwAttack.deleteMany();
        await prisma.tablePaloAlto.deleteMany();
        await prisma.impervaWaf.deleteMany();
        await prisma.impervaDam.deleteMany();
        await prisma.darktrace.deleteMany();
        await prisma.portnox.deleteMany();
        await prisma.windowsDefender.deleteMany();
        await prisma.incidentResponse.deleteMany();
        await prisma.ldapSetting.deleteMany();
        await prisma.user.deleteMany({
          where: { isConfigure: false },
        });
        await prisma.session.deleteMany();
      });
    } catch (error) {
      throw error;
    }
  }
}
