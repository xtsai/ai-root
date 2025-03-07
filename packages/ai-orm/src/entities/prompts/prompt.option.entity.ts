import { BaseSimpleEntity } from '@xtsai/core';
import { Transform, Type } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { PromptTemplateEntity } from './prompt.template.entity';

@Entity({
  name: 'ai_prompt_options',
  synchronize: true,
  comment: 'pet model options',
})
export class PromptOptionEntity extends BaseSimpleEntity {
  @Type(() => Number)
  @Transform(({ value }) => Number(value))
  @Column({
    type: 'int',
    name: 'uuid',
    nullable: false,
    comment: 'reffer pet uuid',
  })
  uuid: number;

  @Column({
    name: 'modelid',
    type: 'varchar',
    nullable: false,
    length: 200,
    comment: 'AI model id',
  })
  modelid: string;
  @Column({
    name: 'provider',
    type: 'varchar',
    nullable: false,
    length: 64,
    comment: 'AI provider name',
  })
  provider: string;
  @Column({
    name: 'model',
    type: 'varchar',
    nullable: false,
    length: 100,
    comment: 'AI model id',
  })
  model: string;

  @Column({
    name: 'aiopts',
    type: 'longtext',
    nullable: true,
    default: null,
    comment: 'Model options',
  })
  aiopts: string;

  @Column({
    type: 'tinyint',
    name: 'is_default',
    nullable: true,
    default: 0,
    comment: 'default',
  })
  isDefault: boolean;

  @ManyToOne(() => PromptTemplateEntity, (pet) => pet.uuid, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn([
    {
      name: 'uuid',
      referencedColumnName: 'uuid',
    },
  ])
  pet: PromptTemplateEntity;

  @Column({
    type: 'varchar',
    name: 'remark',
    nullable: true,
    comment: 'remark',
  })
  remark: string;
}
