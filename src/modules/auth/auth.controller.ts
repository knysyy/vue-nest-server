import { Body, Controller, Get, HttpCode, Inject, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import AuthService from './auth.service';
import RegisterUserDto from './dto/register-user.dto';
import TokenResponse from './response/token.response';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston/dist/winston.constants';

@Controller('auth')
export default class AuthController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async logIn(@Request() req): Promise<TokenResponse> {
    const token = await this.authService.login(req.user);
    this.logger.info(`Login Success userId : ${req.user.id}`);
    return new TokenResponse(token);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('logout')
  @HttpCode(202)
  async logOut(@Request() req): Promise<void> {
    await this.authService.logout(req.user);
    this.logger.info(`Logout Success userId : ${req.user.id}`);
  }

  @Post('signup')
  async signUp(@Body() userDto: RegisterUserDto): Promise<TokenResponse> {
    this.logger.debug('SignUp Parameter', userDto);
    const user = await this.authService.signUp(userDto);
    this.logger.info(`SignUp Success userId : ${user.id}`);
    const token = await this.authService.login(user);
    return new TokenResponse(token);
  }
}
