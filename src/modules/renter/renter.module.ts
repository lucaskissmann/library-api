import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RenterService } from './renter.service';
import { RenterController } from './renter.controller';
import { Renter } from './entities/renter.entity';
import { RenterRepository } from './renter.repository';
import { IsValidCPF } from 'src/v1/validators/isValidCpf.constraint';
import { RentalModule } from '../rental/rental.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Renter]),
    forwardRef(() => RentalModule) 
  ],
  controllers: [RenterController],
  providers: [RenterService, RenterRepository, IsValidCPF],
  exports: [RenterService],
})
export class RenterModule {}
