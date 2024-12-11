import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProfessorDto } from './dto/create-professor-dto';
import { UpdateProfessorDto } from './dto/update-professor-dto';

@Injectable()
export class ProfessorsService {
  constructor(private readonly prisma: PrismaService) {}

  // Cria um professor e associa cursos
  async create(data: CreateProfessorDto) {
    const { name, departmentId, courseIds } = data;

    return await this.prisma.professor.create({
      data: {
        name,
        department: { connect: { id: departmentId } }, // Conecta ao departamento
        courses: {
          connect: courseIds?.map((id) => ({ id })), // Conecta aos cursos
        },
      },
    });
  }

  // Retorna todos os professores com seus cursos e departamento
  async findAll() {
    return await this.prisma.professor.findMany({
      include: {
        department: true,
        courses: true,
      },
    });
  }

  // Retorna um professor específico
  async findProfessor(id: number) {
    return await this.prisma.professor.findUnique({
      where: {
        id,
      },
      include: {
        department: true,
        courses: true,
      },
    });
  }

  // Exclui um professor
  async deleteProfessor(id: number) {
    return await this.prisma.professor.delete({
      where: {
        id,
      },
    });
  }

  // Atualiza um professor e associa/desassocia cursos
  async updateProfessor(id: number, data: UpdateProfessorDto) {
    const { courseIds, ...updateData } = data;

    return await this.prisma.professor.update({
      where: {
        id,
      },
      data: {
        ...updateData,
        courses: {
          set: courseIds?.map((id) => ({ id })), // Atualiza os cursos associados
        },
      },
    });
  }
}
