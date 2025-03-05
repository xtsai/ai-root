export interface MysqlOptionsSchema {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  logging?: boolean;
  synchronize?: boolean;
  autoLoadEntities?: boolean;
}

export interface SwapperOptionSchema {
  name?: string;
  enabled?: boolean;
  wiki: string;
  docDesc: string;
  email?: string;
}

export interface XAppPkgSchema {
  name: string;
  version: string;
  description?: string;
  license?: string;
  author?:
    | string
    | {
        name: string;
        email: string;
        url: string;
      };
  homepage?: string;
  repository?:
    | string
    | {
        type: 'git' | string;
        url: string;
      };
}

export interface XaiModuleRouteType {
  name: string;
  modulePath: string;
  desc?: string;
  [k: string]: string;
}

export type XaiModuleRouteKeyType =
  | 'System'
  | 'Common'
  | 'Agent'
  | 'Chat'
  | string;

export type XaiModuleRouteMapType = Record<
  XaiModuleRouteKeyType,
  XaiModuleRouteType
>;

/**
 * @public
 * Cookie config:
 *  secret: boolean ,string or string[]
 *    Enables the Secure Set-Cookie attribute.
 *    When enabled, clients will only send the cookie back if the browser has a HTTPS connection.
 *  maxAge: The cookie storage model specification states that if both expires and maxAge are set,
 *      then maxAge takes precedence, but it is possible not all clients by obey this,
 *      so if both are set, they should point to the same date and time
 * @see https://www.npmjs.com/package/cookie
 *
 */
export interface XAppCookieOptionSchema {
  secret?: string;
  httpOnly?: boolean;
  secure?: boolean;
  maxAge: number;
  path?: string;
  sameSite?: 'strict' | 'lax' | 'none';
  [k: string]: any;
}
