import { ArrayMinSize, IsArray, IsDateString, IsInt, IsNotEmpty, IsOptional } from "class-validator";

export class CreateRentalDto {
    @IsOptional()
    @IsDateString({}, {message: "A data deve estar no formado 'YYYY-MM-DD'"})
    rentalDate?: Date;
    
    @IsOptional()
    @IsDateString({}, {message: "A data deve estar no formado 'YYYY-MM-DD'"})
    returnDate?: Date;

    @IsNotEmpty()
    @IsInt()
    renterId: number;

    @IsArray()
    @ArrayMinSize(1)
    @IsInt({ each: true })
    bookIds: number[];

    isReturned: boolean = false;
}