import { ConflictException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { RenterRepository } from './renter.repository';
import { CreateRenterDto } from './dtos/create-renter.dto';
import { RenterDto } from './dtos/renter.dto';
import { UpdateRenterDto } from './dtos/update-renter.dto';
import { RentalService } from '../rental/rental.service';

@Injectable()
export class RenterService {
  constructor(
    private readonly renterRepository: RenterRepository,

    @Inject(forwardRef(() => RentalService))
    private readonly rentalService: RentalService,
  ) {}

  async findAll(): Promise<RenterDto[]> {
    return await this.renterRepository.getAllRenters();
  }

  async findOne(id: number): Promise<RenterDto> {
    return await this.renterRepository.getRenterById(id);
  }

  async create(createRenterDto: CreateRenterDto): Promise<RenterDto> {
    createRenterDto.cpf = this.format(createRenterDto.cpf);
    createRenterDto.phone = this.format(createRenterDto.phone);

    await this.validateCpf(createRenterDto.cpf);
    await this.validateEmail(createRenterDto.email);

    return this.renterRepository.save(createRenterDto);
  }

  async update(id: number, updateRenterDto: UpdateRenterDto): Promise<RenterDto> {
    const renter = await this.renterRepository.getRenterById(id);

    if(updateRenterDto.cpf) {
      updateRenterDto.cpf = this.format(updateRenterDto.cpf);
      
      await this.validateCpf(updateRenterDto.cpf);
    }

    if(updateRenterDto.phone) {
      updateRenterDto.phone = this.format(updateRenterDto.phone);
    }

    if(updateRenterDto.email) {
      await this.validateEmail(updateRenterDto.email);
    }

    const updatedRenter = Object.assign(renter, updateRenterDto);

    return await this.renterRepository.updateRenter(updatedRenter);
  }

  async remove(id: number): Promise<void> {
    const renter = await this.renterRepository.getRenterById(id);

    if( await this.rentalService.hasBooksToReturn(id)) {
      throw new ConflictException(`O locatário '${renter.name}' possui um ou mais livros alugados e não pode ser excluído.`);
    }

    await this.renterRepository.delete(id);
  }

  async validateCpf(cpf: string): Promise<void> {
    const renter = await this.renterRepository.findOne({ where: { cpf } });
    if (renter) {
      throw new ConflictException(`Já existe um locatário cadastrado para o CPF '${cpf}'`);
    }
  }

  async validateEmail(email: string): Promise<void> {
    const renter = await this.renterRepository.findOne({ where: { email } });
    if (renter) {
      throw new ConflictException(`Já existe um locatário cadastrado para o email '${email}'`);
    }
  }

  private format(phone: string): string {
    return phone.replace(/[^\d]/g, '');
  }
}
