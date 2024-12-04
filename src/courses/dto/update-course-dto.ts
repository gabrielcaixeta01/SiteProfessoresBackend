import { IsString, IsOptional, IsDate } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateCourseDto {
  @IsOptional()
  @IsString()
  idProfessors: string;

  @IsOptional()
  @Transform(({ value }) => (value ? new Date(value) : undefined))
  @IsDate()
  dateUptaded?: Date;
}
