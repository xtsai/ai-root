import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { SkipTransformPropertyName } from '../decotrators';
import { APIHttpStatus, APIResponse } from '@tsailab/core-types';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class ApiTransfromInterceptor implements NestInterceptor {
  protected logger = new Logger(`@xtsai-core:${ApiTransfromInterceptor.name}`);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { user: _u } = context.switchToHttp().getRequest();

    // TODO user

    const ignored = context.getHandler()[SkipTransformPropertyName];

    return ignored
      ? next.handle()
      : next.handle().pipe(
          map((data: any): APIResponse<any> => {
            return {
              code: APIHttpStatus.OK,
              message: 'Success',
              result: instanceToPlain(data),
            };
          }),
        );
  }
}
