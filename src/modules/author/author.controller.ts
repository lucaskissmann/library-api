import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, HttpCode, Query } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorDto } from './dtos/author.dto';
import { CreateAuthorDto } from './dtos/create-author.dto';
import { UpdateAuthorDto } from './dtos/update-author.dto';
import { BookDto } from '../book/dtos/book.dto';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  async findAll(@Query('name') name?: string): Promise<AuthorDto[] | AuthorDto> {
    return this.authorService.findAll(name);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<AuthorDto> {
    return this.authorService.findOne(id);
  }
  
  @Get(':id/books')
  async findBooksByAuthor(@Param('id') id: number): Promise<BookDto[]> {
    return this.authorService.findBooksByAuthor(id);
  }

  @Post()
  create(@Body() author: CreateAuthorDto): Promise<AuthorDto> {
    return this.authorService.create(author);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() author: UpdateAuthorDto) {
    return this.authorService.update(id, author);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number) {
    return this.authorService.remove(id);
  }

}
