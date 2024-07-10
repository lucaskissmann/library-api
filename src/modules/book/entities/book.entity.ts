import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import { Author } from 'src/modules/author/entities/author.entity';
import { BookState } from '../enums/book.enum';

@Entity({name: 'books'})
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  isbn: string;

  @Column({
    type: 'date',
  })
  @IsNotEmpty()
  publicationDate: Date;

  @ManyToMany(() => Author, author => author.books)
  @JoinTable()
  authors: Author[];

  @Column({
    type: 'enum',
    enum: BookState,
    default: BookState.AVAILABLE,
    enumName: 'BookState',	
  })
  state: BookState;
}
