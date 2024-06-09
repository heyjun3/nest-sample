import { Inject, Injectable } from '@nestjs/common';

import { Author } from './author.model';
import { QUERY_RUNNER } from 'src/database/queryRunner';
import { QueryRunner, Repository } from 'typeorm';
import { AUTHOR_REPOSITORY } from './authors.repository';
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
    @Inject(AUTHOR_REPOSITORY) private authorRepository: Repository<Author>,
  ) {}

  async findOneById(id: string): Promise<Author> {
    const func = async () => {
      const result = await this.authorRepository.findOne({
        where: { id },
        relations: { posts: true },
      });
      return result;
    };
    return transactionManager(this.queryRunner, func);
  }

  async createAuthor(): Promise<Author> {
    const author = new Author({
      id: randomUUID(),
      name: {
        firstName: 'testfirst',
        lastName: 'testlast',
      },
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
