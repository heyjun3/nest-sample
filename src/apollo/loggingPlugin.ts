import {
  ApolloServerPlugin,
  BaseContext,
  GraphQLRequestListener,
} from '@apollo/server';
import { Plugin } from '@nestjs/apollo';
import { QueryRunner } from 'typeorm';

@Plugin()
export class LoggingPlugin implements ApolloServerPlugin {
  async requestDidStart(): Promise<void | GraphQLRequestListener<BaseContext>> {
    console.warn('Reqeust started');
    return {
      async willSendResponse(context) {
        const queryRunner = context.contextValue?.['queryRunner'] as
          | QueryRunner
          | undefined;
        console.warn(
          'query runner in logging plugin',
          queryRunner?.data?.['aaa'],
        );

        if (!queryRunner) {
          console.warn('query runner is undefined');
          return;
        }
        if (queryRunner.isReleased) {
          console.warn('already released query runner');
          return;
        }
        console.warn('release query runner');
        await queryRunner.release();
        console.warn('Will send response');
      },
    };
  }
}
