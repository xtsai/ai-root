import { XAuthHelper } from './xauth.helper';

import { StringValue } from 'ms';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import { Injectable, Logger } from '@nestjs/common';

import {
  AUTH_BASE_SCHEMA_KEY,
  AUTH_JWT_SCHEMA_KEY,
  defaultJwtAlgorithm,
} from '../xauth.constants';
import { ConfigService } from '@nestjs/config';
import { XAuthJwtConfigSchema } from '../xauth.config.schema';
import { BizException } from '../../exceptions';

@Injectable()
export class XAuthJwtOptionsFactory implements JwtOptionsFactory {
  private logger = new Logger(`@xtsai-core:${XAuthJwtOptionsFactory.name}`);

  private debug: boolean = false;
  private expireinSeconds: number = 24 * 60 * 60;

  private opts: XAuthJwtConfigSchema;

  constructor(private readonly configService: ConfigService) {
    this.debug = configService.get<boolean>(
      `${AUTH_BASE_SCHEMA_KEY}.debug`,
      false,
    );
    this._loadConfigOptions();
  }

  get ignoreExpiration(): boolean {
    return this.opts?.verifyOptions?.ignoreExpiration ?? false;
  }

  get secretOrPrivateKey(): string {
    return this.opts?.secret ?? this.opts?.privateKey;
  }

  /**
   * Redis Cache times
   */
  getCacheExpireins(): number {
    return this.expireinSeconds;
  }

  get signleton(): boolean {
    return !!this.opts.singleton;
  }

  /**
   * jwt modiule options
   * @returns JwtModuleOptions
   */
  async createJwtOptions(): Promise<JwtModuleOptions> {
    const xjwtOpts = await this._loadConfigOptions();

    const { secret, publicKey, privateKey, signOptions, verifyOptions } =
      xjwtOpts;
    const jwtOptions: JwtModuleOptions = {};
    if (secret) {
      jwtOptions.secret = secret;
    }
    if (privateKey) jwtOptions.privateKey = privateKey;
    if (publicKey) jwtOptions.publicKey = publicKey;
    if (signOptions && Object.keys(signOptions).length) {
      jwtOptions.signOptions = {};
      Object.keys(signOptions).forEach((k: string) => {
        if (signOptions[k]) {
          jwtOptions.signOptions[k] = signOptions[k];
        }
      });
    }

    if (verifyOptions && Object.keys(verifyOptions).length) {
      jwtOptions.verifyOptions = {};
      Object.keys(verifyOptions).forEach((k: string) => {
        if (verifyOptions[k] !== null && verifyOptions[k] !== undefined) {
          jwtOptions.verifyOptions[k] = verifyOptions[k];
        }
      });
    }

    this.debuglog('Loaded XAuth JWT configuration: ', jwtOptions);

    return jwtOptions;
  }

  private debuglog(message: any, ...optionalParams: [...any, string?]) {
    if (this.debug) this.logger.verbose(message, ...optionalParams);
  }

  private async _loadConfigOptions() {
    const ymlOpts = await this.configService.get<XAuthJwtConfigSchema | null>(
      AUTH_JWT_SCHEMA_KEY,
      null,
    );
    if (!ymlOpts) {
      const error = `Loading XAuth JWT Configuration [${AUTH_JWT_SCHEMA_KEY}] failure.`;
      throw BizException.ConfigurationError(error);
    }
    const {
      singleton = false,
      version = '1',
      expirein,
      algorithm = defaultJwtAlgorithm,
      secret,
      privateKey,
      publicKey,
      signOptions,
      verifyOptions,
    } = ymlOpts as any as XAuthJwtConfigSchema;

    if (!secret?.length && !privateKey?.length) {
      throw BizException.ConfigurationError(
        `XAuth JWT Configuration parameters at least one of [secret,privateKey]`,
      );
    }
    if (expirein && expirein !== null) {
      this.expireinSeconds = XAuthHelper.convertDurationVolumeToSeconds(
        expirein as any as StringValue,
      );
    }

    this.opts = {
      singleton,
      version,
      algorithm,
      secret: secret,
      privateKey,
      publicKey,
      signOptions,
      verifyOptions,
    };

    return this.opts;
  }
}
