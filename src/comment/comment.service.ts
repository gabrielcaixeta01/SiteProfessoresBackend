import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCommentDto) {
    // Valida se o usuário existe
    const userExists = await this.prisma.user.findUnique({
      where: { id: data.userId },
    });
    if (!userExists) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    // Valida se a avaliação existe
    const avaliacaoExists = await this.prisma.avaliacao.findUnique({
      where: { id: data.avaliacaoId },
    });
    if (!avaliacaoExists) {
      throw new NotFoundException('Avaliação não encontrada.');
    }

    // Cria o comentário
    const comment = await this.prisma.comment.create({
      data: {
        text: data.text,
        userId: data.userId,
        avaliacaoId: data.avaliacaoId,
      },
    });
    return comment;
  }

  async findAll() {
    return this.prisma.comment.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async findComment(id: number) {
    return this.prisma.comment.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async deleteComment(id: number) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
    });
    if (!comment) {
      throw new NotFoundException('Comentário não encontrado.');
    }

    return await this.prisma.comment.delete({
      where: {
        id: id,
      },
    });
  }

  async updateComment(id: number, data: UpdateCommentDto) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
    });
    if (!comment) {
      throw new NotFoundException('Comentário não encontrado.');
    }

    return await this.prisma.comment.update({
      where: {
        id: id,
      },
      data: {
        ...data,
      },
    });
  }
}
