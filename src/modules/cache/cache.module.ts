import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '../../config/config.module';
import { cacheConfigFactory } from '../../config/cache.config';
import { ConfigService } from '../../config/config.service';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: cacheConfigFactory,
      inject: [ConfigService]
    }),
  ],
  exports: [CacheModule],
})
export default class MyCacheModule {}
