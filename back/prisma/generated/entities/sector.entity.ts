
import {ApiProperty} from '@nestjs/swagger'
import {StartupEntity} from './startup.entity'


export class SectorEntity {
  @ApiProperty({
  type: `integer`,
  format: `int32`,
})
sectorId: number ;
name: string ;
startups?: StartupEntity[] ;
}
