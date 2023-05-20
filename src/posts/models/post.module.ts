import { Module } from '@nestjs/common';
import { PostsService } from './post.service';

@Module({
  providers: [PostsService],
})
export class PostsModule {}
