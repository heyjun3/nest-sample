import { Inject, Injectable, Module, Scope } from '@nestjs/common';
import {
  Args,
  Field,
  Int,
  ObjectType,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import * as DataLoader from 'dataloader';

@ObjectType()
export class Book {
  @Field(() => String)
  name!: string;

  @Field(() => Int)
  price!: number;

  comment!: string;
}

interface CommentFetcher {
  fetchComment(id: string): Promise<string>;
}

@Resolver(() => Book)
@Injectable({ scope: Scope.REQUEST })
export class BookResolver {
  constructor(
    @Inject('COMMENT_FETCH') private readonly commentFetcher: CommentFetcher,
  ) {}

  @Query(() => [Book])
  async books(): Promise<Book[]> {
    return [
      {
        name: 'test book 1',
        price: 100,
        comment: 'test comment 1',
      },
      {
        name: 'test book 2',
        price: 200,
        comment: 'test comment 2',
      },
    ];
  }

  @ResolveField(() => String)
  async comment(
    @Parent() book: Book,
    @Args('input') id: string,
  ): Promise<string> {
    return await this.commentFetcher.fetchComment(book.comment);
  }
}

@Injectable({ scope: Scope.REQUEST })
export class CommentFetch {
  private fetchCommentLoader: DataLoader<{ id: string }, string>;
  constructor() {
    this.fetchCommentLoader = new DataLoader(
      async (ids: readonly { id: string }[]) => {
        console.warn('exec loader');
        return ids.map(({ id }) => id + ' test');
      },
    );
  }

  async fetchComment(id: string): Promise<string> {
    return await this.fetchCommentLoader.load({ id });
  }
}

@Module({
  providers: [
    BookResolver,
    {
      provide: 'COMMENT_FETCH',
      useClass: CommentFetch,
    },
  ],
})
export class BookModule {}
