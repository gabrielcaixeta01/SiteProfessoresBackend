import { CreateProfessorDto } from './dto/create-professor-dto';
import { UpdateProfessorDto } from './dto/update-professor-dto';
import { ProfessorsService } from './professors.service';
import {Body, Controller, Post, Get, ValidationPipe, Param, ParseIntPipe, Delete, Patch } from '@nestjs/common';

@Controller('professors')
export class ProfessorsController {
  constructor(private readonly professorsService: ProfessorsService) {}

  @Post()
  async create (@Body(ValidationPipe) userData: CreateProfessorDto){
    return await this.professorsService.create(userData);
  }

  
  @Get() 
  async findAll(){
    return await this.professorsService.findAll();
  }

  @Get (':id') 
  async findCourse(@Param('id', ParseIntPipe) id:number){
    return await this.professorsService.findProfessor(id);
  }

  @Delete (':id')
  async deleteCourse (@Param('id', ParseIntPipe) id:number){
    return await this.professorsService.deleteProfessor(id);
  }

  @Patch(':id')
  async updateCourse (@Param('id', ParseIntPipe) id:number, @Body(ValidationPipe) data: UpdateProfessorDto){
    return await this.professorsService.updateProfessor(id, data);
  }

}