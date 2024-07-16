import {
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { DataService } from './data.service';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('api/data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'ad_audit', maxCount: 1 },
      { name: 'darktrace', maxCount: 1 },
      { name: 'portnox', maxCount: 1 },
      { name: 'imperva_waf', maxCount: 1 },
      { name: 'imperva_dam', maxCount: 1 },
      { name: 'checkpoint_fw_attack', maxCount: 1 },
      { name: 'checkpoint_fw', maxCount: 1 },
      { name: 'checkpoint_harmony', maxCount: 1 },
      { name: 'paloalto', maxCount: 1 },
    ]),
  )
  async upload(
    @UploadedFiles() files: { [fieldname: string]: Express.Multer.File[] },
  ) {
    return this.dataService.uploadMultipleFiles(files);
  }

  @Post('incidents')
  @UseInterceptors(FileInterceptor('incidents'))
  async uploadIncidents(@UploadedFile() file: Express.Multer.File) {
    return this.dataService.uploadIncidents(file);
  }

  @Get()
  list(@Query('start') start?: string, @Query('end') end?: string) {
    let [start_at, end_at] = [undefined, undefined];

    if (start && end) {
      [start_at, end_at] = [new Date(start), new Date(end)];
    }

    return this.dataService.getData(start_at, end_at);
  }

  @Get('last-update')
  getLastUpdate() {
    return this.dataService.getLastUpdate();
  }

  @Get('ad-audit')
  getAdAuditIndicartors(
    @Query('start') start?: string,
    @Query('end') end?: string,
  ) {
    let [start_at, end_at] = [undefined, undefined];

    if (start && end) {
      [start_at, end_at] = [new Date(start), new Date(end)];
    }

    return this.dataService.getAdAuditIndicators(start_at, end_at);
  }

  @Get('checkpoint')
  getCheckpointIndicartors(
    @Query('start') start?: string,
    @Query('end') end?: string,
  ) {
    let [start_at, end_at] = [undefined, undefined];

    if (start && end) {
      [start_at, end_at] = [new Date(start), new Date(end)];
    }

    return this.dataService.getCheckpointEndpointIndicators(start_at, end_at);
  }

  @Get('imperva')
  getImpervaIndicartors(
    @Query('start') start?: string,
    @Query('end') end?: string,
  ) {
    let [start_at, end_at] = [undefined, undefined];

    if (start && end) {
      [start_at, end_at] = [new Date(start), new Date(end)];
    }

    return this.dataService.getImpervaEndpointIndicators(start_at, end_at);
  }

  @Get('palo-alto')
  getPaloAltoIndicartors(
    @Query('start') start?: string,
    @Query('end') end?: string,
  ) {
    let [start_at, end_at] = [undefined, undefined];

    if (start && end) {
      [start_at, end_at] = [new Date(start), new Date(end)];
    }

    return this.dataService.getPaloAltoEndpointIndicators(start_at, end_at);
  }

  @Get('darktrace')
  getDarktraceIndicartors(
    @Query('start') start?: string,
    @Query('end') end?: string,
  ) {
    let [start_at, end_at] = [undefined, undefined];

    if (start && end) {
      [start_at, end_at] = [new Date(start), new Date(end)];
    }

    return this.dataService.getDarktraceEndpointIndicators(start_at, end_at);
  }
}
