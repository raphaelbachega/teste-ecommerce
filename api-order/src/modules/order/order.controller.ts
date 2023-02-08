import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    ) {}

  @Post('createOrder')
  @ApiResponse({description:'Order create succefull',status:201})
  @ApiResponse({description:'Order create failed',status:406})
  async create(@Body() createOrderDto: CreateOrderDto) {
    return await this.orderService.create(createOrderDto);
  }

  @Get('listOrder')
  findAll() {
    return this.orderService.findAll();
  }

  // @Get(':orderId')
  // async findOne(@Param('orderId') orderId: string) {
  //   return await this.orderService.getByid(orderId);
  // }

  @Patch('cancelOrder/:id')
  @ApiResponse({description:'Order canceled',status:200})
  @ApiResponse({description:'Order Gone',status:410})
  async cancelOrder(@Param('id') id: string) {
    return await this.orderService.cancelOrder(+id);
  }

  @Patch('updateOrder/:id')
  @ApiResponse({description:'Order updated',status:200})
  @ApiResponse({description:'Order not found',status:404})
  @ApiResponse({description:'Order gone updated',status:410})
  async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return await this.orderService.update(+id, updateOrderDto);
  }

  @Delete('orderDelete/:id')
  async remove(@Param('id') id: string) {
    return await this.orderService.remove(+id);
  }



  
}
