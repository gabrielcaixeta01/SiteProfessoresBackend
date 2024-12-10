import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { UpdateAvaliacaoDto } from './dto/update-avaliacao.dto';

@Injectable()
export class AvaliacaoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateAvaliacaoDto) {
    // Verifica se o usuário existe
    const user = await this.prisma.user.findUnique({
      where: { id: data.userId2 },
    });
    if (!user) throw new NotFoundException('Usuário não encontrado');

    // Verifica se o professor existe
    const professor = await this.prisma.professors.findUnique({
      where: { id: data.professorId },
    });
    if (!professor) throw new NotFoundException('Professor não encontrado');

    // Verifica se o curso existe
    const course = await this.prisma.courses.findUnique({
      where: { id: data.courseId },
    });
    if (!course) throw new NotFoundException('Curso não encontrado');

    // Cria a avaliação após as validações
    return await this.prisma.avaliacao.create({
      data: {
        text: data.text,
        userId2: data.userId2,
        nota: data.nota,
        date: data.date,
        isEdited: data.isEdited || false,
        professorId: data.professorId,
        courseId: data.courseId,
      },
    });
  }

  async findAll() {
    return await this.prisma.avaliacao.findMany({
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
      },
    });
    if (!avaliacao) throw new NotFoundException('Avaliação não encontrada');
    return avaliacao;
  }

  async deleteAvaliacao(id: number) {
    return await this.prisma.avaliacao.delete({
      where: { id },
    });
  }

  async updateAvaliacao(id: number, data: UpdateAvaliacaoDto) {
    return await this.prisma.avaliacao.update({
      where: { id },
      data,
    });
  }
}
