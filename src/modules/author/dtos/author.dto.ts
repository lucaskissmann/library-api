import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString, Validate, ValidateNested } from 'class-validator';
import { Book } from 'src/modules/book/entities/book.entity';

export class AuthorDto {
    @IsInt()
    id: number;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    gender: string;

    @IsInt()
    birthYear: number;

    @IsNotEmpty()
    @IsString()
    cpf: string;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => Book)
    books: Book[];
}
