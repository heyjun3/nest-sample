import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Post } from '../../posts/models/post.model';
import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity({ name: 'author' })
@ObjectType()
export class Author {
  @PrimaryGeneratedColumn({ name: 'id' })
  @Field(() => Int)
  id: number;

  @Column({ name: 'first_name' })
  @Field({ nullable: true })
  firstName?: string;

  @Column({ name: 'last_name' })
  @Field({ nullable: true })
  lastName?: string;

  @Field(() => [Post])
  posts: Post[];
}
