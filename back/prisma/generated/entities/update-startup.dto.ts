
import {Prisma} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'




export class UpdateStartupDto {
  name?: string;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
foundedYear?: number;
@ApiProperty({
  type: `number`,
  format: `double`,
})
valuation?: Prisma.Decimal;
website?: string;
description?: string;
}
