import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserInput } from './dtos/create-user-input.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  public async create(data: CreateUserInput) {
    const email = data.email;
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (user) throw new Error('Email ja cadastrado');
    await this.prisma.user.create({
      data,
    });
  }

  public async findOne(id) {
    return await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  public async remove(id) {
    const deletedUser = await this.prisma.user.delete({
      where: { id },
    });
    return deletedUser;
  }

  //   public async update(id, updateUserDto) {}
}
