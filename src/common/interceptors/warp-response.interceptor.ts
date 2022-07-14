import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
interface Response<T> {
  data: T;
}
@Injectable()
export class WarpResponseInterceptor<T extends Response<T>>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T>> {
    if (context.switchToHttp().getRequest().url === '/status') {
      return next.handle().pipe(
        map((data) => {
          return data;
        }),
      );
    }
    return next.handle().pipe(
      map((data) => {
        return {
          data,
          code: 200,
          message: '请求成功',
        };
      }),
    );
  }
}
