import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  AuthHeaderKeyEnum,
  CapatchaService,
  PublicApi,
  XAppCookieOptionSchema,
} from '@xtsai/core';
import { CookieOptions, Response } from 'express';
import { defaultCookieOpts } from '../auth.constant';
import { RandomUtil } from '@xtsai/xai-utils';
import { HttpContentTypeEnum } from '@tsailab/core-types';

@ApiTags(`System Admin capatcha 模块`)
@Controller('capatcha')
export class CapatchaController {
  constructor(
    private readonly capatchaService: CapatchaService,
    private readonly config: ConfigService,
  ) {}

  @PublicApi()
  @ApiOperation({
    summary: '获取验证图片',
  })
  @Get()
  async get(@Query('nonce') nonce: string, @Res() res: Response) {
    if (!nonce?.length) {
      nonce = RandomUtil.genRandomCacheKey();
    }

    await this.setCaptchaCookie(res, nonce);

    // TODO clienttype
    const capatcha = await this.capatchaService.getCapatchaMath(nonce);
    res.type(HttpContentTypeEnum.svgXml);
    res.status(HttpStatus.OK);
    res.send(capatcha);
  }

  private async setCaptchaCookie(res: Response, value: string) {
    const { secret, secure, ...others } =
      await this.config.get<XAppCookieOptionSchema>(
        'cookie',
        defaultCookieOpts,
      );

    const options: CookieOptions = {
      ...others,
      secure: secure || !!secret,
    };

    await res.cookie(AuthHeaderKeyEnum.XaiCapathaCode, value, {
      ...options,
    });
  }
}
