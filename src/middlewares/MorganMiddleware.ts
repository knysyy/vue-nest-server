import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { ConfigService } from '../config/config.service';
import * as morgan from 'morgan';
import * as path from 'path';
import rfs from 'rotating-file-stream';

@Injectable()
export class MorganMiddleware implements NestMiddleware {
  private readonly format: string | morgan.FormatFn;
  private readonly options: morgan.Options;

  constructor(private readonly configService: ConfigService) {
    const logFilePath = path.join(
      __dirname,
      '..',
      configService.get('ACCESS_LOG_PATH'),
    );
    const accessLogStream = rfs('access.log', {
      interval: '1d',
      compress: 'gzip',
      path: logFilePath,
    });
    this.format = 'combined';
    this.options = {
      stream: accessLogStream,
    };
  }

  use(req: Request, res: Response, next: () => any) {
    morgan(this.format as any, this.options)(req, res, next);
  }
}
