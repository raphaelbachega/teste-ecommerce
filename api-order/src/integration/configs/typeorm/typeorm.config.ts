import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const configService = new ConfigService;
const host = configService.get<string>('POSTGRES_HOST')
const port = configService.get<number>('POSTGRES_PORT')
const userName = configService.get<string>('POSTGRES_USERNAME')
const password = configService.get<string>('POSTGRES_PASSWORD')
const database = configService.get<string>('POSTGRES_DATABASE')

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'db',
  port: port,
  username: 'postgres',
  password: 'postgres',
  database: database,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
  autoLoadEntities: true,
};