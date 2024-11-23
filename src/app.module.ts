import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { CommentModule } from './comment/comment.module';
import { AvaliacaoModule } from './avaliacao/avaliacao.module';

@Module({
  imports: [UserModule, PrismaModule, CommentModule, AvaliacaoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
