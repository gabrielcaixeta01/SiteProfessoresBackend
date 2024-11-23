import { IsString, IsOptional, IsNotEmpty } from "class-validator";
export class UpdateAvaliacaoDto{
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    text: string;
}