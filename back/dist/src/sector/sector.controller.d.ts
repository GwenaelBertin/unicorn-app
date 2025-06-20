import { PrismaService } from '../prisma/prisma.service';
export declare class SectorController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        name: string;
        sectorId: number;
    }[]>;
}
