import { AccountType, TokenUserCache } from '@tsailab/core-types';
import { BcryptHelper } from '@xtsai/xai-utils';
import { CacheKeyHelper } from '../../cache';
import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from '@tsailab/ioredis-mq';

/**
 * @public xtsai-core
 *
 */
@Injectable()
export class XAuthCacheService {
  private logger = new Logger(`@xtsai-core: ${XAuthCacheService.name}`);

  constructor(private readonly redisService: RedisService) {}

  async checkoutTokenUser(
    uid: number,
    clit: string = '_',
    acctype?: AccountType,
  ): Promise<TokenUserCache | null> {
    const k = this.getTokenCacheKey(uid, clit, acctype);
    const cache = await this.redisService.getData(k);
    if (!cache) return null;
    return cache as any as TokenUserCache;
  }

  /**
   *
   * @param id user id
   * @param clit client id
   * @param acctype user accountType
   * @returns string
   */
  getTokenCacheKey(
    id: number,
    clit: string = '_',
    acctype?: AccountType,
  ): string {
    return CacheKeyHelper.buildAccessTokenKey(id, clit, acctype);
  }

  /**
   *
   * 加密用户密码
   * @param password
   * @returns string
   */
  async encryptPassword(password: string): Promise<string> {
    return BcryptHelper.encryptPassword(password);
  }

  /**
   * compare password
   * @param password string
   * @param encrypted 's0/\/\P4$$w0rD'
   * @returns boolean
   */
  async comparePassword(
    password: string = '',
    encrypted: string = '',
  ): Promise<boolean> {
    return await BcryptHelper.validPassword(password, encrypted);
  }

  /**
   * 延长token cache expires
   * expires <-1 or =0 删除 ，expires>0 延长
   * expires = -1 永不过期
   * @param user session user partical includes [id,clit?,acctype?]
   * @param expires number 过期时间 second
   */
  async updateTokenExpires(
    user: { id: number; clit?: string; acctype?: AccountType },
    expires: number,
  ) {
    const { id, clit, acctype } = user;
    const k = await this.getTokenCacheKey(id, clit, acctype);

    let ex = expires;
    if (ex < -1 || ex === 0) {
      ex = -2;
    }
    await this.redisService.setExpires(k, ex);
  }
}
