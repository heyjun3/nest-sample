import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { z } from 'zod';
import { fromJson } from '@bufbuild/protobuf';

import { User } from './user.entity';
import { checkUsers } from 'src/typia/gen/user';
import { UsersSchema } from 'src/gen/api/user/v1/user_pb';

// Zod schema for validating user data
const UsersZodSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
  }),
);

/**
 * Logger decorator for measuring method execution time
 */
function logger() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const method = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const start = Date.now();
      const result = await method.apply(this, args);
      console.warn('exec time: ', Date.now() - start);
      return result;
    };
  };
}

/**
 * Repository for User entity
 */
export class UserRepository {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  /**
   * Save a user or an array of users
   */
  async save(user: User | User[]): Promise<User | User[]> {
    if (Array.isArray(user)) {
      return this.userRepository.save(user);
    }
    return this.userRepository.save(user);
  }

  /**
   * Find a user by ID
   */
  async findById(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  /**
   * Fetch all users
   */
  @logger()
  async fetchAll(): Promise<User[]> {
    return this.userRepository.createQueryBuilder().getMany();
  }

  /**
   * Fetch all users and validate with Zod
   */
  @logger()
  async fetchAllRawAndZod() {
    const result = await this.userRepository
      .createQueryBuilder()
      .select(['id', 'name'])
      .getRawMany();
    return UsersZodSchema.parse(result);
  }

  /**
   * Fetch all users and convert to Protobuf format
   */
  @logger()
  async fetchAllRawAndBuf() {
    const result = await this.userRepository
      .createQueryBuilder()
      .select(['id', 'name'])
      .getRawMany();
    return fromJson(UsersSchema, { users: result });
  }

  /**
   * Fetch all users and validate with Typia
   */
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
