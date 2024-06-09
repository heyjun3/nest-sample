import { Global, Module, Scope } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';
import { DataSource, QueryRunner } from 'typeorm';

export const QUERY_RUNNER = 'QUERY_RUNNER';

const queryRunnerProvider = {
  provide: QUERY_RUNNER,
  scope: Scope.REQUEST,
  useFactory: async (datasource: DataSource, ctx): Promise<QueryRunner> => {
    const queryRunner = datasource.createQueryRunner();
    await queryRunner.connect();
    if (ctx) {
      ctx['queryRunner'] = queryRunner;
    }
    ctx.req.res.on('close', async () => {
      console.warn('close response');
      if (queryRunner.isReleased) {
        return;
      }
      console.warn('release query runner');
      await queryRunner.release();
    });
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
