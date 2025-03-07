import { CommonEntity } from '@xtsai/core';
import { Transform, Type } from 'class-transformer';
import { Column, Entity, Index } from 'typeorm';

@Entity({
  name: 'ai_knowledge_sources',
  synchronize: true,
  comment: 'knowledge sources',
})
export class KnowledgeSourceEntity extends CommonEntity {
  @Index()
  @Column({
    type: 'varchar',
    name: 'kno',
    nullable: false,
    comment: 'knowledge no:kn_xxxx',
  })
  kno: string;
  @Column({
    type: 'varchar',
    name: 'filename',
    length: 200,
    nullable: false,
    comment: 'save filename',
  })
  filename: string;
  @Column({
    type: 'varchar',
    name: 'originname',
    length: 200,
    nullable: true,
    comment: 'user upload file name',
  })
  originname: string;

  @Type(() => Number)
  @Transform(({ value }) => Number(value))
  @Column({
    type: 'int',
    name: 'size',
    default: 0,
    comment: 'file size',
  })
  size: number;

  @Column({
    type: 'varchar',
    name: 'source_type',
    length: 64,
    nullable: true,
    comment: 'file type text doc',
  })
  sourceType: string;
  @Column({
    type: 'tinyint',
    name: 'embidded',
    default: 0,
    comment: 'file has embedding',
  })
  embidded?: boolean;
  @Column({
    type: 'int',
    nullable: true,
    default: -2,
    name: 'expire_at',
    comment: 'expire at',
  })
  expireAt: number;

  @Column({
    type: 'varchar',
    name: 'obstype',
    length: 64,
    nullable: true,
    comment: 'oss provider type',
  })
  obstype?: string;
  @Column({
    type: 'varchar',
    name: 'obsid',
    length: 256,
    nullable: true,
    comment: 'oss id',
  })
  obsid: string;
  @Column({
    type: 'varchar',
    name: 'path',
    length: 256,
    nullable: true,
    comment: 'file local path',
  })
  path: string;
  @Column({
    type: 'varchar',
    name: 'urlpath',
    length: 256,
    nullable: true,
    comment: 'file oss url path',
  })
  urlpath: string;

  @Column({
    type: 'longtext',
    name: 'preset_annotation',
    nullable: true,
    default: null,
    comment: 'embedding annotation',
  })
  presetAnnotation: string;

  @Column({
    type: 'varchar',
    name: 'tag',
    length: 1000,
    default: '',
    comment: 'tag',
  })
  tag: string;

  // @ManyToOne(() => KnowledgeMainEntity, (knowledge) => knowledge.kno)
  // knowledge: KnowledgeMainEntity;
}
