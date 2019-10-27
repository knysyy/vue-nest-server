import { Body, ClassSerializerInterceptor, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import UserResponse from './response/user.response';
import UsersService from './users.service';
import UpdateUserDto from './dto/update-user.dto';

@Controller('user')
export default class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.OK)
  @Get()
  getUser(@Request() req): UserResponse {
    return new UserResponse(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.OK)
  @Post()
  async editUser(
    @Request() req,
    @Body() userDto: UpdateUserDto,
  ): Promise<UserResponse> {
    const user = await this.usersService.update(req.user, userDto);
    return new UserResponse(user);
  }
}
