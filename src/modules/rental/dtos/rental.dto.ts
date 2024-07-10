import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsDate, IsInt, IsOptional, ValidateNested } from "class-validator";
import { BookDto } from "src/modules/book/dtos/book.dto";
import { RenterDto } from "src/modules/renter/dtos/renter.dto";

export class RentalDto {
    @IsInt()
    @ApiProperty()
    id: number;

    @Transform(({ value }) => {
        if (value instanceof Date) {
            return value.toISOString().split('T')[0];
        }
        const date = new Date(value);
        if (!isNaN(date.getTime())) {
            return date.toISOString().split('T')[0];
        }
        return value;
    })
    @IsDate()
    @ApiProperty({example: '2024-07-11'})
    rentalDate: Date;

    @Transform(({ value }) => {
        if (value instanceof Date) {
            return value.toISOString().split('T')[0];
        }
        const date = new Date(value);
        if (!isNaN(date.getTime())) {
            return date.toISOString().split('T')[0];
        }
        return value;
    })
    @IsDate()
    @ApiProperty({example: '2024-07-13'})
    returnDate: Date;

    @Type(() => RenterDto)
    @ApiProperty()
    renter: RenterDto;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => BookDto)
    @ApiProperty({type: [BookDto]})
    books: BookDto[];

    @ApiProperty({example: false})
    isReturned: boolean;
}