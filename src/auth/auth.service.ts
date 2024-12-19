import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginRequestBody } from './dto/loginRequestBody.dto';
import { UserToken } from './types/UserToken';
import * as bcrypt from 'bcrypt';
import { UserPayload } from './types/UserPayload';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService) {}

    async login(LoginRequestBody: LoginRequestBody): Promise<UserToken> {
      const user = await this.validateUser(LoginRequestBody.email, LoginRequestBody.password);
      if(!user){
        throw new UnauthorizedException('Credenciais invalidas');
      }

      const payload : UserPayload = { email: user.email, sub: user.id };
      const jwtSecret = this.configService.get<string>('JWT_SECRET');

      const jwtToken = await this.jwtService.sign(payload, {expiresIn: '1d', secret: jwtSecret});
      return {
        access_token: jwtToken,
      };

    }
    

    async validateUser(email: string, password: string) {
      const user = await this.userService.findUserByEmail(email);

      if (user) {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
          return { 
            ...user,
            password: undefined,};
        }
      }
      return null;

    }
}
