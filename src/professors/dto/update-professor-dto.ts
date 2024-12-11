import {
  IsNotEmpty,
  IsOptional,
  IsDate,
  IsInt,
  IsArray,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateProfessorDto {
  @IsOptional()
  @IsNotEmpty({ message: 'O professor deve pertencer a algum departamento' })
  @IsInt({ message: 'Departamento inválido' })
  departmentId?: number;

  @IsOptional()
  @IsArray({ message: 'Os IDs dos cursos devem ser um array' })
  @IsInt({ each: true, message: 'Os IDs dos cursos devem ser números' })
  courseIds?: number[];

  @IsOptional()
  @Transform(({ value }) => (value ? new Date(value) : undefined))
  @IsDate({ message: 'Data de atualização inválida' })
  dateUpdated?: Date;
}
