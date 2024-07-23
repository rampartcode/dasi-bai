import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/libs/prisma';
import { CreateUserDTO } from './dto/create-user';
import { Client, SearchOptions } from 'ldapts';
import { decrypt } from 'src/helpers/encrypt-decrypt';

import { authenticate } from 'ldap-authentication';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUser: CreateUserDTO): Promise<void> {
    try {
      await this.ensureUserDoesNotExistInSystem(
        createUser.username,
        createUser.email,
      );
      await this.ensureUserExistsInLdap(createUser.username);

      await this.prisma.user.create({ data: createUser });
    } catch (error) {
      throw error;
    }
  }

  private async ensureUserDoesNotExistInSystem(
    username: string,
    email: string,
  ): Promise<void> {
    const user = await this.prisma.user.findFirst({
      where: { OR: [{ username }, { email }] },
    });

    if (user) {
      if (user.username === username) {
        throw new UnprocessableEntityException('Usuário já existe no sistema.');
      }
      if (user.email === email) {
        throw new UnprocessableEntityException(
          'Endereço de email já está a ser usado.',
        );
      }
    }
  }

  private async ensureUserExistsInLdap(username: string): Promise<void> {
    const ldapServer = await this.prisma.ldapSetting.findFirst();
    if (!ldapServer) {
      throw new UnprocessableEntityException(
        'Configuração do servidor LDAP não encontrada.',
      );
    }

    const userDn = await this.findUserDn(username, ldapServer);
    if (!userDn) {
      throw new NotFoundException(
        'Usuário não encontrado no LDAP e/ou usernameAttribute errado.',
      );
    }
  }

  private async findUserDn(
    username: string,
    ldapServer,
  ): Promise<string | null> {
    const client = new Client({ url: ldapServer.serverUrl });
    const adminPassword = decryptAdminPassword(ldapServer.adminPassword);

    try {
      await client.bind(ldapServer.adminDn, adminPassword);

      const searchOptions: SearchOptions = {
        scope: 'sub',
        filter: `(${ldapServer.usernameAttribute}=${username})`,
        attributes: ['dn'],
      };

      const { searchEntries } = await client.search(
        ldapServer.userSearchBase,
        searchOptions,
      );

      return searchEntries.length > 0 ? (searchEntries[0].dn as string) : null;
    } finally {
      await client.unbind();
    }
  }
}

function decryptAdminPassword(adminPassword: string): string {
  const [content, iv] = adminPassword.split('=');
  return decrypt({ content, iv });
}
