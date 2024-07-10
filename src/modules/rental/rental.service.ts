import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Rental } from './entities/rental.entity';
import { RentalRepository } from './rental.repository';
import { CreateRentalDto } from './dtos/create-rental.dto';
import { RentalDto } from './dtos/rental.dto';
import { RenterService } from '../renter/renter.service';
import { BookService } from '../book/book.service';
import { plainToClass } from 'class-transformer';
import { BookDto } from '../book/dtos/book.dto';
import { BookState } from '../book/enums/book.enum';

@Injectable()
export class RentalService {
  constructor(
    private readonly rentalRepository: RentalRepository,

    @Inject(forwardRef(() => RenterService))
    private readonly renterService: RenterService,
    
    @Inject(forwardRef(() => BookService))
    private readonly bookService: BookService,
  ) {}

  async findAll(): Promise<RentalDto[]> {
    return await this.rentalRepository.getAllRentals();
  }

  async findOne(id: number): Promise<RentalDto> {
    return await this.rentalRepository.getRentalById(id);
  }

  async create(createRentalDto: CreateRentalDto): Promise<RentalDto> {
    if(!createRentalDto.rentalDate) {
      createRentalDto.rentalDate = new Date();
    }

    if(createRentalDto.returnDate) {
      await this.validateDates(createRentalDto.rentalDate, createRentalDto.returnDate);
    } else {
      createRentalDto.returnDate = new Date();
      createRentalDto.returnDate.setDate(createRentalDto.rentalDate.getDate() + 2);
    }

    const renter = await this.renterService.findOne(createRentalDto.renterId);
    const books = await this.bookService.findByIds(createRentalDto.bookIds);
    if (books.length !== createRentalDto.bookIds.length) {
      throw new NotFoundException('Um ou mais livros não foram encontrados');
    }

    await this.validateBooksAvailability(books);

    await this.bookService.updateBooksState(books);

    const rental = this.rentalRepository.create({
      rentalDate: createRentalDto.rentalDate,
      returnDate: createRentalDto.returnDate,
      renter,
      books,
    });
    
    const savedRental = await this.rentalRepository.save(rental);

    return plainToClass(RentalDto, savedRental);
  }

  async returnBooks(rentalId: number): Promise<RentalDto>  {
    const rental = await this.rentalRepository.getRentalById(rentalId);

    for(const book of rental.books) {
      book.state = BookState.AVAILABLE;
      await this.bookService.updateEntity(book);
    }

    rental.isReturned = true;
    await this.rentalRepository.updateRental(rental)

    return plainToClass(RentalDto, rental);
  }

  async validateDates(rentalDate: Date, returnDate: Date): Promise<void> {
    if (returnDate < rentalDate) {
      throw new NotFoundException('A data de devolução não pode ser menor que a data de locação');
    }
  }

  async validateBooksAvailability(books: BookDto[]) {
    const unavailableBooks = books.filter(book => book.state === BookState.UNAVAILABLE);

    if (unavailableBooks.length > 0) {
      const unavailableBookIds = unavailableBooks.map(book => `${book.title} (${book.id})`).join(', ');
      throw new BadRequestException(`Os seguintes livros já estão alugados: ${unavailableBookIds}`);
    }
  }

  async hasBooksToReturn(renterId: number): Promise<boolean> {
    const rentals = await this.rentalRepository.find({
      where: {
        renter: { id: renterId },
      },
    });

    return rentals.length > 0;
  }
}
