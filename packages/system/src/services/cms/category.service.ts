import { Repository } from 'typeorm';
import { BotCategoryEntity } from '../../entities';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BizException,
  QueryOptionsDto,
  UpdateSortnoModel,
  UpdateStatusModel,
} from '@xtsai/core';
import { PageEnum, ROOT_TRRE_NODE_PID } from '@tsailab/core-types';
import { ErrorCodeEnum, RandomNoType, RandomUtil } from '@xtsai/xai-utils';
import { CreateCategoryModel, UpdateCategoryModel } from '../../model';

export class CategoryService {
  constructor(
    @InjectRepository(BotCategoryEntity)
    private readonly categoryRepository: Repository<BotCategoryEntity>,
  ) {}

  get repository(): Repository<BotCategoryEntity> {
    return this.categoryRepository;
  }

  getById(id: number) {
    return this.categoryRepository.findOneBy({ id });
  }

  async list(queryDto: QueryOptionsDto) {
    const {
      page = PageEnum.PAGE_NUMBER,
      pageSize = PageEnum.PAGE_SIZE,
      keywords,
    } = queryDto;

    let qb = this.categoryRepository.createQueryBuilder('cate');
    if (keywords?.trim()?.length) {
      qb = qb.where('title LIKE :title OR tag LIKE :tag OR group LIKE :group', {
        title: `%${keywords.trim()}%`,
        tag: `%${keywords.trim()}%`,
        group: `${keywords.trim()}%`,
      });
    }

    qb = qb.orderBy('sortno', 'ASC').addOrderBy('title', 'ASC');

    const [data, total] = await qb
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

  async createNew(model: CreateCategoryModel): Promise<BotCategoryEntity> {
    const {
      title,
      pid = ROOT_TRRE_NODE_PID,
      peid = 1000,
      icon,
      image,
      group,
      tag,
      path,
      url,
      richcontent,
      remark,
    } = model;

    const { no } = await this.createNo();

    const entity = await this.categoryRepository.save(
      this.categoryRepository.create({
        cateno: no,
        title,
        pid,
        peid,
        icon,
        image,
        group,
        tag,
        path,
        url,
        richcontent,
        remark,
      }),
    );
    return entity;
  }

  async updateSome(model: UpdateCategoryModel): Promise<boolean> {
    const { id, ...others } = model;
    const find = await this.getById(id);
    if (!find)
      throw BizException.createError(
        ErrorCodeEnum.DATA_RECORD_REMOVED,
        `栏目不存在`,
      );

    const { affected } = await this.categoryRepository
      .createQueryBuilder()
      .update(BotCategoryEntity)
      .set({
        ...others,
      })
      .where({ id })
      .execute();

    return affected > 0;
  }

  async updateSortno(dto: UpdateSortnoModel): Promise<boolean> {
    const { id, sortno } = dto;
    const { affected } = await this.categoryRepository
      .createQueryBuilder()
      .update(BotCategoryEntity)
      .set({ sortno })
      .where({ id })
      .execute();

    return affected > 0;
  }

  async updateStatus(dto: UpdateStatusModel) {
    const { id, status } = dto;
    const { affected } = await this.categoryRepository
      .createQueryBuilder()
      .update(BotCategoryEntity)
      .set({ status })
      .where({ id })
      .execute();

    return affected > 0;
  }

  createNo(): RandomNoType {
    return RandomUtil.randomNo36BaseTime();
  }
}
