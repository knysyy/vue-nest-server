import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import AuthService from './auth.service';
import RegisterUserDto from './dto/register-user.dto';
import TokenResponse from './response/token.response';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston/dist/winston.constants';
import { InjectEventEmitter } from 'nest-emitter';
import { AuthEventsEmitter } from '../../events/auth.events';

@Controller('auth')
export default class AuthController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    @InjectEventEmitter()
    private readonly authEventsEmitter: AuthEventsEmitter,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async logIn(@Request() req): Promise<TokenResponse> {
    const token = await this.authService.login(req.user);
    return new TokenResponse(token);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('logout')
  async logOut(@Request() req): Promise<void> {
    await this.authService.logout(req.user);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  async signUp(@Body() userDto: RegisterUserDto): Promise<void> {
    this.logger.debug(`SignUp Parameter : ${JSON.stringify(userDto)}`);
    const user = await this.authService.signUp(userDto);
    this.authEventsEmitter.emit('signup', {
      name: user.name,
      email: user.email,
      verificationToken: user.verificationToken,
    });
  }

  @HttpCode(HttpStatus.OK)
  @Get('verify/:token')
  async verifyEmail(@Param('token') token: string): Promise<void> {
    await this.authService.verifyEmail(token);
  }
}
