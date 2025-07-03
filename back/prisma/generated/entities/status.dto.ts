
import {ApiProperty} from '@nestjs/swagger'


export class StatusDto {
  @ApiProperty({
  type: `integer`,
  format: `int32`,
})
statusId: number ;
name: string ;
}
