import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/libs/prisma';
import { CreateUserDTO } from './dto/create-user';

import { authenticate } from 'ldap-authentication';
import { decrypt } from 'src/helpers/encrypt-decrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUser: CreateUserDTO) {
    try {
      const userAlreadyExistsInLdap = await this.validateUserInLdapServer(
        createUser.username,
      );
      if (!userAlreadyExistsInLdap) {
        throw new NotFoundException('Usuário já existe no LDAP.');
      }

      const usernameIsUsed = await this.prisma.user.findUnique({
        where: {
          username: createUser.username,
        },
      });
      if (usernameIsUsed) {
        throw new NotFoundException('Usuário já existe no sistema.');
      }

      const emailIsUsed = await this.prisma.user.findUnique({
        where: {
          email: createUser.email,
        },
      });
      if (emailIsUsed) {
        throw new UnprocessableEntityException(
          'Endereço de email já está a ser usado.',
        );
      }

      await this.prisma.user.create({
        data: createUser,
      });

      return;
    } catch (error) {
      throw error;
    }
  }

  async validateUserInLdapServer(username: string): Promise<boolean> {
    try {
      const ldapServer = await this.prisma.ldapSetting.findFirst();

      const [content, iv] = ldapServer.adminPassword.split('=');
      const [adminCN, userCN, ...rest] = ldapServer.adminDn.split(',');

      const authenticated = await authenticate({
        ldapOpts: { url: ldapServer.serverUrl },
        adminDn: ldapServer.adminDn,
        adminPassword: decrypt({ content: content, iv: iv }),
        userDn: `uid=${username},${rest.toString()}`,
        verifyUserExists: true,
        userSearchBase: ldapServer.userSearchBase,
        usernameAttribute: 'uid',
        username: username,
      });

      return authenticated;
    } catch (error) {
      throw error;
    }
  }
}
