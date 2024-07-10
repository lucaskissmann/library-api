import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, CreateDateColumn } from 'typeorm';
import { IsNotEmpty, IsDate } from 'class-validator';
import { Book } from 'src/modules/book/entities/book.entity';
import { Renter } from 'src/modules/renter/entities/renter.entity';

@Entity({name: 'rentals'})
export class Rental {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'date',
  })
  @IsNotEmpty()
  rentalDate: Date;

  @Column({
    type: 'date',
  })
  @IsNotEmpty()
  returnDate: Date;

  @ManyToOne(() => Renter, renter => renter.id)
  renter: Renter;

  @Column({
    name: 'is_returned',
    default: false,
    type: 'boolean',
  })
  isReturned: boolean;

  @ManyToMany(() => Book)
  @JoinTable()
  books: Book[];
}
