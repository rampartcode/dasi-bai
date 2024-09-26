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
import type { ChangeRoleDTO } from './dto/change-role';

@Injectable()
export class UsersService {
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

  async findAll(params: {
    page: number;
    limit: number;
    order: 'asc' | 'desc';
  }) {
    const skip = params.page > 0 ? params.limit * (params.page - 1) : 0;

    const [data, total] = await Promise.all([
      this.prisma.user.findMany({
        where: {
          OR: [{ username: 'system' }, { isConfigure: false }],
        },
        select: {
          id: true,
          name: true,
          email: true,
          username: true,
          roles: true,
          createdAt: true,
        },
        skip,
        take: params.limit,
        orderBy: { name: params.order },
      }),
      this.prisma.user.count(),
    ]);

    const lastPage = Math.ceil(total / params.limit);

    return {
      data,
      meta: {
        currentPage: params.page,
        limit: params.limit,
        total,
        lastPage,
        prev: params.page > 1 ? params.page - 1 : null,
        next: params.page < lastPage ? params.page + 1 : null,
      },
    };
  }

  async changeRole(changeRoleDto: ChangeRoleDTO) {
    const user = await this.prisma.user.findUnique({
      where: { id: changeRoleDto.userId, isConfigure: false },
    });

    if (!user) {
      throw new NotFoundException('Utilizador não encontrado');
    }

    await this.prisma.user.update({
      where: { id: changeRoleDto.userId },
      data: { roles: changeRoleDto.role },
    });

    return;
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id, isConfigure: false },
    });

    if (!user) {
      throw new NotFoundException('Utilizador não encontrado');
    }

    await this.prisma.user.delete({ where: { id } });
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
