import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    return await this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: data.password,
        department: data.department,
        program: data.program,
        profilepic: data.profilepic || null,
      },
    });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findUser(id: number) {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async deleteUser(id: number) {
    return await this.prisma.user.delete({
      where: { id },
    });
  }

  async updateUser(id: number, data: UpdateUserDto) {
    const updateData = {
      ...data,
      profilepic:
        typeof data.profilepic === 'string'
          ? Buffer.from(data.profilepic, 'base64')
          : data.profilepic,
    };

    return await this.prisma.user.update({
      where: { id },
      data: updateData,
    });
  }
}
