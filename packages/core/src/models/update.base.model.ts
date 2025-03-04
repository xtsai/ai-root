import { ApiProperty } from '@nestjs/swagger';
import { BaseEntityPropsType } from '../baseorm';
import { IsEnum, IsNumber } from 'class-validator';
import {
  SetSortnoData,
  SetStatusData,
  StatusEnum,
  UserStatusEnum,
} from '@tsailab/core-types';

export class BaseModel implements Partial<BaseEntityPropsType> {
  orgno: string;
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  createdBy?: number;
  updatedBy?: number;
}
export class UpdateSortnoModel implements SetSortnoData {
  @ApiProperty({ description: 'unique id' })
  @IsNumber()
  id: number;
  @ApiProperty({ description: '排序码' })
  @IsNumber()
  sortno: number;
}

export class UpdateStatusModel implements SetStatusData {
  @ApiProperty({ description: 'unique id' })
  @IsNumber()
  id: number;

  @ApiProperty({ description: 'status' })
  @IsEnum(StatusEnum, { message: 'status required 0 or 1' })
  status: StatusEnum;
}

export class UpdateUserStatusModel {
  @ApiProperty({ description: 'unique id' })
  @IsNumber()
  id: number;

  @ApiProperty({ description: 'status' })
  @IsEnum(UserStatusEnum, { message: 'status required 0 or 1' })
  status: UserStatusEnum;
}
