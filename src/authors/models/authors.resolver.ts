import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';

import { Author } from './author.model';
import { AuthorsService } from './authors.service';
import { PostsService } from 'src/posts/models/post.service';

@Resolver(() => Author)
export class AuthorsResolver {
  constructor(
    private authsService: AuthorsService,
    private postsService: PostsService,
  ) {}

  @Query(() => Author)
  async author(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Author> {
    return await this.authsService.findOneById(id);
  }

  @Mutation(() => Author)
  async createAuthor(): Promise<Author> {
    return await this.authsService.createAuthor();
  }

  // @ResolveField()
  // async post(@Parent() author: Author) {
  //   const { id } = author;
  //   return this.postsService.findAll(id);
  // }
}
