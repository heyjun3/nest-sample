import {
  ArgumentsHost,
  ExceptionFilter,
  Catch,
  HttpException,
} from '@nestjs/common';

@Catch()
export class ReleaseFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    console.warn('response ok?', response.ok);
    return;
  }
}
