import { Controller, Get, Inject } from '@nestjs/common';
import { USER_REPOSITORY, UserRepository } from './user.model';
import { randomUUID } from 'crypto';

@Controller('user')
export class UserController {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
  ) {}

  @Get('/')
  async fetchById() {
    return await this.userRepository.findById(randomUUID());
  }
  @Get('/all')
  async fetchAll() {
    return await this.userRepository.fetchAll();
  }
  @Get('/all/zod')
  async fetchAllZod() {
    return await this.userRepository.fetchAllRawAndZod();
  }
  @Get('/all/buf')
  async fetchAllBuf() {
    return await this.userRepository.fetchAllRawAndBuf();
  }
  @Get('/all/typia')
  async fetchAllTypia() {
    return await this.userRepository.fetchAllRawAndTypia();
  }
}
