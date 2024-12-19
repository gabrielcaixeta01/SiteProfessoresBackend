import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Public } from 'src/auth/decorators/isPublic.decorator';

@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Public()
  @Post()
  async create(
    @Body(ValidationPipe)
    departmentsData: CreateDepartmentDto | CreateDepartmentDto[],
  ) {
    if (Array.isArray(departmentsData)) {
      return await this.departmentsService.createMany(departmentsData);
    }
    return await this.departmentsService.create(departmentsData);
  }

  @Public()
  @Get()
  async findAll() {
    return this.departmentsService.findAll();
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.departmentsService.findOne(id);
  }

  @Public()
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ) {
    return this.departmentsService.update(id, updateDepartmentDto);
  }

  @Public()
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.departmentsService.remove(id);
  }
}
