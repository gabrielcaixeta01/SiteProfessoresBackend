import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { UpdateAvaliacaoDto } from './dto/update-avaliacao.dto';

@Injectable()
export class AvaliacaoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateAvaliacaoDto) {
    // Verifica se o usuário existe
    const userExists = await this.prisma.user.findUnique({
      where: { id: data.userId },
    });
    if (!userExists) {
      throw new NotFoundException('Usuário não encontrado');
    }

    // Verifica se o professor existe
    const professorExists = await this.prisma.professor.findUnique({
      where: { id: data.professorId },
    });
    if (!professorExists) {
      throw new NotFoundException('Professor não encontrado');
    }

    // Verifica se o curso existe
    const courseExists = await this.prisma.courses.findUnique({
      where: { id: data.courseId },
    });
    if (!courseExists) {
      throw new NotFoundException('Curso não encontrado');
    }

    // Cria a avaliação após as validações
    return this.prisma.avaliacao.create({
      data: {
        text: data.text,
        userId: data.userId,
        date: data.date,
        isEdited: data.isEdited || false,
        professorId: data.professorId,
        courseId: data.courseId,
      },
    });
  }

  async findAll() {
    return this.prisma.avaliacao.findMany({
      include: {
        user: true,
        professor: true,
        course: true,
      },
    });
  }

  async findAvaliacao(id: number) {
    const avaliacao = await this.prisma.avaliacao.findUnique({
      where: { id },
      include: {
        user: true,
        professor: true,
        course: true,
        comments: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!avaliacao) {
      throw new NotFoundException('Avaliação não encontrada');
    }
    return avaliacao;
  }

  async deleteAvaliacao(id: number) {
    const avaliacaoExists = await this.prisma.avaliacao.findUnique({
      where: { id },
    });
    if (!avaliacaoExists) {
      throw new NotFoundException('Avaliação não encontrada');
    }

    return this.prisma.avaliacao.delete({
      where: { id },
    });
  }

  async updateAvaliacao(id: number, data: UpdateAvaliacaoDto) {
    const avaliacaoExists = await this.prisma.avaliacao.findUnique({
      where: { id },
    });
    if (!avaliacaoExists) {
      throw new NotFoundException('Avaliação não encontrada');
    }

    return this.prisma.avaliacao.update({
      where: { id },
      data,
    });
  }
}
