import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserInput } from './dtos/create-user-input.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  public async create(data: CreateUserInput) {
    const email = data.email;
    const user = this.prisma.user.findUnique({
      where: { email },
    });
    console.log(user);
    if (user) {
      throw new Error('Email ja cadastrado');
    }
    await this.prisma.user.create({
      data,
    });
  }
  //   public async findAll() {}
  //   public async findOne(id) {}
  //   public async update(id, updateUserDto) {}
  //   public async remove(id) {}
}
