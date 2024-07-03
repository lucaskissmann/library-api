import { IsDate, IsInt, IsNotEmpty, IsString } from "class-validator";
import { BookState } from "../enums/book.enum";

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

    @IsInt()
    authorId: number;

    state: BookState;
}
