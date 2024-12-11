import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course-dto';
import { UpdateCourseDto } from './dto/update-course-dto';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCourseDto) {
    return await this.prisma.courses.create({
      data,
    });
  }

  async createMany(data: CreateCourseDto[]) {
    return await this.prisma.courses.createMany({
      data,
    });
  }

  async findAll() {
    return await this.prisma.courses.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findCourse(id: number) {
    const course = await this.prisma.courses.findUnique({
      where: { id },
    });

    if (!course) {
      throw new NotFoundException(`Curso com ID ${id} não encontrado`);
    }

    return course;
  }

  async deleteCourse(id: number) {
    const course = await this.prisma.courses.findUnique({
      where: { id },
    });

    if (!course) {
      throw new NotFoundException(`Curso com ID ${id} não encontrado`);
    }

    return await this.prisma.courses.delete({
      where: { id },
    });
  }

  async updateCourse(id: number, data: UpdateCourseDto) {
    const course = await this.prisma.courses.findUnique({
      where: { id },
    });

    if (!course) {
      throw new NotFoundException(`Curso com ID ${id} não encontrado`);
    }

    return await this.prisma.courses.update({
      where: { id },
      data,
    });
  }
}
