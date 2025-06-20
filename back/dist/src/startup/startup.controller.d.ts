import { PrismaService } from '../prisma/prisma.service';
export declare class StartupController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<({
        status: {
            statusId: number;
            name: string;
        };
        sector: {
            name: string;
            sectorId: number;
        };
    } & {
        statusId: number;
        name: string;
        sectorId: number;
        startupId: number;
        foundedYear: number | null;
        valuation: import("@prisma/client/runtime/library").Decimal;
        website: string | null;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(id: string): Promise<({
        status: {
            statusId: number;
            name: string;
        };
        sector: {
            name: string;
            sectorId: number;
        };
    } & {
        statusId: number;
        name: string;
        sectorId: number;
        startupId: number;
        foundedYear: number | null;
        valuation: import("@prisma/client/runtime/library").Decimal;
        website: string | null;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
}
