import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class StartupService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(body: any): Prisma.Prisma__StartupClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    findAll(): Prisma.PrismaPromise<({
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
    findOne(id: number): Prisma.Prisma__StartupClient<({
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
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    update(id: number, body: any): Prisma.Prisma__StartupClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    remove(id: number): Prisma.Prisma__StartupClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
}
