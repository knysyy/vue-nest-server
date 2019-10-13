import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { jwtConstants } from '../../../config/server.constatnts';
import { ExtractJwt, Strategy } from 'passport-jwt';
import PayloadInterface from '../interface/payload.interface';
import AuthService from '../auth.service';

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: PayloadInterface) {
    const user = this.authService.validateUserByToken(payload.token);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
