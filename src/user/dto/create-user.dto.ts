import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsInt,
  MinLength,
  Matches,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8, { message: 'A senha deve ter pelo menos 8 caracteres.' })
  @Matches(/(?=.*[a-z])/, {
    message: 'A senha deve conter pelo menos uma letra minúscula.',
  })
  @Matches(/(?=.*[A-Z])/, {
    message: 'A senha deve conter pelo menos uma letra maiúscula.',
  })
  @Matches(/(?=.*\d)/, { message: 'A senha deve conter pelo menos um número.' })
  @Matches(/(?=.*[@$!%*?&])/, {
    message: 'A senha deve conter pelo menos um caractere especial.',
  })
  password: string;

  @IsInt()
  @IsNotEmpty()
  departmentId: number;
  @IsOptional()
  @IsInt()
  programId?: number;

  @IsOptional()
  @Transform(({ value }) => (value ? Buffer.from(value, 'base64') : null)) // Converte base64 para Buffer
  profilepic?: Buffer;
}
