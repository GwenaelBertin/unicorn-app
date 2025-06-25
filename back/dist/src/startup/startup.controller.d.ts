import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class StartupController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createStartup(startupData: Prisma.StartupCreateInput): Promise<{
        statusId: number;
        name: string;
        sectorId: number;
        startupId: number;
        foundedYear: number | null;
        valuation: Prisma.Decimal;
        website: string | null;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getAllStartups(): Promise<({
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
        valuation: Prisma.Decimal;
        website: string | null;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    getOneStartup(id: string): Promise<({
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
        valuation: Prisma.Decimal;
        website: string | null;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
    updateStartup(id: string, startupData: Prisma.StartupUpdateInput): Promise<{
        statusId: number;
        name: string;
        sectorId: number;
        startupId: number;
        foundedYear: number | null;
        valuation: Prisma.Decimal;
        website: string | null;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteStartup(id: string): Promise<{
        statusId: number;
        name: string;
        sectorId: number;
        startupId: number;
        foundedYear: number | null;
        valuation: Prisma.Decimal;
        website: string | null;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
