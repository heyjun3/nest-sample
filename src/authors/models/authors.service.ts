import { Inject, Injectable } from '@nestjs/common';

import { Author } from './author.model';
import { QUERY_RUNNER } from 'src/database/queryRunner';
import { QueryRunner, Repository } from 'typeorm';
import { AUTHOR_REPOSITORY } from './authors.repository';
import { Post } from 'src/posts/models/post.model';
import { randomUUID } from 'crypto';

@Injectable()
export class AuthorsService {
  private readonly authors: Author[];
  constructor(
    @Inject(QUERY_RUNNER) private queryRunner: QueryRunner,
    @Inject(AUTHOR_REPOSITORY) private authorRepository: Repository<Author>,
  ) {}

  async findOneById(id: string): Promise<Author> {
    const r = await this.authorRepository.findOne({
      where: { id },
      // relations: { posts: true },
    });
    console.warn(r);
    // throw Error();
    // await r.posts;
    return r;
  }

  async createAuthor(): Promise<Author> {
    const author = Author.of({
      id: randomUUID(),
      firstName: 'testfirst',
      lastName: 'testlast',
    });

    const post = new Post();
    post.id = randomUUID();
    post.authorId = author.id;
    post.title = 'testtitle';
    post.votes = 1;
    author.posts = [post];

    return await this.authorRepository.save(author);
  }
}
