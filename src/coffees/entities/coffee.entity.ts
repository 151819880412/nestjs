import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavor } from '@/coffees/entities/flavor.entity';

/**
 * PrimaryGeneratedColumn 主键
 * nullable   可以为空
 * @Entity()  表示 TypeScript 类和数据库表之间的关系
 * @date 2022-06-28
 * @returns {any}
 */
@Entity()
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  // @Column('json', { nullable: true })
  // flavors: string[];

  @JoinTable()
  @ManyToMany((type) => Flavor, (flavor) => flavor.coffees, { cascade: true })
  flavors: Flavor[];

  @Column({ default: 0 })
  recommentdations: number;
}
