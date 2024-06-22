import {
  Args,
  Resolver,
  Query,
  Mutation,
  InputType,
  Field,
  ID,
  ResolveField,
  Parent,
  Int,
} from '@nestjs/graphql';

import { Author } from './author.model';
import { AuthorsService } from './authors.service';
import { PostsService } from 'src/posts/models/post.service';
import { IsUUID } from 'class-validator';
import { Post } from 'src/posts/models/post.model';

@InputType()
class AuthorInput {
  @Field(() => ID)
  @IsUUID()
  id!: string;
}

@InputType()
class PostInput {
  @Field(() => Int)
  limit!: number;

  @Field(() => Int)
  offset!: number;
}

@Resolver(() => Author)
export class AuthorsResolver {
  constructor(
    private authsService: AuthorsService,
    private postsService: PostsService,
  ) {}

  @Query(() => Author)
  async author(@Args('input') input: AuthorInput): Promise<Author> {
    return await this.authsService.findOneById(input.id);
  }

  @ResolveField(() => [Post])
  async authorPost(@Parent() author: Author, @Args('input') input: PostInput) {
    console.warn('input', input);
    const { id } = author;
    return this.postsService.findAll(id);
  }

  @Mutation(() => Author)
  async createAuthor(): Promise<Author> {
    return await this.authsService.createAuthor();
  }
}
