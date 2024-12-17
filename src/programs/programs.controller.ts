import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { Public } from 'src/auth/decorators/isPublic.decorator';

@Controller('programs')
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {}

  @Public()
  @Post()
  async create(
    @Body() createProgramDto: CreateProgramDto | CreateProgramDto[],
  ) {
    if (Array.isArray(createProgramDto)) {
      if (createProgramDto.length === 0) {
        throw new BadRequestException(
          'A lista de programas não pode estar vazia.',
        );
      }
      return this.programsService.createMany(createProgramDto);
    }
    return this.programsService.create(createProgramDto);
  }

  @Public()
  @Get()
  async findAll() {
    return this.programsService.findAll();
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.programsService.findOne(id);
  }

  @Public()
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProgramDto: UpdateProgramDto,
  ) {
    return this.programsService.update(id, updateProgramDto);
  }

  @Public()
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.programsService.remove(id);
  }
}
