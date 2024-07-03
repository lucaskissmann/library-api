import { IsInt, IsOptional, IsString, Validate } from "class-validator";
import { IsValidCPF } from "src/v1/validators/isValidCpf.constraint";

export class UpdateAuthorDto {
    @IsString()
    @IsOptional()
    name: string;

    @IsOptional()
    @IsString()
    gender: string;

    @IsOptional()
    @IsInt()
    birthYear: number;

    @IsOptional()
    @IsString()
    @Validate(IsValidCPF)
    cpf: string;
}