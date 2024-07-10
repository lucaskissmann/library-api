import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class RenterDto {
    @IsInt()
    @ApiProperty()
    id: number;

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

    @IsDate()
    @ApiProperty({example: '2001-07-13'})
    birthDate: Date;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    cpf: string;
}