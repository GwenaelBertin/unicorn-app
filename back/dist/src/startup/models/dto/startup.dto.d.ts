import { z } from 'zod';
declare const StartupDto_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    startup: z.ZodObject<{
        name: z.ZodString;
        valuation: z.ZodNumber;
        description: z.ZodString;
        website: z.ZodString;
        foundedYear: z.ZodNumber;
        sectorId: z.ZodNumber;
        statusId: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        statusId: number;
        name: string;
        sectorId: number;
        foundedYear: number;
        valuation: number;
        website: string;
        description: string;
    }, {
        statusId: number;
        name: string;
        sectorId: number;
        foundedYear: number;
        valuation: number;
        website: string;
        description: string;
    }>;
}, "strip", z.ZodTypeAny, {
    startup: {
        statusId: number;
        name: string;
        sectorId: number;
        foundedYear: number;
        valuation: number;
        website: string;
        description: string;
    };
}, {
    startup: {
        statusId: number;
        name: string;
        sectorId: number;
        foundedYear: number;
        valuation: number;
        website: string;
        description: string;
    };
}>>;
export default class StartupDto extends StartupDto_base {
}
export {};
