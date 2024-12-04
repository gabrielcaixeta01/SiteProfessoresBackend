import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProfessorDto } from './dto/create-professor-dto';
import { UpdateProfessorDto } from './dto/update-professor-dto';

@Injectable()
export class ProfessorsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateProfessorDto) {
    return await this.prisma.professors.create({
      data: {
        ...data,
      },
    });
  }

  async findAll() {
    return await this.prisma.professors.findMany();
  }

  async findProfessor(id: number) {
    return await this.prisma.professors.findUnique({
      where: {
        id: id,
      },
    });
  }

  async deleteProfessor(id: number) {
    return await this.prisma.professors.delete({
      where: {
        id: id,
      },
    });
  }

  async updateProfessor(id: number, data: UpdateProfessorDto) {
    return await this.prisma.professors.update({
      where: {
        id: id,
      },
      data: data,
    });
  }
}
