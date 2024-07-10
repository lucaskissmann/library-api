import { ApiProperty } from "@nestjs/swagger";
import { ArrayMinSize, IsArray, IsDateString, IsInt, IsNotEmpty, IsOptional } from "class-validator";

export class CreateRentalDto {
    @IsOptional()
    @IsDateString({}, {message: "A data deve estar no formado 'YYYY-MM-DD'"})
    @ApiProperty({example: '2024-07-11'})
    rentalDate?: Date;
    
    @IsOptional()
    @IsDateString({}, {message: "A data deve estar no formado 'YYYY-MM-DD'"})
    @ApiProperty({example: '2024-07-13'})
    returnDate?: Date;

    @IsNotEmpty()
    @IsInt()
    @ApiProperty()
    renterId: number;

    @IsArray()
    @ArrayMinSize(1)
    @IsInt({ each: true })
    @ApiProperty({isArray: true, type: 'number'})
    bookIds: number[];

    isReturned: boolean = false;
}