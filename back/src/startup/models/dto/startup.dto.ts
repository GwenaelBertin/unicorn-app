import { createZodDto } from '@anatine/zod-nestjs'; // génère un DTO à partir d'un schéma Zod
import { extendApi } from '@anatine/zod-openapi'; // enrichit un schéma Zod avec des métadonnées OpenAPI
import { z } from 'zod'; // pour la validation de schéma (z) 

const StartupSchema =  extendApi
(z.object({
    startup: z
        .object({
            name: z.string().min(1),
            valuation: z.number().min(0),
            description: z.string().min(1).optional(),
            website: z.string().min(1).optional(),
            foundedYear: z.number().min(1900).optional(),
            sectorId: z.number().min(1),
            statusId: z.number().min(1),
        })
        .required(),
    })
);


/**
 * StartupDto est une classe qui permet de valider les données d'une startup.
 */

export default class StartupDto extends createZodDto(StartupSchema) {}