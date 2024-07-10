import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { BookService } from './book.service';
import { BookDto } from './dtos/book.dto';
import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async findAll(@Query('state') state?: number): Promise<BookDto[]> {
    return this.bookService.findAll(state);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<BookDto> {
    return this.bookService.findOne(id);
  }

  @Post()
  async create(@Body() createBookDto: CreateBookDto): Promise<BookDto> {
    return this.bookService.create(createBookDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateBookDto: UpdateBookDto): Promise<BookDto> {
    return this.bookService.update(id, updateBookDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.bookService.remove(id);
  }
}
