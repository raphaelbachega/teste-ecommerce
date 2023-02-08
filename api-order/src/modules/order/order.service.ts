import { GoneException, Injectable, NotAcceptableException, NotFoundException, PreconditionFailedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RabbitMQService } from 'src/integration/configs/rabbitmq/rabbitmq.service';
import { EOrder } from 'src/shared/enum/order.enum';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';


@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly rabbitMQService: RabbitMQService
  ) { }

  async create(createOrderDto: CreateOrderDto) {
    try {

      const newOrder = await this.orderRepository.save(createOrderDto);

      await this.sendOrderQueue(newOrder, EOrder.NEW_ORDER)

      return newOrder

    } catch (error) {

      throw new NotAcceptableException(`Order is not correct`);
    
    }
    
  }

  findAll() {
    return this.orderRepository.find();
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<UpdateOrderDto> {
    const orderUpdate = await this.orderRepository.findOneBy({ id: id });

    if (!orderUpdate) {
      throw new NotFoundException(`ORDER ${id} NOT FOUND`);
    }
    if(orderUpdate.isActive == false){
      throw new GoneException(`ORDER ${id} IS ALREADY CANCELED`);
    }

    await this.orderRepository.update(id, updateOrderDto);

    const orderUpdateResult:UpdateOrderDto = await this.orderRepository.findOneBy({ id: id });

    
    return orderUpdateResult;

  }

  async cancelOrder(id: number) {
    let orderCanceled = await this.orderRepository.findOneBy({ id: id });
    if (!orderCanceled) {
      throw new NotFoundException(`Order ${id} NOT FOUND`);
    }
    if (!orderCanceled.isActive) {
      throw new GoneException(`Order ${id} IS ALREADY CANCELED`);
    }
    orderCanceled = { ...orderCanceled, isActive: false }

    const orderCanceledResult = await this.orderRepository.save(orderCanceled);

    await this.sendOrderQueue(orderCanceledResult, EOrder.CANCEL_ORDER)

    return orderCanceledResult
  }

  async remove(id: number) {
    const orderRemove = await this.orderRepository.findOneBy({ id: id });
    try {

      await this.orderRepository.remove(orderRemove)


    } catch (error) {

      throw new NotFoundException(`Order ${id} NOT FOUND`);

    }
  }

  // For api consume
  async getByid(orderId: string) {
    const orders = await this.orderRepository.find({ where: { orderId }, order: { createdAt: 'DESC' } });
    if (!orders.length) {
      throw new NotFoundException(`Order ${orderId} NOT FOUND`);
    }
    return orders;
  }

  async sendOrderQueue(data: Order, status: string) {
    let message = {
      id: data.id,
      customer: data.customer,
      orderId: data.orderId,
      status,
      itemList: data.itemList,
      isActive: data.isActive,
      price: data.price,
  }
    return this.rabbitMQService.send(EOrder.ORDER, { message });
  }
}
