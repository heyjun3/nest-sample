import { Global, Module, Scope } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';

export const QUERY_RUNNER = 'QUERY_RUNNER';

const queryRunnerProvider = {
  provide: QUERY_RUNNER,
  scope: Scope.REQUEST,
  useFactory: async (datasource: DataSource): Promise<QueryRunner> => {
    console.warn('create query runner');
    const queryRunner = datasource.createQueryRunner();
    await queryRunner.connect();
    return queryRunner;
  },
  inject: [DataSource],
};

@Global()
@Module({
  providers: [queryRunnerProvider],
  exports: [queryRunnerProvider],
})
export class QueryRunnerModule {}
