import { PartialType } from '@nestjs/swagger';
import { CreateCoffeeDto } from './create-coffee.dto';

/**
 * PartialType  标记所有属性都是可选的
 * @date 2022-07-04
 * @param {any} CreateCoffeeDto
 * @returns {any}
 */
export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) {}
