import { ApiProperty } from '@nestjs/swagger';
import { UserStatusEnum } from '@tsailab/core-types';
import { QueryOptionsDto } from '@xtsai/core';

export class QueryCustomDto extends QueryOptionsDto {
  @ApiProperty({
    type: String,
    description: '查询条件:用户状态',
  })
  status?: UserStatusEnum;
  @ApiProperty({
    type: String,
    description: '查询条件:用户注册开始时间',
  })
  startDate?: number;
  @ApiProperty({
    type: String,
    description: '查询条件:用户注册截止时间',
  })
  endDate?: number;
}
