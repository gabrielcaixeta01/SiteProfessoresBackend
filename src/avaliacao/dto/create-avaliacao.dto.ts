import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAvaliacaoDto {
  @IsString()
  text: string;

  @IsNumber()
  userId: number;

  @IsOptional()
  @IsBoolean()
  isEdited?: boolean;

  @IsNumber()
  professorId: number;

  @IsNumber()
  courseId: number;
}
