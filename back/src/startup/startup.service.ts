import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class StartupService {
  constructor(private readonly prisma: PrismaService) {}

  create(body: any) {
    // On extrait sectorId et statusId du body, et on met le reste des propriétés dans 'rest'
    // Pour un code + court + lisible, on utilise la déstructuration et le rest operator
    const { sectorId, statusId, ...rest } = body;

    // On utilise Prisma pour créer une nouvelle startup
    return this.prisma.startup.create({
      data: {
        ...rest, // On met toutes les autres propriétés du body
        // c'est ici qu'on adapte le controller pour transformer les IDs structure Prisma attendue
        sector: { connect: { sectorId } },
        status: { connect: { statusId } },
      },
    });
  }

  findAll() {
    return this.prisma.startup.findMany({
      include: {
        sector: true,
        status: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.startup.findUnique({
      where: { startupId: id },
      include: {
        sector: true,
        status: true,
      },
    });
  }

  update(id: number, body: any) {
    const { sectorId, statusId, ...rest } = body;
    // attention! il faut penser à retirer tout les champs non modifiables de l'objet à envoyer dans data
    delete rest.startupId;
    return this.prisma.startup.update({
      where: { startupId: id },
      data: {
        ...rest,
        ...(sectorId && { sector: { connect: { sectorId } } }),
        ...(statusId && { status: { connect: { statusId } } }),
      },
    });
  }

  remove(id: number) {
    return this.prisma.startup.delete({
      where: { startupId: id },
    });
  }
} 