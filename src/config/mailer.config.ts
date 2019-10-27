import { ConfigService } from './config.service';
import * as path from 'path';
import { HandlebarsAdapter } from '@nest-modules/mailer';

export const mailerConfigFactory = (configService: ConfigService) => {
  return {
    transport: {
      host: configService.get('MAIL_HOST'),
      port: configService.get('MAIL_PORT'),
      secure: configService.get('MAIL_SECURE') === 'true',
      auth: {
        user: configService.get('MAIL_USER'),
        pass: configService.get('MAIL_PASS'),
      },
    },
    defaults: {
      from: configService.get('MAIL_FROM'),
    },
    template: {
      dir: path.join(__dirname, '..', 'templates'),
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    },
  };
};
