import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import AuthModule from './modules/auth/auth.module';
import UsersModule from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/typeorm.config';
import { ConfigModule } from './config/config.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import SnippetsModule from './modules/snippets/snippets.module';
import LanguagesModule from './modules/languages/languages.module';
import { ConfigService } from './config/config.service';
import { WinstonModule } from 'nest-winston';
import { winstonConfigFactory } from './config/winston.config';
import { MorganMiddleware } from './middlewares/MorganMiddleware';
import { TerminusModule } from '@nestjs/terminus';
import { HealthModule } from './modules/health/health.module';
import { TerminusOptionsService } from './modules/health/terminus-options.service';
import { MailerModule } from '@nest-modules/mailer';
import { mailerConfigFactory } from './config/mailer.config';
import { NestEmitterModule } from 'nest-emitter';
import { EventEmitter } from 'events';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    SnippetsModule,
    LanguagesModule,
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: winstonConfigFactory,
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public'),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: TypeOrmConfig,
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: mailerConfigFactory,
      inject: [ConfigService],
    }),
    TerminusModule.forRootAsync({
      imports: [HealthModule],
      useExisting: TerminusOptionsService,
    }),
    NestEmitterModule.forRoot(new EventEmitter()),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MorganMiddleware).forRoutes('*');
  }
}
