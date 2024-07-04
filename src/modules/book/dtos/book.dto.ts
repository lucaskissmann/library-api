import { IsDate, IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { BookState } from "../enums/book.enum";
import { Type } from "class-transformer";
import { Author } from "src/modules/author/entities/author.entity";

export class BookDto {
    @IsInt()
    id: number;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    isbn: string;

    @IsNotEmpty()
    @IsDate()
    publicationDate: Date;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => Author)
    authors: Author[];

    state: BookState;
}
