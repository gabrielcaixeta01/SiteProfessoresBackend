import { IsNotEmpty, IsString, IsOptional, IsDate } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateCourseDto {
  @IsNotEmpty({ message: 'A disciplina deve ter um nome' })
  @IsString()
  name: string;

  @IsOptional()
  idProfessors: string;

  @IsOptional()
  @Transform(({ value }) => (value ? new Date(value) : undefined))
  @IsDate()
  dateCreated?: Date;

  @IsOptional()
  @Transform(({ value }) => (value ? new Date(value) : undefined))
  @IsDate()
  dateUptaded?: null;
}
