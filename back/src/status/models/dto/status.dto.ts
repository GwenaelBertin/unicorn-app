import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

const StatusSchema = extendApi(
  z.object({
    status: z.object({
      name: z.string().min(1), 
    }).required(),
  })
);

export default class StatusDto extends createZodDto(StatusSchema) {} 