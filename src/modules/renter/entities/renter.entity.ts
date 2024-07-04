import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsNotEmpty, IsString, IsEmail, IsOptional } from 'class-validator';

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

  @Column()
  @IsNotEmpty()
  birthDate: Date;

  @Column({ unique: true })
  @IsNotEmpty()
  @IsString()
  cpf: string;
}
