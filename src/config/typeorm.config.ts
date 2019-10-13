import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from './config.service';

@Injectable()
export class TypeOrmConfig implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get('TYPEORM_HOST'),
      port: parseInt(this.configService.get('TYPEORM_PORT'), 10),
      username: this.configService.get('TYPEORM_USERNAME'),
      password: this.configService.get('TYPEORM_PASSWORD'),
      database: this.configService.get('TYPEORM_DATABASE'),
      entities: [this.configService.get('TYPEORM_ENTITIES').split(',')[0]],
      logging: this.configService.get('TYPEORM_LOGGING') === 'true',
      synchronize: this.configService.get('TYPEORM_SYNCHRONIZE') === 'true',
    };
  }
}
