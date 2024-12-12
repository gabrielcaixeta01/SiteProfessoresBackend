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
  @IsString({ message: 'O nome deve ser uma string.' })
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  name: string;

  @IsEmail({}, { message: 'O e-mail deve ser válido.' })
  @IsNotEmpty({ message: 'O e-mail é obrigatório.' })
  email: string;

  @IsString({ message: 'A senha deve ser uma string.' })
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

  @IsOptional()
  @IsInt()
  departmentId?: number;

  @IsOptional()
  @IsInt()
  programId?: number;

  @IsOptional()
  @Transform(({ value }) =>
    typeof value === 'string' ? Buffer.from(value, 'base64') : null,
  )
  profilepic?: Buffer;
}
