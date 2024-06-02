import { QUERY_RUNNER } from 'src/database/queryRunner';
import { QueryRunner } from 'typeorm';
import { Author } from './author.model';
import { Module } from '@nestjs/common';

export const AUTHOR_REPOSITORY = 'AUTHRO_REPOSITORY';

const AuthorRepositoryFactory = {
  provide: AUTHOR_REPOSITORY,
  useFactory: async (queryRunner: QueryRunner) => {
    return queryRunner.manager.getRepository(Author);
  },
  inject: [QUERY_RUNNER],
};

@Module({
  providers: [AuthorRepositoryFactory],
  exports: [AuthorRepositoryFactory],
})
export class AuthorRepositoryModule {}
