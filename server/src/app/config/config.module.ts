import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigController } from './config.controller';
import { PrismaService } from 'src/libs/prisma';

@Module({
  controllers: [ConfigController],
  providers: [ConfigService, PrismaService],
})
export class ConfigModule {}
