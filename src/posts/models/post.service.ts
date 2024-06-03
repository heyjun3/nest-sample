import { Injectable } from '@nestjs/common';

import { Post } from './post.model';

@Injectable()
export class PostsService {
  private readonly posts: Post[] = [];

  findAll(authorId: string): Post[] {
    return this.posts.filter((post) => post.id == authorId);
  }
}
