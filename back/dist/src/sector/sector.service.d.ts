import { PrismaService } from '../prisma/prisma.service';
export declare class SectorService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        name: string;
        sectorId: number;
    }[]>;
}
