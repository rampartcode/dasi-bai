import {
  GatewayTimeoutException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Client, SearchOptions } from 'ldapts';
import { compareSync } from 'bcrypt';
import { PrismaService } from 'src/libs/prisma';
import { decrypt } from 'src/helpers/encrypt-decrypt';

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
    return this.localAuth(username, password);
  }

  private async localAuth(username: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: { username },
    });

    if (!user) {
      throw new UnauthorizedException(
        'Usuário não encontrado e/ou autorizado.',
      );
    }

    if (!user.isConfigure) {
      const ldapUser = await this.authenticateLdapUser(username, password);

      if (!ldapUser) {
        await this.prisma.user.delete({ where: { username } });
        throw new UnauthorizedException(
          'Nome do usuário ou palavra-passe errada.',
        );
      }

      return user;
    }

    const isPasswordMatched = compareSync(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException(
        'Nome do usuário ou palavra-passe errada.',
      );
    }

    const { password: _, ...safeUser } = user;
    return safeUser;
  }

  private async authenticateLdapUser(username: string, password: string) {
    const ldapSetting = await this.prisma.ldapSetting.findFirst();

    if (!ldapSetting) {
      throw new GatewayTimeoutException('Configuração do LDAP não encontrada.');
    }

    const adminPassword = decryptAdminPassword(ldapSetting.adminPassword);
    const client = new Client({ url: ldapSetting.serverUrl });

    try {
      await client.bind(ldapSetting.adminDn, adminPassword);

      const searchOptions: SearchOptions = {
        scope: 'sub',
        filter: `(${ldapSetting.usernameAttribute}=${username})`,
      };

      const { searchEntries } = await client.search(
        ldapSetting.userSearchBase,
        searchOptions,
      );

      if (searchEntries.length === 0) {
        throw new UnauthorizedException('Usuário não encontrado no LDAP.');
      }

      const userDn = searchEntries[0].dn;
      await client.bind(userDn, password);

      return true;
    } catch (error) {
      throw new GatewayTimeoutException(
        'Não foi possível se conectar com o servidor LDAP.',
      );
    } finally {
      await client.unbind();
    }
  }
}

function decryptAdminPassword(adminPassword: string): string {
  const [content, iv] = adminPassword.split('=');
  return decrypt({ content, iv });
}
