
import {Prisma} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {SectorEntity} from './sector.entity'
import {StatusEntity} from './status.entity'


export class StartupEntity {
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
  type: `integer`,
  format: `int32`,
})
sectorId: number ;
sector?: SectorEntity ;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
statusId: number ;
status?: StatusEntity ;
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
