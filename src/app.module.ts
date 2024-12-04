import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { CommentModule } from './comment/comment.module';
import { AvaliacaoModule } from './avaliacao/avaliacao.module';
import { ProfessorsModule } from './professors/professors.module';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    CommentModule,
    AvaliacaoModule,
    ProfessorsModule,
    CoursesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
