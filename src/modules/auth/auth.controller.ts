import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { RegisterUserDto } from "./dto/register-user.dto";
import { TokenEntity } from "./entity/token.entity";

@Controller("api/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard("local"))
  @Post("login")
  async logIn(@Request() req): Promise<TokenEntity> {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("logout")
  @HttpCode(202)
  async logOut(@Request() req): Promise<void> {
    await this.authService.logout(req.user);
  }

  @Post("signup")
  async signUp(@Body() userDto: RegisterUserDto): Promise<TokenEntity> {
    const user = await this.authService.signUp(userDto);
    return this.authService.login(user);
  }
}
