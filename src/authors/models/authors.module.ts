import {
  Injectable,
  MiddlewareConsumer,
  Module,
  NestMiddleware,
  NestModule,
} from '@nestjs/common';
import { AuthorsResolver } from './authors.resolver';
import { AuthorsService } from './authors.service';
import { PostsService } from 'src/posts/models/post.service';
import { AuthorRepositoryModule } from './authors.repository';
import { NameResolver } from './author.model';
import { AuthorController, AuthroControllerV2 } from './author.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    next();
  }
}

@Module({
  imports: [
    AuthorRepositoryModule,
    ClientsModule.register([
      {
        name: 'AUTHOR_CLIENT',
        transport: Transport.GRPC,
        options: {
          url: 'http://localhost:5000',
          package: 'api.author.v1',
          protoPath: join(__dirname, '../../../api/author/v1/author.proto'),
        },
      },
    ]),
  ],
  controllers: [AuthorController, AuthroControllerV2],
  providers: [AuthorsResolver, AuthorsService, PostsService, NameResolver],
})
export class AuthorsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
