import { Injectable, NotFoundException } from '@nestjs/common';
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
        program: { connect: { id: data.programId } },
        profilepic: data.profilepic ? data.profilepic.toString('base64') : null,
      },
    });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findUserById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        program: true, // Inclui o programa do usuário
        Department: true, // Inclui o departamento do usuário (se necessário)
        avaliacoes: {
          include: {
            professor: true, // Inclui o professor relacionado à avaliação
            course: true, // Inclui o curso relacionado à avaliação
            comments: {
              include: {
                user: true, // Inclui o autor do comentário
              },
            },
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
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async deleteUser(id: number) {
    return await this.prisma.user.delete({
      where: { id },
    });
  }

  async updateUser(id: number, data: UpdateUserDto) {
    const updateData: any = {
      ...data,
      programId: data.programId ? Number(data.programId) : undefined,
      profilepic: data.profilepic
        ? typeof data.profilepic === 'string'
          ? data.profilepic
          : data.profilepic.toString('base64')
        : undefined,
    };

    return await this.prisma.user.update({
      where: { id },
      data: updateData,
    });
  }
}
