import { Injectable } from '@nestjs/common';
import { ClientTypeEnum } from '@tsailab/core-types';
import { RedisService } from '@tsailab/ioredis-mq';
import { ErrorCodeEnum } from '@xtsai/xai-utils';
import { CacheKeyHelper } from '../cache';
import { BizException } from '../exceptions';
import * as svgCaptcha from 'svg-captcha-fixed';

@Injectable()
export class CapatchaService {
  protected readonly expires: number = 60;

  constructor(private readonly redisService: RedisService) {}

  /**
   *
   * @param nonce string
   * @param clienttype string of ClientTypeEnum
   * @returns captcha image data
   */
  async getCapatchaMath(
    nonce: string,
    clienttype: string = ClientTypeEnum.mobileChat,
  ) {
    const k = this.buildCacheKey(nonce, clienttype);
    const captcha = this.captchaMath();
    await this.redisService.setValueEx(k, captcha.text, this.expires);
    return captcha.data;
  }

  /**
   * 验证
   * @param value
   * @param nonce
   * @param clienttype
   * @returns boolean
   */
  async validateCaptchaValue(
    value: string,
    nonce: string,
    clienttype: string = ClientTypeEnum.mobileChat,
  ) {
    if (!value?.length) {
      throw BizException.IllegalParamterError(`请填写验证码`);
    }
    if (!nonce?.length) {
      throw BizException.IllegalParamterError(`验证码nonce未传值.`);
    }
    const k = this.buildCacheKey(nonce, clienttype);
    const v = await this.redisService.getValue<string>(k);
    if (!v || v !== value)
      throw BizException.createError(
        ErrorCodeEnum.PARAMS_INVALID,
        `验证码不正确或已失效!`,
      );

    return true;
  }

  private buildCacheKey(nonce: string, clienttype: string): string {
    return CacheKeyHelper.buildCaptchaKey(nonce, clienttype.toString());
  }

  private captchaMath() {
    const captcha = svgCaptcha.createMathExpr({
      mathMax: 35,
      mathMin: 1,
      mathOperator: '+-',
      fontSize: 50,
      width: 120,
      height: 36,
      background: '#cc9966',
    });

    return captcha;
  }
}
