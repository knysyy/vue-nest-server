import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Request,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserResponse } from "./response/user.response";

@Controller("api/user")
export class UsersController {
  @UseGuards(AuthGuard("jwt"))
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  getUser(@Request() req): UserResponse {
    return new UserResponse(req.user);
  }
}
