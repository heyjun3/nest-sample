import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import {
  CanActivate,
  Controller,
  ExecutionContext,
  Get,
  HttpStatus,
  Inject,
  Injectable,
  Res,
  UseGuards,
} from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { QUERY_RUNNER } from 'src/database/queryRunner';

import {
  GetAuthorRequest,
  GetAuthorResponse,
} from 'src/gen/api/author/v1/author_pb';
import { QueryRunner } from 'typeorm';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(QUERY_RUNNER) private queryRunner: QueryRunner) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const type = context.getType();
    if (type == 'rpc') {
      const ctx = context.switchToRpc().getContext<Metadata>();
      const auth = ctx.getMap()['auth'];
      console.warn('getmap', ctx.getMap());
      console.warn('auth', auth);
    }
    return true;
  }
}

@Controller()
@UseGuards(AuthGuard)
export class AuthorController {
  @GrpcMethod('AuthorService', 'GetAuthor')
  getAuthor(
    data: GetAuthorRequest,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): GetAuthorResponse {
    console.warn('data', data);
    // console.warn('meta', metadata)
    console.warn('Auth', metadata.get('Auth'));
    const author = new GetAuthorResponse({
      author: {
        id: 'test_id',
        fullname: 'test_fullname',
      },
    });
    return author;
  }
}

@Controller('api')
export class AuthroControllerV2 {
  @Get('author')
  getAuthor(@Res() res: Response) {
    const r = new GetAuthorResponse({
      author: {
        id: 'test_id_v2',
        fullname: 'test_name',
      },
    });
    console.warn(Buffer.from(r.toBinary()));
    res.write(Buffer.from(r.toBinary()));
    res.status(HttpStatus.OK).send();
  }
}
