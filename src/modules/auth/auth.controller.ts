import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import AuthService from './auth.service';
import RegisterUserDto from './dto/register-user.dto';
import TokenResponse from './response/token.response';

@Controller('auth')
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async logIn(@Request() req): Promise<TokenResponse> {
    const token = await this.authService.login(req.user);
    return new TokenResponse(token);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('logout')
  @HttpCode(202)
  async logOut(@Request() req): Promise<void> {
    await this.authService.logout(req.user);
  }

  @Post('signup')
  async signUp(@Body() userDto: RegisterUserDto): Promise<TokenResponse> {
    const user = await this.authService.signUp(userDto);
    const token = await this.authService.login(user);
    return new TokenResponse(token);
  }
}
