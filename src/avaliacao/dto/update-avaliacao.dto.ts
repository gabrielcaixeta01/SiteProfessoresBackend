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


  @IsBoolean()
  @IsOptional()
  isEdited?: boolean;


}
