import { CacheModule } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { redisStore } from "cache-manager-redis-store";

const configService = new ConfigService;
const host = configService.get<string>('REDIS_HOST')
const port = configService.get<number>('REDIS_PORT')


export const redisConfig: CacheModule = {
    isGlobal: true,
    store: redisStore,
    host: 'cache',
    port: port,
};