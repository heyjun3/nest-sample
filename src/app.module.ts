import { Module, Scope } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthorsModule } from './authors/models/authors.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
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

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...datasourceConfig,
        entities: [Author],
      }),
    }),
    AuthorsModule,
    QueryRunnerModule,
    AuthorRepositoryModule,
  ],
  providers: [
    LoggingPlugin,
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
  ],
})
export class AppModule {}
