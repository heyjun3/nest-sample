import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { QUERY_RUNNER } from 'src/database/queryRunner';
import { QueryRunner } from 'typeorm';

@Injectable()
export class ReleaseQueryRunnerInterceptor implements NestInterceptor {
  constructor(@Inject(QUERY_RUNNER) private queryRunner: QueryRunner) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      tap(async () => {
        if (this.queryRunner.isReleased) {
          return;
        }

        console.warn('interceptor context', context.getType());
        if (context.getType<string>() !== 'graphql') {
          await this.queryRunner.release();
        }
      }),
    );
  }
}
