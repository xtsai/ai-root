import { Inject, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  AccountType,
  IUser,
  JwtAccessPayload,
  TokenUserCache,
} from '@tsailab/core-types';
import { RedisService } from '@tsailab/ioredis-mq';
import { XAuthHelper, XAuthJwtOptionsFactory } from '@xtsai/core';

@Injectable()
export class AuthService {
  protected logger = new Logger(`@xai-admin:${AuthService.name}`);
  @Inject(JwtService)
  private readonly jwtService: JwtService;

  @Inject(RedisService)
  private readonly redisService: RedisService;

  @Inject(XAuthJwtOptionsFactory)
  private readonly xOptsFactory: XAuthJwtOptionsFactory;
  constructor() {}

  /**
   * Create JWT token for system user
   * @param user IUser
   * @param state
   * @returns token string
   */
  async createAccessToken(user: IUser, state?: string): Promise<string> {
    const { id, clit, acctype } = user;
    const payload = await XAuthHelper.buildAccessPayload(user, { state });

    const key = XAuthHelper.getTokenCacheKey(id, clit, acctype);
    const token = await this.jwtService.sign(payload);

    const tokenUser: TokenUserCache = {
      ...user,
      token,
    };

    const ex = await this.xOptsFactory.getCacheExpireins();
    this.logger.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>', ex);
    await this.redisService.setData(key, tokenUser, ex);

    return token;
  }

  /**
   * 获取缓存中登录token 用户信息
   * @param uid
   * @param clit
   * @param acctype
   * @returns
   */
  async checkoutTokenUser(
    uid: number,
    clit: string = '_',
    acctype?: AccountType,
  ): Promise<TokenUserCache | null> {
    const k = XAuthHelper.getTokenCacheKey(uid, clit, acctype);
    const cache = await this.redisService.getData(k);
    if (!cache) return null;
    return cache as any as TokenUserCache;
  }

  async decryptToken(token: string): Promise<JwtAccessPayload> {
    return await this.jwtService.decode<JwtAccessPayload>(token);
  }
}
