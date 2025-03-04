import { Injectable, Logger } from '@nestjs/common';
import { SigninLocalDto } from '../dto';
import { SysUserService } from '@xtsai/system';
import { ErrorCodeEnum } from '@xtsai/xai-utils';
import { BizException, XAuthHelper, XAuthTokenUser } from '@xtsai/core';
import { IUser, UserStatusEnum } from '@tsailab/core-types';
import { AuthService } from './auth.service';

@Injectable()
export class SystemLoginManager {
  protected logger = new Logger(`Xauth ${SystemLoginManager.name}`);

  constructor(
    private readonly sysUserService: SysUserService,
    private readonly authService: AuthService,
  ) {}

  /**
   *
   * @param dto
   * @returns
   */
  async login(dto: SigninLocalDto) {
    const { account, password, cookieValue } = dto;

    const uentity = await this.sysUserService.findUserByAccount(account, true);
    if (!uentity)
      throw BizException.createError(ErrorCodeEnum.UNAUTHORIZED, `用户不存在`);
    if (uentity.status === UserStatusEnum.FORBIDDEN)
      throw BizException.createError(ErrorCodeEnum.UNAUTHORIZED, `账号已停用`);

    // validate password
    if (!XAuthHelper.comparePassword(password, uentity.password)) {
      throw BizException.createError(ErrorCodeEnum.UNAUTHORIZED, `密码不正确`);
    }
    const user: IUser = SysUserService.convertToUser(uentity);

    const token = await this.authService.createAccessToken(user, cookieValue);

    const result: XAuthTokenUser = {
      token,
      userinfo: user,
    };

    return result;
  }
}
