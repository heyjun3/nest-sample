import { DataSource, DataSourceOptions } from 'typeorm';
import { CustomLogger } from './customLogger';

export const datasourceConfig: DataSourceOptions = {
  type: 'postgres',
  host: '127.0.0.1',
  port: 5433,
  username: 'postgres',
  password: 'postgres',
  database: 'sample',
  entities: ['src/**/*.model.ts'],
  migrations: ['src/migrations/*.ts'],
  logger: new CustomLogger(true),
  logging: 'all',
  maxQueryExecutionTime: -1,
};

export default new DataSource(datasourceConfig);
