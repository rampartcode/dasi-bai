import { Injectable } from '@nestjs/common';
import { CreateConfigDto } from './dto/create-config.dto';
import { PrismaService } from 'src/libs/prisma';

@Injectable()
export class ConfigService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createConfigDto: CreateConfigDto) {
    try {
      await this.prisma.ldapSetting.deleteMany();

      await this.prisma.ldapSetting.create({
        data: createConfigDto,
      });

      return 'Configurações LDAP criadas com sucesso!';
    } catch (error) {
      throw error;
    }
  }
}
