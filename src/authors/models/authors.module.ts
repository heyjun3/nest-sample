import { Module } from '@nestjs/common';
import { AuthorsResolver } from './authors.resolver';
import { AuthorsService } from './authors.service';
import { PostsService } from 'src/posts/models/post.service';
import { AuthorRepositoryModule } from './authors.repository';
import { NameResolver } from './author.model';

@Module({
  imports: [AuthorRepositoryModule],
  providers: [AuthorsResolver, AuthorsService, PostsService, NameResolver],
})
export class AuthorsModule {}
