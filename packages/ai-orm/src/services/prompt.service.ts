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

  queryOptionsList(uuids: number[]): Promise<PromptOptionEntity[]> {
    return this.optionRepository
      .createQueryBuilder()
      .where('uuid IN (:...uuids)', { uuids })
      .getMany();
  }

  async list(dto: QueryPetOptions) {
    const {
      page = PageEnum.PAGE_NUMBER,
      pageSize = PageEnum.PAGE_SIZE,
      keywords,
      group,
    } = dto;

    let qb = this.petRepository.createQueryBuilder('pet');
    // .leftJoinAndSelect(PromptOptionEntity, 'model', 'pet.uuid = model.uuid');
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

    let list = data ?? [];

    if (data?.length) {
      const uuids: number[] = list.map(({ uuid }) => uuid);
      const options = await this.queryOptionsList(uuids);

      const map = new Map<number, Array<PromptOptionEntity>>();

      options.forEach((option: PromptOptionEntity) => {
        const { uuid } = option;
        if (!map.has(uuid)) {
          map.set(uuid, [option]);
        } else {
          const opts = map.get(uuid);
          opts.push(option);
          map.set(uuid, opts);
        }
      });

      list = list.map((template) => {
        const { uuid } = template;

        return {
          ...template,
          models: map.get(uuid) ?? [],
        } as PromptTemplateEntity;
      });
    }

    return {
      page,
      pageSize,
      total,
      list: list,
    };
  }
}
