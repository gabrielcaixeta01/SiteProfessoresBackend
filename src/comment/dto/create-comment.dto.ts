import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCommentDto {
    @IsString()
    text: string;  
  
    @IsNumber()
    userId: number;
  
    @IsNumber()
    reviewId: number;
  
    @IsDate()
    @IsOptional()
    date: Date;
  
    @IsBoolean()
    isEdited: boolean;
}
