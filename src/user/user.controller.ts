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
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body(ValidationPipe) userData: CreateUserDto) {
    // Verifica se profilepic é uma string e converte para Buffer
    if (typeof userData.profilepic === 'string') {
      userData.profilepic = Buffer.from(userData.profilepic, 'base64');
    }
    return await this.userService.create(userData);
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findUser(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.findUser(id);
  }

  @Get('email/:email')
  async findUserByEmail(@Param('email') email: string) {
    return await this.userService.findUserByEmail(email);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.deleteUser(id);
  }

  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) data: UpdateUserDto,
  ) {
    // Verifica se profilepic é uma string e converte para Buffer
    if (typeof data.profilepic === 'string') {
      data.profilepic = Buffer.from(data.profilepic, 'base64');
    }
    return await this.userService.updateUser(id, data);
  }
}
