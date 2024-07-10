import { BadRequestException, ConflictException, forwardRef, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BookRepository } from './book.repository';
import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';
import { plainToClass } from 'class-transformer';
import { BookDto } from './dtos/book.dto';
import { AuthorService } from '../author/author.service';
import { In } from 'typeorm';
import { Book } from './entities/book.entity';
import { RentalService } from '../rental/rental.service';
import { BookState } from './enums/book.enum';

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: BookRepository,
    private readonly authorService: AuthorService,
    
    @Inject(forwardRef(() => RentalService))
    private readonly rentalService: RentalService,
  ) {}

  async findAll(state?: number): Promise<BookDto[]> {
    if(state) {
      await this.validateState(state);

      return await this.bookRepository.getBooksByState(state);
    }
    return await this.bookRepository.getAllBooks();
  }

  async findOne(id: number): Promise<BookDto> {
    return await this.bookRepository.getBookById(id);
  }

  async findByIds(ids: number[]): Promise<BookDto[]> {
    const books = await this.bookRepository.findBy({ id: In(ids) })

    return plainToClass(BookDto, books);
  }

  async create(createBookDto: CreateBookDto): Promise<BookDto> {
    createBookDto.isbn = createBookDto.isbn.replace(/[^\d]+/g, '');

    await this.validateISBN(createBookDto.isbn);

    const { authorsIds, ...bookData } = createBookDto;

    const authors = await this.authorService.findByIds(createBookDto.authorsIds);

    if (authors.length !== authorsIds.length) {
      throw new NotFoundException('Um ou mais autores não foram encontrados');
    }

    const bookEntity = this.bookRepository.create({
      ...bookData,
      authors,
    });

    const savedBook = await this.bookRepository.save(bookEntity);
    return plainToClass(BookDto, savedBook);
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<BookDto> {
    const book = await this.bookRepository.getBookById(id);

    if(updateBookDto.isbn) {
      updateBookDto.isbn = updateBookDto.isbn.replace(/[^\d]+/g, '');

      await this.validateISBN(updateBookDto.isbn, id);
    }

    const updatedBook = Object.assign(book, updateBookDto);

    return await this.bookRepository.updateBook(updatedBook);
  }

  async updateEntity(book: Book) {
    this.bookRepository.save(book);
  }

  async remove(id: number): Promise<void> {
    const book = await this.bookRepository.getBookById(id);

    if(this.isBookRented(id)) {
      throw new ConflictException(`O livro '${book.title}' está alugado e não pode ser excluído.`);
    }

    await this.bookRepository.delete(id);
  }

  async validateISBN(isbn: string, id?: number): Promise<void> {
    const book = await this.bookRepository.findOne({ where: { isbn } });
    if (book && id && book.id != id) {
      throw new ConflictException(`O ISBN ${isbn} já está cadastrado para o livro ${book.title}`);
    }
  } 

  async validateState(state: number): Promise<void> {
    if(state != 0 && state != 1) {
      throw new HttpException(`O status ${state} é inválido. Deve ser 0 (disponível) ou 1 (indisponível)`, HttpStatus.BAD_REQUEST);
    }
  }
  async updateBooksState(books: BookDto[]) {
    books.map((book: BookDto) => {
      book.state = BookState.UNAVAILABLE;
      this.updateEntity(book);
    })
  }

  async validateBooksAvailability(books: BookDto[]) {
    const unavailableBooks = books.filter(book => book.state === BookState.UNAVAILABLE);

    if (unavailableBooks.length > 0) {
      const unavailableBookIds = unavailableBooks.map(book => `${book.title} (${book.id})`).join(', ');
      throw new BadRequestException(`Os seguintes livros já estão alugados: ${unavailableBookIds}`);
    }
  }

  async isBookRented(bookId: number): Promise<boolean> {
    const book = await this.bookRepository.getBookById(bookId);

    return book.state === BookState.UNAVAILABLE;
  }
}
