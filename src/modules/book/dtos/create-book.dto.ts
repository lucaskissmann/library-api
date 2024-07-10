import { ArrayMinSize, IsArray, IsDateString, IsInt, IsNotEmpty, IsString, Validate } from "class-validator";
import { BookState } from "../enums/book.enum";
import { IsValidISBN } from "src/validators/isValidISBN.constraint";
import { ApiProperty } from "@nestjs/swagger";

export class CreateBookDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    title: string;

    @IsNotEmpty()
    @IsString()
    @Validate(IsValidISBN)
    @ApiProperty()
    isbn: string;

    @IsNotEmpty()
    @IsDateString({}, {message: "A data deve estar no formado 'YYYY-MM-DD'"})
    @ApiProperty({example: '1949-06-08'})
    publicationDate: Date;

    @IsArray()
    @ArrayMinSize(1)
    @IsInt({ each: true })
    @ApiProperty()
    authorsIds: number[];

    @ApiProperty()
    state?: BookState = BookState.AVAILABLE;
}