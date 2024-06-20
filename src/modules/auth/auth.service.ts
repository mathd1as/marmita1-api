import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    let user;
    try {
      user = await this.prisma.user.findUnique({
        where: { email },
      });
    } catch (error) {
      return null;
    }

    if (password === user.password) {
      return user;
    }

    return null;
  }

  async login(user) {
    const payload = { sub: user.id, email: user.email };

    return {
      token: await this.jwtService.sign(payload),
    };
  }
}
