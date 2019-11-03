import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston/dist/winston.constants';
import { Logger } from 'winston';

interface ResponseBody {
  code: number;
  status: string;
  message: string;
  messages?: string;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const status = exception.getStatus();
    const message = exception.message.error;

    let responseBody: ResponseBody = {
      code: status,
      status: 'error',
      message,
    };

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      const trace = exception.stack;
      this.logger.error(trace);
    }

    if (status === HttpStatus.BAD_REQUEST) {
      responseBody = {
        ...responseBody,
        messages: exception.message.message,
      };
    }
    response.status(status).json(responseBody);
  }
}
