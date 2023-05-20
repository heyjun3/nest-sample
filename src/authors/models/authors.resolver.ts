import {
  Args,
  Int,
  Resolver,
  Query,
  ResolveField,
  Parent,
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
  author(@Args('id', { type: () => Int }) id: number): Author {
    return this.authsService.findOneById(id);
  }

  @ResolveField()
  async posts(@Parent() author: Author) {
    const { id } = author;
    return this.postsService.findAll(id);
  }
}
