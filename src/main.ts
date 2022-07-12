import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { WarpResponseInterceptor } from './common/interceptors/warp-response.interceptor';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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
  // 依赖其他类的全局守卫必须在 @Module 上下文中注册
  // app.useGlobalGuards(new ApiKeyGuard());
  app.useGlobalInterceptors(
    new WarpResponseInterceptor(),
    new TimeoutInterceptor(),
  );
  app.useGlobalFilters(new HttpExceptionFilter());

  const options = new DocumentBuilder()
    .setTitle('标题')
    .setDescription('Coffee application')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  // 挂载
  SwaggerModule.setup('api', app, document);

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
