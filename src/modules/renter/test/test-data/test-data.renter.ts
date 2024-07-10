import { CreateRenterDto } from "../../dtos/create-renter.dto";
import { RenterDto } from "../../dtos/renter.dto";
import { UpdateRenterDto } from "../../dtos/update-renter.dto";

export const renterCreateDataSet: RenterDto = {
    id: 1,
    name: 'Jane Doe',
    gender: 'Female',
    phone: '51999997777',
    email: 'jdoe@example.com',
    birthDate: new Date(),
    cpf: '12345678901',
}

export const createRenterDtoSet: CreateRenterDto | UpdateRenterDto = {
    name: 'Jane Doe',
    gender: 'Female',
    phone: '51999997777',
    email: 'jdoe@example.com',
    birthDate: new Date(),
    cpf: '12345678901',
}