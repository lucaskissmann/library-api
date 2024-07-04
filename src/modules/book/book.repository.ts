import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BookDto } from './dtos/book.dto';
import { plainToClass } from 'class-transformer';
import { NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';
import { AuthorDto } from '../author/dtos/author.dto';

export class BookRepository extends Repository<Book> {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {
    super(
      bookRepository.target,
      bookRepository.manager,
      bookRepository.queryRunner,
    );
  }

  async getAllBooks(): Promise<BookDto[]> {
    const books = await this.bookRepository.find({relations: ['authors'] });
    return books.map(book => plainToClass(BookDto, {
      ...book,
      authors: book.authors.map(author => plainToClass(AuthorDto, author)),
    }));
  }

  async getBookById(id: number) {
    const bookData = await this.bookRepository.findOne({
      where: { id },
      relations: ['authors']
    });

    if (!bookData) {
      throw new NotFoundException(`Não existe um livro cadastrado para o ID: #${id}`);
    }

    return plainToClass(BookDto, bookData);
  }

  async createBook(createBookDto: CreateBookDto): Promise<BookDto> {
    const bookEntity = this.bookRepository.create(createBookDto);
    const savedBook = await this.bookRepository.save(bookEntity);
    return plainToClass(BookDto, savedBook);
  }
  
  async updateBook(updateBookDto: UpdateBookDto) {
    const bookData = await this.bookRepository.save(updateBookDto);
    return plainToClass(BookDto, bookData);
  }
}