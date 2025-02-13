import { randomUUID } from 'crypto';

import { Inject, Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';

import { Author, Name } from './author.model';
import { QUERY_RUNNER } from 'src/database/queryRunner';
import { AUTHOR_REPOSITORY, AuthorRepositoryType } from './authors.repository';
import { Post } from 'src/posts/models/post.model';

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
    console.warn(e);
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

  async findByIds(ids: string[]): Promise<Author[]> {
    return await this.authorRepository.findByIds(ids);
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
    // const authors = [...Array(100)].map((_, i) => {
    //   return new Author({
    //     id: randomUUID(),
    //     name: new Name({
    //       firstName: 'nick',
    //       lastName: 'bee'
    //     })
    //   })
    // })
    const authors = [];
    const fn = async () => {
      await this.authorRepository.save([author, ...authors]);
      // throw Error("transaction error")
    };
    await transactionManager(this.queryRunner, fn);
    return author;
  }

  async addPosts(id: string): Promise<Author> {
    const author = await this.authorRepository.findById(id);
    await this.authorRepository.delete(author);
    author.posts = undefined;
    return await this.authorRepository.save(author);
  }
}
