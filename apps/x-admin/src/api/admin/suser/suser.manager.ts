import { Injectable, Logger } from '@nestjs/common';
import { Like } from 'typeorm';
import {
  CreateSysUserDto,
  QueryAdminUserReqDto,
  ResetSysUserPwdDto,
} from '../dto';
import {
  CreateSUserModel,
  SystemService,
  SystemUserEntity,
  SysUserService,
  UpdateSUserModel,
} from '@xtsai/system';
import { ErrorCodeEnum, mapToObj, UnoHelper } from '@xtsai/xai-utils';
import { IUser, NextNoType, PageEnum, PlatformEnum } from '@tsailab/core-types';
import {
  BizException,
  NextnoCacheService,
  UpdateUserStatusModel,
} from '@xtsai/core';

@Injectable()
export class SysUserManager {
  protected logger = new Logger(SysUserManager.name);

  constructor(
    private readonly sysUserService: SysUserService,
    private readonly systemService: SystemService,
    private readonly nextnoService: NextnoCacheService,
  ) {}

  async queryList(dto: QueryAdminUserReqDto, filterDeleted: boolean = true) {
    let qb = this.sysUserService.accRepository.createQueryBuilder('suser');
    const map = new Map<string, any>();
    const {
      page = PageEnum.PAGE_NUMBER,
      pageSize = PageEnum.PAGE_SIZE,
      keywords,
      mobile,
    } = dto;
    if (mobile?.length) {
      map.set('phone', Like(`%${mobile}%`));
    }
    qb = qb.where(mapToObj(map));

    if (keywords?.length) {
      qb = qb.andWhere(
        'suser.username LIKE :keywords OR suser.email LIKE :keywords OR suser.userno LIKE :keywords',
        {
          keywords: `%${keywords}%`,
        },
      );
    }

    if (!filterDeleted) {
      qb = qb.withDeleted();
    }

    const [data, total] = await qb
      .orderBy('created_at', 'DESC')
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

  /**
   *
   * @param dto
   * @returns 创建用户
   */
  async createSystemUser(
    dto: CreateSysUserDto,
  ): Promise<SystemUserEntity | never> {
    const {
      username,
      password,
      email,
      phone,
      platform = PlatformEnum.SYSTEM_PLATFORM,
      nickname,
      avatar,
      orgid = 0,
    } = dto;

    const { unoInfo } = await this.getNextnoInfo();

    const model: CreateSUserModel = {
      username,
      password,
      email,
      phone,
      nickname,
      avatar,
      orgid,
      platform,
      verifyCode: '',
    };

    return this.sysUserService.createSysUser(model, unoInfo.uno);
  }

  updateSystemUserSome(dto: UpdateSUserModel) {
    return this.sysUserService.updateSuser(dto);
  }

  async updateSystemUserStatus(dto: UpdateUserStatusModel) {
    const { id, status } = dto;
    const { affected } = await this.sysUserService.setUserStatus(id, status);
    return affected > 0;
  }

  async setUserIsSuper(id: number, isSuper: boolean = false) {
    const find = await this.sysUserService.getById(id);
    if (!find)
      throw BizException.createError(
        ErrorCodeEnum.DATA_RECORD_REMOVED,
        `用户不存在`,
      );
    const { affected } = await this.sysUserService.accRepository
      .createQueryBuilder('user')
      .update(SystemUserEntity)
      .set({ isSuper })
      .where({ id })
      .execute();

    return affected > 0;
  }

  async resetSystemUserPasswordByDefault(id: number, user: IUser) {
    if (!user?.id || !user.isSuper) {
      throw BizException.createError(
        ErrorCodeEnum.USER_NO_PERMISSION,
        '您无权重置密码,请联系超级管理员!',
      );
    }
    if (id === user.id) {
      throw BizException.createError(
        ErrorCodeEnum.USER_NO_PERMISSION,
        '不能重置自己的密码',
      );
    }

    const { defaultPassword } = await this.systemService.getConfigOptions();
    const { affected } = await this.sysUserService.resetPassword(
      id,
      defaultPassword,
    );
    return affected > 0;
  }

  async resetSystemUserPassword(dto: ResetSysUserPwdDto, user: IUser) {
    if (!user?.id || !user.isSuper) {
      throw BizException.createError(
        ErrorCodeEnum.USER_NO_PERMISSION,
        '您无权重置密码,请联系超级管理员!',
      );
    }
    if (dto.id === user.id) {
      throw BizException.createError(
        ErrorCodeEnum.USER_NO_PERMISSION,
        '不能重置自己的密码',
      );
    }
    const { id, password } = dto;
    await this.systemService.verifyPasswordStrength(password);
    const { affected } = await this.sysUserService.resetPassword(id, password);
    return affected > 0;
  }

  private async getNextnoInfo() {
    const next = await this.nextnoService.getNextno(NextNoType.USER);
    const seeds = await this.systemService.getUnoSeeds();
    const unoInfo = UnoHelper.buildUno(next, seeds);

    return {
      unoInfo: unoInfo,
      nextno: next,
    };
  }
}
