import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, HttpCode, Query } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorDto } from './dtos/author.dto';
import { CreateAuthorDto } from './dtos/create-author.dto';
import { UpdateAuthorDto } from './dtos/update-author.dto';
import { BookDto } from '../book/dtos/book.dto';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('authors')
@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  @ApiOperation({ summary: 'Retorna todos os autores'})
  @ApiQuery({ name: 'name', required: false, description: 'Nome do autor para busca'})
  @ApiResponse({ status: 200, description: 'Retorna a lista de autores.', type: [AuthorDto] })
  async findAll(@Query('name') name?: string): Promise<AuthorDto[] | AuthorDto> {
    return this.authorService.findAll(name);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retorna um autor pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do autor' })
  @ApiResponse({ status: 200, description: 'Retorna o autor.', type: AuthorDto })
  @ApiResponse({ status: 404, description: 'Autor não encontrado.' })
  findOne(@Param('id') id: number): Promise<AuthorDto> {
    return this.authorService.findOne(id);
  }
  
  @Get(':id/books')
  @ApiOperation({ summary: 'Retorna os livros de um autor' })
  @ApiParam({ name: 'id', description: 'ID do autor' })
  @ApiResponse({ status: 200, description: 'Retorna a lista de livros do autor.', type: [BookDto] })
  async findBooksByAuthor(@Param('id') id: number): Promise<BookDto[]> {
    return this.authorService.findBooksByAuthor(id);
  }

  @Post()
  @ApiOperation({ summary: 'Cria um novo autor' })
  @ApiBody({ type: CreateAuthorDto })
  @ApiResponse({ status: 201, description: 'Autor criado com sucesso.', type: AuthorDto })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() author: CreateAuthorDto): Promise<AuthorDto> {
    return this.authorService.create(author);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um autor pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do autor' })
  @ApiBody({ type: UpdateAuthorDto })
  @ApiResponse({ status: 200, description: 'Autor atualizado com sucesso.', type: AuthorDto })
  @ApiResponse({ status: 404, description: 'Autor não encontrado.' })
  update(@Param('id') id: number, @Body() author: UpdateAuthorDto) {
    return this.authorService.update(id, author);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um autor pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do autor' })
  @ApiResponse({ status: 204, description: 'Autor removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Autor não encontrado.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number) {
    return this.authorService.remove(id);
  }

}
