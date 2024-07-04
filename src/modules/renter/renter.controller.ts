import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { RenterService } from './renter.service';
import { Renter } from './entities/renter.entity';

@Controller('renters')
export class RenterController {
  constructor(private readonly renterService: RenterService) {}

  @Get()
  findAll() {
    return this.renterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.renterService.findOne(id);
  }

  @Post()
  create(@Body() renter: Renter) {
    return this.renterService.create(renter);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() renter: Renter) {
    return this.renterService.update(id, renter);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.renterService.remove(id);
  }
}
