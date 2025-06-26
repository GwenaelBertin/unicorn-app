import { Controller, Get, Param, Delete, Post, Patch, Body } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Controller('startups')
export class StartupController {
  constructor(private readonly prisma: PrismaService) {}

  @Post()
  async createStartup(@Body() body: any) {
    // On extrait sectorId et statusId du body, et on met le reste des propriétés dans 'rest'
    // Pour un code + court + lisible, on utilise la déstructuration et le rest operator
    const { sectorId, statusId, ...rest } = body;

    // On utilise Prisma pour créer une nouvelle startup
    return this.prisma.startup.create({
      data: {
        ...rest, // On met toutes les autres propriétés du body 
        // c'est ici qu'on adapte le controller pour transformer les IDs structure Prisma attendue
        sector: { connect: { sectorId } }, 
        status: { connect: { statusId } }  
      },
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
    @Body() body: any,
  ) {
    const { sectorId, statusId, ...rest } = body;
    // attention! il faut penser à retirer tout les champs non modifiables de l'objet à envoyer dans data
    delete rest.startupId;
    return this.prisma.startup.update({
      where: { startupId: Number(id) },
      data: {
        ...rest,
        ...(sectorId && { sector: { connect: { sectorId } } }),
        ...(statusId && { status: { connect: { statusId } } })
      },
    });
  }

  @Delete(':id')
  async deleteStartup(@Param('id') id: string) {
    return this.prisma.startup.delete({
      where: { startupId: Number(id) },
    });
  }
} 