import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import {
  IUserSession,
  LotoHeaderEnum,
  LotoHeadersType,
} from '@tsailab/core-types';

import * as requestIP from 'request-ip';
import { parseClientType, UIDGenerator } from '../utils';

export const LotoHeaders = createParamDecorator(
  async (props: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const { user } = request;

    let reqid: string = request.headers[LotoHeaderEnum.X_Loto_Reqid] ?? '';
    if (!reqid?.length) {
      reqid = await UIDGenerator.genRequestId();
    }

    const info: LotoHeadersType = {
      ip: requestIP.getClientIp(request) ?? '',
      uid: user?.id,
      uno: user?.userno,
      username: user?.username ?? '',
      reqid,
      cliid: request.headers[LotoHeaderEnum.X_Loto_Key],
      session: user ? (user as unknown as IUserSession) : undefined,
      LotoHeaderKeyType: '',
      orgno: user?.orgno ?? '',
    };
    if (typeof info.cliid === 'string') {
      const clit = parseClientType(info.cliid as string);
      if (info.cliid?.length) {
        info.clit = clit;
      }
    }

    return info && props ? info[props as string] : info;
  },
);
