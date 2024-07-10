import { IsDate, IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { BookState } from "../enums/book.enum";
import { Type } from "class-transformer";
import { Author } from "src/modules/author/entities/author.entity";
import { ApiProperty } from "@nestjs/swagger";

export class BookDto {
    @IsInt()
    @ApiProperty()
    id: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    title: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    isbn: string;

    @IsNotEmpty()
    @IsDate()
    @ApiProperty({example: '1949-06-08'})
    publicationDate: Date;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => Author)
    @ApiProperty()
    authors: Author[];

    @ApiProperty()
    state: BookState;
}
