import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { RabbitMQModule } from './integration/configs/rabbitmq/rabbitmq.module';
import { typeOrmConfig } from './integration/configs/typeorm/typeorm.config';
import { OrderModule } from './modules/order/order.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig),
    OrderModule,
    RabbitMQModule,
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:'.env'
    })
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource){}
}
