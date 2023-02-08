import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { StockService } from './stock.service';


@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @MessagePattern("order")
  public async execute(@Payload() message: JSON, @Ctx() context: RmqContext) {
    return this.stockService.sortActionStock(message);
  }
}
