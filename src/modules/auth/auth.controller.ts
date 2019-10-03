import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserResponse } from '../users/response/user.response';
import { TokenEntity } from './entity/token.entity';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async logIn(@Request() req): Promise<TokenEntity> {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('logout')
  @HttpCode(202)
  async logOut(@Request() req): Promise<void> {
    await this.authService.logout(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('user')
  getUser(@Request() req): UserResponse {
    return new UserResponse(req.user);
  }

  @Post('signup')
  async signUp(@Body() userDto: RegisterUserDto): Promise<TokenEntity> {
    const user = await this.authService.signUp(userDto);
    return this.authService.login(user);
  }
}
