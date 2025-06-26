import { StatusService } from './status.service';
export declare class StatusController {
    private readonly statusService;
    constructor(statusService: StatusService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        statusId: number;
        name: string;
    }[]>;
}
