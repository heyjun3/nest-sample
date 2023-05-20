import { Module } from '@nestjs/common';
import { AuthorsResolver } from './authors.resolver';
import { AuthorsService } from './authors.service';
import { PostsService } from 'src/posts/models/post.service';

@Module({
  providers: [AuthorsResolver, AuthorsService, PostsService],
})
export class AuthorsModule {}
