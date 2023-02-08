import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { RabbitMQModule } from 'src/integration/configs/rabbitmq/rabbitmq.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), RabbitMQModule],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [TypeOrmModule]
})
export class OrderModule {}
