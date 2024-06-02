import {
  Args,
  Int,
  Resolver,
  Query,
  ResolveField,
  Parent,
  Mutation,
} from '@nestjs/graphql';

import { Author } from './author.model';
import { AuthorsService } from './authors.service';
import { PostsService } from 'src/posts/models/post.service';

@Resolver(Author)
export class AuthorsResolver {
  constructor(
    private authsService: AuthorsService,
    private postsService: PostsService,
  ) {}

  @Query(() => Author)
  async author(@Args('id', { type: () => Int }) id: number): Promise<Author> {
    return await this.authsService.findOneById(id);
  }

  @Mutation(() => Author)
  async createAuthor(): Promise<Author> {
    return await this.authsService.createAuthor();
  }

  @ResolveField()
  async posts(@Parent() author: Author) {
    const { id } = author;
    return this.postsService.findAll(id);
  }
}
