import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SectorService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.sector.findMany();
  }
} 