import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';

@Injectable()
export class ProgramsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProgramDto: CreateProgramDto) {
    try {
      return await this.prisma.programs.create({
        data: createProgramDto,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        // Código de erro Prisma para unicidade
        throw new ConflictException('Programa com este nome já existe.');
      }
      throw error;
    }
  }

  async findAll() {
    return this.prisma.programs.findMany();
  }

  async findOne(id: number) {
    return this.prisma.programs.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateProgramDto: UpdateProgramDto) {
    try {
      return await this.prisma.programs.update({
        where: { id },
        data: updateProgramDto,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Programa com este nome já existe.');
      }
      throw error;
    }
  }

  async remove(id: number) {
    return this.prisma.programs.delete({
      where: { id },
    });
  }
}
