import { StartupService } from '../services/controllers/startup.controller.service';
import { Prisma } from '@prisma/client';
import StartupDto from '../models/dto/startup.dto';
export declare class StartupController {
    private readonly startupService;
    constructor(startupService: StartupService);
    createStartup(body: StartupDto): Prisma.Prisma__StartupClient<{
        name: string;
        valuation: Prisma.Decimal;
        description: string | null;
        website: string | null;
        foundedYear: number | null;
        sectorId: number;
        statusId: number;
        startupId: number;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    getAllStartups(): Prisma.PrismaPromise<({
        status: {
            name: string;
            statusId: number;
        };
        sector: {
            name: string;
            sectorId: number;
        };
    } & {
        name: string;
        valuation: Prisma.Decimal;
        description: string | null;
        website: string | null;
        foundedYear: number | null;
        sectorId: number;
        statusId: number;
        startupId: number;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    getOneStartup(id: string): Prisma.Prisma__StartupClient<({
        status: {
            name: string;
            statusId: number;
        };
        sector: {
            name: string;
            sectorId: number;
        };
    } & {
        name: string;
        valuation: Prisma.Decimal;
        description: string | null;
        website: string | null;
        foundedYear: number | null;
        sectorId: number;
        statusId: number;
        startupId: number;
        createdAt: Date;
        updatedAt: Date;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    updateStartup(id: string, body: StartupDto): Prisma.Prisma__StartupClient<{
        name: string;
        valuation: Prisma.Decimal;
        description: string | null;
        website: string | null;
        foundedYear: number | null;
        sectorId: number;
        statusId: number;
        startupId: number;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    deleteStartup(id: string): Prisma.Prisma__StartupClient<{
        name: string;
        valuation: Prisma.Decimal;
        description: string | null;
        website: string | null;
        foundedYear: number | null;
        sectorId: number;
        statusId: number;
        startupId: number;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
}
