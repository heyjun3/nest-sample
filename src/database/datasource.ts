import { DataSource, DataSourceOptions } from 'typeorm';
import { CustomLogger } from './customLogger';

export const datasourceConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'postgres',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'sample',
  entities: ['src/**/*.model.ts'],
  migrations: ['src/migrations/*.ts'],
  logger: new CustomLogger(true),
};

export default new DataSource(datasourceConfig);
