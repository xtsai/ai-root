import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { IUser, JwtAccessPayload } from '@tsailab/core-types';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { XAuthJwtOptionsFactory } from '../services/xauth.jwt.option.factory';
import { XAuthCacheService } from '../services';
import { PassportStrategy } from '@nestjs/passport';

/**
 * PassportStrategy will dynamic secret
 */
@Injectable()
export class XAuthJwtStrategy extends PassportStrategy(Strategy) {
  private logger = new Logger(`@xtsai-core: ${XAuthJwtStrategy.name}`);
  constructor(
    private readonly xJwtFactory: XAuthJwtOptionsFactory,
    private readonly xauthCache: XAuthCacheService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: xJwtFactory.ignoreExpiration,
      secretOrKey: xJwtFactory.secretOrPrivateKey,
    });
  }

  /**
   *
   * @param payload JwtAccessPayload
   * @param done callback function
   * @returns user IUser
   */
  async validate(payload: JwtAccessPayload, done: VerifiedCallback) {
    const { id, clit, acctype } = payload;

    const cacheToken = await this.xauthCache.checkoutTokenUser(
      id,
      clit,
      acctype,
    );
    if (!cacheToken)
      return done(new UnauthorizedException('登录信息已失效'), null);

    const { token: _t, ...user } = cacheToken;
    // if (this.xJwtFactory.signleton) {
    //   const deToken = await this.xauthCache.decryptToken(token);
    //   if (jti && jti !== deToken?.jti) {
    //     return done(new UnauthorizedException(`当前账号已在其他客户端登录!`));
    //   }
    // }

    //extend the token cache expires
    await this.xauthCache.updateTokenExpires(
      { id, clit, acctype },
      this.xJwtFactory.getCacheExpireins(),
    );

    return done(null, { ...user } as IUser);
  }
}
