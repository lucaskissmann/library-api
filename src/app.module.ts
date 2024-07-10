import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorModule } from './modules/author/author.module';
import { BookModule } from './modules/book/book.module';
import { RentalModule } from './modules/rental/rental.module';
import { RenterModule } from './modules/renter/renter.module';
import { APP_PIPE } from '@nestjs/core';
import { dataSourceOptions } from './ormconfig';

const ormModule = TypeOrmModule.forRoot(dataSourceOptions);

@Module({
  imports: [
    ormModule,
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
