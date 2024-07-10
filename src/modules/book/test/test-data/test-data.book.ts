import { BookDto } from "../../dtos/book.dto";
import { CreateBookDto } from "../../dtos/create-book.dto";
import { UpdateBookDto } from "../../dtos/update-book.dto";
import { BookState } from "../../enums/book.enum";

export const bookCreateDataSet: BookDto = {
    id: 1,
    title: 'Book Title',
    isbn: '978-3-16-148410-0',
    publicationDate: new Date(),
    authors: [],
    state: BookState.AVAILABLE,
}

export const createBookDto: CreateBookDto | UpdateBookDto = {
    title: 'Book Title',
    isbn: '978-3-16-148410-0',
    publicationDate: new Date(),
    authorsIds: [],
  };