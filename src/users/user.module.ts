import { Module } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { QueryRunner } from 'typeorm';

import { QUERY_RUNNER } from 'src/database/queryRunner';
import { User } from './user.entity';
import { USER_REPOSITORY, UserRepository } from './user.repository';

@Module({
  providers: [
    {
      provide: getRepositoryToken(User),
      useFactory: async (qr: QueryRunner) => {
        return qr.manager.getRepository(User);
      },
      inject: [QUERY_RUNNER],
    },
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
  ],
  exports: [USER_REPOSITORY],
})
export class UserRepositoryModule {}
