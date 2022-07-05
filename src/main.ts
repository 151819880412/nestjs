import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

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
    }),
  );
  await app.listen(8087);
}
bootstrap();
