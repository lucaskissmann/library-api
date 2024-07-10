import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';
import { Author } from './modules/author/entities/author.entity';
import { Book } from './modules/book/entities/book.entity';
import { Rental } from './modules/rental/entities/rental.entity';
import { Renter } from './modules/renter/entities/renter.entity';

dotenv.config({ path: join(__dirname, '../../.env') });

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: "localhost",
  port: 3307,
  username: "root",
  password: "root",
  database: "library_api",
  entities: [
    Author,
    Book,
    Rental,
    Renter,
  ],
  synchronize: true,
};

const AppDataSource = new DataSource(dataSourceOptions);

export default AppDataSource;
