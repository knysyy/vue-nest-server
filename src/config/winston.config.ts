import { ConfigService } from './config.service';
import * as path from 'path';
import * as winston from 'winston';

export const winstonConfigFactory = (configService: ConfigService) => {
  const logLevel = configService.get('LOG_LEVEL');
  const logFilePath = path.join(
    __dirname,
    '..',
    configService.get('APP_LOG_PATH'),
  );
  return {
    level: logLevel,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.printf(({ level, message, timestamp }) => {
        return `${timestamp} [${level}] ${message}`;
      }),
    ),
    transports: [
      new winston.transports.File({
        filename: 'error.log',
        dirname: logFilePath,
      }),
    ],
  };
};
