import { StatusEnum } from '@tsailab/core-types';
import { Transform, TransformFnParams, Type } from 'class-transformer';
import {
  BaseEntity as OrmBaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

export class BaseSimpleEntity extends OrmBaseEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: 'Primary key ID',
  })
  @Type(() => Number)
  @Transform(({ value }) => Number(value))
  id: number;

  @Transform((row: TransformFnParams) => +new Date(row.value))
  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'created_at',
    comment: 'record create time',
  })
  createdAt: Date;

  @Type(() => Number)
  @Transform(({ value }) => Number(value))
  @Column({
    type: 'int',
    nullable: true,
    default: 0,
    name: 'sortno',
    comment: 'record sort number',
  })
  sortno: number;

  @Column({
    type: 'tinyint',
    nullable: true,
    default: 1,
    name: 'status',
    comment: 'status,0-forbidden,1-normal',
  })
  status: StatusEnum;
}
