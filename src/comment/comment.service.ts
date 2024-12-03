import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCommentDto) {
    const comment = this.prisma.comment.create({
      data: {
        ...data,
      },
    });
    return comment;
  }

  async findAll() {
    return await this.prisma.comment.findMany();
  }

  async findComment(id: number) {
    return await this.prisma.comment.findUnique({
      where: { 
        id: id,
      },
    });
  }

  async deleteComment(id: number) {
    return await this.prisma.comment.delete({
      where: {
        id: id,
      },
    });
  }

  async updateComment(id: number, data: UpdateCommentDto) {
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
