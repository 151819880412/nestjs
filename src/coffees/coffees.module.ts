import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

/**
 * imports    让 TypeORM 知道这个子模块本身内部的实体
 * @date 2022-07-04
 * @param {any} {imports:[TypeOrmModule.forFeature([Coffee]
 * @returns {any}
 */
@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor])],
  controllers: [CoffeesController],
  providers: [CoffeesService],
})
export class CoffeesModule {}
