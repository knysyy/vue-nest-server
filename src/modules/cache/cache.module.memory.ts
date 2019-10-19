import { CacheModule, Module } from '@nestjs/common';

@Module({
  imports: [
    CacheModule.register({
      ttl: 60 * 5,
    }),
  ],
  exports: [CacheModule],
})
export default class MyCacheModule {}
