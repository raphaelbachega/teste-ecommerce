import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { redisConfig } from './integration/redis/redis.provider';
import { StockModule } from './stock/stock.module';


@Module({
  imports: [CacheModule.register(redisConfig),StockModule,
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:'.env'
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
