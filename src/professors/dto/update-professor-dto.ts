import {
    IsNotEmpty,
    IsString,
    IsOptional,
    IsDate
} from 'class-validator';

import { Transform } from 'class-transformer';

export class UpdateProfessorDto {

    @IsOptional()
    @IsNotEmpty({ message: "O professor deve pertencer a algum departamento" })
    @IsString({ message: "Departamento inválido" })
    department: string;

    @IsOptional()
    idCourses: string;


    @IsOptional()
    @Transform(({ value }) => (value ? new Date(value) : undefined))
    @IsDate()
    dateUptaded?: Date;
}