import {
  Body,
  Controller,
  Post,
  ValidationPipe,
  Get,
  Param,
  ParseIntPipe,
  Delete,
  Patch,
} from '@nestjs/common';
import { AvaliacaoService } from './avaliacao.service';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { UpdateAvaliacaoDto } from './dto/update-avaliacao.dto';
import { Public } from 'src/auth/decorators/isPublic.decorator';

@Controller('avaliacao')
export class AvaliacaoController {
  constructor(private readonly avaliacaoService: AvaliacaoService) {}

  @Post()
  async create(@Body(ValidationPipe) avaliacaoData: CreateAvaliacaoDto) {
    console.log('Dados recebidos no Controller:', avaliacaoData);
    return this.avaliacaoService.create(avaliacaoData);
  }

  @Public()
  @Get()
  async findAll() {
    return this.avaliacaoService.findAll();
  }

  @Public()
  @Get(':id')
  async findAvaliacao(@Param('id', ParseIntPipe) id: number) {
    return this.avaliacaoService.findAvaliacao(id);
  }

  @Delete(':id')
  async deleteAvaliacao(@Param('id', ParseIntPipe) id: number) {
    return this.avaliacaoService.deleteAvaliacao(id);
  }

  @Patch(':id')
  async updateAvaliacao(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) data: UpdateAvaliacaoDto,
  ) {
    return this.avaliacaoService.updateAvaliacao(id, data);
  }
}
