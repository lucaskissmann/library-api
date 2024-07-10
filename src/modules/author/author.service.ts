import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { AuthorRepository } from './author.repository';
import { CreateAuthorDto } from './dtos/create-author.dto';
import { AuthorDto } from './dtos/author.dto';
import { UpdateAuthorDto } from './dtos/update-author.dto';
import { In } from 'typeorm';
import { BookDto } from '../book/dtos/book.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class AuthorService {
  constructor(private readonly authorRepository: AuthorRepository) {}
  
  async findAll(name?: string): Promise<AuthorDto[] | AuthorDto> {
    if(name) {
      return await this.authorRepository.getAuthorByName(name);
    }

    return await this.authorRepository.getAllAuthors();
  }
  
  async findOne(id: number): Promise<AuthorDto> {
    return await this.authorRepository.getAuthorById(id);
  }
  
  async findOneByCPF(cpf: string): Promise<Author | undefined> {
    return this.authorRepository.findOne({ where: { cpf }, relations: ['books'] });
  }

  async findOneByName(name: string): Promise<Author | undefined> {
    return this.authorRepository.findOne({ where: { name }, relations: ['books'] });
  }
  
  async findByIds(ids: number[]): Promise<Author[]> {
    return await this.authorRepository.findBy({ id: In(ids) })
  }

  async findBooksByAuthor(id: number): Promise<BookDto[]> {
    const author = await this.authorRepository.getAuthorById(id);
 
    return plainToClass(BookDto, author.books);
  }
  
  async create(createAuthorDto: CreateAuthorDto): Promise<AuthorDto> {
    createAuthorDto.cpf = createAuthorDto.cpf.replace(/[^\d]+/g, '');

    await this.validateCpf(createAuthorDto.cpf);

    return this.authorRepository.createAuthor(createAuthorDto);
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto): Promise<AuthorDto> {
    const author = await this.authorRepository.getAuthorById(id);
    
    if(updateAuthorDto.cpf) {
      updateAuthorDto.cpf = updateAuthorDto.cpf.replace(/[^\d]+/g, '');
      
      await this.validateCpf(updateAuthorDto.cpf);
    }

    const updatedAuthor = Object.assign(author, updateAuthorDto);

    return await this.authorRepository.updateAuthor(updatedAuthor);
  }

  async remove(id: number): Promise<void> {
	  const author = await this.authorRepository.getAuthorById(id);

    if(this.isAuthorLinkedToBooks(author)) {
      throw new ConflictException(`O Autor ${author.name} não pode ser removido pois possui livros associados a ele`);
    }

    await this.authorRepository.delete(id);
  }

  async validateCpf(cpf: string): Promise<void> {
    const author = await this.findOneByCPF(cpf);
    if (author) {
      throw new ConflictException(`Já existe um autor cadastrado para o CPF '${cpf}'`);
    }
  }

  isAuthorLinkedToBooks(author: AuthorDto): boolean {
    return author.books.length > 0;
  }
}
