import { IsDateString, IsOptional, IsString, Validate } from "class-validator";
import { IsValidCPF } from "src/v1/validators/isValidCpf.constraint";

export class UpdateRenterDto {
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    gender: string;

    @IsOptional()
    @IsString()
    phone: string

    @IsOptional()
    @IsString()
    email: string

    @IsOptional()
    @IsDateString({}, {message: "A data deve estar no formado 'YYYY-MM-DD'"})
    birthDate: Date

    @IsOptional()
    @IsString()
    @Validate(IsValidCPF)
    cpf: string
}