import {
  Args,
  Resolver,
  Query,
  Mutation,
  InputType,
  Field,
  ID,
} from '@nestjs/graphql';

import { Author } from './author.model';
import { AuthorsService } from './authors.service';
import { PostsService } from 'src/posts/models/post.service';
import { IsUUID } from 'class-validator';

@InputType()
class AuthorInput {
  @Field(() => ID)
  @IsUUID()
  id!: string;
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

  @Mutation(() => Author)
  async createAuthor(): Promise<Author> {
    return await this.authsService.createAuthor();
  }
}
