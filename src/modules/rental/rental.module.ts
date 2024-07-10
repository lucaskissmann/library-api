import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentalService } from './rental.service';
import { RentalController } from './rental.controller';
import { Rental } from './entities/rental.entity';
import { RentalRepository } from './rental.repository';
import { RenterModule } from '../renter/renter.module';
import { BookModule } from '../book/book.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rental]),
    forwardRef(() => RenterModule),
    forwardRef(() => BookModule),
  ],
  controllers: [RentalController],
  providers: [RentalService, RentalRepository],
  exports: [RentalService]
})
export class RentalModule {}