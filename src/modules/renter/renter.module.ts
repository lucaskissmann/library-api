import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RenterService } from './renter.service';
import { RenterController } from './renter.controller';
import { Renter } from './entities/renter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Renter])],
  providers: [RenterService],
  controllers: [RenterController],
})
export class RenterModule {}
