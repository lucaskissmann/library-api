import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { Book } from './entities/book.entity';
import { IsValidBookState } from 'src/v1/validators/isValidBookState';
import { BookRepository } from './book.repository';
import { AuthorModule } from '../author/author.module';
import { IsValidISBN } from 'src/v1/validators/isValidISBN.constraint';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), AuthorModule],
  controllers: [BookController],
  providers: [BookService, BookRepository, IsValidBookState, IsValidISBN],
  exports: [BookService],
})
export class BookModule {}
