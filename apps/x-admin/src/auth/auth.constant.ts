import { XAppCookieOptionSchema } from '@xtsai/core';

export const defaultCookieOpts: XAppCookieOptionSchema = {
  secret: 'xtsai-admin',
  httpOnly: true,
  maxAge: 60 * 5 * 1000,
  secure: true,
  SameSite: 'Lax',
  path: '/',
};
