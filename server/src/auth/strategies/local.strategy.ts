import {
  GatewayTimeoutException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

import * as ldapAuth from 'ldap-authentication';
import { compareSync } from 'bcrypt';
import { PrismaService } from 'src/libs/prisma';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
  ) {
    super({
      usernameField: 'username',
    });
  }

  async validate(username: string, password: string) {
    try {
      return await this.localAuth(username, password);
    } catch (error) {
      throw error;
    }
  }

  async localAuth(username: string, psswd: string) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          username,
        },
      });

      if (!user) {
        throw new UnauthorizedException(
          'Usuário não encontrado e/ou autorizado.',
        );
      }

      if (!user.isConfigure) {
        const usr = await this.ldapAuth(username, psswd);

        if (!usr) {
          await this.prisma.user.delete({
            where: {
              username,
            },
          });

          throw new UnauthorizedException(
            'Nome do usuário ou palavra-passe errdada.',
          );
        }

        return usr;
      }

      const isPasswordMatched = compareSync(psswd, user.password);

      if (!isPasswordMatched) {
        throw new UnauthorizedException(
          'Nome do usuário ou palavra-passe errdada.',
        );
      }

      const { password, ...usr } = user;

      return usr;
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
