import { Controller, Post, Body } from '@nestjs/common';
import { ConfigService } from './config.service';

@Controller('api/config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Post('ldap-server')
  create(@Body() createConfigDto: any) {
    return this.configService.create(createConfigDto);
  }
}
