import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.time('start');
    console.log('中间件调用');
    res.on('finish', () => console.timeEnd('start'));
    next();
  }
}
