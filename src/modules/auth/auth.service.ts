import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import UsersService from '../users/users.service';
import User from '../users/entity/users.entity';
import { JwtService } from '@nestjs/jwt';
import RegisterUserDto from './dto/register-user.dto';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston/dist/winston.constants';

@Injectable()
export default class AuthService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
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
    this.logger.error(`User Not Found, request Email : ${email}`);
    return null;
  }

  async validateUserByToken(payloadToken: string): Promise<User | undefined> {
    const user = await this.usersService.findByToken(payloadToken);
    if (user) {
      return user;
    }
    this.logger.error(`User Not Found, request payloadToken : ${payloadToken}`);
    return null;
  }

  async login(user: User): Promise<string> {
    const payload = { email: user.email, id: user.id, token: user.token };
    return this.jwtService.sign(payload);
  }

  async logout(user: User): Promise<void> {
    await this.usersService.logout(user);
  }

  async signUp(user: RegisterUserDto): Promise<User> {
    return this.usersService.register(user);
  }
}
