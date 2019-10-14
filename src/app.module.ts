import { Module } from '@nestjs/common';
import AuthModule from './modules/auth/auth.module';
import UsersModule from './modules/users/users.module';
import { MorganModule } from 'nest-morgan';
import { APP_INTERCEPTOR } from '@nestjs/core';
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
import { morganConfigFactory } from './config/morgan.config';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    SnippetsModule,
    LanguagesModule,
    ConfigModule,
    MorganModule.forRoot(),
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
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useFactory: morganConfigFactory,
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}
