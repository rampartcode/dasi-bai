import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/libs/prisma';
import { CreateUserDTO } from './dto/create-user';
import { Client, SearchOptions } from 'ldapts';
import { decrypt } from 'src/helpers/encrypt-decrypt';
import type { LdapSetting } from '@prisma/client';

@Injectable()
export class UserService {
  private ldapClient: Client;

  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUser: CreateUserDTO): Promise<void> {
    await this.ensureUserDoesNotExistInSystem(
      createUser.username,
      createUser.email,
    );
    await this.ensureUserExistsInLdap(createUser.email);
    await this.prisma.user.create({ data: createUser });
  }

  private async ensureUserDoesNotExistInSystem(
    username: string,
    email: string,
  ): Promise<void> {
    const user = await this.prisma.user.findFirst({
      where: { OR: [{ username }, { email }] },
    });

    if (user) {
      throw new UnprocessableEntityException('Usuário já existe no sistema.');
    }
  }

  private async ensureUserExistsInLdap(email: string): Promise<void> {
    const ldapServer = await this.getLdapSettings();
    const userDn = await this.findUserDn(email, ldapServer);

    if (!userDn) {
      throw new NotFoundException(
        'Usuário não encontrado no LDAP e/ou usernameAttribute errado.',
      );
    }
  }

  private async getLdapSettings(): Promise<LdapSetting> {
    const ldapServer = await this.prisma.ldapSetting.findFirst();
    if (!ldapServer) {
      throw new UnprocessableEntityException(
        'Configuração do servidor LDAP não encontrada.',
      );
    }
    return ldapServer;
  }

  private async findUserDn(email: string, ldapServer: LdapSetting) {
    if (!this.ldapClient) {
      this.initLdapClient(ldapServer);
    }

    try {
      await this.bindLdapClient(ldapServer);
      const searchOptions: SearchOptions = {
        scope: 'sub',
        filter: `(mail=${email})`,
        attributes: ['cn', 'mail', 'uid'],
      };

      const { searchEntries } = await this.ldapClient.search(
        ldapServer.userSearchBase,
        searchOptions,
      );

      return searchEntries[0];
    } finally {
      await this.ldapClient.unbind();
    }
  }

  private initLdapClient(ldapServer: LdapSetting): void {
    this.ldapClient = new Client({ url: ldapServer.serverUrl, strictDN: true });
  }

  private async bindLdapClient(ldapServer: LdapSetting): Promise<void> {
    const adminPassword = this.decryptAdminPassword(ldapServer.adminPassword);
    await this.ldapClient.bind(ldapServer.adminDn, adminPassword);
  }

  private decryptAdminPassword(adminPassword: string): string {
    const [content, iv] = adminPassword.split('=');
    return decrypt({ content, iv });
  }
}
