import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston/dist/winston.constants';
import { Logger } from 'winston';
import { InjectEventEmitter } from 'nest-emitter';
import { ErrorEventsEmitter } from '../../events/error.events';

@Injectable()
export default class ErrorEventService implements OnModuleInit {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    @InjectEventEmitter() private readonly errorEventsEmitter: ErrorEventsEmitter,
  ) {}

  onModuleInit(): any {
    this.errorEventsEmitter.on('error', (err: Error) => {
      this.catchError(err);
    });
  }

  catchError(err: Error) {
    this.logger.error(err.stack);
  }
}
