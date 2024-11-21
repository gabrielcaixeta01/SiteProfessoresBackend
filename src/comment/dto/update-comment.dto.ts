import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateCommentDto {
    @IsString()
    text: string;  
  
   
}
