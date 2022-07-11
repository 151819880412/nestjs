import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeRatingsModule } from './coffee-ratings/coffee-ratings.module';
import { CoffeeRatingService } from './coffee-rating/coffee-rating.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import appConfig from './config/app.config';
import { APP_PIPE } from '@nestjs/core';

/**
 * ConfigModule  允许我们使用嵌套对象定义和加载多个自定义配置文件，并通过 ConfigService 访问这些变量
 * TypeOrmModule 数据库 orm 连接对象  正常哟放在 ConfigModule 下面否则会报错。除非使用 useFactory:()=>({})
 * @date 2022-07-08
 */
@Module({
  imports: [
    // ConfigModule.forRoot({
    //   // envFilePath: '.enviroment', // 寻找 .enviroment 的文件 可以指定多个文件
    //   // 禁用 .env 文件  再生产中禁用
    //   ignoreEnvFile: false,
    //   // hapi/joi 验证
    //   validationSchema: Joi.object({
    //     DATABASE_HOST: Joi.required(),
    //     DATABASE_PORT: Joi.number().default(5432),
    //   }),
    // }),
    // 全局配置
    ConfigModule.forRoot({
      load: [appConfig],
    }),
    CoffeesModule,
    TypeOrmModule.forRoot({
      // useFactory:()=>({})
      type: 'postgres',
      // host: 'localhost',
      // port: 5432,
      // username: 'postgres',
      // password: 'pass123',
      // // 数据库名称
      // database: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      // 自动加载模块
      autoLoadEntities: true,
      // 实体每次运行程序时都会和数据库同步。生产中需要关闭
      synchronize: true,
    }),
    CoffeeRatingsModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    CoffeeRatingService,
    // { provide: APP_PIPE, useClass: ValidationPipe },  // 注册为全局的
  ],
})
export class AppModule {}
