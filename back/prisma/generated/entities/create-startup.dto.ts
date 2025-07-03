
import {Prisma} from '@prisma/client'
import {ApiProperty,getSchemaPath} from '@nestjs/swagger'




export class CreateStartupDto {
  name: string;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
foundedYear?: number;
@ApiProperty({
  type: `number`,
  format: `double`,
})
valuation: Prisma.Decimal;
website?: string;
description?: string;
}
