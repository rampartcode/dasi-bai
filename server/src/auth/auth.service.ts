import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/libs/prisma';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async login(u: any) {
    try {
      const payload = { sub: u.name, roles: 'user_default' };

      const sessionExists = await this.prisma.session.findUnique({
        where: {
          username: u.name,
        },
      });

      console.log(sessionExists);

      if (sessionExists) {
        await this.prisma.session.delete({
          where: {
            username: u.name,
          },
        });
      }

      const session = await this.prisma.session.create({
        data: {
          username: u.name,
          role: 'Admin',
          token: this.jwtService.sign(payload),
        },
      });

      return session;
    } catch (error) {
      throw error;
    }
  }

  async getUserLogged(user: any, token: string) {
    try {
      const sessionExists = await this.prisma.session.findUnique({
        where: {
          token: token,
        },
      });

      if (!sessionExists) {
        throw new UnauthorizedException('Usuário não logado.');
      }

      return {
        username: user.name,
        roles: user.roles,
        token: sessionExists.token,
        id: sessionExists.id,
        loggedAt: sessionExists.loggedAt,
      };
    } catch (error) {
      throw error;
    }
  }
}
