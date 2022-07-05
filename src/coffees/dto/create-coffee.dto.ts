import { IsString } from 'class-validator';
export class CreateCoffeeDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly brand: string;

  /**
   * {each:true} 表示期望值是一个字符串数组
   * @date 2022-06-25
   * @param {any} {each:true}
   * @returns {any}
   */
  @IsString({ each: true })
  readonly flavors: string[];
}
