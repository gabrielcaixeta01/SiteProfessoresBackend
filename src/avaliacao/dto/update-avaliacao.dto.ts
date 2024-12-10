import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
} from 'class-validator';

export class UpdateAvaliacaoDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  text?: string;

  @IsNumber()
  @IsOptional()
  nota?: number;

  @IsBoolean()
  @IsOptional()
  isEdited?: boolean;

  @IsNumber()
  @IsOptional()
  professorId?: number;

  @IsNumber()
  @IsOptional()
  courseId?: number;

  @IsNumber()
  @IsOptional()
  userId2?: number;
}
