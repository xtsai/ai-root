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
import { BizException, CurrentUser, UpdateUserStatusModel } from '@xtsai/core';
import { ErrorCodeEnum } from '@xtsai/xai-utils';
import { IUser } from '@tsailab/core-types';

@ApiTags(`${xaiAdminRoutes.System.desc}: 系统管理员`)
@Controller('suser')
export class SuserController {
  constructor(private readonly sysUserManager: SysUserManager) {}

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
  @Post('resetpwd')
  resetOtherPassword(
    @Body() dto: ResetSysUserPwdDto,
    @CurrentUser() user: IUser,
  ) {
    return this.sysUserManager.resetSystemUserPassword(dto, user);
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
  setIsSuper(@Param('id') id: number, @CurrentUser() user: IUser) {
    if (!user?.isSuper) {
      throw BizException.createError(
        ErrorCodeEnum.USER_NO_PERMISSION,
        `只有超级管理员才能操作.`,
      );
    }
    return this.sysUserManager.setUserIsSuper(id, true);
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
