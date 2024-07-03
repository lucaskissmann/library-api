import { ArrayMinSize, IsArray, IsDateString, IsInt, IsNotEmpty, IsString } from "class-validator";
import { BookState } from "../enums/book.enum";

export class CreateBookDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    isbn: string;

    @IsNotEmpty()
    @IsDateString()
    publicationDate: Date;

    @IsArray()
    @ArrayMinSize(1)
    @IsInt({ each: true })
    authorsIds: number[];

    state?: BookState = BookState.AVAILABLE;
}