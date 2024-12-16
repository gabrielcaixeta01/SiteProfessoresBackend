import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { UpdateAvaliacaoDto } from './dto/update-avaliacao.dto';

@Injectable()
export class AvaliacaoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateAvaliacaoDto) {
    console.log('Dados recebidos no Service:', data);
    return this.prisma.avaliacao.create({
      data: {
        text: data.text,
        userId: data.userId,
        professorId: data.professorId,
        courseId: data.courseId,
        isEdited: false,
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
