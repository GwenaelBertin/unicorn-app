
import {ApiProperty} from '@nestjs/swagger'


export class SectorDto {
  @ApiProperty({
  type: `integer`,
  format: `int32`,
})
sectorId: number ;
name: string ;
}
