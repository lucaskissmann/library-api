import { ApiProperty } from "@nestjs/swagger";
import { ArrayMinSize, IsArray, IsDateString, IsInt, IsOptional, IsString, Validate } from "class-validator";
import { IsValidBookState } from "src/validators/isValidBookState";
import { IsValidISBN } from "src/validators/isValidISBN.constraint";

export class UpdateBookDto {
    @IsString()
    @IsOptional()
    @ApiProperty()
    title: string;

    @IsString()
    @IsOptional()
    @Validate(IsValidISBN)
    @ApiProperty()
    isbn: string;

    @IsDateString({}, {message: "A data deve estar no formado 'YYYY-MM-DD'"})
    @IsOptional()
    @ApiProperty({example: '1949-06-08'})
    publicationDate: Date;

    @IsOptional()
    @IsArray()
    @ArrayMinSize(1)
    @IsInt({ each: true })
    @ApiProperty()
    authorsIds: number[];

    @IsOptional()
    @IsInt()
    @Validate(IsValidBookState)
    @ApiProperty()
    state?: number;
}