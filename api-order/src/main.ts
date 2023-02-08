import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService)

  const port = configService.get<number>('PORT')
  const appUrl = configService.get<string>('APP_URL')
  const nodeEnv = configService.get<string>('NODE_ENV')


  const config = new DocumentBuilder()
    .setTitle('Order example')
    .setDescription('api-order project')
    .setVersion('1.0')
    .setContact('Raphael Bachega','https://github.com/raphaelbachega','bachegamessias@gmail.com')
    .setLicense('MIT','https://opensource.org/licenses/MIT')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port,()=>{
    Logger.log(
      `\n======================================\n` +
      `🏆 * Server started on: ${appUrl}:${port} * 🏆`   +
      `\n======================================\n` +
      `RUNNING IN MODE: ${nodeEnv}`)
  });
}
bootstrap();
