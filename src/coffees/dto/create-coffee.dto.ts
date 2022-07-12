import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class CreateCoffeeDto {
  @ApiProperty({ description: '默认值' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: '默认值' })
  @IsString()
  readonly brand: string;

  /**
   * {each:true} 表示期望值是一个字符串数组
   * @date 2022-06-25
   * @param {any} {each:true}
   * @returns {any}
   */
  @ApiProperty({ example: [] })
  @IsString({ each: true })
  readonly flavors: string[];
}
