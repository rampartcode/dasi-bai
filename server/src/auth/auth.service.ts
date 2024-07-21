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
      const payload = { sub: u.username, roles: u.roles, email: u.email };

      return {
        user: u,
        token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw error;
    }
  }

  async getUserLogged(user: any) {
    try {
      return await this.prisma.user.findUnique({
        where: {
          username: user.username,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
