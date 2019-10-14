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
import UserResponse from './response/user.response';
import UsersService from './users.service';
import UpdateUserDto from './dto/update-user.dto';

@Controller('user')
export default class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(200)
  @Get()
  getUser(@Request() req): UserResponse {
    return new UserResponse(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(200)
  @Post()
  async update(
    @Request() req,
    @Body() userDto: UpdateUserDto,
  ): Promise<UserResponse> {
    const user = await this.usersService.update(req.user, userDto);
    return new UserResponse(user);
  }
}
