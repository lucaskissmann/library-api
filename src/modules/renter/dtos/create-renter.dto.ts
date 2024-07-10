import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsOptional, IsString, Validate } from "class-validator";
import { IsValidCPF } from "src/validators/isValidCpf.constraint";

export class CreateRenterDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    name: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    gender: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    phone: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    email: string;

    @IsNotEmpty()
    @IsDateString({}, {message: "A data deve estar no formado 'YYYY-MM-DD'"})
    @ApiProperty({example: '2001-07-13'})
    birthDate: Date;

    @IsNotEmpty()
    @IsString()
    @Validate(IsValidCPF)
    @ApiProperty()
    cpf: string;
}