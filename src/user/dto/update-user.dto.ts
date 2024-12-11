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
  programId?: number;

  @IsOptional()
  @IsString()
  profilepic?: string | Buffer;
}
