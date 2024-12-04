import { IsString, IsOptional, IsBase64 } from 'class-validator';

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

  @IsString()
  @IsOptional()
  course?: string;

  @IsOptional()
  @IsBase64()
  profilepic?: string | Buffer;
}
