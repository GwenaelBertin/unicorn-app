import { Injectable } from '@nestjs/common';
import { PrismaService } from '..//../../prisma/prisma.service';

@Injectable()
export class SectorService {
  constructor(private readonly prisma: PrismaService) {}

  create(sector: { name: string }) {
    return this.prisma.sector.create({ data: sector });
  }

  findAll() {
    return this.prisma.sector.findMany();
  }

  findOne(id: number) {
    return this.prisma.sector.findUnique({ where: { sectorId: id } });
  }

  update(id: number, sector: { name?: string }) {
    return this.prisma.sector.update({ where: { sectorId: id }, data: sector });
  }

  remove(id: number) {
    return this.prisma.sector.delete({ where: { sectorId: id } });
  }
} 