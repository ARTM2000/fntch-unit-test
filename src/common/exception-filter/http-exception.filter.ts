import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const serviceResponse = exception.getResponse() as {
      statusCode: number;
      message: string | string[];
      error?: string;
    };

    console.log(serviceResponse);

    return response.status(status).json({
      message:
        serviceResponse && typeof serviceResponse === 'string'
          ? serviceResponse
          : Array.isArray(serviceResponse.message)
          ? serviceResponse.message[0]
          : serviceResponse.message,
      data: {},
    });
  }
}
