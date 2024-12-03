import {
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
  avaliacaoId: number;

}
