import { XaiJwtSignOptions } from './xauth.config.schema';

// XAuth config
export const AUTH_BASE_SCHEMA_KEY = 'auth';
export const AUTH_JWT_SCHEMA_KEY = 'auth.jwt';

export const defaultJwtAlgorithm = 'HS256';
export const defaultXaiSignOptions: XaiJwtSignOptions = {
  issuer: 'Xtsai',
  subject: 'xai-admin',
  audience: 'xai-adminui',
};
