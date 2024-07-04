import { ArrayMinSize, IsArray, IsDateString, IsInt, IsOptional, IsString, Validate } from "class-validator";
import { IsValidBookState } from "src/v1/validators/isValidBookState";
import { IsValidISBN } from "src/v1/validators/isValidISBN.constraint";

export class UpdateBookDto {
    @IsString()
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
    @Validate(IsValidISBN)
    isbn: string;

    @IsDateString()
    @IsOptional()
    publicationDate: Date;

    @IsOptional()
    @IsArray()
    @ArrayMinSize(1)
    @IsInt({ each: true })
    authorsIds: number[];

    @IsOptional()
    @IsInt()
    @Validate(IsValidBookState)
    state?: number;
}