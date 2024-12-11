import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDate,
  IsInt,
  IsArray,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProfessorDto {
  @IsNotEmpty({ message: 'O professor deve ter um nome' })
  @IsString({ message: 'Nome inválido' })
  name: string;

  @IsNotEmpty({ message: 'O professor deve pertencer a algum departamento' })
  @IsInt({ message: 'Departamento inválido' })
  departmentId: number;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true, message: 'Os IDs dos cursos devem ser números' })
  courseIds?: number[];

  @IsOptional()
  @Transform(({ value }) => (value ? new Date(value) : undefined))
  @IsDate({ message: 'Data de criação inválida' })
  dateCreated?: Date;

  @IsOptional()
  @Transform(({ value }) => (value ? new Date(value) : undefined))
  @IsDate({ message: 'Data de atualização inválida' })
  dateUpdated?: Date;
}
