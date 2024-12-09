import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { UpdateAvaliacaoDto } from './dto/update-avaliacao.dto';

@Injectable()
export class AvaliacaoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateAvaliacaoDto) {
    const avaliacao = await this.prisma.avaliacao.create({
      data: data,
    });
    return avaliacao;
  }

  async findAll() {
    return await this.prisma.avaliacao.findMany();
  }

  async findAvaliacao(id: number) {
    return await this.prisma.avaliacao.findUnique({
      where: {
        id: id,
      },
    });
  }

  async deleteAvaliacao(id: number) {
    return await this.prisma.avaliacao.delete({
      where: {
        id: id,
      },
    });
  }

  async updateAvaliacao(id: number, data: UpdateAvaliacaoDto) {
    return await this.prisma.avaliacao.update({
      where: {
        id: id,
      },
      data: data,
    });
  }
}
