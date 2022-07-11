import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

/**
 * HttpException  请求拦截器
 * switchToHttp  可以访问请求对象和响应对象
 * @date 2022-07-08
 * @param {any} HttpException
 * @returns {any}
 */
@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    const error =
      typeof response === 'string'
        ? { message: exceptionResponse }
        : // eslint-disable-next-line @typescript-eslint/ban-types
          (exceptionResponse as Object);
    response.status(status).json({
      ...error,
      timestamp: new Date().toISOString(),
    });
  }
}
