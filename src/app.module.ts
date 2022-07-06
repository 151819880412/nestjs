import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeRatingsModule } from './coffee-ratings/coffee-ratings.module';
import { CoffeeRatingService } from './coffee-rating/coffee-rating.service';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    CoffeesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pass123',
      // 数据库名称
      database: 'postgres',
      // 自动加载模块
      autoLoadEntities: true,
      // 实体每次运行程序时都会和数据库同步。生产中需要关闭
      synchronize: true,
    }),
    CoffeeRatingsModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService, CoffeeRatingService],
})
export class AppModule {}
