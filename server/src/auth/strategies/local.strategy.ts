import {
  GatewayTimeoutException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { PrismaService } from 'src/libs/prisma';
import * as ldapAuth from 'ldap-authentication';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly prisma: PrismaService,
  ) {
    super({
      usernameField: 'username',
    });
  }

  async validate(username: string, password: string) {
    try {
      const user = await this.ldapAuth(username, password);

      if (!user) {
        throw new UnauthorizedException('Invalid username or password.');
      }

      return user;

      // return { name: 'nangazaki', roles: 'admin' };
    } catch (error) {
      throw error;
    }
  }

  async ldapAuth(username: string, password: string) {
    try {
      const ldapSetting = await this.prisma.ldapSetting.findFirst();

      if (!ldapSetting) {
        throw new GatewayTimeoutException(
          'Configuração do LDAP não encontrada.',
        );
      }

      const ldapConfig = {
        ldapOpts: {
          url: ldapSetting.serverUrl,
        },
        adminDn: ldapSetting.adminDn,
        adminPassword: ldapSetting.adminPassword,
        userSearchBase: ldapSetting.userSearchBase,
        usernameAttribute: ldapSetting.usernameAttribute,
        username: username,
        userPassword: password,
      };

      const authenticated = await ldapAuth.authenticate(ldapConfig);

      if (!authenticated) {
        throw new UnauthorizedException('Credenciais inválidas.');
      }

      return authenticated;
    } catch (error) {
      throw new GatewayTimeoutException(
        'Não foi possível se conectar com o servidor LDAP.',
      );
    }
  }
}
