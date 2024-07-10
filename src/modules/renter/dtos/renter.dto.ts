import { IsDate, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class RenterDto {
    @IsInt()
    id: number;

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

    @IsDate()
    birthDate: Date;

    @IsNotEmpty()
    @IsString()
    cpf: string;
}