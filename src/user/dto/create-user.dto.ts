import { IsString, IsEmail, IsNumber, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;
  @IsEmail()
  email: string;
  @IsString()
  name: string;
  @IsString()
  @MinLength(6)
  password: string;
  @IsNumber()
  age: number;
}
