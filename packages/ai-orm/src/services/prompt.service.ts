import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PromptOptionEntity, PromptTemplateEntity } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryPetOptions } from '../models';
import { PageEnum } from '@tsailab/core-types';

@Injectable()
export class PromptService {
  protected logger = new Logger(`xtsai-botorm:${PromptService.name}`);

  constructor(
    @InjectRepository(PromptTemplateEntity)
    private readonly petRepository: Repository<PromptTemplateEntity>,
    @InjectRepository(PromptOptionEntity)
    private readonly petOptRepository: Repository<PromptOptionEntity>,
  ) {}

  get repository(): Repository<PromptTemplateEntity> {
    return this.petRepository;
  }

  get optionRepository(): Repository<PromptOptionEntity> {
    return this.petOptRepository;
  }

  async list(dto: QueryPetOptions) {
    const {
      page = PageEnum.PAGE_NUMBER,
      pageSize = PageEnum.PAGE_SIZE,
      keywords,
      group,
    } = dto;

    let qb = this.petRepository
      .createQueryBuilder('pet')
      .leftJoinAndSelect('pet.models', 'submodel', 'pet.uuid = submodel.uuid');
    if (group?.trim()?.length) {
      qb = qb.andWhere('pet.group = :group', { group });
    }
    if (keywords?.trim()?.length) {
      const k = keywords.trim();
      qb = qb.andWhere(
        'pet.title LIKE :title OR pet.tag LIKE :tag OR pet.petype LIKE :petype OR pet.uuid = :uuid',
        {
          title: `%${k}%`,
          tag: `%${k}%`,
          petype: `${k}%`,
          uuid: k,
        },
      );
    }

    const [data, total] = await qb
      .orderBy('pet.sortno', 'ASC')
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    return {
      page,
      pageSize,
      total,
      list: data ?? [],
    };
  }
}
