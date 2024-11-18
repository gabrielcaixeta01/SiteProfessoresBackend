import { IsString, IsEmail, IsOptional, IsBase64 } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  username?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsBase64()
  profilepic?: string | Buffer;
}
