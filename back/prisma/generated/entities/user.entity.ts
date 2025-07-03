
import {ApiProperty} from '@nestjs/swagger'


export class UserEntity {
  @ApiProperty({
  type: `integer`,
  format: `int32`,
})
userId: number ;
email: string ;
password: string ;
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
