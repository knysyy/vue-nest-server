import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async logIn(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('logout')
  async logOut(@Request() req) {
    return this.authService.logout(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('user')
  getUser(@Request() req) {
    const { id, password, token, ...rest } = req.user;
    return rest;
  }

  @Post('signup')
  async signUp(@Body() userDto: RegisterUserDto) {
    return this.authService.signUp(userDto);
  }
}
