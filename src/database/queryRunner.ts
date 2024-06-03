import { Global, Module, Scope } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';
import { DataSource, QueryRunner } from 'typeorm';

export const QUERY_RUNNER = 'QUERY_RUNNER';

const queryRunnerProvider = {
  provide: QUERY_RUNNER,
  scope: Scope.REQUEST,
  useFactory: async (datasource: DataSource, ctx?): Promise<QueryRunner> => {
    console.warn('create query runner');
    const queryRunner = datasource.createQueryRunner();
    console.warn('query runner data', queryRunner.data);
    queryRunner.data['aaa'] = 'aaa';
    await queryRunner.connect();
    if (ctx) {
      ctx['queryRunner'] = queryRunner;
    }
    return queryRunner;
  },
  inject: [DataSource, CONTEXT],
};

@Global()
@Module({
  providers: [queryRunnerProvider],
  exports: [queryRunnerProvider],
})
export class QueryRunnerModule {}
