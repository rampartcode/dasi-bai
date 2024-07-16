import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { DataController } from './data.controller';
import { PrismaService } from 'src/libs/prisma';

@Module({
  imports: [],
  controllers: [DataController],
  providers: [DataService, PrismaService],
})
export class DataModule {}
