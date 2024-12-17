import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { CommentModule } from './comment/comment.module';
import { AvaliacaoModule } from './avaliacao/avaliacao.module';
import { ProfessorsModule } from './professors/professors.module';
import { CoursesModule } from './courses/courses.module';
import { ConfigModule } from '@nestjs/config';
import { ProgramsModule } from './programs/programs.module';
import { DepartmentsModule } from './departments/departments.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    CommentModule,
    AvaliacaoModule,
    ProfessorsModule,
    CoursesModule,
    ProgramsModule,
    DepartmentsModule,
    JwtModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,],
  controllers: [],
  providers: [],
})
export class AppModule {}
