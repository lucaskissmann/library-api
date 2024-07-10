import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { RenterService } from './renter.service';
import { RenterDto } from './dtos/renter.dto';
import { UpdateRenterDto } from './dtos/update-renter.dto';
import { CreateRenterDto } from './dtos/create-renter.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('renters')
@Controller('renters')
export class RenterController {
  constructor(private readonly renterService: RenterService) {}

  @Get()
  @ApiOperation({ summary: 'Retorna todos os locatários' })
  @ApiResponse({ status: 200, description: 'Lista de locatários retornada com sucesso.', type: [RenterDto] })
  async findAll(): Promise<RenterDto[]> {
    return await this.renterService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retorna um locatário pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do locatário' })
  @ApiResponse({ status: 200, description: 'Locatário retornado com sucesso.', type: RenterDto })
  @ApiResponse({ status: 404, description: 'Locatário não encontrado.' })
  async findOne(@Param('id') id: number): Promise<RenterDto> {
    return await this.renterService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Cria um novo locatário' })
  @ApiBody({ type: CreateRenterDto })
  @ApiResponse({ status: 201, description: 'Locatário criado com sucesso.', type: RenterDto })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  async create(@Body() createRenterDto: CreateRenterDto): Promise<RenterDto> {
    return await this.renterService.create(createRenterDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um locatário existente' })
  @ApiParam({ name: 'id', description: 'ID do locatário' })
  @ApiBody({ type: UpdateRenterDto })
  @ApiResponse({ status: 200, description: 'Locatário atualizado com sucesso.', type: RenterDto })
  @ApiResponse({ status: 404, description: 'Locatário não encontrado.' })
  async update(@Param('id') id: number, @Body() updateRenterDto: UpdateRenterDto): Promise<RenterDto> {
    return await this.renterService.update(id, updateRenterDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove um locatário' })
  @ApiParam({ name: 'id', description: 'ID do locatário' })
  @ApiResponse({ status: 204, description: 'Locatário removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Locatário não encontrado.' })
  async remove(@Param('id') id: number): Promise<void> {
    return await this.renterService.remove(id);
  }
}
