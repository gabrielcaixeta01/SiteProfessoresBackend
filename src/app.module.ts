import { Controller, Module } from '@nestjs/common';
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
import { AuthGuard } from './auth/guards/auth-guard';
import { APP_GUARD } from '@nestjs/core';

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
   providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
