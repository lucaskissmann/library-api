import { ArrayMinSize, IsArray, IsDateString, IsInt, IsNotEmpty, IsString, Validate } from "class-validator";
import { BookState } from "../enums/book.enum";
import { IsValidISBN } from "src/v1/validators/isValidISBN.constraint";

export class CreateBookDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    @Validate(IsValidISBN)
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