import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateCommentDto {
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    text: string;  
  
   
}
