import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Renter } from './entities/renter.entity';
import { RenterRepository } from './renter.repository';

@Injectable()
export class RenterService {
  constructor(
    @InjectRepository(Renter)
    private readonly renterRepository: RenterRepository
  ) {}

  findAll(): Promise<Renter[]> {
    return this.renterRepository.find();
  }

  findOne(id: number): Promise<Renter> {
    return this.renterRepository.findOneBy({ id });
  }

  create(renter: Renter): Promise<Renter> {
    return this.renterRepository.save(renter);
  }

  async update(id: number, renter: Renter): Promise<void> {
    await this.renterRepository.update(id, renter);
  }

  async remove(id: number): Promise<void> {
    await this.renterRepository.delete(id);
  }
}
