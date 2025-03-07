/**
 * bizDetail will biz logic description
 *
 */
export interface BaseAuditLog {
  biztype: string;
  bizDetail: string;
  uid: number;
  clientId: string;
  username: string;
  ip: string;
  locked?: boolean;
}

export interface AuditDetailJson {
  response?: any;
  body?: any;
  header?: any;
  [k: string]: any;
}

export interface AuditErrorJson {
  code?: number | string;
  message?: string;
  stack?: any;
  [k: string]: any;
}

export interface AuditLogCache extends BaseAuditLog {
  cacheId: string;
  detailJson: AuditDetailJson;
  errorJson?: AuditErrorJson;
  [k: string]: any;
}
