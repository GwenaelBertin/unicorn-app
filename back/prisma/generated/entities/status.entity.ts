
import {ApiProperty} from '@nestjs/swagger'
import {StartupEntity} from './startup.entity'


export class StatusEntity {
  @ApiProperty({
  type: `integer`,
  format: `int32`,
})
statusId: number ;
name: string ;
startups?: StartupEntity[] ;
}
