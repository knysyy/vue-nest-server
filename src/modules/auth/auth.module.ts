import { Module } from '@nestjs/common';
import AuthService from './auth.service';
import UsersModule from '../users/users.module';
import LocalStrategy from './passport/local.strategy';
import { PassportModule } from '@nestjs/passport';
import AuthController from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../../config/server.constatnts';
import JwtStrategy from './passport/jwt.strategy';
import AuthEventService from './auth-event.service';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '86400s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthEventService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export default class AuthModule {}
