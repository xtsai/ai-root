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
