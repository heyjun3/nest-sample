import {
  ApolloServerPlugin,
  BaseContext,
  GraphQLRequestListener,
} from '@apollo/server';
import { Plugin } from '@nestjs/apollo';

@Plugin()
export class LoggingPlugin implements ApolloServerPlugin {
  async requestDidStart(): Promise<void | GraphQLRequestListener<BaseContext>> {
    console.warn('Reqeust started');
    return {
      async willSendResponse() {
        console.warn('Will send response');
      },
    };
  }
}
