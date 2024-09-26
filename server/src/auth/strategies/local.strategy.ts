/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  UnauthorizedException,
  GatewayTimeoutException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { compareSync } from 'bcrypt';
import { PrismaService } from 'src/libs/prisma';
import { decrypt } from 'src/helpers/encrypt-decrypt';
import { Client, type SearchOptions } from 'ldapts';
import type { LdapSetting, User } from '@prisma/client';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private ldapClient: Client;

  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
  ) {
    super({ usernameField: 'username' });
  }

  async validate(username: string, password: string) {
    const user = await this.findUser(username);

    if (!user.isConfigure && user.username !== 'guest') {
      return this.handleUnconfiguredUser(user, username, password);
    }

    return this.handleConfiguredUser(user, password);
  }

  private async findUser(username: string) {
    const user = await this.prisma.user.findFirst({ where: { username } });
    if (!user) {
      throw new UnauthorizedException(
        'Usuário não encontrado e/ou autorizado.',
      );
    }
    return user;
  }

  private async handleUnconfiguredUser(
    user: User,
    username: string,
    password: string,
  ) {
    const isAuthenticated = await this.authenticateLdapUser(
      user.email,
      password,
    );

    if (!isAuthenticated) {
      await this.prisma.user.delete({ where: { username } });
      throw new UnauthorizedException(
        'Nome do usuário ou palavra-passe errada.',
      );
    }

    return user;
  }

  private handleConfiguredUser(user, password: string) {
    if (!compareSync(password, user.password)) {
      throw new UnauthorizedException(
        'Nome do usuário ou palavra-passe errada.',
      );
    }
    const { password: _, ...safeUser } = user;
    return safeUser;
  }

  private async authenticateLdapUser(
    email: string,
    password: string,
  ): Promise<boolean> {
    const ldapSetting = await this.getLdapSettings();

    if (!this.ldapClient) {
      this.initLdapClient(ldapSetting.serverUrl);
    }

    try {
      await this.bindAdmin(ldapSetting);
    } catch (err) {
      throw new GatewayTimeoutException(
        'Não foi possível se conectar com o servidor LDAP.',
      );
    }

    try {
      const userDn = await this.findUserDn(email, ldapSetting);

      await this.ldapClient.bind(userDn, password);
      return true;
    } catch (error) {
      throw new UnauthorizedException('Username ou senha incorreta.');
    } finally {
      await this.ldapClient.unbind();
    }
  }

  private async getLdapSettings() {
    const ldapSetting = await this.prisma.ldapSetting.findFirst();
    if (!ldapSetting) {
      throw new GatewayTimeoutException('Configuração do LDAP não encontrada.');
    }
    return ldapSetting;
  }

  private initLdapClient(serverUrl: string) {
    this.ldapClient = new Client({ url: serverUrl, strictDN: true });
  }

  private async bindAdmin(ldapSetting: LdapSetting) {
    const adminPassword = this.decryptAdminPassword(ldapSetting.adminPassword);
    await this.ldapClient.bind(ldapSetting.adminDn, adminPassword);
  }

  private async findUserDn(
    email: string,
    ldapSetting: LdapSetting,
  ): Promise<string> {
    const searchOptions: SearchOptions = {
      scope: 'sub',
      filter: `(mail=${email})`,
      attributes: ['dn'],
    };

    const { searchEntries } = await this.ldapClient.search(
      ldapSetting.userSearchBase,
      searchOptions,
    );

    if (searchEntries.length === 0) {
      throw new UnauthorizedException('Usuário não encontrado no LDAP.');
    }

    return searchEntries[0].dn;
  }

  private decryptAdminPassword(adminPassword: string): string {
    const [content, iv] = adminPassword.split('=');
    return decrypt({ content, iv });
  }
}
