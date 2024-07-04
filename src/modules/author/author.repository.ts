import { Repository } from 'typeorm';
import { Author } from './entities/author.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAuthorDto } from './dtos/create-author.dto';
import { AuthorDto } from './dtos/author.dto';
import { plainToClass } from 'class-transformer';
import { UpdateAuthorDto } from './dtos/update-author.dto';
import { NotFoundException } from '@nestjs/common';

export class AuthorRepository extends Repository<Author> {
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
  ) {
    super(
      authorRepository.target,
      authorRepository.manager,
      authorRepository.queryRunner,
    );
  }

  async getAllAuthors(): Promise<AuthorDto[]> {
    const authors = await this.authorRepository.find();
    return authors.map(book => plainToClass(AuthorDto, book));
  }

  async getAuthorByName(name: string): Promise<AuthorDto> {
    const authorData = await this.authorRepository.findOne({
      where: { name },
      relations: ['books']
    });

    if(!authorData) {
      throw new NotFoundException(`Não existe um autor cadastrado para o nome: ${name}`);
    }

    return plainToClass(AuthorDto, authorData);
  }

  async getAuthorById(id: number): Promise<AuthorDto> {
    const authorData = await this.authorRepository.findOne({
      where: { id },
      relations: ['books']
    });

    if (!authorData) {
      throw new NotFoundException(`Não existe um autor cadastrado para o ID: #${id}`);
    }

    return plainToClass(AuthorDto, authorData);
  }

  async createAuthor(createAuthorDto: CreateAuthorDto): Promise<AuthorDto> {
    const authorEntity = this.authorRepository.create(createAuthorDto);
    const authorData = await this.authorRepository.save(authorEntity); 
    return plainToClass(AuthorDto, authorData);
  }

  async updateAuthor(updateAuthorDto: UpdateAuthorDto) {
    const authorData = await this.authorRepository.save(updateAuthorDto);
    return plainToClass(AuthorDto, authorData);
  }
}