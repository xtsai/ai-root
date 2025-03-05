import { ApiProperty } from '@nestjs/swagger';
import { PlatformEnum } from '@tsailab/core-types';
import { BizException, QueryOptionsDto } from '@xtsai/core';
import { CreateSUserModel } from '@xtsai/system';
import { isMiddelPassword } from '@xtsai/xai-utils';

import { IsNotEmpty, IsOptional, ValidateIf } from 'class-validator';

export class QueryAdminUserReqDto extends QueryOptionsDto {
  @ApiProperty({ type: String, description: '查询条件:用户名或昵称' })
  username?: string;
  @ApiProperty({
    type: String,
    description: '查询条件:用户手机号码，支持模糊查询',
  })
  mobile?: string;
}

export class QueryAccountSelectionParams {
  orgid?: number;
  useStatusCtrl?: boolean;
}

export class ResetSysUserPwdDto {
  @ApiProperty({ type: Number, description: '用户ID' })
  id: number;
  @ApiProperty({ type: String, description: '新密码' })
  @IsNotEmpty({ message: '新密码不能为空' })
  password: string;
}

export class CreateSysUserDto implements CreateSUserModel {
  @IsOptional()
  phone: string;
  @IsOptional()
  email: string;
  @IsNotEmpty()
  username: string;
  nickname?: string;
  @IsNotEmpty()
  @ValidateIf((_obj: CreateSysUserDto, val: string) => {
    if (!val?.length) throw BizException.IllegalParamterError(`密码必须填写`);
    if (!isMiddelPassword(val))
      throw BizException.IllegalParamterError(`密码太简单!`);
    return true;
  })
  password: string;
  verifyCode: string;
  avatar?: string;
  isSuper?: boolean;
  platform?: PlatformEnum;
  openid?: string;
  orgid?: number;
}
