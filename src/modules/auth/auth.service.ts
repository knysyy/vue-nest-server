import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import UsersService from '../users/users.service';
import User from '../users/entity/users.entity';
import { JwtService } from '@nestjs/jwt';
import RegisterUserDto from './dto/register-user.dto';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston/dist/winston.constants';
import { MailerService } from '@nest-modules/mailer';
import { InjectEventEmitter } from 'nest-emitter';
import { AuthEventEmitter, SignupContext } from '../../events/auth.events';

@Injectable()
export default class AuthService implements OnModuleInit {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    @InjectEventEmitter() private readonly emitter: AuthEventEmitter,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  onModuleInit(): any {
    this.emitter.on('signup', async (context: SignupContext) =>
      this.sendVerificationUrl(context),
    );
  }

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
    // TODO 独自のエラーを実装。
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
    return await this.usersService.register(user);
  }

  async sendVerificationUrl(context: SignupContext) {
    await this.mailerService.sendMail({
      to: context.email,
      subject: 'Email Verification',
      template: 'signup',
      context: {
        name: context.name,
        token: context.verificationToken,
      },
    });
  }
}
