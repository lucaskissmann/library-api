import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { BookService } from './book.service';
import { BookDto } from './dtos/book.dto';
import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('books')
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  @ApiOperation({ summary: 'Retorna todos os livros' })
  @ApiQuery({ name: 'state', required: false, description: 'Status do livro para filtrar' })
  @ApiResponse({ status: 200, description: 'Retorna a lista de livros.', type: [BookDto] })
  async findAll(@Query('state') state?: number): Promise<BookDto[]> {
    return this.bookService.findAll(state);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retorna um livro pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do livro' })
  @ApiResponse({ status: 200, description: 'Retorna o livro.', type: BookDto })
  @ApiResponse({ status: 404, description: 'Livro não encontrado.' })
  async findOne(@Param('id') id: number): Promise<BookDto> {
    return this.bookService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Cria um novo livro' })
  @ApiBody({ type: CreateBookDto })
  @ApiResponse({ status: 201, description: 'Livro criado com sucesso.', type: BookDto })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  async create(@Body() createBookDto: CreateBookDto): Promise<BookDto> {
    return this.bookService.create(createBookDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um livro pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do livro' })
  @ApiBody({ type: UpdateBookDto })
  @ApiResponse({ status: 200, description: 'Livro atualizado com sucesso.', type: BookDto })
  @ApiResponse({ status: 404, description: 'Livro não encontrado.' })
  async update(@Param('id') id: number, @Body() updateBookDto: UpdateBookDto): Promise<BookDto> {
    return this.bookService.update(id, updateBookDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove um livro pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do livro' })
  @ApiResponse({ status: 204, description: 'Livro removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Livro não encontrado.' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.bookService.remove(id);
  }
}
