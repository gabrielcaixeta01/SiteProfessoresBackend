import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestBody } from './dto/loginRequestBody.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body  () LoginRequestBody : LoginRequestBody) {
    return this.authService.login(LoginRequestBody);
  }
  

} 
