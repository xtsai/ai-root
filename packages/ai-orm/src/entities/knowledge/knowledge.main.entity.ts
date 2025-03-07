import { BaseSimpleEntity } from '@xtsai/core';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { KnowledgeSourceEntity } from './knowledge.source.entity';

@Entity({
  name: 'ai_knowledge_main',
  synchronize: true,
  comment: 'knowledge main',
})
export class KnowledgeMainEntity extends BaseSimpleEntity {
  @Column({
    type: 'varchar',
    name: 'title',
    length: 64,
    comment: 'title',
  })
  title: string;

  @PrimaryColumn({
    type: 'varchar',
    name: 'kno',
    nullable: false,
    comment: 'knowledge no:kn_xxxx',
  })
  kno: string;

  @Column({
    type: 'varchar',
    name: 'group',
    length: 64,
    comment: 'group from dict',
  })
  group: string;

  @Column({
    type: 'varchar',
    name: 'tag',
    length: 1000,
    comment: 'tag: chatbot,agent',
  })
  tag: string;

  @Column({
    type: 'varchar',
    name: 'keywords',
    nullable: true,
    length: 2000,
    comment: 'web crawler keywords',
  })
  keywords: string;

  @Column({
    type: 'longtext',
    name: 'web_rules',
    nullable: true,
    default: null,
    comment: 'the web crawler rules json string',
  })
  webRules: string;

  @Column({
    type: 'varchar',
    name: 'remark',
    length: 512,
    comment: 'remark',
  })
  remark: string;

  //   @OneToMany(() => KnowledgeSourceEntity, (source) => source.kno)
  sources: KnowledgeSourceEntity[];
}
