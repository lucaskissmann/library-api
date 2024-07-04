import { Repository } from 'typeorm';
import { Renter } from './entities/renter.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class RenterRepository extends Repository<Renter> {
  constructor(
    @InjectRepository(Renter)
    private renterRepository: Repository<Renter>,
  ) {
    super(
      renterRepository.target,
      renterRepository.manager,
      renterRepository.queryRunner,
    );
  }

  async getAllRenters() {
    const renterData = await this.renterRepository.find();
    return renterData;
  }

  async getRenterById(id: number) {
    const renterData = await this.renterRepository.findOne({
      where: { id },
    });
    return renterData;
  }

  async createRenter(renterRegister: Renter) {
    const renterData = await this.renterRepository.save(renterRegister);
    return renterData;
  }

  async updateRenter(renter: Renter) {
    const renterData = await this.renterRepository.save(renter);
    return renterData;
  }
}