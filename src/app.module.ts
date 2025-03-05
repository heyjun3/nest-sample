import { Module, Scope } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthorsModule } from './authors/models/authors.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import {
  LoggingInterceptor,
  LoggingInterceptorV2,
} from './interceptors/loggerInterceptor';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueryRunnerModule } from './database/queryRunner';
import { ReleaseQueryRunnerInterceptor } from './interceptors/releaseQueryRunner';
import { LoggingPlugin } from './apollo/loggingPlugin';
import { Author } from './authors/models/author.model';
import { datasourceConfig } from './database/datasource';
import { AuthorRepositoryModule } from './authors/models/authors.repository';
import { Post } from './posts/models/post.model';
import { ReleaseFilter } from './exceptionFilter/releaseFilter';
import { AuthorSubscriber } from './database/subscriber';
import { YogaDriver, YogaDriverConfig } from '@graphql-yoga/nestjs';
import { MessageHandler } from './handler/pubsubHandler';
import { User, UserRepository, UserRepositoryModule } from './users/user.model';
import { UserController } from './users/controller';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      path: '/graphql',
    }),
    // GraphQLModule.forRoot<YogaDriverConfig>({
    //   driver: YogaDriver,
    //   autoSchemaFile: 'schema.gql',
    //   path: '/graphql',
    // }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...datasourceConfig,
        entities: [Author, Post, User],
      }),
    }),
    AuthorsModule,
    QueryRunnerModule,
    AuthorRepositoryModule,
    UserRepositoryModule,
  ],
  controllers: [UserController],
  providers: [
    LoggingPlugin,
    AuthorSubscriber,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptorV2,
    },
    {
      provide: APP_INTERCEPTOR,
      scope: Scope.REQUEST,
      useClass: ReleaseQueryRunnerInterceptor,
    },
    {
      provide: APP_FILTER,
      scope: Scope.REQUEST,
      useClass: ReleaseFilter,
    },
  ],
})
export class AppModule {}
