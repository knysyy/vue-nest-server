import { ConfigService } from './config.service';
import * as redisStore from 'cache-manager-redis-store';

export const cacheConfigFactory = async (configService: ConfigService) => {
  const cacheTarget = configService.get('CACHE_TARGET');
  const cacheTtl = parseInt(configService.get('CACHE_TTL'), 10);
  if (cacheTarget === 'redis') {
    const redisHost = configService.get('REDIS_HOST');
    const redisPort = parseInt(configService.get('REDIS_PORT'), 10);
    return {
      store: redisStore,
      host: redisHost,
      port: redisPort,
      ttl: cacheTtl,
    };
  }
  return {
    ttl: cacheTtl,
  };
};
