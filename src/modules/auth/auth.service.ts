import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import User from '../users/entity/users.entity';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUserByEmailAndPass(
    email: string,
    pass: string,
  ): Promise<User | undefined> {
    const user = await this.usersService.findByEmail(email);
    if (user && bcrypt.compareSync(pass, user.password)) {
      return user;
    }
    return null;
  }

  async validateUserByToken(payloadToken: string): Promise<User | undefined> {
    const user = await this.usersService.findByToken(payloadToken);
    if (user) {
      return user;
    }
    return null;
  }

  async login(user: User): Promise<{ token: string }> {
    const payload = { email: user.email, id: user.id, token: user.token };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async logout(user: User): Promise<void> {
    await this.usersService.logout(user);
  }

  async signUp(user: RegisterUserDto): Promise<User> {
    return this.usersService.register(user);
  }
}
