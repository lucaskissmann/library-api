import { Transform, Type } from "class-transformer";
import { IsDate, IsInt, IsOptional, ValidateNested } from "class-validator";
import { BookDto } from "src/modules/book/dtos/book.dto";
import { RenterDto } from "src/modules/renter/dtos/renter.dto";

export class RentalDto {
    @IsInt()
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
    returnDate: Date;

    @Type(() => RenterDto)
    renter: RenterDto;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => BookDto)
    books: BookDto[];

    isReturned: boolean;
}