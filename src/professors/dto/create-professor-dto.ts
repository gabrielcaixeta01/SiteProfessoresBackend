import {
    IsNotEmpty,
    IsString,
    IsOptional,
    IsDate
    } from 'class-validator';

import { Transform } from 'class-transformer';

export class CreateProfessorDto{
    @IsNotEmpty({message: "O professor deve ter um nome"})
    @IsString ({message: "Nome inválido"})
    name:string;

    @IsNotEmpty({message: "O professor deve pertencer a algum departamento"})
    @IsString({message:"Departamento inválido"})
    department: string

    @IsOptional()
    idCourses?: string

    @IsOptional()
    @Transform(({ value }) => (value ? new Date(value) : undefined))
    @IsDate()
    dateCreated?: Date;

    @IsOptional()
    @Transform(({ value }) => (value ? new Date(value) : undefined))
    @IsDate()
    dateUptaded?: null;
}