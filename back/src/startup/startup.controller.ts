import { Controller, Get, Param } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('startups')
export class StartupController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async findAll() {
    return this.prisma.startup.findMany({
      include: {
        sector: true,
        status: true,
      },
    });
  }

  // Endpoint pour récupérer une startup par son id
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.prisma.startup.findUnique({
      where: { startupId: Number(id) },
      include: {
        sector: true,
        status: true,
      },
    });
  }
} 