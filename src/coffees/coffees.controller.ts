import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  SetMetadata,
  UsePipes,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { ValidationPipe } from '@nestjs/common';
import { Public } from '@/common/decorators/public.decorator';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';

// @UsePipes(ValidationPipe)    所有方法
@Controller('coffees')
export class CoffeesController {
  constructor(
    private readonly coffeesService: CoffeesService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  // @UsePipes(ValidationPipe)   单个方法
  // @SetMetadata('isPublic', true)  相当于 @Public()   可以不需要 token 不进行操作
  @Public()
  @Get()
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    await new Promise((res) => setTimeout(res, 5000));
    return this.coffeesService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.coffeesService.findOne(id);
  }

  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    // false 虽然格式一样但是不是 CreateCoffeeDto 的实例。需要启用ValidationPipe 的 transform:true
    console.log(createCoffeeDto instanceof CreateCoffeeDto);
    return this.coffeesService.create(createCoffeeDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateCoffeeDto: UpdateCoffeeDto,
  ) {
    return this.coffeesService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  d(@Param('id') id: string) {
    return this.coffeesService.remove(id);
  }

  @Get()
  c(@Query() paginationQuery) {
    const { limit, offset } = paginationQuery;
    return limit + offset;
  }
}
