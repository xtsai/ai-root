// https://github.com/auth0/node-jsonwebtoken#algorithms-supported
export type XAuthAlgorithm =
  | 'HS256'
  | 'HS384'
  | 'HS512'
  | 'RS256'
  | 'RS384'
  | 'RS512'
  | 'ES256'
  | 'ES384'
  | 'ES512'
  | 'PS256'
  | 'PS384'
  | 'PS512'
  | 'none';

export type XaiJwtSignOptions = {
  issuer?: string | undefined;
  subject?: string | undefined;
  audience?: string | undefined;
};

export type XaiJwtVerifyOptions = {
  complete?: boolean;
  issuer?: string | string[] | undefined;
  ignoreExpiration?: boolean | undefined;
  ignoreNotBefore?: boolean | undefined;
};

/**
 * The Xai auth module configuration schema
 */
export type XAuthJwtConfigSchema = {
  singleton?: boolean;
  version?: string;
  expirein?: string | number;
  algorithm?: XAuthAlgorithm | undefined;
  secret?: string;
  publicKey?: string;
  privateKey?: string;
  signOptions?: XaiJwtSignOptions;
  verifyOptions?: XaiJwtVerifyOptions;
};
