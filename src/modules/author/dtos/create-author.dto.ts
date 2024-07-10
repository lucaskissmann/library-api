import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, Validate } from 'class-validator';
import { IsValidCPF } from 'src/validators/isValidCpf.constraint';

export class CreateAuthorDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    name: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    gender: string;

    @IsInt()
    @ApiProperty()
    birthYear: number;

    @IsNotEmpty()
    @IsString()
    @Validate(IsValidCPF)
    @ApiProperty()
    cpf: string;
}
