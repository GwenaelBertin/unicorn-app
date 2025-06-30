import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class StatusService {
  constructor(private readonly prisma: PrismaService) {}

  create(status: { name: string }) {
    return this.prisma.status.create({ data: status });
  }

  findAll() {
    return this.prisma.status.findMany();
  }

  findOne(id: number) {
    return this.prisma.status.findUnique({ where: { statusId: id } });
  }

  update(id: number, status: { name?: string }) {
    return this.prisma.status.update({ where: { statusId: id }, data: status });
  }

  remove(id: number) {
    return this.prisma.status.delete({ where: { statusId: id } });
  }
} 