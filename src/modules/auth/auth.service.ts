import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import User from '../users/users.entity';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {
  }

  async validateUserByEmailAndPass(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateUserByToken(payloadToken: string): Promise<any> {
    const user = await this.usersService.findByToken(payloadToken);
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { email: user.email, id: user.id, token: user.token };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(user: RegisterUserDto) {
    return this.usersService.register(user);
  }
}
