import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston/dist/winston.constants';
import { MailerService } from '@nest-modules/mailer';
import { InjectEventEmitter } from 'nest-emitter';
import { AuthEventEmitter, SignupContext } from '../../events/auth.events';
import { ConfigService } from '../../config/config.service';

@Injectable()
export default class AuthEventService implements OnModuleInit {
  constructor(
    private readonly configService: ConfigService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    @InjectEventEmitter() private readonly emitter: AuthEventEmitter,
    private readonly mailerService: MailerService,
  ) {}

  onModuleInit(): any {
    this.emitter.on('signup', async (context: SignupContext) =>
      this.sendVerificationUrl(context),
    );
  }

  async sendVerificationUrl(context: SignupContext) {
    const token = encodeURIComponent(context.verificationToken);
    const verificationUrl = this.configService.getAppUrl(
      `/verify/${token}`,
    );
    await this.mailerService
      .sendMail({
        to: context.email,
        subject: 'Email Verification',
        template: 'signup',
        context: {
          name: context.name,
          Link: verificationUrl,
        },
      })
      .catch(err => {
        this.logger.error(`Send Error signup email. email : ${context.email}`, err);
        throw err;
      });
    this.logger.info(`Send Success signup email. email : ${context.email}`);
  }
}
