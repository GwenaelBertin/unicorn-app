import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

const SectorSchema = extendApi(
  z.object({
    sector: z.object({
      name: z.string().min(1),
    }).required(),
  })
);

export default class SectorDto extends createZodDto(SectorSchema) {} 