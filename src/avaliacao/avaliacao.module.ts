import { Module } from '@nestjs/common';
import { AvaliacaoController } from './avaliacao.controller';
import { AvaliacaoService } from './avaliacao.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [AvaliacaoController],
  providers: [AvaliacaoService, PrismaService],
})
export class AvaliacaoModule {}
