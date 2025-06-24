import { Controller, Get, Param, Delete, Post, Patch, Body } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Controller('startups')
export class StartupController {
  constructor(private readonly prisma: PrismaService) {}

  @Post()
  async createStartup(@Body() startupData: Prisma.StartupCreateInput) {
    //  body attendu ?
    // { "name": "...", "valuation": "...", "sector": { "connect": { "sectorId": ... } }, "status": { "connect": { "statusId": ... } } }
    return this.prisma.startup.create({
      data: startupData,
    });
  }

  @Get()
  async getAllStartups() {
    return this.prisma.startup.findMany({
      include: {
        sector: true,
        status: true,
      },
    });
  }

  // Endpoint pour récupérer une startup par son id
  @Get(':id')
  async getOneStartup(@Param('id') id: string) {
    return this.prisma.startup.findUnique({
      where: { startupId: Number(id) },
      include: {
        sector: true,
        status: true,
      },
    });
  }

  @Patch(':id')
  async updateStartup(
    @Param('id') id: string,
    @Body() startupData: Prisma.StartupUpdateInput,
  ) {
    return this.prisma.startup.update({
      where: { startupId: Number(id) },
      data: startupData,
    });
  }

  @Delete(':id')
  async deleteStartup(@Param('id') id: string) {
    return this.prisma.startup.delete({
      where: { startupId: Number(id) },
    });
  }
} 