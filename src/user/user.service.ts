import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    // Verificar se o programa existe
    if (data.programId) {
      const programExists = await this.prisma.programs.findUnique({
        where: { id: data.programId },
      });

      if (!programExists) {
        throw new BadRequestException(
          `Programa com ID ${data.programId} não encontrado`,
        );
      }
    }

    // Verificar se o departamento existe
    if (data.departmentId) {
      const departmentExists = await this.prisma.department.findUnique({
        where: { id: data.departmentId },
      });

      if (!departmentExists) {
        throw new BadRequestException(
          `Departamento com ID ${data.departmentId} não encontrado`,
        );
      }
    }

    return await this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: data.password,
        program: data.programId
          ? { connect: { id: data.programId } }
          : undefined,
        Department: data.departmentId
          ? { connect: { id: data.departmentId } }
          : undefined,
        profilepic: data.profilepic ? data.profilepic.toString('base64') : null,
      },
    });
  }

  async findAll() {
    return await this.prisma.user.findMany({
      include: {
        program: true,
        Department: true,
      },
    });
  }

  async findUserById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        program: true,
        Department: true,
        avaliacoes: {
          include: {
            professor: true,
            course: true,
            comments: {
              include: {
                user: true,
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
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException(`Usuário com email ${email} não encontrado`);
    }

    return user;
  }

  async deleteUser(id: number) {
    // Verificar se o usuário existe antes de tentar excluir
    const userExists = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!userExists) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    return await this.prisma.user.delete({
      where: { id },
    });
  }

  async updateUser(id: number, data: UpdateUserDto) {
    // Verificar se o usuário existe antes de atualizar
    const userExists = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!userExists) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    // Validar programId, se fornecido
    if (data.programId) {
      const programExists = await this.prisma.programs.findUnique({
        where: { id: data.programId },
      });

      if (!programExists) {
        throw new BadRequestException(
          `Programa com ID ${data.programId} não encontrado`,
        );
      }
    }

    // Validar departmentId, se fornecido
    if (data.departmentId) {
      const departmentExists = await this.prisma.department.findUnique({
        where: { id: data.departmentId },
      });

      if (!departmentExists) {
        throw new BadRequestException(
          `Departamento com ID ${data.departmentId} não encontrado`,
        );
      }
    }

    const updateData: any = {
      name: data.name,
      password: data.password,
      programId: data.programId ? Number(data.programId) : undefined,
      departmentId: data.departmentId ? Number(data.departmentId) : undefined,
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
