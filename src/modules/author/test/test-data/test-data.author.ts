import { bookCreateDataSet } from "src/modules/book/test/test-data/test-data.book"
import { AuthorDto } from "../../dtos/author.dto"

export const authorCreateDataSet: AuthorDto = {
    id: 1,
    name: 'John Doe',
    gender: 'Male',
    cpf: '12345678901',
    birthYear: 1990,
    books: [bookCreateDataSet]
}

export const createAuthorDtoSet = {
    name: 'John Doe',
    gender: 'Male',
    cpf: '12345678901',
    birthYear: 1990,
}