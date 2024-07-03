import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';
import { Book } from 'src/modules/book/entities/book.entity';

@Entity({name: 'authors'})
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  gender: string;

  @Column()
  @IsNotEmpty()
  @IsInt()
  birthYear: number;

  @Column({ unique: true })
  @IsNotEmpty()
  @IsString()
  cpf: string;

  @ManyToMany(() => Book, book => book.authors)
  books: Book[];
}
