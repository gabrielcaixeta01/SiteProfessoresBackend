import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateCommentDto {
  @IsString()
  text: string;

  @IsNumber()
  userId: number;

  @IsNumber()
  reviewId: number;

  @IsOptional()
  @Transform(({ value }) => (value ? new Date(value) : undefined))
  @IsDate()
  date?: Date;

  @IsOptional()
  @IsBoolean()
  isEdited?: boolean;
}
