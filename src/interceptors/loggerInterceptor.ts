import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    console.warn('Before...');
    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => console.warn('After...', Date.now() - now)));
  }
}

export class LoggingInterceptorV2 implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    console.warn('Before2...');
    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => console.warn('After2...', Date.now() - now)));
  }
}
