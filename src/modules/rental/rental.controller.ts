import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { RentalService } from './rental.service';
import { CreateRentalDto } from './dtos/create-rental.dto';
import { RentalDto } from './dtos/rental.dto';

@Controller('rentals')
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  @Get()
   async findAll(): Promise<RentalDto[]> {
    return await this.rentalService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<RentalDto> {
    return await this.rentalService.findOne(id);
  }

  @Post()
  async create(@Body() rental: CreateRentalDto): Promise<RentalDto> {
    return await this.rentalService.create(rental);
  }

  @Put(':id/returns') 
  async returnBooks(@Param('id') id: number): Promise<RentalDto>  {
    return await this.rentalService.returnBooks(id);
  }
}
