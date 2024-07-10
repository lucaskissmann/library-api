import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { RentalService } from './rental.service';
import { CreateRentalDto } from './dtos/create-rental.dto';
import { RentalDto } from './dtos/rental.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('rentals')
@Controller('rentals')
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  @Get()
  @ApiOperation({ summary: 'Retorna todos os aluguéis' })
  @ApiResponse({ status: 200, description: 'Lista de aluguéis retornada com sucesso.', type: [RentalDto] })
   async findAll(): Promise<RentalDto[]> {
    return await this.rentalService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retorna um aluguel pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do aluguel' })
  @ApiResponse({ status: 200, description: 'Aluguel retornado com sucesso.', type: RentalDto })
  @ApiResponse({ status: 404, description: 'Aluguel não encontrado.' })
  async findOne(@Param('id') id: number): Promise<RentalDto> {
    return await this.rentalService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Cria um novo aluguel' })
  @ApiBody({ type: CreateRentalDto })
  @ApiResponse({ status: 201, description: 'aluguel criada com sucesso.', type: RentalDto })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  async create(@Body() rental: CreateRentalDto): Promise<RentalDto> {
    return await this.rentalService.create(rental);
  }

  @Put(':id/returns') 
  @ApiOperation({ summary: 'Devolve todos os livros de um aluguel' })
  @ApiParam({ name: 'id', description: 'ID do aluguel' })
  @ApiResponse({ status: 200, description: 'Livros marcados como devolvidos com sucesso.', type: RentalDto })
  @ApiResponse({ status: 404, description: 'Aluguel não encontrado.' })
  async returnBooks(@Param('id') id: number): Promise<RentalDto>  {
    return await this.rentalService.returnBooks(id);
  }
}
