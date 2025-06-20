import { PrismaService } from '../prisma/prisma.service';
export declare class StatusController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        statusId: number;
        name: string;
    }[]>;
}
