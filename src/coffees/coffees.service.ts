import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Event } from '../events/entities/event.entity';
import { COFFEE_BRANDS } from './coffees.constants';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeEntityRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
    private readonly connection: Connection,
    @Inject(COFFEE_BRANDS) coffeeBrands: string[],
  ) {
    console.log(coffeeBrands);
  }

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.coffeeEntityRepository.find({
      relations: ['flavors'],
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: any) {
    const coffee: Coffee = await this.coffeeEntityRepository.findOne({
      where: { id: id },
      relations: ['flavors'],
    });
    if (!coffee) {
      return new NotFoundException(`${id}不存在`);
    }
    return coffee;
  }

  async create(createCoffeeDto: CreateCoffeeDto) {
    const flavors = await Promise.all(
      createCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name)),
    );
    const coffee = this.coffeeEntityRepository.create({
      ...createCoffeeDto,
      flavors,
    });
    return this.coffeeEntityRepository.save(coffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const flavors =
      updateCoffeeDto.flavors &&
      (await Promise.all(
        updateCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name)),
      ));
    const coffee = await this.coffeeEntityRepository.preload({
      id: +id,
      ...updateCoffeeDto,
      flavors,
    });
    if (!coffee) {
      throw new Error('Method not implemented.');
    }
    return this.coffeeEntityRepository.save(coffee);
  }

  async remove(id: string) {
    const coffee = (await this.findOne(id)) as Coffee;
    return this.coffeeEntityRepository.remove(coffee);
  }

  /**
   * 简历数据库连接
   * @date 2022-07-05
   * @param {any} coffee:Coffee
   * @returns {any}
   */
  async recommendCoffee(coffee: Coffee) {
    // 获取连接并创建新的queryRunner
    const queryRunner = this.connection.createQueryRunner();
    // 使用我们的新queryRunner建立真正的数据库连
    await queryRunner.connect();
    // 开始事务：
    await queryRunner.startTransaction();
    try {
      coffee.recommentdations++;

      const recommendEvent = new Event();
      recommendEvent.name = 'recommend_coffee';
      recommendEvent.payload = { coffeeId: coffee.id };
      await queryRunner.manager.save(coffee);
      await queryRunner.manager.save(recommendEvent);

      await queryRunner.commitTransaction();
    } catch (error) {
      // 有错误做出回滚更改
      await queryRunner.rollbackTransaction();
      return new Error('回滚' + error);
    } finally {
      await queryRunner.release();
    }
  }

  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const existingFlavor = await this.flavorRepository.findOne({
      where: { name },
    });
    if (existingFlavor) {
      return existingFlavor;
    }
    return this.flavorRepository.create({ name });
  }
}
