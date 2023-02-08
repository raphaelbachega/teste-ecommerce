import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService)

  const queue = configService.get<string>('RABBITMQ_QUEUE')
  const user = configService.get<string>('RABBITMQ_USER')
  const pass = configService.get<string>('RABBITMQ_PASS')
  const host = configService.get<string>('RABBITMQ_HOST')

  const port = configService.get<number>('PORT')
  const appUrl = configService.get<string>('APP_URL')
  const nodeEnv = configService.get<string>('NODE_ENV')

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${user}:${pass}@${host}`],
      queue: queue,
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.startAllMicroservices();

  await app.listen(3001,()=>{
    Logger.log(
      `\n======================================\n` +
      `🏆 * Server started on: ${appUrl}:${port} * 🏆`   +
      `\n======================================\n` +
      `RUNNING IN MODE: ${nodeEnv}`)
  });
}
bootstrap();
