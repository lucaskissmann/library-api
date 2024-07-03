import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorModule } from './modules/author/author.module';
import { Author } from './modules/author/entities/author.entity';
import { BookModule } from './modules/book/book.module';
import { Book } from './modules/book/entities/book.entity';
import { Rental } from './modules/rental/entities/rental.entity';
import { Renter } from './modules/renter/entities/renter.entity';
import { RentalModule } from './modules/rental/rental.module';
import { RenterModule } from './modules/renter/renter.module';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: "localhost",
      port: 3306,
      username: "root",
      password: "root",
      database: "library_api",
      entities: [Author, Book, Rental, Renter],
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthorModule,
    BookModule,
    RentalModule,
    RenterModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
