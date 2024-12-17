import { UserService } from './user.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ValidationPipe,
  ParseIntPipe,
  Delete,
  Patch,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/auth/decorators/isPublic.decorator';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly prisma: PrismaService,
  ) {}

  @Public()
  @Post()
  async create(@Body(ValidationPipe) userData: CreateUserDto) {
    if (typeof userData.profilepic === 'string') {
      userData.profilepic = Buffer.from(userData.profilepic, 'base64');
    }
    return await this.userService.create(userData);
  }

  @Public()
  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Public()
  @Get(':id')
  async findUser(@Param('id', ParseIntPipe) id: number) {
    try {
      const user = await this.userService.findUserById(id);
      if (!user) {
        throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
      }
      return user;
    } catch (error) {
      throw new NotFoundException(`Erro ao buscar o usuário: ${error.message}`);
    }
  }

  @Public()
  @Get('email/:email')
  async findUserByEmail(@Param('email') email: string) {
    try {
      const user = await this.userService.findUserByEmail(email);
      if (!user) {
        throw new NotFoundException(
          `Usuário com email ${email} não encontrado`,
        );
      }
      return user;
    } catch (error) {
      throw new HttpException(
        `Erro ao buscar o usuário por email: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    try {
      const user = await this.userService.findUserById(id);
      if (!user) {
        throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
      }
      await this.userService.deleteUser(id);
      return { message: `Usuário com ID ${id} excluído com sucesso` };
    } catch (error) {
      throw new HttpException(
        `Erro ao excluir o usuário: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) data: UpdateUserDto,
  ) {
    try {
      // Se profilepic for string base64, converte
      if (typeof data.profilepic === 'string') {
        data.profilepic = Buffer.from(data.profilepic, 'base64');
      }

      // Atualiza o usuário diretamente no serviço
      const updatedUser = await this.userService.updateUser(id, data);

      return updatedUser;
    } catch (error) {
      throw new HttpException(
        `Erro ao atualizar o usuário: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
