import { ArrayMinSize, IsArray, IsDateString, IsInt, IsOptional, IsString, Validate } from "class-validator";
import { IsValidBookState } from "src/v1/validators/isValidBookState";

export class UpdateBookDto {
    @IsString()
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
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
    @IsString()
    @Validate(IsValidBookState)
    state?: string;
}