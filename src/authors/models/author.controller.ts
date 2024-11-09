import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { create } from '@bufbuild/protobuf';

import {
  GetAuthorRequest,
  GetAuthorResponse,
  GetAuthorResponseSchema,
} from 'src/gen/api/author/v1/author_pb';

@Controller()
export class AuthorController {
  @GrpcMethod('AuthorService', 'GetAuthor')
  getAuthor(
    data: GetAuthorRequest,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): GetAuthorResponse {
    console.warn(data);
    const author = create(GetAuthorResponseSchema, {
      author: {
        id: 'test_id',
        fullname: 'test_fullname',
      },
    });
    return author;
  }
}
