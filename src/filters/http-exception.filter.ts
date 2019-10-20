import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

interface ResponseBody {
  code: number;
  status: string;
  message: string;
  messages?: string;
}
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
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

    if (status === HttpStatus.BAD_REQUEST) {
      responseBody = {
        ...responseBody,
        messages: exception.message.message,
      };
    }

    response.status(status).json(responseBody);
  }
}
