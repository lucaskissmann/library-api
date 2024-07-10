import { bookCreateDataSet } from "src/modules/book/test/test-data/test-data.book";
import { RentalDto } from "../../dtos/rental.dto";
import { CreateRentalDto } from "../../dtos/create-rental.dto";
import { renterCreateDataSet } from "src/modules/renter/test/test-data/test-data.renter";

export const rentalCreateDataSet: RentalDto = {
    id: 1,
    renter: renterCreateDataSet,
    books: [bookCreateDataSet],
    rentalDate: new Date(),
    returnDate: new Date(),
    isReturned: false,
};
  
  export const createRentalDtoSet: CreateRentalDto = {
    renterId: 1,
    bookIds: [1],
    rentalDate: new Date(),
    returnDate: new Date(),
    isReturned: false
};