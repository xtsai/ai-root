import { BaseSimpleEntity } from '@xtsai/core';
import { Column, Entity } from 'typeorm';
import { PromptTemplateTypeEnum } from '../../enum';
import { Transform, Type } from 'class-transformer';
import { PromptOptionEntity } from './prompt.option.entity';

@Entity({
  name: 'ai_prompt_template',
  synchronize: true,
  comment: 'AI Pet',
})
export class PromptTemplateEntity extends BaseSimpleEntity {
  @Type(() => Number)
  @Transform(({ value }) => Number(value))
  @Column({
    type: 'int',
    name: 'uuid',
    nullable: false,
    comment: 'the prompt uuid',
  })
  uuid: number;

  @Column({
    type: 'varchar',
    name: 'title',
    nullable: true,
    length: 128,
    comment: 'template title',
  })
  title: string;

  @Column({
    type: 'varchar',
    name: 'group',
    nullable: true,
    length: 64,
    comment: 'use dict pet_group',
  })
  group: string;

  @Column({
    type: 'varchar',
    name: 'petype',
    nullable: true,
    length: 64,
    comment: 'Pet type',
  })
  petype: PromptTemplateTypeEnum | string;
  @Column({
    type: 'varchar',
    name: 'tag',
    nullable: true,
    length: 256,
    comment: 'Pet tag',
  })
  tag: string;

  @Column({
    type: 'varchar',
    name: 'kno',
    nullable: true,
    length: 64,
    comment: 'knowledge string no',
  })
  kno: string;

  @Column({
    type: 'longtext',
    name: 'system_message',
    nullable: true,
    default: null,
    comment: 'system role message string',
  })
  systemMessage: string;

  @Column({
    type: 'longtext',
    name: 'preset_messages',
    nullable: true,
    default: null,
    comment: 'preset chat messages array',
  })
  presetMessages: string;

  @Column({
    type: 'varchar',
    name: 'remark',
    nullable: true,
    length: 256,
    comment: 'remark',
  })
  remark: string;

  // @OneToMany(() => PromptTemplateEntity, (model) => model.uuid)
  models: PromptOptionEntity[];
}
