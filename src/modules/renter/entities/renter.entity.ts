import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsNotEmpty, IsString, IsEmail, IsOptional } from 'class-validator';
import { Rental } from 'src/modules/rental/entities/rental.entity';

@Entity({name: 'renters'})
export class Renter {
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
  @IsString()
  phone: string;

  @Column({ unique: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Column({
    type: 'date',
  })
  @IsNotEmpty()
  birthDate: Date;

  @Column({ unique: true })
  @IsNotEmpty()
  @IsString()
  cpf: string;

  @OneToMany(() => Rental, rental => rental.renter)
  rentals: Rental[];
}
