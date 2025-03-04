import { Transform, TransformFnParams, Type } from 'class-transformer';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'loto_user_log',
  synchronize: false,
  comment: 'record front-end user logs',
})
export class CustomUserLogEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
    comment: 'Primary key ID',
  })
  @Type(() => Number)
  @Transform(({ value }) => Number(value))
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    name: 'biztype',
    comment: 'audit log biz type',
  })
  biztype: string;

  @Type(() => Number)
  @Transform(({ value }) => Number(value))
  @Column({
    type: 'int',
    name: 'uid',
    nullable: true,
    comment: 'user id',
  })
  uid: number;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    name: 'username',
    comment: 'username',
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    name: 'client_id',
    comment: 'clientId',
  })
  clientId: string;

  @Column({
    type: 'varchar',
    length: 30,
    nullable: true,
    name: 'ip',
    comment: 'ip',
  })
  ip: string;

  @Column({
    type: 'longtext',
    nullable: true,
    name: 'detail',
    comment: 'log detail',
  })
  detail: string;

  get detailJson(): any {
    if (!this.detail?.length) return null;
    try {
      return JSON.parse(this.detail) as any;
    } catch (_) {
      return null;
    }
  }

  @Column({
    type: 'longtext',
    nullable: false,
    name: 'biz_detail',
    default: null,
    comment: 'biz log detail',
  })
  bizDetail: string;

  get bizDetailJson(): any {
    if (!this.bizDetail?.length) return null;
    try {
      return JSON.parse(this.bizDetail) as any;
    } catch (_) {
      return null;
    }
  }

  @Type(() => Boolean)
  @Transform(({ value }) => Boolean(value))
  @Column({
    name: 'locked',
    type: 'tinyint',
    default: 1,
    comment: 'log can clear by ui',
  })
  locked: boolean;

  @Transform((row: TransformFnParams) => +new Date(row.value))
  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'created_at',
    comment: 'record create time',
  })
  createdAt: Date;

  @DeleteDateColumn({
    type: 'timestamp',
    nullable: true,
    name: 'deleted_at',
    comment: 'Logic delete sign',
  })
  deletedAt?: Date;
}
