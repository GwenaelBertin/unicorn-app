import { Controller, Get, Param, Delete, Post, Patch, Body } from '@nestjs/common';
import SectorDto from '../models/dto/sector.dto';
import { SectorService } from '../services/controllers/sector.controller.service';

@Controller('sector')
export class SectorController {
  constructor(private readonly sectorService: SectorService) {}

  @Post()
  createSector(@Body() body: SectorDto) {
    return this.sectorService.create(body.sector);
  }

  @Get()
  getAllSectors() {
    return this.sectorService.findAll();
  }

  @Get(':id')
  getOneSector(@Param('id') id: string) {
    return this.sectorService.findOne(Number(id));
  }

  @Patch(':id')
  updateSector(
    @Param('id') id: string,
    @Body() body: SectorDto,
  ) {
    return this.sectorService.update(Number(id), body.sector);
  }

  @Delete(':id')
  deleteSector(@Param('id') id: string) {
    return this.sectorService.remove(Number(id));
  }
} 