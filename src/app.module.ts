import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { CommentModule } from './comment/comment.module';
import { AvaliacaoModule } from './avaliacao/avaliacao.module';
import { ProfessorsModule } from './professors/professors.module';
import { CoursesModule } from './courses/courses.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
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
