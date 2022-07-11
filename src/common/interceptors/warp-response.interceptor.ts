import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

/**
 * 拦截器
 * 所有拦截器都应该实现从 @nestjs/common 导出的 NestInterceptor 接口
 * tap:他在 Observable 流正常终止时调用匿名日志记录函数(不会干扰响应周期)
 * @date 2022-07-11
 * @returns {any}
 */
@Injectable()
export class WarpResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('之前');
    // data 是通过 @Public() 验证之后传入的数据
    // return next.handle().pipe(tap((data) => console.log('之后', data)));
    return next.handle().pipe(map((data) => ({ data })));
  }
}
