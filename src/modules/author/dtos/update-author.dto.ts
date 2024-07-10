import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, Validate } from "class-validator";
import { IsValidCPF } from "src/validators/isValidCpf.constraint";

export class UpdateAuthorDto {
    @IsString()
    @IsOptional()
    @ApiProperty()
    name: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    gender: string;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    birthYear: number;

    @IsOptional()
    @IsString()
    @Validate(IsValidCPF)
    @ApiProperty()
    cpf: string;
}