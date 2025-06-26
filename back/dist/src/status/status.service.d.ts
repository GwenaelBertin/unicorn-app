import { PrismaService } from '../prisma/prisma.service';
export declare class StatusService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        statusId: number;
        name: string;
    }[]>;
}
