import { QUERY_RUNNER } from 'src/database/queryRunner';
import { In, QueryRunner } from 'typeorm';
import { Author } from './author.model';
import { Module } from '@nestjs/common';
import { InjectRepository, getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export type AuthorRepositoryType = {
  findById: (id: string) => Promise<Author>;
  findByIds: (ids: string[]) => Promise<Author[]>;
  save: <T extends Author | Author[]>(author: T) => Promise<T>;
  delete: (author: Author) => Promise<Author>;
};

export class AuthorRepository {
  constructor(
    @InjectRepository(Author) private authorRepository: Repository<Author>,
  ) {}
  async findById(id: string) {
    return this.authorRepository.findOne({ where: { id } });
  }
  async findByIds(ids: string[]) {
    if (ids.length) {
      return await this.authorRepository.find({ where: { id: In(ids) } });
    }
    return await this.authorRepository.find({ take: 100 });
  }
  async save(author: Author | Author[]) {
    if (Array.isArray(author)) {
      return this.authorRepository.save(author);
    }
    return this.authorRepository.save(author);
  }
  async delete(author: Author) {
    return this.authorRepository.remove(author);
  }
}

export const AUTHOR_REPOSITORY = 'AUTHOR_REPOSITORY';

const AuthorFactory = {
  provide: getRepositoryToken(Author),
  useFactory: async (queryRunner: QueryRunner) => {
    return queryRunner.manager.getRepository(Author);
  },
  inject: [QUERY_RUNNER],
};

const authorRepositoryFactory = {
  provide: AUTHOR_REPOSITORY,
  useClass: AuthorRepository,
};

@Module({
  providers: [AuthorFactory, authorRepositoryFactory],
  exports: [AuthorFactory, authorRepositoryFactory],
})
export class AuthorRepositoryModule {}
