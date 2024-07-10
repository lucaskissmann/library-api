import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsOptional, IsString, Validate } from "class-validator";
import { IsValidCPF } from "src/validators/isValidCpf.constraint";

export class UpdateRenterDto {
    @IsOptional()
    @IsString()
    @ApiProperty()
    name: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    gender: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    phone: string

    @IsOptional()
    @IsString()
    @ApiProperty()
    email: string

    @IsOptional()
    @IsDateString({}, {message: "A data deve estar no formado 'YYYY-MM-DD'"})
    @ApiProperty({example: '2001-07-13'})
    birthDate: Date

    @IsOptional()
    @IsString()
    @Validate(IsValidCPF)
    @ApiProperty()
    cpf: string
}