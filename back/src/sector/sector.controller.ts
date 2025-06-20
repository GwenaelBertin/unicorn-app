import { Controller, Get } from '@nestjs/common'; 
import { PrismaService } from '../prisma/prisma.service';

@Controller('sectors')
export class SectorController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async findAll() {
    return this.prisma.sector.findMany();
  }
}