import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthHeaderKeyEnum, CurrentUser, PublicApi } from '@xtsai/core';
import { SigninLocalDto } from '../dto';
import { Request } from 'express';
import { SystemLoginManager } from '../services';
import { IUser } from '@tsailab/core-types';

@ApiTags('System admin Auth 模块')
@Controller('auth')
export class AuthController {
  constructor(private readonly loginManager: SystemLoginManager) {}

  @ApiOperation({ summary: 'login' })
  @PublicApi()
  @ApiOperation({
    summary: '用戶名+密码登录',
    description: '用戶名+密码登录',
  })
  @Post('login')
  login(@Req() req: Request, @Body() dto: SigninLocalDto) {
    const cookieValue = req.cookies?.[AuthHeaderKeyEnum.XaiCapathaCode];

    if (!dto?.isLock) {
      // TODO check capatch
    }

    return this.loginManager.login({ ...dto, cookieValue });
  }

  @ApiOperation({
    summary: '获取登录用户信息',
    description: '根据token获取当前登录信息，验证cache 中是否存在',
  })
  @Get('userinfo')
  getUserInfo(@CurrentUser() user: IUser) {
    return user;
  }
}
