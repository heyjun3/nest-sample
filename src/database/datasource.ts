import { DataSource, DataSourceOptions } from 'typeorm';
import { CustomLogger } from './customLogger';

export const datasourceConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'postgres',
  database: 'sample',
  entities: ['src/**/*.model.ts'],
  migrations: ['src/migrations/*.ts'],
  // logger: 'simple-console',
  // logger: 'debug',
  logger: new CustomLogger(true),
};

export default new DataSource(datasourceConfig);
