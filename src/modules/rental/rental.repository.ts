import { In, Repository } from 'typeorm';
import { Rental } from './entities/rental.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { RentalDto } from './dtos/rental.dto';
import { NotFoundException } from '@nestjs/common';
import { BookState } from '../book/enums/book.enum';

export class RentalRepository extends Repository<Rental> {
  constructor(
    @InjectRepository(Rental)
    private rentalRepository: Repository<Rental>,
  ) {
    super(
      rentalRepository.target,
      rentalRepository.manager,
      rentalRepository.queryRunner,
    );
  }

  async getAllRentals(): Promise<RentalDto[]> {
    const rentals = await this.rentalRepository.find({
      relations: ['renter', 'books'],
    });
    return rentals.map(rental => plainToClass(RentalDto, rental));
  }

  async getRentalById(id: number): Promise<RentalDto> {
    const rentalData = await this.rentalRepository.findOne({
      where: { id },
      relations: ['renter', 'books'] 
    });

    if (!rentalData) {
      throw new NotFoundException(`Não existe um aluguel cadastrado para o ID: #${id}`);
    }

    return plainToClass(RentalDto, rentalData);
  }

  async getRentalsByRenterIdAndBooks(renterId: number, booksIds: number[]): Promise<RentalDto[]> {
    const rentals = await this.rentalRepository.find({
      where: { 
        renter: { id: renterId },
        books: { 
          id: In(booksIds),
        },
        isReturned: false,
        
      },
      relations: ['renter', 'books'],
    });

    if(rentals.length === 0) {
      throw new NotFoundException(`Não foi encontrado nenhum aluguel entre o locatário e os livros informados`);
    }

    return plainToClass(RentalDto, rentals);
  }

  async createRental(rentalRegister: Rental) {
    const rentalData = await this.rentalRepository.save(rentalRegister);
    return rentalData;
  }

  async updateRental(rental: RentalDto) {
    const rentalData = await this.rentalRepository.save(rental);
    return rentalData;
  }
}