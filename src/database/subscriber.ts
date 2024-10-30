import { PubSub, Topic } from '@google-cloud/pubsub';
import { Author } from 'src/authors/models/author.model';
import { Post } from 'src/posts/models/post.model';
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  TransactionCommitEvent,
  TransactionRollbackEvent,
  UpdateEvent,
} from 'typeorm';

type SaveEvent<T> = InsertEvent<T> | UpdateEvent<T>;

@EventSubscriber()
export class AuthorSubscriber implements EntitySubscriberInterface<Author> {
  // メモリリークするかも
  private entityMap: Map<string, SendEvent[]> = new Map();
  private pubsubClient: PubSub;
  private publisher: Topic;

  constructor(dataSource: DataSource) {
    this.pubsubClient = new PubSub({ projectId: 'gsheet-355401' });
    this.publisher = this.pubsubClient.topic('nest');
    dataSource.subscribers.push(this);
    setInterval(() => console.warn(this.entityMap.size), 1000);
  }

  private addMap(event: SaveEvent<any>) {
    const id = event.queryRunner.data.id;
    const entity = handleEntity(event);
    if (!entity) {
      return;
    }
    const events = this.entityMap.get(id);
    if (events) {
      this.entityMap.set(id, [...events, entity]);
    } else {
      this.entityMap.set(id, [entity]);
    }
  }

  afterInsert(event: InsertEvent<any>): Promise<any> | void {
    this.addMap(event);
    // console.warn('AFTER AUTHOR INSERTED: ', handleEntity(event))
  }

  afterUpdate(event: UpdateEvent<any>): Promise<any> | void {
    this.addMap(event);
    // console.warn('AFTER AUTHOR UPDATED: ', event.entity)
  }
  afterTransactionCommit(event: TransactionCommitEvent): Promise<any> | void {
    const id = event.queryRunner.data.id;
    try {
      const events = this.entityMap.get(id);
      if (!events) {
        return;
      }
      const messages = events.map((event) => {
        return this.publisher.publishMessage({
          data: Buffer.from(JSON.stringify(event)),
          attributes: {
            eventName: event.eventName,
          },
        });
      });
      return Promise.all(messages);
    } catch (e) {
      console.error(e);
    } finally {
      this.entityMap.delete(id);
    }
  }
  afterTransactionRollback(
    event: TransactionRollbackEvent,
  ): Promise<any> | void {
    const id = event.queryRunner.data.id;
    this.entityMap.delete(id);
  }
}

type SendEvent = {
  id: string;
  eventName: string;
};

const handleEntity = (event: SaveEvent<any>): SendEvent | undefined => {
  console.warn('query runner id', event.queryRunner.data.id);
  if (event.entity instanceof Author) {
    return {
      id: event.entity.id,
      eventName: 'author.created',
    };
  }
  if (event.entity instanceof Post) {
    return {
      id: event.entity.id,
      eventName: 'post.created',
    };
  }
};
