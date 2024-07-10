import { Repository } from 'typeorm';
import { Renter } from './entities/renter.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { RenterDto } from './dtos/renter.dto';
import { plainToClass } from 'class-transformer';
import { CreateRenterDto } from './dtos/create-renter.dto';
import { UpdateRenterDto } from './dtos/update-renter.dto';

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

  async getAllRenters(): Promise<RenterDto[]> {
    const renters = await this.renterRepository.find();
    return renters.map(renter => plainToClass(RenterDto, renter));
  }

  async getRenterById(id: number): Promise<RenterDto> {
    const renterData = await this.renterRepository.findOne({
      where: { id },
    });

    if (!renterData) {
      throw new NotFoundException(`Não existe um locatário cadastrado para o ID: #${id}`);
    }

    return plainToClass(RenterDto, renterData);
  }

  async createRenter(createRenterDto: CreateRenterDto): Promise<RenterDto> {
    const renterEntity = this.renterRepository.create(createRenterDto);
    const renterData = await this.renterRepository.save(renterEntity);
    return plainToClass(RenterDto, renterData);
  }

  async updateRenter(updateRenterDto: UpdateRenterDto) {
    const renterData = await this.renterRepository.save(updateRenterDto);
    return plainToClass(RenterDto, renterData);
  }
}