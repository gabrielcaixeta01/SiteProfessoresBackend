import { IsString, IsOptional, IsInt } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsInt()
  @IsOptional()
  programId?: number;

  @IsOptional()
  @IsInt()
  departmentId?: number;

  @IsOptional()
  @IsString()
  profilepic?: string | Buffer;
}
