import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ApiKeyGuard } from './common/guards/api-key.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // 设置白名单
      whitelist: true,
      // 任何非白名单属性都会报错
      forbidNonWhitelisted: true,
      //  将传入的数据格式转换为我们定义的类型(比如get请求占位符id是number但是经过网络传输会自动转为string)
      transform: true,
      transformOptions: {
        // 隐式类型转换
        enableImplicitConversion: true,
      },
    }),
  );
  app.useGlobalGuards(new ApiKeyGuard());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(8087);
}
bootstrap();

/**
 * 全局异常
 * @date 2022-07-08
 * @param {any} 'unhandledRejection'
 * @param {any} (reason
 * @param {any} promise
 * @returns {any}
 */
process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at: Promise', promise, 'reason:', reason);
});
