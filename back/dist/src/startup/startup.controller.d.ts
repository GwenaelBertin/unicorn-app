import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class StartupController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createStartup(body: any): Promise<{
        startupId: number;
        name: string;
        foundedYear: number | null;
        valuation: Prisma.Decimal;
        website: string | null;
        description: string | null;
        sectorId: number;
        statusId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getAllStartups(): Promise<({
        sector: {
            name: string;
            sectorId: number;
        };
        status: {
            name: string;
            statusId: number;
        };
    } & {
        startupId: number;
        name: string;
        foundedYear: number | null;
        valuation: Prisma.Decimal;
        website: string | null;
        description: string | null;
        sectorId: number;
        statusId: number;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    getOneStartup(id: string): Promise<({
        sector: {
            name: string;
            sectorId: number;
        };
        status: {
            name: string;
            statusId: number;
        };
    } & {
        startupId: number;
        name: string;
        foundedYear: number | null;
        valuation: Prisma.Decimal;
        website: string | null;
        description: string | null;
        sectorId: number;
        statusId: number;
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
    updateStartup(id: string, body: any): Promise<{
        startupId: number;
        name: string;
        foundedYear: number | null;
        valuation: Prisma.Decimal;
        website: string | null;
        description: string | null;
        sectorId: number;
        statusId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteStartup(id: string): Promise<{
        startupId: number;
        name: string;
        foundedYear: number | null;
        valuation: Prisma.Decimal;
        website: string | null;
        description: string | null;
        sectorId: number;
        statusId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
