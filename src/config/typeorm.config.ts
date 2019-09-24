import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from './config.service';

@Injectable()
export class TypeOrmConfig implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get('DB_HOST'),
      port: parseInt(this.configService.get('DB_PORT'), 10),
      username: this.configService.get('DB_USERNAME'),
      password: this.configService.get('DB_PASSWORD'),
      database: this.configService.get('DB_DATABASE'),
      logging: this.configService.get('DB_LOGGING') === 'true',
      synchronize: false,
      entities: ['dist/**/*.entity{.ts,.js}'],
      migrations: ['dist/**/migrations/*{.ts,.js}'],
      subscribers: ['dist/**/subscribers/*{.ts,.js}'],
      cli: {
        entitiesDir: 'src/**',
        migrationsDir: 'src/**/migrations',
        subscribersDir: 'src/**/subscribers',
      },
    };
  }
}
