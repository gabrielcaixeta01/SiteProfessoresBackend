import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDepartmentDto: CreateDepartmentDto) {
    const existingDepartment = await this.prisma.department.findUnique({
      where: { name: createDepartmentDto.name },
    });

    if (existingDepartment) {
      throw new ConflictException('O departamento já existe.');
    }

    return await this.prisma.department.create({
      data: createDepartmentDto,
    });
  }

  async findAll() {
    return await this.prisma.department.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.department.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    const existingDepartment = await this.prisma.department.findUnique({
      where: { name: updateDepartmentDto.name },
    });

    if (existingDepartment && existingDepartment.id !== id) {
      throw new ConflictException('O nome do departamento já está em uso.');
    }

    return await this.prisma.department.update({
      where: { id },
      data: updateDepartmentDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.department.delete({
      where: { id },
    });
  }
}
