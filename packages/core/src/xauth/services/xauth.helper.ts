import { AccountType, IUser, JwtAccessPayload } from '@tsailab/core-types';

import { BcryptHelper, RandomUtil } from '@xtsai/xai-utils';
import { CacheKeyHelper } from '../../cache';
import ms, { StringValue } from 'ms';
import { XAuthBuildPayloadOptions } from '../xauth.interfaces';
import { UIDGenerator } from '../../utils';

/**
 * static methods in xai-core
 */
export class XAuthHelper {
  /**
   *
   * @param user
   * @param options
   * @returns
   */
  static async buildAccessPayload(
    user: IUser,
    options: XAuthBuildPayloadOptions = {},
  ): Promise<JwtAccessPayload> {
    const { id, clit, username, userno, nickname, acctype } = user;
    const { state = RandomUtil.randomState(), version = '1' } = options;
    const jti = await UIDGenerator.createJti(20);
    const payload: JwtAccessPayload = {
      id,
      version,
      jti,
      clit,
      username: nickname ?? username,
      cid: userno,
      nonce: state,
      acctype,
    };

    return payload;
  }

  /**
   *
   * 加密用户密码
   * @param password
   * @returns string
   */
  static async encryptPassword(password: string): Promise<string> {
    return BcryptHelper.encryptPassword(password);
  }

  /**
   *
   * @param password string
   * @param encrypted 's0/\/\P4$$w0rD'
   * @returns boolean
   */
  static async comparePassword(
    password: string = '',
    encrypted: string = '',
  ): Promise<boolean> {
    return await BcryptHelper.validPassword(password, encrypted);
  }

  /**
   *
   * @param id user id
   * @param clit client id
   * @param acctype user accountType
   * @returns string
   */
  static getTokenCacheKey(
    id: number,
    clit: string = '_',
    acctype?: AccountType,
  ): string {
    return CacheKeyHelper.buildAccessTokenKey(id, clit, acctype);
  }

  /**
   * 将ms 数值或 1d 转换成 seconds
   * @param val number | string
   * @returns seconds
   */
  static convertDurationVolumeToSeconds(val: StringValue): number {
    if (/[\d]+$/.test(val)) return Math.floor(parseInt(val) / 1000);

    const converted = ms(val);
    return Math.floor(converted / 1000);
  }
}
