import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((res) => {
        if (typeof res !== 'object') {
          return res;
        }
        const filteredResponse = instanceToPlain(res);
        return {
          error: false,
          message: filteredResponse.message || '',
          data: filteredResponse.data || {},
        };
      }),
    );
  }
}
