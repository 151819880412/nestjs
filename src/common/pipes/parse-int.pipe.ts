import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

/**
 * 学习管道
 * 管道不用注册，可以直接调用
 * 作用:1.处理传入的参数  2.提供默认值
 * 所有管道都要实现 PipeTransform 接口
 * value:方法传入的值
 * metadata:元数据
 * @date 2022-07-11
 * @returns {any}
 */
@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(value, typeof value);
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('参数错误' + val);
    }
    return value;
  }
}
