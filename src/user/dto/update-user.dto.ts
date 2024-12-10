import { IsString, IsOptional, IsInt } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  department?: string;

  @IsInt()
  @IsOptional()
  courseId?: number;

  @IsOptional()
  @IsString()
  profilepic?: string | Buffer;
}
