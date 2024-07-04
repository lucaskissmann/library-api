import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { BookRepository } from './book.repository';
import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';
import { plainToClass } from 'class-transformer';
import { BookDto } from './dtos/book.dto';
import { AuthorService } from '../author/author.service';

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: BookRepository,
    private readonly authorService: AuthorService,
  ) {}

  async findAll(): Promise<BookDto[]> {
    return await this.bookRepository.getAllBooks();
  }

  async findOne(id: number): Promise<BookDto> {
    return await this.bookRepository.getBookById(id);
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

  async remove(id: number): Promise<void> {
    await this.bookRepository.getBookById(id);

    await this.bookRepository.delete(id);
  }

  async validateISBN(isbn: string, id?: number): Promise<void> {
    const book = await this.bookRepository.findOne({ where: { isbn } });
    if (book && id && book.id != id) {
      throw new ConflictException(`O ISBN ${isbn} já está cadastrado para o livro ${book.title}`);
    }
  } 
}
