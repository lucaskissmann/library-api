import { IsInt, IsNotEmpty, IsOptional, IsString, Validate } from 'class-validator';
import { IsValidCPF } from 'src/v1/validators/isValidCpf.constraint';

export class CreateAuthorDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    gender: string;

    @IsInt()
    birthYear: number;

    @IsNotEmpty()
    @IsString()
    @Validate(IsValidCPF)
    cpf: string;
}
