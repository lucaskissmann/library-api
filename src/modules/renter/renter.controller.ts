import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { RenterService } from './renter.service';
import { RenterDto } from './dtos/renter.dto';
import { UpdateRenterDto } from './dtos/update-renter.dto';
import { CreateRenterDto } from './dtos/create-renter.dto';

@Controller('renters')
export class RenterController {
  constructor(private readonly renterService: RenterService) {}

  @Get()
  async findAll(): Promise<RenterDto[]> {
    return await this.renterService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<RenterDto> {
    return await this.renterService.findOne(id);
  }

  @Post()
  async create(@Body() createRenterDto: CreateRenterDto): Promise<RenterDto> {
    return await this.renterService.create(createRenterDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateRenterDto: UpdateRenterDto): Promise<RenterDto> {
    return await this.renterService.update(id, updateRenterDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: number): Promise<void> {
    return await this.renterService.remove(id);
  }
}
