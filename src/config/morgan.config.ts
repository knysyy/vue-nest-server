import { ConfigService } from './config.service';
import * as path from 'path';
import rfs from 'rotating-file-stream';
import { MorganInterceptor } from 'nest-morgan';

// TODO useFactoryだとnest-morganが動かない。
export const morganConfigFactory = (configService: ConfigService) => {
  const logFilePath = path.join(
    __dirname,
    '..',
    configService.get('ACCESS_LOG_PATH'),
  );
  const accessLogStream = rfs('access.log', {
    interval: '1d',
    path: logFilePath,
  });
  return MorganInterceptor('combined', {
    stream: accessLogStream,
  });
};
