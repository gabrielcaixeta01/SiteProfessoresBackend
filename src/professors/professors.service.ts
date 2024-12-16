import { Injectable, NotFoundException } from '@nestjs/common';
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
        department: { connect: { id: departmentId } },
        courses: courseIds?.length
          ? { connect: courseIds.map((id) => ({ id })) }
          : undefined,
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

  async findProfessor(id: number) {
    const professor = await this.prisma.professor.findUnique({
      where: { id },
      include: {
        department: {
          select: { id: true, name: true },
        },
        courses: {
          select: { id: true, name: true },
        },
        avaliacoes: {
          include: {
            user: {
              select: { id: true, name: true }, // Autor da avaliação
            },
            comments: {
              include: {
                user: {
                  select: { id: true, name: true }, // Autor dos comentários
                },
              },
            },
          },
        },
      },
    });

    if (!professor) {
      throw new NotFoundException(`Professor com ID ${id} não encontrado.`);
    }

    return professor;
  }

  async deleteProfessor(id: number) {
    const professor = await this.prisma.professor.findUnique({ where: { id } });

    if (!professor) {
      throw new NotFoundException(`Professor com ID ${id} não encontrado.`);
    }

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
        courses: courseIds?.length
          ? { set: courseIds.map((id) => ({ id })) }
          : undefined,
      },
    });
  }
}
