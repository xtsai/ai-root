export * from './base.org.entity';
export * from './base.simple.entity';
export * from './common.entity';
export * from './orm.transformer';

export type BaseEntityPropsType = {
  id: number;
  orgno: string;
  createdBy?: number;
  updatedBy?: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
};
