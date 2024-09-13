import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { ConfigService } from './config.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateConfigDto } from './dto/create-config.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('api/config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Get('ldap-server/status')
  async ldapServerStatus(@Req() req: any) {
    return this.configService.ldapServerStatus();
  }

  @Post('ldap-server')
  create(@Body() createConfigDto: CreateConfigDto) {
    return this.configService.create(createConfigDto);
  }

  @Post('ldap-server/test')
  testLdapServer(@Body() createConfigDto: CreateConfigDto) {
    return this.configService.testLdapServer(createConfigDto);
  }

  @Post('reset/data-tools')
  resetDataTools(@Req() req: any) {
    return this.configService.resetDataTools(req.user);
  }

  @Post('reset/database')
  resetDatabase(@Req() req: any) {
    return this.configService.resetDatabase(req.user);
  }
}
