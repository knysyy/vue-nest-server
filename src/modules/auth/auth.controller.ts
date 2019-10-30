import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import AuthService from './auth.service';
import RegisterUserDto from './dto/register-user.dto';
import TokenResponse from './response/token.response';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston/dist/winston.constants';
import { InjectEventEmitter } from 'nest-emitter';
import { AuthEventEmitter } from '../../events/auth.events';

@Controller('auth')
export default class AuthController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    @InjectEventEmitter()
    private readonly authEventEmitter: AuthEventEmitter,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async logIn(@Request() req): Promise<TokenResponse> {
    const token = await this.authService.login(req.user);
    this.logger.info(`Login Success userId : ${req.user.id}`);
    return new TokenResponse(token);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('logout')
  async logOut(@Request() req): Promise<void> {
    await this.authService.logout(req.user);
    this.logger.info(`Logout Success userId : ${req.user.id}`);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  async signUp(@Body() userDto: RegisterUserDto): Promise<void> {
    this.logger.debug('SignUp Parameter', userDto);
    const user = await this.authService.signUp(userDto);
    this.authEventEmitter.emit('signup', {
      name: user.name,
      email: user.email,
      verificationToken: user.verificationToken,
    });
    this.logger.info(`SignUp Success userId : ${user.id}`);
  }

  @HttpCode(HttpStatus.OK)
  @Get('verify/:token')
  async verify(@Param('token') token: string): Promise<void> {
    // TODO tokenの検証処理を実装。
    return;
  }
}
