import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class StartupService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Crée une nouvelle startup dans la base de données.
   * On reçoit un objet depuis le contrôleur.
   * On extrait sectorId et statusId pour les relier aux tables correspondantes via Prisma.
   */
  create(startup: {
    name: string;
    valuation: number;
    description: string;
    website: string;
    foundedYear: number;
    sectorId: number;
    statusId: number;
  }) {
    const { sectorId, statusId, ...rest } = startup; // On extrait les IDs pour les relations
    return this.prisma.startup.create({
      data: {
        ...rest, // On ajoute les autres propriétés de la startup
        sector: { connect: { sectorId } }, // On relie la startup à un secteur existant
        status: { connect: { statusId } }, // idem ici
      },
    });
  }

  findAll() {
    return this.prisma.startup.findMany({
      include: {
        sector: true,
        status: true,
      },
      orderBy: {
        valuation: 'desc',
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

  update(id: number, startup: {
    name?: string;
    valuation?: number;
    description?: string;
    website?: string;
    foundedYear?: number;
    sectorId?: number;
    statusId?: number;
  }) {
    const { sectorId, statusId, ...rest } = startup;
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