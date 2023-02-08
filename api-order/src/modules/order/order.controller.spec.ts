import { Test, TestingModule } from '@nestjs/testing';
import { RabbitMQModule } from 'src/integration/configs/rabbitmq/rabbitmq.module';
import { RabbitMQService } from 'src/integration/configs/rabbitmq/rabbitmq.service';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

describe('OrderController', () => {
  let controller: OrderController;
  let rabbitmq: RabbitMQModule

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
      imports: [RabbitMQModule]
    }).compile();

    controller = module.get<OrderController>(OrderController);
    rabbitmq = module.get<RabbitMQModule>(RabbitMQModule);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
