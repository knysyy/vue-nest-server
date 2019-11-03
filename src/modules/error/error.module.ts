import { Module } from '@nestjs/common';
import ErrorEventService from './error-event.service';

@Module({
  providers: [ErrorEventService],
})
export default class ErrorModule {}
