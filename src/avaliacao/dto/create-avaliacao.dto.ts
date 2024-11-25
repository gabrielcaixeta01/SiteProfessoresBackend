import {
    IsBoolean,
    IsDate,
    IsNumber,
    IsOptional,
    IsString,
  } from 'class-validator';
import { Transform } from 'class-transformer';
export class CreateAvaliacaoDto{
    @IsString()
    text: string;

    @IsNumber()
    userId2: number;

    @IsNumber()
    nota: number;

    @IsOptional()
    @Transform(({ value }) => (value ? new Date(value) : undefined))
    @IsDate()
    date?: Date;

    @IsOptional()
    @IsBoolean()
    isEdited: boolean;

    @IsNumber()
    professorId: number;

    @IsNumber()
    courseId:number;
}