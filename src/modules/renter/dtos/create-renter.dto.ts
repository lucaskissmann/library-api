import { IsDateString, IsNotEmpty, IsOptional, IsString, Validate } from "class-validator";
import { IsValidCPF } from "src/v1/validators/isValidCpf.constraint";

export class CreateRenterDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    gender: string;

    @IsNotEmpty()
    @IsString()
    phone: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsDateString({}, {message: "A data deve estar no formado 'YYYY-MM-DD'"})
    birthDate: Date;

    @IsNotEmpty()
    @IsString()
    @Validate(IsValidCPF)
    cpf: string;
}