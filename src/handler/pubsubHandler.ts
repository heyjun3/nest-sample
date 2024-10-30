import { Controller } from '@nestjs/common';
import {
  BaseRpcContext,
  Ctx,
  CustomTransportStrategy,
  MessagePattern,
  Payload,
  RequestContext,
  Server,
} from '@nestjs/microservices';
import { Message, PubSub, Subscription } from '@google-cloud/pubsub';

type GoogleCloudPubSubServerOption = {
  projectId: string;
  subscribers: string[];
};

export class GoogleCloudPubSubServer
  extends Server
  implements CustomTransportStrategy
{
  private client: PubSub;
  private subscriberIds: string[];
  private subscribers: Subscription[] = [];

  constructor(option: GoogleCloudPubSubServerOption) {
    super();
    if (!option.subscribers.length) {
      throw Error('One or more subscribers required.');
    }
    this.subscriberIds = option.subscribers;
    this.client = new PubSub({ projectId: option.projectId });
  }

  async listen(callback: () => void) {
    this.logger.warn('listen handler', [...this.messageHandlers.keys()]);
    for (const id of this.subscriberIds) {
      const sub = this.client.subscription(id);
      sub
        .on('message', async (message: Message) => {
          await this.handleMessage(message);
          message.ack();
        })
        .on('error', (err: any) => this.logger.error(err))
        .on('close', () => this.logger.warn('close'));
      this.subscribers.push(sub);
    }
    callback();
  }

  async close() {
    console.warn('close');
    for (const sub of this.subscribers) {
      await sub.close();
    }
    await this.client.close();
  }

  async handleMessage(message: Message) {
    try {
      const eventName = message?.attributes?.eventName;
      if (!eventName) {
        this.logger.warn('not found event name.');
        return;
      }
      const handler = this.messageHandlers.get(eventName);
      if (handler) {
        const ctx = new BaseRpcContext([eventName]);
        await handler(message, ctx);
        const queryRunner = (ctx as any).queryRunner;
        if (queryRunner) {
          await queryRunner.release();
          console.warn('release query runner');
        }
        return;
      }
      this.logger.warn('not suppoert event name: ', eventName);
      return;
    } catch (e) {
      this.logger.error(e);
      message.nack();
    }
  }
}

@Controller()
export class MessageHandler {
  @MessagePattern('author.created')
  createAuthor(@Payload() message: Message, @Ctx() ctx: any) {
    const { data } = message;
    console.warn('create author');
    console.warn(JSON.parse(data.toString()));
  }

  @MessagePattern('post.created')
  createPost(@Payload() message: Message, @Ctx() ctx: any) {
    const { data } = message;
    console.warn('create post');
    console.warn(JSON.parse(data.toString()));
  }
}
