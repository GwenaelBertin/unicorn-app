
import {Prisma} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'


export class StartupDto {
  @ApiProperty({
  type: `integer`,
  format: `int32`,
})
startupId: number ;
name: string ;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
foundedYear: number  | null;
@ApiProperty({
  type: `number`,
  format: `double`,
})
valuation: Prisma.Decimal ;
website: string  | null;
description: string  | null;
@ApiProperty({
  type: `string`,
  format: `date-time`,
})
createdAt: Date ;
@ApiProperty({
  type: `string`,
  format: `date-time`,
})
updatedAt: Date ;
}
