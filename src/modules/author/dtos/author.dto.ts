import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString, Validate, ValidateNested } from 'class-validator';
import { Book } from 'src/modules/book/entities/book.entity';

export class AuthorDto {
    @IsInt()
    @ApiProperty()
    id: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    name: string;

    @IsString()
    @ApiProperty()
    gender: string;

    @IsInt()
    @ApiProperty()
    birthYear: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    cpf: string;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => Book)
    @ApiProperty()
    books: Book[];
}
