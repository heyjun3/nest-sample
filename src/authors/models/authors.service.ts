import { Inject, Injectable } from '@nestjs/common';
import { Author, Name } from './author.model';
import { QUERY_RUNNER } from 'src/database/queryRunner';
import { QueryRunner } from 'typeorm';
import { AUTHOR_REPOSITORY, AuthorRepositoryType } from './authors.repository';
import { Post } from 'src/posts/models/post.model';
import { randomUUID } from 'crypto';

const transactionManager = async <T>(
  queryRunner: QueryRunner,
  func: () => Promise<T>,
) => {
  if (queryRunner.isTransactionActive) {
    return func();
  }

  try {
    await queryRunner.startTransaction();
    const result = await func();
    await queryRunner.commitTransaction();
    return result;
  } catch (e) {
    await queryRunner.rollbackTransaction();
    throw e;
  }
};

@Injectable()
export class AuthorsService {
  constructor(
    @Inject(QUERY_RUNNER) private queryRunner: QueryRunner,
    @Inject(AUTHOR_REPOSITORY) private authorRepository: AuthorRepositoryType,
  ) {}

  async findOneById(id: string): Promise<Author> {
    const func = async () => {
      const result = await this.authorRepository.findById(id);
      return result;
    };
    const r = await transactionManager(this.queryRunner, func);
    console.warn('posts', await r.posts);
    return r;
  }

  async createAuthor(): Promise<Author> {
    const id = randomUUID();
    const author = new Author({
      id,
      name: new Name({
        firstName: 'testfirst',
        lastName: 'testlast',
      }),
      posts: Promise.resolve([
        new Post({
          id: randomUUID(),
          authorId: id,
          title: 'test',
          votes: 8,
        }),
      ]),
    });
    return await this.authorRepository.save(author);
  }
}
