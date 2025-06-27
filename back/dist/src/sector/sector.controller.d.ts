import { SectorService } from './sector.service';
export declare class SectorController {
    private readonly sectorService;
    constructor(sectorService: SectorService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        name: string;
        sectorId: number;
    }[]>;
}
