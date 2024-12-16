import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  // Criação de Usuário
  async create(data: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashedPassword,
        program: data.programId
          ? { connect: { id: data.programId } }
          : undefined,
        department: data.departmentId
          ? { connect: { id: data.departmentId } }
          : undefined,
        profilepic: data.profilepic ? data.profilepic.toString('base64') : null,
      },
    });
  }

  // Buscar todos os usuários
  async findAll() {
    return this.prisma.user.findMany({
      include: {
        program: true,
        department: true,
        avaliacoes: {
          include: {
            professor: true,
            course: true,
            comments: { include: { user: true } },
          },
        },
      },
    });
  }

  // Buscar usuário por ID
  async findUserById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        program: true,
        department: true,
        avaliacoes: {
          include: {
            professor: true,
            course: true,
            comments: { include: { user: true } },
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    return user;
  }

  async findUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException(`Usuário com email ${email} não encontrado`);
    }

    return user;
  }

  // Deletar usuário
  async deleteUser(id: number) {
    const userExists = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!userExists) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    return this.prisma.user.delete({
      where: { id },
    });
  }

  // Atualizar usuário
  async updateUser(id: number, data: UpdateUserDto) {
    const userExists = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!userExists) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    const updateData: any = {
      name: data.name,
      password: data.password
        ? await bcrypt.hash(data.password, 10)
        : undefined,
      programId: data.programId || undefined,
      departmentId: data.departmentId || undefined,
      profilepic: data.profilepic
        ? typeof data.profilepic === 'string'
          ? data.profilepic
          : data.profilepic.toString('base64')
        : undefined,
    };

    return this.prisma.user.update({
      where: { id },
      data: updateData,
      include: {
        program: true,
        department: true,
        avaliacoes: {
          include: {
            professor: true,
            course: true,
            comments: { include: { user: true } },
          },
        },
      },
    });
  }
}
