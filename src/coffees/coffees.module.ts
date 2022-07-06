import { TypeOrmModule } from '@nestjs/typeorm';
import { Injectable, Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from '@/events/entities/event.entity';
import { COFFEE_BRANDS } from './coffees.constants';
import { async } from 'rxjs';
import { Connection } from 'typeorm';

class MockCoffeesService {}

class ConfigService {}
class DevelopmentConfigService {}
class ProductionConfigService {}

@Injectable()
export class CoffeeBrandsFactory {
  create() {
    return ['aaa', 'bbb', 'ccc'];
  }
}

/**
 * imports    让 TypeORM 知道这个子模块本身内部的实体
 * exports    导出 service 让其他模块跨服务调用
 * useFactory 允许我们动态创建提供者
 * @date 2022-07-04
 * @param {any} {imports:[TypeOrmModule.forFeature([Coffee]
 * @returns {any}
 */
@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
  controllers: [CoffeesController],
  // providers: [CoffeesService],
  // providers: [{ provide: CoffeesService, useClass: CoffeesService }],
  // providers: [{ provide: CoffeesService, useClass: MockCoffeesService }],

  // providers: [
  //   CoffeesService,
  //   {
  //     provide: ConfigService,
  //     useClass:
  //       process.env.NODE_ENV === 'deve;opment'
  //         ? DevelopmentConfigService
  //         : ProductionConfigService,
  //   },
  //   CoffeeBrandsFactory,
  //   // 使用 useValue
  //   // { provide: COFFEE_BRANDS, useValue: ['aaaaa', 'bbbbbb'] },
  //   // 使用 useFactory
  //   // {
  //   //   provide: COFFEE_BRANDS,
  //   //   useFactory: () => ['aaa', 'bbb'],
  //   // },
  //   // 注入
  //   // {
  //   //   provide: COFFEE_BRANDS,
  //   //   useFactory: (brandsFactory: CoffeeBrandsFactory) =>
  //   //     brandsFactory.create(),
  //   //   inject: [CoffeeBrandsFactory],
  //   // },
  //   {
  //     provide: COFFEE_BRANDS,
  //     useFactory: async (connection: Connection): Promise<string[]> => {
  //       const coffeeBrands = await Promise.resolve(['异步执行']);
  //       return coffeeBrands;
  //     },
  //     inject: [CoffeeBrandsFactory],
  //   },
  // ],

  providers: [
    CoffeesService,
    { provide: COFFEE_BRANDS, useFactory: () => ['aaa', 'bbb'] },
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}
