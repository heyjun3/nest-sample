import { Module } from '@nestjs/common';
import { getRepositoryToken, InjectRepository } from '@nestjs/typeorm';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  QueryRunner,
  Repository,
} from 'typeorm';
import { z } from 'zod';
import { checkUser, checkUsers, IUser } from 'src/typia/gen/user';

import { QUERY_RUNNER } from 'src/database/queryRunner';
import { fromJson } from '@bufbuild/protobuf';
import { UsersSchema } from 'src/gen/api/user/v1/user_pb';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id!: string;

  @Column()
  name!: string;
}

const UsersZodSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
  }),
);

function logger() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const method = descriptor.value;
    descriptor.value = async function () {
      const start = Date.now();
      const result = await method.apply(this, arguments);
      console.warn('exec time: ', Date.now() - start);
      return result;
    };
  };
}

export class UserRepository {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async save(user: User | User[]) {
    if (Array.isArray(user)) {
      return await this.userRepository.save(user);
    }
    return await this.userRepository.save(user);
  }
  async findById(id: string) {
    return await this.userRepository.findOne({ where: { id } });
  }
  @logger()
  async fetchAll() {
    return await this.userRepository.createQueryBuilder().getMany();
  }
  @logger()
  async fetchAllRawAndZod() {
    const result = await this.userRepository
      .createQueryBuilder()
      .select(['id', 'name'])
      .getRawMany();
    return UsersZodSchema.parse(result);
  }
  @logger()
  async fetchAllRawAndBuf() {
    const result = await this.userRepository
      .createQueryBuilder()
      .select(['id', 'name'])
      .getRawMany();
    return fromJson(UsersSchema, { users: result });
  }
  @logger()
  async fetchAllRawAndTypia() {
    const result = await this.userRepository
      .createQueryBuilder()
      .select(['id', 'name'])
      .getRawMany();
    return checkUsers(result);
  }
}

export const USER_REPOSITORY = 'USER_REPOSITORY';

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
