import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({ path: join(__dirname, '../../.env') });

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: "localhost",
  port: 3307,
  username: "root",
  password: "root",
  database: "library_api",
  entities: [join(__dirname, '../**', '*.entity.{ts,js}')],
  synchronize: true,
};

const AppDataSource = new DataSource(dataSourceOptions);

export default AppDataSource;
