import { IUser } from '@tsailab/core-types';

export interface XAuthLoginUser {
  account: string;
  password: string;
  code?: string;
  cookieValue?: string;
  [k: string]: any;
}

export interface XAuthToken<U = IUser> {
  token: string;
  expireAt: number;
  refreshToken?: string;
  userinfo: U;
}

export interface XAuthBuildPayloadOptions {
  state?: string;
  version?: string;
  encrypted?: boolean;
  encodeProperties?: string[];
}

export interface XAuthTokenUser {
  token: string;
  userinfo: IUser;
}
