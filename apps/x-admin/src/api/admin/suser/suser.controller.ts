import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { SysUserManager } from './suser.manager';
import { xaiAdminRoutes } from '../../api.module.routes';
import {
  CreateSysUserDto,
  QueryAdminUserReqDto,
  ResetSysUserPwdDto,
} from '../dto';
import { UpdateSUserModel } from '@xtsai/system';
import {
  AuditLogCache,
  BizException,
  buildBizDesc,
  CurrentUser,
  LotoHeaders,
  UpdateUserStatusModel,
} from '@xtsai/core';
import { ErrorCodeEnum, RandomUtil } from '@xtsai/xai-utils';
import { IUser, LotoHeadersType } from '@tsailab/core-types';
import { SystemLogProducer } from '../../../share';
import { BiztypeEnum } from 'src/enum';

@ApiTags(`${xaiAdminRoutes.System.desc}: 系统管理员`)
@Controller('suser')
export class SuserController {
  constructor(
    private readonly sysUserManager: SysUserManager,
    private readonly syslogProducer: SystemLogProducer,
  ) {}

  @ApiOperation({ summary: '获取管理员账号列表' })
  @Get('list')
  list(@Query() queryDto: QueryAdminUserReqDto) {
    return this.sysUserManager.queryList(queryDto);
  }

  @ApiOperation({ summary: '创建管理员账号' })
  @HttpCode(HttpStatus.OK)
  @Post('create')
  createNewSystemUser(@Body() dto: CreateSysUserDto) {
    return this.sysUserManager.createSystemUser(dto);
  }

  @ApiOperation({ summary: '修改用户' })
  @Post('update_some')
  updateSystemUser(@Body() dto: UpdateSUserModel) {
    return this.sysUserManager.updateSystemUserSome(dto);
  }

  @ApiOperation({ summary: '重置密码' })
  @HttpCode(HttpStatus.OK)
  @Post('resetpwd')
  async resetOtherPassword(
    @Body() dto: ResetSysUserPwdDto,
    @CurrentUser() user: IUser,
    @LotoHeaders() headers: LotoHeadersType,
  ) {
    const { ip = '', cliid } = headers;
    const cache: AuditLogCache = {
      cacheId: RandomUtil.clientUUID(),
      biztype: BiztypeEnum.SystemResetSUserPassword,
      bizDetail: buildBizDesc(SysUserManager.name, 'resetSystemUserPassword'),
      uid: user.id,
      username: user.username,
      ip: ip,
      clientId: cliid,
      locked: true,
      detailJson: {
        body: {
          ...dto,
          password: '***',
        },
        header: headers,
      },
    };
    try {
      this.syslogProducer.publicSystemLog(cache);
      return this.sysUserManager.resetSystemUserPassword(dto, user);
    } catch (err: any) {
      cache.errorJson = {
        code: err?.code,
        message: err?.message,
        stack: err?.stack,
      };
      this.syslogProducer.publicSystemLog(cache);
      throw err;
    }
  }

  @ApiOperation({ summary: '重置状态' })
  @Post('update_status')
  updateStatus(@Body() dto: UpdateUserStatusModel, @CurrentUser() user: IUser) {
    if (dto.id === user.id) {
      throw BizException.createError(
        ErrorCodeEnum.USER_NO_PERMISSION,
        '不能修改自己的状态',
      );
    }
    if (!user?.isSuper) {
      throw BizException.createError(
        ErrorCodeEnum.USER_NO_PERMISSION,
        `只有超级管理员才能操作.`,
      );
    }
    return this.sysUserManager.updateSystemUserStatus(dto);
  }

  @ApiOperation({ summary: '设为超级管理员' })
  @Post('set_issuper/:id')
  async setIsSuper(
    @Param('id') id: number,
    @CurrentUser() user: IUser,
    @LotoHeaders() headers: LotoHeadersType,
  ) {
    const { ip = '', cliid } = headers;
    const cache: AuditLogCache = {
      cacheId: RandomUtil.clientUUID(),
      biztype: BiztypeEnum.SystemSetSuperUser,
      bizDetail: buildBizDesc(SysUserManager.name, 'setUserIsSuper'),
      uid: user.id,
      username: user.username,
      ip: ip,
      clientId: cliid,
      locked: true,
      detailJson: {
        body: {
          id,
        },
        header: headers,
      },
    };
    try {
      if (!user?.isSuper) {
        throw BizException.createError(
          ErrorCodeEnum.USER_NO_PERMISSION,
          `只有超级管理员才能操作.`,
        );
      }
      await this.syslogProducer.publicSystemLog(cache);
      return await this.sysUserManager.setUserIsSuper(id, true);
    } catch (err: any) {
      cache.errorJson = {
        code: err?.code,
        message: err?.message,
        stack: err?.stack,
      };
      await this.syslogProducer.publicSystemLog(cache);
      throw err;
    }
  }

  @ApiOperation({ summary: '取消超级管理员' })
  @Post('cancel_issuper/:id')
  cancelIsSuper(@Param('id') id: number, @CurrentUser() user: IUser) {
    if (!user?.isSuper) {
      throw BizException.createError(
        ErrorCodeEnum.USER_NO_PERMISSION,
        `只有超级管理员才能操作.`,
      );
    }

    return this.sysUserManager.setUserIsSuper(id, false);
  }
}
