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

  async createMany(departmentsData: CreateDepartmentDto[]) {
    const existingDepartments = await this.prisma.department.findMany({
      where: {
        name: { in: departmentsData.map((department) => department.name) },
      },
    });

    if (existingDepartments.length > 0) {
      const existingNames = existingDepartments
        .map((dep) => dep.name)
        .join(', ');
      throw new ConflictException(
        `Os seguintes departamentos já existem: ${existingNames}`,
      );
    }

    return await this.prisma.department.createMany({
      data: departmentsData,
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
    const { name } = updateDepartmentDto;

    if (name) {
      const existingDepartment = await this.prisma.department.findUnique({
        where: { name },
      });

      if (existingDepartment && existingDepartment.id !== id) {
        throw new ConflictException('O nome do departamento já está em uso.');
      }
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
