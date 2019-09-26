import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passReqToCallback: false,
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUserByEmailAndPass(
      email,
      password,
    );
    if (!user) {
      throw new BadRequestException();
    }
    return user;
  }
}
