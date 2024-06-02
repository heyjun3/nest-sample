import { Inject, Injectable } from '@nestjs/common';

import { Author } from './author.model';
import { QUERY_RUNNER } from 'src/database/queryRunner';
import { QueryRunner, Repository } from 'typeorm';
import { AUTHOR_REPOSITORY } from './authors.repository';

@Injectable()
export class AuthorsService {
  private readonly authors: Author[];
  constructor(
    @Inject(QUERY_RUNNER) private queryRunner: QueryRunner,
    @Inject(AUTHOR_REPOSITORY) private authorRepository: Repository<Author>,
  ) {
    this.authors = [
      {
        id: 1,
        posts: [
          {
            id: 1,
            title: 'test',
          },
        ],
      },
    ];
  }

  async findOneById(id: number): Promise<Author> {
    return this.authors[id];
  }

  async createAuthor(): Promise<Author> {
    const author = new Author();
    author.firstName = 'testfirst';
    author.lastName = 'testlast';
    const result = await this.authorRepository.save(author);
    console.warn(result);
    return result;
  }
}
